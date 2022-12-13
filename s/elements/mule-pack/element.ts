
import {styles} from "./style.css.js"
import {MuleInventory} from '../mule-inventory/element.js'
import {component2 as element} from '@chasemoskal/magical/x/component.js'
import {initializeBoxes} from "./utils/initialize-boxes.js"
import {trade} from "../../utils/trade.js"
import {BoxGrid} from "./views/box-grid.js"
import {Box, Drag} from "../../types.js"
import {makeDraggable} from "./utils/makeDraggable.js"

export type MulePack = InstanceType<typeof MulePack>

export const MulePack = element<{
		size: string
		getBox(index: number): Box
		getDrag(): undefined | Drag
		setBox(index: number, box: Box): void
		clearBox(index: number): void
		onTradeStart(sourceIndex: number): void
		onTradeCommit(targetIndex: number): void
	}>({
		styles,
		shadow: true,
		properties: {
			size: {type: String},
			getBox: {attribute: false},
			getDrag: {attribute: false},
			setBox: {attribute: false},
			clearBox: {attribute: false},
			onTradeCommit: {attribute: false},
			onTradeStart: {attribute: false}
		},
	}).render(use => {

		
			const [entered, setEntered] = use.state<{
		element: HTMLElement | undefined
		entered: boolean
	}>({
		element: undefined,
		entered: false
	})
	
	// TODO initialize boxes
	const [boxes, setBoxes, getBoxes]
		= use.state<Box[]>(() => initializeBoxes(use.element.size))

		const element = use.element
		use.setup(() => {
		
		})
		const [dragState, setDragState, getDragState] = use.state<{
		element: HTMLElement | undefined
		initialX: number
		initialY: number
		styleTop: string
		styleLeft: string
		position: string
	}>({
		element: undefined,
		initialX: 0,
		initialY: 0,
		styleTop: "",
		styleLeft: "",
		position: ""
	})
	const [drag, setDrag, getDrag]
		= use.state<undefined | {

			// the index of the box where the drag started
			index: number

			// the box from where the drag started
			box: Box

		}>(undefined)

	const [inventory]
		= use.state(
			() => use
				.element
				.closest<MuleInventory>("mule-inventory")
		)
		function findBox(e: PointerEvent) {
			return e.composedPath().find(el => el.className == "item")
		}
	
		use.setup((rerender) => {
			const draggable = makeDraggable(getDragState, setDragState)
			
		element.addEventListener("pointermove", (e: PointerEvent) => {
			e.preventDefault()
			const state = getDragState()
			if (state.element) {
				draggable.pointerMove(e)
			}
		})
		element.addEventListener("pointerup", (e: PointerEvent) => {
			// e.preventDefault()
			const target = <HTMLElement>e.target
			console.log(target)
			const box = <HTMLElement>findBox(e)
			console.log(box)
			if (box) {
				const i = Number(box.dataset.index)
				use.element.onTradeCommit(i)
			}
			draggable.pointerUp(e)
		})
		return () => {
		}
		})

	use.setup(() => {
		use.element.getDrag = getDrag
		use.element.getBox = index => getBoxes()[index]!
		use.element.setBox = (index, item) => {
			const newBoxes = [...getBoxes()]
			newBoxes[index] = item
			setBoxes(newBoxes)
		}
		use.element.clearBox = item => {
			// TODO implement
		}
		use.element.onTradeStart = (sourceIndex: number) => {
			const box = boxes.at(sourceIndex)
				if (!box)
					throw new Error(`unknown box index ${sourceIndex}`)
				setDrag({index: sourceIndex, box})
				if (inventory)
					inventory.setSourcePack(use.element)
		}
		use.element.onTradeCommit = (targetIndex: number) => {
				if (inventory) {
					inventory.handleDrop(use.element, targetIndex)
					inventory.setSourcePack(undefined)
				}
				else if (drag) {
					trade({
						source: {
							pack: use.element,
							index: drag.index,
						},
						target: {
							pack: use.element,
							index: targetIndex,
						},
					})
				}
		}
	})
	
	// TODO implement box grid view
		return BoxGrid({
		boxes,
		drag,
		size: use.element.size,
		element,
	})
})
