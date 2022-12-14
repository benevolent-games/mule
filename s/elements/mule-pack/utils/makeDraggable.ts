import {StateSetter} from "@chasemoskal/magical/x/view/types.js"
import {AnimiationStyles} from "../../../types.js"
import {MulePack} from "../element.js"

export function makeDraggable(
	getDragState: () => AnimiationStyles,
	setDragState: StateSetter<AnimiationStyles>) {

	return {
		pointerDown: (e: PointerEvent, box: HTMLElement) => {
			const state = getDragState()
			setDragState({
				...state,
				animatedBox: box,
				initialX: e.clientX,
				initialY: e.clientY,
				position: "absolute"
			})
			state.animatedBox?.setAttribute("drag", "")
	},
		pointerUp: (e: PointerEvent, sourcePack: MulePack | undefined) => {
			const state = getDragState()
			if (state.animatedBox) {
				state.animatedBox.removeAttribute("drag")
			}
			setDragState({
				...state,
				styleTop: "auto",
				styleLeft: "auto",
				position: "static"
			})
			const newState = getDragState()
			sourcePack?.setAnimationStyles(newState)
			// its stupid but i needed animatedBox before its removed
			setDragState({
				...state,
				animatedBox: null,
				initialX: 0,
				initialY: 0,
			})
		},
		pointerMove: (e: PointerEvent) => {
			const state = getDragState()
			const dx = e.clientX - state.initialX;
			const dy = e.clientY - state.initialY;
			if (state.animatedBox) {
				setDragState({
					...state,
					initialX: e.clientX,
					initialY: e.clientY,
					styleTop: `${state.animatedBox.offsetTop + dy}px`,
					styleLeft: `${state.animatedBox.offsetLeft + dx}px`
				})
			}
		}
	}
}
