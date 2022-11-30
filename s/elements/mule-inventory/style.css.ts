import {css} from "@chasemoskal/magical/x/camel-css/camel-css-lit.js"

export const styles = css`
	:host {
		display: flex;
		justify-content: center;
	}
	slot {
		display: flex;
		gap: 2em;
	}
`