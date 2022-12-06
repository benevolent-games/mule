import {CSSResultGroup, html, LitElement} from "lit"
import {styles} from "./style.css.js"
import {getPackSize} from "./utils/get-pack-size.js"
import {ItemsView} from "./views/items-view.js"
import {property} from 'lit/decorators.js';

export interface ItemProps {
	itemIndex: number
	item?: any
}
export class MulePack extends LitElement {
	static styles?: CSSResultGroup | undefined = styles

	@property()
	size: string = ''

	@property({attribute: false})
	items: any[] = []

	connectedCallback() {
		super.connectedCallback()
		if (this.size) {
			const packSize = getPackSize(this.size)
			this.items = new Array(packSize.columns * packSize.rows).fill(undefined).fill("item", 0, 1)
		}
	}

	render() {
		const packSize = getPackSize(this.size)
		return html`
		<div style="height: 100%;">
			${ItemsView(
				packSize,
				this.items,
				this)}
		</div>
		`
	}

	addItem({itemIndex, item}: ItemProps) {
		const newItems = this.items.slice()
		newItems[itemIndex] = item
		this.items = newItems
		
	}

	removeItem({itemIndex, item}: ItemProps) {
		const newItems = this.items.slice()
		newItems[itemIndex] = undefined
		this.items = newItems
	}

}
