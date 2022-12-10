class Rucksack {
	all_items: string;
	first_compartment: string;
	second_compartment: string;

	constructor(letters: string) {
		const split_location = letters.length / 2;

		this.all_items = letters;
		this.first_compartment = letters.substring(0, split_location);
		this.second_compartment = letters.substring(split_location);
	}
}

export function parse_data(data: String): Rucksack[] {
	const lines = data.split('\n');

	let rounds: Rucksack[] = [];

	for (let line of lines) {
		rounds.push(new Rucksack(line));
	}

	return rounds;
}

export function get_duplicates(items_1, items_2): string {
	const items_2_set = new Set<string>(items_2);

	let duplicate_items = '';
	items_1.split('').forEach((letter) => {
		if (items_2_set.has(letter)) {
			duplicate_items += letter;
		}
	});
	return duplicate_items;
}

export function get_priority(letter): number {
	let offset;

	if (letter === letter.toUpperCase()) {
		// A starts at 27
		offset = 38;
	} else {
		// a starts at 1
		offset = 96;
	}

	return letter.charCodeAt(0) - offset;
}
