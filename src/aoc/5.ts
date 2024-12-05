import { read } from '$app/server';
import puzzle from "./5.txt";
import { arrEqual, createUniquePairs } from '$lib/arrays';

const solution = async () : Promise<{ 1: number | null, 2: number | null }> => {
	const asset = read(puzzle);
	const input = (await asset.text()).split("\n");

	const reduce_by = (input: string[], id: string) : number[][] =>
		input.reduce((os, o) => {
			if (o.indexOf(id) >= 0) os.push(o.split(id).map(Number));
			return os;
		}, [] as number[][]);

	const order = reduce_by(input, "|");
	const updates = reduce_by(input, ",");

	const build_valid_order = (update: number[]) => {
		let candidate_order: number[][] = [];

		createUniquePairs(update)
			.forEach((pair) => {
				candidate_order = candidate_order.concat(order.filter((o) => (o[0] == pair[0] && o[1] == pair[1]) || (o[0] == pair[1] && o[1] == pair[0])));
			});

		const high = candidate_order
			.sort((a, b) => b[0] - a[0]) // sort by first pair descending
			.reduce((h, c) => {
				if (h.indexOf(c[0]) >= 0) return h;

				h.push(c[0]);
				return h;
			}, []);

		return candidate_order
			.sort((a, b) => a[1] - b[1]) // sort by second pair ascending
			.reduce((h, c) => {
				const target = h.indexOf(c[0]);
				const item = h.indexOf(c[1]);

				if (item >= 0 && target > item) {
					// move item after target
					h.splice(target + 1, 0, c[1]);
					h.splice(item, 1);
					return h;
				} else if (item < 0) {
					h.push(c[1]);
				}

				return h;
			}, high);
	}

	const [p1, p2] = updates
		.map(build_valid_order)
		.reduce((t, c, i) => {
			t[arrEqual(c, updates[i]) ? 0 : 1] += c[Math.floor(c.length / 2)];
			return t;
		}, [0, 0]);

	return {
		1: p1,
		2: p2
	};
}

export default solution;