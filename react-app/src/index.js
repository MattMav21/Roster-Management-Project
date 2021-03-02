import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
// import { Provider } from "react-redux";
// import store from "./store"




const Root = () => {
  return (
    //Add this later
    //<Provider store={store}>
    // <Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    // </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
