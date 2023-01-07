
import {html} from "xiome/x/toolbox/hamster-html/html.js"
import {WebsiteContext} from "xiome/x/toolbox/hamster-html/website/build-website-types.js"

import pageHtml from "../partials/page.html.js"

const urls = {
	github: "https://github.com/benevolent-games/mule",
	website: "https://benevolent.games/"
}

export default (context: WebsiteContext) => pageHtml({
	...context,
	mainContent: html`
		<header>
			<h1><span>🫏</span> mule</h1>
			<p>inventory management system for web games</p>
			<p>powering <a href="${urls.website}">benevolent.games</a></p>
			<p>see mule on <a href="${urls.github}">github</a></p>
		</header>

		<mule-inventory>
			<div class=character-eq>
				<mule-pack character size="1x5"></mule-pack>
					<mule-character-equipment>
						some character here
					</mule-character-equipment>
				<mule-pack character size="1x5"></mule-pack>
			</div>
			<div class=inventory-items>
				<mule-pack size="8x4"></mule-pack>
				<mule-pack primary size="8x1"></mule-pack>
			</div>
			<mule-pack closed nearby size="5x5"></mule-pack>
			<mule-pack closed trade size="5x5"></mule-pack>
		</mule-inventory>
	`,
})
