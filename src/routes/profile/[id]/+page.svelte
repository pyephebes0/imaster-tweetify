<!-- src/routes/profile/[id]/+page.svelte -->
<script lang="ts">
  import ProfileCard from '$lib/components/ProfileCard.svelte';
  export let data;
  let { user } = data;
</script>

<div class="container mt-5">
  <h1 class="mb-4">โปรไฟล์ของฉัน</h1>
  <ProfileCard {user} />
</div>
