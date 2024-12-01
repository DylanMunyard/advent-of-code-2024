<script lang="ts">
	import { TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import Loading from './Loading.svelte';
	let { day, solution }: { day: number, solution: Promise<{ 1: number | null, 2: number | null }> } = $props();
</script>

<TableBodyRow>
	{#await solution}
		<Loading day={day} />
	{:then answer}
		<TableBodyCell>{day}</TableBodyCell>
		<TableBodyCell>{answer['1']}</TableBodyCell>
		<TableBodyCell>{answer['2']}</TableBodyCell>
	{:catch error}
		<TableBodyCell colspan={3}>{error.message}</TableBodyCell>
	{/await}
</TableBodyRow>