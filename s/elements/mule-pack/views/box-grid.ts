
import {css, html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"
import {getPackSize} from "../utils/get-pack-size.js"
import {BoxGridProps, Drag} from "../../../types.js"
import {makeDraggable} from "../utils/makeDraggable.js"
import {hackGetter} from "../utils/hack.getter.js"
import { MulePack } from "../element.js"

export const BoxGrid = view(use => (
	{boxes,
		drag,
	element,
	size,
		// tradeHandlers
	}: BoxGridProps) => {

	const gridSize = getPackSize(size)

function getBoxDragStyles(dragState: {
    element: HTMLElement | undefined;
    initialX: number;
    initialY: number;
    styleTop: string;
    styleLeft: string;
    position: string;
}, index: number) {
  return dragState.element && Number(dragState.element.dataset.index) == index
    ? `
      top: ${dragState.styleTop};
      left: ${dragState.styleLeft};
      position: ${dragState.position};
    `
    : css``
}

	return html`
		<div style=${`
			grid-template-columns: repeat(${gridSize.columns}, auto);
			grid-template-rows: repeat(${gridSize.rows}, auto);
			`} 
		}}
		@pointerdown=${(e: PointerEvent) => {
		// e.preventDefault()
			const draggable = makeDraggable(getDragState, setDragState)
		 	const MulePackBox = <HTMLElement>findBox(e)
			const target = <HTMLElement>e.target
			const MulePack = <MulePack>target
			if (MulePackBox) {
				const i = Number(MulePackBox.dataset.index)
				 // tradeHandlers.onTradeStart(i)
				draggable.pointerDown(e, MulePackBox)
				}
				target.releasePointerCapture(e.pointerId)
		}}
		class="grid items">
			${boxes.map((box, i) => html`
			<div class=item-box>
				<div
				data-index=${i}
				class=item
				style="${getBoxDragStyles(dragState, i)}"
				>
				${box?.item}
			</div>
			</div>`)}
		</div>
	`
})
