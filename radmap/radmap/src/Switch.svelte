
<script>

    import {source} from './store.js';
    let on_off = 'off';
    function swith_source(e){
        if(e.target.checked === true){
            source.set( 'deradical' );
            on_off = 'on'
        }
        else{
            source.set( 'radical' );
            on_off = 'off'
        }
    }

</script>

<!-- Label -->
<div class="label">
    <label class="switch-label">Deradicalization {on_off}</label>
</div>
<!-- Rounded switch -->
<label class="switch" on:change={swith_source}>
    <input type="checkbox">
    <span class="slider round"></span>
</label>

<style>
    .switch {
    position: relative;
    display: inline-block;
    width: 47px;
    height: 20px;
    border: 1px solid #f7f7f7;
    border-radius: 34px;
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
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 1px;
    background-color: #858585;
    border: 1px solid #f7f7f7;
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


