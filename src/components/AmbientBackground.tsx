import { useEffect, useRef } from 'react';
import {
  hexToRgb01,
  rgbToOklab,
  rgbToOklch,
  unwrapHueStops,
} from '../utils/portfolioMath';

interface AmbientBackgroundProps {
  built: boolean;
  reducedMotion: boolean;
}

const CONFIG = {
  angle: 55,
  flow: 0.9,
  scale: 1,
  silk: 0.35,
  speed: 1,
  seed: [0, 0] as [number, number],
  grainSize: 1.3,
  aurora: {
    amp: 1,
    blend: 0.55,
    height: 0.36,
    glow: 0.7,
    scale: 1,
    layers: 2,
    speed: 0.8,
  },
  dark: {
    ramp: ['#080506', '#10090b', '#1a0d12', '#29131b', '#3c1925'],
    stops: ['#7a2f41', '#9b3b4f', '#7a2f41'],
    bright: 0.22,
    grain: 0.055,
  },
  fps: 30,
  fieldMax: 720,
  dpr: 1,
};

const fNum = (n: number) => Number(n).toFixed(5);
const RAD = (CONFIG.angle * Math.PI) / 180;

const FIELD_FRAGMENT = `#version 300 es
precision highp float;
#define N_RAMP ${CONFIG.dark.ramp.length}
#define N_STOPS ${CONFIG.dark.stops.length}
#define N_LAYERS ${CONFIG.aurora.layers}
#define N_STIR 12
#define N_TWIRL 2
const vec2 DIR=vec2(${fNum(Math.sin(RAD))},${fNum(Math.cos(RAD))});
const vec2 SEED=vec2(${fNum(CONFIG.seed[0])},${fNum(CONFIG.seed[1])});
const float FLOW=${fNum(CONFIG.flow)},SCALE=${fNum(CONFIG.scale)},SILK=${fNum(CONFIG.silk)};
const float AMP=${fNum(CONFIG.aurora.amp)},BLEND=${fNum(CONFIG.aurora.blend)},HEIGHT=${fNum(CONFIG.aurora.height)},GLOW=${fNum(CONFIG.aurora.glow)},BRIGHT=${fNum(CONFIG.dark.bright)},ASCALE=${fNum(CONFIG.aurora.scale)};
uniform vec2 uRes;
uniform float uTime,uAT,uReveal;
uniform vec3 uRamp[N_RAMP];
uniform vec3 uStops[N_STOPS];
uniform vec4 uStir[N_STIR];
uniform float uStirW[N_STIR];
uniform vec4 uTwirl[N_TWIRL];
uniform vec3 uPtr;
in vec2 vUv;
out vec4 o;
float gExt,gSettle;

vec2 hash2(vec2 p){vec3 q=fract(vec3(p.xyx)*vec3(.1031,.103,.0973));q+=dot(q,q.yzx+33.33);return fract((q.xx+q.yz)*q.zy)*2.-1.;}
float noise(vec2 p){
 vec2 i=floor(p),f=fract(p),u=f*f*f*(f*(f*6.-15.)+10.);
 float a=dot(hash2(i),f),b=dot(hash2(i+vec2(1.,0.)),f-vec2(1.,0.)),c=dot(hash2(i+vec2(0.,1.)),f-vec2(0.,1.)),d=dot(hash2(i+vec2(1.,1.)),f-vec2(1.));
 return .5+.5*mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
vec2 drift(vec2 p,float t){
 vec2 w1=vec2(noise(p*.85+vec2(t*.11,t*.07)),noise(p*.85+vec2(4.1,1.7)-vec2(t*.08,t*.12)));
 vec2 w2=vec2(noise(p*1.55+w1*1.8+vec2(1.3,7.1)+t*.05),noise(p*1.55+w1*1.8+vec2(6.4,2.2)-t*.06));
 return (w1-.5)*1.1+(w2-.5)*.55;
}
float coord(vec2 p){
 vec2 q=p/SCALE+vec2(-DIR.y,DIR.x)*uTime*.45;
 vec2 w=p+drift(q+SEED,uTime)*FLOW*SCALE*gSettle;
 return dot(w,DIR)/gExt+.5;
}

vec3 permute(vec3 x){return mod(((x*34.)+1.)*x,289.);}
float snoise(vec2 v){
 const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
 vec2 i=floor(v+dot(v,C.yy)),x0=v-i+dot(i,C.xx);
 vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
 vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;
 i=mod(i,289.);
 vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
 vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
 m=m*m;m=m*m;
 vec3 x=2.*fract(p*C.www)-1.,h=abs(x)-.5,ox=floor(x+.5),a0=x-ox;
 m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
 vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;
 return 130.*dot(m,g);
}
float sstep(float e0,float e1,float x){float t=clamp((x-e0)/(e1-e0),0.,1.);return t*t*t*(t*(t*6.-15.)+10.);}

vec3 labToRgb(vec3 c){
 float l=c.x+.3963377774*c.y+.2158037573*c.z,m=c.x-.1055613458*c.y-.0638541728*c.z,s=c.x-.0894841775*c.y-1.291485548*c.z;
 l=l*l*l;m=m*m*m;s=s*s*s;
 return vec3(4.0767416621*l-3.3077115913*m+.2309699292*s,-1.2684380046*l+2.6097574011*m-.3413193965*s,-.0041960863*l-.7034186147*m+1.707614701*s);
}
vec3 encode(vec3 c){c=clamp(c,0.,1.);return mix(c*12.92,1.055*pow(c,vec3(1./2.4))-.055,step(.0031308,c));}
vec3 aramp(float t){
 float x=clamp(t,0.,1.)*float(N_STOPS-1);
 int i=int(min(floor(x),float(N_STOPS-2)));
 float f=x-float(i);f=f*f*(3.-2.*f);
 vec3 lch=mix(uStops[i],uStops[i+1],f);
 return encode(labToRgb(vec3(lch.x,lch.y*cos(lch.z),lch.y*sin(lch.z))));
}

void main(){
 float aspect=uRes.x/uRes.y;
 gExt=aspect*abs(DIR.x)+abs(DIR.y);
 float rv=min(1.,uReveal*1.5);
 gSettle=rv*rv*(3.-2.*rv);

 vec2 p=(vUv-.5)*vec2(aspect,1.);
 for(int i=0;i<N_STIR;i++){float w=uStirW[i];if(w<=0.)continue;vec2 d=p-uStir[i].xy;p-=uStir[i].zw*w*exp(-dot(d,d)/.045);}
 for(int i=0;i<N_TWIRL;i++){float an=uTwirl[i].z;if(an==0.)continue;vec2 d=p-uTwirl[i].xy;float a=an*exp(-dot(d,d)/(uTwirl[i].w*uTwirl[i].w));float c=cos(a),s=sin(a);p=uTwirl[i].xy+mat2(c,-s,s,c)*d;}
 float raw=coord(p);
 float sc=clamp(raw,0.,1.)*float(N_RAMP-1);
 int idx=int(min(floor(sc),float(N_RAMP-2)));
 float fr=sc-float(idx);
 vec3 lab=mix(uRamp[idx],uRamp[idx+1],fr*fr*(3.-2.*fr));
 vec2 grad=vec2(coord(p+vec2(.004,0.))-raw,coord(p+vec2(0.,.004))-raw)/.004;
 vec2 slope=grad*sin(3.14159265*clamp(raw,0.,1.))*SILK*4.;
 vec3 nrm=normalize(vec3(-slope,1.));
 vec3 light=normalize(vec3(-DIR.y,DIR.x,1.2));
 float dif=dot(nrm,light)-light.z;
 lab=uRamp[0]+(lab-uRamp[0])*(1.+(dif*.35+max(dif,0.)*dif*.6)*SILK);
 lab=mix(uRamp[0],lab,smoothstep(0.,1.,rv*1.5-length(vUv-.5)*.6));
 vec3 base=encode(labToRgb(lab));

 float y=1.-gl_FragCoord.y/uRes.y,u=gl_FragCoord.x/uRes.x,X=(gl_FragCoord.x-uRes.x*.5)/uRes.y;
 float ar=1.-pow(1.-uReveal,3.);
 float reach=uPtr.z*exp(-pow((X-uPtr.x)/.38,2.));
 vec3 glow=vec3(0.);
 for(int k=0;k<N_LAYERS;k++){
  float layer=float(k),seed=layer*13.7,pace=uAT*(1.-layer*.18);
  float wp=snoise(vec2(X*.45*ASCALE+pace*.02+seed,pace*.05+seed));
  float wave=snoise(vec2(X*.75*ASCALE+wp*.35-pace*.03+seed,pace*.07-seed))*.72+snoise(vec2(X*1.6*ASCALE+wp*.5+pace*.04-seed,pace*.1+seed*.5))*.28;
  float hem=HEIGHT+layer*.07+wave*.15*AMP;
  hem+=reach*.08*(layer<.5?1.:.4);
  hem=mix(-.25,hem,ar);
  float soft=(.04+BLEND*.16)*(1.+layer*.9);
  float rise=hem-y;
  float body=pow(sstep(-soft-GLOW*.14,.26+soft*.6,rise),1.5+GLOW*.6);
  float lobes=.86+.14*snoise(vec2(X*.9*ASCALE-pace*.025+seed,y*.3+pace*.04));
  float alpha=body*lobes*(layer<.5?1.:.32/layer);
  alpha=clamp(alpha*(1.+reach*.25*sstep(.9,0.,abs(y-hem))),0.,1.);
  vec3 tint=aramp(u+.05*sin(pace*.08+layer*2.3)+layer*.1+max(rise,0.)*.05);
  glow=1.-(1.-glow)*(1.-tint*alpha);
 }
 float fade=sstep(0.,.7,ar);
 vec3 night=1.-(1.-base)*(1.-glow*fade*BRIGHT);
 o=vec4(night,1.);
}`;

