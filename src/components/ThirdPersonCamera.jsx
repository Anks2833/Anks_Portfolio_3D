import { useRef, useEffect, useState } from 'react';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';

const ThirdPersonCamera = ({ target }) => {
  const cameraRef = useRef();
  const [cameraPosition, setCameraPosition] = useState([0, 10, 18]);
  
  useEffect(() => {
    const updateCameraPosition = () => {
      if (target.current && cameraRef.current) {
        const targetPosition = target.current.position; // Get the character's position

        // Set the camera position behind the character (adjust these values for different distances/angles)
        const offset = new THREE.Vector3(0, 2, -5); // Offset position behind the character
        const newCameraPosition = targetPosition.clone().add(offset); // Add offset to character position

        setCameraPosition([newCameraPosition.x, newCameraPosition.y, newCameraPosition.z]);

        // Make the camera look at the character
        cameraRef.current.lookAt(targetPosition);
      }
    };

    // Update camera position every frame (approximately 60 FPS)
    const interval = setInterval(updateCameraPosition, 16);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={cameraPosition} // Use the calculated camera position
        fov={75}
      />
      <OrbitControls target={target.current ? target.current.position : [0, 0, 0]} />
    </>
  );
};

export default ThirdPersonCamera;
