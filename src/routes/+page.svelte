<script lang="ts">
	import { Table, TableBody, TableHead, TableHeadCell } from 'flowbite-svelte';
	import Day from "../components/Day.svelte";

	import type { PageData } from './$types';

	let { data: day }: { data: PageData } = $props();
</script>

<Table>
	<TableHead>
		<TableHeadCell>Day</TableHeadCell>
		<TableHeadCell>P1</TableHeadCell>
		<TableHeadCell>P2</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		<Day day={1} solution={day['1']} />
		<Day day={2} solution={day['2']} />
		<Day day={3} solution={day['3']} />
		<Day day={4} solution={day['4']} />
		<Day day={5} solution={day['5']} />
		<Day day={6} solution={day['6']} />
		<Day day={7} solution={day['7']} />
		<Day day={8} solution={day['8']} />
		<Day day={9} solution={day['9']} />
		<Day day={10} solution={day['10']} />
		<Day day={11} solution={day['11']} />
		<Day day={12} solution={day['12']} />
		<Day day={13} solution={day['13']} />
		<Day day={14} solution={day['14']} />
		<Day day={15} solution={day['15']} />
		<Day day={16} solution={day['16']} />
		<Day day={17} solution={day['17']} />
		<Day day={18} solution={day['18']} />
		<Day day={19} solution={day['19']} />
		<Day day={20} solution={day['20']} />
		<Day day={21} solution={day['21']} />
		<Day day={22} solution={day['22']} />
		<Day day={23} solution={day['23']} />
		<Day day={24} solution={day['24']} />
		<Day day={25} solution={day['25']} />
	</TableBody>
</Table>