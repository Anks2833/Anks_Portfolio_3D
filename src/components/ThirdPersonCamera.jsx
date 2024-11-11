import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

const ThirdPersonCamera = ({ target }) => {
  const { camera, gl } = useThree();
  const [currentAngle, setCurrentAngle] = useState(Math.PI); // Initial horizontal angle in radians
  const [verticalAngle, setVerticalAngle] = useState(0); // Initial vertical angle
  const [distance, setDistance] = useState(15); // Default distance behind the character
  const [verticalOffset, setVerticalOffset] = useState(8); // Vertical offset for camera height
  const cameraRef = useRef(camera);

  // Handle mouse move for rotation
  const handleMouseMove = (e) => {
    const rotationSpeed = 0.008; // Adjust rotation speed as desired
    setCurrentAngle((prev) => prev - e.movementX * rotationSpeed);
    setVerticalAngle((prev) => Math.max(-Math.PI / 4, Math.min(Math.PI / 6, prev - e.movementY * rotationSpeed)));
  };

  // Request pointer lock
  const requestPointerLock = () => {
    if (document.pointerLockElement !== gl.domElement) {
      gl.domElement.requestPointerLock();
    }
  };

  // Handle pointer lock change
  const handlePointerLockChange = () => {
    if (document.pointerLockElement === gl.domElement) {
      gl.domElement.addEventListener('mousemove', handleMouseMove);
    } else {
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
      requestPointerLock(); // Re-request pointer lock if it is lost
    }
  };

  useEffect(() => {
    // Only need the first click to start pointer lock
    gl.domElement.addEventListener('click', requestPointerLock);

    // Set up pointer lock change listeners
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('pointerlockerror', requestPointerLock); // Retry if there’s a pointer lock error

    return () => {
      gl.domElement.removeEventListener('click', requestPointerLock);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('pointerlockerror', requestPointerLock);
    };
  }, []);

  useFrame(() => {
    if (target.current) {
      const targetPosition = new THREE.Vector3();
      target.current.getWorldPosition(targetPosition);

      // Add an offset to the Y position to look at the character's head
      const headOffset = 1.5; // Adjust this value based on your character's height
      targetPosition.y += headOffset;

      // Calculate desired camera position based on angle and height
      const desiredPosition = targetPosition.clone().add(
        new THREE.Vector3(
          distance * Math.sin(currentAngle) * Math.cos(verticalAngle), // X position
          verticalOffset + distance * Math.sin(verticalAngle), // Y position (vertical offset)
          distance * Math.cos(currentAngle) * Math.cos(verticalAngle) // Z position
        )
      );

      // Smooth camera follow with lerp
      cameraRef.current.position.lerp(desiredPosition, 0.1);
      cameraRef.current.lookAt(targetPosition);
    }
  });

  return null;
};

export default ThirdPersonCamera;
