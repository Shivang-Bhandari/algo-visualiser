import React from 'react';
import { Alert, Button, Stack, TextField, Typography } from '@mui/material';
import { AlgorithmRun, AlgorithmRunSchema } from '../../schema/algorithmStep';

type Props = {
	onLoad: (data: AlgorithmRun) => void;
};

export default function JsonEditor({ onLoad }: Props): React.JSX.Element {
	const [text, setText] = React.useState<string>('');
	const [error, setError] = React.useState<string | null>(null);

	const handleValidate = React.useCallback(() => {
		setError(null);
		try {
			const parsed = JSON.parse(text);
			const result = AlgorithmRunSchema.safeParse(parsed);
			if (!result.success) {
				setError(result.error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join('\n'));
				return;
			}
			onLoad(result.data);
		} catch (e) {
			setError((e as Error).message);
		}
	}, [text, onLoad]);

	return (
		<Stack spacing={2}>
			<Typography variant="body2" color="text.secondary">
				Paste your JSON here and click Validate & Load.
			</Typography>
			<TextField
				minRows={12}
				multiline
				fullWidth
				sx={{ '& .MuiInputBase-input': { maxHeight: 720, overflow: 'auto' } }}
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder='{"title":"Example","steps":[{"orderIndex":0,"label":"Start","explanation":"","input":null,"output":null}]}'
			/>
			<Stack direction="row" spacing={1}>
				<Button variant="contained" onClick={handleValidate}>
					Validate & Load
				</Button>
				<Button
					variant="outlined"
					onClick={() =>
						setText(
							JSON.stringify(
								{
									title: 'Sample',
									steps: [
										{
											orderIndex: 0,
											label: 'Initialize',
											explanation: 'Set up',
											input: { foo: 1 },
											output: { bar: 2 },
										},
									],
								},
								null,
								2
							)
						)
					}
				>
					Insert Sample
				</Button>
			</Stack>
			{error && (
				<Alert severity="error" sx={{ whiteSpace: 'pre-wrap' }}>
					{error}
				</Alert>
			)}
		</Stack>
	);
}


