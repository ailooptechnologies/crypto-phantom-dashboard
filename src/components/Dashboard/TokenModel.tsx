
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface TokenModelProps {
  color: string;
  wireframe?: boolean;
  position?: [number, number, number];
  scale?: number;
}

const TokenMesh = ({ color, wireframe = false, scale = 1 }: TokenModelProps) => {
  const mesh = useRef<THREE.Mesh>(null);

  // Animation - rotate the mesh
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.2;
      mesh.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={mesh} scale={scale}>
      <icosahedronGeometry args={[1, 3]} />
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.3} // Strength of the distortions
        speed={2} // Speed of the distortions
        roughness={0.2}
        metalness={0.8}
        wireframe={wireframe}
      />
    </mesh>
  );
};

const TokenModel = ({ color = "#3387FF", wireframe = false, position = [0, 0, 0], scale = 1 }: TokenModelProps) => {
  return (
    <div className="w-full h-72 overflow-hidden rounded-lg border border-border/30">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8e44ad" />
        <TokenMesh color={color} wireframe={wireframe} scale={scale} />
      </Canvas>
    </div>
  );
};

export default TokenModel;
