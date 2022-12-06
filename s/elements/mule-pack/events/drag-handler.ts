import {MuleInventory} from "../../mule-inventory/element.js"
import {MulePack} from "../element.js"

export function setupDragHandler(
	MulePack: MulePack
) {
	return {
		dragHandlerDesktop: () => {
			return {
				dragStart: (event: DragEvent) => {
					const target = <HTMLElement>event.target
					const index = Number(target.dataset.index)
					const isDraggable = target.getAttribute('draggable')
					MuleInventory.handleStart({itemIndex: index, item: 'item', MulePack: MulePack})
					if (isDraggable == "false" && event.dataTransfer) {
						event.dataTransfer.effectAllowed = 'none'
					}
				},
				drag: (event: DragEvent) => {
				},
				dragEnd: (event: DragEvent) => {
				},
				drop: (event: DragEvent) => {
					const target = <HTMLElement>event.target
					if (target) {
						const indexOfElementItemIsDroppedTo = Number(target.dataset.index)
						MuleInventory.handleDrop({itemIndex: indexOfElementItemIsDroppedTo, MulePack: MulePack})
					}
				},
				dragEnter: (event: DragEvent) => {
				},
				dragOver: (event: DragEvent) => {
					event.preventDefault();
				}
			}
		}
	}
}
