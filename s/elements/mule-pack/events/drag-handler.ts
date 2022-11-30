import {StateSetter} from "@chasemoskal/magical/x/view/types.js"

export function setupDragHandler(
	draggedElement: HTMLElement | null,
	setDraggedElement: StateSetter<HTMLElement | null>,
	items: any[],
	setItems: StateSetter<any[]>) {
	return {
		dragHandlerDesktop: () => {
			return {
				dragStart: (event: DragEvent) => {
					const target = <HTMLElement>event.target
					setDraggedElement(target)
					const boolean = target.getAttribute('draggable')
					if (boolean == "false" && event.dataTransfer) {
						event.dataTransfer.effectAllowed = 'none'
					}
				},
				drag: (event: DragEvent) => {
				},
				dragEnd: (event: DragEvent) => {
				},
				drop: (event: DragEvent) => {
					const target = <HTMLElement>event.target
					if (target && draggedElement && target != draggedElement) {
						const indexOfElementItemIsDroppedTo = Number(target.dataset.index)
						const indexOfDraggedElement = Number(draggedElement.dataset.index)
						const itemsCopy = [...items]
						itemsCopy[indexOfElementItemIsDroppedTo] = itemsCopy[indexOfDraggedElement]
						itemsCopy[indexOfDraggedElement] = undefined
						setItems(itemsCopy)
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
