<script lang="ts">
	import { page } from '$app/stores';
	import type { Day } from '$lib/models/day';
	import { days_store } from '$lib/stores/days';
	import { Tabs, TabItem, Radio, Spinner, Alert } from 'flowbite-svelte';
	import { Fileupload, Label } from 'flowbite-svelte';

	let day: Day | undefined;
	let input_data: string;
	let file_option: string;
	let promise_data: Promise<string> | null = null;

	$: if (day?.id !== $page.params.day) {
		day = days_store.get($page.params.day);
		input_data = '';
		file_option = 'local';
	}

	function file_selected(event: Event) {
		const target = event.target as HTMLInputElement;
		const files = target.files;

		let file_reader = new FileReader();

		file_reader.onload = function (event) {
			input_data = file_reader.result as string;
		};

		if (files) {
			file_reader.readAsText(files[0]);
		}
	}

	async function fetch_file() {
		const file_name = `day_${day?.id}.txt`;
		const response = await self.fetch(`/input/days/${file_name}`);
		if (response.ok) {
			input_data = await response.text();
			return file_name;
		} else {
			throw new Error('Unable to load data from file!');
		}
	}

	function file_option_changed(_event: Event) {
		input_data = '';
		if (file_option === 'server') {
			promise_data = fetch_file();
		}
	}
</script>

{#if day}
	<div class="text-3xl">
		{day.name}
	</div>

	<div class="my-8 flex items-center">
		<ul
			class="divide-y divide-gray-200
			       rounded-lg border border-gray-300 
		         bg-gray-50
		         dark:divide-gray-600 dark:border-gray-600 dark:bg-gray-800"
		>
			<li>
				<Radio class="p-3" on:change={file_option_changed} bind:group={file_option} value="local">
					Pick a File (Local)
				</Radio>
			</li>
			<li>
				<Radio class="p-3" on:change={file_option_changed} bind:group={file_option} value="server">
					Provided File (Server)
				</Radio>
			</li>
		</ul>
		<div class="ml-3">
			{#if file_option === 'local'}
				<div class="mt-5">
					<Fileupload on:change={file_selected} />
				</div>
			{:else}
				{#await promise_data}
					<div>
						<Spinner class="mr-3" size="4" />
						Loading ...
					</div>
				{:then file_name}
					<p>Input File {file_name} Loaded!</p>
				{:catch error}
					<Alert color="red">
						<span class="font-medium">An Error Occured!</span>
						{error.message}
					</Alert>
				{/await}
			{/if}
		</div>
	</div>

	<Tabs>
		{#each day.parts as part, index}
			<TabItem open={index === 0} title="Part {part.id}">
				<svelte:component this={part.component} {input_data} />
			</TabItem>
		{/each}
	</Tabs>
{:else}
	<div>Not Found!</div>
{/if}
