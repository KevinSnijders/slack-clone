import { createGlobalStyle } from 'styled-components/macro';

export const GlobalStyle = createGlobalStyle`   
	* {
	  margin: 0;
	  padding: 0; 
	}

	*,
	*::before,
	*::after {
	  box-sizing: inherit; 
	}

	html {
		font-size: 62.5%;
		background: ${props => props.theme.color.background}
		box-sizing: border-box;
		@media only screen and (max-width: 600px) {
				font-size: 50%
		}
	}

	html, body, {
		height: 100vh;
	}
    
	body {
	  margin: 0;
	  font-family: 'Montserrat', sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	button {
	  cursor: pointer;
	}

`;
