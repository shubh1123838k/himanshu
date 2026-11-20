import { useEffect, useRef } from 'react';
import { clamp, easeInOutCubic, isScrollIntentKey, randRange } from '../utils/portfolioMath';

interface BuildSwarmEngineProps {
  reducedMotion: boolean;
  onBuilt: () => void;
}

interface PageBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface BuildItem {
  el: HTMLElement;
  kind: 'box' | 'text';
  wire: HTMLDivElement | null;
  orig: string;
  finalOpacity: string;
  done: Promise<void>;
  finish: () => void;
}

interface BlockGroup {
  el: Element;
  items: BuildItem[];
  promise: Promise<void> | null;
  fin: boolean;
}

interface TimedWait {
  t: number;
  res: () => void;
}

interface TimedAnim {
  t0: number;
  dur: number;
  fn: (progress: number) => void;
  res: () => void;
}

interface AgentTask {
  (agent: SwarmAgent): Promise<void>;
}

interface IdleWaiter {
  a: SwarmAgent;
  res: (task: AgentTask) => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  k: number;
  c: string;
  s: number;
  ph: number;
  delay?: number;
  exitDur?: number;
}

const SWARM_COLORS = [
  '#ff6b5e',
  '#ffb02e',
  '#ffe14d',
  '#7dff8f',
  '#35e0c2',
  '#4db8ff',
  '#8f93ff',
  '#d07bff',
  '#ff7ac8',
];

const AGENT_LABELS = ['Layout', 'Type', 'Color', 'Motion', 'Content', 'Window'];
const AGENT_COUNT = 18;

const getPageBox = (el: Element): PageBox => {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY,
    w: rect.width,
    h: rect.height,
  };
};

const arrowSvg = (color: string) =>
  `<svg class="arrow" viewBox="0 0 17 22"><path d="M2 1.5v16l4.4-4 3 7 2.6-1.1-3-6.9h6z" fill="${color}" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/></svg>`;

class SwarmAgent {
  i: number;
  n: number;
  color: string;
  el: HTMLDivElement;
  phase: number;
  rad: number;
  w: number;
  x: number;
  y: number;
  vx = 0;
  vy = 0;
  idle = true;
  wt: { x: number; y: number } | null = null;
  wUntil = 0;
  private animate: (dur: number, fn: (p: number) => void) => Promise<void>;

  constructor(
    i: number,
    n: number,
    stage: HTMLElement,
    animate: (dur: number, fn: (p: number) => void) => Promise<void>
  ) {
    this.i = i;
    this.n = n;
    this.animate = animate;
    this.color = SWARM_COLORS[i % SWARM_COLORS.length];
    this.phase = randRange(Math.PI * 2);
    this.rad = randRange(0.75, 1.25);
    this.w = randRange(0.9, 1.5) * (Math.random() < 0.5 ? 1 : -1);
    this.x = window.innerWidth / 2 + randRange(-40, 40);
    this.y = window.innerHeight / 2 + randRange(-40, 40);

    const el = document.createElement('div');
    el.className = 'agent';
    el.style.color = this.color;
    el.innerHTML =
      arrowSvg(this.color) +
      '<svg class="cross" viewBox="0 0 18 18"><path d="M9 1v16M1 9h16" stroke="#050506" stroke-width="4.4" stroke-linecap="round"/><path d="M9 1v16M1 9h16" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>' +
      '<svg class="ibeam" viewBox="0 0 18 18"><path d="M5.5 1.5h7M5.5 16.5h7M9 1.5v15" stroke="#050506" stroke-width="4.2" stroke-linecap="round"/><path d="M5.5 1.5h7M5.5 16.5h7M9 1.5v15" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/></svg>' +
      '<span class="ring"></span>' +
      (AGENT_LABELS[i] ? `<label style="background:${this.color}">${AGENT_LABELS[i]}</label>` : '');

    this.el = el;
    stage.appendChild(el);
  }

  mode(m: 'arrow' | 'cross' | 'ibeam') {
    this.el.dataset.mode = m;
  }

  click() {
    this.el.classList.remove('click');
    void this.el.offsetWidth;
    this.el.classList.add('click');
  }

  moveTo(
    tx: number,
    ty: number,
    opts: { dur?: number; straight?: boolean } = {}
  ): Promise<void> {
    const sx = this.x;
    const sy = this.y;
    const dx = tx - sx;
    const dy = ty - sy;
    const dist = Math.hypot(dx, dy) || 1;
    const dur = opts.dur ?? clamp(170 + dist * 0.5, 210, 760);
    const arc = opts.straight ? 0 : randRange(-1, 1) * Math.min(140, dist * 0.3);
    const cx = (sx + tx) / 2 - (dy / dist) * arc;
    const cy = (sy + ty) / 2 + (dx / dist) * arc;

    this.vx = 0;
    this.vy = 0;

    return this.animate(dur, (p) => {
      const t = easeInOutCubic(p);
      const inv = 1 - t;
      this.x = inv * inv * sx + 2 * inv * t * cx + t * t * tx;
      this.y = inv * inv * sy + 2 * inv * t * cy + t * t * ty;
    });
  }

