import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const fallbackData = {
    profile: {
        name: 'Robert',
        title: 'Personal Webpage',
        hero: 'Example 1 builds polished interfaces, practical systems, and memorable web experiences.',
        summary: 'This space is for example-driven positioning: product-minded engineering, expressive visuals, and a bias toward shipping. It is tuned for people who care about refined UI, clear architecture, and motion that supports the message instead of hiding it.',
        role: 'Builder of elegant tools, expressive pages, and dependable shipping pipelines.',
        skills: ['Liquid UI design', '3D motion systems', 'Rust and web tooling', 'Prototype-to-product work', 'Open source polish'],
        focus: 'Design-forward engineering',
        strengths: 'Systems, polish, motion',
        qualification: 'Example certification, example 1',
        interest: 'Interactive visuals and tooling',
        interestsSummary: 'Example 1 enjoys interfaces that feel tactile, story-driven, and slightly futuristic.',
        interests: ['Ambient motion and generative visuals', 'Fast front ends with careful detail', 'Lean systems that stay maintainable'],
        skillsSummary: 'Replace the filler data here with your actual strengths when you are ready.',
        skillsDetail: ['Rust, TypeScript, and modern JavaScript', 'Three.js, CSS animation, and UI composition', 'Accessible layouts and responsive systems'],
        qualificationsSummary: 'Use this section to surface the strongest proof points immediately.',
        qualifications: ['Example qualification one', 'Example qualification two', 'Example qualification three']
    },
    projects: [
        {
            name: 'Interactive ATC',
            tag: 'Simulation',
            description: 'A realtime trainer for Air-Traffic-Control Radio Calls from the Cockpit in VR',
            repo: 'https://github.com/brucebravehart/interactive-atc',
            image: 'https://picsum.photos/seed/example-1/900/700',
            icon: 'rocket',
            tech: ['Unity', 'VR', 'Whisper'],
            accent: '#8be9ff'
        },
        {
            name: 'pager',
            tag: 'Utility',
            description: 'A Progressive Web Application to create custom Alarms between peers, fully implemented in the Cloud',
            repo: 'https://github.com/example/example-2',
            website: null,
            image: 'https://picsum.photos/seed/example-2/900/700',
            icon: 'cube',
            tech: ['Rust', 'PWA', 'Cloud'],
            accent: '#ffd166'
        },
        {
            name: 'example 3',
            tag: 'Portfolio',
            description: 'A content-first portfolio module designed to highlight projects without feeling boxy or repetitive.',
            repo: 'https://github.com/example/example-3',
            website: 'https://example.org',
            image: 'https://picsum.photos/seed/example-3/900/700',
            icon: 'spark',
            tech: ['JavaScript', 'Content', 'Showcase'],
            accent: '#ffafcc'
        },
        {
            name: 'example 4',
            tag: 'Component',
            description: 'A component exploration focused on buttons, sheen effects, and animated depth cues.',
            repo: 'https://github.com/example/example-4',
            website: null,
            image: 'https://picsum.photos/seed/example-4/900/700',
            icon: 'shield',
            tech: ['CSS', 'Buttons', 'UI'],
            accent: '#cdb4db'
        }
    ]
};

const state = {
    data: null,
    mouseX: 0,
    mouseY: 0,
    scene: null,
    camera: null,
    renderer: null,
    shapes: [],
    particles: null,
    stars: null,
    theme: 'dark'
};

