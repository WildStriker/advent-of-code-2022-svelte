<script lang="ts">
	import { parse_data } from './day_five';
	import StackDisplay from './StackDisplay.svelte';

	export let input_data: string;

	let stacks: string[][];
	$: if (input_data) {
		stacks = parse_data(input_data, true);
	}
</script>

{#if input_data}
	<StackDisplay {stacks} />
{:else}
	<p>please select an input file!</p>
{/if}
