
<script>


    export let active_country;

    // import L from "leaflet";
    // import { onMount } from "svelte";
    import { count } from "./store.js";

    function resetView(){
		// show all polygons
		let all_polygons = document.querySelectorAll('.leaflet-interactive');
		all_polygons.forEach(function(poly){
			poly.style.display = 'block';
		})

		//countValue is map object stored in the store.js
		let map;
		count.subscribe(value => {
			map = value;
			});

		map.setView([49,14.2], 3);

	}

</script>



{#if active_country)
    {active_country}
{/if}

<button class="reset" on:click="{resetView}">Reset Selection</button>