import { RigidBody } from '@react-three/rapier';

const CubeSurface = () => {
    return (
        <RigidBody type="fixed">
            <mesh>
                <boxGeometry args={[1500, 1, 1500]} />
                <meshStandardMaterial color="black" />
            </mesh>
        </RigidBody>
    );
};

export default CubeSurface;
