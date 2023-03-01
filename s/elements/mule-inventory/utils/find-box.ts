export function findBox(e: PointerEvent | KeyboardEvent) {
	return e.composedPath().find((el) => (el as Element).className == "item")
}
