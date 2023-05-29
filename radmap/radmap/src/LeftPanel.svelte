<script>
    
    import { each } from 'svelte/internal';
    import {app_state, country, region, source, active_event} from './store.js';
    import Switch from './Switch.svelte';
    import {groupBy, mean, map} from 'lodash';
    
    export let data_all;
    
    let data = data_all.main;
    let info = data_all.country_info;

    // STORE DATA
    let this_country;
    country.subscribe(value => {
        this_country = value;
    });
    
    let state;
    app_state.subscribe(value => {
        state = value;
    });

    let this_source;
    source.subscribe(value => {
        this_source = value;
    });

    let this_region;
    region.subscribe(value => {
        this_region = value;
    });

    let active_id;
        active_event.subscribe(value => {
        active_id = value;
    });

    // BACK FUNCTIONS
    function goBack(){
        app_state.set('world');
        region.set('');
        active_event.set('');
        document.getElementById('left-panel').style.minWidth = '60px';
    }

    function gotoCountry(){
        region.set('');
        active_event.set('');
        app_state.set('country');
    }

    let country_counts = groupBy( data, 'Country');
    for (const [key, value] of Object.entries(country_counts)) {
        if (key !== 'null'){
            country_counts[key] = value.length;
        }else{
            delete country_counts[key];
        }
    }

    // Fiter data to country and source
    let filtered_data;
    let filtered_info;
    $: if(this_country && this_source){
        filtered_data = data.filter(d => d.source == this_source && d.NAME == this_country);
        filtered_info = info.find(d => d.Country == this_country);
    }

    let region_data;
    $: if(this_region && this_source){
        region_data = data.filter(d => d.source == this_source && d.Region == this_region);
        region_data = region_data[0]
        console.log(region_data);
    }

    // If a specific event is cliked make it active
    let active_event_data;
    $: if(active_id != ''){
        active_event_data = data.find(d => d.uid == active_id);
    }

    let de_rad_columns = [
        'Program Name',
        'Date',
        'Region',
        'Scale',
        'Targets',
        'Approach',
        'Agents']

</script>

<div class='panel' id="left-panel">
    
    <div class="left-content">
        
        <!-- Left Info contect based on App State -->
        {#if state == 'world'}
            <!-- <div id='arrow'>&#8614;</div> -->
            <div><span class="country-title">Welcome to the D.Rad Interactive Map</span></div>
            <br>
            <span class="event-info">The D.Rad interactive map is an innovative and interactive web application that offers a comprehensive and visually appealing roadmap for individuals seeking to explore and understand the world of radical ideologies. With its user-friendly interface and rich content, the D.Rad interactive map is a unique resource for anyone interested in examining radicalisation and polarisation in Europe and the Middle East.</span>
            <br><br>
            <span class="event-title">To begin exploring, click on one of the countries listed below.</span>

            {#each Object.entries(country_counts) as [key, value]}
                <div class="country-count" on:click={() => {country.set(key); app_state.set('country');}}>
                    <span class="country-name">{key}</span>
                    <span class="country-count">{value}</span>
                </div>
            {/each}

        {:else}

            {#if state == 'country'}
                <p class="back-button" on:click={goBack}>Back to World</p>
                {#if filtered_data}
                    <p class="country-title">{this_country}</p>
                    <p class="country-info"> There are {filtered_data.length} {this_source}ization events</p>
                    <p class="country-info"> {filtered_info['Info']}</p>
                {/if}
            {/if}

            {#if state == 'region'}
                <div class="go-back">
                    <span class="back-button" on:click={goBack}>Back to World</span>
                    <span class="back-button" style="text-decoration:none">&gt;</span>
                    <span class="back-button" on:click={gotoCountry}>{this_country}</span>
                </div>

                <h3 class="info-content">{this_region}</h3>

                {#if active_id != ''}
                    <!-- COMMON COLUMNS -->
                    <p><span class='event-title'>Event Type: </span><span class="event-info">{active_event_data['Event Type']}</span></p>
                    <p><span class='event-title'>Event Description:</span><br><span class="event-info">{active_event_data['Event Description']}</span></p>
                    <p><span class='event-title'>Location: </span><br><span class="event-info">{active_event_data['Location']}</span></p>

                    {#if this_source === 'deradical'}
                        <!-- {#each de_rad_columns as column} -->
                        {#each ['Program Name','Approach','Targets','Scale','Agents','Date'] as column}
                            {#if active_event_data[column]}
                                <p> <span class='event-title'>{column}</span>: <span class="event-info">{active_event_data[column]}</span></p>
                            {/if}
                        {/each}
                        {#if active_event_data['Links']}
                            <a target="_blank" href={active_event_data['Links']}>Event Link</a>
                        {/if}
                    {/if}
                
                {:else}
                    <p><span class="event-info">{region_data['Region Info']}</span></p>
                {/if}
            {/if}
        {/if}

    </div>
    
    <!-- SWITCH ELEMENT, Rad, Derad -->
    {#if state !== 'world'}
        <div id="switch-holder">
            <Switch/>
        </div>
    {/if}

</div>

<style>

    #arrow{
        font-size: 20pt;
        margin: 20px auto;
        cursor: pointer;
    }

    .back-button{
        cursor: pointer;
        font-size: 11pt;
        color: #999;
        text-decoration: underline #333
    }
</style>