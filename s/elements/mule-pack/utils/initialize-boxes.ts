import {Box} from "../../../types.js"
import shieldSvg from "../../shield.svg.js"
import swordSvg from "../../demo.svg.js"
import {getPackSize} from "./get-pack-size.js"

export function initializeBoxes(size: string) {
	const packSize = getPackSize(size)
	const arr: Box[] = new Array(packSize.columns * packSize.rows).fill({item: undefined, quantity: 0}).fill({item: Math.random() < 0.5 ? swordSvg : shieldSvg, quantity: 1}, Math.random() < 0.5 ? 0 : 1, 2)
	return arr
}
