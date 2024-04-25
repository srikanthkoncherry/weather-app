import Search from './components/Search';
import Weather from './components/Weather';
import React, { useEffect, useState } from 'react';
import './styles/Morph.css'

function App() {
  const [location, setLocation] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    console.log("Loation changes to", location)
    fetchWeatherData()
  }, [location])
  const handleSearch = (city) => {
    console.log("Handling search for ", city)
    setLocation(city)
  }

  async function fetchWeatherData() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`
    console.log("searching open api for ", url)
    try {
      const response = await fetch(url)
      console.log(response.json)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="cotainer">
      <Search handleSearch={handleSearch} />
    </div>
  );
}

export default App;
