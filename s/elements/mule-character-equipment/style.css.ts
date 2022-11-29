import {css} from "@chasemoskal/magical/x/camel-css/camel-css-lit.js"

export const styles = css`
	:host {

	}
	.container {
		display: flex;
		gap: 0.3em;
	}
	.character {
		width: 100px;
		height: 250px;
		text-align: center;
	}
	.items {
		display: flex;
		gap: 0.3em;
		flex-direction: column;
	}
	.item {
		width: 60px;
		height: 60px;
		background-color: #ffffff1c;
	}
`
