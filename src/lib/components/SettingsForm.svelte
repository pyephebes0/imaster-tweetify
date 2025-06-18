<!-- src/lib/components/SettingsForm.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  let accounts: any[] = [];
  let loading = false;

  const fetchAccounts = async () => {
    loading = true;
    const res = await fetch('/api/x/accounts');
    if (res.ok) {
      accounts = await res.json();
    }
    loading = false;
  };

  const connectNew = () => {
    window.location.href = '/api/auth/x/start';
  };

  const disconnect = async (id: string) => {
    const res = await fetch(`/api/x/disconnect/${id}`, { method: 'DELETE' });
    if (res.ok) {
      accounts = accounts.filter(acc => acc.id !== id);
    }
  };

  onMount(fetchAccounts);
</script>

<div class="container mt-5" style="max-width: 700px;">
  <h2 class="mb-4">ตั้งค่าบัญชี X (Twitter)</h2>

  <button class="btn btn-primary mb-3" on:click={connectNew}>
    + เชื่อมบัญชี Twitter (X)
  </button>

  {#if loading}
    <div class="alert alert-info">กำลังโหลดบัญชี...</div>
  {:else if accounts.length > 0}
    <ul class="list-group">
      {#each accounts as acc}
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>@{acc.username}</strong> — {acc.name}
          </div>
          <button class="btn btn-outline-danger btn-sm" on:click={() => disconnect(acc.id)}>
            ยกเลิกเชื่อม
          </button>
        </li>
      {/each}
    </ul>
  {:else}
    <div class="alert alert-secondary">ยังไม่มีบัญชีที่เชื่อม</div>
  {/if}
</div>
