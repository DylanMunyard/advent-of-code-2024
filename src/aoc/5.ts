import { read } from '$app/server';
import puzzle from "./5.txt";

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

	const valid = (update: number[]) => {
		for (let c1 = 0; c1 < update.length; c1++) {

			// go forwards
			for (let c2 = c1 + 1; c2 < update.length; c2++) {
				// c2 must appear after c1
				const rules = order.filter(o => o[0] == update[c2] && o[1] == update[c1]);
				if (rules.length > 0) {
					return false;
				}
			}

			// now go backwards
			for (let c2 = c1 - 1; c2 >= 0; c2--) {
				// c2 must appear before c1
				const rules = order.filter(o => o[0] == update[c1] && o[1] == update[c2]);
				if (rules.length > 0) {
					return false;
				}
			}
		}

		return true;
	}

	const p1 = updates.filter(valid).reduce((t, c) => t + c[Math.floor(c.length / 2)], 0);

	const createUniquePairs = (arr: number[]) => {
		const pairs = [];

		for (let i = 0; i < arr.length; i++) {
			for (let j = i + 1; j < arr.length; j++) {
				pairs.push([arr[i], arr[j]]);
			}
		}

		return pairs;
	}

	const wrong_order = updates.filter((update) => !valid(update));
	let p2 = 0;
	wrong_order.forEach((update) => {
		let candidate_order : number[][] = [];
		createUniquePairs(update)
			.forEach((pair) => {
				candidate_order = candidate_order.concat(order.filter((o) => (o[0] == pair[0] && o[1] == pair[1]) || (o[0] == pair[1] && o[1] == pair[0])));
			});

		const high =
			candidate_order
				.sort((a, b) => b[0] - a[0])
				.reduce((h, c) => {
					if (h.indexOf(c[0]) >= 0) return h;

					h.push(c[0]);
					return h;
				}, []);


		const rest = candidate_order
			.sort((a, b) => a[1] - b[1])
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

		p2 += rest[Math.floor(rest.length / 2)];
	});

	return {
		1: p1,
		2: p2
	};
}

export default solution;