const projectIcons = {
    rocket: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3c3.5.3 6.7 3.5 7 7-.1 2.9-1.7 5.8-4.4 7.7l-1 3.7c-.1.3-.4.5-.7.4l-2.7-1.2-2.2 1.8c-.2.2-.5.2-.8.1-.3-.1-.5-.4-.4-.7l.7-3.2c-1.4-.5-2.7-1.2-3.9-2.2L3.2 15c-.2-.2-.3-.5-.2-.8.1-.3.3-.5.6-.6l3.1-.8c1-2.4 2.7-4.5 4.8-6.1C12.7 5.2 13.3 3.9 14 3Zm1.1 3.7c-1.8.2-3.8 1.3-5.5 3.1-1.5 1.5-2.6 3.3-3.1 5.1l2.2 2.2c1.8-.5 3.5-1.6 5-3.1 1.8-1.7 2.9-3.7 3.1-5.5-1.4-.9-1.7-1.2-1.7-1.8Zm1.8 2.3c-.5 1.4-1.4 2.8-2.6 4-1.2 1.2-2.6 2.1-4 2.6l1.7 1.7 1.4-.4.4-1.4 1.7-1.7 1.4-.4.4-1.4 1.7-1.7c-.1-.7-.3-1.5-.7-2.3ZM15 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"></path></svg>',
    cube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 8 4.6v9L12 20 4 15.6v-9L12 2Zm0 2.3-5.7 3.3L12 11l5.7-3.4L12 4.3Zm-6 5v6.9L11 17v-6.9L6 9.3Zm12 0-5 2.8v6.9l5-2.8V9.3Z"></path></svg>',
    spark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.7 5.2L19 9l-5.3 1.8L12 16l-1.7-5.2L5 9l5.3-1.8L12 2Zm7 10 1.1 3.2L23 17l-2.9 1-1 2.9-1-2.9-2.9-1 2.9-1 1-3 1-.9ZM4 13l1.1 3.2L8 17l-2.9 1L4 21l-1.1-3-2.9-1 2.9-1L4 13Z"></path></svg>',
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 20 5v6c0 5.2-3.5 9.9-8 11-4.5-1.1-8-5.8-8-11V5l8-3Zm0 3.1L6 7v4c0 3.8 2.4 7.3 6 8.5 3.6-1.2 6-4.7 6-8.5V7l-6-1.9Zm-1 3.2h2v6h-2v-6Zm0 7.2h2v2h-2v-2Z"></path></svg>',
    propeller: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-propeller"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 13a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M14.167 10.5c.722 -1.538 1.156 -3.043 1.303 -4.514c.22 -1.63 -.762 -2.986 -3.47 -2.986s-3.69 1.357 -3.47 2.986c.147 1.471 .581 2.976 1.303 4.514" /><path d="M13.169 16.751c.97 1.395 2.057 2.523 3.257 3.386c1.3 1 2.967 .833 4.321 -1.512c1.354 -2.345 .67 -3.874 -.85 -4.498c-1.348 -.608 -2.868 -.985 -4.562 -1.128" /><path d="M8.664 13c-1.693 .143 -3.213 .52 -4.56 1.128c-1.522 .623 -2.206 2.153 -.852 4.498s3.02 2.517 4.321 1.512c1.2 -.863 2.287 -1.991 3.258 -3.386" /></svg>',
    radio: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-radio"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 3l-9.371 3.749a1 1 0 0 0 -.629 .928v11.323a1 1 0 0 0 1 1h14a1 1 0 0 0 1 -1v-11a1 1 0 0 0 -1 -1h-14.5" /><path d="M4 12h16" /><path d="M7 12v-2" /><path d="M17 16v.01" /><path d="M13 16v.01" /></svg>',
    banknote: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-currency-dollar"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" /><path d="M12 3v3m0 12v3" /></svg>'
};

function iconMarkup(name) {
    return projectIcons[name] || projectIcons.spark;
}

const themeConfig = {
    dark: {
        background: '#090c12',
        panel: 'rgba(10, 16, 30, 0.56)',
        panelStrong: 'rgba(14, 22, 40, 0.72)',
        border: 'rgba(235, 247, 255, 0.16)',
        borderStrong: 'rgba(255, 255, 255, 0.24)',
        text: '#f7fbff',
        muted: 'rgba(226, 236, 248, 0.72)',
        soft: 'rgba(201, 216, 235, 0.58)',
        accent: '#8be9ff',
        accent2: '#ffd166',
        orbOne: 'rgba(139, 233, 255, 0.95)',
        orbTwo: 'rgba(205, 180, 255, 0.88)',
        orbThree: 'rgba(159, 247, 200, 0.72)',
        scene: 0x0d1017,
        glassA: 0x8be9ff,
        glassB: 0xffffff,
        glassC: 0xffa0df,
        pointLight: 0x7fd3ff,
        pointLightTwo: 0xff8bd4,
        particles: 0xffffff,
        gridGlow: 'rgba(255, 255, 255, 0.03)'
    },
    light: {
        background: '#edf0f4',
        panel: 'rgba(245, 247, 250, 0.68)',
        panelStrong: 'rgba(238, 242, 246, 0.92)',
        border: 'rgba(16, 24, 40, 0.08)',
        borderStrong: 'rgba(16, 24, 40, 0.14)',
        text: '#0c1220',
        muted: 'rgba(35, 47, 71, 0.76)',
        soft: 'rgba(55, 71, 97, 0.62)',
        accent: '#5a91b8',
        accent2: '#c38d38',
        orbOne: 'rgba(58, 174, 224, 0.2)',
        orbTwo: 'rgba(139, 114, 255, 0.16)',
        orbThree: 'rgba(89, 194, 132, 0.12)',
        scene: 0xf5f7fb,
        glassA: 0x9ec8e3,
        glassB: 0xc5d3de,
        glassC: 0xb8d8c6,
        pointLight: 0x90b9d4,
        pointLightTwo: 0xb6a1d9,
        particles: 0x6a7b8b,
        gridGlow: 'rgba(16, 24, 40, 0.05)'
    }
};

