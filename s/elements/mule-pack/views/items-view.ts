
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"
import {setupDragHandler} from "../events/drag-handler.js"

export const ItemsView = view(use => (size) => {
	const items = new Array(size.columns * size.rows).fill(undefined)
	const [draggedElement, setDraggedElement] = use.state<HTMLElement | null>(null)
	items[0] = "item"

	const dragHandler = setupDragHandler(draggedElement, setDraggedElement)

	return html`
		<div style=${`
			grid-template-columns: repeat(${size.columns}, 60px);
			grid-template-rows: repeat(${size.rows}, 60px);
			`} class="grid items">
			${items.map((item, i) => html`<div class=item-box>
				<div draggable="true"
				data-index=${i}
				class=item
				@dragstart=${dragHandler.dragStart}
				@drag=${dragHandler.drag}
				@dragend=${dragHandler.dragEnd}
				@drop=${dragHandler.drop}
				@dragenter=${dragHandler.dragEnter}
				@dragover=${dragHandler.dragOver}
				>
				${item}
			</div>
			</div>`)}
		</div>
	`
})
