import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import App from "./App";
import WorksPage from "./pages/WorksPage/WorksPage";
import COrnerWhispers from "./pages/WorksPage/Works/CornerWhispers";
import PerformancePage from "./pages/PerformancePage/PerformancePage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "/works",
        children: [
          {
            path: "",
            element: <WorksPage />,
          },
          {
            path: "corner-whispers",
            element: <COrnerWhispers />,
          },
        ],
      },
    ],
  },
  {
    path: "/performance",
    element: <PerformancePage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