function getPreferredTheme() {
    const storedTheme = window.localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
    const resolvedTheme = theme === 'light' ? 'light' : 'dark';
    const palette = themeConfig[resolvedTheme];

    state.theme = resolvedTheme;
    document.documentElement.dataset.theme = resolvedTheme;
    document.body.dataset.theme = resolvedTheme;
    document.documentElement.style.setProperty('--bg', palette.background);
    document.documentElement.style.setProperty('--panel', palette.panel);
    document.documentElement.style.setProperty('--panel-strong', palette.panelStrong);
    document.documentElement.style.setProperty('--border', palette.border);
    document.documentElement.style.setProperty('--border-strong', palette.borderStrong);
    document.documentElement.style.setProperty('--text', palette.text);
    document.documentElement.style.setProperty('--muted', palette.muted);
    document.documentElement.style.setProperty('--soft', palette.soft);
    document.documentElement.style.setProperty('--accent', palette.accent);
    document.documentElement.style.setProperty('--accent-2', palette.accent2);
    document.documentElement.style.setProperty('--grid-glow', palette.gridGlow);
    document.documentElement.style.setProperty('--grid-glow', palette.gridGlow);

    const toggle = document.getElementById('theme-toggle');
    const toggleLabel = document.getElementById('theme-toggle-label');
    if (toggle && toggleLabel) {
        const nextLabel = resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode';
        toggle.setAttribute('aria-pressed', String(resolvedTheme === 'dark'));
        toggleLabel.textContent = nextLabel;
    }

    if (state.renderer) {
        state.renderer.setClearColor(palette.background, 1);
    }

    // Create the Colorful Gradient Background
    function createGradientTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Create a beautiful diagonal light gradient
        const gradient = ctx.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, state.theme === "dark" ? '#000000' : '#ff9a9e');
        gradient.addColorStop(0.5, state.theme === "dark" ? '#3f004d' : '#fecfef');
        gradient.addColorStop(1, state.theme === "dark" ? '#040076' : '#a1c4fd');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);

        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace; // Keeps colors vibrant
        return texture;
    }

    // 🔥 Apply it directly to the scene background
    let gradientTexture = createGradientTexture();
    state.scene.background = gradientTexture;


    state.scene.environmentIntensity = state.theme === "dark" ? 0.2 : 1.0;


    if (state.shapes.length) {
        state.shapes.forEach((shape, index) => {
            let brightColors = [0xff5f7a, 0xffb347, 0xfff176, 0x7cffb2, 0x76d7ff, 0x7e8cff, 0xc27cff];



            let colors = brightColors

            const color = new THREE.Color(colors[index % colors.length]);
            shape.material.color.copy(color);

            shape.material.opacity = resolvedTheme === 'dark' ? 0.34 : 0.22;
            shape.material.roughness = resolvedTheme === 'dark' ? 0.001 : 0.015;
            shape.material.metalness = 0.01;
            shape.material.transmission = resolvedTheme === 'dark' ? 0.99 : 0.97;
            shape.material.ior = 2.5;
            shape.material.thickness = resolvedTheme === 'dark' ? 0.2 : 1.25;
            shape.material.clearcoat = 1;
            shape.material.clearcoatRoughness = 0.015;
            shape.material.attenuationColor = color.clone();
            shape.material.attenuationDistance = resolvedTheme === 'dark' ? 2.6 : 3.6;
            shape.material.needsUpdate = true;
        });
    }
}

function toggleTheme() {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    window.localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
}

