<script lang="ts">
  import '$lib/styles/themes.css';
  import '$lib/styles/global.css';
  import '@fortawesome/fontawesome-free/css/all.css';
  import NavBar from '$lib/components/NavBar.svelte';
</script>
<NavBar>
  <slot/>
</NavBar>
