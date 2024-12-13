import { read } from '$app/server';
import puzzle from "./9.txt";

const solution = async () : Promise<{ 1: number | null, 2: number | null }> => {
	const asset = read(puzzle);
	const disk = (await asset.text());

	const parts = (disk: string, files: boolean) =>
		disk.split('').map(Number).reduce((a, b, c) => {
			if (c % 2 === (files ? 0 : 1)) a.push(b);

			return a;
		}, [] as number[]);

	const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);

	const files = parts(disk, true), spaces = parts(disk, false);

	const defrag = (contiguous: number[]) => {
		const frag = Array(sum(files) + sum(spaces)).fill(0);

		let file = 0, space = 0, b = 0;
		while (contiguous.length > 0) {
			let blocks = contiguous.splice(0, files[file]);
			frag.splice(b, blocks.length, ...blocks);
			b+= blocks.length;

			if (contiguous.length === 0 || space >= spaces.length) break;

			// fill in blanks, from end of block
			blocks = contiguous.splice(spaces[space] * -1, spaces[space]).reverse();
			frag.splice(b, blocks.length, ...blocks);
			b+= blocks.length;

			file++;
			space++;
		}

		return frag;
	}

	const contiguous : number[] = files.reduce((a, b, c) => [...a, ...Array(b).fill(c)], [] as number[]);

	const p1 = defrag([...contiguous]).reduce((a, b, c) => a + (b * c), 0);

	const defragged = [...files];
	const moved_files: { size: number, fill: number }[][] = []; // spaces where entire file blocks can be moved
	for (let f = files.length - 1; f >= 0; f--) {
		const file_size = files[f];
		const space_block = spaces.findIndex(free_space => free_space >= file_size);
		if (space_block < 0 || space_block >= f) continue; // not enough free space

		defragged[f] = 0; // block size at this location now 0, as file moved
		spaces[space_block] -= file_size; // reduce empty space taken up by new file
		spaces[f - 1] += file_size;				// free up empty space by the moved block
		moved_files[space_block] ??= [];
		moved_files[space_block].push({ size: file_size, fill: f });
	}

	let p2_fragged: number[] = [];
	for (let f = 0; f < defragged.length; f++) {
		p2_fragged = p2_fragged.concat(...Array(defragged[f]).fill(f))
		if (f >= spaces.length) continue;

		const moved = moved_files[f] ?? [];
		for (let df = 0; df < moved.length; df++) {
			const mf = moved_files[f][df];
			p2_fragged = p2_fragged.concat(...Array(mf.size).fill(mf.fill));
		}

		p2_fragged = p2_fragged.concat(...Array(spaces[f]).fill(0));
	}

	const p2 = p2_fragged.reduce((a, b, c) => a + (b * c), 0);

	return {
		1: p1,
		2: p2
	};
}

export default solution;