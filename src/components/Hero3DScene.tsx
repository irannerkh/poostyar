import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  Float,
  MeshTransmissionMaterial,
  OrbitControls,
  RoundedBox,
  Sparkles,
} from '@react-three/drei';
import * as THREE from 'three';

const SkincareStage: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.35) * 0.14;
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.06;
  });

  return (
    <group ref={groupRef} position={[0, -0.35, 0]}>
      {/* گوی شیشه‌ای بزرگ پس‌زمینه */}
      <mesh position={[0.1, 0.95, -1.1]}>
        <sphereGeometry args={[1.65, 48, 48]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.4}
          chromaticAberration={0.04}
          transmission={0.92}
          roughness={0.08}
          color="#fce8ef"
        />
      </mesh>

      {/* پدیستال‌های استوانه‌ای صورتی-مرمری */}
      <mesh position={[0, -0.75, 0.25]} receiveShadow castShadow>
        <cylinderGeometry args={[1.05, 1.1, 0.85, 48]} />
        <meshStandardMaterial color="#f5d5df" roughness={0.55} metalness={0.05} />
      </mesh>

      <mesh position={[-1.25, -0.88, -0.15]} receiveShadow castShadow>
        <cylinderGeometry args={[0.78, 0.82, 0.6, 48]} />
        <meshStandardMaterial color="#f8e3e9" roughness={0.6} />
      </mesh>

      <mesh position={[1.22, -0.82, -0.25]} receiveShadow castShadow>
        <cylinderGeometry args={[0.85, 0.9, 0.72, 48]} />
        <meshStandardMaterial color="#efd2dc" roughness={0.55} />
      </mesh>

      {/* بطری سرم شیشه‌ای صورتی با قطره چکان طلایی (چپ) */}
      <Float speed={2} rotationIntensity={0.08} floatIntensity={0.2}>
        <group position={[-1.22, 0.28, -0.05]}>
          {/* بدنه شیشه‌ای */}
          <mesh castShadow>
            <cylinderGeometry args={[0.42, 0.44, 1.35, 36]} />
            <MeshTransmissionMaterial
              transmission={0.88}
              thickness={0.5}
              roughness={0.06}
              color="#f3a8bc"
            />
          </mesh>
          {/* مایع داخلی */}
          <mesh position={[0, -0.08, 0]}>
            <cylinderGeometry args={[0.35, 0.37, 1.05, 32]} />
            <meshStandardMaterial color="#e87ea1" roughness={0.2} />
          </mesh>
          {/* طوق طلایی */}
          <mesh position={[0, 0.78, 0]}>
            <cylinderGeometry args={[0.25, 0.28, 0.22, 32]} />
            <meshStandardMaterial color="#d9a85b" metalness={0.85} roughness={0.2} />
          </mesh>
          {/* سری قطره چکان */}
          <mesh position={[0, 1.05, 0]}>
            <cylinderGeometry args={[0.14, 0.18, 0.36, 24]} />
            <meshStandardMaterial color="#f7dce4" roughness={0.35} />
          </mesh>
        </group>
      </Float>

      {/* جار کرم آبرسان لوکس با درب طلایی (مرکز) */}
      <Float speed={1.6} rotationIntensity={0.05} floatIntensity={0.14}>
        <group position={[0, 0.12, 0.35]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.68, 0.65, 0.85, 48]} />
            <meshPhysicalMaterial
              color="#fadbe4"
              roughness={0.12}
              clearcoat={1}
              clearcoatRoughness={0.08}
            />
          </mesh>
          {/* رینگ طلایی */}
          <mesh position={[0, 0.47, 0]}>
            <cylinderGeometry args={[0.69, 0.69, 0.14, 48]} />
            <meshStandardMaterial color="#d8a556" metalness={0.88} roughness={0.18} />
          </mesh>
          {/* بافت خامه‌ای کرم */}
          <mesh position={[0, 0.62, 0]}>
            <coneGeometry args={[0.52, 0.38, 36]} />
            <meshStandardMaterial color="#fff9f7" roughness={0.35} />
          </mesh>
        </group>
      </Float>

      {/* تیوب ضدآفتاب لوکس (راست) */}
      <Float speed={1.8} rotationIntensity={0.07} floatIntensity={0.18}>
        <group position={[1.18, 0.48, -0.15]} rotation={[0, -0.25, 0.08]}>
          <RoundedBox args={[0.78, 1.55, 0.42]} radius={0.14} smoothness={6} castShadow>
            <meshStandardMaterial color="#fffaf6" roughness={0.28} />
          </RoundedBox>
          {/* درب پایین تیوب */}
          <mesh position={[0, -0.92, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 0.3, 28]} />
            <meshStandardMaterial color="#f4ece6" roughness={0.3} />
          </mesh>
          {/* نوار طلایی */}
          <mesh position={[0, 0.35, 0.215]}>
            <circleGeometry args={[0.18, 32]} />
            <meshStandardMaterial color="#f39c12" emissive="#f39c12" emissiveIntensity={0.25} />
          </mesh>
        </group>
      </Float>

      {/* قطرات آب شناور اطراف محصولات */}
      {[
        [-1.95, 0.65, 0.35, 0.14],
        [-1.75, 1.35, -0.2, 0.09],
        [1.9, 1.15, 0.2, 0.15],
        [1.75, 0.15, 0.55, 0.11],
        [-0.65, 1.55, 0.2, 0.1],
        [0.65, 1.68, -0.1, 0.12],
      ].map(([x, y, z, r], idx) => (
        <Float key={idx} speed={2.5 + idx * 0.3} floatIntensity={0.45}>
          <mesh position={[x, y, z]}>
            <sphereGeometry args={[r, 24, 24]} />
            <MeshTransmissionMaterial
              transmission={0.95}
              thickness={0.3}
              roughness={0.02}
              ior={1.33}
              color="#ffffff"
            />
          </mesh>
        </Float>
      ))}

      {/* ذرات درخشان طلایی و مرواریدی */}
      <Sparkles count={45} scale={[4.8, 3.2, 2.5]} size={2.2} speed={0.35} color="#f5d08a" />
    </group>
  );
};

export const Hero3DScene: React.FC = () => {
  return (
    <div className="relative h-[380px] w-full sm:h-[440px] lg:h-[500px]">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.45, 5.2], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} color="#fff5f8" />
        <directionalLight
          position={[4, 6, 5]}
          intensity={1.6}
          color="#fff1e6"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-4, 3, 2]} intensity={1.1} color="#f8bbd0" />
        <pointLight position={[3, -1, 3]} intensity={0.7} color="#ffe0b2" />
        <Environment preset="studio" />
        <SkincareStage />
        <ContactShadows position={[0, -1.2, 0]} opacity={0.28} scale={8} blur={2.4} far={3} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.85}
          minAzimuthAngle={-0.45}
          maxAzimuthAngle={0.45}
        />
      </Canvas>
      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/75 px-3.5 py-1 text-[11px] font-medium text-[#6D1344] shadow-sm backdrop-blur">
        برای چرخش سه‌بعدی محصولات، بکشید ✦
      </div>
    </div>
  );
};
