
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"
import {getPackSize} from "../utils/get-pack-size.js"
import {BoxGridProps} from "../../../types.js"

export const BoxGrid = view(use => (
	{boxes,
		drag,
		size,
	tradeHandlers}: BoxGridProps) => {

	const gridSize = getPackSize(size)

	return html`
		<div style=${`
			grid-template-columns: repeat(${gridSize.columns}, auto);
			grid-template-rows: repeat(${gridSize.rows}, auto);
			`} class="grid items">
			${boxes.map(({item}, i) => html`<div class=item-box>
				<div draggable=${item ? true : false}
				class=item
				@dragstart=${() => tradeHandlers.onTradeStart(i)}
				@drop=${() => tradeHandlers.onTradeCommit(i)}
				@dragover=${(e: DragEvent) => e.preventDefault()}
				>
				${item}
			</div>
			</div>`)}
		</div>
	`
})
