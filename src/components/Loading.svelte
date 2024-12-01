<script lang="ts">
	import { TableBodyCell } from 'flowbite-svelte';
	let { day }: { day: number } = $props();
</script>

<TableBodyCell>{day}</TableBodyCell>
<TableBodyCell>
	<div role="status" class="max-w-sm animate-pulse">
		<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
	</div>
</TableBodyCell>
<TableBodyCell>
	<div role="status" class="max-w-sm animate-pulse">
		<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
	</div>
</TableBodyCell>
