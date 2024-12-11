import React, {useState, useEffect}  from 'react';
import {ethers} from "ethers";
import axios from 'axios';

export const CONTEXT = React.createContext();

export const PROVIDER = ({children})=>{
    const TRADING_BOT = "Trading Bot";
    const LOAD_INITIAL_DATA = async()=>{
        try{

        }catch(error){
            console.log(error)
        }
    }

    const BuyTokens = async()=>{
        try{

        }catch(error){
            console.log(error)
        }
    }

    const SellTokens = async()=>{
        try{

        }catch(error){
            console.log(error)
        }
    }

    const Trading = async()=>{
        try{

        }catch(error){
            console.log(error)
        }
    }

    return (
        <CONTEXT.Provider value={{TRADING_BOT, Trading}}>{children}</CONTEXT.Provider>
    )
}