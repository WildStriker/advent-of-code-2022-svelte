function is_numeric(value: string) {
	if (value.trim() === '') {
		return false;
	}

	return !isNaN(Number(value));
}

function _move_first_in_last_out(
	stacks: string[][],
	move_count: number,
	from_index: number,
	to_index: number
) {
	let move_stack = [];
	for (let _count = 0; _count < move_count; _count++) {
		const crate = stacks[from_index].pop()!;
		move_stack.push(crate);
	}

	move_stack.reverse().forEach((crate) => {
		stacks[to_index].push(crate);
	});
}

function _move_first_in_first_out(
	stacks: string[][],
	move_count: number,
	from_index: number,
	to_index: number
) {
	for (let _count = 0; _count < move_count; _count++) {
		const crate = stacks[from_index].pop()!;
		stacks[to_index].push(crate);
	}
}

export function parse_data(data: String, preserve_order: boolean) {
	let move_function;
	if (preserve_order) {
		move_function = _move_first_in_last_out;
	} else {
		move_function = _move_first_in_first_out;
	}

	const lines = data.replace(/\r/g, "").split('\n').entries();

	// set up initial stack state

	// get stack lines and index line
	let stack_lines: string[] = [];
	let index_line = '';
	for (let [_index, line] of lines) {
		//  check if this is the index line
		if (is_numeric(line[1])) {
			index_line = line;
			break;
		}
		stack_lines.push(line);
	}

	// init stacks based on index line length
	// NOTE: assumption is that the stacks are evently spaced
	// e.g.
	// [A] [B] [C]...
	//  1   2   3 ...
	const char_per_line = 4;
	const total_stacks = (index_line.length + 1) / char_per_line;
	let stacks: string[][] = [];
	for (let index = 0; index < total_stacks; index++) {
		stacks.push([]);
	}

	// converts lines into the stack
	stack_lines.reverse().forEach((stack_line) => {
		for (let index = 0; index < total_stacks; index++) {
			const stack_index = (index + 1) * char_per_line - char_per_line + 1;
			let crate = stack_line[stack_index].trim();
			if (crate) {
				stacks[index].push(crate);
			}
		}
	});

	// skip blank line
	lines.next();

	// loop through steps
	const pattern = /move ([0-9]+) from ([0-9]+) to ([0-9]+)/;
	for (const [_index, line] of lines) {
		const match = pattern.exec(line);
		const move_count = Number(match![1]);
		const from_index = Number(match![2]) - 1;
		const to_index = Number(match![3]) - 1;

		move_function(stacks, move_count, from_index, to_index);
	}

	return stacks;
}
