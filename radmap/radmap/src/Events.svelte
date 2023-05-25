<script>

    import {LMap, source, country, region, app_state, active_event} from './store.js';
    export let points;
    import L from 'leaflet';

    let blue = '#1D4ED8';
    let pink = '#f0227C';

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
        console.log(this_source);
        // Circle markers and zoom to bounds
        let region_markers =  []
        filtered_data.forEach(function(d){

            let popup =  `<div class="popup-container"><b>${this_region}</b><br><p>${d['Event Type']}</p><br><p>${d['address']}</p></div>`
            
            let circle = L.marker([d.lat, d.lon], {
                icon: L.divIcon({
                    className: ['event-icon', 'event', this_source].join(' '),
                    iconSize: [15,15]
                })
            }).addTo(map)

            circle.bindTooltip(popup)
            .on('click', function(e){
                active_event.set(d['uid']);
            })

            // console.log(d['uid']);
            console.log(circle._icon);
            circle._icon.id = d['uid'];

            region_markers.push(circle);
        })
        map.flyToBounds( L.featureGroup(region_markers).getBounds(), {padding: [120,120], maxZoom:11} );

    }else{
        reset_event_Markers();
    }


</script>