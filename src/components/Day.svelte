<script lang="ts">
	import { Button, TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import Loading from './Loading.svelte';
	let { day, solution }: { day: number, solution: Promise<{ 1: number | null, 2: number | null }> } = $props();
</script>

<TableBodyRow>
	{#await solution}
		<Loading day={day} />
	{:then answer}
		<TableBodyCell>
			{day}

			<Button title="TODO - Cache the answer" pill={true} class="!p-2">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
					<path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z"/>
				</svg>
			</Button>
		</TableBodyCell>
		<TableBodyCell>{answer['1']}</TableBodyCell>
		<TableBodyCell>{answer['2']}</TableBodyCell>
	{:catch error}
		<TableBodyCell colspan={3}>{error.message}</TableBodyCell>
	{/await}
</TableBodyRow>