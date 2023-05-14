<script>

    import {LMap, source, country, region, app_state, active_event} from './store.js';
    export let points;
    import L from 'leaflet';

    // DATA FROM STORE
    let this_region;
    region.subscribe(value => {
        this_region = value;
    });

    let this_source;
    source.subscribe(value => {
        this_source = value;
    });

    let this_country;
    country.subscribe(value => {
        this_country = value;
    });

    let state;
    app_state.subscribe(value => {
        state = value;
    });

    let map = $LMap;
    
    function reset_event_Markers(){
        // remove all markers wirh region class
        document.querySelectorAll('.event').forEach(function(region){
			region.parentNode.removeChild(region);
		})
    }

    // FILTER DATA and put markers on map
    let filtered_data;
    $: if( this_region != ''){
        reset_event_Markers();
        filtered_data = points.filter(d => d.Region == this_region && d.source == this_source);

        // Circle markers and zoom to bounds
        let region_markers =  []
        filtered_data.forEach(function(d){

            let popup =  `<div class="popup-container"><b>${this_region}</b><br><p>${d['Event Type']}</p><br><p>${d['address']}</p></div>`
            let circle = L.circle([d.lat, d.lon], {
                // Remove border
                color: '#333',
                weight: 2,
                fillColor: '#009Bf5',
                fillOpacity: 1,
                radius: 250
            }).addTo(map)
            .bindTooltip(popup)
            .on('click', function(e){
                active_event.set(d['uid']);
            })

            // assign class to circle
            circle._path.classList.add('event');
            circle._path.classList.add(this_source);
            // Add id
            circle._path.id = d['uid'];
            region_markers.push(circle);
        })
        map.flyToBounds( L.featureGroup(region_markers).getBounds(), {padding: [120,120], maxZoom:11} );

    }else{
        reset_event_Markers();
    }


</script>