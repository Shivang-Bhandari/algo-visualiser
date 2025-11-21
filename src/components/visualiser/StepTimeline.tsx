import React from 'react';
import { Box, Step, StepButton, StepLabel, Stepper, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AlgorithmStep } from '../../schema/algorithmStep';

type Props = {
	steps: AlgorithmStep[];
	activeIndex: number;
	onChange: (index: number) => void;
};

export default function StepTimeline({ steps, activeIndex, onChange }: Props): React.JSX.Element {
	const theme = useTheme();
	const isSmall = useMediaQuery(theme.breakpoints.down('md'));
	const forceVertical = steps.length > 12 || isSmall;
	const containerWidth = isSmall ? '100%' : 340;
	return (
		<Box sx={{ width: containerWidth, overflowX: forceVertical ? 'visible' : 'auto' }}>
			<Stepper
				nonLinear
				activeStep={activeIndex}
				alternativeLabel={!forceVertical}
				orientation={forceVertical ? 'vertical' : 'horizontal'}
				sx={!forceVertical ? { minWidth: Math.max(steps.length * 160, 600) } : undefined}
			>
				{steps.map((s, idx) => (
					<Step key={idx} completed={idx < activeIndex}>
						<StepButton color="inherit" onClick={() => onChange(idx)}>
							<StepLabel>
								<Typography noWrap title={s.label} variant="caption">
									{s.label}
								</Typography>
							</StepLabel>
						</StepButton>
					</Step>
				))}
			</Stepper>
		</Box>
	);
}


