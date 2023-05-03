<script>

    import {app_state} from './store.js';

    let state;
    app_state.subscribe(value => {
        state = value;
    });

    $: if(state == 'world'){

        let legend = document.getElementById('legend')
        if (legend) {legend.style.left = '65px';}
    }else{
        let legend = document.getElementById('legend')
        if (legend) {legend.style.left = '295px';}
    }

</script>


<div id="legend">
    <div class="legend-square"></div>
    <div class="legend-text">Countries included</div>
</div>

<style>

    #legend{
        position: absolute;
        bottom: 10px;
        left: 65px;
        z-index: 1000000;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: black;
        padding: 10px;
    }

    .legend-square{
        width: 20px;
        height: 20px;
        background-color: white;
        margin-right: 5px;
    }

    .legend-text{
        font-size: 14px;
        font-weight: 500;
    }

</style>