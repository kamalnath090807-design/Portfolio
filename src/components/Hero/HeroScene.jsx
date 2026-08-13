import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroScene({ mousePos, progress = 100, isLoaded = true }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const isDesktop = window.innerWidth >= 1024;

    // 1. THREE.JS SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.025);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);


    // 2. HIGH-RESOLUTION CRISP PARTICLE TEXTURES (128x128)
    const createHighResParticleTexture = (coreColor, glowColor) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.2, coreColor);
      grad.addColorStop(0.55, glowColor);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(canvas);
    };

    const purpleParticleTexture = createHighResParticleTexture('rgba(168, 85, 247, 0.95)', 'rgba(147, 51, 234, 0.35)');
    const cyanParticleTexture = createHighResParticleTexture('rgba(56, 189, 248, 0.95)', 'rgba(6, 182, 212, 0.35)');

    // 3. ENVIRONMENT LIGHTING SYSTEM
    const ambientLight = new THREE.AmbientLight(0x1a1528, 0.85);
    scene.add(ambientLight);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 8, 30);
    purpleLight.position.set(5.5, 3.5, 5);
    scene.add(purpleLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 7, 30);
    cyanLight.position.set(1.0, -3, 4);
    scene.add(cyanLight);

    const accentLight = new THREE.PointLight(0xe879f9, 5, 25);
    accentLight.position.set(3.0, 5, -2);
    scene.add(accentLight);

    // 4. MAIN CENTRAL ENERGY REACTOR GLOBE (VISIBLE ONLY ON FIRST PAGE HERO)
    const mainGroup = new THREE.Group();
    const targetX = isDesktop ? 2.65 : isTablet ? 1.8 : 0;
    const targetY = isDesktop ? 0.1 : isTablet ? -0.2 : -1.8;
    const targetZ = isMobile ? -1.5 : 0;
    mainGroup.position.set(targetX, targetY, targetZ);

    if (isMobile) {
      mainGroup.scale.set(0.72, 0.72, 0.72);
    }
    scene.add(mainGroup);

    // --- LAYER 1: Central Obsidian Crystalline Core ---
    const detail = isMobile ? 0 : 1;
    const outerGeo = new THREE.IcosahedronGeometry(1.38, detail);
    const posAttr = outerGeo.attributes.position;
    const origPositions = new Float32Array(posAttr.array.length);
    origPositions.set(posAttr.array);

    const outerMat = new THREE.MeshPhysicalMaterial({
      color: 0x050814,
      metalness: 0.88,
      roughness: 0.08,
      transmission: 0.7,
      ior: 1.6,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      transparent: true,
      opacity: 0.85,
      specularColor: new THREE.Color(0x38bdf8),
      emissive: new THREE.Color(0x0c1024),
      emissiveIntensity: 0.4,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    mainGroup.add(outerMesh);

    // --- LAYER 2: Crisp Razor Edge Wireframe Outline ---
    const wireframeGeo = new THREE.WireframeGeometry(outerGeo);
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const edgeLines = new THREE.LineSegments(wireframeGeo, edgeMat);
    mainGroup.add(edgeLines);

    // --- LAYER 3: Dual High-Detail Wireframe Lattice Cages ---
    const cageGeo = new THREE.IcosahedronGeometry(1.68, 2);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    mainGroup.add(cageMesh);

    const innerCageGeo = new THREE.DodecahedronGeometry(1.85, 1);
    const innerCageMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const innerCageMesh = new THREE.Mesh(innerCageGeo, innerCageMat);
    mainGroup.add(innerCageMesh);

    // --- LAYER 4: Inner Glowing Reactor Nucleus & Point Lights ---
    const coreGeo = new THREE.SphereGeometry(0.62, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.9,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    const coreLight = new THREE.PointLight(0x06b6d4, 10, 15);
    coreMesh.add(coreLight);

    const corePurpleLight = new THREE.PointLight(0xa855f7, 8, 15);
    coreMesh.add(corePurpleLight);

    // --- LAYER 5: Trapped Internal Energy Swarm ---
    const trappedCount = isMobile ? 35 : 80;
    const trappedGeo = new THREE.BufferGeometry();
    const trappedPos = new Float32Array(trappedCount * 3);
    const trappedAngles = new Float32Array(trappedCount);
    const trappedRadii = new Float32Array(trappedCount);

    for (let i = 0; i < trappedCount; i++) {
      const r = 0.2 + Math.random() * 1.1;
      const angle = Math.random() * Math.PI * 2;
      trappedRadii[i] = r;
      trappedAngles[i] = angle;
      trappedPos[i * 3] = Math.cos(angle) * r;
      trappedPos[i * 3 + 1] = (Math.random() - 0.5) * r * 1.5;
      trappedPos[i * 3 + 2] = Math.sin(angle) * r;
    }
    trappedGeo.setAttribute('position', new THREE.BufferAttribute(trappedPos, 3));
    const trappedMat = new THREE.PointsMaterial({
      size: 0.09,
      map: cyanParticleTexture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const trappedParticles = new THREE.Points(trappedGeo, trappedMat);
    mainGroup.add(trappedParticles);

    // --- LAYER 6: Internal Plasma Energy Filaments ---
    const filamentCount = isMobile ? 8 : 16;
    const filamentGroup = new THREE.Group();
    mainGroup.add(filamentGroup);

    const filamentGeometries = [];
    const filamentMaterials = [];

    for (let f = 0; f < filamentCount; f++) {
      const points = [];
      const numPoints = 6;
      for (let p = 0; p < numPoints; p++) {
        const radius = (p / numPoints) * 1.25;
        const theta = (f / filamentCount) * Math.PI * 2 + p * 0.35;
        const phi = (p / numPoints) * Math.PI - Math.PI / 2;
        points.push(
          new THREE.Vector3(
            radius * Math.cos(theta) * Math.cos(phi),
            radius * Math.sin(phi),
            radius * Math.sin(theta) * Math.cos(phi)
          )
        );
      }
      const curve = new THREE.CatmullRomCurve3(points);
      const fGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(24));
      const fMat = new THREE.LineBasicMaterial({
        color: f % 2 === 0 ? 0x38bdf8 : 0xa855f7,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      });
      const fLine = new THREE.Line(fGeo, fMat);
      filamentGroup.add(fLine);
      filamentGeometries.push(fGeo);
      filamentMaterials.push(fMat);
    }

    // --- LAYER 7: Atmospheric Bloom Halo Sprite ---
    const haloCanvas = document.createElement('canvas');
    haloCanvas.width = 128;
    haloCanvas.height = 128;
    const haloCtx = haloCanvas.getContext('2d');
    const haloGrad = haloCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    haloGrad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
    haloGrad.addColorStop(0.35, 'rgba(168, 85, 247, 0.25)');
    haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    haloCtx.fillStyle = haloGrad;
    haloCtx.fillRect(0, 0, 128, 128);

    const haloMat = new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(haloCanvas),
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.45,
    });
    const haloSprite = new THREE.Sprite(haloMat);
    haloSprite.scale.set(4.5, 4.5, 1);
    mainGroup.add(haloSprite);

    // --- LAYER 8: FULLY CLOSED CONTINUOUS 3D ORBITAL RINGS ---
    const ringGroup = new THREE.Group();
    mainGroup.add(ringGroup);

    // Ring 1 (Primary Equatorial Ring - Full Closed Loop)
    const ring1Geo = new THREE.TorusGeometry(2.45, 0.012, 16, 128);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 8;
    ringGroup.add(ring1);
    const ring1TotalIndices = ring1Geo.index ? ring1Geo.index.count : 0;

    // Ring 2 (Polar Gyro Ring - Full Closed Loop)
    const ring2Geo = new THREE.TorusGeometry(2.9, 0.009, 16, 128);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = -Math.PI / 6;
    ringGroup.add(ring2);
    const ring2TotalIndices = ring2Geo.index ? ring2Geo.index.count : 0;

    // Ring 3 (Outer Accent Ring - Full Closed Loop)
    const ring3Geo = new THREE.TorusGeometry(3.35, 0.007, 16, 128);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = Math.PI / 6;
    ring3.rotation.z = Math.PI / 4;
    ringGroup.add(ring3);
    const ring3TotalIndices = ring3Geo.index ? ring3Geo.index.count : 0;

    // Orbit Energy Particles on Ring 1
    const orbitEnergyCount = isMobile ? 25 : 45;
    const orbitEnergyGeo = new THREE.BufferGeometry();
    const orbitAngles = new Float32Array(orbitEnergyCount);
    const orbitEnergyPos = new Float32Array(orbitEnergyCount * 3);
    const orbitRadius = 2.45;

    for (let i = 0; i < orbitEnergyCount; i++) {
      const angle = (i / orbitEnergyCount) * Math.PI * 2 + Math.random() * 0.2;
      orbitAngles[i] = angle;
      orbitEnergyPos[i * 3] = Math.cos(angle) * orbitRadius;
      orbitEnergyPos[i * 3 + 1] = Math.sin(angle) * orbitRadius;
      orbitEnergyPos[i * 3 + 2] = (Math.random() - 0.5) * 0.12;
    }
    orbitEnergyGeo.setAttribute('position', new THREE.BufferAttribute(orbitEnergyPos, 3));
    const orbitEnergyMat = new THREE.PointsMaterial({
      size: 0.09,
      map: cyanParticleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const orbitEnergyParticles = new THREE.Points(orbitEnergyGeo, orbitEnergyMat);
    ring1.add(orbitEnergyParticles);

    // Ring Node Beacons
    const beaconCount = 8;
    const beaconGeo = new THREE.SphereGeometry(0.04, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.9 });
    for (let b = 0; b < beaconCount; b++) {
      const bAngle = (b / beaconCount) * Math.PI * 2;
      const bMesh = new THREE.Mesh(beaconGeo, beaconMat);
      bMesh.position.set(Math.cos(bAngle) * orbitRadius, Math.sin(bAngle) * orbitRadius, 0);
      ring1.add(bMesh);
    }

    // --- GLOBAL SPACE ENVIRONMENT PARTICLES (CONTINUES ALL THE WAY TO THE LAST PAGE) ---
    const nodeCount = isMobile ? 24 : 48;
    const nodePositions = [];
    const nodeVelocities = [];

    for (let i = 0; i < nodeCount; i++) {
      const side = Math.random() > 0.5 ? 1 : -1;
      const x = (Math.random() * 9 + 4) * side;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 12 - 4;
      nodePositions.push(new THREE.Vector3(x, y, z));
      nodeVelocities.push(
        new THREE.Vector3((Math.random() - 0.5) * 0.003, (Math.random() - 0.5) * 0.003, (Math.random() - 0.5) * 0.003)
      );
    }

    const nodeGeo = new THREE.BufferGeometry();
    const nodePosArr = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      nodePosArr[i * 3] = nodePositions[i].x;
      nodePosArr[i * 3 + 1] = nodePositions[i].y;
      nodePosArr[i * 3 + 2] = nodePositions[i].z;
    }
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePosArr, 3));
    const nodeMat = new THREE.PointsMaterial({
      size: 0.08,
      map: cyanParticleTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nodeParticles = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodeParticles);

    const maxDistance = 4.2;
    const linePositions = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < maxDistance) {
          linePositions.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
          linePositions.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z);
        }
      }
    }
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const linesMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });
    const networkLines = new THREE.LineSegments(linesGeo, linesMat);
    scene.add(networkLines);

    // Continuous Starry Background Field across full site length
    const bgCount = isMobile ? 400 : 950;
    const bgGeo = new THREE.BufferGeometry();
    const bgPos = new Float32Array(bgCount * 3);
    for (let i = 0; i < bgCount; i++) {
      bgPos[i * 3] = (Math.random() - 0.5) * 40;
      bgPos[i * 3 + 1] = (Math.random() - 0.5) * 36;
      bgPos[i * 3 + 2] = (Math.random() - 0.5) * 24 - 8;
    }
    bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
    const bgMat = new THREE.PointsMaterial({
      size: 0.04,
      map: purpleParticleTexture,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const bgParticles = new THREE.Points(bgGeo, bgMat);
    scene.add(bgParticles);

    const midCount = isMobile ? 200 : 480;
    const midGeo = new THREE.BufferGeometry();
    const midPos = new Float32Array(midCount * 3);
    for (let i = 0; i < midCount; i++) {
      midPos[i * 3] = (Math.random() - 0.5) * 26;
      midPos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      midPos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
    }
    midGeo.setAttribute('position', new THREE.BufferAttribute(midPos, 3));
    const midMat = new THREE.PointsMaterial({
      size: 0.08,
      map: cyanParticleTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const midParticles = new THREE.Points(midGeo, midMat);
    scene.add(midParticles);

    const fgCount = isMobile ? 30 : 70;
    const fgGeo = new THREE.BufferGeometry();
    const fgPos = new Float32Array(fgCount * 3);
    for (let i = 0; i < fgCount; i++) {
      fgPos[i * 3] = (Math.random() - 0.5) * 18;
      fgPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      fgPos[i * 3 + 2] = Math.random() * 4.5 + 1.2;
    }
    fgGeo.setAttribute('position', new THREE.BufferAttribute(fgPos, 3));
    const fgMat = new THREE.PointsMaterial({
      size: 0.18,
      map: cyanParticleTexture,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const fgParticles = new THREE.Points(fgGeo, fgMat);
    scene.add(fgParticles);

    // --- RENDER & CONTINUOUS ANIMATION LOOP ---
    let animationFrameId;
    const clock = new THREE.Clock();

    let targetCamX = 0;
    let targetCamY = 0;
    let currentCamX = 0;
    let currentCamY = 0;

    // Smooth Scale Arrival & Ring Circumferential Drawing Variables
    let arrivalScale = 0.1;
    let ring1DrawProgress = 0.0;
    let ring2DrawProgress = 0.0;
    let ring3DrawProgress = 0.0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Synchronize WebGL Layer Opacities & Scale during 0-100% Initialization
      const pNorm = Math.min(100, Math.max(0, progress)) / 100;

      // Smooth Scale Arrival Physics (grows gracefully from tiny 0.02 core to full size 1.0)
      const targetBaseScale = isMobile ? 0.72 : 1.0;
      arrivalScale += (targetBaseScale - arrivalScale) * 0.038;

      const currentScale = arrivalScale * (pNorm > 0 ? (0.75 + pNorm * 0.25) : 1.0);
      mainGroup.scale.set(currentScale, currentScale, currentScale);

      // Smooth Continuous Circumferential Drawing Motion (0% -> 100% Fully Closed Circle)
      ring1DrawProgress = Math.min(1.0, ring1DrawProgress + 0.022);
      ring2DrawProgress = Math.min(1.0, ring2DrawProgress + 0.018);
      ring3DrawProgress = Math.min(1.0, ring3DrawProgress + 0.015);

      if (ring1TotalIndices > 0) {
        ring1Geo.setDrawRange(0, Math.floor(ring1TotalIndices * ring1DrawProgress));
      }
      if (ring2TotalIndices > 0) {
        ring2Geo.setDrawRange(0, Math.floor(ring2TotalIndices * ring2DrawProgress));
      }
      if (ring3TotalIndices > 0) {
        ring3Geo.setDrawRange(0, Math.floor(ring3TotalIndices * ring3DrawProgress));
      }

      // Preserve Exact Original Scale for All 3 Thin Elegant Rings
      ring1.scale.set(1, 1, 1);
      ring2.scale.set(1, 1, 1);
      ring3.scale.set(1, 1, 1);

      // Fast & High-Degree Mouse Parallax Lerp Physics
      targetCamX = mousePos.current.x * 1.4;
      targetCamY = mousePos.current.y * 1.2;

      // Faster lerp follow factor (0.095) for prompt responsiveness
      currentCamX += (targetCamX - currentCamX) * 0.095;
      currentCamY += (targetCamY - currentCamY) * 0.095;

      camera.position.x = currentCamX * 0.65;
      camera.position.y = currentCamY * 0.55;
      camera.lookAt(0, 0, 0);

      // High-Degree 3D Globe & Energy Core Rotations along Cursor Direction + Initial Spin Boost
      const arrivalSpinBoost = Math.max(0, (1.0 - arrivalScale) * 1.5);
      mainGroup.rotation.y = time * 0.14 + currentCamX * 1.55 + arrivalSpinBoost;
      mainGroup.rotation.x = Math.sin(time * 0.18) * 0.08 - currentCamY * 1.25;
      mainGroup.rotation.z = -currentCamX * 0.45;
      mainGroup.position.y = targetY + Math.sin(time * 1.1) * 0.08;

      cageMesh.rotation.y = -time * 0.16 + currentCamX * 0.8;
      cageMesh.rotation.z = time * 0.08 - currentCamY * 0.6;
      innerCageMesh.rotation.y = time * 0.2 - currentCamX * 0.9;
      innerCageMesh.rotation.x = -time * 0.12 + currentCamY * 0.7;

      // Quad Tech Rings High-Degree Dynamic Cursor Tilts
      ring1.rotation.z = time * 0.1 + currentCamX * 0.6;
      ring1.rotation.x = currentCamY * 0.5;
      ring2.rotation.z = -time * 0.12 - currentCamX * 0.7;
      ring2.rotation.y = currentCamY * 0.6;
      ring3.rotation.y = time * 0.14 + currentCamX * 0.8;
      ring3.rotation.z = -currentCamY * 0.4;

      // Internal Trapped Plasma Swirl
      const tPos = trappedParticles.geometry.attributes.position.array;
      for (let i = 0; i < trappedCount; i++) {
        trappedAngles[i] += 0.012;
        const r = trappedRadii[i];
        tPos[i * 3] = Math.cos(trappedAngles[i]) * r;
        tPos[i * 3 + 1] = Math.sin(trappedAngles[i] * 2 + time) * r * 0.6;
        tPos[i * 3 + 2] = Math.sin(trappedAngles[i]) * r;
      }
      trappedParticles.geometry.attributes.position.needsUpdate = true;

      // Organic Surface Noise
      const posArray = outerGeo.attributes.position.array;
      for (let i = 0; i < outerGeo.attributes.position.count; i++) {
        const x = origPositions[i * 3];
        const y = origPositions[i * 3 + 1];
        const z = origPositions[i * 3 + 2];

        const noise =
          Math.sin(time * 1.5 + x * 1.8 + y * 1.4) *
          Math.cos(time * 1.4 + z * 2.0) *
          0.08;

        posArray[i * 3] = x + x * noise;
        posArray[i * 3 + 1] = y + y * noise;
        posArray[i * 3 + 2] = z + z * noise;
      }
      outerGeo.computeVertexNormals();
      outerGeo.attributes.position.needsUpdate = true;

      // Breathing Energy Pulse
      const breathingPulse = 1.0 + Math.sin(time * 1.8) * 0.08;
      coreMesh.scale.setScalar(breathingPulse);
      coreLight.intensity = 10.0 * breathingPulse * (pNorm > 0.4 ? 1 : 0);
      corePurpleLight.intensity = 8.0 * breathingPulse * (pNorm > 0.4 ? 1 : 0);

      // Orbit Energy Fragments Movement along Ring 1
      const orbitPositions = ring1.children[0].geometry.attributes.position;
      for (let i = 0; i < orbitEnergyCount; i++) {
        orbitAngles[i] += 0.006;
        orbitPositions.setXYZ(
          i,
          Math.cos(orbitAngles[i]) * orbitRadius,
          Math.sin(orbitAngles[i]) * orbitRadius,
          Math.sin(orbitAngles[i] * 3 + time * 2) * 0.08
        );
      }
      orbitPositions.needsUpdate = true;

      // Light Tracking Parallax
      purpleLight.position.x = 5.5 + currentCamX * 2.2;
      purpleLight.position.y = 3.5 + currentCamY * 2.2;
      cyanLight.position.x = 1.0 - currentCamX * 2.2;
      cyanLight.position.y = -3 - currentCamY * 2.2;

      // CONTINUOUS BACKGROUND PARTICLE MOTION ACROSS ALL PAGES TO THE FOOTER
      bgParticles.rotation.y = time * 0.018 + currentCamX * 0.15;
      midParticles.rotation.y = -time * 0.045 + currentCamX * 0.38;
      fgParticles.rotation.y = time * 0.035 + currentCamX * 0.75;

      // Neural Nodes & Lines Motion
      const nPosArr = nodeParticles.geometry.attributes.position.array;
      for (let i = 0; i < nodeCount; i++) {
        nodePositions[i].add(nodeVelocities[i]);
        if (Math.abs(nodePositions[i].y) > 9) nodeVelocities[i].y *= -1;
        if (Math.abs(nodePositions[i].z + 4) > 6) nodeVelocities[i].z *= -1;

        nPosArr[i * 3] = nodePositions[i].x;
        nPosArr[i * 3 + 1] = nodePositions[i].y;
        nPosArr[i * 3 + 2] = nodePositions[i].z;
      }
      nodeParticles.geometry.attributes.position.needsUpdate = true;

      const updatedLines = [];
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          if (nodePositions[i].distanceTo(nodePositions[j]) < maxDistance) {
            updatedLines.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
            updatedLines.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z);
          }
        }
      }
      networkLines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(updatedLines, 3));

      renderer.render(scene, camera);
    };

    animate();

    // 10. GSAP SCROLLTRIGGER TO FADE THE 3D GLOBE OUT WHEN LEAVING THE FIRST PAGE (HERO)
    // The globe is ONLY visible on the Hero section (first page). When scrolling down, it smoothly fades out!
    const globeFadeTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero-container',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    globeFadeTl
      .to(outerMat, { opacity: 0, ease: 'none' }, 0)
      .to(edgeMat, { opacity: 0, ease: 'none' }, 0)
      .to(cageMat, { opacity: 0, ease: 'none' }, 0)
      .to(innerCageMat, { opacity: 0, ease: 'none' }, 0)
      .to(coreMat, { opacity: 0, ease: 'none' }, 0)
      .to(haloMat, { opacity: 0, ease: 'none' }, 0)
      .to(trappedMat, { opacity: 0, ease: 'none' }, 0)
      .to(ring1Mat, { opacity: 0, ease: 'none' }, 0)
      .to(ring2Mat, { opacity: 0, ease: 'none' }, 0)
      .to(ring3Mat, { opacity: 0, ease: 'none' }, 0)
      .to(orbitEnergyMat, { opacity: 0, ease: 'none' }, 0)
      .to(beaconMat, { opacity: 0, ease: 'none' }, 0);

    filamentMaterials.forEach((m) => globeFadeTl.to(m, { opacity: 0, ease: 'none' }, 0));

    // 11. GSAP SCROLLTRIGGER FOR CONTINUOUS BACKGROUND MOTION ACROSS ALL PAGES TO THE FOOTER
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    scrollTl
      .to(fgParticles.position, { y: -8, z: -4, ease: 'none' }, 0)
      .to(midParticles.position, { y: -5, z: -2, ease: 'none' }, 0)
      .to(bgParticles.position, { y: -3, z: 2, ease: 'none' }, 0)
      .to(nodeParticles.position, { y: -6, ease: 'none' }, 0);

    // 12. RESIZE HANDLER
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const desk = window.innerWidth >= 1024;
      const tab = window.innerWidth >= 768 && window.innerWidth < 1024;

      const newTargetX = desk ? 2.65 : tab ? 1.8 : 0;
      const newTargetY = desk ? 0.1 : tab ? -0.2 : -1.8;
      const newTargetZ = window.innerWidth < 768 ? -1.5 : 0;

      mainGroup.position.set(newTargetX, newTargetY, newTargetZ);

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // 13. COMPLETE MEMORY CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());

      outerGeo.dispose();
      outerMat.dispose();
      wireframeGeo.dispose();
      edgeMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      innerCageGeo.dispose();
      innerCageMat.dispose();

      coreGeo.dispose();
      coreMat.dispose();
      trappedGeo.dispose();
      trappedMat.dispose();

      filamentGeometries.forEach((g) => g.dispose());
      filamentMaterials.forEach((m) => m.dispose());

      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      orbitEnergyGeo.dispose();
      orbitEnergyMat.dispose();

      beaconGeo.dispose();
      beaconMat.dispose();

      nodeGeo.dispose();
      nodeMat.dispose();
      linesGeo.dispose();
      linesMat.dispose();

      bgGeo.dispose();
      bgMat.dispose();
      midGeo.dispose();
      midMat.dispose();
      fgGeo.dispose();
      fgMat.dispose();

      purpleParticleTexture.dispose();
      cyanParticleTexture.dispose();
      haloMat.map.dispose();
      haloMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [mousePos, progress]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
}
