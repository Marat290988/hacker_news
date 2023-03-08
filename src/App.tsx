import React, { ReactElement } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./App.css";
import MainPage from "./components/pages/main-page/MainPage";
import StoryDetails from './components/pages/story-details/StoryDetails';
import Layout from './components/layout/Layout';

function App(): ReactElement {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout><MainPage /></Layout>
    },
    {
      path: "/story/:storyId",
      element: <Layout><StoryDetails /></Layout>
    },
    {
      path: "*",
      element: <Navigate to='/'></Navigate>
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
