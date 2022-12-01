import {StateSetter} from "@chasemoskal/magical/x/view/types.js"
import {notEqual} from "lit"

export function setupDragHandler(
	draggedElement: {
    from: {
        mulePack: number | null;
        mulePackBox: EventTarget | null;
    };
    to: {
        mulePack: number | null;
        mulePackBox: EventTarget | null;
    };
},
	setDraggedElement: StateSetter<{
    from: {
        mulePack: number | null;
        mulePackBox: EventTarget | null;
    };
    to: {
        mulePack: number | null;
        mulePackBox: EventTarget | null;
    };
}>,
	items: any[],
	setItems: StateSetter<any[]>,
	packIndex: number
) {
	return {
		dragHandlerDesktop: () => {
			return {
				dragStart: (event: DragEvent) => {
					const target = <HTMLElement>event.target
					console.log(packIndex, 'index')
					event.target.setAttribute("dragging", "")
					setDraggedElement({
						from: {
							mulePack: packIndex,
							mulePackBox: event.target
						},
						
						to: {
							...draggedElement.to
						}
					})
					const boolean = target.getAttribute("draggable")
					if (boolean == "false" && event.dataTransfer) {
						event.dataTransfer.effectAllowed = "none"
					}
				},
				drag: (event: DragEvent) => {
				},
				dragEnd: (event: DragEvent) => {
					event.target.removeAttribute("dragging")
				},
				drop: (event: DragEvent) => {
					const target = <HTMLElement>event.target
					const indexOfPackBoxToRemoveFrom = draggedElement?.from?.mulePackBox?.getAttribute("data-index")!
					const indexOfPackBoxToAddTo = Number(target.dataset.index)
					const indexOfPackElementToRemoveFrom = event.currentTarget
					// draggedElement.from.mulePack
					const indexOfPackElementToAddTo = event.path.find(el => el.localName == "mule-pack").getAttribute("index")!
					console.log(indexOfPackBoxToAddTo)
					console.log(indexOfPackElementToAddTo, packIndex)
					console.log(indexOfPackElementToRemoveFrom )
					if (target && draggedElement && target != draggedElement.from.mulePackBox && indexOfPackElementToAddTo == draggedElement.from.mulePack) {
						// console.log(indexOfDraggedElement)
						// const itemsCopy = [...items]
						// itemsCopy[indexOfPackBoxToAddTo] = itemsCopy[indexOfDraggedElement]
						// itemsCopy[indexOfDraggedElement] = undefined
						// setItems(itemsCopy)
						console.log("the same")
					}
					else if (indexOfPackElementToAddTo != packIndex) {
						console.log(indexOfPackElementToAddTo, packIndex)
						console.log("not the same")
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
