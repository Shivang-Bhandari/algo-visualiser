import React from 'react';
import { Box, IconButton, Slider, Stack, Tooltip, Typography } from '@mui/material';
import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';

type Props = {
	index: number;
	count: number;
	isPlaying: boolean;
	speed: number; // steps per second
	onChangeIndex: (index: number) => void;
	onTogglePlay: () => void;
	onChangeSpeed: (speed: number) => void;
};

export default function PlayerControls(props: Props): JSX.Element {
	const { index, count, isPlaying, speed, onChangeIndex, onTogglePlay, onChangeSpeed } = props;
	const canPrev = index > 0;
	const canNext = index < count - 1;
	return (
		<Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
			<Stack direction="row" spacing={1} alignItems="center">
				<Tooltip title="Previous">
					<span>
						<IconButton onClick={() => onChangeIndex(index - 1)} disabled={!canPrev} aria-label="Previous">
							<SkipPrevious />
						</IconButton>
					</span>
				</Tooltip>
				<Tooltip title={isPlaying ? 'Pause' : 'Play'}>
					<IconButton color="primary" onClick={onTogglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
						{isPlaying ? <Pause /> : <PlayArrow />}
					</IconButton>
				</Tooltip>
				<Tooltip title="Next">
					<span>
						<IconButton onClick={() => onChangeIndex(index + 1)} disabled={!canNext} aria-label="Next">
							<SkipNext />
						</IconButton>
					</span>
				</Tooltip>
			</Stack>
			<Box sx={{ minWidth: 200 }}>
				<Typography variant="caption" color="text.secondary">
					Speed: {speed.toFixed(2)}x
				</Typography>
				<Slider
					size="small"
					min={0.25}
					max={4}
					step={0.25}
					value={speed}
					onChange={(_, v) => onChangeSpeed(v as number)}
					aria-label="Playback speed"
				/>
			</Box>
			<Typography variant="body2" color="text.secondary">
				Step {index + 1} / {count}
			</Typography>
		</Stack>
	);
}


