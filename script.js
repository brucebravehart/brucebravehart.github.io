import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
        
        const fallbackData = {
            profile: {
                name: 'Example 1',
                title: 'GitHub Pages landing page',
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
                    name: 'example 1',
                    tag: 'Showcase',
                    description: 'A reflective dashboard concept with animated panels, layered blur, and a calm information hierarchy.',
                    repo: 'https://github.com/example/example-1',
                    website: 'https://example.com',
                    image: 'https://picsum.photos/seed/example-1/900/700',
                    icon: 'rocket',
                    tech: ['TypeScript', 'Glass UI', 'Motion'],
                    accent: '#8be9ff'
                },
                {
                    name: 'example 2',
                    tag: 'Utility',
                    description: 'An experimental layout system for compact content cards and bold call-to-action sections.',
                    repo: 'https://github.com/example/example-2',
                    website: null,
                    image: 'https://picsum.photos/seed/example-2/900/700',
                    icon: 'cube',
                    tech: ['Rust', 'Systems', 'Layout'],
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
            shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 20 5v6c0 5.2-3.5 9.9-8 11-4.5-1.1-8-5.8-8-11V5l8-3Zm0 3.1L6 7v4c0 3.8 2.4 7.3 6 8.5 3.6-1.2 6-4.7 6-8.5V7l-6-1.9Zm-1 3.2h2v6h-2v-6Zm0 7.2h2v2h-2v-2Z"></path></svg>'
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
            document.documentElement.style.setProperty('--orb-one', palette.orbOne);
            document.documentElement.style.setProperty('--orb-two', palette.orbTwo);
            document.documentElement.style.setProperty('--orb-three', palette.orbThree);
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

            

            if (state.particles && state.particles.material) {
                state.particles.material.color.setHex(palette.particles);
                state.particles.material.opacity = resolvedTheme === 'dark' ? 0.38 : 0.26;
            }

            if (state.shapes.length) {
                state.shapes.forEach((shape, index) => {
                    const colors = [0xff5f7a, 0xffb347, 0xfff176, 0x7cffb2, 0x76d7ff, 0x7e8cff, 0xc27cff];
                    const color = new THREE.Color(colors[index % colors.length]);
                    shape.material.color.copy(color);
                    
                    shape.material.opacity = resolvedTheme === 'dark' ? 0.34 : 0.22;
                    shape.material.roughness = resolvedTheme === 'dark' ? 0.025 : 0.015;
                    shape.material.metalness = 0.01;
                    shape.material.transmission = resolvedTheme === 'dark' ? 0.99 : 0.97;
                    shape.material.ior = 1.52;
                    shape.material.thickness = resolvedTheme === 'dark' ? 1.55 : 1.25;
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
            document.querySelector('.profile-card h2').textContent = state.data.profile.name;
            document.querySelector('.profile-card .role').textContent = state.data.profile.role;
            document.querySelector('.brand-lockup strong').textContent = state.data.profile.name;
            document.querySelector('.topbar .eyebrow').textContent = state.data.profile.title;

            const skillStrip = document.querySelector('.skill-strip');
            skillStrip.innerHTML = state.data.profile.skills.map((skill) => `<span>${skill}</span>`).join('');

            const statValues = document.querySelectorAll('.stat-grid dd');
            statValues[0].textContent = state.data.profile.focus;
            statValues[1].textContent = state.data.profile.strengths;
            statValues[2].textContent = state.data.profile.qualification;
            statValues[3].textContent = state.data.profile.interest;

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
            state.camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 100);
            state.camera.position.set(0, 0, 10);

            state.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            state.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            state.renderer.setSize(window.innerWidth, window.innerHeight);
            state.renderer.setClearColor(palette.background, 1);
            state.renderer.physicallyCorrectLights = true;
            state.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            state.renderer.toneMappingExposure = state.theme === 'dark' ? 1.05 : 0.95;
            state.renderer.outputEncoding = THREE.sRGBEncoding;
            
            container.appendChild(state.renderer.domElement);

            // Create the Colorful Gradient Background
            function createGradientTexture() {
                const canvas = document.createElement('canvas');
                canvas.width = 512;
                canvas.height = 512;
                const ctx = canvas.getContext('2d');

                // Create a beautiful diagonal light gradient
                const gradient = ctx.createLinearGradient(0, 0, 512, 512);
                gradient.addColorStop(0, '#ff9a9e');
                gradient.addColorStop(0.5, '#fecfef');
                gradient.addColorStop(1, '#a1c4fd');

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 512, 512);

                const texture = new THREE.CanvasTexture(canvas);
                texture.colorSpace = THREE.SRGBColorSpace; // Keeps colors vibrant
                return texture;
            }

            // 🔥 Apply it directly to the scene background
            state.scene.background = createGradientTexture();
            // apply room environment after background
            state.renderer.render(state.scene, state.camera);
            const pmremGenerator = new THREE.PMREMGenerator(state.renderer);
            const roomEnv = new RoomEnvironment(state.renderer);
            state.scene.environment = pmremGenerator.fromScene(roomEnv).texture;
            

            const ambient = new THREE.AmbientLight(0xffffff, 0.15);
            state.scene.add(ambient);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
            directionalLight.position.set(8, 12, 4);
            state.scene.add(directionalLight);

            const extrudeSettings = {
                depth: 0.25,           // How thick the shape is (Z-axis)
                bevelEnabled: true,    // Adds a slight rounded edge to catch glass highlights
                bevelThickness: 0.04,
                bevelSize: 0.03,
                bevelSegments: 3
            };

            // 1. TRIANGLE (Using THREE.Shape)
            const triangleShape = new THREE.Shape();
            triangleShape.moveTo(0, 0.8);
            triangleShape.lineTo(0.7, -0.5);
            triangleShape.lineTo(-0.7, -0.5);
            triangleShape.closePath();

            // 2. SQUARE / RECTANGLE (Using THREE.Shape)
            const squareShape = new THREE.Shape();
            const size = 0.6;
            squareShape.moveTo(-size, -size);
            squareShape.lineTo(size, -size);
            squareShape.lineTo(size, size);
            squareShape.lineTo(-size, size);
            squareShape.closePath();

            const group = new THREE.Group();
            const material = new THREE.MeshPhysicalMaterial({
                color: 0xffffff,               // Keep base color white so the background shines through
                transparent: true,
                opacity: 1.0,
                
                // --- THE GLASS EFFECT ---
                transmission: 0.9,            // Pure transparency/light pass-through
                roughness: 0.08,              // Slightly higher gives that luxurious "frosted/liquid" blur
                metalness: 0.0,
                ior: 1.5,                     // Standard glass index of refraction
                thickness: 0.5,               // Simulates physical depth inside the 2.5D shapes
                
                // --- CHROMATIC ABERRATION ---
                dispersion: 5.0,              // Adds the rainbow fringing on the edges!

                // --- SURFACE SHINE ---
                clearcoat: 1.0,               // Gives it a sleek, polished outer shell
                clearcoatRoughness: 0.02,
                
                // --- LIQUID TINT ---
                //attenuationColor: new THREE.Color('#ff9a9e'), // Tints the glass where it gets thick
                attenuationDistance: 0.5,
                depthWrite: true,
                side: THREE.FrontSide
            });
            const geometries = [
                new THREE.ExtrudeGeometry(triangleShape, extrudeSettings),
                new THREE.ExtrudeGeometry(squareShape, extrudeSettings),
                new THREE.CylinderGeometry(0.7, 0.7, 0.3, 32),
                new THREE.ExtrudeGeometry(triangleShape, extrudeSettings),
                new THREE.ExtrudeGeometry(squareShape, extrudeSettings),
                new THREE.CylinderGeometry(0.7, 0.7, 0.3, 32)
            ];

            geometries.forEach((geometry, index) => {
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(
                    THREE.MathUtils.randFloatSpread(7),
                    THREE.MathUtils.randFloatSpread(4.5),
                    THREE.MathUtils.randFloatSpread(5) - 2.5
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
                applyTheme(getPreferredTheme());
                initThree();
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