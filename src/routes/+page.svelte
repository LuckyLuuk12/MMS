<script lang="ts">

import SearchBar from "$lib/components/SearchBar.svelte";
import {getMemes} from "$lib";
import {onMount} from "svelte";
import type {Meme} from "$lib/types";

let memes: Meme[] = [];

onMount(() => {
  getMemes().then((data: Meme[]) => {
    memes = data;
  });
});
</script>



<main>
  <SearchBar />
</main>
