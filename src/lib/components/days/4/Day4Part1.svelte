<script lang="ts">
	import { parse_data } from './day_four';

	export let input_data: string;

	let total_overlap: number;

	$: if (input_data) {
		const pairs = parse_data(input_data);
		total_overlap = 0;

		pairs.forEach((pair) => {
			if (pair.elf_1.fully_contains(pair.elf_2) || pair.elf_2.fully_contains(pair.elf_1)) {
				total_overlap += 1;
			}
		});
	}
</script>

{#if input_data}
	<p>
		The total sections that fully contain another section for each pair of elfs is: {total_overlap}
	</p>
{:else}
	<p>please select an input file!</p>
{/if}
