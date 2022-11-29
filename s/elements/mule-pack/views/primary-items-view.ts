
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"

export const PrimaryItemsView = view(use => (size) => {
	const items = new Array(size.columns).fill("item")

	return html`
		<div class=primary-items>
			${items.map(item => html`<div class=item-box>
				<div class=item></div>
			</div>`)}
		</div>
	`
})
