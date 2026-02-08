'use client';

import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uTimeSpeed;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform float uZoom;
uniform vec2 uCenter;

varying vec2 vUv;

// Simple 2D noise
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// FBM (Fractal Brownian Motion)
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.0;
    a *= 0.5;
  }
  return v;
}

vec3 saturation(vec3 rgb, float adjustment) {
  const vec3 W = vec3(0.2125, 0.7154, 0.0721);
  vec3 intensity = vec3(dot(rgb, W));
  return mix(intensity, rgb, adjustment);
}

void main() {
  vec2 uv = (vUv - 0.5) * uZoom + 0.5 + uCenter;
  float aspect = uResolution.x / uResolution.y;
  uv.x *= aspect;

  float t = uTime * uTimeSpeed;
  
  // Warping effect
  vec2 p = uv * uWarpFrequency;
  vec2 warp = vec2(
    fbm(p + t * uWarpSpeed),
    fbm(p - t * uWarpSpeed)
  ) * uWarpStrength;
  
  uv += warp * (uWarpAmplitude / 100.0);

  // Colors
  float n1 = fbm(uv * uNoiseScale + t);
  float n2 = fbm(uv * (uNoiseScale * 0.5) - t * 0.5);
  
  vec3 col = mix(uColor1, uColor2, n1);
  col = mix(col, uColor3, n2);

  // Post-processing
  col = saturation(col, uSaturation);
  col = pow(col, vec3(uGamma));
  col = (col - 0.5) * uContrast + 0.5;

  // Grain
  float grain = (hash(vUv * uGrainScale + uTime) - 0.5) * uGrainAmount;
  col += grain;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

interface GrainientProps {
  color1?: string;
  color2?: string;
  color3?: string;
  timeSpeed?: number;
  colorBalance?: number;
  warpStrength?: number;
  warpFrequency?: number;
  warpSpeed?: number;
  warpAmplitude?: number;
  blendAngle?: number;
  blendSoftness?: number;
  rotationAmount?: number;
  noiseScale?: number;
  grainAmount?: number;
  grainScale?: number;
  grainAnimated?: boolean;
  contrast?: number;
  gamma?: number;
  saturation?: number;
  centerX?: number;
  centerY?: number;
  zoom?: number;
  className?: string;
}

export default function Grainient({
  color1 = '#000000',
  color2 = '#a30505',
  color3 = '#13101e',
  timeSpeed = 0.25,
  warpStrength = 1,
  warpFrequency = 5,
  warpSpeed = 2,
  warpAmplitude = 50,
  noiseScale = 2,
  grainAmount = 0.1,
  grainScale = 2,
  contrast = 1.5,
  gamma = 1,
  saturation = 1,
  centerX = 0,
  centerY = 0,
  zoom = 0.9,
  className = '',
}: GrainientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    const renderer = new Renderer({ alpha: false, antialias: true });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      return [r, g, b];
    };

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Color(gl.canvas.width, gl.canvas.height, 0) },
        uColor1: { value: new Float32Array(hexToRgb(color1)) },
        uColor2: { value: new Float32Array(hexToRgb(color2)) },
        uColor3: { value: new Float32Array(hexToRgb(color3)) },
        uTimeSpeed: { value: timeSpeed },
        uWarpStrength: { value: warpStrength },
        uWarpFrequency: { value: warpFrequency },
        uWarpSpeed: { value: warpSpeed },
        uWarpAmplitude: { value: warpAmplitude },
        uNoiseScale: { value: noiseScale },
        uGrainAmount: { value: grainAmount },
        uGrainScale: { value: grainScale * 500 },
        uContrast: { value: contrast },
        uGamma: { value: gamma },
        uSaturation: { value: saturation },
        uZoom: { value: zoom },
        uCenter: { value: new Float32Array([centerX, centerY]) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = new Color(width, height, 0);
    }

    window.addEventListener('resize', resize);
    resize();

    let raf: number;
    function update(t: number) {
      raf = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    }
    raf = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [
    color1, color2, color3, timeSpeed, warpStrength, warpFrequency, 
    warpSpeed, warpAmplitude, noiseScale, grainAmount, grainScale, 
    contrast, gamma, saturation, centerX, centerY, zoom
  ]);

  return <div ref={containerRef} className={`w-full h-full relative ${className}`} />;
}
