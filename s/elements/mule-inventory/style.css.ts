import {css} from "@chasemoskal/magical/x/camel-css/camel-css-lit.js"

export const styles = css`
	:host {
		display: flex;
		justify-content: center;
		touch-action: none;
	}
	slot {
		display: flex;
		gap: 2em;
		width: 100%;
		justify-content: center;
	}
`
