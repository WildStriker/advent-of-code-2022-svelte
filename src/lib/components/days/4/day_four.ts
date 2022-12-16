class Section {
	start: number;
	end: number;

	constructor(start: number, end: number) {
		this.start = start;
		this.end = end;
	}

	fully_contains(other_section: Section) {
		return this.start <= other_section.start && this.end >= other_section.end;
	}

	overlaps(other_section: Section) {
		return (
			(this.start >= other_section.start && this.start <= other_section.end) ||
			(this.end >= other_section.start && this.end <= other_section.end) ||
			this.fully_contains(other_section)
		);
	}
}

class Pair {
	elf_1: Section;
	elf_2: Section;

	constructor(elf_1: Section, elf_2: Section) {
		this.elf_1 = elf_1;
		this.elf_2 = elf_2;
	}
}

export function parse_data(data: String): Pair[] {
	const lines = data.replace(/\r/g, '').split('\n');

	let pairs: Pair[] = [];

	for (let line of lines) {
		const section_ids = line.split(',');

		const elf_1_ids = section_ids[0].split('-');
		const elf_2_ids = section_ids[1].split('-');

		const elf_1 = new Section(Number(elf_1_ids[0]), Number(elf_1_ids[1]));
		const elf_2 = new Section(Number(elf_2_ids[0]), Number(elf_2_ids[1]));

		pairs.push(new Pair(elf_1, elf_2));
	}

	return pairs;
}
