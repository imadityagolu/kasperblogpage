
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { BrowserRouter } from "react-router-dom";
import ReactGA from "react-ga"

import { BlogProvider } from './BlogContext/BlogContext';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import BlogDeleteProvider from './BlogContext/BlogDeleteContext';

ReactGA.initialize("G-5CHDVVN4Q7");

ReactGA.send({
  hitType:"pageview",
  page: window.location.pathname,
})


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>  {/* Redux Provider */}
    <BlogDeleteProvider>
    <BlogProvider >  {/* Custom Blog Context Provider */}
    <App />
    </BlogProvider>
    </BlogDeleteProvider>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
