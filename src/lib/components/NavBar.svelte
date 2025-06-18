<script lang="ts">
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';

  const user = derived(page, ($page) => $page.data?.user);
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">iMaster</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      {#if $user}
        <!-- เมนูซ้าย -->
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link" href="/tweet">โพสต์</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/history">โพสต์ย้อนหลัง</a>
          </li>
        </ul>

        <!-- เมนูผู้ใช้ขวาสุด -->
        <ul class="navbar-nav ms-auto">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle d-flex align-items-center"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="/avatar.png"
                alt="User"
                width="32"
                height="32"
                class="rounded-circle me-2"
              />
              <span>{$user.username}</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="/profile">โปรไฟล์</a></li>
              <li><a class="dropdown-item" href="/settings">ตั้งค่า</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="/logout">ออกจากระบบ</a></li>
            </ul>
          </li>
        </ul>
      {:else}
        <!-- ปุ่มเข้าสู่ระบบด้านขวาสุด -->
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="/signup">สมัครสมาชิก</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/login">เข้าสู่ระบบ</a>
          </li>
        </ul>
      {/if}
    </div>
  </div>
</nav>
