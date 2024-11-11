import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { useEffect, useState, useRef } from 'react';
import { SpotLight } from '@react-three/drei';
import BackgroundColor from './components/BackgroundColor';
import CharacterModel from './components/CharacterModel';
import JungleModel from './components/JungleModel';
import ThirdPersonCamera from './components/ThirdPersonCamera';
import Preloader from './components/Preloader';

const App = () => {
  const [bgColor, setBgColor] = useState('blue');
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // State to track loading status
  const characterRef = useRef();

  // Handle background color based on the time of day
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

  // Function to handle pointer lock state change
  const handlePointerLockChange = () => {
    // Update the state based on whether the pointer is locked or not
    setIsPointerLocked(document.pointerLockElement !== null);
  };

  useEffect(() => {
    // Add event listener to track pointer lock changes
    document.addEventListener('pointerlockchange', handlePointerLockChange);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
    };
  }, []);

  return (
    <div className="w-full h-screen" onClick={() => setIsPointerLocked(true)}>
      {/* Show "Click to activate camera" message when pointer is not locked */}
      {!isPointerLocked && (
        <div style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '24px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '10px 20px',
          borderRadius: '8px',
          zIndex: 10,
        }}>
          Click Anywhere to activate camera
        </div>
      )}

      {/* Show Canvas only after loading is complete */}
      <Canvas style={{ background: bgColor }} shadows>
        <Physics gravity={[0, -9.81, 0]}>
          {/* Lighting Setup */}
          <ambientLight intensity={0.4} />
          <hemisphereLight skyColor={"#ffffff"} groundColor={"#b2b2b2"} intensity={0.7} />
          <directionalLight
            position={[10, 20, 10]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <pointLight position={[-10, 10, -10]} intensity={0.5} />
          <SpotLight position={[15, 20, 5]} angle={0.3} penumbra={1} intensity={1} castShadow />
          
          {/* useProgress hook inside Canvas */}
          <Preloader /> {/* This can be used to show a loading screen based on progress */}

          <CharacterModel ref={characterRef} />
          <JungleModel />
          <BackgroundColor color={bgColor} />
          <ThirdPersonCamera target={characterRef} onPointerLockChange={handlePointerLockChange} />
        </Physics>
      </Canvas>
    </div>
  );
};

export default App;