
import {html} from "lit"
import {view} from "@chasemoskal/magical"

import {BoxGridProps} from "../../../types.js"
import {getPackSize} from "../utils/get-pack-size.js"

export const BoxGrid = view({}, use => (
	{boxes,
	drag,
	size,
	tradeHandlers}: BoxGridProps) => {

	const gridSize = getPackSize(size)

	return html`
		<div style=${`
			grid-template-columns: repeat(${gridSize.columns}, auto);
			grid-template-rows: repeat(${gridSize.rows}, auto);
			`} 
		@pointerup=${(e: PointerEvent) => {
			e.preventDefault()
			const target = <HTMLElement>e.target
			const itemBox = <HTMLElement>target.closest('.item')
			if (itemBox) {
				const i = Number(itemBox.dataset.index)
				tradeHandlers.onTradeCommit(i)
			}
	}} 
		@pointermove=${(e: PointerEvent) => e.preventDefault()}
		class="grid items">
			${boxes.map((box, i) => html`
			<div class=item-box>
				<div
				data-index=${i}
				class=item
				@pointerdown=${(e: PointerEvent) => {
					const target = <HTMLElement>e.target
					const itemBox = <HTMLElement>target.closest('.item')
					if (itemBox && box.item) {
						const i = Number(itemBox.dataset.index)
						tradeHandlers.onTradeStart(i)
					}
					target.releasePointerCapture(e.pointerId);
				}}
				>
				${box?.item}
			</div>
			</div>`)}
		</div>
	`
})
