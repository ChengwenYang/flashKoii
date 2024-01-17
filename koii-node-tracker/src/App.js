import React, { useEffect, useState } from 'react';
import { Howl } from 'howler';
import { Spin } from 'react-cssfx-loading';
import './App.css';
 // 确保正确导入 Spin 组件

function App() {
  const [isNewNode, setIsNewNode] = useState(false);
  const [nodeCount, setNodeCount] = useState(0); // 定义 nodeCount 状态
  const [showEffect, setShowEffect] = useState(false); // 定义 showEffect 状态

  useEffect(() => {
    const checkNewNode = () => {
      const interval = setInterval(() => {
        const newNodeDetected =null; // 随机示例
        if (newNodeDetected) {
          setIsNewNode(true);
          setNodeCount(prevCount => prevCount + 1); // 更新节点计数
          setShowEffect(true); // 显示特效
          playSound();

          setTimeout(() => setShowEffect(false), 3000); // 3秒后隐藏特效
        }
      }, 5000);
      return () => clearInterval(interval); // 清除定时器
    };

    checkNewNode();
  }, []);

  const playSound = () => {
    const sound = new Howl({
      src: ['sound.mp3'] // 替换为您的音效文件路径
    });
    sound.play();
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
      <h1>Koii Node Tracker</h1>
      <div className="node-counter">Nodes: {nodeCount}</div>
      {showEffect && <CelebrationEffect />}


    </div>
  );
}

export default App;
