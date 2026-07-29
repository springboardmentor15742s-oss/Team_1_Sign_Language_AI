import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function HandVisual() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    canvas.width = 520;
    canvas.height = 580;

    // Hand landmark positions (normalized 0-1) - ASL "B" sign (fingers up)
    const landmarks = [
      // Wrist
      { x: 0.5, y: 0.88, label: 'wrist' },
      // Thumb
      { x: 0.36, y: 0.76 }, { x: 0.28, y: 0.65 }, { x: 0.22, y: 0.56 }, { x: 0.17, y: 0.48 },
      // Index
      { x: 0.38, y: 0.62 }, { x: 0.34, y: 0.44 }, { x: 0.33, y: 0.3 }, { x: 0.32, y: 0.18 },
      // Middle
      { x: 0.50, y: 0.60 }, { x: 0.50, y: 0.41 }, { x: 0.50, y: 0.27 }, { x: 0.50, y: 0.14 },
      // Ring
      { x: 0.62, y: 0.62 }, { x: 0.64, y: 0.43 }, { x: 0.65, y: 0.29 }, { x: 0.66, y: 0.17 },
      // Pinky
      { x: 0.73, y: 0.67 }, { x: 0.77, y: 0.51 }, { x: 0.78, y: 0.40 }, { x: 0.79, y: 0.30 },
    ];

    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4],       // Thumb
      [0, 5], [5, 6], [6, 7], [7, 8],        // Index
      [0, 9], [9, 10], [10, 11], [11, 12],   // Middle
      [0, 13], [13, 14], [14, 15], [15, 16], // Ring
      [0, 17], [17, 18], [18, 19], [19, 20], // Pinky
      [5, 9], [9, 13], [13, 17],             // Palm
    ];

    const getPos = (lm, wave = 0) => {
      const px = lm.x * canvas.width;
      const py = lm.y * canvas.height + wave;
      return { x: px, y: py };
    };

    const drawHandSkeleton = () => {
      const wave = Math.sin(t * 0.03) * 6;
      const pulse = 0.7 + 0.3 * Math.sin(t * 0.05);

      // Draw connections
      connections.forEach(([a, b]) => {
        const posA = getPos(landmarks[a], wave);
        const posB = getPos(landmarks[b], wave);

        const grad = ctx.createLinearGradient(posA.x, posA.y, posB.x, posB.y);
        grad.addColorStop(0, `rgba(139, 92, 246, ${0.8 * pulse})`);
        grad.addColorStop(0.5, `rgba(59, 130, 246, ${0.9 * pulse})`);
        grad.addColorStop(1, `rgba(236, 72, 153, ${0.8 * pulse})`);

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(139, 92, 246, 0.8)';
        ctx.moveTo(posA.x, posA.y);
        ctx.lineTo(posB.x, posB.y);
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // Draw landmark nodes
      landmarks.forEach((lm, i) => {
        const pos = getPos(lm, wave);
        const isJoint = i > 0;
        const r = isJoint ? (i % 4 === 0 ? 6 : 4.5) : 8;

        // Outer glow ring
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r + 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${0.08 * pulse})`;
        ctx.fill();

        // Node
        const nodeGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, r);
        nodeGrad.addColorStop(0, `rgba(220, 200, 255, ${pulse})`);
        nodeGrad.addColorStop(0.5, `rgba(139, 92, 246, ${0.9 * pulse})`);
        nodeGrad.addColorStop(1, `rgba(59, 130, 246, ${0.7 * pulse})`);

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.fillStyle = nodeGrad;
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(139, 92, 246, 1)';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Inner bright dot
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * pulse})`;
        ctx.fill();
      });
    };

    const drawOrbitRings = () => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.02);

      [150, 210, 265].forEach((r, i) => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.35, -0.3, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.06 + i * 0.02})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Orbiting dot
      const orbitR = 210;
      const dotX = cx + Math.cos(t * 0.025) * orbitR;
      const dotY = cy + Math.sin(t * 0.025) * orbitR * 0.35 - 20;
      ctx.beginPath();
      ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
      const dotGrad = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 10);
      dotGrad.addColorStop(0, 'rgba(236, 72, 153, 1)');
      dotGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = dotGrad;
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(236, 72, 153, 1)';
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const drawScanLine = () => {
      const y = (canvas.height * 0.2) + ((canvas.height * 0.7) * ((t * 0.8) % 100) / 100);
      const scanGrad = ctx.createLinearGradient(0, y - 3, 0, y + 3);
      scanGrad.addColorStop(0, 'transparent');
      scanGrad.addColorStop(0.5, 'rgba(59, 130, 246, 0.4)');
      scanGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(canvas.width * 0.1, y - 3, canvas.width * 0.8, 6);
    };

    const drawRecognitionLabel = () => {
      const pulse = 0.8 + 0.2 * Math.sin(t * 0.07);
      ctx.font = `bold 13px 'Inter', sans-serif`;
      ctx.fillStyle = `rgba(139, 92, 246, ${pulse})`;
      ctx.textAlign = 'center';
      ctx.fillText('SIGN DETECTED: "HELLO"', canvas.width / 2, 48);

      // Confidence bar
      const barW = 180;
      const barX = (canvas.width - barW) / 2;
      const barY = 58;
      ctx.fillStyle = 'rgba(255,255,255,0.07)';
      ctx.beginPath();
      ctx.roundRect(barX, barY, barW, 6, 3);
      ctx.fill();

      const confGrad = ctx.createLinearGradient(barX, 0, barX + barW * 0.94, 0);
      confGrad.addColorStop(0, 'rgba(139, 92, 246, 0.9)');
      confGrad.addColorStop(1, 'rgba(236, 72, 153, 0.9)');
      ctx.fillStyle = confGrad;
      ctx.beginPath();
      ctx.roundRect(barX, barY, barW * 0.94, 6, 3);
      ctx.fill();

      ctx.fillStyle = 'rgba(200, 200, 255, 0.5)';
      ctx.font = '10px Inter';
      ctx.fillText('Confidence: 94%', canvas.width / 2, 82);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t++;

      // Background circle glow
      const bgGrad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, 250
      );
      bgGrad.addColorStop(0, 'rgba(139, 92, 246, 0.06)');
      bgGrad.addColorStop(0.5, 'rgba(59, 130, 246, 0.03)');
      bgGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawOrbitRings();
      drawScanLine();
      drawHandSkeleton();
      drawRecognitionLabel();

      // Corner brackets
      const bSize = 20;
      const margin = 30;
      const br = `rgba(139, 92, 246, 0.5)`;
      [[margin, margin], [canvas.width - margin, margin], [margin, canvas.height - margin], [canvas.width - margin, canvas.height - margin]].forEach(([bx, by], i) => {
        ctx.strokeStyle = br;
        ctx.lineWidth = 2;
        const xDir = i % 2 === 0 ? 1 : -1;
        const yDir = i < 2 ? 1 : -1;
        ctx.beginPath();
        ctx.moveTo(bx, by + yDir * bSize);
        ctx.lineTo(bx, by);
        ctx.lineTo(bx + xDir * bSize, by);
        ctx.stroke();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative flex items-center justify-center"
      style={{ filter: 'drop-shadow(0 0 60px rgba(139, 92, 246, 0.4))' }}
    >
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.1) 0%, transparent 70%)',
          transform: 'scale(1.3)',
        }}
      />
      <div className="glass-strong rounded-3xl overflow-hidden relative"
        style={{
          boxShadow: '0 0 80px rgba(139,92,246,0.2), 0 0 160px rgba(59,130,246,0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        <canvas ref={canvasRef} style={{ display: 'block', maxWidth: '100%' }} />
      </div>
    </motion.div>
  );
}
