import {component2 as element} from "@chasemoskal/magical/x/component.js"
import {html, LitElement, PropertyDeclarations, TemplateResult} from "lit"
import {styles} from "./style.css.js"


// export const MuleInventory = element<{}>({
// 	shadow: true,
// 	styles: styles,
// }).render(use => {
// 	// const itemsArray = new Array(size.columns * size.rows).fill(undefined).fill("item", 0, 1)
// 	// const [items, setItems] = use.state()
// 	const [mulePacks, setMulePacks] = use.state({

// 	})
// 	document.addEventListener("mule_pack", (e) => {
// 		console.log(e)
// 	})
	
// 	use.setup(() => {
// 		const mulePacksElements = use.element.shadowRoot?.querySelector('slot')?.assignedElements().filter(el => el.localName == 'mule-pack')
// 		// mulePacksElements?.forEach((mulePack, i) => setMulePacks({
// 		// 	mulePacks,
// 		// 	[i]: mulePack
// 		// }))
// 		console.log(use.element.shadowRoot?.children[0].querySelector('mule-pack'))
// 		mulePacksElements?.forEach(mulePack => console.log(mulePack))
// 	})
// 	console.log(mulePacks)
// 	console.log(use.element.renderRoot.querySelector('slot'))
// 	return html`
// 		<slot></slot>
// 	`
// })
// const add = () => {
// 	console.log("ADD")
// }
// const remove = () => {

// }
// const getItems = () => {}

export class MuleInventory extends LitElement {
	static properties: PropertyDeclarations = {
		elementsItems: {
			type: [{
				index: Number,
				items: Array
		}]}
	}

	add: (indexOfPack: number, indexOfPackBox: number, items: any) => void
	removeItem: (item: never) => void
	getPackItems: (items: any) => void
	preparePack: (index: number, size: number) => void

	elementsItems = []

	shadow = this.attachShadow({
		mode: "open",
		delegatesFocus: false,
		slotAssignment: "named",
	})
	

	constructor() {
		super()
		this.shadow.innerHTML = `
		<style>${styles}</style>
		<slot></slot>`
		this.removeItem = (item: never) => {this.elementsItems.push(item)}
		this.add = (indexOfPack: number, indexOfPackBox: number, items: any) => {
			console.log("add cos")
			const copy = [...this.elementsItems]
			const packItems = copy.find(({index}) => index == indexOfPack)!.items
			packItems[indexOfPackBox] = "item"
		}
		this.preparePack = (index: number, size: number) => {
			const itemsArray = new Array(size).fill('')
			this.elementsItems.push({index: index, items: itemsArray})
		}
		this.getPackItems = (elIndex: any) => {return this.elementsItems.find(({index}) => index == elIndex).items}
		
	}

}
