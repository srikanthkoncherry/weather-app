import React, { useState } from "react";
import { Button, Card, CardImg, Col, Container, Row } from "react-bootstrap";

const WeatherCard = ({ data, removeItem }) => {
    const [unit, setUnit] = useState('F')
    const [temp, setTemp] = useState({
        main: data.main.temp.toFixed(0),
        max: data.main.temp_max.toFixed(0),
        min: data.main.temp_min.toFixed(0),
        feels_like: data.main.feels_like.toFixed(0)
    })


    const handleRemove = () => {
        console.log("Removing ", data.id)
        removeItem(data)
    }

    const handleOnChange = (event) => {
        let newUnit = event.target.value
        if (newUnit === 'C' && unit === 'F') {
            setTemp({
                main: convertToCel(temp.main),
                max: convertToCel(temp.max),
                min: convertToCel(temp.min),
                feels_like: convertToCel(temp.feels_like)
            })
        }
        else if (newUnit === 'F' && unit === 'C') {
            setTemp({
                main: convertToFar(temp.main),
                max: convertToFar(temp.max),
                min: convertToFar(temp.min),
                feels_like: convertToFar(temp.feels_like)
            })
        }

        setUnit(newUnit)
        console.log("TEMP ", temp)
    }

    const convertToCel = (temp) => {
        return ((temp - 32) * 5 / 9).toFixed(0);
    }

    const convertToFar = (temp) => {
        return ((temp * 9 / 5) + 32).toFixed(0);
    }

    return (
        <div className="customCard">
            <div className="place"><span className="display-6">{data.name}, {data.sys.country}</span></div>
            <Row className="temp">
                <Col className="mainTemp">
                    <h2 className="display-2" >
                        {temp.main + "°" + unit}
                    </h2>
                </Col>
                <Col className="sideTemp">
                    <div> High : {temp.max + "°" + unit} </div>
                    <div> Low  : {temp.min + "°" + unit}</div>
                </Col>
                <Col className="description display-6">
                    {data.weather[0].main}
                </Col>
            </Row>



            <div className="bottom">
                <div className="feels">
                    {data.main ? <p className='display-4'>{temp.feels_like + "°" + unit}</p> : null}
                    <p>Feels Like</p>
                </div>
                <div className="humidity">
                    {data.main ? <p className='display-4'>{data.main.humidity}%</p> : null}
                    <p>Humidity</p>
                </div>
                <div className="wind">
                    {data.wind ? <><p className='display-4'>{data.wind.speed.toFixed()} </p></> : null}
                    <p>Wind Speed M/H</p>
                </div>
            </div>


            <div className="options">
                <fieldset className="toggle">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios1" value="F" onChange={handleOnChange} checked={unit === 'F'} />
                        <label class="form-check-label" for="optionsRadios1">
                            Farenheit
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios2" value="C" onChange={handleOnChange} />
                        <label class="form-check-label" for="optionsRadios2">
                            Celcius
                        </label>
                    </div>
                </fieldset>
                <Button className="btn btn-outline-danger" onClick={() => handleRemove(data)}> Remove </Button>
            </div>




        </div>
    );
}

export default WeatherCard;