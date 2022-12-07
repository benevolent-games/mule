
import {html} from "lit"
import {component2 as element} from "@chasemoskal/magical/x/component.js"

import {styles} from "./style.css.js"
import {trade} from "../../utils/trade.js"
import {MulePack} from "../mule-pack/element2.js"

export type MuleInventory = InstanceType<typeof MuleInventory>

export const MuleInventory = element<{
		setSourcePack(p: undefined | MulePack): void
		handleDrop(p: MulePack, i: number): void
	}>({
		styles,
		shadow: true,
		properties: {
			setSourcePack: {attribute: false},
			handleDrop: {attribute: false},
		},
	}).render(use => {

	const [sourcePack, setSourcePack, getSourcePack]
		= use.state<undefined | MulePack>(undefined)

	use.setup(() => {
		use.element.setSourcePack = setSourcePack
		use.element.handleDrop = (
				targetPack: MulePack,
				targetIndex: number
			) => {
			const sourcePack = getSourcePack()
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
	})

	return html`<slot></slot>`
})
