import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NODES_COUNT = 8;
const MAX_DISTANCE = 5;
// Pre-allocate max possible line pairs: n*(n-1)/2
const MAX_LINE_PAIRS = (NODES_COUNT * (NODES_COUNT - 1)) / 2;

function NetworkScene({ scrollContainerRef }) {
  const groupRef = useRef();
  const lineGeoRef = useRef();
  const sphereRefsRef = useRef([]);
  const targetPointer = useRef({ x: 0, y: 0 });
  const cameraShift = useRef({ x: 0, y: 0 });

  // Pre-allocate a Float32Array for line positions (avoid GC per frame)
  const linePositions = useMemo(
    () => new Float32Array(MAX_LINE_PAIRS * 2 * 3),
    []
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetPointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetPointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const nodes = useMemo(() => {
    return Array.from({ length: NODES_COUNT }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.006,
        (Math.random() - 0.5) * 0.006,
        (Math.random() - 0.5) * 0.006
      ),
      pulseSpeed: 0.5 + Math.random() * 1.5,
      baseScale: 0.06 + Math.random() * 0.08,
    }));
  }, []);

  const sphereMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00d9ff",
        emissive: "#00d9ff",
        emissiveIntensity: 2,
        toneMapped: false,
        transparent: true,
      }),
    []
  );

  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#00d9ff",
        transparent: true,
        opacity: 0.2,
        vertexColors: false,
      }),
    []
  );

  // Scroll-based fade + rotate animation
  useEffect(() => {
    if (!scrollContainerRef?.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      if (groupRef.current) {
        tl.to(groupRef.current.rotation, { y: Math.PI / 4, ease: "none" }, 0);
      }
      tl.to(sphereMaterial, { opacity: 0, ease: "none" }, 0);
      tl.to(lineMaterial, { opacity: 0, ease: "none" }, 0);
    });

    return () => ctx.revert();
  }, [scrollContainerRef, sphereMaterial, lineMaterial]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    // Smooth camera drift for mouse parallax (no camera re-parenting needed)
    const cam = state.camera;
    cameraShift.current.x = THREE.MathUtils.lerp(
      cameraShift.current.x,
      targetPointer.current.x * 0.8,
      0.05
    );
    cameraShift.current.y = THREE.MathUtils.lerp(
      cameraShift.current.y,
      targetPointer.current.y * 0.8,
      0.05
    );
    cam.position.x = cameraShift.current.x;
    cam.position.y = cameraShift.current.y;

    // Update node positions & sphere meshes
    for (let i = 0; i < NODES_COUNT; i++) {
      const node = nodes[i];
      node.position.add(node.velocity);

      // Bounce off bounds
      if (node.position.x > 8 || node.position.x < -8) node.velocity.x *= -1;
      if (node.position.y > 5 || node.position.y < -5) node.velocity.y *= -1;
      if (node.position.z > 3 || node.position.z < -3) node.velocity.z *= -1;

      const sphere = sphereRefsRef.current[i];
      if (sphere) {
        sphere.position.copy(node.position);
        const scale =
          node.baseScale + Math.sin(time * node.pulseSpeed) * 0.02;
        sphere.scale.setScalar(scale);
      }
    }

    // Update line geometry (reuse pre-allocated buffer)
    if (lineGeoRef.current) {
      let idx = 0;
      for (let i = 0; i < NODES_COUNT; i++) {
        for (let j = i + 1; j < NODES_COUNT; j++) {
          const dist = nodes[i].position.distanceTo(nodes[j].position);
          if (dist < MAX_DISTANCE) {
            linePositions[idx++] = nodes[i].position.x;
            linePositions[idx++] = nodes[i].position.y;
            linePositions[idx++] = nodes[i].position.z;
            linePositions[idx++] = nodes[j].position.x;
            linePositions[idx++] = nodes[j].position.y;
            linePositions[idx++] = nodes[j].position.z;
          }
        }
      }

      const attr = lineGeoRef.current.attributes.position;
      attr.array.set(linePositions);
      attr.needsUpdate = true;
      // Only draw connected pairs
      lineGeoRef.current.setDrawRange(0, idx / 3);
    }
  });

  return (
    <>
      <ambientLight intensity={1} />
      <group ref={groupRef}>
        {nodes.map((node, i) => (
          <mesh
            key={i}
            ref={(el) => (sphereRefsRef.current[i] = el)}
            position={node.position}
            material={sphereMaterial}
          >
            <sphereGeometry args={[1, 10, 10]} />
          </mesh>
        ))}
        <lineSegments material={lineMaterial}>
          <bufferGeometry ref={lineGeoRef}>
            <bufferAttribute
              attach="attributes-position"
              args={[linePositions, 3]}
            />
          </bufferGeometry>
        </lineSegments>
      </group>
    </>
  );
}

export default function NodeNetwork({ containerRef }) {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
      >
        <NetworkScene scrollContainerRef={containerRef} />
      </Canvas>
    </div>
  );
}
