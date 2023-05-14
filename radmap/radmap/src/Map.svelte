
<script>

    import { onMount } from 'svelte';
    import L from 'leaflet';
    import {LMap} from './store.js'

    let map = L.map( L.DomUtil.create("div") , { 
        center:[0,0],
        zoom:5,
        zoomSnap: 0.25,
    });
    
    map.createPane('labels');
    map.getPane('labels').style.zIndex = 650;
    map.getPane('labels').style.pointerEvents = 'none';

    LMap.set(map);

    // L.tileLayer( 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    //     attribution:`attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
    // }).addTo(map);

    var CartoDB_DarkMatterNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        // subdomains: 'abcd',
        // maxZoom: 20
    }).addTo(map);

    var CartoDB_DarkMatterOnlyLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png', {
        // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        pane: 'labels'
        // maxZoom: 20
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

