import {useEffect, useState} from "react";

export default function GameCard({imageName, clear, flippedCardsCount, setFlippedCardsCount}){
    const [cardAsset, setCardAsset] = useState("card-back.png");
    const [flipped, setFlipped] = useState(false);

    useEffect(()=>{
        if(flipped){
            setCardAsset("empty.png");
        }
    },[clear])

    useEffect(()=>{
        if(cardAsset === "empty.png"){return;}
        if(flipped) {
            setCardAsset(imageName)
        }else {
            setCardAsset("card-back.png");
        }
    }, [flipped, imageName]);

    function flipCard(){
        if(flippedCardsCount >= 2){return;}
        setFlipped(true);
        setFlippedCardsCount(flippedCardsCount + 1);
    }

    return(
        <img src={cardAsset} height={150} width={150} alt={"Bild von einer Karte"} onClick={flipCard}/>
    );
}