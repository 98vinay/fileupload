import React, {useState} from 'react';
import './App.css';
import VideoUpload from './containers/Upload/VideoUpload';
import Home from './containers/Home/Home';
import ImageViewer from './containers/Receive/ImageViewer';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
function App() {
  const [url,setUrl] = useState('http://10.119.176.8:3001');
  const Router = createBrowserRouter([
    {
      path: '/',
      element: <Home base={url}/>
    },
    {
      path: '/upload',
      element: <VideoUpload base={url}/>
    },
    {
      path: '/receive',
      element: <ImageViewer base={url}/>
    }
  ]);
  return (
    <div>
        <RouterProvider router={Router} />
    </div>
  );
}

export default App;
