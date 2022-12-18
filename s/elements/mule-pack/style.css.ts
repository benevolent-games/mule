import {css} from "@chasemoskal/magical/x/camel-css/lit.js"

export const styles = css`
	:host {}
	:host([closed]) {
		display: none;
	}
	.grid {
		display: grid;
		gap: 0.3em;
		height: 100%;
	}
	.item-box {
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
	.item {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 60px;
		height: 60px;
		z-index:1;
		user-select: none;
	}
	.item[drag] {
		position: absolute;
		pointer-events: none;
	}
	svg {
		pointer-events: none;
	}
	.item[data-selected] {
		outline: whitesmoke solid 1px;
		outline-offset: -1px;
		outline-width: 2px;
		border-radius: 5px;
	}
`
