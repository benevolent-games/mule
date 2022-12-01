import {component2 as element} from "@chasemoskal/magical/x/component.js"
import {html} from "lit"
import {MuleInventory} from "../mule-inventory/element.js"
import {styles} from "./style.css.js"
import {getPackSize} from "./utils/get-pack-size.js"
import {ItemsView} from "./views/items-view.js"

export const MulePack = element<{
	size: string
	index: number
}>({
	shadow: true,
	styles: styles,
	properties: {
		size: {type: String},
		index: {type: Number}
	}
}).render(use => {

	const packSize = getPackSize(use.element.size)
	const [items, setItems] = use.state([])

	use.setup(() => {
		const parent:MuleInventory = use.element.closest("mule-inventory")!
		const size = packSize.columns * packSize.rows
		parent.preparePack(use.element.index, size)
		const items: any = parent.getPackItems(use.element.index)
		console.log(items)
		setItems(items)
		// testing data
		if (use.element.index == 1) {
			parent.add(use.element.index, 3, "item")
		}

	})
	
	return html`
		<div>
			${ItemsView(packSize, items, setItems, use.element.index)}
		</div>
	`
})
