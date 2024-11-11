import { useGLTF } from '@react-three/drei';
import { useBox } from '@react-three/cannon';

const JungleModel = () => {
    const { scene } = useGLTF('../../Models/TechJungle.glb');

    return (
        <>
            <primitive
                object={scene}
                scale={[1, 1, 1]}
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
            />
        </>
    );
};

export default JungleModel;