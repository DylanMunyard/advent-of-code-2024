import { read } from '$app/server';
import puzzle from "./3.txt";

const solution = async () : Promise<{ 1: number | null, 2: number | null }> => {
	const asset = read(puzzle);
	const input = (await asset.text()).split("\n");

	let p1 = 0;
	let p2 = 0;
	let condition = "do()";
	input.forEach(row  => {
		for (let i = 0; i < row.length; i++) {
			const expression_match = /^(mul\(\d+,\d+\)|do\(\)|don't\(\))/.exec(row	.substring(i));
			if (expression_match === null) continue;

			const expression = expression_match[1];
			condition = !expression.startsWith("mul(") ? expression : condition;

			const [l, r] = expression.match(/\d+/g)?.map(Number) ?? [0,0];
			p1 += l * r;
			p2 += condition === "do()" ? l * r : 0;
		}
	});

	return {
		1: p1,
		2: p2
	};
}

export default solution;