function createProjectCard(project) {
    const article = document.createElement('article');
    article.className = 'project-card glass-panel';
    article.style.setProperty('--project-accent', project.accent);

    article.innerHTML = `
                <button class="project-hit" type="button" aria-label="Open ${project.name} repository"></button>
                <div class="project-media">
                    <img src="${project.image}" alt="Preview for ${project.name}">
                    <div class="project-icon">${iconMarkup(project.icon)}</div>
                </div>
                <div class="project-copy">
                    <div class="project-topline">
                        <div>
                            <p class="project-label">${project.tag}</p>
                            <h3>${project.name}</h3>
                        </div>
                        <span class="repo-pill">Repository</span>
                    </div>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map((item) => `<span>${item}</span>`).join('')}
                    </div>
                </div>
                <div class="project-actions">
                    <a class="button reflective small" href="${project.repo}" target="_blank" rel="noreferrer">Open repo</a>
                    ${project.website ? `<a class="button ghost small" href="${project.website}" target="_blank" rel="noreferrer">Visit site</a>` : ''}
                </div>
            `;

    article.querySelector('.project-hit').addEventListener('click', () => {
        window.open(project.repo, '_blank', 'noreferrer');
    });

    article.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
            return;
        }
        window.open(project.repo, '_blank', 'noreferrer');
    });

    return article;
}

async function loadContent() {
    try {
        const response = await fetch('config.json', { cache: 'no-store' });
        state.data = response.ok ? await response.json() : fallbackData;
    } catch (error) {
        state.data = fallbackData;
    }

    document.title = `${state.data.profile.name} | ${state.data.profile.title}`;

    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = '';
    state.data.projects.forEach((project) => {
        const card = createProjectCard(project);
        projectsGrid.appendChild(card);

        if (observer) {
            observer.observe(card);
        } else {
            card.classList.add('visible');
        }
    });

    const heroCopy = document.querySelector('.hero-copy h1');
    heroCopy.textContent = state.data.profile.hero;
    document.querySelector('.hero-text').textContent = state.data.profile.summary;


    document.querySelector('.brand-lockup strong').textContent = state.data.profile.name;
    document.querySelector('.topbar .eyebrow').textContent = state.data.profile.title;



    const statValues = document.querySelectorAll('.stat-grid dd');

    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards[0].querySelector('p').textContent = state.data.profile.interestsSummary;
    aboutCards[0].querySelector('ul').innerHTML = state.data.profile.interests.map((item) => `<li>${item}</li>`).join('');
    aboutCards[1].querySelector('p').textContent = state.data.profile.skillsSummary;
    aboutCards[1].querySelector('ul').innerHTML = state.data.profile.skillsDetail.map((item) => `<li>${item}</li>`).join('');
    aboutCards[2].querySelector('p').textContent = state.data.profile.qualificationsSummary;
    aboutCards[2].querySelector('ul').innerHTML = state.data.profile.qualifications.map((item) => `<li>${item}</li>`).join('');
}

