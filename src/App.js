import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Random from './pages/Random';
import Search from './pages/Search';
import Liked from './pages/Liked';

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
