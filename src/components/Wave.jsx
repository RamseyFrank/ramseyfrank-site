import { useEffect, useRef } from "react";

export default function Wave({ lightMode = false }) {
  const pathRefs = useRef([]);
  const animationRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const widthStep = 4;
    let waveWidth = window.innerWidth;
    let pointsCount = Math.ceil(waveWidth / widthStep) + 1;

    const waveConfigs = [
      { 
        offsetY: -80, 
        amplitude: 60, 
        speed: 50, 
        wavelength: 200,
        color: '#6B7280',
        opacity: 0.25
      },
      { 
        offsetY: -40, 
        amplitude: 65, 
        speed: 45, 
        wavelength: 220,
        color: '#9CA3AF',
        opacity: 0.35
      },
      { 
        offsetY: 0, 
        amplitude: 70, 
        speed: 40, 
        wavelength: 240,
        color: '#6b7078',
        opacity: 0.30
      },
      { 
        offsetY: 40, 
        amplitude: 65, 
        speed: 35, 
        wavelength: 260,
        color: '#9CA3AF',
        opacity: 0.35
      },
      { 
        offsetY: 80, 
        amplitude: 60, 
        speed: 30, 
        wavelength: 300,
        color: '#6B7280',
        opacity: 0.25
      }
    ];

    const wavesOffsets = waveConfigs.map(() => 
      Array.from({ length: pointsCount }, () => (Math.random() - 0.5) * 1.5)
    );

    let t = 0;
    let prevTime = performance.now();

    function animate(currentTime) {
      const deltaTime = (currentTime - prevTime) / 16.67;
      prevTime = currentTime;
      
      t += 0.01 * deltaTime;

      const centerY = window.innerHeight / 2;
      const leftPadding = 100;
      const rightPadding = 100;

      waveConfigs.forEach((config, waveIndex) => {
        const path = pathRefs.current[waveIndex];
        if (!path) return;

        const points = [];
        const strokeWidths = [];
        const offsets = wavesOffsets[waveIndex];

        const extendedPointsCount = pointsCount + Math.ceil((leftPadding + rightPadding) / widthStep);
        
        for (let i = 0; i < extendedPointsCount; i++) {
          const x = (i * widthStep) - leftPadding;
          
          const wave1 = Math.sin((x + t * config.speed) / config.wavelength) * config.amplitude;
          const wave2 = Math.sin((x + t * (config.speed * 0.6)) / (config.wavelength * 1.5)) * (config.amplitude * 0.3);
          const offsetIndex = Math.min(i, offsets.length - 1);
          const y = centerY + config.offsetY + wave1 + wave2 + offsets[offsetIndex];
          
          const thicknessWave1 = Math.sin((x + t * 40) / (config.wavelength * 0.8));
          const thicknessWave2 = Math.sin((x - t * 60) / (config.wavelength * 1.2));
          const combinedThickness = (thicknessWave1 + thicknessWave2 * 0.5) / 1.5;
          const normalizedThickness = (combinedThickness + 1) / 2;
          const thickness = 1 + normalizedThickness * 99;
          
          points.push({ x, y });
          strokeWidths.push(thickness);
        }

        let d = `M ${points[0].x} ${points[0].y} `;
        const tension = 0.5;
        
        for (let i = 0; i < points.length - 1; i++) {
          const p0 = points[Math.max(i - 1, 0)];
          const p1 = points[i];
          const p2 = points[i + 1];
          const p3 = points[Math.min(i + 2, points.length - 1)];
          
          const cp1x = p1.x + (p2.x - p0.x) / (6 / tension);
          const cp1y = p1.y + (p2.y - p0.y) / (6 / tension);
          const cp2x = p2.x - (p3.x - p1.x) / (6 / tension);
          const cp2y = p2.y - (p3.y - p1.y) / (6 / tension);
          
          d += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y} `;
        }

        path.setAttribute("d", d);
        
        const sortedWidths = [...strokeWidths].sort((a, b) => a - b);
        const medianThickness = sortedWidths[Math.floor(sortedWidths.length / 2)];
        path.style.strokeWidth = `${medianThickness}px`;
      });

      animationRef.current = requestAnimationFrame(animate);
    }

    function handleResize() {
      waveWidth = window.innerWidth;
      pointsCount = Math.ceil(waveWidth / widthStep) + 1;
      wavesOffsets.forEach((_, index) => {
        wavesOffsets[index] = Array.from({ length: pointsCount }, () => (Math.random() - 0.5) * 1.5);
      });
      
      if (svgRef.current) {
        svgRef.current.setAttribute(
          "viewBox",
          `-100 0 ${window.innerWidth + 200} ${window.innerHeight}`
        );
      }
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('zoom', handleResize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('zoom', handleResize);
    };
  }, []);

  const waveConfigs = lightMode ? [
    { color: '#FFB38A', opacity: 0.15 },
    { color: '#FFC4A3', opacity: 0.2 },
    { color: '#FFD4BC', opacity: 0.25 },
    { color: '#FFC4A3', opacity: 0.2 },
    { color: '#FFB38A', opacity: 0.15 }
  ] : [
    { color: '#6B7280', opacity: 0.06 },
    { color: '#9CA3AF', opacity: 0.1 },
    { color: '#D1D5DB', opacity: 0.12 },
    { color: '#9CA3AF', opacity: 0.1 },
    { color: '#6B7280', opacity: 0.06 }
  ];

  return (
    <svg
      ref={svgRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
      }}
      viewBox={`-100 0 ${window.innerWidth + 200} ${window.innerHeight}`}
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {waveConfigs.map((config, index) => (
        <path
          key={index}
          ref={el => pathRefs.current[index] = el}
          fill="none"
          stroke={config.color}
          strokeOpacity={config.opacity}
          strokeLinejoin="round"
          strokeLinecap="round"
          filter="url(#glow)"
          style={{
            willChange: 'transform',
            shapeRendering: 'geometricPrecision',
            transition: 'stroke 0.6s ease, stroke-opacity 0.6s ease'
          }}
        />
      ))}
    </svg>
  );
}