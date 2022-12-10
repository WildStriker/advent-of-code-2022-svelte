<script lang="ts">
	import { get_duplicates, get_priority, parse_data } from './day_three';

	export let input_data: string;

	let priority_sum: number;

	$: if (input_data) {
		const sacks = parse_data(input_data);
		priority_sum = 0;

		for (let index = 0; index < sacks.length; index = index + 3) {
			const sack_1 = sacks[index];
			const sack_2 = sacks[index + 1];
			const sack_3 = sacks[index + 2];

			let duplicates = get_duplicates(sack_1.all_items, sack_2.all_items);

			// NOTE: there could be multiple letters so compare against sack three
			duplicates = get_duplicates(duplicates, sack_3.all_items);

			// NOTE: assuming only one duplicate exists here
			priority_sum += get_priority(duplicates);
		}
	}
</script>

{#if input_data}
	<p>
		The total priority sum for duplicate items in racksack group of three is: {priority_sum}
	</p>
{:else}
	<p>please select an input file!</p>
{/if}
