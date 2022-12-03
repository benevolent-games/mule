
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"
import {setupDragHandler} from "../events/drag-handler.js"

export const ItemsView = view(use => (size) => {
	const itemsArray = new Array(size.columns * size.rows).fill(undefined).fill("item", 0, 1)
	const [items, setItems] = use.state(itemsArray)
	const [draggedElement, setDraggedElement] = use.state<HTMLElement | null>(null)
	
	const dragHandlerDekstop = setupDragHandler(
		draggedElement,
		setDraggedElement,
		items,
		setItems,
		)
		.dragHandlerDesktop()

	return html`
		<div style=${`
			grid-template-columns: repeat(${size.columns}, auto);
			grid-template-rows: repeat(${size.rows}, auto);
			`} class="grid items">
			${items.map((item, i) => html`<div class=item-box>
				<div draggable=${item ? true : false}
				data-index=${i}
				class=item
				@dragstart=${dragHandlerDekstop.dragStart}
				@drag=${dragHandlerDekstop.drag}
				@dragend=${dragHandlerDekstop.dragEnd}
				@drop=${dragHandlerDekstop.drop}
				@dragenter=${dragHandlerDekstop.dragEnter}
				@dragover=${dragHandlerDekstop.dragOver}
				>
				${item}
			</div>
			</div>`)}
		</div>
	`
})
