import {StateSetter} from "@chasemoskal/magical/x/view/types.js"

export function setupDragHandler(draggedElement: HTMLElement | null, setDraggedElement: StateSetter<HTMLElement | null>) {
		return {
			dragStart: (event: DragEvent) => {
				const target = <HTMLElement>event.target
				setDraggedElement(target)
				if (event.dataTransfer) {
					event.dataTransfer.effectAllowed = 'move'
				}
			},
			drag: (event: DragEvent) => {
			},
			dragEnd: (event: DragEvent) => {
				if (event.dataTransfer) {
					event.dataTransfer.dropEffect = 'move'
				}
			},
			drop: (event: DragEvent) => {
				const target = <HTMLElement>event.target
				if (target && draggedElement && event.target != draggedElement) {
					target.textContent = draggedElement?.textContent
					draggedElement.textContent = ''
				}
			},
			dragEnter: (event: DragEvent) => {
			},
			dragOver: (event: DragEvent) => {
				event.preventDefault();
			}
		}
	}
