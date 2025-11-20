import React from 'react';
import { Alert, Button, Stack, TextField, Typography } from '@mui/material';
import { AlgorithmRun, AlgorithmRunSchema } from '../../schema/algorithmStep';

type Props = {
	onLoad: (data: AlgorithmRun) => void;
};

export default function UrlLoader({ onLoad }: Props): JSX.Element {
	const [url, setUrl] = React.useState<string>('');
	const [error, setError] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState<boolean>(false);

	const handleFetch = React.useCallback(async () => {
		setError(null);
		setLoading(true);
		try {
			const res = await fetch(url);
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const data = await res.json();
			const parsed = AlgorithmRunSchema.safeParse(data);
			if (!parsed.success) {
				setError(parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join('\n'));
				return;
			}
			onLoad(parsed.data);
		} catch (e) {
			setError((e as Error).message);
		} finally {
			setLoading(false);
		}
	}, [url, onLoad]);

	return (
		<Stack spacing={2}>
			<Typography variant="body2" color="text.secondary">
				Enter a URL that returns JSON matching the schema.
			</Typography>
			<TextField fullWidth value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/sample.json" />
			<Button variant="contained" onClick={handleFetch} disabled={!url || loading}>
				{loading ? 'Loading…' : 'Fetch & Load'}
			</Button>
			{error && (
				<Alert severity="error" sx={{ whiteSpace: 'pre-wrap' }}>
					{error}
				</Alert>
			)}
		</Stack>
	);
}


