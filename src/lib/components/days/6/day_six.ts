export function parse_data(data: string, target_length: number): number {
	let marker: string[] = [];
	for (let index = 0; index < data.length; index++) {
		const char = data.charAt(index);
		const last_occurrence = marker.indexOf(char);
		if (last_occurrence !== -1) {
			marker = marker.slice(last_occurrence + 1);
		}
		marker.push(char);
		if (marker.length === target_length) {
			return index + 1;
		}
	}

	return -1;
}
