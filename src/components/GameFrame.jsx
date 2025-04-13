import GameCard from "./GameCard.jsx";
import "../css/GameFrame.css";
import {useEffect, useState} from "react";
import Players from "./Players.jsx";

export default function GameFrame(){
    const [flippedCards, setFlippedCards] = useState([]);
    const [flag, setFlag] = useState(undefined);
    const [pictures, setPictures] = useState([]);
    const [gameActive, setGameActive] = useState(false);

    function onCheckCards(){
        if(flippedCards.length === 2 && (flippedCards.at(0) === flippedCards.at(1))) {
            setTimeout(onClearCards, 500);
        }else if (flippedCards.length === 2 && (flippedCards.at(0) !== flippedCards.at(1))){
            setTimeout(onReturnCards, 750);
        }
    }

    function onClearCards(){
        setFlag(1);

        setTimeout(()=>setFlag(undefined), 300);
        setFlippedCards([]);
    }

    function onReturnCards(){
        setFlag(2);

        setTimeout(()=>setFlag(undefined), 300);
        setFlippedCards([]);
    }

    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    function randomiseCards() {
        const images = [1, 2, 3, 4, 5, 6, 7, 8];
        const doubleImages = [...images, ...images];
        const shuffledImages = shuffleArray(doubleImages);
        setPictures(shuffledImages);
    }

    useEffect(() => {
        randomiseCards()
    }, []);

    return (
        <div className={"game-wrapper"}>
            <div className={"game-side"}>
                <Players
                    gameActive={gameActive}
                    setGameActive={setGameActive}
                    flag={flag}
                    dispatchFlag={dispatchFlag}/>
            </div>
            <div className="game-frame">
                {pictures.map((value, index) => (
                    <div key={index} className={"game-card"}>
                        <GameCard
                            imageName={`${value}.png`}
                            flippedCards={flippedCards}
                            onCheckCards={onCheckCards}
                            flag={flag}
                            gameActive={gameActive}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}