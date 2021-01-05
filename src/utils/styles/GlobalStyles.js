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
}
.search-container input {
  max-width: 12rem 
}

.react-select-custom  ::-webkit-scrollbar, .scroll-bar::-webkit-scrollbar  {
  width: .5rem;
}
 
.react-select-custom ::-webkit-scrollbar-track {}
.react-select-custom ::-webkit-scrollbar-thumb {
  background-color: #129EED;
}
.scroll-bar{
overflow-y: scroll
}

.scroll-bar::-webkit-scrollbar-track {
  background-color: transparent
}
.scroll-bar::-webkit-scrollbar-thumb {
  background-color:  #DCE9F1 !important;
}

.truncate-text {
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.__react_component_tooltip{
      padding: 3px 5px !important;
      border: 1px solid grey !important;
      background-color: #EEF4FF !important;
      border-radius: 0px !important;
      p {
        margin:0 !important
      }
}
.__react_component_tooltip::before, .__react_component_tooltip::after{
  display: none !important
}
.__react_component_tooltip.show{
  margin-top: 2.4rem !important;
  margin-left: 2rem !important 
}

.recharts-cartesian-axis-ticks, .recharts-line-dot {
  display :none !important
}
.recharts-dot .recharts-line-dot {
  display :none !important
}

.google-map {
  height: 55.8vh;
  width: 100%
}

`;
export default GlobalStyle;
