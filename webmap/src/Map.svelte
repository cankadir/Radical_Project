<script>
    import L from "leaflet";
    import { onMount } from "svelte";
    import { count } from "./store.js";

    let mapContainer;

    let map = L.map(L.DomUtil.create("div"), {
        center: [49.0, 14.2],
        zoom: 3,
    });

    //set map to store. It needs to be accessed from other objects
    count.set(map)

    // CartoDB Dark Matter Basemap
    let tileURL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'

    L.tileLayer(tileURL, {
        //maxZoom: 19,
        //minZoom: 16,
        attribution:`attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
    }).addTo(map);

    onMount(() => {
        //For Resize Updates
        mapContainer.appendChild(map.getContainer());
        map.getContainer().style.width = "100%";
        map.getContainer().style.height = "100%";
        map.invalidateSize();
    });

</script>

<style>
    .map {
        height: 100%;
        width: 100%;
    }

</style>

<div class="map" bind:this="{mapContainer}">
    <slot></slot>
</div>