import { useRef } from 'react';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';

const ThirdPersonCamera = ({ target }) => {
  const cameraRef = useRef();

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 10, 20]}
        fov={75}
        rotation={[0, 0, 0]}
      />
      <OrbitControls target={target.current ? target.current.position : [0, 0, 0]} />
    </>
  );
};

export default ThirdPersonCamera;