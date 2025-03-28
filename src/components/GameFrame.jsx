import GameCard from "./GameCard.jsx";
import "../css/GameFrame.css";
import {useState} from "react";

export default function GameFrame(){
    const [clearCards, setClearCards] = useState(false);
    const [flippedCardsCount, setFlippedCardsCount] = useState(0);

    function onClearCards(){
        setClearCards(!clearCards);
        setFlippedCardsCount(0);
    }

    //TODO implement Logic to assign random pictures to cards

    return (
        <div className={"game-wrapper"}>
            <div className={"game-side"}>
                <input type={"button"} onClick={onClearCards}/>
            </div>
            <div className="game-frame">
                {[...Array(16)].map((_, index) => (
                    <GameCard
                        imageName={"test.jpg"}
                        clear={clearCards}
                        flippedCardsCount={flippedCardsCount}
                        setFlippedCardsCount={setFlippedCardsCount}
                    />
                ))}
            </div>
        </div>
    );
}