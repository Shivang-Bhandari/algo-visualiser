import { z } from 'zod';

export const AlgorithmStepSchema = z.object({
	orderIndex: z.number().int().nonnegative(),
	label: z.string().min(1),
	explanation: z.string().default('').transform((s) => s.trim()),
	input: z.unknown(),
	output: z.unknown(),
});

export const AlgorithmRunSchema = z.object({
	title: z.string().optional(),
	steps: z.array(AlgorithmStepSchema).min(1),
});

export type AlgorithmStep = z.infer<typeof AlgorithmStepSchema>;
export type AlgorithmRun = z.infer<typeof AlgorithmRunSchema>;

export function sortStepsByOrderIndex<T extends { orderIndex: number }>(steps: T[]): T[] {
	return [...steps].sort((a, b) => a.orderIndex - b.orderIndex);
}

export function findOrderIndexIssues(steps: { orderIndex: number }[]): string[] {
	const issues: string[] = [];
	const seen = new Map<number, number>();
	for (const step of steps) {
		seen.set(step.orderIndex, (seen.get(step.orderIndex) ?? 0) + 1);
	}
	const duplicates = [...seen.entries()].filter(([, count]) => count > 1).map(([idx]) => idx);
	if (duplicates.length) {
		issues.push(`Duplicate orderIndex values: ${duplicates.join(', ')}`);
	}
	const sorted = sortStepsByOrderIndex(steps);
	if (sorted.length > 0) {
		const min = sorted[0].orderIndex;
		for (let i = 0; i < sorted.length; i++) {
			const expected = min + i;
			if (sorted[i].orderIndex !== expected) {
				issues.push(`Gap or out-of-order at position ${i}: expected ${expected}, found ${sorted[i].orderIndex}`);
				break;
			}
		}
	}
	return issues;
}


