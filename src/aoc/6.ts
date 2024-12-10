import { read } from '$app/server';
import puzzle from "./6.txt";

const solution = async () : Promise<{ 1: number | null, 2: number | null }> => {
	const asset = read(puzzle);
	const input = (await asset.text()).split("\n");

	const m = input.length, n= input[0].trim().split('').length;

	let [sr, sc] = [0, 0];

	const obstacles = input.reduce((obstacles, row, r) => {
		row.split('').forEach((cell, c) => {
			if (cell === "^") {
				sr = r;
				sc = c;
				return;
			}

			if (cell !== "#") return;

			obstacles.add(`${r},${c}`);
		});
		return obstacles;
	}, new Set<string>());

	const possible_obstacles = input.reduce((posstacles, row, r) => {
		row.split('').forEach((cell, c) => {
			if (cell !== ".") return;

			posstacles.add(`${r},${c}`);
		});
		return posstacles;
	}, new Set<string>());

	const blocked = (r: number, c: number) => obstacles.has(`${r},${c}`);

	const outta_bounds = (r: number, c: number) =>(r < 0 || r >= m || c < 0 || c >= n);

	type direction = 'up' | 'down' | 'left' | 'right';
	const move = (r: number, c: number, direction: direction) : [number, number, direction] => {
		switch (direction) {
			case 'up': {
				if (blocked(r - 1, c)) return [r, c, 'right'];
				return [r - 1, c, 'up'];
			}
			case 'down': {
				if (blocked(r + 1, c)) return [r, c, 'left'];
				return [r + 1, c, 'down'];
			}
			case 'left': {
				if (blocked(r, c - 1)) return [r, c, 'up'];
				return [r, c - 1, 'left'];
			}
			case 'right': {
				if (blocked(r, c + 1)) return [r, c, 'down'];
				return [r, c + 1, 'right'];
			}
		}
	}

	let direction : direction = 'up';
	let path = new Set<string>([`${sr},${sc}`]);
	let pr = sr, pc = sc;
	while (true) {
		[pr, pc, direction] = move(pr, pc, direction);
		if (outta_bounds(pr, pc)) break;

		path.add(`${pr},${pc}`);
	}

	const p1 = path.size;

	let p2 = 0;
	// todo this is slow:
	/*for (const pos of possible_obstacles) {
		obstacles.add(pos);

		[pr, pc] = [sr, sc];
		direction = 'up';
		path = new Set<string>([`${sr},${sc},${direction}`]);
		while (true) {
			[pr, pc, direction] = move(pr, pc, direction);
			if (outta_bounds(pr, pc)) break;
			if (path.has(`${pr},${pc},${direction}`)) {
				p2++;
				break;
			}

			path.add(`${pr},${pc},${direction}`);
		}

		obstacles.delete(pos);
	}*/

	return {
		1: p1,
		2: p2
	};
}

export default solution;