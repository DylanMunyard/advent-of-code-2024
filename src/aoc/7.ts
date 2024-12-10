import { read } from '$app/server';
import puzzle from "./7.txt";

const solution = async () : Promise<{ 1: number | null, 2: number | null }> => {
	const asset = read(puzzle);
	const input = (await asset.text()).split("\n");

	function generateCombinations(elements: string[], size: number): string[][] {
		const results: string[][] = [];

		function generate(currentCombination: string[], depth: number) {
			if (depth === size) {
				results.push([...currentCombination]);
				return;
			}

			for (const element of elements) {
				currentCombination.push(element);
				generate(currentCombination, depth + 1);
				currentCombination.pop();
			}
		}

		generate([], 0);

		return results;
	}

	const evaluate = (operators: string[], inputs: number[]) : number => {
		let result = inputs[0];
		for (let i = 1; i < inputs.length; i++) {
			const op = inputs[i];
			const operator = operators[i - 1];

			switch (operator) {
				case '+':
					result += op;
					break;
				case '*':
					result *= op;
					break;
				case '||':
					result = Number(result.toString() + op.toString());
					break;
			}
		}

		return result;
	}

	let [p1, p2] = [0, 0];

	const equations = input.map(row => {
		const line = { target: 0, inputs: [] as number[] };
		line.target = Number(row.substring(0, row.indexOf(":")));
		line.inputs = row.substring(row.indexOf(":") + 1).trim().split(/\s+/).map(Number);
		return line;
	});

	equations.forEach(equation => {
		const operators = generateCombinations(['+', '*'], equation.inputs.length);
		for (const operator of operators) {
			const result = evaluate(operator, equation.inputs);
			if (result === equation.target) {
				p1 += equation.target;
				break;
			}
		}
	});

	equations.forEach(equation => {
		const operators = generateCombinations(['+', '*', '||'], equation.inputs.length);
		for (const operator of operators) {
			const result = evaluate(operator, equation.inputs);
			if (result === equation.target) {
				p2 += equation.target;
				break;
			}
		}
	});

	return {
		1: p1,
		2: p2
	};
}

export default solution;