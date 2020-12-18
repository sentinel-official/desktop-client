import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  /* Set 1rem to the  default (10px) */
  font-size: 62.5%; 
}
body {
  font-size: 1.6rem;
  font-weight: normal;
  line-height: 2rem;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

#root {
  min-width: 100%;
  height: 100vh;
  position: relative;
  overflow-x: hidden;
}

a {
  text-decoration: none;
}
.search-container {
  border-radius: 2rem !important;
 
  input{
    border-top-left-radius: 2rem !important;
    border-bottom-left-radius: 2rem !important;
    border-right: 0px !important;
     background-color: transparent !important;
    ::placeholder{
        font-weight:500 !important;
        font-family: "Roboto"
    }
  }
  .react-search-field-button{
     background-color: transparent !important;
    border-top-right-radius: 2rem !important;
    border-bottom-right-radius: 2rem !important;
    border-left: 0px !important;
    svg{
      height:1.5rem
    }
  }
}
.MuiPaper-root.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded {
  border-radius: 0px !important;
  border: 1px solid #DCE9F1;
}
.search-container input {
  max-width: 12rem 
}

`;
export default GlobalStyle;
