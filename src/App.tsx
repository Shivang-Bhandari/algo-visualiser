import React from 'react';
import { AppBar, Box, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useColorMode } from './theme/ColorModeProvider';
import LoaderPanel from './components/loader/LoaderPanel';
import { AlgorithmRun } from './schema/algorithmStep';
import Visualiser from './components/visualiser/Visualiser';

function App(): JSX.Element {
	const { mode, toggleColorMode } = useColorMode();
	const [run, setRun] = React.useState<AlgorithmRun | null>(null);
	return (
		<Box>
			<AppBar position="static" color="transparent" enableColorOnDark>
				<Toolbar>
					<Typography variant="h6" sx={{ flexGrow: 1 }}>
						Algorithm Visualiser
					</Typography>
					<IconButton color="inherit" onClick={toggleColorMode} aria-label="toggle color mode">
						{mode === 'dark' ? <LightMode /> : <DarkMode />}
					</IconButton>
				</Toolbar>
			</AppBar>
			<Container sx={{ py: 3 }}>
				<LoaderPanel onLoaded={setRun} />
				{run && <Box sx={{ mt: 3 }}><Visualiser run={run} /></Box>}
			</Container>
		</Box>
	);
}

export default App;

