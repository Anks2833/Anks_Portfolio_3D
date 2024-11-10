import { forwardRef, useEffect, useRef } from "react";
import { useGLTF, useAnimations } from '@react-three/drei';
import { useBox } from '@react-three/cannon'; // Import useBox for box collider
import * as THREE from 'three';

const CharacterModel = forwardRef((props, ref) => {
    const actionRef = useRef();
    const { scene, animations } = useGLTF('../../Models/Man_Talking.glb');
    const { actions } = useAnimations(animations, scene);

    // Create a collider box around the character
    const [refCollider] = useBox(() => ({
        mass: 1,
        position: [0, 0, 0], // Adjust based on character's position
        args: [1, 2, 1], // Width, height, depth of the box
        onCollide: (e) => console.log('Collision with:', e.body)
    }));

    // Log animation names
    useEffect(() => {
        if (animations) {
            animations.forEach((animation, index) => {
                console.log(`Animation ${index}: ${animation.name}`);
            });
        }
    }, [animations]);

    // Play the animation
    useEffect(() => {
        if (actions && actions['Armature|mixamo.com|Layer0.001']) {
            actionRef.current = actions['Armature|mixamo.com|Layer0.001'];
            actionRef.current.setLoop(THREE.LoopRepeat, Infinity);
            actionRef.current.play();
        }
    }, [actions]);

    return (
        <>
            <primitive
                ref={ref}
                object={scene}
                scale={[5, 5, 5]}
                position={[10, 0, 0]}
                rotation={[0, 0, 0]}
            />
            <mesh ref={refCollider} />
        </>
    );
});

export default CharacterModel;