  drift(dt: number, now: number, formation: 'orbit' | 'wander' | 'ring') {
    let tx: number;
    let ty: number;

    if (formation === 'ring') {
      const target =
        document.querySelector('#footer .mark') ??
        document.querySelector('#footer') ??
        document.body;
      const box = getPageBox(target);
      const angle = (this.i / this.n) * Math.PI * 2 + now * 0.00035;
      tx = box.x + box.w / 2 + Math.cos(angle) * (box.w / 2 + 52) - 4;
      ty = box.y + box.h / 2 + Math.sin(angle) * (box.h / 2 + 30) - 7;
    } else if (formation === 'orbit') {
      const cx = window.scrollX + window.innerWidth / 2;
      const cy = window.scrollY + window.innerHeight / 2;
      const r = Math.min(window.innerWidth, window.innerHeight) * 0.14 * this.rad + 26;
      const angle = this.phase + now * 0.0011 * this.w;
      tx = cx + Math.cos(angle) * r * (1 + 0.18 * Math.sin(now * 0.002 + this.i));
      ty = cy + Math.sin(angle) * r;
    } else {
      if (
        !this.wt ||
        this.wt.y < window.scrollY - 40 ||
        this.wt.y > window.scrollY + window.innerHeight + 40 ||
        now > this.wUntil ||
        Math.hypot(this.wt.x - this.x, this.wt.y - this.y) < 12
      ) {
        this.wt = {
          x: window.scrollX + randRange(30, window.innerWidth - 40),
          y: window.scrollY + randRange(70, window.innerHeight - 110),
        };
        this.wUntil = now + randRange(1400, 3600);
      }
      tx = this.wt.x;
      ty = this.wt.y;
    }

    const gain = formation === 'wander' ? 1.5 : 5;
    const maxSpeed = formation === 'wander' ? 520 : formation === 'ring' ? 900 : 2200;
    let tvx = (tx - this.x) * gain;
    let tvy = (ty - this.y) * gain;
    const speed = Math.hypot(tvx, tvy);
    if (speed > maxSpeed) {
      tvx *= maxSpeed / speed;
      tvy *= maxSpeed / speed;
    }
    const lerp = Math.min(1, dt * 0.006);
    this.vx += (tvx - this.vx) * lerp;
    this.vy += (tvy - this.vy) * lerp;
    this.x += (this.vx * dt) / 1000;
    this.y += (this.vy * dt) / 1000;
  }

  render() {
    this.el.style.transform = `translate3d(${this.x.toFixed(1)}px,${this.y.toFixed(1)}px,0)`;
  }
}

