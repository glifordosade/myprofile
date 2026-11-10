import React, { useEffect, useRef } from 'react';

export interface GradientWavesProps {
  horizonColor?: string;
  waveColor?: string;
  crestColor?: string;
  speed?: number;
  amplitude?: number;
  waveScale?: number;
  waveRatio?: number;
  swell?: number;
  turbulence?: number;
  tilt?: number;
  zoom?: number;
  height?: number;
  fogDepth?: number;
  brightness?: number;
  opacity?: number;
  mouseInteraction?: boolean;
  parallaxStrength?: number;
  grain?: boolean;
  grainIntensity?: number;
  className?: string;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0.1, 0.4, 0.3];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255
  ];
};

const vertexShaderSource = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uAmplitude;
uniform float uWaveScale;
uniform float uWaveRatio;
uniform float uSwell;
uniform float uTurbulence;
uniform float uTilt;
uniform float uZoom;
uniform float uHeight;
uniform float uFogDepth;
uniform float uSteps;
uniform float uBrightness;
uniform float uOpacity;
uniform float uGrain;
uniform float uGrainIntensity;
uniform vec2 uMouse;
uniform float uParallax;
uniform bool uEnableMouse;
uniform vec3 uHorizonColor;
uniform vec3 uWaveColor;
uniform vec3 uCrestColor;
out vec4 fragColor;

const float MAX_DIST = 10000.0;

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float plasma(vec3 r, vec2 freq, vec4 tc) {
  float mx = r.x + tc.x;
  mx += uSwell * sin((r.y + mx) / 20.0 + tc.y);
  float my = r.y - tc.z;
  my += uTurbulence * cos(r.x / 23.0 + tc.w);
  return r.z - (sin(mx * freq.x) * uAmplitude + sin(my * freq.y) * uAmplitude + uHeight);
}

float raymarch(vec3 pos, vec3 dir, vec2 freq, vec4 tc) {
  float dist = 0.0;
  for (int i = 0; i < 70; i++) {
    float dscene = plasma(pos + dist * dir, freq, tc);
    if (abs(dscene) < 0.1) break;
    dist += 0.9 * dscene;
    if (dist >= MAX_DIST) return MAX_DIST;
  }
  return dist;
}

