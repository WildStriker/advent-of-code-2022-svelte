export class Elf {
	food: number[];
	total_calories: number;

	constructor() {
		this.food = [];
		this.total_calories = 0;
	}

	add(calories: number) {
		this.food.push(calories);
		this.total_calories += calories;
	}
}

export function parse_data(data: String): Elf[] {
	const lines = data.replace(/\r/g, '').split('\n');

	let current_elf = new Elf();
	let elfs = [current_elf];

	for (let line of lines) {
		if (line) {
			let calories = Number(line);
			current_elf.add(calories);
		} else {
			// new elf!
			current_elf = new Elf();
			elfs.push(current_elf);
		}
	}

	return elfs;
}
