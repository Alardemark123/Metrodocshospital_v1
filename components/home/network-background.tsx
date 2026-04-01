"use client";

import { useEffect, useRef } from "react";

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      colorOpacity: number;
      isLarge: boolean;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4; 
        this.vy = (Math.random() - 0.5) * 0.4;
        
        // 12% chance to be a large "molecule" node
        this.isLarge = Math.random() > 0.88; 
        this.radius = this.isLarge ? Math.random() * 6 + 6 : Math.random() * 2 + 1.5; 
        
        this.colorOpacity = this.isLarge ? 0.8 : Math.random() * 0.5 + 0.1;
      }

      update(width: number, height: number) {
        if (this.x < -50 || this.x > width + 50) this.vx = -this.vx;
        if (this.y < -50 || this.y > height + 50) this.vy = -this.vy;
        this.x += this.vx;
        this.y += this.vy;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 93, 60, ${this.colorOpacity})`; // #255d3c
        ctx.fill();
        
        // Subtle outline for larger nodes to enhance the molecule effect
        if (this.isLarge) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius + 3, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(37, 93, 60, 0.15)`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
      }
    }

    const init = () => {
      resizeCanvas();
      particles = [];
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;
      
      // Calculate dynamic density
      const density = window.innerWidth < 768 ? 16000 : 12000;
      const numParticles = Math.min(Math.floor((w * h) / density), 150); 
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(w, h));
      }
    };

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(w, h);
        particles[i].draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 140;
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            const opacity = (1 - dist / maxDist) * 0.3;
            const isConnectingLarge = particles[i].isLarge || particles[j].isLarge;
            
            ctx.strokeStyle = `rgba(37, 93, 60, ${opacity})`;
            ctx.lineWidth = isConnectingLarge ? 1.2 : 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Delay init slightly to ensure parent container has rendered its dimensions
    setTimeout(() => {
        init();
        animate();
    }, 50);

    const handleResize = () => {
        init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)"
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-[0.45]"
      />
    </div>
  );
}
