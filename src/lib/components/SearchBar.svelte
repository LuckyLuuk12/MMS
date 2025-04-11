<script lang="ts">
  import { onMount } from 'svelte';
  import {getMemes, getCategories, search, getExtensions} from '$lib/index';
  import type { Meme } from '$lib/types';
  import Previews from "$lib/components/Previews.svelte";
  
  let memesList: Meme[] = [];
  let filteredMemes: Meme[] = [];
  let searchQuery = '';
  let selectedCategories: string[] = [];
  let selectedTypes: string[] = [];
  let selectedExtensions: string[] = [];
  
  $: categories = getCategories(memesList);
  $: extensions = getExtensions(memesList);
  const types = ['img', 'video', 'audio', 'unknown'];
  
  function applyFilters() {
    let results = memesList;
    
    if (selectedCategories.length > 0) {
      results = results.filter((meme) => selectedCategories.some((category) => meme.name.includes(category)));
    }
    // If selectedExtensions is not empty, keep memes that match any of the selected extensions
    if (selectedExtensions.length > 0) {
      results = results.filter((meme) => selectedExtensions.some((ext) => meme.name.endsWith(ext)));
    }
    // If selectedTypes is not empty, keep memes that match any of the selected types
    if (selectedTypes.length > 0) {
      results = results.filter((meme) => selectedTypes.some((type) => meme.type === type));
    }
    
    filteredMemes = search(searchQuery, results);
  }
  
  onMount(() => {
    getMemes().then((data: Meme[]) => {
      memesList = data;
      filteredMemes = data;
    });
  });
</script>

<div class="container">
  <div class="filters left">
    <div>
      <label for="cat">Categories:</label>
      {#each categories as cat}
        <label>
          <input
                  type="checkbox"
                  name="cat"
                  value={cat}
                  bind:group={selectedCategories}
                  on:change={applyFilters}
          />
          {cat}
        </label>
      {/each}
      <label>
        <input
                type="checkbox"
                name="cat"
                value=""
                bind:group={selectedCategories}
                on:change={applyFilters}
        />
        All
      </label>
    </div>
  </div>
  
  <div class="search-bar">
    <input
            type="text"
            placeholder="Search memes..."
            bind:value={searchQuery}
            on:input={applyFilters}
    />
  </div>
  
  <div class="filters right">
    <div>
      <label for="type">Type:</label>
      {#each types as type}
        <label>
          <input
                  type="checkbox"
                  name="type"
                  value={type}
                  bind:group={selectedTypes}
                  on:change={applyFilters}
          />
          {type}
        </label>
      {/each}
      <label>
        <input
                type="checkbox"
                name="type"
                value=""
                bind:group={selectedTypes}
                on:change={applyFilters}
        />
        All
      </label>
    </div>
    <div>
      <label for="ext">Extensions:</label>
      {#each extensions as ext}
        <label>
          <input
                  type="checkbox"
                  name="ext"
                  value={ext}
                  bind:group={selectedCategories}
                  on:change={applyFilters}
          />
          {ext}
        </label>
      {/each}
      <label>
        <input
                type="checkbox"
                name="ext"
                value=""
                bind:group={selectedCategories}
                on:change={applyFilters}
        />
        All
      </label>
    </div>
  </div>
</div>
<Previews memes={filteredMemes} />

<style>
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: fit-content;
    color: var(--color-text-1);
    padding: 1rem;
  }
  
  .filters {
    display: flex;
    justify-content: space-around;
    width: 20%;
    background: var(--gradient-background-3);
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px var(--background-1);
  }
  
  .filters label {
    display: block;
    color: var(--color-text-2);
  }
  
  .filters select,
  .filters input[type="radio"] {
    margin-bottom: 0.5rem;
  }
  
  .search-bar {
    width: 50%;
    text-align: center;
  }
  
  .search-bar input {
    width: 100%;
    padding: 1rem 0.5rem;
    border: 1px solid var(--background-3);
    border-radius: 0.25rem;
    background: var(--background-2);
    color: var(--color-text-1);
  }
  .search-bar input::placeholder {
    opacity: 0.5;
  }
  .search-bar input:hover {
    border-color: var(--accent-3);
    box-shadow: 0 0 4px var(--accent-3);
  }
  .search-bar input:hover::placeholder {
    color: var(--accent-3);
  }
  .search-bar input:focus {
    outline: none;
    border-color: var(--accent-2);
    box-shadow: 0 0 4px var(--accent-2);
  }
  .search-bar input:focus::placeholder {
    color: var(--accent-2);
  }
  
  input[type="checkbox"] {
    accent-color: var(--accent-2);
    transform: scale(1.2);
    margin: 0 0.25rem;
    cursor: pointer;
    box-shadow: 0 0 2px var(--accent-2);
  }
  
</style>
