import {MuleInventory} from "../element.js"

export function getMulePacks(MuleInventory: MuleInventory) {
	const mulePacks: Element[] = []
	const queryMulePacks = MuleInventory.shadowRoot?.querySelector("slot")?.assignedElements({flatten: true}).map(element => {
	const queriedMulePacks = Array.from(element.querySelectorAll("mule-pack"))
	if (queriedMulePacks.length > 0)
		mulePacks.push(...queriedMulePacks)
	})
	return mulePacks
}
