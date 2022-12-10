<script lang="ts">
	import { parse_data, OurPickType } from './day_two';

	export let input_data: string;

	let total_score: number;

	$: if (input_data) {
		const rounds = parse_data(input_data, OurPickType.OurResult);
		total_score = 0;

		rounds.forEach((round) => {
			total_score += round.get_score();
		});
	}
</script>

{#if input_data}
	<p>
		The total score is: {total_score}, if the second input is our result!
	</p>
{:else}
	<p>please select an input file!</p>
{/if}
