"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RotateCw, RefreshCw, Sun, Moon, Flame, ZoomIn, ZoomOut, Mail, Send, Sparkles } from "lucide-react";
import { Particles } from "@/components/ui/particles";

type LightingMode = "warm" | "day" | "night";

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [lightingMode, setLightingMode] = useState<LightingMode>("warm");
  const [isHovered, setIsHovered] = useState(false);

  // References to three objects for interaction
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const lightsRef = useRef<{
    ambient: THREE.AmbientLight;
    directional: THREE.DirectionalLight;
    point1: THREE.PointLight;
    point2: THREE.PointLight;
    hemi: THREE.HemisphereLight;
  } | null>(null);
  const initialCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(5, 3.5, 5));
  const initialTarget = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Initialize Three.js Scene for Ichiraku Ramen 3D Model
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 480;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.copy(initialCameraPos.current);
    cameraRef.current = camera;

    // 2. Renderer (Transparent Alpha for seamless frameless blending)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 3. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.4;
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // Prevent flipping below ground
    controls.minDistance = 2;
    controls.maxDistance = 30;
    controls.target.copy(initialTarget.current);
    controlsRef.current = controls;

    // 4. Lighting Rig (Warm Ramen Stall Ambience)
    const ambientLight = new THREE.AmbientLight(0xfff3e0, 1.4);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xfff7ed, 0x1f2937, 1.1);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xfffbeb, 2.5);
    dirLight.position.set(8, 12, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.bias = -0.0001;
    scene.add(dirLight);

    // Warm lantern point lights for authentic ramen stand glow
    const pointLight1 = new THREE.PointLight(0xff7700, 3.8, 12, 1.2);
    pointLight1.position.set(0, 2, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff9900, 2.2, 10, 1.5);
    pointLight2.position.set(-2, 1.5, -1);
    scene.add(pointLight2);

    lightsRef.current = {
      ambient: ambientLight,
      directional: dirLight,
      point1: pointLight1,
      point2: pointLight2,
      hemi: hemiLight,
    };

    // 5. Load GLB Model (Naruto Ichiraku Ramen)
    const loader = new GLTFLoader();
    const modelUrl = "/image/naruto.glb";

    let loadedModel: THREE.Group | null = null;

    loader.load(
      modelUrl,
      (gltf) => {
        loadedModel = gltf.scene;

        // Auto-center and normalize scale
        const box = new THREE.Box3().setFromObject(loadedModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Center model origin on ground plane
        loadedModel.position.x += -center.x;
        loadedModel.position.y += -box.min.y;
        loadedModel.position.z += -center.z;

        // Setup shadows and materials
        loadedModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = Math.max(mat.roughness ?? 0.5, 0.3);
            }
          }
        });

        scene.add(loadedModel);

        // Adjust camera to fit model size nicely
        const maxDim = Math.max(size.x, size.y, size.z);
        const cameraDist = maxDim * 1.45;
        const targetY = size.y * 0.42;

        initialTarget.current.set(0, targetY, 0);
        controls.target.copy(initialTarget.current);

        const newCamPos = new THREE.Vector3(cameraDist * 0.9, cameraDist * 0.65, cameraDist * 1.1);
        initialCameraPos.current.copy(newCamPos);
        camera.position.copy(newCamPos);
        camera.lookAt(initialTarget.current);

        controls.minDistance = maxDim * 0.5;
        controls.maxDistance = maxDim * 4.5;
        controls.update();

        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadProgress(percent);
        } else {
          setLoadProgress((prev) => Math.min(prev + 10, 95));
        }
      },
      (err) => {
        console.error("Error loading 3D model:", err);
        setError("Failed to load 3D model file.");
        setLoading(false);
      }
    );

    // 6. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 7. Responsive Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      controls.dispose();

      if (loadedModel) {
        loadedModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.geometry.dispose();
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => m.dispose());
            } else if (mesh.material) {
              mesh.material.dispose();
            }
          }
        });
        scene.remove(loadedModel);
      }

      renderer.dispose();
    };
  }, []);

  // Handle Auto-Rotate change
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  // Handle Lighting Preset change
  useEffect(() => {
    const lights = lightsRef.current;
    if (!lights) return;

    if (lightingMode === "warm") {
      lights.ambient.color.setHex(0xfff3e0);
      lights.ambient.intensity = 1.4;
      lights.directional.color.setHex(0xffedd5);
      lights.directional.intensity = 2.4;
      lights.point1.color.setHex(0xff6b00);
      lights.point1.intensity = 4.0;
      lights.point2.color.setHex(0xffaa00);
      lights.point2.intensity = 2.5;
      lights.hemi.color.setHex(0xffedd5);
      lights.hemi.groundColor.setHex(0x1e1b18);
    } else if (lightingMode === "day") {
      lights.ambient.color.setHex(0xffffff);
      lights.ambient.intensity = 1.7;
      lights.directional.color.setHex(0xffffff);
      lights.directional.intensity = 3.0;
      lights.point1.color.setHex(0xffd166);
      lights.point1.intensity = 1.5;
      lights.point2.color.setHex(0xffffff);
      lights.point2.intensity = 1.0;
      lights.hemi.color.setHex(0xe0f2fe);
      lights.hemi.groundColor.setHex(0x334155);
    } else if (lightingMode === "night") {
      lights.ambient.color.setHex(0x1e1b4b);
      lights.ambient.intensity = 0.6;
      lights.directional.color.setHex(0x38bdf8);
      lights.directional.intensity = 0.9;
      lights.point1.color.setHex(0xff4500);
      lights.point1.intensity = 6.0;
      lights.point2.color.setHex(0xf59e0b);
      lights.point2.intensity = 4.0;
      lights.hemi.color.setHex(0x1e1b4b);
      lights.hemi.groundColor.setHex(0x05050a);
    }
  }, [lightingMode]);

  // Reset Camera View
  const handleResetCamera = useCallback(() => {
    if (controlsRef.current && cameraRef.current) {
      cameraRef.current.position.copy(initialCameraPos.current);
      controlsRef.current.target.copy(initialTarget.current);
      controlsRef.current.update();
    }
  }, []);

  // Zoom helpers
  const handleZoom = useCallback((direction: "in" | "out") => {
    if (cameraRef.current && controlsRef.current) {
      const camera = cameraRef.current;
      const target = controlsRef.current.target;
      const factor = direction === "in" ? 0.8 : 1.25;

      const offset = new THREE.Vector3().subVectors(camera.position, target);
      offset.multiplyScalar(factor);
      camera.position.addVectors(target, offset);
      controlsRef.current.update();
    }
  }, []);

  return (
    <section id="contact" className="py-20 relative">
      {/* Particles Ambient Background */}
      <Particles quantity={70} ease={60} size={0.6} className="opacity-70 dark:opacity-90" />

      {/* Section Header */}
      <div className="relative z-10 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black dark:text-white flex items-center gap-3">
            <span>CONTACT</span>

          </h2>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            Open for Collaboration & Exciting Projects
          </span>
        </div>
        <div className="w-full border-b border-black dark:border-zinc-700 mt-4" />
      </div>

      {/* Main Content: 3D Model on Left & Ramen Themed Contact Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: PURE FRAMELESS 3D ICHIRAKU RAMEN                             */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
          <div
            ref={containerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full h-[380px] sm:h-[460px] md:h-[500px] relative cursor-grab active:cursor-grabbing select-none"
          >
            <canvas ref={canvasRef} className="w-full h-full block touch-none" />

            {/* Loading Indicator */}
            {loading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-transparent backdrop-blur-xs p-6">
                <div className="relative mb-3">
                  <div className="w-12 h-12 border-3 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-amber-500">
                    🍜
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-zinc-600 dark:text-zinc-400">
                  3D Ichiraku Ramen {loadProgress > 0 ? `(${loadProgress}%)` : "..."}
                </span>
              </div>
            )}

            {/* Error Indicator */}
            {error && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
                <p className="text-xs text-red-500 font-mono">{error}</p>
              </div>
            )}

            {/* Floating Minimal Controls (Top Right) */}
            {!loading && !error && (
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex items-center gap-1.5 bg-white/70 dark:bg-black/60 backdrop-blur-md px-2 py-1.5 rounded-full border border-black/10 dark:border-white/10 shadow-sm">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  title={autoRotate ? "Pause Auto-Rotate" : "Start Auto-Rotate"}
                  className={`p-1.5 rounded-full text-xs transition-all flex items-center justify-center cursor-pointer ${autoRotate
                    ? "bg-amber-500 text-black font-bold"
                    : "text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/10"
                    }`}
                >
                  <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`} style={{ animationDuration: "6s" }} />
                </button>

                <button
                  onClick={handleResetCamera}
                  title="Reset Camera View"
                  className="p-1.5 rounded-full text-xs text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/10 transition-all flex items-center justify-center cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleZoom("in")}
                  title="Zoom In"
                  className="p-1.5 rounded-full text-xs text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/10 transition-all flex items-center justify-center cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleZoom("out")}
                  title="Zoom Out"
                  className="p-1.5 rounded-full text-xs text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/10 transition-all flex items-center justify-center cursor-pointer"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Floating Minimal Lighting Mode Switcher (Bottom Left) */}
            {!loading && !error && (
              <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 z-10 flex items-center gap-1 bg-white/70 dark:bg-black/60 backdrop-blur-md p-1 rounded-full border border-black/10 dark:border-white/10 shadow-sm">
                <button
                  onClick={() => setLightingMode("warm")}
                  className={`p-1.5 px-2.5 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${lightingMode === "warm"
                    ? "bg-amber-500 text-black"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                    }`}
                  title="Warm Lantern Mode"
                >
                  <Flame className="w-3 h-3" />
                  <span className="hidden sm:inline">Warm</span>
                </button>

                <button
                  onClick={() => setLightingMode("day")}
                  className={`p-1.5 px-2.5 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${lightingMode === "day"
                    ? "bg-amber-500 text-black"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                    }`}
                  title="Daylight Mode"
                >
                  <Sun className="w-3 h-3" />
                  <span className="hidden sm:inline">Day</span>
                </button>

                <button
                  onClick={() => setLightingMode("night")}
                  className={`p-1.5 px-2.5 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${lightingMode === "night"
                    ? "bg-amber-500 text-black"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                    }`}
                  title="Midnight Konoha Mode"
                >
                  <Moon className="w-3 h-3" />
                  <span className="hidden sm:inline">Night</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: ICHIRAKU RAMEN THEMED CONTACT & COLLABORATION DETAILS       */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-black dark:text-white leading-[1.15] tracking-tight transition-colors">
              Stop by Ichiraku Stall. <br />
              Let&apos;s Cook &amp; Build
              <br />
              Great Things Together!
            </h3>
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              Just like a steaming bowl of delicious ramen crafted by Uncle Teuchi that fuels the shinobi of the Leaf Village, I am ready to serve clean code architectures, high performance, and stunning interfaces for your digital products.
            </p>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white dark:bg-[#141417] border-2 border-black dark:border-zinc-700 p-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)]">
            <InfoItem
              label="Location"
              value="Bandung City, Indonesia (Konohagakure)"
            />
            <InfoItem
              label="Direct Email"
              href="mailto:dandywahyudin19@gmail.com"
              value="dandywahyudin19@gmail.com"
            />
            <InfoItem
              label="LinkedIn"
              href="https://linkedin.com/in/dandywahyudin"
              value="in/dandywahyudin"
            />
            <InfoItem
              label="Instagram"
              href="https://instagram.com/dandywahyudinn"
              value="@dandywahyudinn"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="https://github.com/dandywahyudin"
              target="_blank"
              rel="noreferrer"
              className="border-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 font-bold text-xs py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] active:translate-x-px active:translate-y-px cursor-pointer"
            >
              <Send className="w-4 h-4" /> Explore GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-black dark:border-zinc-800 pt-6 mt-20 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-600 dark:text-zinc-400 font-medium gap-4 transition-colors">
        <div>© 2026 DW. — by Dandy Wahyudin.</div>
        <div className="flex items-center gap-6 text-xs text-zinc-800 dark:text-zinc-300 font-bold">
          <a href="https://linkedin.com/in/dandywahyudin" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white hover:underline">
            LinkedIn
          </a>
          <a href="https://github.com/dandywahyudin" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white hover:underline">
            GitHub
          </a>
          <a href="https://instagram.com/dandywahyudinn" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white hover:underline">
            Instagram
          </a>
        </div>
      </footer>
    </section>
  );
}

type InfoItemProps = {
  label: string;
  value: string;
  href?: string;
  badge?: string;
};

function InfoItem({ label, value, href, badge }: InfoItemProps) {
  return (
    <div className="border-l-2 border-amber-500 dark:border-amber-400 pl-3.5 py-0.5">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
          {label}
        </span>
        {badge && (
          <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-black/10 dark:border-zinc-700">
            {badge}
          </span>
        )}
      </div>
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className="text-sm font-bold text-black dark:text-white hover:text-amber-600 dark:hover:text-amber-400 hover:underline transition-colors"
        >
          {value}
        </a>
      ) : (
        <span className="text-sm font-bold text-black dark:text-white">{value}</span>
      )}
    </div>
  );
}
