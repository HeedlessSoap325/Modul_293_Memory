import {useEffect, useState} from "react";

export default function GameCard({imageName, clear, flippedCardsCount, flippedCards, onClearCards}){
    const [cardAsset, setCardAsset] = useState("card-back.png");
    const [flipped, setFlipped] = useState(false);

    useEffect(()=>{
        if(flipped){
            setCardAsset("empty.png");
        }
    },[clear])

    useEffect(()=>{
        setCardAsset("card-back.png");
    }, [imageName])

    function flipCard(){
        if(flippedCardsCount >= 2){return;}
        if(cardAsset === "empty.png"){return;}
        if(flipped){return;}

        setCardAsset(imageName);
        flippedCards.push(imageName);
        setFlipped(true);
        onClearCards();
    }

    return(
        <img src={cardAsset} height={150} width={150} alt={"Bild von einer Karte"} onClick={flipCard}/>
    );
}