import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

const ThirdPersonCamera = ({ target }) => {
  const { camera, gl } = useThree();
  const [currentAngle, setCurrentAngle] = useState(Math.PI); // Initial horizontal angle in radians
  const [verticalAngle, setVerticalAngle] = useState(0); // Initial vertical angle
  const [distance, setDistance] = useState(16); // Default distance behind the character
  const [verticalOffset, setVerticalOffset] = useState(12); // Vertical offset for camera height
  const cameraRef = useRef(camera);

  // Handle mouse move for rotation
  const handleMouseMove = (e) => {
    const rotationSpeed = 0.008; // Adjust rotation speed as desired
    setCurrentAngle((prev) => prev - e.movementX * rotationSpeed);
    setVerticalAngle((prev) => Math.max(-Math.PI / 4, Math.min(Math.PI / 6, prev - e.movementY * rotationSpeed)));
  };

    // Request pointer lock on canvas click
    const handleCanvasClick = () => {
      gl.domElement.requestPointerLock();
    };
  
    // Handle pointer lock change
    const handlePointerLockChange = () => {
      if (document.pointerLockElement === gl.domElement) {
        gl.domElement.addEventListener('mousemove', handleMouseMove);
      } else {
        gl.domElement.removeEventListener('mousemove', handleMouseMove);
      }
    };

  // Attach event listeners
  useEffect(() => {
    gl.domElement.addEventListener('mousemove', handleMouseMove);

    return () => {
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame(() => {
    if (target.current) {
      const targetPosition = new THREE.Vector3();
      target.current.getWorldPosition(targetPosition);

      // Calculate desired camera position based on angle and height
      const desiredPosition = new THREE.Vector3(
        targetPosition.x + distance * Math.sin(currentAngle) * Math.cos(verticalAngle),
        targetPosition.y + verticalOffset + distance * Math.sin(verticalAngle),
        targetPosition.z + distance * Math.cos(currentAngle) * Math.cos(verticalAngle)
      );

      // Smooth camera follow with lerp
      cameraRef.current.position.lerp(desiredPosition, 0.1);
      cameraRef.current.lookAt(targetPosition);
    }
  });

  return null;
};

export default ThirdPersonCamera;