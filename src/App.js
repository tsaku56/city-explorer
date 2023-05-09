import axios from "axios";
import "./App.css";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState({});
  const [mapIMG, setMap] = useState("");

  function handleChange(event) {
    setSearchQuery(event.target.value);
  }

  async function getLocation() {
    try {
      const API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;
      const res = await axios.get(API);
      setLocation(res.data[0]);
      const showMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_TOKEN}&center=${location.lat},${location.lon}$zoom=12&size=600x400&format=png`;
      setMap(showMap);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <h1>City Explorer Demo</h1>
      <input onChange={handleChange} placeholder="Place name" />
      <button onClick={getLocation}>Explore</button>
      <h2>{location.display_name}</h2>
      <h2>Latitude={location.lat}</h2>
      <h2>Longitude={location.lon}</h2>
      {/* <img src=`${mapIMG.show}` /> */}
    </div>
  );
}

export default App;
