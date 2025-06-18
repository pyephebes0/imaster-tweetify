<script lang="ts">
  export let data;
</script>

<div class="container my-4" style="max-width: 600px;">
  <h3 class="mb-3">โพสต์ย้อนหลัง</h3>

  {#if data.posts.length === 0}
    <div class="alert alert-warning py-2 small">ยังไม่มีโพสต์</div>
  {:else}
    <div class="d-flex flex-column gap-3">
      {#each data.posts as post}
        <div class="d-flex position-relative border rounded p-2 shadow-sm" style="font-size: 0.85rem; gap: 1rem;">
          {#if post.imagePath}
            <img
              src={post.imagePath}
              alt="รูปโพสต์"
              class="flex-shrink-0 rounded"
              style="width: 120px; height: 90px; object-fit: cover;"
            />
          {/if}
          <div class="flex-grow-1">
            <p class="mb-1 fw-semibold" style="font-size: 0.9rem;">{post.content}</p>
            <small class="text-muted">
              โพสต์เมื่อ: {new Date(post.createdAt).toLocaleString()}<br />
              ดีเลย์: {post.delay} วินาที &nbsp;&nbsp;|&nbsp;&nbsp;
              Reposts: {post.reposts ? 'เปิด' : 'ปิด'}
            </small>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
