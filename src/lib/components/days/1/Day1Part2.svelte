<script lang="ts">
	import { parse_data } from './day_one';

	export let input_data: string;

	let top_three_total: number;

	$: if (input_data) {
		const elfs = parse_data(input_data);

		elfs.sort((elf_1, elf_2) => elf_2.total_calories - elf_1.total_calories);

		const top_three = elfs.slice(0, 3);

		top_three_total = 0;
		top_three.forEach((elf) => {
			top_three_total += elf.total_calories;
		});
	}
</script>

{#if input_data}
	<p>
		The top three elfs have a total of: {top_three_total}
	</p>
{:else}
	<p>please select an input file!</p>
{/if}
