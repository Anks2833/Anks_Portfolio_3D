import { useEffect, useRef, useState } from 'react';
import { CapsuleCollider, RigidBody } from '@react-three/rapier';
import CharacterModel from './CharacterModel';

const CharacterController = () => {
    const characterRef = useRef();
    const speed = 5;

    const [moving, setMoving] = useState({ up: false, down: false, left: false, right: false });

    const handleKeyDown = (event) => {
        const { key } = event;
        setMoving((prev) => {
            const newState = { ...prev };
            switch (key) {
                case 'ArrowUp':
                case 'w':
                    newState.up = true;
                    break;
                case 'ArrowDown':
                case 's':
                    newState.down = true;
                    break;
                case 'ArrowLeft':
                case 'a':
                    newState.left = true;
                    break;
                case 'ArrowRight':
                case 'd':
                    newState.right = true;
                    break;
                default:
                    break;
            }
            return newState;
        });
    };

    const handleKeyUp = (event) => {
        const { key } = event;
        setMoving((prev) => {
            const newState = { ...prev };
            switch (key) {
                case 'ArrowUp':
                case 'w':
                    newState.up = false;
                    break;
                case 'ArrowDown':
                case 's':
                    newState.down = false;
                    break;
                case 'ArrowLeft':
                case 'a':
                    newState.left = false;
                    break;
                case 'ArrowRight':
                case 'd':
                    newState.right = false;
                    break;
                default:
                    break;
            }
            return newState;
        });
    };

    // Update the character velocity based on the movement state
    useEffect(() => {
        const body = characterRef.current;
        if (body) {
            const velocity = body.linvel();
            let newVelocity = { x: 0, y: velocity.y, z: 0 };

            if (moving.up) {
                newVelocity.z = -speed;
            }
            if (moving.down) {
                newVelocity.z = speed;
            }
            if (moving.left) {
                newVelocity.x = -speed;
            }
            if (moving.right) {
                newVelocity.x = speed;
            }

            body.setLinvel(newVelocity);

            // Wake up the body to ensure it remains active
            body.wakeUp?.();
        }
    }, [moving]);

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
        <RigidBody ref={characterRef} colliders={false} position={[0, 1, 0]} gravityScale={0}>
            <CapsuleCollider args={[3, 2]} position={[0, 0, 0]} />
            <CharacterModel />
        </RigidBody>
    );
};

export default CharacterController;