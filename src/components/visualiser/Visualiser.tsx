import React from 'react';
import { Box, Paper, Stack } from '@mui/material';
import { AlgorithmRun } from '../../schema/algorithmStep';
import StepTimeline from './StepTimeline';
import StepDetails from './StepDetails';
import PlayerControls from './PlayerControls';

type Props = { run: AlgorithmRun };

export default function Visualiser({ run }: Props): JSX.Element {
	const [index, setIndex] = React.useState(0);
	const [isPlaying, setIsPlaying] = React.useState(false);
	const [speed, setSpeed] = React.useState(1); // steps per second

	React.useEffect(() => {
		setIndex(0);
		setIsPlaying(false);
	}, [run]);

	React.useEffect(() => {
		if (!isPlaying) return;
		if (index >= run.steps.length - 1) {
			setIsPlaying(false);
			return;
		}
		const intervalMs = Math.max(50, 1000 / speed);
		const id = window.setInterval(() => {
			setIndex((i) => {
				if (i < run.steps.length - 1) return i + 1;
				return i;
			});
		}, intervalMs);
		return () => window.clearInterval(id);
	}, [isPlaying, speed, index, run.steps.length]);

	return (
		<Stack spacing={2}>
			<Paper variant="outlined" sx={{ p: 2 }}>
				<StepTimeline steps={run.steps} activeIndex={index} onChange={setIndex} />
			</Paper>
			<Paper variant="outlined" sx={{ p: 2 }}>
				<PlayerControls
					index={index}
					count={run.steps.length}
					isPlaying={isPlaying}
					speed={speed}
					onChangeIndex={(i) => {
						setIsPlaying(false);
						setIndex(Math.min(Math.max(0, i), run.steps.length - 1));
					}}
					onTogglePlay={() => setIsPlaying((p) => !p)}
					onChangeSpeed={setSpeed}
				/>
			</Paper>
			<Paper variant="outlined" sx={{ p: 2 }}>
				<Box>
					<StepDetails step={run.steps[index]} />
				</Box>
			</Paper>
		</Stack>
	);
}

