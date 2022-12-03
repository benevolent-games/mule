export {themeElements} from "@chasemoskal/magical/x/theme-elements.js"
export {registerElements} from "@chasemoskal/magical/x/register-elements.js"

import {MuleCharacterEquipment} from "./elements/mule-character-equipment/element.js"
import {MuleInventory} from "./elements/mule-inventory/element.js"
import {MulePack} from "./elements/mule-pack/element.js"

export const getElements = () => ({
	MulePack,
	MuleInventory,
	MuleCharacterEquipment
})
