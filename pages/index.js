import React, {useState, useEffect, useContext}  from 'react';
import {ethers} from "ethers";
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Header, Footer, Loader, Login, MovingSubmenu, Search, Preloader, SideBar, Signup, useTimeout, Home, TradeTokens, TopExchangeTokens, Networks, AddNetwork, Price, Profile, Setting, AddTokenPair, Trading
} from '../components/index'
import { CONTEXT } from '../context/context';
// import { signUp } from '../Api/Controllers/authController';

const index = () => {
  const {TRADING_BOT} = useContext(CONTEXT);
  let [activeComponent, setActiveComponent] = useState("home");
  const [membershipType, setMemebershipType] = useState("Premium");
  const [authBackendId, setAuthBackendId] = useState("");
  const [networks, setNetworks] = useState({});
  const [networkName, setNetworkName] = useState();

  const notifyError = (msg)=>{
    toast.error(msg, {duration: 2000});
  };

  const notifySuccess = (msg)=>{
    toast.success(msg, {duration: 2000});
  };

  return <div>
    <MovingSubmenu />
    <Preloader />
    {
      activeComponent = "Signup" ? (
        <Signup axios={axios} setActiveComponent={setActiveComponent} notifyError={notifyError} notifySuccess={notifySuccess} />
      ):("")
    }
  </div>;
};

export default index;
