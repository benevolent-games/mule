
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"
import {setupDragHandler} from "../events/drag-handler.js"
import {MulePack} from "../element.js"

export const ItemsView = view(use => (
	size: {columns: number, rows: number},
	items: any[],
	MulePack: MulePack
	) => {

	const dragHandlerDekstop = setupDragHandler(MulePack)
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
