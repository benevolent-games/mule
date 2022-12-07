
import {PackAddress} from "../types.js"

export function trade({
		source,
		target,
	}: {
		source: PackAddress
		target: PackAddress
	}) {

	const targetBox = target
		.pack
		.getBox(target.index)

	const sourceBox = source
		.pack
		.getBox(source.index)

	target
		.pack
		.setBox(target.index, sourceBox)

	source
		.pack
		.setBox(source.index, targetBox)
}
