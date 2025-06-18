<script>
  import NavBar from '$lib/components/NavBar.svelte';
</script>

<NavBar />

<div class="container mt-4">
  <slot />
</div>

<footer class="text-center mt-5 text-muted">
  <small>© 2025 Tweetify</small>
</footer>
