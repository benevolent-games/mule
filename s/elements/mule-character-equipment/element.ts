
import {html} from "lit"
import {MagicElement, mixinCss, UseElement} from "@chasemoskal/magical"

import {styles} from "./style.css.js"

@mixinCss(styles)
export class MuleCharacterEquipment extends MagicElement {
	realize(use: UseElement<typeof this>) {

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

		return html``
	}
}
