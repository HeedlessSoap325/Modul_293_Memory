import GameCard from "./GameCard.jsx";
import "../css/GameFrame.css";
import {useEffect, useState} from "react";

export default function GameFrame(){
    const [clearCards, setClearCards] = useState(false);
    const [flippedCardsCount, setFlippedCardsCount] = useState(0);
    const [flippedCards, setFlippedCards] = useState([]);

    function onClearCards(){
        console.log()
        if(flippedCards.length && (flippedCards.at(0) === flippedCards.at(1))) {
            setClearCards(!clearCards);
            setFlippedCardsCount(0);
            setFlippedCards([]);
        }
    }

    //TODO implement Logic to assign random pictures to cards

    return (
        <div className={"game-wrapper"}>
            <div className={"game-side"}>

            </div>
            <div className="game-frame">
                {[...Array(16)].map((_, index) => (
                    <GameCard
                        imageName={"test.jpg"}
                        clear={clearCards}
                        flippedCardsCount={flippedCards.length}
                        flippedCards={flippedCards}
                        onClearCards={onClearCards}
                    />
                ))}
            </div>
        </div>
    );
}