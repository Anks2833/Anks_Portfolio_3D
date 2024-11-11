import { RigidBody } from '@react-three/rapier';

const CubeSurface = () => {
    return (
        <RigidBody type="fixed">
            <mesh>
                <boxGeometry args={[50, 1, 50]} />
                <meshStandardMaterial color="black" />
            </mesh>
        </RigidBody>
    );
};

export default CubeSurface;
