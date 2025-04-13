import {useEffect, useState} from "react";

export default function GameCard({imageName, flippedCards, onCheckCards, flag, gameActive}){
    const cardBackImgLocation = "card-back.png";
    const cardEmptyImgLocation = "empty.png";
    const [cardAsset, setCardAsset] = useState(cardBackImgLocation);
    const [flipped, setFlipped] = useState(false);

    useEffect(()=>{
        switch (flag) {
            case 0: //reset Card to Initial State Flag
                setCardAsset(cardBackImgLocation);
                setFlipped(false);
                break;

            case 1: //remove Card, because the two Cards are matching
                if(flipped){
                    setCardAsset(cardEmptyImgLocation);
                }
                break;

            case 2: //reset Card, because the two Cards don't match
                if (cardAsset !== cardEmptyImgLocation) {
                    setCardAsset(cardBackImgLocation);
                    setFlipped(false);
                }
                break;

            default:
                break;
        }
    }, [flag])

    function flipCard(){
        if((flippedCards.length >= 2) || (cardAsset === cardEmptyImgLocation) || flipped || !gameActive){return;}

        setCardAsset(imageName);
        flippedCards.push(imageName);
        setFlipped(true);
        onCheckCards();
    }

    return(
        <img src={cardAsset} height={150} width={150} alt={"Bild von einer Karte"} onClick={flipCard}/>
    );
}