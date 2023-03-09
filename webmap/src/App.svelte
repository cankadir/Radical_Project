<script>
	import {onMount} from 'svelte';
	import LeafletMap from './Map.svelte';
	import GeoJson from './Geojson.svelte';

	// Empty Container for the json datasets (3 of them) to be used.
	let data = {
		world:[],
		radical:[],
		deradical:[],
	}

	onMount(async () => {
		// Import Data from 3 Resources
		// 1. World Administrative Boundaries
		const response = await fetch('data/world-administrative-boundaries_Clean4236.geojson')
		const json = await response.json()
		data.world = json.features;
		//console.log( data.world );

		// 2. Radicalization Data
		const response_radical = await fetch('data/Radical.geojson')
		const json_radical = await response_radical.json()
		data.radical = json_radical.features;
		//console.log( data.radical );

		// 3. DeRadicalization Data
		const response_deradical = await fetch('data/DeRadical.geojson')
		const json_deradical = await response_deradical.json()
		data.deradical = json_deradical.features;
		//console.log( data.deradical );
	})

	//Handle Clicked Geojson Object, Point or Polygon. Returns active Polygon Object
	function handleMessage(e){

		// Get clicked polygons unique ID
		let active = e.detail.active;
		let obj_id = active._path.id

		console.log( obj_id );

		// Radical Data, Filtered by Clicked Country
		let active_radical = data.radical.filter(function(feature){
			// console.log( feature )
			if( feature.properties.NAME === obj_id ){ return true }
		});

		console.log( active_radical );

		// Radical Data, Filtered by Clicked Country
		let active_deradical = data.deradical.filter(function(feature){
			// console.log( feature )
			if( feature.properties.NAME === obj_id ){ return true }
		});

		console.log( active_deradical );
	}

	
</script>

<svelte:head>
	<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css" rel="stylesheet"/>
	<link rel="stylesheet" href="https://use.typekit.net/kjc8ltt.css">
	<link rel="stylesheet" href="leaflet.css">
</svelte:head>

{#if (data.world.length > 0) & (data.radical.length > 0) & (data.deradical.length > 0) }
	<div class="container">
		<div class="header">This is header content</div>
		<div class="content">
			<div class="panels-container">
				<div class='panel' id="left-panel">left</div>
				<div class='panel' id="right-panel">
					<LeafletMap>
						<GeoJson on:message={handleMessage} geojson={data.world} />
					</LeafletMap>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="wait">
		Loading.... <br>
		Please Wait...
	</div>
{/if}
	
<style>

	div{
		color:azure;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		font-size: 16px;
		font-weight: 400;
	}

	.panel{
		padding:5px;
	}
	.panels-container {
		display: flex;
		flex-flow: row;
		height: 100%;
	}

	.panels-container > #left-panel{
		width:33%;
		min-width: 250px;
		max-width: 330px;
		background-color: red;
	}

	.panels-container > #right-panel{
		flex:1;
		background-color: orange;
	}

	.container {
		display: flex;
		flex-flow: column;
		height: 100%;
	}

	.header {
		height:50px;
		padding: 5px;
	}

	.content {
		flex:1;
		overflow: auto;
		background: gold;
	}


</style>