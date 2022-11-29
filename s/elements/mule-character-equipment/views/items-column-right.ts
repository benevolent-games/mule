
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"


export const ItemsColumnRight = view(use => (rightEqColumnItems) => {

	return html`
		<div class=items>
			${rightEqColumnItems.map((item: any) => html`<div class=item></div>`)}
		</div>
	`
})
