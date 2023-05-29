<script>
    // Adds the points markers to the map as DivIcons (dynamically sized on zoom)
    // Tooltips + click functions on circle markers 
    // Only points in the selected region are shown, data is filtred by Source and Region.

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
        // remove all markers with region class
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

            // add tooltip
            circle.bindTooltip(popup);

            // on click function
            circle.on('click', function(e){

                // Remove all selected-event id's
                document.querySelectorAll('#selected-event').forEach(function(region){
                    // remove only selected-event id, leave the rest of its id
                    region.id = region.id.replace('selected-event', '');
                })
                // Set active event to the selected id in the store
                active_event.set(d['uid']);

                // Add selected-event id to the clicked marker
                e.target._icon.setAttribute("id","selected-event")
            })

            // add unique id (from excel sheet) to the marker
            circle._icon.id = d['uid'];

            // Save the cirlce markers in an array
            region_markers.push(circle);
        })

        // Zoom to bounds of the events in the region.
        map.flyToBounds( L.featureGroup(region_markers).getBounds(), {padding: [120,120], maxZoom:11} );

    }else{
        reset_event_Markers();
    }


</script>