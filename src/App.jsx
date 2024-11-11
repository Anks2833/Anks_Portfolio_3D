import { Canvas } from '@react-three/fiber';
import { useEffect, useState, useRef } from 'react';
import ThirdPersonCamera from './components/ThirdPersonCamera';
import CharacterModel from './components/CharacterModel';
import CharacterController from './components/CharacterController';
import { Physics } from '@react-three/rapier';
import CubeSurface from './components/CubeSurface';

const App = () => {
  const [bgColor, setBgColor] = useState('blue');
  const targetRef = useRef();

  return (
    <div className="w-full h-screen">
      <Canvas 
        style={{ background: "rgb(2 6 23)" }}
      >
        <Physics debug>
          <ambientLight intensity={1} />
          <directionalLight position={[0, 10, 0]} intensity={2} />
          <CharacterModel ref={targetRef} />
          <ThirdPersonCamera target={targetRef} />
          <CharacterController ref={targetRef} />
          <CubeSurface />
        </Physics>
      </Canvas>
    </div>
  );
};

export default App;