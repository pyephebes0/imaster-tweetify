<!-- src/lib/components/Alert.svelte -->
<script>
  export let message = 'Hello!';
</script>

<div class="alert alert-warning alert-dismissible fade show" role="alert">
  {message}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
