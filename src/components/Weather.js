import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card } from 'react-bootstrap';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = "6e8c12e5ce32a22d4e9edea320800180"

  useEffect(() => {
    if (city) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fetch weather data for the entered city
    // You'll need to replace YOUR_API_KEY with your actual OpenWeatherMap API key
    // You can sign up for a free API key at OpenWeatherMap
  };

  return (
    <Container>
      <h1>Weather App</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="city">
          <Form.Label>Enter a city:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Get Weather
        </Button>
      </Form>
      {weatherData && (
        <Card>
          <Card.Body>
            <Card.Title>{weatherData.name}</Card.Title>
            <Card.Text>Temperature: {weatherData.main.temp}°C</Card.Text>
            <Card.Text>Weather: {weatherData.weather[0].description}</Card.Text>
            <Card.Text>Wind Speed: {weatherData.wind.speed} m/s</Card.Text>
            <Card.Text>Humidity: {weatherData.main.humidity}%</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Weather;
