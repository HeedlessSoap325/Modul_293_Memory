import {useEffect, useState} from "react";

export default function GameCard({imageName, clear}){
    const [CardAsset, setCardAsset] = useState("card-back.png");
    const [flipped, setFlipped] = useState(false);
    const [flippable, setFlippable] = useState(true);

    useEffect(()=>{
        if(flipped){
            setCardAsset("empty.png");
            setFlippable(false);
        }
    },[clear])

    useEffect(()=>{
        if(!flippable){return;}
        if(flipped) {
            setCardAsset(imageName)
        }else {
            setCardAsset("card-back.png");
        }
    }, [flipped, imageName]);

    return(
        <img src={CardAsset} height={150} width={150} alt={"Bild von einer Karte"} onClick={()=>setFlipped(!flipped)}/>
    );
}