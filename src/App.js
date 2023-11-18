import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomImages } from './common/store/slice/images';
import { searchImages } from './common/store/slice/search';

function App() {
  const dispatch = useDispatch()
  const state = useSelector((state) => state);

  console.log("State",state);

  if (state.randomImages.isLoading) {
    return <h1>Loading....</h1>;
  }

  if (state.searchImages.isLoading) {
    return <h1>Loading....</h1>;
  } 

  return (
    <div className="App">
        <button onClick={(e) => dispatch(fetchRandomImages())}>Fetch Images</button>
        {
          state.randomImages.data && (state.randomImages.data).map((item) => <li>{item.slug}</li>)
        }

        <button onClick={(e) => dispatch(searchImages({query:"office",pageNo:1}))}>Search Images</button>

        <button onClick={(e) => dispatch(searchImages({query:"office",pageNo:2}))}>Next Page Images</button>
        <button onClick={(e) => dispatch(searchImages({query:"office",pageNo:11}))}>Next Page Images</button>

        <button onClick={(e) => dispatch(searchImages('tech', 4))}>Next Page Images</button>



    </div>
  );
}

export default App;
