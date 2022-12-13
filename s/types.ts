
import {StateSetter} from "@chasemoskal/magical/x/view/types.js"
import {LitElement} from "lit"
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
	element: LitElement
	size: string
}

export interface Box {
	item: Item
	quantity: number
}

export interface Drag {
	index: number
	box: Box
}

