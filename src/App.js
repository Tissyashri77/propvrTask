import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Random from './pages/Random';
import Search from './pages/Search';
import Liked from './pages/Liked';
import ImageDetails from './pages/ImageDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Random/>
    ),
  },
  {
    path: "search",
    element: (
      <Search/>
    ),
  },
  {
    path:"liked",
    element:(
      <Liked/>
    )
  },
  {
    path:"images/:id",
    element:(
      <ImageDetails/>
    )
  }
]);

function App() {
  

  return (
    <div className="App">
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;
