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
	    box-sizing: border-box;
	    @media only screen and (max-width: 600px) {
	        font-size: 50%
	    }
    }
    
	body {
	  margin: 0;
	  font-family: 'Montserrat', sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	    background: ${props => props.theme.background}
	}
	
	button {
	  cursor: pointer;
	}
	
	code {
	  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
	    monospace;
	}
	
	input, button { 
		width: 100%;
		padding: 1.2rem;
		border-radius: ${props => props.theme.borderRadius}
		
		&:focus {
			outline: none;
		}
	},
	#modal {
	    position: relative;
	    z-index: 999;
	}
`;
