import {component2 as element} from "@chasemoskal/magical/x/component.js"
import {html} from "lit"
import {styles} from "./style.css.js"
import {CharacterView} from "./views/character-view.js"
import {ItemsColumnLeft} from "./views/items-column-left.js"
import {ItemsColumnRight} from "./views/items-column-right.js"

export const MuleCharacterEquipment = element<{}>({
	shadow: true,
	styles: styles,
}).render(use => {
	
	const characterEquipment = [
		{head_1: {}},
		{head_2: {}},
		{body_1: {}},
		{body_2: {}},
		{body_3: {}},
		{body_4: {}},
		{legs_1: {}},
		{legs_2: {}},
		{feet: {}},
		{hands: {}},
	]

	const leftEqColumnItems = characterEquipment.slice(0, 5)
	const rightEqColumnItems = characterEquipment.slice(5, 10)

	return html`
		<div class=container>
			${ItemsColumnLeft(leftEqColumnItems)}
			${CharacterView()}
			${ItemsColumnRight(rightEqColumnItems)}
		</div>
	`
})
