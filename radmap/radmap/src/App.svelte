<script>

	import {onMount} from 'svelte';
	import Map from './Map.svelte';
	import Countries from './Countries.svelte';
	import {app_state, source} from './store.js';
	import LeftPanel from './LeftPanel.svelte';
	import Regions from './Regions.svelte';
	import Events from './Events.svelte';
	import LanguageDd from './LanguageDD.svelte';

	// APP STATE
	// This defines the state of the app, 
	// Country, region or event are the 3 zoom scaled and event. 
	let state;
	app_state.subscribe(value => {
		state = value;
	});
	$: if( state ){ "APP STATE:" , console.log(state) }
	source.set( "radical" );

	// DATA
	let data = {
			world:[],
			main:[],
			country_info: [],
		}


	onMount(async () => {
			// Import Data from 3 Resources
			// 1. World Administrative Boundaries
			const response = await fetch('data/DeRad_Boundaries.geojson')
			const json = await response.json()
			data.world = json.features;

			// 2. Radicalization Data
			const main_data = await fetch('data/data_update_8.json') 
			const json_main_data = await main_data.json()
			data.main = json_main_data;

			// 3. Country Info, this comes from a different file. 
			const country_info = await fetch('data/DRad_County.json')
			const json_country_info = await country_info.json()
			data.country_info = json_country_info;

			console.log("DATA:", data.main)
		})

</script>

<svelte:head>
	<link rel="stylesheet" href="assets/leaflet/leaflet.css" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" >
	<!-- <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"> -->
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,300;0,400;0,700;1,300&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,600&display=swap" rel="stylesheet">

</svelte:head>

<main>
	{#if (data.main.length > 0) && (data.world.length > 0) && (data.country_info.length > 0)}

		<!-- LEFT PANEL -->
		<LeftPanel data_all={data} />
		
		<!-- LANGUAGE DROPDOWN -->
		<LanguageDd />

		<!-- RIGHT PANEL MAP -->
		<Map>
			<Countries polygon={data.world} />
			<Regions data = {data}/>
			<Events points = {data.main} />
		</Map>

	{/if}
</main>

