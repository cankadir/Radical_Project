<script>

	import {onMount} from 'svelte';
	import Map from './Map.svelte';
	import Countries from './Countries.svelte';
	import {app_state, source} from './store.js';
	import LeftPanel from './LeftPanel.svelte';
	import Regions from './Regions.svelte';
	import Events from './Events.svelte';
	import Legend from './Legend.svelte';

	// APP STATE
	let state;
	app_state.subscribe(value => {
		state = value;
	});
	$: if( state){ "APP STATE:" , console.log(state) }
	source.set( "radical" );

	// DATA
	let data = {
			world:[],
			main:[]
		}

	onMount(async () => {
			// Import Data from 3 Resources
			// 1. World Administrative Boundaries
			const response = await fetch('data/world-administrative-boundaries_RAD_4236.geojson')
			const json = await response.json()
			data.world = json.features;

			// 2. Radicalization Data
			const main_data = await fetch('data/data.json')
			const json_main_data = await main_data.json()
			data.main = json_main_data;
		})


</script>

<svelte:head>
	<link rel="stylesheet" href="assets/leaflet/leaflet.css" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<main>

  {#if (data.main.length > 0) && (data.world.length > 0) }

			<!-- LEFT PANEL -->
			<LeftPanel data={data.main} />


			<!-- RIGHT PANEL MAP -->
			<Map>
				<Countries polygon={data.world} />
				<Regions points = {data.main} />
				<Events points = {data.main} />
			</Map>

			<Legend />

  {/if}
 
</main>

