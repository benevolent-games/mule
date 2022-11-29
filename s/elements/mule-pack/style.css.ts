import {css} from "@chasemoskal/magical/x/camel-css/camel-css-lit.js"

export const styles = css`
	:host {}
	.grid {
		display: grid;
		gap: 0.3em;
	}
	.item {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #ffffff1c;
		width: 60px;
		height: 60px;
	}
	.primary-items {
		display: flex;
		gap: 0.3em;
		margin-top: 1em;
	}

`
