require('dotenv').config()

import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';

// Constants
const TWITTER_HANDLE = process.env.TWITTER_HANDLE;
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);

  // Actions

  /*
  Define function to check if Phantom wallet is connected
  */
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');

          /*
          The solana object gives us a functio that will allow us to connect
          directly with the user's wallet
          */
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );
          /*
          Store the user's public key in state
          */
          setWalletAddress(response.publicKey.toString());
        } 
      } else {
        alert('Phantom object not found! Get a Phantom wallet 👻')
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*

  */
  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log(
        'Connected with Public Key:',
        response.publicKey.toString()
      );
      setWalletAddress(response.publicKey.toString());
    }
  };

  /*
  We want to render this UI when the user hasn't
  connected their wallet to our app yet
  */
  const renderNotConnectedContainer = () => {
    return <button
      className='cta-button connect-wallet-button'
      onClick={connectWallet}
    >
      Connect to 👻 Wallet
    </button>
  };

  /*
  When our component first mounts, let's check if Phantom wallet is connected
  */
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    }
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, [])

  
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {/* Render your connect to wallet button right here */}
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
