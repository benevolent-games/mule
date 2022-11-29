
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"


export const ItemsColumnLeft = view(use => (leftEqColumnItems) => {

	return html`
		<div class=items>
			${leftEqColumnItems.map((item: any) => html`<div class=item></div>`)}
		</div>
	`
})
