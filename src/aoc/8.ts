import { read } from '$app/server';
import puzzle from "./8.txt";

const solution = async () : Promise<{ 1: number | null, 2: number | null }> => {
	const asset = read(puzzle);
	const input = (await asset.text()).split("\n");

	type Node = {
		x: number, y: number
	}

	const antennas: { [key: string]: Node[] } = {};

	input.forEach((row, y) => {
		row.split('').forEach((signal, x) => {
			if (signal === '.') return;

			antennas[signal] ??= [];
			antennas[signal].push({ x, y });
		});
	});

	// Create pairs of likewise frequencies (as (x, y) coords)
	const pairs : [Node, Node][] = [];
	for (const antenna of Object.keys(antennas)) {
		for (let i = 0; i < antennas[antenna].length; i++) {
			for (let j = i + 1; j < antennas[antenna].length; j++){
				pairs.push([antennas[antenna][i], antennas[antenna][j]]);
			}
		}
	}

	// given two points, find their antinodes.
	// when true, pair will return the antinodes that are equidistant to their respective points
	// when false, returns all antinodes in line with the point
	const antinode = (a1: Node, a2: Node, pair: boolean)=> {
		const delta_x = Math.abs(a2.x - a1.x);
		const delta_y = Math.abs(a2.y - a1.y);

		const nodes = [];
		if (pair) {
			const node_1 : Node = { x: a1.x > a2.x ? a1.x + delta_x: a1.x - delta_x, y: a1.y - delta_y };
			const node_2 : Node = { x: a2.x > a1.x ? a2.x + delta_x: a2.x - delta_x, y: a2.y + delta_y };

			if (inbounds(node_1)) nodes.push(node_1);
			if (inbounds(node_2)) nodes.push(node_2);

			return nodes;
		}

		for (const point of [a1, a2]) {
			for (let i = 1; ; i++) {
				const node_1 : Node = { x: a1.x > a2.x ? point.x + (delta_x * i): point.x - (delta_x * i), y: point.y - (delta_y * i) };
				const node_2 : Node = { x: a2.x > a1.x ? point.x + (delta_x * i): point.x - (delta_x * i), y: point.y + (delta_y * i) };

				if (!inbounds(node_1) && !inbounds(node_2)) break;

				if (inbounds(node_1)) nodes.push(node_1);
				if (inbounds(node_2)) nodes.push(node_2);
			}
		}

		return nodes;
	}

	const inbounds = (n: Node) => n.y >= 0 && n.y < input.length && n.x >= 0 && n.x < input[n.y].length;

	const p1 = (pairs.reduce((nodes, pair) => {
		antinode(pair[0], pair[1], true).forEach(node => {
			nodes.add(`${node.x},${node.y}`)
		});
		return nodes;
	}, new Set<string>())).size;

	const p2 = (pairs.reduce((nodes, pair) => {
		antinode(pair[0], pair[1], false).forEach(node => {
			nodes.add(`${node.x},${node.y}`)
		});
		return nodes;
	}, new Set<string>())).size;

	return {
		1: p1,
		2: p2
	};
}

export default solution;