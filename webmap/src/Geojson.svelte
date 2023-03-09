
<script>
    import * as L from 'leaflet';
    import { count } from "./store.js";

    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

    export let geojson;
    console.log( geojson );

    //countValue is map object stored in the store.js
    let map;
    count.subscribe(value => {
        map = value;
    });

    //Zoom to active polygon and write id to store.
    function activePolygon(e){

        //Zoom to active polygon
        map.fitBounds(e.target.getBounds(), {padding: [5,5]}); //Zoom to polygon

        //Set an active class to clicked Element
        let active = [...document.getElementsByClassName("active")];
        if (active.length > 0){ //If an element is selected
            active.forEach( function(feature){
                feature.className.baseVal = 'leaflet-interactive'; //Set it back to leaflet
            })
        }

        //Bring all polygons, (layer) back so that the border is visible
        layer.bringToBack();

        // Active POlygon Declaration
        e.target._path.className.baseVal = e.target._path.className.baseVal + " active";
        e.target.bringToFront()
        
        //Send active ID out
        dispatch('message', {
			active: e.target
		}); 
    }

    function onEachFeature(feature, layer) {
        //Only bind popup if Owner Column is not empty
        if( feature.properties.name ){
            layer.openTooltip();
            layer.on({
                click:activePolygon,
            }) 
        }
    };

    // Polygon Style
    function style(feature) {
        return {
            fillColor: "white",
            color: 'gold',
            fillOpacity: 0.5,
            weight: 0.5,
            opacity: 0.9,
        };
    }

    // Create GeoJSON Layer
    const layer = L.geoJSON(geojson,{
        style: style,
        onEachFeature: onEachFeature,
    }).addTo(map);

    // Assign a seperate ID for park and outside elements. 
    layer.eachLayer(function (polygon) {
        polygon._path.id = String(polygon.feature.properties.name);
    });

</script>

<slot />