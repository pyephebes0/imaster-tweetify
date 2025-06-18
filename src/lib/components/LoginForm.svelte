<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let email = '';
  let password = '';

  function submit() {
    dispatch('submit', { email, password });
  }
</script>

<form on:submit|preventDefault={submit}>
  <div class="mb-3">
    <label class="form-label">อีเมล</label>
    <input class="form-control" type="email" bind:value={email} required />
  </div>

  <div class="mb-3">
    <label class="form-label">รหัสผ่าน</label>
    <input class="form-control" type="password" bind:value={password} required />
  </div>

  <button class="btn btn-primary w-100">เข้าสู่ระบบ</button>
</form>