const GRAIN_FRAGMENT = `#version 300 es
precision highp float;
uniform sampler2D uField;
uniform float uGrain,uGrainSize,uFrame;
in vec2 vUv;
out vec4 o;
float hash(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
float clump(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);}
void main(){
 vec3 c=texture(uField,vUv).rgb;
 vec2 px=gl_FragCoord.xy+uFrame*vec2(17.,59.);
 float fine=hash(px)+hash(px+7.13)-1.;
 float coarse=(clump(px/max(uGrainSize,1.))-.5)*2.;
 float g=mix(fine,coarse,clamp(uGrainSize-1.,0.,1.)*.8);
 float l=dot(c,vec3(.2126,.7152,.0722));
 c+=g*uGrain*(.45+2.2*l*(1.-l));
 o=vec4(clamp(c,0.,1.),1.);
}`;

const VERTEX_SHADER = `#version 300 es
out vec2 vUv;
void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));vUv=p;gl_Position=vec4(p*2.-1.,0.,1.);}`;

interface StirItem {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  grow: number;
  done: boolean;
}

interface TwirlItem {
  x: number;
  y: number;
  age: number;
  dir: number;
}

interface CompiledProg {
  p: WebGLProgram;
  u: Record<string, WebGLUniformLocation | null>;
}

