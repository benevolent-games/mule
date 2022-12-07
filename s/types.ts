
import {MulePack} from "./elements/mule-pack/element.js"

type Item = any

export interface PackAddress {
	pack: MulePack
	index: number
}

export interface BoxGridProps {
	boxes: Box[]
	drag: {
		index: number
		box: Box
	} | undefined
	size: string
	tradeHandlers: {
		onTradeStart(sourceIndex: number): void
		onTradeCommit(targetIndex: number): void
	}
}

export interface Box {
	item: Item
	quantity: number
}

export interface Drag {
	index: number
	box: Box
}

