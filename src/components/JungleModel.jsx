import { useGLTF } from '@react-three/drei';
import { useBox } from '@react-three/cannon'; // Import useBox for box collider

const JungleModel = () => {
    const { scene } = useGLTF('../../Models/TechJungle.glb');

    // Create a collider box around the jungle
    const [refCollider] = useBox(() => ({
        mass: 0, // Static object
        position: [0, 0, 0], // Adjust based on jungle's position
        args: [1, 1, 1], // Width, height, depth of the box
        onCollide: (e) => console.log('Collision with:', e.body)
    }));

    return (
        <>
            <primitive
                object={scene}
                scale={[1, 1, 1]}
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
            />
            <mesh ref={refCollider} />
        </>
    );
};

export default JungleModel;