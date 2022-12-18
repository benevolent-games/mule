export function borderBoxChecker(boxes: HTMLCollection, index: number, rowSize: number) {
	const numberOfBoxes = boxes.length
	return {
		borderLeft: () => {
			const indexes = []
			for (let i = 0; i < numberOfBoxes; i += rowSize) {
			indexes.push(i)
			}
			if (indexes.includes(index)) {
				return true
			} else false
		},
		borderRight: () => {
			const indexes = []
			for (let i = rowSize - 1; i <= numberOfBoxes; i += rowSize) {
				indexes.push(i)
			}
			if (indexes.includes(index)) {
				return true
			} else false
		},
		borderTop: () => {
		const indexes = []
			for (let i = 0; i < rowSize; i++) {
				indexes.push(i)
			}
			if (indexes.includes(index)) {
				return true
			} else false
		},
		borderBottom: () => {
			const indexes = []
			for (let i = numberOfBoxes - rowSize; i < numberOfBoxes; i++) {
				indexes.push(i)
			}
			if (indexes.includes(index)) {
				return true
			} else false
		}
	}
}
