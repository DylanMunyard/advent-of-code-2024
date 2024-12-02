import { read } from '$app/server';
import puzzle from "./2.txt";

const solution = async () : Promise<{ 1: number | null, 2: number | null }> => {
	const asset = read(puzzle);
	const input = (await asset.text()).split("\n");

	let one : number = 0;
	let two : number = 0;

	const isadjacent = (a: number, b: number) => {
		return Math.abs(a - b) >= 1  && Math.abs(a - b) <= 3;
	}

	const arrEqual = (a: number[], b: number[]) => {
		if (a.length !== b.length) return false;
		for (let i = 0; i < a.length; i++) {
			if (a[i] !== b[i]) return false;
		}
		return true;
	}

	const adjacent = (line: number[]) : number[] => {
		const nl : number[] = [];

		nl.push(line[0])
		for (let i = 0; i < line.length - 1; i++) {
			if (isadjacent(line[i], line[i + 1]) && Math.abs(line[i] - line[i + 1]) > 0) {
				nl.push(line[i+1]);
			}
		}

		return nl;
	}

	input.forEach(row => {
		const line = row.trim().split(/\s+/).map(Number);

		const nl = adjacent(line);
		if (arrEqual(line, nl.sort((a, b) => a - b)) ||
			  arrEqual(line, nl.sort((a, b) => b - a))) {
			one++;
			two++;
		} else {
			for (let i = 0; i < line.length; i++) {
				const newLine = line.filter((_, index) => index !== i);

				const nl2 = adjacent(newLine);

				if (arrEqual(newLine, nl2.sort((a, b) => a - b)) ||
					  arrEqual(newLine, nl2.sort((a, b) => b - a))) {
					two++;
					break;
				}
			}
		}
	})

	return {
		1: one,
		2: two
	};
}

export default solution;