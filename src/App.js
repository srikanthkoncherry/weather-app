import { Container, Row, Col } from 'react-bootstrap';
import Search from './components/Search';
import WeatherCard from './components/WeatherCard';
import React, { useEffect, useState } from 'react';


function App() {
  const [location, setLocation] = useState('')
  const [cityList, setCityList] = useState([])

  useEffect(() => {
    console.log("Loation changes to", location)
    fetchWeatherData()
  }, [location])

  const handleSearch = (city) => {
    console.log("Handling search for ", city)
    setLocation(city)
  }

  useEffect(() => { console.log("CITYYLIST ", cityList) }, [cityList])
  async function fetchWeatherData() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`
    console.log("searching open api for ", url)
    try {
      const response = await fetch(url)
      if (response.status === 200) {
        const result = await response.json()
        console.log("Weather api response ", result)
        setCityList([...cityList, result])
      }
    } catch (error) {
      console.error(error)
    }
  }

  const removeItem = (item) => {
    const updatedItems = cityList.filter(city => item.id !== city.id);
    setCityList(updatedItems)
  }

  const renderComponents = () => {
    const rows = [];
    for (let i = 0; i < cityList.length; i += 2) {
      const firstCity = cityList[i];
      const secondCity = cityList[i + 1];
      rows.push(
        <Row className="rowww" key={i}>
          <Col sm={6}>
            <WeatherCard key={firstCity.id} data={firstCity} removeItem={removeItem} />
          </Col>
          <Col sm={6}>
            {secondCity && (
              <>
                <WeatherCard key={secondCity.id} data={secondCity} removeItem={removeItem} />
              </>
            )}
          </Col>
        </Row>
      );
    }
    return rows;
  };

  return (

    <Container className="container" >
      <Search handleSearch={handleSearch} />
      {renderComponents()}
    </Container>
  );
}

export default App;
