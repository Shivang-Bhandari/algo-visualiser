import React from 'react';
import { CssBaseline, PaletteMode, ThemeProvider, createTheme } from '@mui/material';

type ColorModeContextValue = {
	mode: PaletteMode;
	toggleColorMode: () => void;
	setMode: (mode: PaletteMode) => void;
};

const ColorModeContext = React.createContext<ColorModeContextValue | undefined>(undefined);

const STORAGE_KEY = 'algo-visualiser-color-mode';

function getInitialMode(): PaletteMode {
	const stored = typeof window !== 'undefined' ? (localStorage.getItem(STORAGE_KEY) as PaletteMode | null) : null;
	if (stored === 'light' || stored === 'dark') return stored;
	const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	return prefersDark ? 'dark' : 'light';
}

export function useColorMode(): ColorModeContextValue {
	const ctx = React.useContext(ColorModeContext);
	if (!ctx) {
		throw new Error('useColorMode must be used within ColorModeProvider');
	}
	return ctx;
}

export function ColorModeProvider({ children }: { children: React.ReactNode }): JSX.Element {
	const [mode, setModeState] = React.useState<PaletteMode>(getInitialMode);

	const setMode = React.useCallback((newMode: PaletteMode) => {
		setModeState(newMode);
		try {
			localStorage.setItem(STORAGE_KEY, newMode);
		} catch {
			// ignore storage errors
		}
	}, []);

	const toggleColorMode = React.useCallback(() => {
		setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
	}, [setMode]);

	const theme = React.useMemo(
		() =>
			createTheme({
				palette: { mode },
				components: {
					MuiCssBaseline: {
						styleOverrides: {
							body: { transition: 'background-color 0.2s ease, color 0.2s ease' },
						},
					},
				},
			}),
		[mode]
	);

	const value = React.useMemo<ColorModeContextValue>(() => ({ mode, toggleColorMode, setMode }), [mode, toggleColorMode, setMode]);

	return (
		<ColorModeContext.Provider value={value}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}


