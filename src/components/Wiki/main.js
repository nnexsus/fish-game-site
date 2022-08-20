import styled from 'styled-components';
import { useState } from 'react';

const Wrapper = styled.div`

    margin: 10%;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;

    .buttonimg {
        padding: 3px 3px 0 3px;
        border: rgba(0, 0, 0, 0.3) 3px solid;
        border-radius: 3px;

        transition: 0.2s ease-in-out;

        p {
            position: absolute; 
            margin-top: -23px; 
            color: white;
            text-shadow: 0 0 4px black;
        }

        img {
            transition: 0.2s ease-in-out;
            :hover {
                transform: scale(1.05) skew(0.8deg);
                filter: brightness(1.1);
            }
        }

        :hover {
            transform: scale(1.05) skew(1.5deg);
            filter: brightness(1.1);
        }
    }
`;

const Main = () => {

    const [data, setData] = useState(null)

    return (
        <Wrapper>
            <div className='buttonimg' style={{width: "100%", height: "auto", backgroundColor: "#7077FF"}}>
                <a href='/wiki/fish'><img src='/media/fishbutton.png' height="250px" width="auto"/><p>Fish Info</p></a>
            </div>
            <div className='buttonimg' style={{width: "100%", height: "auto", backgroundColor: "#7077FF"}}>
                <a href='/wiki/rooms'><img src='/media/roombutton.png' height="250px" width="auto"/><p>Room Info</p></a>
            </div>
            <div className='buttonimg' style={{width: "100%", height: "auto", backgroundColor: "#7077FF"}}>
                <a href='/wiki/other'><img src='/media/bookbutton.png' height="250px" width="auto"/><p>Other Info</p></a>
            </div>
            <div style={{height: "580px"}}>
            </div>
        </Wrapper>
    )
}

export default Main;