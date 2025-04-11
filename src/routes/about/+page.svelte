<script lang="ts">
  import Carousel from "$lib/components/Carousel.svelte";
  import type { Meme } from "$lib/types";
  import { getMemes } from "$lib";
  import {onMount} from "svelte";
  let memes: Meme[] = []
  onMount(() => {
    getMemes().then((data: Meme[]) => {
      memes = data;
    });
  });
</script>

<main>
  <div class="about">
    <h1>My Memes Site?</h1>
    <p>
      This site is basically a "private" site for me to store my memes.
      If you are here, you probably know me and I probably sent you a link to this site.
      So congratulations, you are one of the few cool people on this planet!
      <br><br>
      If you want your memes to be added, just send them to me and I will add them.<br>
      Feel free to <a href="https://discordapp.com/users/463695638094282772">Discord Me</a>!
    </p>
  </div>
</main>

<style>
  main {
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    text-align: center;
  }
  .about {
    max-width: 500px;
  }
  .about h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  .about p {
    font-size: 1.2rem;
    max-width: 800px;
  }
  .about a {
    color: var(--accent-3);
    text-decoration: none;
  }
</style>

