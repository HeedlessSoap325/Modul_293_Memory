import {useEffect, useState} from "react";

export default function Players({gameActive, setGameActive, flag, dispatchFlag}){
    const [tempVars, setTempVars] = useState({
        playerName: "",
        playerNameErr: "",
        currentPlayer: "",
        currentPlayerIndex: 0
    });
    const [players, setPlayers] = useState({});

    function addPlayer(event){
        event.preventDefault();
        if(tempVars.playerName in players){
            setTempVars({
                ...tempVars,
                playerNameErr: "Dieser Spieler existiert bereits."
            });
            return;
        }

        if(gameActive){
            setTempVars({
                ...tempVars,
                playerNameErr: "Das Spiel muss beendet werden, um einen neuen Spieler hinzuzufügen."
            });
            return;
        }

        setPlayers({...players, [tempVars.playerName]: [0, 0]});
        setTempVars({
            ...tempVars,
            playerName: "",
            playerNameErr: ""
        });
    }

    function onClickNeuesSpiel(){
        if(Object.entries(players).length < 2){
            setTempVars({
                ...tempVars,
                playerNameErr: "Es gibt nicht genug Spieler, um das Spiel zu beginnen!"
            });
            return;
        }

        setTempVars({
            ...tempVars,
            currentPlayer: Object.entries(players).at(0)[0],
            currentPlayerIndex: 0
        });

        Object.entries(players).forEach((entry, _) =>{
            players[entry[0]][0] = 0; //entry[0] ist der name des Spielers
        });

        setGameActive(true);
    }

    function advancePlayer(){
        let newPlayerIndex = Object.entries(players).length - 1 > tempVars.currentPlayerIndex ? tempVars.currentPlayerIndex + 1 : 0;
        let newPlayer = Object.entries(players).at(newPlayerIndex)[0];

        setTempVars({
            ...tempVars,
            currentPlayer: newPlayer,
            currentPlayerIndex: newPlayerIndex
        })
    }

    function determineWinners(){
        let highestScore = -Infinity;
        let topPlayers = [];

        for (let player in players) {
            let score = players[player][0];

            if (score > highestScore) {
                highestScore = score;
                topPlayers = [player];
            } else if (score === highestScore) {
                topPlayers.push(player);
            }
        }

        for (let player of topPlayers) {
            players[player][1] += 1;
        }
    }

    useEffect(()=>{
        switch (flag) {
            case 0: //reset to Initial State Flag
                players[tempVars.currentPlayer][0] += 1;
                determineWinners();
                break;

            case 1: //two Cards are matching
                if(!gameActive){break;}
                players[tempVars.currentPlayer][0] += 1;
                break;

            case 2: //two Cards don't match
                if (!gameActive){break;}
                advancePlayer();
                break;

            default:
                break;
        }
    }, [flag]);

    return(
        <>
            <div className={"player-manage-area"}>
            <form onSubmit={(e) => addPlayer(e)}>
                <input
                    type={"text"}
                    maxLength={20}
                    placeholder={"Spieler Name"}
                    value={tempVars.playerName}
                    onChange={(e) =>
                        setTempVars({
                            ...tempVars,
                            playerName: e.target.value
                        })
                    }
                />
                <input
                    type={"submit"}
                    value={"Spieler hinzufügen"}
                />
                <p>{tempVars.playerNameErr}</p>
            </form>
                <input type={"button"} value={"Spiel Starten"} onClick={onClickNeuesSpiel}/>
            </div>
            <div className={"player-display-area"}>
                {Object.entries(players).map(([key, value]) => (
                    <div
                        className={
                            `player 
                            ${tempVars.currentPlayer ===  key ?  
                                "active" : 
                                "inactive"
                            }`
                        }
                        key={key}>
                        <p>Name: {key} Aktuelle Punktzahl: {value[0]} Gewonnene Spiele: {value[1]}</p>
                    </div>
                ))
                }
            </div>
        </>
    );
}