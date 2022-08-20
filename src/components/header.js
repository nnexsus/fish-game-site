import styled from 'styled-components';
import { useState } from 'react';

const Wrapper = styled.div`

    position: fixed;
    display: flex;
    right: -3px;
    top: -3px;

    z-index: 10;

    background-color: rgba(0, 0, 0, 0.6);

    padding: 4px;

    border-radius: 3px;

    a {
        margin: 0 10px;
        background-color: rgba(0, 0, 0, 0.3);
        padding: 1px 5px;
        color: lightcoral;
        text-shadow: 0 0 3px white;
        border-radius: 4px;
    }

`;

const Header = () => {

    const [data, setData] = useState(null)

    return (
        <Wrapper>
            <a href='/game'><p>Fish Game</p></a>
            <a href='/wiki/main'><p>Fish Wiki</p></a>
            <a href='/about'><p>About & More</p></a>
        </Wrapper>
    )
}

export default Header;