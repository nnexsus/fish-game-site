import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';

const Wrapper = styled.div`

    background-image: url("/media/sprites/rooms/EMPTY.png");
    background-size: 100%;
    image-rendering: pixelated;
    padding: 5px;

    .panelContainer {
        display: grid;
        grid-template-columns: ${prop => `repeat(${prop.grid}, ${(100 / (prop.grid)) - 3}%)`};
        grid-gap: 30px;

        align-items: start;
        justify-content: center;
    }

    .fish {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: rgba(0, 0, 0, 0.4) solid 3px;
        border-radius: 15px;
        //background: radial-gradient(circle, rgba(101,92,97,1) 15%, rgba(65,57,62,1) 100%);
        //background-color: #41393E;
        background-color: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(6px) brightness(1.5) saturate(1.5);
        background-blend-mode: overlay;

        padding: 5px;

        color: #EDF5FD;
        text-shadow: 0px 0px 5px black;

        transition: 0.2s ease-in-out;
        :hover {
            transform: scale(1.1) skew(0.8deg);
            filter: brightness(1.1);
        }

        img {
            transition: 0.2s ease-in-out;
            filter: drop-shadow(0 0 2px black);
            :hover {
                transform: scale(1.35) skew(-0.8deg);
                filter: brightness(0.9) drop-shadow(0 0 50px white);
            }
        }
    }

    .controls {
        display: flex;
        align-items: center;
        margin: 50px 20px;
    }

    .slider {
        -webkit-appearance: none;
        width: 30%;
        height: 10px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.4);
        backdrop-filter: blur(6px) brightness(1.5) saturate(1.5);
        outline: none;
        opacity: 0.7;
        transition: 1s ease-out;

        filter: ${prop => `hue-rotate(${(prop.grid * 100) - 300}deg)`};
    }

    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 30px;
        height: 30px;
        border: 0;
        background: url('/media/sprites/decor/Beach Ball.png');
        background-size: cover;
        image-rendering: pixelated;
        cursor: pointer;
        filter: drop-shadow(0 0 2px black);

        transition: 1s ease-out;
        transform: ${prop => `rotate(${(prop.grid * 30) - 90}deg)`};
    }

    .slider::-moz-range-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 50px;
        height: 30px;
        border: 0;
        background: url('/media/sprites/decor/Beach Ball.png');
        background-size: cover;
        image-rendering: pixelated;
        cursor: pointer;
        filter: drop-shadow(0 0 2px black);
    }

`;

const Depth = styled.p`

    color: ${prop => 
    prop.depth <= 0 ? "#79F6F6" :
    prop.depth <= 1 ? "#01BAEF" :
    prop.depth <= 2 ? "#098686" :
    prop.depth <= 3 ? "#660063" :
    prop.depth <= 4 ? "#26081C" :
    prop.depth <= 5 ? "#150811" :
    prop.depth <= 6 ? "#B14390" : 
    prop.depth <= 7 ? "#E5B769" : 
    "white"};

`;

const RoomPanels = () => {

    const [data, setData] = useState(null)
    const [err, setErr] = useState(null)
    const [grid, setGrid] = useState(3);

    useState(() => {
        axios.get("http://localhost:5000/rooms").then((res) => {
            console.log(res.data)
            setData(res.data[0])
        }).catch((err) => {
            setErr(err)
            console.log(err)
        })
    }, [])

    const depths = ["Surface", "Daylight", "Twilight", "Midnight", "Abyss", "Hadal", "Infinite", "Hidden"]

    return (
        <div style={{width: "95%", margin: "0 auto"}}>
            <Wrapper grid={grid}>
                <div className='controls'>
                    <label htmlFor='rowSelect' style={{color: "white", fontFamily: "slimfont", marginLeft: "30px"}}>Display in row:</label>
                    <input className='slider' type={"range"} min={1} max={4} value={grid} onChange={(e) => setGrid(e.currentTarget.value)}/>
                    <p style={{color: "white"}}>{grid}</p>
                </div>
                {err !== null ?
                <p>Error loading data! Please try again later. If the error persists, please contact <a href='mailto@'>nnexsus.service@gmail.com</a></p> 
                : null}
                {data !== null ?
                <div className='panelContainer'>
                {data.rooms.map((fish) => (
                    <div className='fish' key={fish.name}>
                        <h2 style={{textAlign: "center"}}>{fish.name}</h2>
                        <img width="90%" height="auto" src={`/media/sprites/rooms/${fish.name}.png`} style={{imageRendering: "pixelated"}} />
                        <h3 style={{textAlign: "center"}}>Coin Storage: {fish.coincap}<img src={`/media/Coins.png`} width="20px" height="20px"/></h3>
                        <h3 style={{textAlign: "center"}}>Cash Storage: {fish.cashcap}<img src={`/media/Cash.png`} width="20px" height="20px"/></h3>
                        <p style={{textAlign: "center"}}>{fish.desc}</p>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Depth depth={fish.depth} style={{margin: "0", height: "12px", padding: "3px"}} key={`${fish.name + fish.depth}`}>{depths[fish.depth]}</Depth>
                        </div>
                    </div>
                ))} 
                </div>
                : <p>Loading...</p>}
            </Wrapper>
        </div>
    )
}

export default RoomPanels;