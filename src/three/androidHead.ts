import * as THREE from "three";

export type AndroidHandle = {
  setTheme: (theme: "dark" | "light") => void;
  dispose: () => void;
};

type Part = {
  object: THREE.Object3D;
  home: THREE.Vector3;
  homeRot: THREE.Euler;
  from: THREE.Vector3;
  fromRot: THREE.Euler;
  delay: number;
  spin: number;
  /** Glow ramps once the part has landed. */
  glow?: (value: number) => void;
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/** Soft round falloff used for glows and light bloom. */
function radialTexture(inner = 1, mid = 0.35) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  if (context) {
    const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, `rgba(255,255,255,${inner})`);
    gradient.addColorStop(0.4, `rgba(255,255,255,${mid})`);
    gradient.addColorStop(0.72, "rgba(255,255,255,0.08)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 256, 256);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t: number) => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);

/** Studio-style gradient environment so the metal has something to reflect. */
function buildEnvironment(renderer: THREE.WebGLRenderer, bright: boolean) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  if (!context) return null;

  const sky = context.createLinearGradient(0, 0, 0, 256);
  if (bright) {
    sky.addColorStop(0, "#ffffff");
    sky.addColorStop(0.45, "#c8cde0");
    sky.addColorStop(0.72, "#6d7285");
    sky.addColorStop(1, "#1d1f27");
  } else {
    sky.addColorStop(0, "#4a4f66");
    sky.addColorStop(0.42, "#171922");
    sky.addColorStop(0.75, "#0a0b11");
    sky.addColorStop(1, "#05060a");
  }
  context.fillStyle = sky;
  context.fillRect(0, 0, 128, 256);

  // Two soft "softbox" strips give the chrome a readable edge highlight.
  const strip = (x: number, y: number, w: number, h: number, color: string) => {
    const g = context.createRadialGradient(x, y, 0, x, y, Math.max(w, h));
    g.addColorStop(0, color);
    g.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = g;
    context.fillRect(x - w, y - h, w * 2, h * 2);
  };
  strip(28, 70, 46, 46, bright ? "rgba(255,255,255,1)" : "rgba(214,222,255,0.95)");
  strip(104, 120, 40, 40, bright ? "rgba(255,240,225,0.9)" : "rgba(120,236,255,0.75)");
  strip(60, 20, 54, 30, bright ? "rgba(255,255,255,0.8)" : "rgba(160,130,255,0.6)");

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromEquirectangular(texture).texture;
  pmrem.dispose();
  texture.dispose();
  return env;
}

/** Extrude a flat polygon into a beveled armour plate. */
function plate(
  points: [number, number][],
  depth: number,
  material: THREE.Material,
  bevel = 0.012,
) {
  const shape = new THREE.Shape();
  // Extruded caps only face the camera when the outline is counter-clockwise.
  const signedArea = points.reduce((sum, [x, y], index) => {
    const [nx, ny] = points[(index + 1) % points.length];
    return sum + (x * ny - nx * y);
  }, 0);
  const outline = signedArea < 0 ? [...points].reverse() : points;
  outline.forEach(([x, y], index) => {
    if (index === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  });
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: bevel > 0,
    bevelSize: bevel,
    bevelThickness: bevel,
    bevelSegments: 1,
    curveSegments: 1,
  });
  geometry.center();
  return new THREE.Mesh(geometry, material);
}

function createMaterials(dark: boolean) {
  const armor = new THREE.MeshStandardMaterial({
    color: dark ? 0x5b6377 : 0x6b7387,
    metalness: 0.72,
    roughness: 0.32,
    envMapIntensity: 1.5,
    flatShading: true,
  });
  const armorLight = new THREE.MeshStandardMaterial({
    color: dark ? 0x8d97ad : 0xa8b2c6,
    metalness: 0.86,
    roughness: 0.2,
    envMapIntensity: 1.7,
    flatShading: true,
  });
  const face = new THREE.MeshStandardMaterial({
    color: dark ? 0x3f4658 : 0x525a6c,
    metalness: 0.88,
    roughness: 0.26,
    envMapIntensity: 1.65,
    flatShading: true,
  });
  const rubber = new THREE.MeshStandardMaterial({
    color: dark ? 0x1a1d26 : 0x2a2d38,
    metalness: 0.3,
    roughness: 0.8,
    flatShading: true,
  });
  const visor = new THREE.MeshStandardMaterial({
    color: 0x07131a,
    emissive: new THREE.Color(0x67ecff),
    emissiveIntensity: 0,
    metalness: 0.4,
    roughness: 0.15,
    toneMapped: false,
  });
  const seam = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0x9d7bff),
    transparent: true,
    opacity: 0,
    toneMapped: false,
  });
  const core = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0xe8fbff),
    transparent: true,
    opacity: 0,
    toneMapped: false,
  });
  return { armor, armorLight, face, rubber, visor, seam, core };
}

