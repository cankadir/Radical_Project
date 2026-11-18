<script>
  import { language } from "./store";

    let selectedLanguage = 'en';
    language.set(selectedLanguage);
    function handleChange(event) {
        selectedLanguage = event.target.value;
        language.set(selectedLanguage);
    }

</script>

<style>
    .dropdown {
        position: absolute;
        top: 10px;
        left: 300px;
        z-index: 1000;
    }
</style>

<div class="dropdown">
    <select value={selectedLanguage} on:change={handleChange}>
        <option value="en" selected>English</option>
        <option value="ar">Arabic</option>
    </select>
</div>
