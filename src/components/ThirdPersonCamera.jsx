import { useRef, useEffect, useState } from 'react';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';

const ThirdPersonCamera = ({ target }) => {
  const cameraRef = useRef();
  const [cameraPosition, setCameraPosition] = useState([0, 12, 15]);
  

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={cameraPosition}
        fov={75}
      />
      <OrbitControls target={target.current ? target.current.position : [0, 0, 0]} />
    </>
  );
};

export default ThirdPersonCamera;