export function AmbientBackground({ built, reducedMotion }: AmbientBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<{ set: (on: boolean) => void } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const STIR_LIFE = 1.2;
    const TWIRL_LIFE = 2.6;

    const rampData = new Float32Array(
      CONFIG.dark.ramp.flatMap((hex) => rgbToOklab(hexToRgb01(hex)))
    );
    const stopsData = new Float32Array(
      unwrapHueStops(CONFIG.dark.stops.map((hex) => rgbToOklch(hexToRgb01(hex)))).flat()
    );

    const stirVec = new Float32Array(48);
    const stirW = new Float32Array(12);
    const twirlVec = new Float32Array(8);
    const stirs: StirItem[] = [];
    const twirls: TwirlItem[] = [];
    const ptr = { x: 0.5, y: 0.5, sx: 0.5, sy: 0.5, vx: 0, inside: false, fresh: true };

    let gl: WebGL2RenderingContext | null = null;
    let progField: CompiledProg | null = null;
    let progGrain: CompiledProg | null = null;
    let vao: WebGLVertexArrayObject | null = null;
    let tex: WebGLTexture | null = null;
    let fb: WebGLFramebuffer | null = null;
    let fw = 0;
    let fh = 0;
    let cw = 0;
    let ch = 0;
    let dpr = 1;
    let rafId = 0;
    let lastTick = 0;
    let active = false;
    let failed = false;
    let fadeTimer = 0;
    let uTime = 0;
    let uAT = 0;
    let uReveal = 0;
    let uFrame = 0;
    let ptrX = 0;
    let ptrY = 0.4;
    let ptrWeight = 0;

    const compileProg = (fragSrc: string): CompiledProg | null => {
      if (!gl) return null;
      const makeShader = (type: number, src: string) => {
        if (!gl) return null;
        const sh = gl.createShader(type);
        if (!sh) return null;
        gl.shaderSource(sh, src);
        gl.compileShader(sh);
        return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
      };
      const vs = makeShader(gl.VERTEX_SHADER, VERTEX_SHADER);
      const fs = makeShader(gl.FRAGMENT_SHADER, fragSrc);
      if (!vs || !fs) return null;
      const prog = gl.createProgram();
      if (!prog) return null;
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;

      const uniforms: Record<string, WebGLUniformLocation | null> = {};
      const count = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
      for (let i = count - 1; i >= 0; i--) {
        const info = gl.getActiveUniform(prog, i);
        if (!info) continue;
        const name = info.name.replace('[0]', '');
        uniforms[name] = gl.getUniformLocation(prog, name);
      }
      return { p: prog, u: uniforms };
    };

    const initGL = (): boolean => {
      if (gl) return true;
      if (failed) return false;
      const ctx = canvas.getContext('webgl2', {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: 'low-power',
      });
      if (!ctx) {
        failed = true;
        container.classList.add('flat');
        return false;
      }
      gl = ctx;
      progField = compileProg(FIELD_FRAGMENT);
      progGrain = compileProg(GRAIN_FRAGMENT);
      if (!progField || !progGrain) {
        gl = null;
        failed = true;
        container.classList.add('flat');
        return false;
      }
      vao = gl.createVertexArray();
      tex = gl.createTexture();
      fb = gl.createFramebuffer();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      fw = fh = cw = ch = 0;
      return true;
    };

    const renderFrame = () => {
      if (!gl || !progField || !progGrain) return;
      gl.bindVertexArray(vao);
      gl.disable(gl.BLEND);
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
      gl.viewport(0, 0, fw, fh);
      gl.useProgram(progField.p);
      const u = progField.u;
      gl.uniform2f(u.uRes, fw, fh);
      gl.uniform1f(u.uTime, uTime);
      gl.uniform1f(u.uAT, uAT);
      gl.uniform1f(u.uReveal, uReveal);
      gl.uniform3fv(u.uRamp, rampData);
      gl.uniform3fv(u.uStops, stopsData);
      gl.uniform4fv(u.uStir, stirVec);
      gl.uniform1fv(u.uStirW, stirW);
      gl.uniform4fv(u.uTwirl, twirlVec);
      gl.uniform3f(u.uPtr, ptrX, ptrY, ptrWeight);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, cw, ch);
      gl.useProgram(progGrain.p);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.uniform1i(progGrain.u.uField, 0);
      gl.uniform1f(progGrain.u.uGrain, CONFIG.dark.grain);
      gl.uniform1f(progGrain.u.uGrainSize, CONFIG.grainSize * dpr);
      gl.uniform1f(progGrain.u.uFrame, uFrame);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resizeGL = () => {
      if (!gl) return;
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      dpr = Math.min(window.devicePixelRatio || 1, CONFIG.dpr);
      const nextW = Math.max(1, Math.round(w * dpr));
      const nextH = Math.max(1, Math.round(h * dpr));
      if (nextW === cw && nextH === ch) return;
      cw = canvas.width = nextW;
      ch = canvas.height = nextH;
      const scale = Math.min(0.5, CONFIG.fieldMax / Math.max(w, h));
      const nextFW = Math.max(2, Math.round(w * scale));
      const nextFH = Math.max(2, Math.round(h * scale));
      if (nextFW !== fw || nextFH !== fh) {
        fw = nextFW;
        fh = nextFH;
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, fw, fh, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }
      renderFrame();
    };

    const stepSimulation = (dt: number) => {
      uTime += dt * CONFIG.speed * 0.16;
      uAT += dt * CONFIG.aurora.speed;
      uFrame = (uFrame + 1) % 97;
      if (uReveal < 1) uReveal = Math.min(1, uReveal + dt / 2.4);

      const aspect = fw / Math.max(1, fh);
      const smooth = 1 - Math.exp(-dt / 0.06);
      const prevSx = ptr.sx;
      const prevSy = ptr.sy;
      ptr.sx += (ptr.x - ptr.sx) * smooth;
      ptr.sy += (ptr.y - ptr.sy) * smooth;
      const vx = ((ptr.sx - prevSx) / dt) * aspect;
      const vy = (ptr.sy - prevSy) / dt;
      ptr.vx = vx;

      const head = stirs[0];
      for (const s of stirs) {
        if (s.done) s.age += dt;
      }
      if (ptr.inside && Math.hypot(vx, vy) > 0.02) {
        if (!head || head.done) {
          stirs.unshift({ x: 0, y: 0, vx: 0, vy: 0, age: 0, grow: 0, done: false });
          if (stirs.length > 12) stirs.pop();
        }
        const cur = stirs[0];
        if (cur) {
          cur.x = (ptr.sx - 0.5) * aspect;
          cur.y = ptr.sy - 0.5;
          cur.vx = vx;
          cur.vy = vy;
          cur.grow = Math.min(1, cur.grow + dt / 0.1);
          cur.done = cur.grow >= 1;
        }
      } else if (head) {
        head.done = true;
      }
      while (stirs.length && stirs[stirs.length - 1].age > STIR_LIFE) stirs.pop();
      for (let i = 0; i < 12; i++) {
        const s = stirs[i];
        if (!s) {
          stirW[i] = 0;
          continue;
        }
        const life = 1 - s.age / STIR_LIFE;
        const speedClamp = Math.min(1, 2.2 / Math.max(Math.hypot(s.vx, s.vy), 0.001));
        stirVec.set([s.x, s.y, s.vx * speedClamp, s.vy * speedClamp], i * 4);
        stirW[i] = life * life * s.grow * 0.08;
      }

      for (const tw of twirls) tw.age += dt;
      while (twirls.length && twirls[twirls.length - 1].age > TWIRL_LIFE) twirls.pop();
      for (let i = 0; i < 2; i++) {
        const tw = twirls[i];
        if (!tw) {
          twirlVec[i * 4 + 2] = 0;
          continue;
        }
        const ageNorm = tw.age / TWIRL_LIFE;
        const amp = Math.min(1, tw.age / 0.18) * (1 - ageNorm) * (1 - ageNorm);
        twirlVec.set(
          [tw.x, tw.y, tw.dir * 2.4 * amp, 0.16 + 0.1 * Math.min(1, tw.age / 0.5)],
          i * 4
        );
      }

      const ptrBlend = 1 - Math.exp(-dt / 0.6);
      if (ptr.inside) {
        ptrX += ((ptr.x - 0.5) * aspect - ptrX) * ptrBlend;
        ptrY += (1 - ptr.y - ptrY) * ptrBlend;
      }
      ptrWeight += (+ptr.inside - ptrWeight) * (1 - Math.exp(-dt / (ptr.inside ? 0.9 : 1.4)));
    };

    const frameInterval = 1000 / CONFIG.fps - 2;
    const loop = (ts: number) => {
      rafId = 0;
      if (!active || document.hidden || !gl) return;
      if (ts - lastTick < frameInterval) {
        rafId = requestAnimationFrame(loop);
        return;
      }
      const dt = lastTick ? Math.min(0.05, (ts - lastTick) / 1000) : 1 / CONFIG.fps;
      lastTick = ts;
      stepSimulation(dt);
      renderFrame();
      rafId = requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const startOrRender = () => {
      if (active && gl && !document.hidden) {
        resizeGL();
        if (reducedMotion) {
          renderFrame();
        } else if (!rafId) {
          lastTick = 0;
          rafId = requestAnimationFrame(loop);
        }
      }
    };

    const updatePointer = (ev: PointerEvent) => {
      const nx = ev.clientX / window.innerWidth;
      const ny = 1 - ev.clientY / window.innerHeight;
      const wasInside = ptr.inside;
      ptr.inside = nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1;
      ptr.x = nx;
      ptr.y = ny;
      if (ptr.fresh || !ptr.inside) {
        ptr.sx = nx;
        ptr.sy = ny;
        ptr.fresh = false;
      }
      if (ptr.inside && !wasInside) {
        ptrX = (nx - 0.5) * (fw / Math.max(1, fh));
        ptrY = 1 - ny;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (active && !reducedMotion) updatePointer(e);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (active && !reducedMotion) {
        updatePointer(e);
        twirls.unshift({
          x: (ptr.x - 0.5) * (fw / Math.max(1, fh)),
          y: ptr.y - 0.5,
          age: 0,
          dir: ptr.vx < 0 ? 1 : -1,
        });
        if (twirls.length > 2) twirls.pop();
      }
    };
    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') ptr.inside = false;
    };
    const onPointerLeave = () => {
      ptr.inside = false;
    };
    const onVisibility = () => {
      if (document.hidden) stopLoop();
      else startOrRender();
    };
    const onContextLost = (e: Event) => {
      e.preventDefault();
      stopLoop();
      gl = null;
    };
    const onContextRestored = () => {
      if (initGL()) startOrRender();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);

    let resizeTimer = 0;
    const observer = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (gl && active) resizeGL();
      }, 120);
    });
    observer.observe(container);

    const warmTimer = window.setTimeout(() => {
      if (initGL() && !active) {
        resizeGL();
        renderFrame();
      }
    }, 60);

    const controller = {
      set: (next: boolean) => {
        if (next === active) return;
        active = next;
        window.clearTimeout(fadeTimer);
        if (next) {
          uReveal = reducedMotion ? 1 : 0;
          container.classList.add('on');
          if (initGL()) startOrRender();
        } else {
          container.classList.remove('on');
          fadeTimer = window.setTimeout(() => {
            if (!active) stopLoop();
          }, 1000);
        }
      },
    };
    controllerRef.current = controller;

    if (built) {
      controller.set(true);
    }

    return () => {
      controllerRef.current = null;
      window.clearTimeout(warmTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(resizeTimer);
      stopLoop();
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
    };
  }, [reducedMotion]);

  useEffect(() => {
    controllerRef.current?.set(built);
  }, [built]);

  return (
    <div id="bg" ref={containerRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
