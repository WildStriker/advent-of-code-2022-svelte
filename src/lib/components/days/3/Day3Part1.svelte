<script lang="ts">
	import { get_duplicates, get_priority, parse_data } from './day_three';

	export let input_data: string;

	let priority_sum: number;

	$: if (input_data) {
		const sacks = parse_data(input_data);
		priority_sum = 0;

		sacks.forEach((sack) => {
			const duplicates = get_duplicates(sack.first_compartment, sack.second_compartment);

			// NOTE: assuming only one duplicate exists here
			priority_sum += get_priority(duplicates);
		});
	}
</script>

{#if input_data}
	<p>
		The total priority sum for duplicate items in each racksack is: {priority_sum}
	</p>
{:else}
	<p>please select an input file!</p>
{/if}
