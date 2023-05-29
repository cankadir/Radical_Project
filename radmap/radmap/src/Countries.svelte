
<script>
    import L from 'leaflet';
    import {LMap, app_state, region}  from "./store.js";
    import { country } from "./store.js";

    const map_object = $LMap;
    export let polygon;

    // STORE VALUES
    let state;
    app_state.subscribe(value => {
        state = value;
    });

    // At world state, whole EU and seeing countries
    $ : if(state === 'world' ){
        map_object.setView([52,0], 3.25);
        country.set('');
        region.set('');
    };

    let this_country;
    country.subscribe(value => {
        this_country = value;
    });

    // If no country is selected
    $: if(state === 'country' && this_country !== ''){
        // Filter geojson to only show this country
        let filtered_polygon = polygon.filter(d => d.properties.name == this_country);
        
        // Fly to the country with padding
        setTimeout(function(){
            map_object.flyToBounds(
                // Filter geojson to only show this country
                L.geoJSON(filtered_polygon).getBounds(),
                { padding: [2,2] , maxZoom: 5}
            )
        }, 200);
    };

    // LEAFLET FUNCTIONS
    function style() {
        return {
            fillColor: "white",
            color: 'white',
            fillOpacity: 0.25,
            weight: 0.5,
            opacity: 1,
        }
    }

    function onEachFeature(feature, layer) {
        //Only bind popup if Owner Column is not empty
        if( feature.properties.name ){
            layer.on({ click:activePolygon }) // Changes store values for active stuff
        }
    };

    function activePolygon(e){
        app_state.set( "country" );
        country.set( String(e.target.feature.properties.name) );
        region.set('')
    }

    // Create GeoJSON Layer
    const layer = L.geoJSON(polygon,{
        style: style,
        onEachFeature: onEachFeature,
    }).addTo(map_object);

    // Assign a seperate ID for park and outside elements. 
    layer.eachLayer(function (polygon) {
        // Assign id and add class
        polygon._path.id = String(polygon.feature.properties.name);
        polygon._path.classList.add("country")
    });

    
</script>