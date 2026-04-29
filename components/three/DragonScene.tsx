"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props { className?: string; }

export default function DragonScene({ className }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{ cleanup: () => void } | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const el = mountRef.current;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(75, el.clientWidth / el.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Ambient + directional light
    scene.add(new THREE.AmbientLight(0xffeedd, 0.6));
    const dirLight = new THREE.DirectionalLight(0xC8102E, 1.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);
    const goldenLight = new THREE.PointLight(0xD4AF37, 2, 10);
    goldenLight.position.set(-3, 2, 2);
    scene.add(goldenLight);

    // Dragon body — toroidal spiral
    const group = new THREE.Group();
    scene.add(group);

    const curve = new THREE.CatmullRomCurve3(
      Array.from({ length: 60 }, (_, i) => {
        const t = (i / 60) * Math.PI * 4;
        return new THREE.Vector3(
          Math.cos(t) * (2 + Math.sin(t * 0.5) * 0.5),
          Math.sin(t) * (0.6 + Math.cos(t * 0.3) * 0.3),
          Math.sin(t * 0.7) * 0.8
        );
      }),
      true
    );

    const tubeGeo  = new THREE.TubeGeometry(curve, 200, 0.08, 8, true);
    const tubeMat  = new THREE.MeshPhongMaterial({ color: 0xC8102E, shininess: 120, emissive: 0x3B0010, emissiveIntensity: 0.3 });
    const tube     = new THREE.Mesh(tubeGeo, tubeMat);
    group.add(tube);

    // Scales along dragon
    const scaleMat = new THREE.MeshPhongMaterial({ color: 0xD4AF37, shininess: 200, emissive: 0x3B2800, emissiveIntensity: 0.4 });
    for (let i = 0; i < 40; i++) {
      const scaleGeo = new THREE.SphereGeometry(0.06, 6, 6);
      const scaleMesh = new THREE.Mesh(scaleGeo, scaleMat);
      const pt = curve.getPoint(i / 40);
      scaleMesh.position.copy(pt);
      group.add(scaleMesh);
    }

    // Floating orbs
    const orbMat = new THREE.MeshPhongMaterial({ color: 0xffeecc, shininess: 300, transparent: true, opacity: 0.7 });
    const orbs: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const orb = new THREE.Mesh(new THREE.SphereGeometry(0.12 + Math.random() * 0.1, 16, 16), orbMat);
      orb.position.set((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 2);
      scene.add(orb);
      orbs.push(orb);
    }

    // Particle stars
    const partGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(300 * 3);
    for (let i = 0; i < 300 * 3; i++) positions[i] = (Math.random() - 0.5) * 20;
    partGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const partMat = new THREE.PointsMaterial({ color: 0xD4AF37, size: 0.03, transparent: true, opacity: 0.6 });
    scene.add(new THREE.Points(partGeo, partMat));

    let frame = 0;
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame += 0.005;
      group.rotation.y += 0.003;
      group.rotation.x = Math.sin(frame * 0.5) * 0.15;
      group.rotation.z = Math.cos(frame * 0.3) * 0.08;
      orbs.forEach((orb, i) => {
        orb.position.y += Math.sin(frame * 2 + i) * 0.005;
        orb.position.x += Math.cos(frame * 1.5 + i) * 0.003;
      });
      goldenLight.intensity = 1.5 + Math.sin(frame * 3) * 0.5;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    sceneRef.current = {
      cleanup: () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      }
    };

    return () => sceneRef.current?.cleanup();
  }, []);

  return <div ref={mountRef} className={className} style={{ width: "100%", height: "100%" }} />;
}
