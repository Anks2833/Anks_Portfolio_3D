import { forwardRef, useEffect, useRef } from "react";
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const CharacterModel = forwardRef((props, ref) => {
    const actionRef = useRef();
    const { scene, animations } = useGLTF('../../Models/Bot_Yelling.glb');
    const { actions } = useAnimations(animations, scene);

    // Log animation names
    // useEffect(() => {
    //     if (animations) {
    //         animations.forEach((animation, index) => {
    //             console.log(Animation ${index}: ${animation.name});
    //         });
    //     }
    // }, [animations]);

    // Play the animation
    useEffect(() => {
        if (actions && actions['Armature|mixamo.com|Layer0']) {
            actionRef.current = actions['Armature|mixamo.com|Layer0'];
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
                position={[0, 1, 0]}
                rotation={[0, 0, 0]}
            />
        </>
    );
});

export default CharacterModel;