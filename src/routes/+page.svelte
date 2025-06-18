<script>
  let name = '';
  const submit = () => {
    alert(`ยินดีต้อนรับ, ${name || 'ผู้ใช้'}!`);
  };
</script>

<div class="container d-flex flex-column justify-content-center align-items-center min-vh-100 text-center">
  <div class="card shadow-lg p-4" style="max-width: 500px; width: 100%;">
    <h1 class="text-gradient fw-bold mb-4">👋 ยินดีต้อนรับสู่ iMaster</h1>
    <p class="text-muted mb-4">กรอกชื่อของคุณด้านล่างและทักทายกัน!</p>

    <div class="mb-3 w-100">
      <input
        type="text"
        class="form-control form-control-lg"
        placeholder="กรอกชื่อของคุณ"
        bind:value={name}
      />
    </div>

    <button class="btn btn-primary btn-lg w-100" on:click={submit}>
      🚀 ส่งข้อมูล
    </button>

    {#if name}
      <p class="mt-3 text-success">ดีใจที่ได้รู้จัก <strong>{name}</strong>! 😊</p>
    {/if}
  </div>
</div>

<style>
  .text-gradient {
    background: linear-gradient(90deg, #007bff, #6f42c1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
