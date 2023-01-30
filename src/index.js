import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from './Components/errorPage/error-page.jsx';
import Authentication from './pages/Authentication/Authentication';
import Profil from './pages/Profil/Profil';
import Test from './pages/Test/Test.jsx'
import Discussion from './pages/Discussion/Discussion.jsx'
import ShowDiscussion from './pages/Discussion/ShowDiscussion.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App /> ,
    errorElement: <ErrorPage /> ,
    children: [
        {
            path: "authentication",
            element: <Authentication /> ,
        },
        {
          path: "profil",
          element: <Profil /> ,
      },
      {
        path: "test",
        element: <Test /> ,
      },
      {
        path: "discussion",
        element: <Discussion /> , 
      },
      {
        path: "discussion/:id",
        element: <ShowDiscussion /> ,
      },          
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render( 
  <React.StrictMode>
    <RouterProvider router = { router }/>
  </React.StrictMode>
);