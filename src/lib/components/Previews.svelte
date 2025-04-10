<script lang="ts">
  import type {Meme} from "$lib/types";
  
  export let memes: Meme[] = [];
  
  function clickMeme(event: MouseEvent) {
    const target = event.currentTarget as HTMLButtonElement;
    const memeName = target.querySelector('span')?.textContent;
    if (memeName?.replaceAll('\\', '/')) {
      console.log(`Meme clicked: ${memeName}`);
      // Copy the url/memes/memeName to clipboard
      navigator.clipboard.writeText(`${location.hostname}/memes/${memeName}`).then(() => {
        console.log(`Copied to clipboard: /memes/${memeName}`);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
  }
</script>

<div class="memes">
  {#each memes as meme}
    <button class="meme" on:click={clickMeme}>
      <span>{meme.name}</span>
      <img src={"/memes/"+meme.name} alt={meme.name} />
    </button>
  {/each}
</div>

<style>
  .memes {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1rem;
  }

  .meme {
    position: relative;
    background-color: var(--background-3);
    border-radius: 0.5rem;
    cursor: pointer;
    transition: transform 0.2s;
    width: 200px;
    height: 200px;
    border: 1px solid var(--accent-1);
  }
  
  .meme:hover {
    transform: scale(1.075);
    border-color: var(--accent-3);
    box-shadow: 0 0 0.5rem var(--accent-3);
  }

  .meme span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    
  }
  
  .meme img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 198px;
    height: 150px;
    border-radius: 0 0 0.5rem 0.5rem;
  }
</style>
