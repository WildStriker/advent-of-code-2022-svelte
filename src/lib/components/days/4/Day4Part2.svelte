<script lang="ts">
	import { parse_data } from './day_four';

	export let input_data: string;

	let total_overlap: number;

	$: if (input_data) {
		const pairs = parse_data(input_data);
		total_overlap = 0;

		pairs.forEach((pair) => {
			if (pair.elf_1.overlaps(pair.elf_2)) {
				total_overlap += 1;
			}
		});
	}
</script>

{#if input_data}
	<p>
		The total overlapping sections for each pair of elfs is: {total_overlap}
	</p>
{:else}
	<p>please select an input file!</p>
{/if}
