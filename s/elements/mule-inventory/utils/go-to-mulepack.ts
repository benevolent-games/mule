export function goToMulePack(mulePack: Element) {
	const nextBox = <HTMLElement>mulePack?.shadowRoot?.querySelectorAll(".item")[0]
	nextBox?.focus()
}
