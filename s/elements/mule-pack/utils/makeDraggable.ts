import {StateSetter} from "@chasemoskal/magical/x/view/types.js"

export function makeDraggable(
	getDragState: () => {
    element: HTMLElement | undefined;
    initialX: number;
    initialY: number;
    styleTop: string;
    styleLeft: string;
    position: string;
},
setDragState: StateSetter<{
    element: HTMLElement | undefined;
    initialX: number;
    initialY: number;
    styleTop: string;
    styleLeft: string;
    position: string;
}>	) {

	 return {
		 pointerDown: (e: PointerEvent, element: HTMLElement) => {
			//  e.preventDefault();
			const state = getDragState()
			
			 setDragState({
				 ...state,
				 element: element,
				 initialX: e.clientX,
				 initialY: e.clientY,
				position: "absolute"
			 })
			 state.element?.setAttribute("drag", "")
		 },
		 pointerUp: (e: PointerEvent) => {
			 const state = getDragState()
			 if (state.element) {
				 console.log(state.element)
				 state.element.removeAttribute("drag")
				 
			 }
			 setDragState({
				 element: undefined,
				 initialX: 0,
				 initialY: 0,
				 styleTop: "auto",
				 styleLeft: "auto",
				position: "static"
			 })
		 },
		 pointerMove: (e: PointerEvent) => {
			//  e.preventDefault();
			 const state = getDragState()
			 const dx = e.clientX - state.initialX;
			 const dy = e.clientY - state.initialY;

			 if (state.element) {
				 setDragState({
				 ...state,
				 initialX: e.clientX,
				 initialY: e.clientY,
				 styleTop: `${state.element.offsetTop + dy}px`,
				 styleLeft: `${state.element.offsetLeft + dx}px`
			 })
			}
		 }
	 }
}
