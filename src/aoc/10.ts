import { read } from '$app/server';
import puzzle from "./10.txt";

interface Node {
	row: number;
	col: number;
	value: number; // Current value of the node
	pathWeight: number; // Weight of the path so far
}

const solution = async () : Promise<{ 1: number | null, 2: number | null }> => {
	const asset = read(puzzle);
	const input = (await asset.text()).split("\n");

	/* Out of bounds check */
	const oob = (r: number, c: number) => r < 0 || c < 0 || r >= input.length || c >= input[r].length;

	const graph = input.reduce((g, r) => {
		g.push(r.split('').map(Number))
		return g;
	}, [] as number[][]);

	const start_nodes = graph.reduce((n, row, r) => {
		row.forEach((val, c) => {
			if (val !== 0) return;
			n.push({row: r, col: c, value: val, pathWeight: 0});
		})
		return n;
	}, [] as Node[]);

	/* Adjacent (left,right,up,down) nodes given row and column */
	const neighbours = (r: number, c: number, value: number, pathWeight: number)=> {
		return [
			{row: r, col: c + 1, value: value + 1, pathWeight},
			{row: r, col: c - 1, value: value + 1, pathWeight},
			{row: r + 1, col: c, value: value + 1, pathWeight},
			{row: r - 1, col: c, value: value + 1, pathWeight}
		];
	}

	/*
	 Starting at a trail head, find a path to cell value 9, walking sequentially 1, 2, 3, 4, 5 etc.
	 all, when true will find all paths to the final cell. When false will find the first path.
	 */
	function findSequentialPaths(graph: number[][], startNode: Node, targetValue: number, targetWeight: number, all: boolean): number {
		const visited = new Set<string>();
		const queue: Node[] = [];

		queue.push({ ...startNode, pathWeight: 0 });
		visited.add(`${startNode.row},${startNode.col}`);

		let paths = 0;

		while (queue.length > 0) {
			const { row, col, pathWeight } = queue.shift()!;

			if (graph[row][col] === targetValue && pathWeight + graph[row][col] === targetWeight) {
				paths++;
				continue;
			}

			neighbours(row, col, graph[row][col], pathWeight + graph[row][col]).forEach(neighbor => {
				const { row, col, value, pathWeight } = neighbor;
				if (!oob(row, col) && (all || !visited.has(`${row},${col}`)) && graph[row][col] === value && pathWeight <= targetWeight) {
					queue.push(neighbor);
					visited.add(`${row},${col}`);
				}
			});
		}

		return paths;
	}

	const p1 = start_nodes.reduce((t, node) => {
		return t + findSequentialPaths(graph, node, 9, 45, false);
	}, 0);

	const p2 = start_nodes.reduce((t, node) => {
		return t + findSequentialPaths(graph, node, 9, 45, true);
	}, 0);

	return {
		1: p1,
		2: p2
	};
}

export default solution;