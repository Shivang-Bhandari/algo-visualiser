import React from 'react';
import { Box, Collapse, IconButton, Stack, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

type Props = { title: string; data: unknown; initiallyOpen?: boolean };

export default function JsonView({ title, data, initiallyOpen = true }: Props): JSX.Element {
	const [open, setOpen] = React.useState(initiallyOpen);
	return (
		<Box>
			<Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
				<Typography variant="subtitle2">{title}</Typography>
				<IconButton size="small" onClick={() => setOpen((v) => !v)} aria-label={open ? 'Collapse' : 'Expand'}>
					{open ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
				</IconButton>
			</Stack>
			<Collapse in={open}>
				<Box
					component="pre"
					sx={{
						p: 1.5,
						borderRadius: 1,
						bgcolor: 'action.hover',
						overflowX: 'auto',
						whiteSpace: 'pre-wrap',
						fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
						fontSize: 13,
					}}
				>
					{safeStringify(data, 2)}
				</Box>
			</Collapse>
		</Box>
	);
}

function safeStringify(value: unknown, space?: number): string {
	try {
		return JSON.stringify(value, null, space);
	} catch {
		return String(value);
	}
}


