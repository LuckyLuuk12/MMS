<script lang="ts">
  import { onMount } from 'svelte';
  import { getMemes, getCategories, search } from '$lib/index';
  import type { Meme } from '$lib/types';
  
  export let memesList: Meme[];
  let filteredMemes: Meme[] = [];
  let searchQuery = '';
  let selectedCategories: string[] = [];
  let selectedType: string | null = null;
  
  let categories: string[] = [];
  const types = ['img', 'video', 'audio', 'unknown'];
  
  function applyFilters() {
    let results = memesList;
    
    if (selectedCategories.length > 0) {
      results = results.filter((meme) =>
              selectedCategories.every((category) => meme.name.includes(category))
      );
    }
    
    if (selectedType) {
      results = results.filter((meme) => meme.type === selectedType);
    }
    
    filteredMemes = search(searchQuery, results);
  }
</script>

<div class="container">
  <div class="filters left">
    <label>Categories:</label>
    <select multiple bind:value={selectedCategories} on:change={applyFilters}>
      {#each categories as category}
        <option value={category}>{category}</option>
      {/each}
    </select>
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
    <label>Type:</label>
    {#each types as type}
      <label>
        <input
                type="radio"
                name="type"
                value={type}
                bind:group={selectedType}
                on:change={applyFilters}
        />
        {type}
      </label>
    {/each}
    <label>
      <input
              type="radio"
              name="type"
              value=""
              bind:group={selectedType}
              on:change={applyFilters}
      />
      All
    </label>
  </div>
</div>

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
    width: 20%;
    background: var(--gradient-background-3);
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px var(--background-1);
  }
  
  .filters label {
    display: block;
    margin-bottom: 0.5rem;
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
    padding: 0.5rem;
    border: 1px solid var(--background-3);
    border-radius: 0.25rem;
    background: var(--background-2);
    color: var(--color-text-1);
  }
  
  .search-bar input:focus {
    outline: none;
    border-color: var(--accent-1);
    box-shadow: 0 0 4px var(--accent-1);
  }
  
  .results {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
    color: var(--color-text-2);
  }
  
  .results li {
    padding: 0.5rem;
    border-bottom: 1px solid var(--background-3);
  }
  
  .results li:last-child {
    border-bottom: none;
  }
</style>
