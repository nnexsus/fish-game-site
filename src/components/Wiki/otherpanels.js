import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';

const Wrapper = styled.div`

    background-image: url("/media/sprites/roomcontainer.png");
    background-size: cover;
    background-position-x: center;
    image-rendering: pixelated;
    padding: 5px;
    text-align: center;

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
        backdrop-filter: blur(6px) brightness(0.8) saturate(1.5);
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
        color: black;
    }

    .slider {
        -webkit-appearance: none;
        width: 30%;
        height: 10px;
        border-radius: 5px;
        background: rgba(0, 0, 0, 0.4);
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

const Depth = styled.h2`

    color: ${prop => 
    prop.depth == "Surface" ? "#79F6F6" :
    prop.depth == "Daylight" ? "#01BAEF" :
    prop.depth == "Twilight" ? "#098686" :
    prop.depth == "Midnight" ? "#660063" :
    prop.depth == "Abyss" ? "#26081C" :
    prop.depth == "Hadal" ? "#150811" :
    prop.depth == "Infinite" ? "#B14390" : 
    prop.depth == "Hidden" ? "#E5B769" : 
    "white"};

`;

const OtherPanels = () => {

    const [data, setData] = useState(null)
    const [err, setErr] = useState(null)
    const [grid, setGrid] = useState(4);

    useState(() => {
        axios.get("https://fish-game-api.herokuapp.com/rooms").then((res) => {
            setData(res.data[0])
        }).catch((err) => {
            setErr(err)
            console.log(err)
        })
    }, [])

    const pays = ["Other", "Coins", "Cash"]
    const rarity = ["Other", "Common", "Uncommon", "Rare", "Legendary", "Mythical"]
    const depths = ["Surface", "Daylight", "Twilight", "Midnight", "Abyss", "Hadal", "Infinite", "Hidden"]

    return (
        <div style={{width: "95%", margin: "0 auto"}}>
            <Wrapper grid={grid}>
                <div className='controls'>
                    <label htmlFor='rowSelect' style={{color: "black", fontFamily: "slimfont", marginLeft: "30px"}}>Display in row:</label>
                    <input className='slider' type={"range"} min={1} max={4} value={grid} onChange={(e) => setGrid(e.currentTarget.value)}/>
                    <p style={{color: "black"}}>{grid}</p>
                </div>
                {err !== null ?
                <p>Error loading data! Please try again later. If the error persists, please contact <a href='mailto@'>nnexsus.service@gmail.com</a></p> 
                : null}
                {data !== null ?
                <div className='panelContainer'>
                {data.depths.map((fish) => (
                    <div className='fish' key={fish.name}>
                        <Depth depth={fish.name} style={{textAlign: "center", textShadow: "0 0 2px white"}}>{fish.name}</Depth>
                        <h3>Rooms: </h3>
                        <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", backdropFilter: "brightness(0.1) blur(20px) saturate(1.5)", borderRadius: "10px"}}>
                            {fish.rooms.map((room) => {
                                return (
                                    <p style={{fontSize: "14px"}} key={room}>{room}</p>
                                )
                            })}
                        </div>
                        <h3>Decor: </h3>
                        <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", backdropFilter: "brightness(0.1) blur(20px) saturate(1.5)", borderRadius: "10px"}}>
                            {fish.decor.map((decorroom) => {
                                return (
                                    <div key={decorroom.name}>
                                    <p>{decorroom.name}</p><img alt={`decor: ${decorroom.name}`} src={`/media/sprites/decor/${decorroom.name}.png`} width="40px" height="auto" style={{imageRendering: "pixelated"}} />
                                    <p>Multi: {decorroom.mult}</p> <p>Cost: {decorroom.cost}</p>
                                </div>
                                )
                            })}
                        </div>
                        <h3 style={{textAlign: "center"}}>Auto Collector Cost: {fish.autoCost}<img src={`/media/Cash.png`} width="20px" height="20px"/></h3>
                        <h3 style={{textAlign: "center"}}>Compatible Fish Amount: {fish.maxInDepth}<img src={`/media/sprites/fish/Rainbow Fish.png`} width="20px" height="20px"/></h3>
                    </div>
                ))} 
                </div>
                : <p>Loading...</p>}
            </Wrapper>
        </div>
    )
}

export default OtherPanels;