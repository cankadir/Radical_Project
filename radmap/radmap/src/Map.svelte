
<script>

    import { onMount } from 'svelte';
    import L from 'leaflet';
    import {LMap} from './store.js'

    let map = L.map( L.DomUtil.create("div") , { 
        center: [49.0, 14.2], 
        zoom: 3,
        minZoom: 3,
        maxZoom: 12,
        // maxBounds: [[10, -30], [85, 80]],
        // maxBoundsViscosity: 0.05,

    });

    LMap.set(map);

    L.tileLayer( 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution:`attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
    }).addTo(map);

    // Move zoom control to top right
    map.zoomControl.setPosition('topright');

    onMount(() => {
        //For Resize Updates
        let mapContainer = document.getElementById('main-map');
        mapContainer.appendChild(map.getContainer());
        map.getContainer().style.width = "100%";
        map.getContainer().style.height = "100%";
        map.invalidateSize();
    });

</script>

<div class="map" id='main-map'>
    <slot/>
</div>

