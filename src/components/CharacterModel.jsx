import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const CharacterModel = () => {
    const actionRef = useRef();
    const { scene, animations, nodes } = useGLTF('../../Models/Man_Talking.glb');
    const { actions } = useAnimations(animations, scene);

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
        <primitive
            object={scene}
            scale={[1, 1, 1]}
            position={[0, -1.5, 2.2]}
            rotation={[0, 0, 0]}
        />
    );
};

export default CharacterModel;