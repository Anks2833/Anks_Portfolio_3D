import React, { forwardRef, useEffect, useRef } from "react";
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const CharacterModel = forwardRef((props, ref) => {
    const actionRef = useRef();
    const { scene, animations } = useGLTF('../../Models/Bot.glb');
    const { actions } = useAnimations(animations, scene);

        // Log all animation names
        useEffect(() => {
            if (animations) {
                animations.forEach((clip) => {
                    console.log("Animation name:", clip.name);
                });
            }
        }, [animations]);

    // Play the animation
    useEffect(() => {
        if (actions && actions['Idle']) {
            actionRef.current = actions['Idle'];
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
                position={[17, -5, 2.2]}
                rotation={[0, 160.2, 0]}
            />
        </>
    );
});

export default CharacterModel;