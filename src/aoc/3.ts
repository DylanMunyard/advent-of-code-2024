import { read } from '$app/server';
import puzzle from "./3.txt";

const solution = async () : Promise<{ 1: number | null, 2: number | null }> => {
	const asset = read(puzzle);
	const input = (await asset.text()).split("\n");

	const parse_expression = (input: string) : [string, number] | null => {
		if (input.startsWith("mul(")) {
			return ["mul", "mul(".length];
		} else if (input.startsWith("don't()")) {
			return ["if", "don't()".length]
		} else if (input.startsWith("do()")) {
			return ["endif", "do()".length]
		}

		return null;
	}

	const parse_args = (input: string): [number, number, number] | null => {
		const rp = input.indexOf(")");
		if (rp < 0) return null;

		const rest = input.substring(0, rp);
		const args = rest.replace(/\s+/g, "~").split(",").map(Number);
		if (args.length !== 2) return null;
		if (args.filter(value => isNaN(value)).length > 0) return null;

		return [args[0], args[1], rp];
	}

	let p1 = 0;
	let p2 = 0;
	let skip = false;
	input.forEach((row, row_idx) => {
		const line = row.trim();

		let i = 0;
		while (i < line.length) {
			const expression = parse_expression(line.substring(i));
			if (expression === null) {
				i++;
				continue;
			}

			const [method, next] = expression;
			if (method === "if") skip = true;
			if (method === "endif") skip = false;

			if (method === "if" || method === "endif") {
				i += next;
				continue;
			}

			const args = parse_args(line.substring(i + next));
			if (args === null) {
				i++;
				continue;
			}

			const [l, r, s] = args;
			p1 += l * r;
			if (!skip) {
				p2 += l * r;
			} else {
				if (row_idx === 3) {
					console.info(`skipping mul(${args})`);
				}
			}
			i += next + s;
		}
	});

	return {
		1: p1,
		2: p2
	};
}

export default solution;