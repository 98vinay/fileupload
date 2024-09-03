import React from "react";
import "./App.css";
import config from "./config";
import FileUpload from "./containers/Upload/FileUpload";
import Home from "./containers/Home/Home";
import FileViewer from "./containers/Receive/FileViewer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <Home base={config.URL} />,
    },
    {
      path: config.upload,
      element: <FileUpload base={config.URL} path={config.upload} />,
    },
    {
      path: config.receive,
      element: (
        <FileViewer
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
