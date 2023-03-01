import {MulePack} from "../../mule-pack/element.js"
import {findBox} from "./find-box.js"
import {getPackSize} from "../../mule-pack/utils/get-pack-size.js"
import {findBoxes} from "./find-boxes.js"
import {MulePackData} from "../types.js"

export function getCurrentMulePackData (e: KeyboardEvent | PointerEvent, mulePacks: Element[]): MulePackData {
	const MulePack = e.target as MulePack
	const indexOfPack = mulePacks.indexOf(MulePack!)
	const MulePackBox = findBox(e) as HTMLElement | undefined
	return {
		MulePack,
		currentPackSize: getPackSize(MulePack?.size),
		MulePackBox,
		boxes: findBoxes(e),
		box: findBox(e) as HTMLElement,
		indexOfPack,
		nextMulePack: mulePacks[indexOfPack + 1],
		previousMulePack: mulePacks[indexOfPack - 1],
		indexOfCurrentBox: Number(MulePackBox?.dataset.index),
		isDraggable: MulePackBox?.draggable
	}
}
