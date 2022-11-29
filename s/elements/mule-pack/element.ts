import {component2 as element} from "@chasemoskal/magical/x/component.js"
import {html} from "lit"
import {styles} from "./style.css.js"
import {getPackSize} from "./utils/get-pack-size.js"
import {ItemsView} from "./views/items-view.js"
import {PrimaryItemsView} from "./views/primary-items-view.js"

export const MulePack = element<{
	size: string
}>({
	shadow: true,
	styles: styles,
	properties: {
		size: {type: String}
	}
}).render(use => {

	const packSize = getPackSize(use.element.size)

	return html`
		<div>
			${ItemsView(packSize)}
			${PrimaryItemsView(packSize)}
		</div>
	`
})
