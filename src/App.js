import React from "react";
import "./App.css";
import config from "./config";
import VideoUpload from "./containers/Upload/VideoUpload";
import Home from "./containers/Home/Home";
import ImageViewer from "./containers/Receive/ImageViewer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <Home base={config.URL} />,
    },
    {
      path: config.upload,
      element: <VideoUpload base={config.URL} path={config.upload} />,
    },
    {
      path: config.receive,
      element: (
        <ImageViewer
          base={config.URL}
          path={config.receive}
          listEndpoint={config.listImages}
          downloadEndpoint={config.downloadImage}
        />
      ),
    },
  ]);
  return (
    <div>
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
