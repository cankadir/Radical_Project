
<script>
    // Initialize Map
    // Store map object to store

    import { onMount } from 'svelte';
    import L from 'leaflet';
    import {LMap, language} from './store.js'

    let map = L.map( L.DomUtil.create("div") , { 
        center:[0,0],
        zoom:5,
        zoomSnap: 0.25,
    });

    // Get langugage from store
    let selectedLanguage;
    language.subscribe(value => {
        selectedLanguage = value;
    });

    // create a reactive new variable that is "" if the language is english and "ar" if the language is arabic
    let lang = '';
    $: lang = selectedLanguage === 'en' ? '' : '_AR';
    $: console.log("This is OK" , lang);

    
    // Separate labels and tiles to have labels above polygons
    map.createPane('labels');
    map.getPane('labels').style.zIndex = 550;
    map.getPane('labels').style.pointerEvents = 'none';

    // Save map object to store
    LMap.set(map);

    // Map Tiles
    var CartoDB_DarkMatterNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(map);

    // Map Labels
    var CartoDB_DarkMatterOnlyLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png', {
        pane: 'labels'
    }).addTo(map);

    // Move zoom control to top right
    map.zoomControl.setPosition('topright');

    //For Resize Updates
    onMount(() => {
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

