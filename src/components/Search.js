import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

const Search = ({ handleSearch }) => {
    const [input, setInput] = useState('')
    const [options, setOptions] = useState('')
    const [city, setCity] = useState('')

    const geoOptions = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8ef1dca0a4msh52e633af1c31ef9p18ea49jsn87263a4321e5',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    };
    const cityuri = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1000000&sort=-population&namePrefix=' + input;

    async function searchOptions() {
        try {
            const response = await fetch(cityuri, geoOptions)
            const result = await response.json()
            let res = result.data.map(data => data.city)
            console.log("Rapid api respone = ", res)
            setOptions(res)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        console.log("INPUT = ", input)
        if (input !== '') {
            searchOptions()
        }
    }, [input])

    const handleOnChange = (event) => {
        console.log("In handle on change with ", event.target.value)
        setInput(event.target.value)
    }

    const handleOnClick = () => {
        if (city !== '') {
            handleSearch(city)
        } else {
            handleSearch(input)
        }

        setCity('')
        setOptions([])
        setInput('')
    }
    return (
        <div className="Search-bar">
            <div className="input-group mb-3">
                <input
                    placeholder='Enter'
                    type="text"
                    className="form-control"
                    value={input}
                    onChange={handleOnChange}>
                </input>
                <span className="input-group-btn">
                    <Button
                        className="btn btn-default"
                        type="button"
                        onClick={handleOnClick}>
                        Search
                    </Button>
                </span>
            </div>
            {(options.length > 0 && city === '') &&
                <div className="form-control">
                    {options.map((option) => (
                        <div
                            className="litem"
                            key={option}
                        >
                            <button
                                type="button"
                                className="dropdown-item"
                                data-bs-theme-value="dark"
                                onClick={() => {
                                    console.log("SELECTED ", option)
                                    setCity(option)
                                    setInput(option)
                                }}>
                                {option}
                            </button>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default Search;