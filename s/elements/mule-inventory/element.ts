import {component2 as element} from "@chasemoskal/magical/x/component.js"
import {html} from "lit"
import {styles} from "./style.css.js"

export const MuleInventory = element<{}>({
	shadow: true,
	styles: styles,
}).render(use => {
	
	return html`
		<slot></slot>
	`
})
