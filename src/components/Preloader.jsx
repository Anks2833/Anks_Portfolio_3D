// components/Preloader.jsx
import { Html, useProgress } from '@react-three/drei';

const Preloader = () => {
  const { progress } = useProgress();

  return (
    <Html center style={{ zIndex: 100 }}>
      <div style={{
        color: 'white',
        fontSize: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '10px 20px',
        borderRadius: '8px',
      }}>
        Loading... {Math.floor(progress)}%
      </div>
    </Html>
  );
};

export default Preloader;