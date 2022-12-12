
import {html} from "lit"
import {property} from "lit/decorators.js"
import {MagicElement, mixinCss, UseElement} from "@chasemoskal/magical"

import {styles} from "./style.css.js"
import {trade} from "../../utils/trade.js"
import {MulePack} from "../mule-pack/element.js"

@mixinCss(styles)
export class MuleInventory extends MagicElement {

	@property()
	private sourcePack: MulePack | undefined

	setSourcePack(pack: MulePack | undefined) {
		this.sourcePack = pack
	}

	handleDrop = (
			targetPack: MulePack,
			targetIndex: number
		) => {
		const {sourcePack} = this
		if (sourcePack) {
			const drag = sourcePack.getDrag()
			if (!drag)
				throw new Error("invalid drag ended without a start")
			trade({
				source: {
					pack: sourcePack,
					index: drag.index,
				},
				target: {
					pack: targetPack,
					index: targetIndex,
				},
			})
		}
	}

	realize(use: UseElement<typeof this>) {
		return html`<slot></slot>`
	}
}
