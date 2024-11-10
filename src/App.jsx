import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useState } from 'react';
import BackgroundColor from './components/BackgroundColor';
import CharacterModel from './components/CharacterModel';

const App = () => {
  const [bgColor, setBgColor] = useState('blue');

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
    <div className='w-full h-screen'>
      <Canvas style={{ background: bgColor }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <CharacterModel />
        <BackgroundColor color={bgColor} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default App;