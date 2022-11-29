
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"

export const ItemsView = view(use => (size) => {
	const items = new Array(size.columns * size.rows).fill("item")

	return html`
		<div style=${`
			grid-template-columns: repeat(${size.columns}, 60px);
			grid-template-rows: repeat(${size.rows}, 60px);
			`} class="grid items">
			${items.map(item => html`<div class=item></div>`)}
		</div>
	`
})
