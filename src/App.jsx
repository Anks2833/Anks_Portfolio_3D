import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon'; // Import Physics
import { useEffect, useState, useRef } from 'react';
import BackgroundColor from './components/BackgroundColor';
import CharacterModel from './components/CharacterModel';
import JungleModel from './components/JungleModel';
import ThirdPersonCamera from './components/ThirdPersonCamera';

const App = () => {
  const [bgColor, setBgColor] = useState('blue');
  const characterRef = useRef();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      setBgColor('#48c3e7'); // Morning
    } else if (hour >= 12 && hour < 18) {
      setBgColor('#454B56'); // Afternoon
    } else {
      setBgColor('#131862'); // Night
    }
  }, []);

  return (
    <div className="w-full h-screen">
      <Canvas style={{ background: bgColor }}>
        <Physics>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <CharacterModel ref={characterRef} />
          <JungleModel />
          <BackgroundColor color={bgColor} />
          {/* GTA-style Camera */}
          <ThirdPersonCamera target={characterRef} />
        </Physics>
      </Canvas>
    </div>
  );
};

export default App;