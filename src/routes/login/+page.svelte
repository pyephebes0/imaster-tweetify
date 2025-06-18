<script>
  import LoginForm from '$lib/components/LoginForm.svelte';

  let error = '';

  async function handleSubmit(event) {
    error = '';
    const { email, password } = event.detail;

    if (!email || !password) {
      error = 'กรุณากรอกข้อมูลให้ครบ';
      return;
    }

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.success) {
      location.href = '/profile';
    } else {
      error = data.error || 'เข้าสู่ระบบไม่สำเร็จ';
    }
  }
</script>

<div class="container mt-5" style="max-width: 400px;">
  <h1 class="mb-4">เข้าสู่ระบบ</h1>

  {#if error}
    <div class="alert alert-danger" role="alert">{error}</div>
  {/if}

  <LoginForm on:submit={handleSubmit} />
</div>
