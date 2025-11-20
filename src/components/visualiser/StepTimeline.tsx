import React from 'react';
import { Step, StepButton, StepLabel, Stepper } from '@mui/material';
import { AlgorithmStep } from '../../schema/algorithmStep';

type Props = {
	steps: AlgorithmStep[];
	activeIndex: number;
	onChange: (index: number) => void;
};

export default function StepTimeline({ steps, activeIndex, onChange }: Props): JSX.Element {
	return (
		<Stepper nonLinear activeStep={activeIndex} alternativeLabel>
			{steps.map((s, idx) => (
				<Step key={idx} completed={idx < activeIndex}>
					<StepButton color="inherit" onClick={() => onChange(idx)}>
						<StepLabel>{s.label}</StepLabel>
					</StepButton>
				</Step>
			))}
		</Stepper>
	);
}


