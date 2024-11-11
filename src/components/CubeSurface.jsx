import React from 'react';
import { Canvas } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';

const CubeSurface = () => {
    return (
        <RigidBody type="fixed"> {/* Set type to 'static' */}
            <mesh>
                <boxGeometry args={[50, 1, 50]} />
                <meshStandardMaterial color="black" />
            </mesh>
        </RigidBody>
    );
};

export default CubeSurface;
