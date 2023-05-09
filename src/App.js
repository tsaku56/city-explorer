import axios from "axios";
import "./App.css";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState({});
  const [img, setIMG] = useState("");

  function handleChange(event) {
    setSearchQuery(event.target.value);
  }

  async function getLocation() {
    try {
      const API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;
      // const imageURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_TOKEN}&center=${location.lat},${location.lon}$zoom=12&size=600x400&format=png`
      const res = await axios.get(API);
      setLocation(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <img src="https://media0.giphy.com/media/xT5LMXJGGOjUnBsBKU/giphy.gif?cid=ecf05e47z5qfmq6y1gfymnn9qef9xdfd5wkz6q9ogq0b2ww6&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="funny" />
      <h1>City Explorer Demo</h1>
      <input onChange={handleChange} placeholder="Place name" />
      <button onClick={getLocation}>Explore</button>
      <h2>{location.display_name}</h2>
      <h2>
        Latitude={location.lat} Longitude={location.lon}
      </h2>
    </div>
  );
}

export default App;
