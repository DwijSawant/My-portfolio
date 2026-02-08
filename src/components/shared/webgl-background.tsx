'use client';

import React, { useEffect, useRef } from 'react';

const FRAGMENT_SHADER = `
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec4 iMouse;
uniform sampler2D iChannel0;

// Suble interstellar nebula effect with Bitcoin Orange palette
void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    vec2 p = -1.0 + 2.0 * uv;
    p.x *= iResolution.x / iResolution.y;

    // Mouse interaction influence
    vec2 m = iMouse.xy / iResolution.xy;
    p += (m - 0.5) * 0.3;

    float t = iTime * 0.05;
    
    // Generative space dust/nebula
    float strength = 8.0;
    float accum = 0.0;
    float prev = 0.0;
    float tw = 0.0;
    for (int i = 0; i < 14; i++) {
        float mag = dot(p, p);
        p = abs(p) / mag + vec2(-0.5, -0.4 + t * 0.1);
        float w = exp(-float(i) / strength);
        accum += w * exp(-strength * pow(abs(mag - prev), 2.2));
        tw += w;
        prev = mag;
    }
    
    float intensity = clamp(accum / tw, 0.0, 1.0);
    
    // Bitcoin Orange color palette: HSL(33, 94%, 54%)
    vec3 col = vec3(1.0, 0.5, 0.1) * intensity;
    col += vec3(0.1, 0.05, 0.0) * intensity * 2.5; // Deep orange glow
    
    // Subtle star-like grain
    float noise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
    col += noise * 0.015;

    gl_FragColor = vec4(col * intensity, 1.0);
}
`;

export function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    setCanvasSize();

    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!program || !vs || !fs) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      resolution: gl.getUniformLocation(program, 'iResolution'),
      time: gl.getUniformLocation(program, 'iTime'),
      mouse: gl.getUniformLocation(program, 'iMouse'),
      texture: gl.getUniformLocation(program, 'iChannel0'),
    };

    let mouse = [0, 0];
    const handleMouseMove = (e: MouseEvent) => {
      mouse = [e.clientX, canvas.height - e.clientY];
    };
    window.addEventListener('mousemove', handleMouseMove);

    const texture = gl.createTexture();
    const setupTexture = () => {
      if (!imgRef.current) return;
      try {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgRef.current);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      } catch (e) {
        console.error("WebGL Texture Setup Error:", e);
      }
    };

    if (imgRef.current?.complete) {
      setupTexture();
    } else if (imgRef.current) {
      imgRef.current.onload = setupTexture;
    }

    let animationFrameId: number;
    const startTime = performance.now();
    const render = () => {
      const currentTime = (performance.now() - startTime) / 1000;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform3f(uniforms.resolution, canvas.width, canvas.height, 1.0);
      gl.uniform1f(uniforms.time, currentTime);
      gl.uniform4f(uniforms.mouse, mouse[0], mouse[1], 0, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uniforms.texture, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    window.addEventListener('resize', setCanvasSize);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 h-full w-full pointer-events-none"
        style={{ background: '#000' }}
      />
      <img
        ref={imgRef}
        id="sourceImage"
        src="https://picsum.photos/seed/interstellar/64/64"
        alt=""
        className="hidden"
        crossOrigin="anonymous"
      />
    </>
  );
}
