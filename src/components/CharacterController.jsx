import { useEffect, useRef, useState } from 'react';
import { CapsuleCollider, RigidBody } from '@react-three/rapier';
import CharacterModel from './CharacterModel';

const CharacterController = () => {
    const characterRef = useRef();
    const speed = 5; // Movement speed
    const jumpForce = 10; // Jump force
  
    const [moving, setMoving] = useState({ up: false, down: false, left: false, right: false });
  
    // Handle keyboard input for movement
    const handleKeyDown = (event) => {
      const { key } = event;
      const body = characterRef.current;
  
      if (body) {
        const velocity = body.linvel();
  
        switch (key) {
          case 'ArrowUp':
          case 'w':
            setMoving((prev) => ({ ...prev, up: true }));
            break;
          case 'ArrowDown':
          case 's':
            setMoving((prev) => ({ ...prev, down: true }));
            break;
          case 'ArrowLeft':
          case 'a':
            setMoving((prev) => ({ ...prev, left: true }));
            break;
          case 'ArrowRight':
          case 'd':
            setMoving((prev) => ({ ...prev, right: true }));
            break;
          case ' ':
            body.applyImpulse({ x: 0, y: jumpForce, z: 0 });
            break;
          default:
            break;
        }
      }
    };
  
    const handleKeyUp = (event) => {
      const { key } = event;
      const body = characterRef.current;
  
      if (body) {
        const velocity = body.linvel();
  
        switch (key) {
          case 'ArrowUp':
          case 'w':
            setMoving((prev) => ({ ...prev, up: false }));
            break;
          case 'ArrowDown':
          case 's':
            setMoving((prev) => ({ ...prev, down: false }));
            break;
          case 'ArrowLeft':
          case 'a':
            setMoving((prev) => ({ ...prev, left: false }));
            break;
          case 'ArrowRight':
          case 'd':
            setMoving((prev) => ({ ...prev, right: false }));
            break;
          default:
            break;
        }
      }
    };
  
  // Update the character velocity based on the movement state
  useEffect(() => {
      const body = characterRef.current;
      if (body) {
        const velocity = body.linvel();
        let newVelocity = { x: 0, y: velocity.y, z: 0 }; // Start with x and z velocities set to 0
    
        if (moving.up) {
          newVelocity.z = -speed; // Moves forward
        } else if (moving.down) {
          newVelocity.z = speed; // Moves backward
        }
    
        if (moving.left) {
          newVelocity.x = -speed; // Moves left
        } else if (moving.right) {
          newVelocity.x = speed; // Moves right
        }
    
        // Set the new velocity only if it has changed
        body.setLinvel(newVelocity);
      }
    }, [moving]); // Dependency on moving state, this will run whenever moving changes
    
  
    // Attach event listeners
    useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
  
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }, []);
  
    return (
      <RigidBody ref={characterRef} colliders="capsule" position={[0, 1, 0]} gravityScale={0}>
        <CapsuleCollider args={[4, 1]} position={[0, 0, 0]} />
        <CharacterModel />
      </RigidBody>
    );
  };
  
  export default CharacterController;