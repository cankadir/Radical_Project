
<script>
    import L from 'leaflet';
    import {LMap, app_state, region}  from "./store.js";
    import { country } from "./store.js";

    const map_object = $LMap;
    export let polygon;

    // APP STATE
    let state;
    app_state.subscribe(value => {
        state = value;
    });

    $ : if(state === 'world' ){
        map_object.flyToBounds(
            layer.getBounds(),
            { padding: [2,2] , maxZoom: 4}
        )
        country.set('');
        region.set('');
    };

    let this_country;
    country.subscribe(value => {
        this_country = value;
    });

    $: if(state === 'country' && this_country !== ''){
        // console.log(polygon.properties)
        let filtered_polygon = polygon.filter(d => d.properties.name == this_country);
        

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
            let popup = `<b>${feature.properties.name}</b>`;
            layer.bindTooltip(popup,{permanent: false, sticky:true, direction: 'center', className: 'tooltip'});
            layer.on({ click:activePolygon }) 
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

    // Zoom to Layer at initiation
    map_object.fitBounds(
        layer.getBounds(),
        { padding: [2,2] , maxZoom: 4}
    );
    
</script>