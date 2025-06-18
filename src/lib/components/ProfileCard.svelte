<script>
  export let user = null;
</script>

{#if user}
  <div class="card" style="max-width: 400px; margin: auto;">
    <div class="card-body">
      <h5 class="card-title">{user.username}</h5>
      <p class="card-text"><strong>อีเมล:</strong> {user.email}</p>
      <!-- เพิ่มข้อมูลอื่นๆ ได้ตามต้องการ -->
    </div>
  </div>
{:else}
  <p>กำลังโหลดข้อมูล...</p>
{/if}
