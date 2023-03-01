
import {html} from "lit"
import {property} from "lit/decorators.js"
import {MagicElement, mixinCss, UseElement} from "@chasemoskal/magical"

import {styles} from "./style.css.js"
import {trade} from "../../utils/trade.js"
import {AnimiationStyles} from "../../types.js"
import {MulePack} from "../mule-pack/element.js"
import {goToMulePack} from "./utils/go-to-mulepack.js"
import {getMulePacks} from "./utils/get-mule-packs.js"
import {changeBoxFocus} from "./utils/change-box-focus.js"
import {makeDraggable} from "../mule-pack/utils/makeDraggable.js"
import {borderBoxChecker} from "../mule-pack/utils/border-box-checker.js"
import {getCurrentMulePackData} from "./utils/get-current-mule-pack-data.js"

@mixinCss(styles)
export class MuleInventory extends MagicElement {

	@property()
	private sourcePack: MulePack | undefined

	setSourcePack(pack: MulePack | undefined) {
		this.sourcePack = pack
	}

	handleDrop = (
			targetPack: MulePack,
			targetIndex: number
		) => {
		const {sourcePack} = this
		if (sourcePack) {
			const drag = sourcePack.getDrag()
			if (!drag)
				throw new Error("invalid drag ended without a start")
			trade({
				source: {
					pack: sourcePack,
					index: drag.index,
				},
				target: {
					pack: targetPack,
					index: targetIndex,
				},
			})
		}
	}

	realize(use: UseElement<typeof this>) {

		const [dragState, setDragState, getDragState] = use.state<AnimiationStyles>({
			animatedBox: null,
			initialX: 0,
			initialY: 0,
			styleTop: "",
			styleLeft: "",
			position: ""
		})

		use.setup(() => {

			const mulePacks = getMulePacks(this)
			const draggable = makeDraggable(getDragState, setDragState)

			this.addEventListener("keydown", (e: KeyboardEvent) => {
				const data = getCurrentMulePackData(e, mulePacks)
				const {borderBottom, borderRight, borderLeft, borderTop} = borderBoxChecker({...data})
				const focus = changeBoxFocus({...data})
				if (e.key == "ArrowRight") {
					if (borderRight()) goToMulePack(data.nextMulePack)
					 else focus.rightBox()
				}
				if (e.key == "ArrowLeft") {
					if (borderLeft()) goToMulePack(data.previousMulePack)
					else focus.leftBox()
				}
				if (e.key == "ArrowDown") {
					if (borderBottom()) goToMulePack(data.nextMulePack)
					else focus.bottomBox()
				}
				if (e.key == "ArrowUp") {
					if (borderTop()) goToMulePack(data.previousMulePack)
					else focus.topBox()
				}
			})
			this.addEventListener("keypress", (e: KeyboardEvent) => {
				if (e.key == "Enter") {
					const {MulePackBox, isDraggable, MulePack, indexOfCurrentBox}
						= getCurrentMulePackData(e, mulePacks)
					const tradeStarted = this.sourcePack
					if (MulePackBox && isDraggable && !tradeStarted) {
						setDragState({
							...dragState,
							animatedBox: MulePackBox
						})
						MulePackBox.setAttribute("data-selected", "")
						MulePack.onTradeStart(indexOfCurrentBox)
					}
					if (tradeStarted) {
						const focusedBox = getDragState().animatedBox
						focusedBox?.removeAttribute("data-selected")
						MulePack.onTradeCommit(indexOfCurrentBox)
					}
				}
			})
			window.addEventListener("pointermove", (e: PointerEvent) => {
				e.preventDefault()
				if (this.sourcePack) {
					draggable.pointerMove(e)
					const state = getDragState()
					this.sourcePack?.setAnimationStyles(state)
				}
			})
			window.addEventListener("pointerup", (e: PointerEvent) => {
				const {MulePack, box, indexOfCurrentBox} = getCurrentMulePackData(e, mulePacks)
				const state = getDragState()
				if (state.animatedBox) {
					draggable.pointerUp(e, this.sourcePack)
				}
				if (box && state.animatedBox) {
					MulePack.onTradeCommit(indexOfCurrentBox)
				}
			})
			window.addEventListener("pointerdown", (e: PointerEvent) => {
				e.preventDefault()
				const {MulePackBox, isDraggable, indexOfCurrentBox, MulePack}
					= getCurrentMulePackData(e, mulePacks)
				if (MulePackBox && isDraggable) {
					setDragState({
							...dragState,
							animatedBox: MulePackBox
						})
					MulePack.onTradeStart(indexOfCurrentBox)
					draggable.pointerDown(e, MulePackBox)
				}
				MulePackBox?.releasePointerCapture(e.pointerId)
			})
		})
		return html`<slot></slot>`
	}
}
