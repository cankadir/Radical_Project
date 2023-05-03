<script>
    
    import {app_state, country, region, source, active_event} from './store.js';
    import Switch from './Switch.svelte';

    export let data;


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
        document.getElementById('left-panel').style.minWidth = '60px';
    }

    function gotoCountry(){
        region.set('');
        app_state.set('country');
    }

    // Show left panel
    $: if(state != 'world' ){
        document.getElementById('left-panel').style.minWidth = '290px';
    }

    // Fiter data to country and source
    let filtered_data;
    $: if(this_country && this_source){
        filtered_data = data.filter(d => d.source == this_source && d.NAME == this_country);
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
            <div id='arrow'>&#8614;</div>
        {:else}

            {#if state == 'country'}
                <p class="back-button" on:click={goBack}>Back to World</p>
                {#if filtered_data}
                    <!-- <p><b>{this_country}</b></p> -->
                    <p> There are {filtered_data.length} {this_source}ization events</p>
                {/if}
            {/if}

            {#if state == 'region'}
                <div class="go-back">
                    <span class="back-button" on:click={goBack}>Back to World</span>
                    <span class="back-button" style="text-decoration:none">&gt;</span>
                    <span class="back-button" on:click={gotoCountry}>{this_country}</span>
                </div>

                <h3 class="info-content">Region: {this_region}</h3>
                {#if active_id != ''}
                    <!-- COMMON COLUMNS -->
                    <p><b>Event Type: </b>{active_event_data['Event Type']}</p>
                    <p><b>Event Description: </b><br>{active_event_data['Event Description']}</p>
                    <p><b>Location: </b><br>{active_event_data['Location']}</p>
                    <p><b>Address: </b><br>{active_event_data['Address']}</p>
                    <!-- Additional Columns fro DERAD-->
                    {#if this_source === 'deradical'}
                        {#each de_rad_columns as column}
                            {#if active_event_data[column]}
                                <p><b>{column}:</b> {active_event_data[column]}</p>
                            {/if}
                        {/each}
                        {#if active_event_data['Links']}
                            <a target="_blank" href={active_event_data['Links']}>Event Link</a>
                        {/if}
                    {/if}
                {/if}
            {/if}
            <Switch/>
        {/if}

    
    </div>
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