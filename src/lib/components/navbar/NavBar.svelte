<script>
	import { page } from '$app/stores';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Dropdown,
		DropdownItem,
		Chevron
	} from 'flowbite-svelte';
	import ThemeSelector from './ThemeSelector.svelte';

	import { days_store } from '$lib/stores/days';
</script>

<Navbar let:hidden let:toggle class="border-b border-gray-200 dark:border-gray-700">
	<NavBrand href="/">
		<img src="/favicon.png" class="mr-3 h-6 sm:h-9" alt="Advent of Code" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			Advent Of Code 2022
		</span>
	</NavBrand>
	<div class="flex md:order-2">
		<ThemeSelector />
		<NavHamburger on:click={toggle} />
	</div>
	<NavUl {hidden} class="md:bg-transparent">
		<NavLi href="/" active={$page.url.pathname === '/'}>Home</NavLi>
		<NavLi id="day-selection" class="cursor-pointer"><Chevron aligned>Days</Chevron></NavLi>
		<Dropdown triggeredBy="#day-selection" class="z-20">
			{#each $days_store as day}
				{@const href = `/days/${day.id}`}
				{@const active = $page.url.pathname.includes(href)}
				<DropdownItem
					{href}
					defaultClass="font-medium py-2 px-4 text-sm"
					class="flex items-center justify-between
					{active ? 'bg-blue-700 text-white dark:bg-blue-600' : 'hover:bg-gray-100 dark:hover:bg-gray-600'}
        			"
				>
					Day {day.id}: {day.name}
				</DropdownItem>
			{/each}
		</Dropdown>
	</NavUl>
</Navbar>
