import styled from 'styled-components';
import { useState } from 'react';

const Wrapper = styled.div`

    padding: 10px;
    margin: 10px;
    margin-bottom: 30px;

    h1, h2, h3, h4, a, p {
        color: white;
        text-shadow: 0 0 8px black;
        background-color: rgba(0, 0, 0, 0.3);
        text-align: center;
        padding: 2px;
    }

    img {
        background-color: rgba(0, 0, 0, 0.4);
        border: solid 2px rgba(0, 0, 0, 0.4);
        border-radius: 10px;
        padding: 5px;
        filter: drop-shadow(0 0 2px black);
    }

    a {
        color: lightcoral;
    }

    .other {
        display: none;

        backdrop-filter: blur(58px) brightness(1.4) saturate(0.8);
        padding: 10px;
        margin: 20px;
        border: rgba(20, 120, 120, 0.4) solid 4px;
        border-radius: 3px;

        background-image: url("/media/sprites/fish/Shadow Leviathan.png");
        background-repeat: no-repeat;
        background-size: contain;
        background-position-y: 50px;
        image-rendering: pixelated;
    }

    .placeholder {
        backdrop-filter: blur(10px) brightness(1.2);
        padding: 100px 15px;
        border-radius: 10px;
        margin: 250px 20px;

        h1, h4 {
            border-radius: 10px;
        }
    }

`;

const FishGame = () => {

    const [time, setTime] = useState("")

    const release = (Date.UTC(2022, 9, 12, 12)) / 100000000000
    const now = ((Date.now()) / 100000000000) / release
    
    const updateTime = () => {
        setTimeout(() => {
            const date1 = new Date(Date.now());
            const date2 = new Date('9/12/2022');
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            const diffHrs = Math.ceil(diffTime / (1000 * 60 * 60)) % 24
            const diffMins = Math.ceil(diffTime / (1000 * 60)) % 60
            const diffSecs = Math.ceil(diffTime / (1000)) % 60
            setTime(`${diffDays} days, ${diffHrs}:${diffMins}:${diffSecs}`)
        }, 1000)
    }

    updateTime()

    return (
        <Wrapper>
            <img src='/media/title.png' width="40%" height="auto" style={{margin: "0 auto", imageRendering: "pixelated"}} />
            <div className='placeholder'>
                <h1>{time}</h1>
                <h4>Time depicted above is predicted release date. Fish Game may release before then. Updates and news is available on 
                    my <a href='https://twitter.com/_nnexsus' target="_blank" rel='noreferrer'>twitter</a>, <a href='https://discord.gg/d8R2tDaBK2' target="_blank" rel='noreferrer'>discord</a>
                    , or <a href='https://nnexsus.net/' target="_blank" rel='noreferrer'>personal site</a>.</h4>
            </div>
            <div className='other'>
                <h2>Hi!</h2>
                <h3>I hope you enjoy Fish Game. Its a scaling tycoon type game with a strong focus on the amazing creatures and biomes that lay deep within our ocean.</h3>
                <h3>Theres a <a href='/wiki/main'>wiki for fish game</a> with stats, sprites, and facts -so you can learn about what you're seeing.</h3>
                <p>This is my first published game! I have another game demo coming soon called ASCARDS, which is viewable on my <a href='https://twitter.com/_nnexsus' target="_blank" rel='noreferrer'>Twitter</a> or 
                <a target="_blank" rel='noreferrer' href='https://nnexsus.net/'> my site</a>. I also make websites, after effects renders, music videos (occasionally), and much more. You can check it out at the same
                places!</p>
                <p>Also, there's 10 hidden songs in the game (typically a youtube link ID). Good luck finding them, I hid the crap out of them and they will NOT be easy to find.</p>
                <p>If there are any issues with the game or site, please contact <a href='@mailto'>nnexsus.service@gmail.com</a> ASAP!</p>
            </div>
            <div style={{height: "180px"}}>
            </div>
        </Wrapper>
    )
}

export default FishGame;
