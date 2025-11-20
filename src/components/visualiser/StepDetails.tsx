import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { AlgorithmStep } from '../../schema/algorithmStep';
import JsonView from './JsonView';

type Props = { step: AlgorithmStep };

export default function StepDetails({ step }: Props): JSX.Element {
	return (
		<Box>
			<Typography variant="h6" sx={{ mb: 1 }}>
				{step.label}
			</Typography>
			<Typography variant="body1" sx={{ mb: 2 }}>
				{step.explanation || '—'}
			</Typography>
			<Divider sx={{ my: 2 }} />
			<JsonView title="Input" data={step.input} />
			<Divider sx={{ my: 2 }} />
			<JsonView title="Output" data={step.output} />
		</Box>
	);
}