export function BuildSwarmEngine({ reducedMotion, onBuilt }: BuildSwarmEngineProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const avsRef = useRef<HTMLSpanElement>(null);
  const agentsCountRef = useRef<HTMLElement>(null);
  const doneRef = useRef<HTMLElement>(null);
  const allRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);
  const replayBtnRef = useRef<HTMLButtonElement>(null);
  const onBuiltRef = useRef(onBuilt);
  onBuiltRef.current = onBuilt;

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const scan = scanRef.current;
    const hud = hudRef.current;
    const avs = avsRef.current;
    const agentsCountEl = agentsCountRef.current;
    const doneEl = doneRef.current;
    const allEl = allRef.current;
    const barEl = barRef.current;
    const statusEl = statusRef.current;
    const playBtn = playBtnRef.current;
    const skipBtn = skipBtnRef.current;
    const replayBtn = replayBtnRef.current;

    if (
      !stage ||
      !canvas ||
      !scan ||
      !hud ||
      !avs ||
      !agentsCountEl ||
      !doneEl ||
      !allEl ||
      !barEl ||
      !statusEl ||
      !playBtn ||
      !skipBtn ||
      !replayBtn
    ) {
      return;
    }

    let cancelled = false;

    try {
      history.scrollRestoration = 'manual';
    } catch {
      // Ignore unsupported browsers
    }

    let paused = false;
    let simTime = 0;
    let userScrolled = false;
    const waits = new Set<TimedWait>();
    const anims = new Set<TimedAnim>();
    const timeouts = new Set<number>();

    const safeTimeout = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timeouts.delete(id);
        if (!cancelled) fn();
      }, ms);
      timeouts.add(id);
      return id;
    };

    const wait = (ms: number): Promise<void> =>
      new Promise((res) => {
        if (cancelled) {
          res();
          return;
        }
        waits.add({ t: simTime + ms, res });
      });

    const animate = (dur: number, fn: (progress: number) => void): Promise<void> =>
      new Promise((res) => {
        if (cancelled) {
          res();
          return;
        }
        anims.add({ t0: simTime, dur: Math.max(1, dur), fn, res });
      });

    const clearTimeline = () => {
      waits.clear();
      anims.clear();
    };

    const onUserScrollIntent = (e: Event) => {
      if (e instanceof KeyboardEvent && !isScrollIntentKey(e.key)) return;
      userScrolled = true;
    };
    const scrollIntentEvents = ['wheel', 'touchstart', 'keydown'] as const;
    scrollIntentEvents.forEach((ev) =>
      window.addEventListener(ev, onUserScrollIntent, { passive: true })
    );

    const itemMap = new Map<HTMLElement, BuildItem>();
    const blocks: BlockGroup[] = [];
    let totalItems = 0;
    let doneItems = 0;

    const registerItem = (el: Element, kind: 'box' | 'text'): BuildItem | null => {
      if (!(el instanceof HTMLElement)) return null;
      const finalOpacity = getComputedStyle(el).opacity;
      el.classList.add('sw-i');
      el.inert = true;
      let resolveDone = () => {};
      const done = new Promise<void>((res) => {
        resolveDone = res;
      });
      const item: BuildItem = {
        el,
        kind,
        wire: null,
        orig: el.innerHTML,
        finalOpacity,
        done,
        finish: () => resolveDone(),
      };
      itemMap.set(el, item);
      totalItems += 1;
      return item;
    };

    const revealItem = (item: BuildItem) => {
      const el = item.el;
      if (!el.classList.contains('sw-i')) return;
      el.inert = false;
      el.style.opacity = item.finalOpacity;
      el.classList.add('on');
      safeTimeout(() => {
        if (el.classList.contains('sw-i')) {
          el.classList.remove('sw-i', 'on');
          el.style.opacity = '';
        }
      }, 260);
    };

    const finishItemImmediate = (item: BuildItem) => {
      item.el.inert = false;
      item.el.classList.remove('sw-i', 'on');
      item.el.style.opacity = '';
    };

    document.querySelectorAll('[data-block]').forEach((blockEl) => {
      const items = [...blockEl.querySelectorAll('[data-build]')]
        .filter((el) => !el.parentElement?.closest('[data-build]'))
        .map((el) =>
          registerItem(el, (el as HTMLElement).dataset.build === 'text' ? 'text' : 'box')
        )
        .filter((item): item is BuildItem => item !== null);
      if (items.length) {
        blocks.push({ el: blockEl, items, promise: null, fin: false });
      }
    });

    allEl.textContent = String(totalItems);

    const updateProgress = () => {
      doneEl.textContent = String(doneItems);
      barEl.style.width = totalItems > 0 ? `${(doneItems / totalItems) * 100}%` : '0%';
    };

    const setStatus = (text: string) => {
      statusEl.textContent = text;
    };

    const agents: SwarmAgent[] = [];
    let formation: 'orbit' | 'wander' | 'ring' = 'orbit';
    const taskQueue: AgentTask[] = [];
    const idleWaiters: IdleWaiter[] = [];

    const dispatchTask = (task: AgentTask, pos?: { x: number; y: number }, exclude?: SwarmAgent) => {
      if (idleWaiters.length) {
        let bestIdx = 0;
        let bestDist = Infinity;
        idleWaiters.forEach((waiter, idx) => {
          const dist =
            exclude === waiter.a
              ? -1
              : pos
              ? Math.hypot(waiter.a.x - pos.x, waiter.a.y - pos.y)
              : 0;
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = idx;
          }
        });
        const [picked] = idleWaiters.splice(bestIdx, 1);
        picked.res(task);
      } else {
        taskQueue.push(task);
      }
    };

    const enqueueAgentTask = (
      fn: (agent: SwarmAgent) => Promise<void>,
      pos?: { x: number; y: number },
      exclude?: SwarmAgent
    ) =>
      new Promise<void>((resolve) => {
        dispatchTask(
          async (agent) => {
            try {
              await fn(agent);
            } catch (err) {
              console.error(err);
            }
            resolve();
          },
          pos,
          exclude
        );
      });

    const runAgentWorker = async (agent: SwarmAgent) => {
      while (!cancelled) {
        const nextTask =
          taskQueue.shift() ??
          (await new Promise<AgentTask>((res) => idleWaiters.push({ a: agent, res })));
        if (cancelled) break;
        agent.idle = false;
        await nextTask(agent);
        agent.mode('arrow');
        agent.idle = true;
      }
    };

    const createWire = (box: PageBox) => {
      const wire = document.createElement('div');
      wire.className = `wire${box.w < 46 ? ' sm' : ''}`;
      wire.innerHTML = '<u></u><u></u><u></u><u></u><em></em>';
      wire.style.cssText = `left:${box.x}px;top:${box.y}px;width:0;height:0`;
      stage.appendChild(wire);
      return wire;
    };

    const drawWire = async (agent: SwarmAgent, item: BuildItem) => {
      const box = getPageBox(item.el);
      await agent.moveTo(box.x, box.y);
      if (cancelled || doneAll) return;
      agent.mode('cross');
      const wire = createWire(box);
      item.wire = wire;
      const label = wire.lastElementChild as HTMLElement | null;
      const sx = agent.x;
      const sy = agent.y;
      await animate(clamp(150 + Math.hypot(box.w, box.h) * 0.3, 190, 560), (p) => {
        const t = easeInOutCubic(p);
        agent.x = sx + box.w * t;
        agent.y = sy + box.h * t;
        wire.style.width = `${box.w * t}px`;
        wire.style.height = `${box.h * t}px`;
        if (label) {
          label.textContent = `${Math.round(box.w * t)} × ${Math.round(box.h * t)}`;
        }
      });
      agent.mode('arrow');
    };

    const splitTextNodes = (el: HTMLElement) => {
      const orig = el.innerHTML;
      const spans: HTMLSpanElement[] = [];
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const textNodes: Node[] = [];
      while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
      }
      for (const node of textNodes) {
        const frag = document.createDocumentFragment();
        for (const ch of node.textContent ?? '') {
          const span = document.createElement('span');
          span.className = 'ch';
          span.textContent = ch;
          frag.appendChild(span);
          spans.push(span);
        }
        node.parentNode?.replaceChild(frag, node);
      }
      return { orig, spans };
    };

    const typeTextItem = async (item: BuildItem, agent: SwarmAgent) => {
      const { orig, spans } = splitTextNodes(item.el);
      const totalChars = spans.length;
      revealItem(item);
      let revealed = 0;
      await animate(clamp(totalChars * 15, 170, 980), (p) => {
        const target = Math.round(p * totalChars);
        if (target <= revealed) return;
        for (let idx = revealed; idx < target; idx += 1) {
          spans[idx].classList.add('v');
        }
        revealed = target;
        const last = spans[target - 1];
        if (!last) return;
        const r = last.getBoundingClientRect();
        if (r.height) {
          agent.x = r.right + window.scrollX + 2;
          agent.y = r.top + r.height / 2 + window.scrollY;
        }
      });
      if (!cancelled) {
        item.el.innerHTML = orig;
      }
    };

    const buildItemContent = async (agent: SwarmAgent, item: BuildItem) => {
      const box = getPageBox(item.el);
      if (item.kind === 'text') {
        await agent.moveTo(box.x + 3, box.y + Math.min(box.h / 2, 14));
        if (cancelled || doneAll) return;
        agent.mode('ibeam');
        item.wire?.classList.add('edit');
        await typeTextItem(item, agent);
      } else {
        await agent.moveTo(box.x + box.w * randRange(0.25, 0.75), box.y + box.h * randRange(0.3, 0.7));
        if (cancelled || doneAll) return;
        agent.click();
        revealItem(item);
        await wait(110);
      }

      if (item.wire) {
        const wire = item.wire;
        wire.classList.add('out');
        safeTimeout(() => wire.remove(), 200);
        item.wire = null;
      }

      doneItems += 1;
      updateProgress();
      item.finish();
    };

    let doneAll = false;
    let started = false;
    let touring = false;
    const autoTour = true;
    let readyToTour = false;
    let scrollGen = 0;
    let resumeTourAt = 0;
    let scanStartAt = 0;
    let runningLoop = true;

    const buildBlock = (block: BlockGroup): Promise<void> => {
      if (!block.promise) {
        block.promise = (async () => {
          const itemPos = (it: BuildItem) => {
            const box = getPageBox(it.el);
            return { x: box.x, y: box.y };
          };

          const wireTasks: Promise<void>[] = [];
          for (const it of block.items) {
            wireTasks.push(enqueueAgentTask((a) => drawWire(a, it), itemPos(it)));
            await wait(38);
          }
          await Promise.all(wireTasks);
          await wait(190);

          const fillTasks: Promise<void>[] = [];
          for (const it of block.items) {
            fillTasks.push(enqueueAgentTask((a) => buildItemContent(a, it), itemPos(it)));
            await wait(52);
          }
          await Promise.all(fillTasks);

          block.fin = true;
          if (!doneAll && blocks.every((b) => b.fin)) {
            void finishBuild();
          }
        })();
      }
      return block.promise;
    };

    const maxScrollY = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const smoothScrollTo = (targetY: number, dur: number, gen: number): Promise<void> => {
      const startY = window.scrollY;
      const clampedY = clamp(targetY, 0, maxScrollY());
      if (Math.abs(clampedY - startY) < 2) return Promise.resolve();
      return animate(dur, (p) => {
        if (gen === scrollGen && !cancelled) {
          window.scrollTo(0, startY + (clampedY - startY) * easeInOutCubic(p));
        }
      });
    };

    const runTour = async () => {
      const gen = ++scrollGen;
      const stillCurrent = () => gen === scrollGen && !cancelled;
      touring = true;

      for (let i = 0; i < blocks.length; ) {
        const vh = window.innerHeight;
        const topY = getPageBox(blocks[i].el).y;
        let endIdx = i;
        let maxY = topY + getPageBox(blocks[i].el).h;

        while (endIdx + 1 < blocks.length) {
          const nextBox = getPageBox(blocks[endIdx + 1].el);
          if (nextBox.y + nextBox.h > topY + vh - 62) break;
          endIdx += 1;
          maxY = Math.max(maxY, nextBox.y + nextBox.h);
        }

        const spanH = maxY - topY;
        const isFirst = i === 0;
        const destY = isFirst
          ? 0
          : spanH < vh - 120
          ? topY - Math.min((vh - 96 - spanH) / 2, vh * 0.16)
          : topY - 24;

        const pendingBlocks = blocks.slice(i, endIdx + 1).filter((b) => !b.fin);
        if (pendingBlocks.length) {
          if (!doneAll) setStatus(isFirst ? 'Building' : 'Touring');
          const scrollDist = Math.abs(destY - window.scrollY);
          const scrollPromise = smoothScrollTo(destY, clamp(scrollDist * 1.5, 500, 1500), gen);
          await wait(isFirst ? 0 : 320);
          if (!stillCurrent()) return;

          const buildPromises = pendingBlocks.map((b, offset) =>
            wait(offset * 130).then(() => buildBlock(b))
          );
          const tallFollowup =
            spanH > vh - 40
              ? scrollPromise.then(() => wait(650)).then(() => smoothScrollTo(maxY - vh + 110, 2100, gen))
              : null;

          await Promise.all([scrollPromise, tallFollowup, ...buildPromises]);
          if (!stillCurrent()) return;
          await wait(isFirst ? 700 : 520);
          if (!stillCurrent()) return;
        }
        i = endIdx + 1;
      }

      touring = false;
    };

    const visibleBlocks = new Set<BlockGroup>();

    const onManualScroll = (e?: WheelEvent | TouchEvent) => {
      if (!started || paused || doneAll) return;
      if (e && 'deltaY' in e) {
        const dy = e.deltaY ?? 0;
        if (Math.abs(dy) < 4 || performance.now() - scanStartAt < 1200) return;
      }
      resumeTourAt = performance.now() + 1700;
      if (touring) {
        touring = false;
        scrollGen += 1;
        setStatus('Manual');
        for (const block of visibleBlocks) {
          void buildBlock(block);
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const block = blocks.find((b) => b.el === entry.target);
          if (!block) continue;
          if (entry.isIntersecting) {
            visibleBlocks.add(block);
          } else {
            visibleBlocks.delete(block);
          }
          if (entry.isIntersecting && started && !touring && !doneAll) {
            void buildBlock(block);
          }
        }
      },
      { threshold: 0.12 }
    );
    blocks.forEach((b) => observer.observe(b.el));
    window.addEventListener('wheel', onManualScroll, { passive: true });
    window.addEventListener('touchmove', onManualScroll, { passive: true });

    // Finale particle swarm ("Hey :D" -> "♥")
    const swarm = {
      cv: canvas,
      ps: [] as Particle[],
      on: false,
      exiting: false,
      exitAge: 0,
      d: 1,
      mouse: { x: -999, y: -999, t: -9999 },
      path: new Path2D('M0 0v15l4.2-3.8 2.8 6.6 2.4-1-2.8-6.5h5.6z'),
      size() {
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        this.cv.width = window.innerWidth * dpr;
        this.cv.height = window.innerHeight * dpr;
        this.d = dpr;
      },
      points(glyph: string, count: number): [number, number][] {
        const w = Math.round(window.innerWidth);
        const h = Math.round(window.innerHeight);
        const off = document.createElement('canvas');
        off.width = w;
        off.height = h;
        const ctx = off.getContext('2d', { willReadFrequently: true });
        if (!ctx) return Array.from({ length: count }, () => [w / 2, h / 2]);

        ctx.fillStyle = '#fff';
        if (glyph === '♥') {
          const radius = h * 0.34;
          ctx.translate(w / 2, h * 0.5);
          ctx.beginPath();
          for (let t = 0; t <= Math.PI * 2 + 0.01; t += 0.05) {
            const hx = 16 * Math.sin(t) ** 3;
            const hy = -(
              13 * Math.cos(t) -
              5 * Math.cos(2 * t) -
              2 * Math.cos(3 * t) -
              Math.cos(4 * t)
            );
            ctx.lineTo((hx * radius) / 16, (hy * radius) / 16);
          }
          ctx.fill();
        } else {
          let fontSize = h * 0.62;
          const makeFont = (sz: number) => `400 ${sz}px "Instrument Serif",Georgia,serif`;
          ctx.font = makeFont(fontSize);
          const measured = ctx.measureText(glyph);
          if (measured.width > w * 0.86) {
            fontSize *= (w * 0.86) / measured.width;
            ctx.font = makeFont(fontSize);
          }
          ctx.textAlign = 'center';
          ctx.textBaseline = 'alphabetic';
          const m = ctx.measureText(glyph);
          ctx.fillText(glyph, w / 2, h / 2 + m.actualBoundingBoxAscent / 2 - 6);
        }

        const data = ctx.getImageData(0, 0, w, h).data;
        const pts: [number, number][] = [];
        let area = 0;
        for (let y = 0; y < h; y += 2) {
          for (let x = 0; x < w; x += 2) {
            if (data[(y * w + x) * 4 + 3] > 128) area += 4;
          }
        }
        const step = Math.max(2, Math.sqrt(area / count) * 0.98);
        for (let y = step / 2, row = 0; y < h; y += step, row += 1) {
          for (let x = row % 2 ? step / 2 : 0; x < w; x += step) {
            if (data[((y | 0) * w + (x | 0)) * 4 + 3] > 128) {
              pts.push([x, y]);
            }
          }
        }
        for (let i = pts.length - 1; i > 0; --i) {
          const j = Math.floor(Math.random() * (i + 1));
          [pts[i], pts[j]] = [pts[j], pts[i]];
        }
        const res: [number, number][] = [];
        for (let i = 0; i < count; i += 1) {
          const p = pts[i % Math.max(1, pts.length)] ?? [w / 2, h / 2];
          res.push([
            p[0] - 3 + (i >= pts.length ? randRange(-3, 3) : 0),
            p[1] - 5 + (i >= pts.length ? randRange(-3, 3) : 0),
          ]);
        }
        return res;
      },
      shape(glyph: string) {
        const targets = this.points(glyph, this.ps.length);
        this.ps.forEach((p, idx) => {
          p.tx = targets[idx][0];
          p.ty = targets[idx][1];
          p.vx += randRange(-420, 420);
          p.vy += randRange(-420, 420);
        });
      },
      async play(glyphs: string[]) {
        this.size();
        const count = window.innerWidth < 700 ? 340 : 760;
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.ps = [];
        for (let i = 0; i < count; i += 1) {
          const edge = Math.floor(randRange(4));
          const x = edge === 0 ? -30 : edge === 1 ? w + 30 : randRange(w);
          const y = edge === 2 ? -30 : edge === 3 ? h + 30 : randRange(h);
          this.ps.push({
            x,
            y,
            vx: 0,
            vy: 0,
            tx: 0,
            ty: 0,
            k: randRange(20, 46),
            c: SWARM_COLORS[i % SWARM_COLORS.length],
            s: window.innerWidth < 700 ? randRange(0.34, 0.48) : randRange(0.44, 0.6),
            ph: randRange(6.28),
          });
        }
        this.exiting = false;
        this.exitAge = 0;
        this.on = true;
        this.cv.classList.add('on');
        for (let i = 0; i < glyphs.length; i += 1) {
          if (cancelled) return;
          this.shape(glyphs[i]);
          if (i === glyphs.length - 1) {
            await wait(2000);
            break;
          }
          await wait(i === 0 ? 2600 : 2100);
        }
      },
      exit() {
        if (!this.on) return;
        this.exiting = true;
        this.exitAge = 0;
        for (const p of this.ps) {
          p.delay = randRange(0, 0.12);
          p.exitDur = 1.3 + randRange(0, 0.2);
        }
      },
      stop() {
        this.on = false;
        this.exiting = false;
        this.ps = [];
        this.cv.classList.remove('on');
      },
      step(dt: number, now: number) {
        if (!this.on) return;
        const ctx = this.cv.getContext('2d');
        if (!ctx) return;
        if (this.exiting) {
          this.exitAge += dt / 1000;
        }
        const dpr = this.d;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const dtScaled = Math.min(0.08, (dt / 1000) * 1.45);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, this.cv.width, this.cv.height);

        for (const p of this.ps) {
          let drawX = p.x;
          let drawY = p.y;
          if (this.exiting) {
            const delay = p.delay ?? 0;
            const exitDur = p.exitDur ?? 1.3;
            const prog = easeInOutCubic(Math.min(1, Math.max(0, (this.exitAge - delay) / exitDur)));
            drawX = p.x + (p.x - vw / 2) * 0.06 * prog;
            drawY = p.y - vh * 1.15 * prog;
          } else {
            const targetX = p.tx + Math.sin(now * 0.002 + p.ph) * 1.6;
            const targetY = p.ty + Math.cos(now * 0.0017 + p.ph) * 1.6;
            let ax = (targetX - p.x) * p.k - p.vx * 8.2;
            let ay = (targetY - p.y) * p.k - p.vy * 8.2;
            const mdx = p.x - this.mouse.x;
            const mdy = p.y - this.mouse.y;
            const distSq = mdx * mdx + mdy * mdy;
            if (distSq < 9000 && now - this.mouse.t < 2200) {
              const repulse = ((9000 - distSq) * 0.9) / (Math.sqrt(distSq) + 1);
              ax += mdx * repulse;
              ay += mdy * repulse;
            }
            p.vx += ax * dtScaled;
            p.vy += ay * dtScaled;
            p.x += p.vx * dtScaled;
            p.y += p.vy * dtScaled;
          }

          ctx.setTransform(dpr * p.s, 0, 0, dpr * p.s, drawX * dpr, drawY * dpr);
          ctx.fillStyle = p.c;
          ctx.fill(this.path);
          ctx.lineWidth = 1.1;
          ctx.strokeStyle = 'rgba(255,255,255,.85)';
          ctx.stroke(this.path);
        }
      },
    };

    const onSwarmPointerMove = (e: PointerEvent) => {
      swarm.mouse.x = e.clientX;
      swarm.mouse.y = e.clientY;
      swarm.mouse.t = performance.now();
    };
    const onSwarmResize = () => swarm.size();
    window.addEventListener('pointermove', onSwarmPointerMove, { passive: true });
    window.addEventListener('resize', onSwarmResize);

    const syncPlayLabel = () => {
      playBtn.textContent = paused ? 'Play' : 'Pause';
      playBtn.setAttribute('aria-label', paused ? 'Resume build' : 'Pause build');
    };

    const flyAgentsExit = async () => {
      const vw = window.innerWidth;
      const step = vw / AGENT_COUNT;
      await Promise.all(
        agents.map((agent, idx) =>
          wait(idx * 24).then(() => {
            agent.idle = false;
            return agent.moveTo(vw / 2 + (idx - 17 / 2) * step, -180 - randRange(0, 140), {
              dur: 900 + randRange(0, 300),
              straight: true,
            });
          })
        )
      );
    };

    const notifyBuilt = () => {
      onBuiltRef.current?.();
    };

    const finishBuild = async () => {
      if (doneAll || cancelled) return;
      doneAll = true;
      touring = false;
      scrollGen += 1;
      readyToTour = false;
      setStatus('Build complete');
      syncPlayLabel();
      skipBtn.hidden = true;

      await wait(240);
      if (cancelled) return;
      if (!userScrolled) {
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
      }
      await wait(userScrolled ? 0 : 760);
      if (cancelled) return;
      notifyBuilt();
      await wait(620);
      if (cancelled) return;

      stage.classList.add('ring');
      await swarm.play(['Hey :D', '♥']);
      if (cancelled) return;
      await wait(240);
      swarm.exit();
      void flyAgentsExit();
      await wait(1600);
      if (cancelled) return;
      swarm.stop();
      stage.classList.remove('on');
      await wait(650);
      if (cancelled) return;

      stage.innerHTML = '';
      stage.style.display = 'none';
      canvas.style.display = 'none';
      hud.classList.add('min');
      setStatus('Built · 18 agents');
      playBtn.hidden = true;
      skipBtn.hidden = true;
      replayBtn.hidden = false;
      runningLoop = false;
    };

    const skipBuild = () => {
      if (doneAll) return;
      doneAll = true;
      touring = false;
      scrollGen += 1;
      paused = false;
      clearTimeline();

      for (const item of itemMap.values()) {
        if (item.kind === 'text' && item.orig != null) {
          item.el.innerHTML = item.orig;
        }
        finishItemImmediate(item);
        if (item.wire) {
          item.wire.remove();
          item.wire = null;
        }
      }
      stage.querySelectorAll('.wire').forEach((w) => w.remove());
      doneItems = totalItems;
      updateProgress();
      scan.style.opacity = '0';
      notifyBuilt();
      stage.style.display = 'none';
      stage.innerHTML = '';
      swarm.on = false;
      canvas.classList.remove('on');
      canvas.style.display = 'none';
      hud.classList.add('min');
      setStatus('Built · 18 agents');
      playBtn.hidden = true;
      skipBtn.hidden = true;
      replayBtn.hidden = false;
      if (!userScrolled) {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
      runningLoop = false;
    };

    const instantBuilt = () => {
      doneAll = true;
      started = true;
      for (const item of itemMap.values()) {
        finishItemImmediate(item);
      }
      doneItems = totalItems;
      updateProgress();
      notifyBuilt();
      hud.classList.add('min');
      setStatus('Built · 18 agents');
      playBtn.hidden = true;
      skipBtn.hidden = true;
      replayBtn.hidden = false;
      stage.style.display = 'none';
      canvas.style.display = 'none';
      runningLoop = false;
    };

    const startBuild = async () => {
      if (started || doneAll || cancelled) return;
      started = true;
      scanStartAt = performance.now();
      setStatus('Scanning page…');
      allEl.textContent = String(totalItems);
      updateProgress();
      stage.classList.add('on');
      scan.style.opacity = '1';

      await animate(720, (p) => {
        scan.style.transform = `translateY(${easeInOutCubic(p) * window.innerHeight}px)`;
      });
      if (cancelled || doneAll) return;

      scan.style.opacity = '0';
      formation = 'wander';
      readyToTour = true;

      if (autoTour) {
        void runTour();
      } else {
        for (const block of visibleBlocks) {
          void buildBlock(block);
        }
      }
    };

    const togglePause = () => {
      if (doneAll) return;
      paused = !paused;
      syncPlayLabel();
      setStatus(paused ? 'Paused' : touring ? 'Touring' : 'Building');
    };

    const onReplayClick = () => {
      if (window.location.search.includes('skip=') || window.location.search.includes('autostart=')) {
        window.location.href = window.location.pathname;
      } else {
        window.location.reload();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key.toLowerCase();
      const active = document.activeElement;
      if (key === ' ') {
        if (active && /^(BUTTON|A|INPUT|TEXTAREA)$/.test(active.tagName)) return;
        e.preventDefault();
        togglePause();
      } else if (key === 's') {
        skipBuild();
      }
    };

    playBtn.addEventListener('click', togglePause);
    skipBtn.addEventListener('click', skipBuild);
    replayBtn.addEventListener('click', onReplayClick);
    window.addEventListener('keydown', onKeyDown);

    agentsCountEl.textContent = String(AGENT_COUNT);
    avs.innerHTML = SWARM_COLORS.slice(0, 5)
      .map((c) => `<i style="background:${c}"></i>`)
      .join('');

    const params = new URLSearchParams(window.location.search);
    const shouldSkipImmediately =
      reducedMotion || params.get('skip') === '1' || params.get('autostart') === '1';

    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      if (!runningLoop || cancelled) return;
      const dt = Math.min(50, now - lastTime);
      lastTime = now;

      if (!paused) {
        simTime += dt * 1.45;
        for (const w of [...waits]) {
          if (simTime >= w.t) {
            waits.delete(w);
            w.res();
          }
        }
        for (const a of [...anims]) {
          const p = Math.min(1, (simTime - a.t0) / a.dur);
          a.fn(p);
          if (p >= 1) {
            anims.delete(a);
            a.res();
          }
        }
        for (const agent of agents) {
          if (agent.idle) {
            agent.drift(dt * 1.45, now, formation);
          }
        }
      }

      for (const agent of agents) {
        agent.render();
      }

      swarm.step(paused ? 0 : dt, now);

      if (readyToTour && !touring && !doneAll && !paused && autoTour && now > resumeTourAt) {
        void runTour();
      }

      rafId = window.requestAnimationFrame(tick);
    };

    if (shouldSkipImmediately) {
      instantBuilt();
    } else {
      for (let i = 0; i < AGENT_COUNT; i += 1) {
        const agent = new SwarmAgent(i, AGENT_COUNT, stage, animate);
        agents.push(agent);
        void runAgentWorker(agent);
      }

      allEl.textContent = String(totalItems);
      updateProgress();

      rafId = window.requestAnimationFrame((now) => {
        lastTime = now;
        tick(now);
      });

      const scheduleStart = () => {
        safeTimeout(() => void startBuild(), 320);
      };

      if (document.fonts?.ready) {
        void Promise.race([
          document.fonts.ready,
          new Promise<void>((res) => safeTimeout(res, 1500)),
        ]).then(scheduleStart);
      } else {
        scheduleStart();
      }
    }

    return () => {
      cancelled = true;
      runningLoop = false;
      window.cancelAnimationFrame(rafId);
      timeouts.forEach((id) => window.clearTimeout(id));
      timeouts.clear();
      clearTimeline();
      observer.disconnect();
      scrollIntentEvents.forEach((ev) => window.removeEventListener(ev, onUserScrollIntent));
      window.removeEventListener('wheel', onManualScroll);
      window.removeEventListener('touchmove', onManualScroll);
      window.removeEventListener('pointermove', onSwarmPointerMove);
      window.removeEventListener('resize', onSwarmResize);
      window.removeEventListener('keydown', onKeyDown);
      playBtn.removeEventListener('click', togglePause);
      skipBtn.removeEventListener('click', skipBuild);
      replayBtn.removeEventListener('click', onReplayClick);
      stage.innerHTML = '';
      stage.className = '';
      stage.style.display = '';
      canvas.classList.remove('on');
      canvas.style.display = '';
      scan.style.opacity = '0';
      hud.classList.remove('min');
      playBtn.hidden = false;
      skipBtn.hidden = false;
      replayBtn.hidden = true;
      for (const item of itemMap.values()) {
        if (item.kind === 'text' && item.orig != null) {
          item.el.innerHTML = item.orig;
        }
        finishItemImmediate(item);
      }
    };
  }, [reducedMotion]);

  return (
    <>
      <div id="stage" ref={stageRef} aria-hidden="true" />
      <canvas id="swarmcv" ref={canvasRef} data-testid="swarm-canvas" aria-hidden="true" />
      <div className="scan" id="scan" ref={scanRef} aria-hidden="true" />
      <div id="hud" ref={hudRef} className="glass" data-native-cursor aria-live="polite">
        <span className="avs" id="swAvs" ref={avsRef} />
        <span className="n">
          <b id="swAgents" ref={agentsCountRef}>
            18
          </b>{' '}
          agents
        </span>
        <span className="n hide-s">
          <b id="swDone" ref={doneRef}>
            0
          </b>{' '}
          /{' '}
          <b id="swAll" ref={allRef}>
            0
          </b>{' '}
          layers
        </span>
        <span className="bar">
          <i id="swBar" ref={barRef} />
        </span>
        <span className="st" id="swStatus" ref={statusRef}>
          Starting…
        </span>
        <button
          className="primary"
          id="bPlay"
          ref={playBtnRef}
          type="button"
          aria-label="Pause build"
        >
          Pause
        </button>
        <button id="bSkip" ref={skipBtnRef} type="button">
          Skip
        </button>
        <button id="bReplay" ref={replayBtnRef} type="button" hidden>
          Replay
        </button>
      </div>
    </>
  );
}