export function createAndroidScene(
  host: HTMLElement,
  theme: "dark" | "light",
  reduceMotion: boolean,
): AndroidHandle | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    return null;
  }

  const dark = theme === "dark";
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = dark ? 1.15 : 1.0;
  renderer.setClearAlpha(0);
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  let env = buildEnvironment(renderer, !dark);
  scene.environment = env;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0.14, 4.7);
  camera.lookAt(0, -0.1, 0);

  const materials = createMaterials(dark);

  // ------------------------------------------------------------------ lights
  const key = new THREE.DirectionalLight(0xffffff, dark ? 5.0 : 2.9);
  key.position.set(-3.4, 4.2, 4.6);

  const top = new THREE.DirectionalLight(0xd9e3ff, dark ? 2.4 : 1.8);
  top.position.set(1.4, 5.0, 1.2);

  const rimViolet = new THREE.PointLight(0x8f6bff, dark ? 30 : 16, 16, 2);
  rimViolet.position.set(3.2, 1.2, -2.0);

  const rimCyan = new THREE.PointLight(0x4ce6ff, dark ? 24 : 14, 16, 2);
  rimCyan.position.set(-3.0, -1.2, 1.6);

  const fill = new THREE.DirectionalLight(0xb8c4ff, dark ? 1.5 : 1.6);
  fill.position.set(2.5, -2.0, 3.2);

  scene.add(
    key,
    top,
    rimViolet,
    rimCyan,
    fill,
    new THREE.AmbientLight(0x9aa2c4, dark ? 0.8 : 1.3),
  );

  // ------------------------------------------------------------------- model
  const root = new THREE.Group();
  root.position.y = -0.06;
  scene.add(root);

  const head = new THREE.Group();
  root.add(head);

  const parts: Part[] = [];

  const add = (
    object: THREE.Object3D,
    options: {
      from?: [number, number, number];
      fromRot?: [number, number, number];
      delay: number;
      spin?: number;
      glow?: (value: number) => void;
    },
  ) => {
    object.updateMatrixWorld();
    head.add(object);
    parts.push({
      object,
      home: object.position.clone(),
      homeRot: object.rotation.clone(),
      from: new THREE.Vector3(...(options.from ?? [0, 0, 1.6])),
      fromRot: new THREE.Euler(...(options.fromRot ?? [0, 0, 0])),
      delay: options.delay,
      spin: options.spin ?? 0,
      glow: options.glow,
    });
  };

  // Skull: faceted polyhedron, deliberately angular so it reads as machined.
  const skullGeometry = new THREE.IcosahedronGeometry(0.56, 1);
  skullGeometry.scale(0.98, 1.04, 1.0);
  const skull = new THREE.Mesh(skullGeometry, materials.armor);
  skull.position.set(0, 0.04, -0.16);
  add(skull, { delay: 0.05, from: [0, 0.5, -1.8], spin: -0.6 });

  // Face shield: the dagger shape that gives the android its silhouette.
  const faceplate = plate(
    [
      [0, 0.5],
      [0.3, 0.34],
      [0.4, 0.06],
      [0.33, -0.24],
      [0.17, -0.5],
      [0, -0.58],
      [-0.17, -0.5],
      [-0.33, -0.24],
      [-0.4, 0.06],
      [-0.3, 0.34],
    ],
    0.16,
    materials.face,
    0.018,
  );
  faceplate.position.set(0, 0.02, 0.4);
  add(faceplate, { delay: 0.12, from: [0, 0, -2.2], spin: 0.35 });

  // Brow / forehead armour that shades the visor.
  const brow = plate(
    [
      [-0.34, 0.06],
      [-0.22, 0.2],
      [0.22, 0.2],
      [0.34, 0.06],
      [0.17, 0.12],
      [-0.17, 0.12],
    ],
    0.1,
    materials.armorLight,
    0.012,
  );
  brow.position.set(0, 0.27, 0.47);
  brow.rotation.x = 0.18;
  add(brow, { delay: 0.2, from: [0, 0.9, -1.5], spin: -0.4 });

  // Visor: a single wide arc of light sunk into a thin dark frame.
  const visorFrame = new THREE.Mesh(
    new THREE.CylinderGeometry(0.518, 0.518, 0.175, 28, 1, true, -0.74, 1.48),
    materials.rubber,
  );
  visorFrame.position.set(0, 0.09, 0.0);
  add(visorFrame, { delay: 0.26, from: [0, 0, -1.4], spin: 0.2 });

  const visorBand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.524, 0.524, 0.115, 28, 1, true, -0.7, 1.4),
    materials.visor,
  );
  visorBand.position.set(0, 0.09, 0.0);
  visorBand.scale.set(1, 1, 1.02);
  add(visorBand, {
    delay: 0.3,
    from: [0, 0, -1.2],
    glow: (value) => {
      materials.visor.emissiveIntensity = value * 2.6;
    },
  });

  // Inner luminous core of the visor, slightly narrower.
  const visorCore = new THREE.Mesh(
    new THREE.CylinderGeometry(0.53, 0.53, 0.062, 28, 1, true, -0.66, 1.32),
    materials.core,
  );
  visorCore.position.set(0, 0.09, 0.0);
  visorCore.scale.set(1, 1, 1.02);
  add(visorCore, {
    delay: 0.36,
    from: [0, 0, -1.2],
    glow: (value) => {
      materials.core.opacity = value * 0.6;
    },
  });

  // Cheek vents.
  for (const side of [-1, 1]) {
    const cheek = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.26, 0.12), materials.armor);
    cheek.position.set(side * 0.29, -0.16, 0.36);
    cheek.rotation.set(0.1, side * 0.42, side * -0.16);
    add(cheek, { delay: 0.42, from: [side * 1.2, -0.3, -0.9], spin: side * 0.5 });
  }

  // Jaw.
  const jaw = plate(
    [
      [0, 0.16],
      [0.24, 0.1],
      [0.2, -0.16],
      [0, -0.24],
      [-0.2, -0.16],
      [-0.24, 0.1],
    ],
    0.14,
    materials.rubber,
    0.01,
  );
  jaw.position.set(0, -0.4, 0.3);
  jaw.rotation.x = -0.12;
  add(jaw, { delay: 0.48, from: [0, -1.0, -1.1], spin: 0.3 });

  // Chin grille: three shallow louvers break up the lower mask.
  for (let i = 0; i < 3; i += 1) {
    const louver = new THREE.Mesh(new THREE.BoxGeometry(0.2 - i * 0.03, 0.022, 0.03), materials.armor);
    louver.position.set(0, -0.31 - i * 0.055, 0.5 - i * 0.014);
    louver.rotation.x = 0.16;
    add(louver, { delay: 0.52 + i * 0.02, from: [0, -0.4, -1.0] });
  }

  // Temple vents: thin bright slits either side of the mask.
  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i += 1) {
      const vent = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.11, 0.02), materials.seam);
      vent.position.set(side * (0.3 + i * 0.03), -0.19, 0.47 - i * 0.024);
      vent.rotation.z = side * 0.3;
      add(vent, {
        delay: 0.6,
        from: [side * 0.9, -0.19, -0.7],
        glow: (value) => {
          materials.seam.opacity = Math.max(materials.seam.opacity, value * 0.7);
        },
      });
    }
  }

  // A soft bloom in front of the visor sells the light source.
  const bloomMaterial = new THREE.MeshBasicMaterial({
    map: radialTexture(1, 0.32),
    color: new THREE.Color(0x6fe8ff),
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const bloom = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 0.62), bloomMaterial);
  bloom.position.set(0, 0.09, 0.62);
  bloom.rotation.y = 0;
  head.add(bloom);

  // Temple/ear discs.
  for (const side of [-1, 1]) {
    const ear = new THREE.Group();
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.07, 10), materials.armorLight);
    disc.rotation.z = Math.PI / 2;
    const inner = new THREE.Mesh(
      new THREE.CylinderGeometry(0.065, 0.065, 0.09, 8),
      materials.visor,
    );
    inner.rotation.z = Math.PI / 2;
    const haloRing = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.008, 6, 20), materials.seam);
    haloRing.rotation.y = Math.PI / 2;
    ear.add(disc, inner, haloRing);
    ear.position.set(side * 0.55, -0.02, -0.06);
    add(ear, {
      delay: 0.54,
      from: [side * 1.6, 0, -0.4],
      spin: side * 0.8,
      glow: (value) => {
        materials.seam.opacity = value * 0.9;
      },
    });
  }

  // Low crest running over the crown of the head.
  const crown = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.075, 0.52), materials.armorLight);
  crown.position.set(0, 0.5, -0.12);
  crown.rotation.x = -0.12;
  add(crown, { delay: 0.58, from: [0, 1.4, -0.8], spin: -0.9 });

  // Neck stack.
  const neck = new THREE.Group();
  for (let i = 0; i < 3; i += 1) {
    const ring = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15 - i * 0.012, 0.16 - i * 0.012, 0.1, 12),
      i === 1 ? materials.rubber : materials.armorLight,
    );
    ring.position.y = -0.16 * i;
    neck.add(ring);
  }
  neck.position.set(0, -0.62, -0.02);
  add(neck, { delay: 0.62, from: [0, -1.8, 0], spin: 0.5 });

  // Sternum: narrow plate under the neck so the bust reads as a body, not a shield.
  const sternum = plate(
    [
      [-0.34, 0.2],
      [0.34, 0.2],
      [0.52, -0.16],
      [0.44, -0.62],
      [0, -0.78],
      [-0.44, -0.62],
      [-0.52, -0.16],
    ],
    0.24,
    materials.armor,
    0.018,
  );
  sternum.position.set(0, -1.06, -0.04);
  sternum.rotation.x = -0.14;
  add(sternum, { delay: 0.72, from: [0, -1.9, -0.6], spin: 0.5 });

  // Chest core + seams: the last beat of the boot sequence.
  const chestCore = new THREE.Mesh(new THREE.CircleGeometry(0.045, 18), materials.core);
  chestCore.position.set(0, -0.94, 0.13);
  add(chestCore, {
    delay: 0.82,
    from: [0, -0.94, -0.7],
    glow: (value) => {
      materials.core.opacity = Math.max(materials.core.opacity, value * 0.9);
    },
  });

  for (const side of [-1, 1]) {
    const seam = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.2, 0.01), materials.seam);
    seam.position.set(side * 0.15, -1.06, 0.12);
    seam.rotation.z = side * -0.4;
    add(seam, {
      delay: 0.86,
      from: [side * 0.5, -1.06, -0.7],
      glow: (value) => {
        materials.seam.opacity = Math.max(materials.seam.opacity, value * 0.9);
      },
    });
  }

  // Scan sweep that crosses the face after assembly.
  const sweep = new THREE.Mesh(
    new THREE.PlaneGeometry(0.98, 0.05),
    new THREE.MeshBasicMaterial({
      map: radialTexture(1, 0.45),
      color: new THREE.Color(0x9ef7ff),
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  sweep.position.set(0, 0.58, 0.56);
  head.add(sweep);

  // Soft halo behind the head so it separates from the page.
  const haloMaterial = new THREE.MeshBasicMaterial({
    map: radialTexture(1, 0.4),
    color: new THREE.Color(0x7c6bff),
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const halo = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 4.2), haloMaterial);
  halo.position.set(0, -0.1, -1.6);
  scene.add(halo);

  // ------------------------------------------------------------------- frame
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const onPointerMove = (event: PointerEvent) => {
    const rect = host.getBoundingClientRect();
    pointer.tx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.ty = ((event.clientY - rect.top) / rect.height) * 2 - 1;
  };
  const onPointerLeave = () => {
    pointer.tx = 0;
    pointer.ty = 0;
  };
  if (!reduceMotion) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", onPointerLeave);
  }

  const resize = () => {
    const width = host.clientWidth || 1;
    const height = host.clientHeight || 1;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.fov = 30;
    camera.updateProjectionMatrix();

    // Frame the head by height, then back off if the canvas is too narrow for it.
    const visibleHeight = 2.3;
    const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
    let distance = visibleHeight / 2 / tanHalfFov;
    const visibleWidth = visibleHeight * camera.aspect;
    if (visibleWidth < 1.75) distance *= 1.75 / visibleWidth;
    camera.position.z = distance;
  };
  resize();
  const observer = new ResizeObserver(resize);
  observer.observe(host);

  const clock = new THREE.Clock();
  let boot = 0;
  let frame = 0;
  let started = false;
  let waited = 0;
  const BOOT_SECONDS = 2.4;
  root.visible = false;

  const render = () => {
    frame = requestAnimationFrame(render);
    const delta = Math.min(clock.getDelta(), 0.05);
    const time = clock.elapsedTime;

    // Wait for the intro veil to lift so the android assembles as it is revealed.
    if (!started) {
      waited += delta;
      started =
        reduceMotion ||
        waited > 4 ||
        document.documentElement.dataset.intro !== "playing";
      root.visible = started;
    }
    if (started) boot = Math.min(1, boot + (reduceMotion ? 1 : delta / BOOT_SECONDS));

    for (const part of parts) {
      const local = clamp01((boot - part.delay * 0.8) / (1 - part.delay * 0.8 + 0.001));
      const eased = easeOutBack(local);
      const settle = easeOutCubic(clamp01((boot - part.delay * 0.8) / 0.4));
      part.object.position.lerpVectors(part.from, part.home, eased);
      part.object.rotation.set(
        part.fromRot.x + (part.homeRot.x - part.fromRot.x) * eased,
        part.fromRot.y + (part.homeRot.y - part.fromRot.y) * eased + (1 - settle) * part.spin,
        part.fromRot.z + (part.homeRot.z - part.fromRot.z) * eased,
      );
      part.glow?.(easeOutCubic(clamp01((boot - 0.62) / 0.38)));
    }

    haloMaterial.opacity = easeOutCubic(clamp01((boot - 0.3) / 0.7)) * (dark ? 0.16 : 0.1);
    bloomMaterial.opacity = easeOutCubic(clamp01((boot - 0.62) / 0.38)) * (dark ? 0.55 : 0.4);

    // Idle drift + pointer parallax, both frame-rate independent.
    pointer.x += (pointer.tx - pointer.x) * Math.min(1, delta * 3.2);
    pointer.y += (pointer.ty - pointer.y) * Math.min(1, delta * 3.2);

    const idle = reduceMotion ? 0 : 1;
    head.rotation.y = pointer.x * 0.34 * idle + Math.sin(time * 0.42) * 0.05 * idle;
    head.rotation.x = -pointer.y * 0.16 * idle + Math.sin(time * 0.61) * 0.028 * idle;
    head.position.y = Math.sin(time * 0.8) * 0.022 * idle;
    root.rotation.y = -0.22 + pointer.x * 0.07 * idle;

    // Scan sweep runs a few seconds after the boot, then repeats slowly.
    const sweepCycle = (time - BOOT_SECONDS) % 6.5;
    if (boot >= 1 && sweepCycle > 0 && sweepCycle < 1.5) {
      const t = sweepCycle / 1.5;
      sweep.position.y = 0.55 - t * 1.2;
      (sweep.material as THREE.MeshBasicMaterial).opacity =
        Math.sin(t * Math.PI) * (dark ? 0.5 : 0.38);
    } else {
      (sweep.material as THREE.MeshBasicMaterial).opacity = 0;
    }

    renderer.render(scene, camera);
  };
  render();

  const setTheme = (next: "dark" | "light") => {
    const isDark = next === "dark";
    (materials.armor as THREE.MeshStandardMaterial).color.setHex(isDark ? 0x22252e : 0x3b4152);
    (materials.armorLight as THREE.MeshStandardMaterial).color.setHex(isDark ? 0x3a4050 : 0x757d92);
    (materials.face as THREE.MeshStandardMaterial).color.setHex(isDark ? 0x3f4658 : 0x525a6c);
    (materials.rubber as THREE.MeshStandardMaterial).color.setHex(isDark ? 0x1a1d26 : 0x2a2d38);
    (materials.seam as THREE.MeshBasicMaterial).color.setHex(isDark ? 0x9d7bff : 0x6a45f0);
    key.intensity = isDark ? 5.0 : 2.9;
    rimViolet.intensity = isDark ? 26 : 14;
    rimCyan.intensity = isDark ? 20 : 12;
    renderer.toneMappingExposure = isDark ? 1.15 : 1.0;
    const nextEnv = buildEnvironment(renderer, !isDark);
    if (nextEnv) {
      env?.dispose();
      env = nextEnv;
      scene.environment = env;
    }
  };

  const dispose = () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    host.removeEventListener("pointerleave", onPointerLeave);
    scene.traverse((object) => {
      const mesh = object as THREE.Mesh;
      mesh.geometry?.dispose?.();
      const material = mesh.material;
      if (Array.isArray(material)) material.forEach((item) => item.dispose());
      else material?.dispose?.();
    });
    env?.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };

  return { setTheme, dispose };
}
