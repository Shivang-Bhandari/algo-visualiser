import { describe, expect, it } from 'vitest';
import { AlgorithmRunSchema, findOrderIndexIssues, sortStepsByOrderIndex } from './algorithmStep';

describe('Algorithm schemas and utils', () => {
	it('validates a basic run', () => {
		const data = {
			title: 'Test',
			steps: [
				{ orderIndex: 1, label: 'B', explanation: '', input: null, output: null },
				{ orderIndex: 0, label: 'A', explanation: 'start', input: {}, output: {} },
			],
		};
		const res = AlgorithmRunSchema.safeParse(data);
		expect(res.success).toBe(true);
		if (res.success) {
			const sorted = sortStepsByOrderIndex(res.data.steps);
			expect(sorted[0].orderIndex).toBe(0);
			expect(sorted[1].orderIndex).toBe(1);
			const issues = findOrderIndexIssues(sorted);
			expect(issues.length).toBe(0);
		}
	});

	it('flags duplicate orderIndex', () => {
		const steps = [
			{ orderIndex: 0, label: 'A', explanation: '', input: null, output: null },
			{ orderIndex: 0, label: 'B', explanation: '', input: null, output: null },
		];
		const issues = findOrderIndexIssues(steps);
		expect(issues.some((i) => i.includes('Duplicate'))).toBe(true);
	});
});


