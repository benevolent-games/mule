
import {MulePack} from "../element.js"
import {MuleInventory} from "../../mule-inventory/element.js"

export function setupDragHandler(
	MulePack: MulePack
) {

	function findDraggable(target: null | Node): undefined | HTMLElement {
		const isDraggable = (t: EventTarget) => (
			target instanceof HTMLElement &&
			target.hasAttribute("draggable")
		)
		while (target && !isDraggable(target)) {
			target = target.parentNode
		}
		return <HTMLElement>target ?? undefined
	}

	function getDraggableElement(target: EventTarget): HTMLElement {
		if (!(target instanceof Node))
			throw new Error("valid event target, not a node")

		const draggable = findDraggable(target)

		if (!draggable)
			throw new Error("could not find draggable element")

		return draggable
	}

	return {
		dragHandlerDesktop: () => {
			return {
				dragStart: (event: DragEvent) => {
					const element = getDraggableElement(<HTMLElement>event.target)
					const index = Number(element.dataset.index)
					const isDraggable = element.getAttribute('draggable')
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
					const element = getDraggableElement(<HTMLElement>event.target)
					if (element) {
						const indexOfElementItemIsDroppedTo = Number(element.dataset.index)
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
