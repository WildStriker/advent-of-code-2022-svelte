<script lang="ts">
	export let stacks: string[][];
</script>

{#if stacks}
	<div class="mb-4 text-xl underline">Cargo Crate Stacks:</div>
	<div class="flex">
		{#each stacks as stack, stack_index}
			<div class="m-1 flex flex-col-reverse text-center">
				<div>
					{stack_index + 1}
				</div>
				{#each stack as crate, create_index}
					<div
						class="m-1 border-4 px-3 py-2
					{create_index >= stack.length - 1 ? 'border-green-500' : 'border-red-600'}
					"
					>
						{crate}
					</div>
				{/each}
			</div>
		{/each}
	</div>

	<div>The last crates on each stack are:</div>
	<div>
		{#each stacks as stack}
			{stack[stack.length - 1]}
		{/each}
	</div>
{:else}
	<p>No Stack to Display!</p>
{/if}
