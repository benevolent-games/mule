import {MulePackData} from "../../mule-inventory/types.js"


export function borderBoxChecker({
	boxes, indexOfCurrentBox, currentPackSize}: MulePackData) {
	const numberOfBoxes = boxes!.length
	const {columns} = currentPackSize!
	return {
		borderLeft: () => {
			const indexes = []
			for (let i = 0; i < numberOfBoxes; i += columns) {
			indexes.push(i)
			}
			if (indexes.includes(indexOfCurrentBox)) {
				return true
			} else false
		},
		borderRight: () => {
			const indexes = []
			for (let i = columns - 1; i <= numberOfBoxes; i += columns) {
				indexes.push(i)
			}
			if (indexes.includes(indexOfCurrentBox)) {
				return true
			} else false
		},
		borderTop: () => {
		const indexes = []
			for (let i = 0; i < columns; i++) {
				indexes.push(i)
			}
			if (indexes.includes(indexOfCurrentBox)) {
				return true
			} else false
		},
		borderBottom: () => {
			const indexes = []
			for (let i = numberOfBoxes - columns; i < numberOfBoxes; i++) {
				indexes.push(i)
			}
			if (indexes.includes(indexOfCurrentBox)) {
				return true
			} else false
		}
	}
}
