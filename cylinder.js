// 3D Cylinder Animation with Blockchain Elements
class EngineAnimation {
    constructor() {
        this.container = document.getElementById('canvas-container');
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.cylinder = null;
        this.pistons = [];
        this.blockchainElements = [];
        this.animationFrame = null;
        this.scrollY = 0;
        this.isInitialized = false;
        this.cylinderOpacity = 1;
        
        this.setup();
        this.createLights();
        this.createEngine();
        this.createBlockchain();
        this.setupResizeListener();
        this.setupScrollListener();
    }
    
    setup() {
        // Create scene
        this.scene = new THREE.Scene();
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
        this.camera.position.set(0, 0, 20);
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x050816, 0);
        
        // Append to DOM
        this.container.appendChild(this.renderer.domElement);
        
        this.isInitialized = true;
    }
    
    createLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        
        // Directional lights
        const frontLight = new THREE.DirectionalLight(0xffffff, 1);
        frontLight.position.set(10, 10, 10);
        this.scene.add(frontLight);
        
        const backLight = new THREE.DirectionalLight(0x64ffda, 0.5);
        backLight.position.set(-10, -10, -10);
        this.scene.add(backLight);
    }
    
    createEngine() {
        // Engine block
        const engineGeometry = new THREE.BoxGeometry(8, 6, 6);
        const engineMaterial = new THREE.MeshStandardMaterial({
            color: 0x333333,
            metalness: 0.7,
            roughness: 0.3
        });
        this.engineBlock = new THREE.Mesh(engineGeometry, engineMaterial);
        this.scene.add(this.engineBlock);
        
        // Create cylinder
        const cylinderGeometry = new THREE.CylinderGeometry(3, 3, 6, 32, 1, true);
        const cylinderMaterial = new THREE.MeshStandardMaterial({
            color: 0x444444,
            metalness: 0.8,
            roughness: 0.2,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1
        });
        this.cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        this.cylinder.rotation.x = Math.PI / 2;
        this.cylinder.position.y = 2;
        this.scene.add(this.cylinder);
        
        // Create pistons
        const pistonPositions = [
            { x: -2, y: 0, z: 0, phase: 0 },
            { x: -0.7, y: 0, z: 0, phase: Math.PI / 2 },
            { x: 0.7, y: 0, z: 0, phase: Math.PI },
            { x: 2, y: 0, z: 0, phase: Math.PI * 1.5 }
        ];
        
        pistonPositions.forEach(pos => {
            this.createPiston(pos.x, pos.y, pos.z, pos.phase);
        });
    }
    
    createPiston(x, y, z, phase) {
        const pistonGroup = new THREE.Group();
        
        // Piston head
        const pistonHeadGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.5, 16);
        const pistonMaterial = new THREE.MeshStandardMaterial({
            color: 0x888888,
            metalness: 0.9,
            roughness: 0.1
        });
        const pistonHead = new THREE.Mesh(pistonHeadGeometry, pistonMaterial);
        
        // Connecting rod
        const rodGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 8);
        const rodMaterial = new THREE.MeshStandardMaterial({
            color: 0x666666,
            metalness: 0.8,
            roughness: 0.2
        });
        const connectingRod = new THREE.Mesh(rodGeometry, rodMaterial);
        connectingRod.position.y = -1.25;
        
        // Add to group
        pistonGroup.add(pistonHead);
        pistonGroup.add(connectingRod);
        
        // Position group
        pistonGroup.position.set(x, y, z);
        pistonGroup.rotation.z = Math.PI / 2;
        
        // Store data for animation
        this.pistons.push({
            group: pistonGroup,
            head: pistonHead,
            rod: connectingRod,
            phase: phase,
            initialY: y
        });
        
        // Add to scene
        this.scene.add(pistonGroup);
    }
    
    createBlockchain() {
        const blockCount = 8;
        const radius = 7;
        
        // Create blockchain nodes in a circle
        for (let i = 0; i < blockCount; i++) {
            const angle = (i / blockCount) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius / 3; // Flatten the circle a bit
            const z = Math.sin(angle) * radius;
            
            // Create block
            const blockGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
            const blockMaterial = new THREE.MeshStandardMaterial({
                color: 0x64ffda,
                emissive: 0x64ffda,
                emissiveIntensity: 0.3,
                transparent: true,
                opacity: 0.7
            });
            
            const block = new THREE.Mesh(blockGeometry, blockMaterial);
            block.position.set(x, y, z);
            
            this.blockchainElements.push({
                block: block,
                initialPosition: { x, y, z },
                angle: angle
            });
            
            this.scene.add(block);
            
            // Add connection lines between blocks
            if (i > 0) {
                const prevBlock = this.blockchainElements[i - 1];
                
                const points = [];
                points.push(new THREE.Vector3(prevBlock.initialPosition.x, prevBlock.initialPosition.y, prevBlock.initialPosition.z));
                points.push(new THREE.Vector3(x, y, z));
                
                const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
                const lineMaterial = new THREE.LineBasicMaterial({
                    color: 0x64ffda,
                    transparent: true,
                    opacity: 0.4
                });
                
                const line = new THREE.Line(lineGeometry, lineMaterial);
                this.scene.add(line);
                
                // Add to blockchain elements
                this.blockchainElements[i - 1].connection = line;
            }
        }
        
        // Connect last and first block
        const firstBlock = this.blockchainElements[0];
        const lastBlock = this.blockchainElements[blockCount - 1];
        
        const points = [];
        points.push(new THREE.Vector3(lastBlock.initialPosition.x, lastBlock.initialPosition.y, lastBlock.initialPosition.z));
        points.push(new THREE.Vector3(firstBlock.initialPosition.x, firstBlock.initialPosition.y, firstBlock.initialPosition.z));
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x64ffda,
            transparent: true,
            opacity: 0.4
        });
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        this.scene.add(line);
        
        lastBlock.connection = line;
    }
    
    animate() {
        const time = Date.now() * 0.001; // Convert to seconds
        
        // Animate pistons
        this.pistons.forEach(piston => {
            const pistonTravel = Math.sin(time * 2 + piston.phase) * 1.5;
            piston.group.position.x = piston.initialY + pistonTravel;
            
            // Update connecting rod scale to simulate compression
            const compression = Math.abs(pistonTravel) * 0.2;
            piston.rod.scale.y = 1 - compression;
        });
        
        // Rotate engine block slightly
        this.engineBlock.rotation.y = Math.sin(time * 0.5) * 0.1;
        
        // Animate blockchain elements
        this.blockchainElements.forEach((element, index) => {
            // Rotate blocks
            element.block.rotation.y = time * 0.5;
            
            // Make blocks pulse
            const pulseFactor = Math.sin(time * 2 + index * 0.5) * 0.1 + 0.9;
            element.block.scale.set(pulseFactor, pulseFactor, pulseFactor);
            
            // Subtle position animation
            const floatY = Math.sin(time + index) * 0.2;
            element.block.position.y = element.initialPosition.y + floatY;
        });
        
        // Fade cylinder based on scroll position
        if (this.cylinder && this.cylinder.material) {
            this.cylinder.material.opacity = this.cylinderOpacity;
        }
        
        // Rotate entire scene based on mouse position
        this.scene.rotation.y = (window.mouseX || 0) * 0.0005;
        this.scene.rotation.x = (window.mouseY || 0) * 0.0003;
        
        // Render scene
        this.renderer.render(this.scene, this.camera);
        
        // Request next frame
        this.animationFrame = requestAnimationFrame(this.animate.bind(this));
    }
    
    setupResizeListener() {
        window.addEventListener('resize', () => {
            this.width = this.container.clientWidth;
            this.height = this.container.clientHeight;
            
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
            
            this.renderer.setSize(this.width, this.height);
        });
    }
    
    setupScrollListener() {
        window.addEventListener('scroll', () => {
            this.scrollY = window.scrollY;
            
            // Fade out cylinder as user scrolls
            const scrollThreshold = window.innerHeight * 0.5;
            this.cylinderOpacity = Math.max(0, 1 - (this.scrollY / scrollThreshold));
        });
    }
    
    start() {
        if (!this.animationFrame) {
            this.animate();
        }
    }
    
    stop() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }
}

// Track mouse movement for subtle scene rotation
window.mouseX = 0;
window.mouseY = 0;

document.addEventListener('mousemove', (e) => {
    window.mouseX = e.clientX - window.innerWidth / 2;
    window.mouseY = e.clientY - window.innerHeight / 2;
});

// Initialize animation when the page is loaded
window.addEventListener('load', () => {
    const engineAnimation = new EngineAnimation();
    engineAnimation.start();
});
