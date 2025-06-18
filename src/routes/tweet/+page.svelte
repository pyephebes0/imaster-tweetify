<script lang="ts">
	let content = '';
	let image: File | null = null;
	let loading = false;
	let success = false;

	let delayOptions = [
		{ label: 'ไม่ดีเลย์', value: 0 },
		{ label: '5 วินาที', value: 5 },
		{ label: '10 วินาที', value: 10 },
		{ label: '30 วินาที', value: 30 },
		{ label: '1 นาที', value: 60 }
	];
	let selectedDelay = 0;
	let repostsEnabled = false;

	const handleSubmit = async () => {
		if (!content.trim()) return;

		loading = true;
		success = false;

		const formData = new FormData();
		formData.append('content', content);
		if (image) formData.append('image', image);
		formData.append('delay', String(selectedDelay));
		formData.append('reposts', String(repostsEnabled));

		// ส่งข้อมูลไป API
		const res = await fetch('/api/tweet', {
			method: 'POST',
			body: formData
		});

		if (res.ok) {
			content = '';
			image = null;
			selectedDelay = 0;
			repostsEnabled = false;
			success = true;
		}

		loading = false;
	};
</script>

<div class="container mt-5" style="max-width: 600px;">
	<h2 class="mb-4">สร้างโพสต์ใหม่</h2>

	{#if success}
		<div class="alert alert-success">โพสต์สำเร็จแล้ว!</div>
	{/if}

	<form on:submit|preventDefault={handleSubmit}>
		<div class="mb-3">
			<label for="content" class="form-label">เนื้อหาโพสต์</label>
			<textarea
				id="content"
				class="form-control"
				rows="4"
				bind:value={content}
				placeholder="คุณกำลังคิดอะไรอยู่..."
				required
			></textarea>
		</div>

		<div class="mb-3">
			<label for="image" class="form-label">อัปโหลดรูปภาพ (ถ้ามี)</label>
			<input
				class="form-control"
				type="file"
				id="image"
				accept="image/*"
				on:change={(e) => (image = e.target.files?.[0])}
			/>
			{#if image}
				<div class="mb-3">
					<label class="form-label">รูปที่จะโพสต์:</label><br />
					<img
						src={URL.createObjectURL(image)}
						alt="Preview"
						class="img-fluid rounded"
						style="max-height: 300px;"
					/>
				</div>
			{/if}
		</div>

		<div class="mb-3">
			<label for="delaySelect" class="form-label">เลือกดีเลย์ (Delay)</label>
			<select id="delaySelect" class="form-select" bind:value={selectedDelay}>
				{#each delayOptions as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</div>

		<div class="form-check form-switch mb-3">
			<input
				class="form-check-input"
				type="checkbox"
				id="repostsSwitch"
				bind:checked={repostsEnabled}
			/>
			<label class="form-check-label" for="repostsSwitch"> เปิดใช้งาน Reposts </label>
		</div>

		<button class="btn btn-primary" type="submit" disabled={loading}>
			{#if loading}
				<span class="spinner-border spinner-border-sm me-2" role="status"></span>
				กำลังโพสต์...
			{:else}
				โพสต์เลย!
			{/if}
		</button>
	</form>
</div>
