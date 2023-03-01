export function findBoxes(e: KeyboardEvent | PointerEvent) {
		const grid = <HTMLElement | undefined>e.composedPath().find(el => (el as Element).className == "grid items")
		return grid?.children
	}
