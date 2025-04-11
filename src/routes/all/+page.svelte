<script lang="ts">

import Previews from "$lib/components/Previews.svelte";
import type {Meme} from "$lib/types";
import {getMemes} from "$lib";
import {onMount} from "svelte";

let memes: Meme[] = [];

onMount(() => {
  getMemes().then((data) => {
    memes = data;
  });
})
</script>



<main>
  <Previews memes={memes} />
</main>
