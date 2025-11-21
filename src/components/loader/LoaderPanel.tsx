import React from 'react';
import { Alert, Box, Paper, Tab, Tabs } from '@mui/material';
import JsonEditor from './JsonEditor';
import FileUploader from './FileUploader';
import UrlLoader from './UrlLoader';
import { AlgorithmRun, findOrderIndexIssues, sortStepsByOrderIndex } from '../../schema/algorithmStep';

type Props = {
	onLoaded: (data: AlgorithmRun) => void;
};

export default function LoaderPanel({ onLoaded }: Props): React.JSX.Element {
	const [tab, setTab] = React.useState(0);
	const [warnings, setWarnings] = React.useState<string[]>([]);

	const handleLoad = (data: AlgorithmRun) => {
		const sorted = sortStepsByOrderIndex(data.steps);
		const issues = findOrderIndexIssues(sorted);
		setWarnings(issues);
		onLoaded({ ...data, steps: sorted });
	};

	return (
		<Paper variant="outlined" sx={{ p: 2 }}>
			<Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
				<Tab label="Paste" />
				<Tab label="File" />
				<Tab label="URL" />
			</Tabs>
			<Box role="tabpanel" hidden={tab !== 0}>
				{tab === 0 && <JsonEditor onLoad={handleLoad} />}
			</Box>
			<Box role="tabpanel" hidden={tab !== 1}>
				{tab === 1 && <FileUploader onLoad={handleLoad} />}
			</Box>
			<Box role="tabpanel" hidden={tab !== 2}>
				{tab === 2 && <UrlLoader onLoad={handleLoad} />}
			</Box>
			{warnings.length > 0 && (
				<Box sx={{ mt: 2 }}>
					<Alert severity="warning" sx={{ whiteSpace: 'pre-wrap' }}>
						{warnings.join('\n')}
					</Alert>
				</Box>
			)}
		</Paper>
	);
}


