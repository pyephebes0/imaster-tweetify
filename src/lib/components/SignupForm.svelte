<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let username = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let localError = '';

  function submit() {
    localError = '';

    if (!username || !email || !password || !confirmPassword) {
      localError = 'กรุณากรอกข้อมูลให้ครบ';
      return;
    }

    if (password !== confirmPassword) {
      localError = 'รหัสผ่านไม่ตรงกัน';
      return;
    }

    dispatch('submit', { username, email, password });
  }
</script>

<form on:submit|preventDefault={submit}>
  {#if localError}
    <div class="alert alert-danger">{localError}</div>
  {/if}

  <div class="mb-3">
    <label class="form-label">ชื่อผู้ใช้ (Username)</label>
    <input class="form-control" type="text" bind:value={username} required />
  </div>

  <div class="mb-3">
    <label class="form-label">อีเมล</label>
    <input class="form-control" type="email" bind:value={email} required />
  </div>

  <div class="mb-3">
    <label class="form-label">รหัสผ่าน</label>
    <input class="form-control" type="password" bind:value={password} required />
  </div>

  <div class="mb-3">
    <label class="form-label">ยืนยันรหัสผ่าน</label>
    <input class="form-control" type="password" bind:value={confirmPassword} required />
  </div>

  <button class="btn btn-primary w-100">สมัครสมาชิก</button>
</form>
