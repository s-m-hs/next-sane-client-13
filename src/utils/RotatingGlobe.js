// "use client";

// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Sphere, useTexture } from "@react-three/drei";
// import { Suspense } from "react";

// function Earth() {
// //   const earthTexture = useTexture("/free-blank-map-asia_53876-147535.jpg"); // تصویر در public
//   const earthTexture = useTexture("images/photo_2024-05-30_19-08-242.jpg"); // تصویر در public

//   return (
//     <Sphere args={[0.5, 64, 64]} rotation={[0, 0, 0]}>
//         {/* <meshBasicMaterial map={earthTexture} /> */}
//       <meshStandardMaterial map={earthTexture} />
//     </Sphere>
//   );
// }

// export default function RotatingGlobe() {
//   return (
//     <Canvas camera={{ position: [0, 0, 5], fov: 50 }} className={`${style.rotate}`}>
//       <Suspense fallback={null}>
//         {/* نورپردازی */}
//         <ambientLight intensity={1.2} />
//         <directionalLight position={[1, 0, 5]} intensity={1.2}  
//         // color={'red'}
//         />

//         {/* کره‌ی زمین */}
//         <Earth />

//         {/* کنترل چرخش با ماوس */}
//         <OrbitControls autoRotate autoRotateSpeed={3} enableZoom={false}  enablePan={false} />
//       </Suspense>
//     </Canvas>
//   );
// }
