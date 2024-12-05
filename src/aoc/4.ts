import { read } from '$app/server';
import puzzle from "./4.txt";

const solution = async () : Promise<{ 1: number | null, 2: number | null }> => {
	const asset = read(puzzle);
	const lines = (await asset.text()).split("\n");

	const get_search_space_p2 = (input: string[], r: number, c: number) => {
		if (r + 2 >= input.length || c + 2 >= input[r].length) return "";

		return input[r][c] + input[r + 1][c + 1] + input[r + 2][c + 2] + input[r][c + 2] + input[r + 1][c + 1] + input[r + 2][c];
	}

	const get_search_space_p1 = (input: string[], r : number, c : number) : string[] => {
		const search_space : string[] = [];

		if (r === 0) {
			let col = "";
			for (let i = r; i < input.length; i++) {
				col += input[i][c];
			}
			search_space.push(col); // vertical
		}

		if (c === 0) {
			search_space.push(input[r]); // horizontal
		}

		let sr = r;
		let sc = c;
		let d = "";
		while (true) {
			if (sr >= input.length || sc < 0) break;
			if (r > 0 && c < input[r].length - 1) break;

			d += input[sr][sc];

			sr++;
			sc--
		}
		search_space.push(d); // left diagonal

		sr = r;
		sc = c;
		d = "";
		while (true) {
			if (sr >= input.length || sc >= input[sr].length) break;
			if (r > 0 && c > 0) break;

			d += input[sr][sc];

			sr++;
			sc++;
		}
		search_space.push(d); // right diagonal

		return search_space;
	}

	let p1 = 0;
	let p2 = 0;
	for (let i = 0; i < lines.length; i++) {
		for (let j = 0; j < lines[i].length; j++) {
			const search_space_p1 = get_search_space_p1(lines, i, j);
			const search_space_p2 = get_search_space_p2(lines, i, j);
			search_space_p1.forEach(row => {
				const cnt = (row.match(/XMAS/gi) || []).length + (row.match(/SAMX/gi) || []).length;
				p1 += cnt;
			});

			if ((search_space_p2.match(/MAS/gi) || []).length + (search_space_p2.match(/SAM/gi) || []).length !== 2) continue;
			p2++;
		}
	}

	return {
		1: p1,
		2: p2
	};
}

export default solution;