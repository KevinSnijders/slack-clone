import React from 'react';
import styled, { ThemeProvider } from 'styled-components/macro';
import { GlobalStyle } from '../theming/global';
import { setMaxWidthBreakpoint } from '../theming/function';
import DefaultTheme from '../theming/theming';

const AppWrapper = styled.main`
	text-align: center;
	display: flex;
	flex-direction: column;

	${setMaxWidthBreakpoint('sm')} {
		text-align: left;
	}
`;

const initialState = {
	theme: DefaultTheme,
};

function App() {
	return (
		<ThemeProvider theme={initialState}>
			<GlobalStyle />
			<AppWrapper className='App'>App</AppWrapper>
		</ThemeProvider>
	);
}

export default App;
