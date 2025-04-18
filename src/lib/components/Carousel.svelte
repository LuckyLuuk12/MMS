<script lang="ts">
  import type { Meme } from '$lib/types';

  export let memes: Meme[] = [];
  export let selectedMeme: Meme | null = null;
  $: currentIndex = memes.findIndex(meme => meme === selectedMeme);
  
  let showNotification = false;
  
  function handleCopyToClipboard() {
    if (selectedMeme) {
      navigator.clipboard.writeText(encodeURI(`https://${location.hostname}/memes/${selectedMeme.name}`));
      showNotification = true;
      setTimeout(() => {
        showNotification = false;
      }, 3000); // Hide after 3 seconds
    }
  }
  
</script>

<!-- A large "popup" carousel with manual control, similar to Previews.svelte -->
{#if selectedMeme}
<div class="carousel">
  <div class="meme">
    <h2>{selectedMeme.name.substring(selectedMeme.name.lastIndexOf("/"))}</h2>
    <img src={"/memes/"+selectedMeme.name} alt={selectedMeme.name} />
  </div>
  <!-- Control buttons for previous and next -->
  <div class="control">
    <button class="prev" on:click={() => { selectedMeme = memes[currentIndex - 1 < 0 ? memes.length-1 : currentIndex - 1]; }} aria-label="Previous">
      <i class="fas fa-chevron-left" />
    </button>
    <button class="next" on:click={() => { selectedMeme = memes[currentIndex + 1 >= memes.length ? 0 : currentIndex + 1]; }} aria-label="Next">
      <i class="fas fa-chevron-right" />
    </button>
  </div>
  <!-- Buttons like: copy to clipboard, download, etc. -->
  <div class="buttons">
    <button class="copy" on:click={handleCopyToClipboard} aria-label="Copy to clipboard">
      <i class="fas fa-copy" />
    </button>
    <a class="download" href={"/memes/"+selectedMeme?.name} download aria-label="Download">
      <i class="fas fa-download" />
    </a>
  </div>
  <button class="close" on:click={() => { selectedMeme = null; }} aria-label="Close">
    <i class="fas fa-times" />
  </button>
</div>
  {#if showNotification}
    <div class="notification">
      Copied URL to clipboard
    </div>
  {/if}
{/if}



<style>
  a {
    text-decoration: none;
  }
  .carousel {
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(5, 5, 5, 0.5);
    border-radius: 0.5rem;
    padding: 1rem;
    width: 100vw;
    height: 100vh;
  }
  .meme {
    position: relative;
    background-color: var(--background-3);
    border-radius: 0.5rem;
    cursor: pointer;
    transition: transform 0.2s;
    width: 80%;
    height: 80%;
    border: 1px solid var(--accent-1);
  }
  .meme h2 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    text-align: center;
    color: var(--color-text-1);
    z-index: 1;
  }
  .meme img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0 0 0.5rem 0.5rem;
  }
  
  .control {
    display: flex;
    justify-content: space-between;
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .control button {
    background: none;
    border: none;
    color: var(--color-text-1);
    cursor: pointer;
    min-height: 8rem;
    min-width: 2rem;
    padding: 0.5rem;
    margin: 5rem;
    transition: background 0.2s;
    border-radius: 0.5rem;
  }
  .control button:hover {
    background: var(--background-3);
  }
  .control button i {
    font-size: 3rem;
    color: var(--color-text-1);
  }
  .control button:hover i {
    color: var(--accent-3);
  }
  .buttons {
    display: flex;
    justify-content: space-around;
    width: 100%;
    position: absolute;
    bottom: 5%;
  }
  .buttons button, .buttons a {
    background: none;
    border: none;
    color: var(--color-text-1);
    font-size: 2rem;
    min-width: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem;
    transition: background 0.2s;
    border-radius: 0.5rem;
  }
  .buttons button i, .buttons a i {
    font-size: 2rem;
    color: var(--color-text-1);
  }
  .buttons button:hover i, .buttons a:hover i {
    color: var(--accent-3);
  }
  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: var(--color-text-1);
    min-width: 5rem;
    min-height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem;
    transition: background 0.2s;
  }
  .close i {
    font-size: 3rem;
    color: var(--color-text-1);
  }
  .close:hover i {
    color: var(--accent-3);
    border-radius: 0.5rem;
  }
  .notification {
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    background: linear-gradient(90deg, var(--accent-1), var(--accent-3), var(--accent-1));
    background-size: 300% 100%;
    color: var(--color-text-1);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
    opacity: 1;
    transition: opacity 1s ease-out;
    z-index: 50;
    animation: gradientMove 6s infinite;
  }
  
  @keyframes gradientMove {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
</style>
