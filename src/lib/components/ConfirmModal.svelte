<!-- ConfirmModal.svelte -->
<script>
  export let id = 'confirmModal';
  export let title = 'ยืนยัน';
  export let message = 'คุณแน่ใจหรือไม่?';
  export let onConfirm = () => {};
</script>

<!-- Trigger Button -->
<button
  class="btn btn-danger"
  data-bs-toggle="modal"
  data-bs-target={`#${id}`}
>
  ลบโพสต์
</button>

<!-- Modal -->
<div class="modal fade" id={id} tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="ปิด"></button>
      </div>
      <div class="modal-body">
        <p>{message}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
        <button type="button" class="btn btn-danger" on:click={onConfirm} data-bs-dismiss="modal">ยืนยัน</button>
      </div>
    </div>
  </div>
</div>
