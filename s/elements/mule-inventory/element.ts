
import {html} from "lit"
import {property} from "lit/decorators.js"
import {MagicElement, mixinCss, UseElement} from "@chasemoskal/magical"

import {styles} from "./style.css.js"
import {trade} from "../../utils/trade.js"
import {AnimiationStyles} from "../../types.js"
import {MulePack} from "../mule-pack/element.js"
import {makeDraggable} from "../mule-pack/utils/makeDraggable.js"

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

			function findBox(e: PointerEvent | KeyboardEvent) {
				return e.composedPath().find(el => {
					const element = <HTMLElement>el
					return element.className == "item"
				})
			}
		
			const draggable = makeDraggable(getDragState, setDragState)

			this.addEventListener("keypress", (e: KeyboardEvent) => {
				const target = <HTMLElement>e.target
				const MulePackBox = <HTMLElement>findBox(e)
				const notEmpty = MulePackBox?.draggable
				const MulePack = <MulePack>target
				const tradeStarted = this.sourcePack
				if (MulePackBox && notEmpty && !tradeStarted) {
					const i = Number(MulePackBox.dataset.index)
					setDragState({
						...dragState,
						animatedBox: MulePackBox
					})
					MulePackBox.setAttribute("data-focus", "")
					MulePack.onTradeStart(i)
				}
				if (tradeStarted) {
					const i = Number(MulePackBox.dataset.index)
					const focusedBox = getDragState().animatedBox
					focusedBox?.removeAttribute("data-focus")
					MulePack.onTradeCommit(i)
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
				const target = <HTMLElement>e.target
				const MulePack = <MulePack><unknown>target
				const box = <HTMLElement>findBox(e)
				const state = getDragState()
				if (state.animatedBox) {
					draggable.pointerUp(e, this.sourcePack)
				}
				if (box && state.animatedBox) {
					const i = Number(box.dataset.index)
					MulePack.onTradeCommit(i)
				}
			})
			window.addEventListener("pointerdown", (e: PointerEvent) => {
				e.preventDefault()
				const target = <HTMLElement>e.target
				const MulePackBox = <HTMLElement>findBox(e)
				const MulePack = <MulePack>target
				const isDraggable = MulePackBox?.draggable
				if (MulePackBox && isDraggable) {
					const i = Number(MulePackBox.dataset.index)
					setDragState({
							...dragState,
							animatedBox: MulePackBox
						})
					MulePack.onTradeStart(i)
					draggable.pointerDown(e, MulePackBox)
				}
				MulePackBox?.releasePointerCapture(e.pointerId)
			})
		})
		return html`<slot></slot>`
	}
}
