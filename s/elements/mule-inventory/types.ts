import {MulePack} from "../mule-pack/element.js"

export interface MulePackData {
	MulePack: MulePack
	currentPackSize: {
		columns: number
		rows: number
	} | null
	MulePackBox: HTMLElement | undefined
	boxes: HTMLCollection | undefined
	box: HTMLElement
	indexOfPack: number
	nextMulePack: Element
	previousMulePack: Element
	indexOfCurrentBox: number
	isDraggable: boolean | undefined
	}
