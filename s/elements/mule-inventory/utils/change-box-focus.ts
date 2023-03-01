import {MulePackData} from "../types.js"

export function changeBoxFocus ({boxes, indexOfCurrentBox, currentPackSize}: MulePackData) {
	return {
		rightBox() {
			const newBox = <HTMLElement>boxes?.[indexOfCurrentBox + 1].children[0]
			newBox?.focus()
		},
		leftBox() {
			const newBox = <HTMLElement>boxes?.[indexOfCurrentBox - 1]?.children[0]
			newBox?.focus()
		},
		bottomBox() {
			const newBox = <HTMLElement>boxes?.[indexOfCurrentBox + currentPackSize!.columns].children[0]
			newBox.focus()
		},
		topBox() {
			const newBox = <HTMLElement>boxes?.[indexOfCurrentBox - currentPackSize!.columns].children[0]
			newBox.focus()
		}
	}
}
