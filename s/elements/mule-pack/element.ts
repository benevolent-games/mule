
import {property} from "lit/decorators.js"
import {MagicElement, mixinCss, UseElement} from "@chasemoskal/magical"

import {styles} from "./style.css.js"
import {trade} from "../../utils/trade.js"
import {BoxGrid} from "./views/box-grid.js"
import {AnimiationStyles, Box} from "../../types.js"
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
	private animationStyles: AnimiationStyles = {
		animatedBox: null,
		initialX: 0,
		initialY: 0,
		styleTop: "",
		styleLeft: "",
		position: ""
	}
	setAnimationStyles = (animationStyles: AnimiationStyles) => {
		this.animationStyles = animationStyles
	}

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

	@property({attribute: false})
	private inventory: MuleInventory | null = null
	
	onTradeCommit = (targetIndex: number) => {
	if (this.inventory) {
				this.inventory.handleDrop(this, targetIndex)
				this.inventory.setSourcePack(undefined)
			}
			else if (this.drag) {
				trade({
					source: {
						pack: this,
						index: this.drag.index,
					},
					target: {
						pack: this,
						index: targetIndex,
					},
				})
			}
	}

	onTradeStart = (sourceIndex: number) => {
	const box = this.boxes.at(sourceIndex)
	if (!box)
		throw new Error(`unknown box index ${sourceIndex}`)
	this.setDrag({index: sourceIndex, box})
	if (this.inventory)
		this.inventory.setSourcePack(this)
	}

	firstUpdated() {
		this.boxes = initializeBoxes(this.size)
		this.inventory = this.closest<MuleInventory>("mule-inventory")
		super.firstUpdated()
	}

	realize(use: UseElement<typeof this>) {
		const {boxes, drag} = this
		return BoxGrid({
			boxes,
			drag,
			size: this.size,
			animationStyles: this.animationStyles,
		})
	}
}
