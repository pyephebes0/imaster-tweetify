<script>
  import SignupForm from '$lib/components/SignupForm.svelte';

  let error = '';

  async function handleSubmit(event) {
    error = '';
    const { username, email, password } = event.detail;

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();

    if (data.success) {
      alert('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ');
      location.href = '/login';
    } else {
      error = data.error || 'สมัครสมาชิกไม่สำเร็จ';
    }
  }
</script>

<div class="container mt-5" style="max-width: 400px;">
  <h1 class="mb-4">สมัครสมาชิก</h1>

  {#if error}
    <div class="alert alert-danger" role="alert">{error}</div>
  {/if}

  <SignupForm on:submit={handleSubmit} />
</div>
