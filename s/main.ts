
export {themeElements} from "@chasemoskal/magical"
export {registerElements} from "@chasemoskal/magical"

import {MulePack} from "./elements/mule-pack/element.js"
import {MuleInventory} from "./elements/mule-inventory/element.js"
import {MuleCharacterEquipment} from "./elements/mule-character-equipment/element.js"

export const getElements = () => ({
	MulePack,
	MuleInventory,
	MuleCharacterEquipment
})
