import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

const ThirdPersonCamera = ({ target }) => {
  const { camera, gl } = useThree();
  const [currentAngle, setCurrentAngle] = useState(180); // Initial camera angle
  const [distance, setDistance] = useState(10); // Default distance behind the character
  const [verticalOffset, setVerticalOffset] = useState(7); // Vertical offset for camera height
  const cameraRef = useRef(camera);

  // Handle mouse move for rotation
  const handleMouseMove = (e) => {
    const rotationSpeed = 0.02; // Adjust rotation speed as desired
    setCurrentAngle(currentAngle - e.movementX * rotationSpeed);
  };

  // Handle keyboard input for vertical movement
  const handleKeyDown = (e) => {
    const verticalSpeed = 0.1; // Adjust vertical speed as desired
    if (e.key === 'ArrowUp') {
      setVerticalOffset((prev) => prev + verticalSpeed); // Move up
    } else if (e.key === 'ArrowDown') {
      setVerticalOffset((prev) => prev - verticalSpeed); // Move down
    }
  };

  // Attach event listeners
  useEffect(() => {
    gl.domElement.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentAngle]);

  useFrame(() => {
    if (target.current) {
      const targetPosition = new THREE.Vector3();
      target.current.getWorldPosition(targetPosition);

      // Calculate desired camera position based on angle and height
      const desiredPosition = targetPosition.clone().add(
        new THREE.Vector3(
          distance * Math.sin(currentAngle), // X position
          2 + verticalOffset, // Y position (2 units above the character's head + vertical offset)
          distance * Math.cos(currentAngle) // Z position
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