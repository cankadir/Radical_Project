
<script>


    import {source} from './store.js';
    let on_off = 'off';
    function swith_source(e){
        if(e.target.checked === true){
            source.set( 'deradical' );
            on_off = 'on'
            // document.getElementById('rad-switch').style.backgroundColor = '#f0227C';
        }
        else{
            source.set( 'radical' );
            on_off = 'off'
            // document.getElementById('rad-switch').style.backgroundColor = '#1D4ED8';

        }
    }

</script>

<!-- Label -->
<div class="label">
    <label class="switch-label">See Deradicalization Initiatives</label>
</div>
<!-- Rounded switch -->
<label class="switch" on:change={swith_source}>
    <input type="checkbox">
    <span class="slider round" id="rad-switch"></span>
</label>

<style>

    .switch-label{
        padding-right: 10px;
        font-size: 11pt !important;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.6) !important;
    }

    .switch {
    position: relative;
    display: inline-block;
    width: 47px;
    height: 20px;
    border: 1px solid #f7f7f7;
    border-radius: 10px;
    }

    /* Hide default HTML checkbox */
    .switch input {
    opacity: 0;
    width: 0;
    height: 0;
    }

    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #333;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 0px;
        bottom: 0px;
        background-color: #f7f7f7;
        /* border: 1px solid #f7f7f7; */
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
    border-radius: 34px;
    }

    .slider.round:before {
    border-radius: 50%;
    }
</style>


