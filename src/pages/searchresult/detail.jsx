import{getPlayers} from "src\service\fetcher.js";
import {useEffect, useState}from 'react'
import { useParams } from "react-router-dom";
import { data } from "autoprefixer";
import { useParams } from "react-router-dom";

export default function detail() {

    const {id} = useParams();
    const [player, setPlayer] = useState({});

    useEffect(() => {
        getPlayers().then((data) => {
            setPlayer(data.data.player.find(player) =>
            player.id === parseInt(id))
        })
    },[id])


  return (
    
  )
}