void main() {
  float T = iTime * uSpeed;
  vec2 freq = vec2(uWaveScale / 7.0, (uWaveScale * uWaveRatio) / 3.0);
  vec4 tc = vec4(T / 0.130, T / 0.810, T / 0.200, T / 0.710);
  float c, s;
  float vfov = (3.14159 / 2.3) / max(uZoom, 0.05);
  vec3 cam = vec3(0.0, 0.0, 30.0);
  vec2 uv = (gl_FragCoord.xy / iResolution.xy) - 0.5;
  uv.x *= iResolution.x / iResolution.y;
  uv.y *= -1.0;

  vec3 dir = vec3(0.0, 0.0, -1.0);
  float ulen = length(uv);
  float xrot = vfov * ulen;
  c = cos(xrot); s = sin(xrot);
  dir = mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c) * dir;
  vec2 nuv = ulen > 1e-5 ? uv / ulen : vec2(1.0, 0.0);
  c = nuv.x; s = nuv.y;
  dir = mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0) * dir;
  c = cos(uTilt); s = sin(uTilt);
  dir = mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c) * dir;

  if (uEnableMouse) {
    float yaw = (uMouse.x - 0.5) * uParallax * 0.4;
    float pitch = (uMouse.y - 0.5) * uParallax * 0.4;
    c = cos(yaw); s = sin(yaw);
    dir = mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c) * dir;
    c = cos(pitch); s = sin(pitch);
    dir = mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c) * dir;
  }

  float dist = raymarch(cam, dir, freq, tc);
  vec3 pos = cam + dist * dir;

  float t = clamp(uFogDepth / max(dist, 0.001), 0.0, 1.0);
  vec3 body = mix(uWaveColor, uCrestColor, clamp(pos.z * 0.08 + 0.5, 0.0, 1.0));
  vec3 col = mix(uHorizonColor, body, t);
  col *= uBrightness;
  col = clamp(col, 0.0, 1.0);

  float alpha = clamp(t, 0.0, 1.0) * uOpacity;
  if (uGrain > 0.5) {
    float g = hash21(gl_FragCoord.xy + mod(iTime, 64.0) * 11.0);
    alpha += (g - 0.5) * uGrainIntensity;
  }
  alpha = clamp(alpha, 0.0, 1.0);
  fragColor = vec4(col * alpha, alpha);
}
`;

export const GradientWaves: React.FC<GradientWavesProps> = ({
  horizonColor = '#064e3b',
  waveColor = '#059669',
  crestColor = '#34d399',
  speed = 0.35,
  amplitude = 2.4,
  waveScale = 0.6,
  waveRatio = 0.9,
  swell = 30,
  turbulence = 18,
  tilt = 1.1,
  zoom = 1.0,
  height = 5.2,
  fogDepth = 16,
  brightness = 1.0,
  opacity = 0.85,
  mouseInteraction = true,
  parallaxStrength = 0.5,
  grain = true,
  grainIntensity = 0.04,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'absolute inset-0 w-full h-full pointer-events-none';
    container.appendChild(canvas);

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true
    });

    if (!gl) {
      // Fallback: graceful CSS gradient if WebGL2 is not supported
      canvas.remove();
      return;
    }

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn('Shader compile failed:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('Program link failed:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full screen triangle
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([-1, -1, 3, -1, -1, 3]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uLocs = {
      iTime: gl.getUniformLocation(program, 'iTime'),
      iResolution: gl.getUniformLocation(program, 'iResolution'),
      uSpeed: gl.getUniformLocation(program, 'uSpeed'),
      uAmplitude: gl.getUniformLocation(program, 'uAmplitude'),
      uWaveScale: gl.getUniformLocation(program, 'uWaveScale'),
      uWaveRatio: gl.getUniformLocation(program, 'uWaveRatio'),
      uSwell: gl.getUniformLocation(program, 'uSwell'),
      uTurbulence: gl.getUniformLocation(program, 'uTurbulence'),
      uTilt: gl.getUniformLocation(program, 'uTilt'),
      uZoom: gl.getUniformLocation(program, 'uZoom'),
      uHeight: gl.getUniformLocation(program, 'uHeight'),
      uFogDepth: gl.getUniformLocation(program, 'uFogDepth'),
      uBrightness: gl.getUniformLocation(program, 'uBrightness'),
      uOpacity: gl.getUniformLocation(program, 'uOpacity'),
      uGrain: gl.getUniformLocation(program, 'uGrain'),
      uGrainIntensity: gl.getUniformLocation(program, 'uGrainIntensity'),
      uMouse: gl.getUniformLocation(program, 'uMouse'),
      uParallax: gl.getUniformLocation(program, 'uParallax'),
      uEnableMouse: gl.getUniformLocation(program, 'uEnableMouse'),
      uHorizonColor: gl.getUniformLocation(program, 'uHorizonColor'),
      uWaveColor: gl.getUniformLocation(program, 'uWaveColor'),
      uCrestColor: gl.getUniformLocation(program, 'uCrestColor')
    };

    // Static uniform sets
    const hCol = hexToRgb(horizonColor);
    const wCol = hexToRgb(waveColor);
    const cCol = hexToRgb(crestColor);

    gl.uniform1f(uLocs.uSpeed, speed);
    gl.uniform1f(uLocs.uAmplitude, amplitude);
    gl.uniform1f(uLocs.uWaveScale, waveScale);
    gl.uniform1f(uLocs.uWaveRatio, waveRatio);
    gl.uniform1f(uLocs.uSwell, swell);
    gl.uniform1f(uLocs.uTurbulence, turbulence);
    gl.uniform1f(uLocs.uTilt, tilt);
    gl.uniform1f(uLocs.uZoom, zoom);
    gl.uniform1f(uLocs.uHeight, height);
    gl.uniform1f(uLocs.uFogDepth, fogDepth);
    gl.uniform1f(uLocs.uBrightness, brightness);
    gl.uniform1f(uLocs.uOpacity, opacity);
    gl.uniform1f(uLocs.uGrain, grain ? 1.0 : 0.0);
    gl.uniform1f(uLocs.uGrainIntensity, grainIntensity);
    gl.uniform1f(uLocs.uParallax, parallaxStrength);
    gl.uniform1i(uLocs.uEnableMouse, mouseInteraction ? 1 : 0);
    gl.uniform3f(uLocs.uHorizonColor, hCol[0], hCol[1], hCol[2]);
    gl.uniform3f(uLocs.uWaveColor, wCol[0], wCol[1], wCol[2]);
    gl.uniform3f(uLocs.uCrestColor, cCol[0], cCol[1], cCol[2]);

    let width = 0;
    let heightPx = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.floor(rect.width * dpr));
      heightPx = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== heightPx) {
        canvas.width = width;
        canvas.height = heightPx;
        gl.viewport(0, 0, width, heightPx);
        gl.uniform2f(uLocs.iResolution, width, heightPx);
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) / rect.width;
      targetMouseY = (e.clientY - rect.top) / rect.height;
    };

    if (mouseInteraction) {
      window.addEventListener('mousemove', handlePointerMove, { passive: true });
    }

    let animId = 0;
    let isVisible = true;
    const startTime = performance.now();

    const render = (now: number) => {
      if (!isVisible) return;
      const elapsed = (now - startTime) * 0.001;
      gl.uniform1f(uLocs.iTime, elapsed);

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      gl.uniform2f(uLocs.uMouse, mouseX, mouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      animId = requestAnimationFrame(render);
    };

    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && animId === 0) {
        animId = requestAnimationFrame(render);
      } else if (!isVisible && animId !== 0) {
        cancelAnimationFrame(animId);
        animId = 0;
      }
    });
    io.observe(container);

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      io.disconnect();
      if (mouseInteraction) {
        window.removeEventListener('mousemove', handlePointerMove);
      }
      try {
        canvas.remove();
        gl.deleteBuffer(positionBuffer);
        gl.deleteProgram(program);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
      } catch {}
    };
  }, [
    horizonColor,
    waveColor,
    crestColor,
    speed,
    amplitude,
    waveScale,
    waveRatio,
    swell,
    turbulence,
    tilt,
    zoom,
    height,
    fogDepth,
    brightness,
    opacity,
    mouseInteraction,
    parallaxStrength,
    grain,
    grainIntensity
  ]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};
