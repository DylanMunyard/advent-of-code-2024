import { read } from '$app/server';
import puzzle from "./1.txt";

const solution = async () : Promise<{ 1: number | null, 2: number | null }> => {
	const asset = read(puzzle);
	const input = (await asset.text()).split("\n");

	let l : number[] = [],
		r : number[] = [];

	const r2: Record<number, number> = [];

	input.forEach((row) => {
		const [left, right] = row.trim().split(/\s+/).map(Number);
		l.push(left);
		r.push(right);

		r2[right] = (r2[right] ?? 0) + 1;
	});

	l = l.sort((a, b) => a - b);
	r = r.sort((a, b) => a - b);

	return {
		1: l.reduce((a, b, i) => {
			return a + Math.abs(b - r[i]);
		}, 0),
		2: l.reduce((a, b) => {
			return a + b * (r2[b] ?? 0);
		}, 0)
	};
}

export default solution;