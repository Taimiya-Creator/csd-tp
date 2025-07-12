// Mobile menu toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Three.js fractal visualization
let scene, camera, renderer, fractal;

function initFractal() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('fractal-canvas').appendChild(renderer.domElement);

    // Create fractal geometry
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial({
        color: 0x7c3aed,
        size: 0.05,
        transparent: true,
        opacity: 0.8
    });

    const vertices = [];
    const colors = [];

    // Generate fractal points
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2;
        const y = (Math.random() - 0.5) * 2;
        const z = (Math.random() - 0.5) * 2;
        
        // Apply fractal algorithm
        const scale = 2;
        vertices.push(x * scale, y * scale, z * scale);
        
        // Color based on position
        colors.push(
            (x + 1) / 2,
            (y + 1) / 2,
            (z + 1) / 2
        );
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    fractal = new THREE.Points(geometry, material);
    scene.add(fractal);

    camera.position.z = 5;

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        fractal.rotation.x += 0.001;
        fractal.rotation.y += 0.002;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Initialize fractal on window load
window.addEventListener('load', initFractal);

// Handle window resize
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Time flow visualization controls
document.getElementById('forward-flow').addEventListener('click', function() {
    document.querySelectorAll('.flow-btn').forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    // In a real implementation, this would change the visualization
});

document.getElementById('reverse-flow').addEventListener('click', function() {
    document.querySelectorAll('.flow-btn').forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    // In a real implementation, this would change the visualization
});

document.getElementById('collision-btn').addEventListener('click', function() {
    // Create a visual effect for temporal knot
    const visualization = document.getElementById('time-flow-visualization');
    visualization.style.background = 'radial-gradient(circle, var(--accent), var(--primary))';
    
    setTimeout(() => {
        visualization.style.background = 'var(--primary)';
    }, 500);
});