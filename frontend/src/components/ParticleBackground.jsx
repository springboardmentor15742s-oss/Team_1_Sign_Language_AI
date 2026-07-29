import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let connections = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.6 + 0.1;
        this.color = this.getColor();
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.life = 0;
      }

      getColor() {
        const colors = [
          [139, 92, 246],   // purple
          [59, 130, 246],   // blue
          [236, 72, 153],   // pink
          [167, 139, 250],  // light purple
          [96, 165, 250],   // light blue
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life += this.pulseSpeed;
        this.currentOpacity = this.opacity * (0.7 + 0.3 * Math.sin(this.life + this.pulseOffset));

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        const [r, g, b] = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.currentOpacity})`;
        ctx.fill();

        // Glow effect
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Initialize particles
    const particleCount = Math.min(150, Math.floor(canvas.width * canvas.height / 8000));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const drawConnections = () => {
      const maxDist = 160;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.15;
            const [r1, g1, b1] = particles[i].color;
            const [r2, g2, b2] = particles[j].color;
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, `rgba(${r1}, ${g1}, ${b1}, ${opacity})`);
            gradient.addColorStop(1, `rgba(${r2}, ${g2}, ${b2}, ${opacity})`);

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw ambient glow spots
      const glows = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, r: 300, color: [139, 92, 246] },
        { x: canvas.width * 0.8, y: canvas.height * 0.6, r: 250, color: [59, 130, 246] },
        { x: canvas.width * 0.5, y: canvas.height * 0.8, r: 200, color: [236, 72, 153] },
      ];

      glows.forEach(g => {
        const grad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r);
        grad.addColorStop(0, `rgba(${g.color[0]}, ${g.color[1]}, ${g.color[2]}, 0.04)`);
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      drawConnections();
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}