function initThree() {
    const container = document.getElementById('canvas-container');
    const palette = themeConfig[state.theme];
    state.scene = new THREE.Scene();
    state.scene.background = new THREE.Color('#ff9a9e');
    state.camera = new THREE.PerspectiveCamera(3, window.innerWidth / window.innerHeight, 150, 250);
    state.camera.position.set(0, 0, 200);

    state.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    state.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    state.renderer.setSize(window.innerWidth, window.innerHeight);
    state.renderer.setClearColor(palette.background, 1);
    state.renderer.outputEncoding = THREE.SRGBColorSpace;

    container.appendChild(state.renderer.domElement);

    // Create the Colorful Gradient Background
    function createGradientTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Create a beautiful diagonal light gradient
        const gradient = ctx.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, state.theme === "dark" ? '#000000' : '#ff9a9e');
        gradient.addColorStop(0.5, state.theme === "dark" ? '#3f004d' : '#fecfef');
        gradient.addColorStop(1, state.theme === "dark" ? '#040076' : '#a1c4fd');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);

        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace; // Keeps colors vibrant
        return texture;
    }

    // 🔥 Apply it directly to the scene background
    let gradientTexture = createGradientTexture();
    state.scene.background = gradientTexture;
    // apply room environment after background
    state.renderer.render(state.scene, state.camera);
    const pmremGenerator = new THREE.PMREMGenerator(state.renderer);
    const roomEnv = new RoomEnvironment(state.renderer);
    state.scene.environment = pmremGenerator.fromScene(roomEnv).texture;


    const ambient = new THREE.AmbientLight(0xffffff, 0.015);
    state.scene.add(ambient);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
    directionalLight.position.set(8, 12, 4);
    state.scene.add(directionalLight);

    const extrudeSettings = {
        depth: 0.25,           // How thick the shape is (Z-axis)
        bevelEnabled: true,    // Adds a slight rounded edge to catch glass highlights
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelSegments: 10,
        curveSegments: 64
    };

    // 1. TRIANGLE (Using THREE.Shape)
    const triangleShape = new THREE.Shape();

    // 🌟 CONTROL VARIABLES
    const sideLength = 0.8;         // Change this one variable to scale the entire triangle
    const triangleArcRadius = 0.15; // Controls how rounded the corners are

    // Mathematical calculation for an equilateral triangle centered at (0,0)
    const circumRadius = sideLength / Math.sqrt(3);

    // Define the 3 sharp peak coordinates dynamically
    const p1 = { x: 0, y: circumRadius };                                               // Top peak
    const p2 = { x: sideLength / 2, y: -circumRadius / 2 };                             // Bottom right peak
    const p3 = { x: -sideLength / 2, y: -circumRadius / 2 };                            // Bottom left peak

    // Calculate a dynamic offset factor for the curves based on your radius
    // (Using an approximation so the curve starts gracefully before the peak)
    const offset = triangleArcRadius * 0.6;

    // --- TOP PEAK CORNER ---
    // Start on the left slope, just before hitting the top peak
    triangleShape.moveTo(-offset, p1.y - offset * 1.5);
    // Curve over the top peak to the right slope
    triangleShape.quadraticCurveTo(p1.x, p1.y, offset, p1.y - offset * 1.5);

    // --- BOTTOM RIGHT CORNER ---
    // Line down the right slope to just before the bottom-right peak
    triangleShape.lineTo(p2.x - offset * 0.7, p2.y + offset * 1.2);
    // Curve around the bottom-right peak to the bottom edge
    triangleShape.quadraticCurveTo(p2.x, p2.y, p2.x - offset * 1.3, p2.y);

    // --- BOTTOM LEFT CORNER ---
    // Line across the bottom edge to just before the bottom-left peak
    triangleShape.lineTo(p3.x + offset * 1.3, p3.y);
    // Curve around the bottom-left peak back up to the left slope
    triangleShape.quadraticCurveTo(p3.x, p3.y, p3.x + offset * 0.7, p3.y + offset * 1.2);

    // Close the path back to our starting point
    triangleShape.closePath();

    // 2. SQUARE / RECTANGLE (Using THREE.Shape)
    const squareShape = new THREE.Shape();
    const width = 0.5;
    const height = 0.5;
    const squareArcRadius = 0.1; // Adjust this to make corners more or less rounded
    const x = -width / 2;
    const y = -height / 2;
    // Start at bottom-left, just past the corner radius
    squareShape.moveTo(x + squareArcRadius, y);
    // Bottom edge to bottom-right corner
    squareShape.lineTo(x + width - squareArcRadius, y);
    squareShape.quadraticCurveTo(x + width, y, x + width, y + squareArcRadius);
    // Right edge to top-right corner
    squareShape.lineTo(x + width, y + height - squareArcRadius);
    squareShape.quadraticCurveTo(x + width, y + height, x + width - squareArcRadius, y + height);
    // Top edge to top-left corner
    squareShape.lineTo(x + squareArcRadius, y + height);
    squareShape.quadraticCurveTo(x, y + height, x, y + height - squareArcRadius);
    // Left edge to bottom-left corner
    squareShape.lineTo(x, y + squareArcRadius);
    squareShape.quadraticCurveTo(x, y, x + squareArcRadius, y);

    // 3. Circle
    const radius = 0.4;
    const circleShape = new THREE.Shape();
    circleShape.absarc(0, 0, radius, 0, Math.PI * 2, false);

    const group = new THREE.Group();
    const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#ffffff"),               // Keep base color white so the background shines through
        transparent: false,
        opacity: state.theme === 'dark' ? 0.65 : 0.5, // important: otherwise we can't see through

        // --- THE GLASS EFFECT ---
        transmission: 1.0,            // Pure transparency/light pass-through
        roughness: 0.03,              // Slightly higher gives that luxurious "frosted/liquid" blur
        metalness: 0.0,
        ior: 2.5,                     // Standard glass index of refraction
        thickness: 0.5,               // Simulates physical depth inside the 2.5D shapes

        // --- CHROMATIC ABERRATION ---
        dispersion: 10.0,              // Adds the rainbow fringing on the edges!

        // --- SURFACE SHINE ---
        clearcoat: 1.0,               // Gives it a sleek, polished outer shell
        clearcoatRoughness: 0.015,

        // --- LIQUID TINT ---
        attenuationColor: new THREE.Color("#ffffff"), // Tints the glass where it gets thick
        attenuationDistance: 2.6,
        depthWrite: true,
        side: THREE.DoubleSide,
    });

    let triangleGeo = new THREE.ExtrudeGeometry(triangleShape, extrudeSettings)
    let squareGeo = new THREE.ExtrudeGeometry(squareShape, extrudeSettings)
    let circleGeo = new THREE.ExtrudeGeometry(circleShape, extrudeSettings)
    circleGeo.computeVertexNormals()


    const geometries = [
        triangleGeo,
        squareGeo,
        circleGeo,
        triangleGeo,
        squareGeo,
        circleGeo,
        triangleGeo,
        squareGeo,
        circleGeo,
        triangleGeo,
        squareGeo,
        circleGeo,
    ];

    geometries

    const colors = [0xff5f7a, 0xffb347, 0xfff176, 0x7cffb2, 0x76d7ff, 0x7e8cff, 0xc27cff];
    geometries.forEach((geometry, index) => {
        const individualMaterial = material.clone();
        individualMaterial.color.setHex(colors[index % colors.length])
        individualMaterial.attenuationColor.setHex(colors[index % colors.length]);
        const mesh = new THREE.Mesh(geometry, individualMaterial);
        mesh.renderOrder = index;
        mesh.position.set(
            THREE.MathUtils.randFloatSpread(7),
            THREE.MathUtils.randFloatSpread(4.5),
            index * 2 - geometries.length * 2
        );
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        mesh.scale.setScalar(1.1 + Math.random() * 0.55);
        mesh.userData = {
            speed: 0.002 + Math.random() * 0.003,
            drift: 0.006 + Math.random() * 0.01,
            axis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize()
        };
        group.add(mesh);
        state.shapes.push(mesh);
    });

    state.scene.add(group);



    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // Render first frame and enable canvas
    state.renderer.render(state.scene, state.camera);
    container.classList.add('ready');
}

