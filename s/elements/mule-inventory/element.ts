import {CSSResultGroup, html, LitElement} from "lit"
import {MulePack} from "../mule-pack/element.js"
import {styles} from "./style.css.js"

interface HandleTrade {
	itemIndex: number
	item?: any
	MulePack: MulePack | undefined
}

interface TradeProps {
	from: HandleTrade,
	to: HandleTrade
}
export class MuleInventory extends LitElement {

	static styles?: CSSResultGroup | undefined = styles

	static tradeProps: TradeProps = {
		from: {
			itemIndex: 0,
			item: '',
			MulePack: undefined
		},
		to: {
			itemIndex: 0,
			item: '',
			MulePack: undefined,
		}
	}

	render() {
		return html`<slot></slot>`
	}

	static handleStart({itemIndex, item, MulePack}: HandleTrade) {
		this.tradeProps = {
			from: {
				itemIndex,
				item,
				MulePack
			},
			to: {...this.tradeProps.to}
		}
	}

	static handleDrop({itemIndex, item, MulePack}: HandleTrade) {
		this.tradeProps = {
			from: {...this.tradeProps.from},
			to: {
				itemIndex,
				MulePack,
				item: this.tradeProps.from.item
			}
		}
		this.handleTrade()
	}

	static handleTrade() {
		if (this.tradeProps.from.MulePack == this.tradeProps.to.MulePack && 
				this.tradeProps.from.itemIndex == this.tradeProps.to.itemIndex) {
			this.clearHandleProps()
			return
		} else {
			this.tradeProps.to.MulePack?.addItem(this.tradeProps.to)
			this.tradeProps.from.MulePack?.removeItem(this.tradeProps.from)
			this.clearHandleProps()
		}
	}

	private static clearHandleProps() {
		MuleInventory.tradeProps = {
			from: {
				itemIndex: 0,
				item: '',
				MulePack: undefined
			},
			to: {
				itemIndex: 0,
				item: '',
				MulePack: undefined
			}
		}
	}

}
