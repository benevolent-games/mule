
import {styles} from "./style.css.js"
import {MuleInventory} from '../mule-inventory/element2.js'
import {component2 as element} from '@chasemoskal/magical/x/component.js'
import {initializeBoxes} from "./utils/initialize-boxes.js"
import {trade} from "../../utils/trade.js"
import {BoxGrid} from "./views/box-grid.js"
import {Box, Drag} from "../../types.js"

export type MulePack = InstanceType<typeof MulePack>

export const MulePack = element<{
		size: string
		getBox(index: number): Box
		getDrag(): undefined | Drag
		setBox(index: number, box: Box): void
		clearBox(index: number): void
	}>({
		styles,
		shadow: true,
		properties: {
			size: {type: String},
			getBox: {attribute: false},
			getDrag: {attribute: false},
			setBox: {attribute: false},
			clearBox: {attribute: false},
		},
	}).render(use => {

	// TODO initialize boxes
	const [boxes, setBoxes, getBoxes]
		= use.state<Box[]>(() => initializeBoxes(use.element.size))

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
	})

	// TODO implement box grid view
	return BoxGrid({
		boxes,
		drag,
		size: use.element.size,
		tradeHandlers: {

			onTradeStart(sourceIndex: number) {
				const box = boxes.at(sourceIndex)
				if (!box)
					throw new Error(`unknown box index ${sourceIndex}`)
				setDrag({index: sourceIndex, box})
				if (inventory)
					inventory.setSourcePack(use.element)
			},

			onTradeCommit(targetIndex: number) {
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
			},
		},
	})
})
