import React from 'react';
import { Alert, Button, Stack, Typography } from '@mui/material';
import { AlgorithmRun, AlgorithmRunSchema } from '../../schema/algorithmStep';

type Props = {
	onLoad: (data: AlgorithmRun) => void;
};

export default function FileUploader({ onLoad }: Props): React.JSX.Element {
	const [error, setError] = React.useState<string | null>(null);

	const onFile = React.useCallback(
		async (file: File) => {
			setError(null);
			try {
				const text = await file.text();
				const json = JSON.parse(text);
				const res = AlgorithmRunSchema.safeParse(json);
				if (!res.success) {
					setError(res.error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join('\n'));
					return;
				}
				onLoad(res.data);
			} catch (e) {
				setError((e as Error).message);
			}
		},
		[onLoad]
	);

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) onFile(file);
		e.currentTarget.value = '';
	};

	return (
		<Stack spacing={2}>
			<Typography variant="body2" color="text.secondary">
				Upload a .json file with steps.
			</Typography>
			<Button variant="contained" component="label">
				Choose JSON file
				<input hidden accept=".json,application/json" type="file" onChange={handleInput} />
			</Button>
			{error && (
				<Alert severity="error" sx={{ whiteSpace: 'pre-wrap' }}>
					{error}
				</Alert>
			)}
		</Stack>
	);
}


