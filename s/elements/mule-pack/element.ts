
import {property} from "lit/decorators.js"
import {MagicElement, mixinCss, UseElement} from "@chasemoskal/magical"

import {Box} from "../../types.js"
import {styles} from "./style.css.js"
import {trade} from "../../utils/trade.js"
import {BoxGrid} from "./views/box-grid.js"
import {MuleInventory} from '../mule-inventory/element.js'
import {initializeBoxes} from "./utils/initialize-boxes.js"

export interface Drag {
	index: number
	box: Box
}

@mixinCss(styles)
export class MulePack extends MagicElement {
	
	@property({type: String})
	size: string = "2x2"

	@property({attribute: false})
	private drag: Drag | undefined
	getDrag = () => this.drag
	setDrag = (drag: Drag | undefined) => { this.drag = drag }

	@property({attribute: false})
	private boxes: Box[] = []
	getBox = (index: number) => this.boxes[index]
	setBox = (index: number, box: Box) => {
		const newBoxes = [...this.boxes]
		newBoxes[index] = box
		this.boxes = newBoxes
	}

	firstUpdated() {
		this.boxes = initializeBoxes(this.size)
		super.firstUpdated()
	}

	realize(use: UseElement<typeof this>) {
		const {boxes, drag} = this
		const [inventory]
			= use.state(
				() => use
					.element
					.closest<MuleInventory>("mule-inventory")
			)

		return BoxGrid({
			boxes,
			drag,
			size: use.element.size,
			tradeHandlers: {

				onTradeStart: (sourceIndex: number) => {
					const box = boxes.at(sourceIndex)
					if (!box)
						throw new Error(`unknown box index ${sourceIndex}`)
					this.setDrag({index: sourceIndex, box})
					if (inventory)
						inventory.setSourcePack(use.element)
				},

				onTradeCommit: (targetIndex: number) => {
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
	}
}
