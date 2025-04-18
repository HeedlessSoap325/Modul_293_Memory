import GameCard from "./GameCard.jsx";
import "../css/GameFrame.css";
import {useEffect, useState} from "react";
import Players from "./Players.jsx";

export default function GameFrame(){
    const [flippedCards, setFlippedCards] = useState([]);
    const [flag, setFlag] = useState(undefined);
    const [pictures, setPictures] = useState([]);
    const [gameActive, setGameActive] = useState(false);
    const [totalFlippedCards, setTotalFlippedCards] = useState(0);

    function onCheckCards(){
        if(flippedCards.length === 2 && (flippedCards.at(0) === flippedCards.at(1))) {
            setTimeout(onClearCards, 500);
            setTotalFlippedCards(totalFlippedCards + 2);
        }else if (flippedCards.length === 2 && (flippedCards.at(0) !== flippedCards.at(1))){
            setTimeout(onReturnCards, 750);
        }
    }

    function dispatchFlag(flag){
        setFlag(flag);
        setTimeout(()=>setFlag(undefined), 300);
    }

    function onClearCards(){
        dispatchFlag(1);
        setFlippedCards([]);
    }

    function onReturnCards(){
        dispatchFlag(2);
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

    useEffect(()=>{
        if (totalFlippedCards === 16){
            setGameActive(false);
            setTotalFlippedCards(0);
            randomiseCards();
            dispatchFlag(0);
        }
    },[totalFlippedCards])

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