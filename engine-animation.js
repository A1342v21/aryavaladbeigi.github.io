// Three.js Engine Animation
class EngineAnimation {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('engineCanvas'),
            alpha: true
        });
        
        this.init();
    }

    init() {
        // Create engine cylinder geometry
        const cylinderGeometry = new THREE.CylinderGeometry(5, 5, 10, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 0x404040,
            metalness: 0.8,
            roughness: 0.2
        });
        this.cylinder = new THREE.Mesh(cylinderGeometry, material);
        this.scene.add(this.cylinder);

        // Add lighting
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(10, 10, 10);
        this.scene.add(light);

        this.camera.position.z = 15;

        // Animation state
        this.isRunning = false;
        this.rotationSpeed = 0;
    }

    startEngine() {
        gsap.to(this, {
            rotationSpeed: 0.1,
            duration: 2,
            ease: "power2.inOut"
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.cylinder.rotation.y += this.rotationSpeed;
        this.renderer.render(this.scene, this.camera);
    }
}
