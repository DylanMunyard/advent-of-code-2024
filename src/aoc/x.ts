import { read } from '$app/server';
import puzzle from "./x.txt";

const solution = async () : Promise<{ 1: number | null, 2: number | null }> => {
	const asset = read(puzzle);
	const input = (await asset.text()).split("\n");

	await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (10000 - 2000 + 1) + 2000)));

	return {
		1: null,
		2: null
	};
}

export default solution;