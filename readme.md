
🫏 **mule** · game inventory system
===================================

mule is a configurable inventory system for web games, and has web ui to allow players to interact with their inventories and perform common actions.

⚡ live demo (coming soon)  
⚡ works with any web game engine  
⚡ framework-agnostic web components  
⚡ written in typescript  

<br/>

mule installation
-----------------

1. insert into your html head
	```html
	<script
		type=importmap-shim
		src="https://unpkg.com/@benev/mule/x/importmap.json"
		defer
	></script>
	<script
		type=module-shim
		src="https://unpkg.com/@benev/mule/x/html.js"
		defer
	></script>
	<script
		src="https://unpkg.com/es-module-shims/dist/es-module-shims.wasm.js"
		defer
	></script>
	```

1. insert into `<body>`
	```html
	<mule-inventory>
		<mule-pack size=8x4></mule-pack>
		<mule-pack-trade></mule-pack-trade>
		<mule-pack-nearby size=8x4></mule-pack-nearby>
		<div>
			<humanoid-character-view></humanoid-character-view>
			<humanoid-character-stats></humanoid-character-stats>
			<mule-character-equipment></mule-character-equipment>
		</div>
	</mule-inventory>
	```
