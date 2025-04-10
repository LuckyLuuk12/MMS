<script lang="ts">
  import type {Meme} from "$lib/types";
  
  export let memes: Meme[] = [];
  
  function clickMeme(event: MouseEvent) {
    const target = event.currentTarget as HTMLButtonElement;
    const memeName = target.querySelector('p')?.textContent;
    if (memeName) {
      console.log(`Meme clicked: ${memeName}`);
      // Handle the click event, e.g., navigate to a detail page or show a modal
    }
  }
</script>

<div class="memes">
  {#each memes as meme}
    <button class="meme" on:click={clickMeme}>
      <img src={"/memes/"+meme.name} alt={meme.name} />
      <span>{meme.name}</span>
    </button>
  {/each}
</div>

<style>
  .memes {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .meme {
    background-color: var(--color-background);
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    padding: 0.5rem;
    transition: transform 0.2s;
  }

  .meme:hover {
    transform: scale(1.05);
  }

  .meme img {
    width: 100px;
    height: auto;
    border-radius: 0.5rem;
  }
</style>
