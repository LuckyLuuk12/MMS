<script lang="ts">

</script>



<nav>
  <a href="/">Search</a>
  <a href="/all">All Memes</a>
  <a href="/about">About</a>
</nav>
<div class="page">
  <slot />
</div>


<style>
  nav {
    font-weight: 800;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 2rem;
    width: 100%;
    background-color: var(--background-1);
    box-shadow: 0 0.5rem 0.5rem var(--background-1);
  }
  

  nav a {
    position: relative;
    color: var(--color-text-1);
    text-decoration: none;
  }

  nav a:hover {
    color: var(--accent-3);
  }
  
  nav a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background-color: var(--accent-3);
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease-out;
  }
  
  nav a:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
  
  .page {
    margin-top: 6rem;
  }
</style>
