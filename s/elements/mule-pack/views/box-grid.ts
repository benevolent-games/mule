
import {css, html} from "lit"
import {view} from "@chasemoskal/magical"

import {AnimiationStyles, BoxGridProps} from "../../../types.js"
import {getPackSize} from "../utils/get-pack-size.js"

export const BoxGrid = view({}, use => (
	{boxes,
	drag,
	size,
	animationStyles,
	}: BoxGridProps) => {

	const gridSize = getPackSize(size)

	function getBoxDragStyles(style: AnimiationStyles, index: number) {
		return Number(style.animatedBox?.dataset.index) == index
			? `
				top: ${style.styleTop};
				left: ${style.styleLeft};
				position: ${style.position};
			`
			: css``
	}

	return html`
		<div style=${`
			grid-template-columns: repeat(${gridSize.columns}, auto);
			grid-template-rows: repeat(${gridSize.rows}, auto);
			`} 
			class="grid items">
			${boxes.map((box, i) => html`
			<div class=item-box>
				<div
				tabindex="0"
				draggable=${box?.item ? true : false}
				data-index=${i}
				class=item
				style="${getBoxDragStyles(animationStyles, i)}"
				>
				${box?.item}
			</div>
			</div>`)}
		</div>
	`
})
