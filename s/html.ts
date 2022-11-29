import {getElements, themeElements, registerElements} from "./main.js"
import {css} from "@chasemoskal/magical/x/camel-css/camel-css-lit.js"

const themeCss = css`
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}`

registerElements(
	themeElements(themeCss, getElements())
)
