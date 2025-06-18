<!-- PostCard.svelte -->
<script>
  export let title = 'ชื่อโพสต์';
  export let content = 'เนื้อหาโพสต์แบบสั้น';
</script>

<div class="card mb-3">
  <div class="card-body">
    <h5 class="card-title">{title}</h5>
    <p class="card-text">{content}</p>
    <a href="#" class="btn btn-primary">อ่านต่อ</a>
  </div>
</div>
