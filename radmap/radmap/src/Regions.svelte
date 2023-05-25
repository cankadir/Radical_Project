
<script>

    import {LMap, source, country, region, app_state} from './store.js';
    import {groupBy, mean, map} from 'lodash';
    import L from 'leaflet';

    export let data;

    let blue = '#1D4ED8';
    let pink = '#f0227C';
    
    let points = data.main;
    // let info = data.country_info;

    let map_object = $LMap;

    // GET STORE VARIABLES
    let state;
    app_state.subscribe(value => {
        state = value;
    });

    let this_source;
    source.subscribe(value => {
        this_source = value;
    });
    let this_country;
    country.subscribe(value => {
        this_country = value;
    });

    let this_region;
    region.subscribe(value => {
        this_region = value;
    });

    // remove all regions from the map
    function reset_Markers(){
        // remove all markers wirh region class
        document.querySelectorAll('.region').forEach(function(region){
			region.parentNode.removeChild(region);
		})
		document.querySelectorAll('.region-circle').forEach(function(event){
			event.parentNode.removeChild(event);
		})
		document.querySelectorAll('.region-annot').forEach(function(event){
			event.parentNode.removeChild(event);
		})
    }

    // Set region in store to selected region
    function setRegion() {
        return function(e) {
            let region_name = e.target.options.icon.options.id;
            region.set(region_name);
            app_state.set('region');
        }
    }

    // Group and make new markers
    function group_show(points, source, country){

        reset_Markers();

        // filter points by source
        let points_filtered = points.filter(d => d.source == source);
        if (country){
            points_filtered = points_filtered.filter(d => d.NAME == country);
        }
        let region_groups = groupBy(points_filtered, 'Region');

        for (const [key, value] of Object.entries(region_groups)) {

            let lat = mean(map(value, 'lat'));
            let lon = mean(map(value, 'lon'));
            let country = value[0].NAME;
            // let source = value[0].source;

            let num_events = value.length;
            let popup = `<b>${key}</b><br>${num_events} events`;

            let num_events_norm;
            if (num_events > 5) {
                num_events_norm = 28;
            } else if ( num_events > 1){
                num_events_norm = 20;
            }else {
                num_events_norm = 12;
            }

            let divIcon = L.divIcon({
                            className: `region ${source} ${country}`,
                            id: key,
                            html: `<div class="region-circle region-${source}" style="width:${num_events_norm}px;height:${num_events_norm}px"><div class="region-annot"><div id="symbology" style="line-height:${num_events_norm}px">${num_events}</div></div></div>`
                        });
                // --- REGION MARKER ---
                let marker = L.marker([lat, lon], {icon: divIcon})
                    .addTo(map_object)
                    .bindTooltip(popup)
                    .on('click', setRegion() )

            }
    }

    // Switch data by source
    $: if(this_source != '' && this_country != '' && this_region === ''){
        // Change markers based on source
        if(this_source === 'radical'){
            console.log('Source is radical');
            group_show(points, this_source, this_country);
        }else{
            console.log('Source is de-radical');
            group_show(points, this_source, this_country);
        }
    }

    // Switch data by country
    // Hide all markers in world scale
    $: if( (state !== 'country') ){
        document.querySelectorAll('.region').forEach(function(region){
            region.style.display = 'none';
        })
        document.querySelectorAll('.region-circle').forEach(function(event){
			event.style.display = 'none';
		})
		document.querySelectorAll('.region-annot').forEach(function(event){
			event.style.display = 'none';
		})

        document.querySelectorAll('.country').forEach(function(event){
			event.style.display = 'none';
		})

        
    }else{
        document.querySelectorAll('.region').forEach(function(region){
            region.style.display = 'block';
        })
        document.querySelectorAll('.region-circle').forEach(function(event){
            event.style.display = 'block';
        })
        document.querySelectorAll('.region-annot').forEach(function(event){
            event.style.display = 'block';
        })

        document.querySelectorAll('.country').forEach(function(event){
			event.style.display = 'block';
		})
    }

    $: if( (state === 'world') ){
        console.log('this is the world');
        document.querySelectorAll('.country').forEach(function(event){
			event.style.display = 'block';
		})
    }

</script>
