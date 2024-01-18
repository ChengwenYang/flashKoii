import React, { useEffect, useState } from 'react';
import { Howl } from 'howler';
import axios from 'axios';
import './App.css';

function App() {
  const [nodeCount, setNodeCount] = useState(0);
  const [showEffect, setShowEffect] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const api = 'https://faucet-api.koii.network/api/leaderboard/get-nodes-summary';

  useEffect(() => {
    let fetchNode = nodeCount;

    const checkNewNode = async () => {
      try {
        const response = await axios.get(api);
        const data = response.data;
        const totalNodes = data.totalNumberOfActiveStakingKeys;

        if (fetchNode !== 0 && totalNodes > fetchNode) {
          setShowEffect(true);
          playSound();
          setTimeout(() => setShowEffect(false), 5000); 
        }

        setNodeCount(totalNodes);
        fetchNode = totalNodes;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const interval = setInterval(checkNewNode, 6000);
    return () => clearInterval(interval);
  }, [nodeCount]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []); 

  const playSound = () => {
    const sound = new Howl({
      src: ['/sound.mp3'] 
    });
    sound.play();
  };
  
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  function CelebrationEffect() {
    return (
      <div className="celebration">
        <div className="ribbon"></div>
        <div className="ribbon"></div>
        <div className="ribbon"></div>
        <div className="ribbon"></div>
        <div className="ribbon"></div>
        <div className="ribbon"></div>
        <div className="ribbon"></div>
        <div className="ribbon"></div>
        <div className="ribbon"></div>
        <div className="ribbon"></div>

      </div>
    );
  }

  return (
    <div className="App">
      {!isFullScreen && (
        <button onClick={toggleFullScreen} className="fullscreen-button">
          Go Full Screen
        </button>
      )}
      <div className="node-counter">Nodes: {nodeCount}</div>
      {showEffect && <CelebrationEffect />}
    </div>
  );
}
export default App;