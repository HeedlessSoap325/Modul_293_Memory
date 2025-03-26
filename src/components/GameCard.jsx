import {use, useEffect, useState} from "react";

export default function GameCard({imageName}){
    const [CardAsset, setCardAsset] = useState("card-back.png");
    const [flipped, setFlipped] = useState(false);

    useEffect(()=>{
        if(flipped) {
            setCardAsset(imageName)
        }else {
            setCardAsset("card-back.png");
        }
    }, [flipped, imageName]);

    return(
        <img src={CardAsset} height={200} alt={"Bild von einer Karte"} onClick={()=>setFlipped(!flipped)}/>
    );
}