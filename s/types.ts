
import {StateGetter, StateSetter} from "@chasemoskal/magical"
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
	animationStyles: AnimiationStyles
}

export interface Box {
	item: Item
	quantity: number
}

export interface Drag {
	index: number
	box: Box
}

export interface AnimiationStyles {
	animatedBox: HTMLElement | null
	initialX: number
	initialY: number
	styleTop: string
	styleLeft: string
	position: string
}
