import GameCard from "./GameCard.jsx";
import "../css/GameFrame.css";
import {useState} from "react";

export default function GameFrame(){
    const [flippedCards, setFlippedCards] = useState([]);
    const [flag, setFlag] = useState(undefined);

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

    //TODO implement Logic to assign random pictures to cards

    return (
        <div className={"game-wrapper"}>
            <div className={"game-side"}>

            </div>
            <div className="game-frame">
                {[...Array(16)].map((_, index) => (
                    <GameCard
                        imageName={`${(index + 1) % 8}.png`}
                        flippedCards={flippedCards}
                        onCheckCards={onCheckCards}
                        flag={flag}
                    />
                ))}
            </div>
        </div>
    );
}