function onPointerMove(event) {
    state.mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    state.mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
}

function onResize() {
    state.camera.aspect = window.innerWidth / window.innerHeight;
    state.camera.updateProjectionMatrix();
    state.renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    state.shapes.forEach((shape, index) => {
        const speed = shape.userData.speed;
        const drift = shape.userData.drift;
        shape.rotation.x += speed;
        shape.rotation.y += speed * 1.4;
        shape.position.x += Math.sin(Date.now() * 0.0004 + index) * drift * 0.08;
        shape.position.y += Math.cos(Date.now() * 0.00035 + index) * drift * 0.08;
    });

    if (state.particles) {
        state.particles.rotation.y += 0.0004;
        state.particles.rotation.x += 0.00015;
    }

    state.camera.position.x += (state.mouseX * 0.85 - state.camera.position.x) * 0.03;
    state.camera.position.y += (-state.mouseY * 0.55 - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, 0);

    state.renderer.render(state.scene, state.camera);
}

Promise.all([loadContent(), new Promise((resolve) => window.addEventListener('load', resolve, { once: true }))])
    .then(() => {
        initThree();
        applyTheme(getPreferredTheme());
        animate();
        document.body.classList.add('ready');
    })
    .catch((error) => {
        console.error(error);
        document.body.classList.add('ready');
    });

const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 })
    : null;

document.querySelectorAll('.reveal').forEach((element) => {
    if (observer) {
        observer.observe(element);
    } else {
        element.classList.add('visible');
    }
});

document.getElementById('theme-toggle').addEventListener('click', toggleTheme);


const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    // Toggle the open class to show/hide the menu
    navLinks.classList.toggle('open');

    // Accessibility bonus: Update ARIA attributes
    const isOpen = navLinks.classList.contains('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
});
