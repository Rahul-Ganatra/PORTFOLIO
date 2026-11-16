'use strict';
(function(){
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const root=document.documentElement, body=document.body;
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer=window.matchMedia('(pointer: fine)').matches;
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));

/* ------------------------------------------------------------------ data */
const projects=[
  {id:'drishti',viz:'drishti',color:'#ff6b4a',category:'Computer Vision',title:'DRISHTI',subtitle:'Intelligent crowd monitoring & stampede prediction',description:'A real-time crowd-monitoring and early-warning system built with OpenCV and MOG2, combining detection, risk alerts and multi-platform delivery.',tech:['Python','OpenCV','Flask','Flutter','Firebase'],url:'https://github.com/Rahul-Ganatra/DRISHTI',details:'Developed real-time crowd monitoring with OpenCV and MOG2. Built predictive risk alerts using Z-score and persistence techniques, with Flask/FastAPI, Flutter and Firebase supporting the web, mobile and cloud experience.'},
  {id:'customer',viz:'customer',color:'#f5c451',category:'Data Analytics',title:'Customer Trends',subtitle:'Customer behavior, SQL & business intelligence',description:'Analyzed 3,900 transaction records with SQL and Pandas, then built interactive Power BI and Excel dashboards to surface patterns in customer behavior.',tech:['SQL','Python','Pandas','Power BI','Excel'],url:'https://github.com/Rahul-Ganatra/Customer-Trend-Analysis-Dashboard',details:'Analyzed 3,900 customer transactions, prepared the data using SQL and Pandas, and developed interactive KPI dashboards in Power BI and Excel to support reporting and marketing decisions.'},
  {id:'edutrack',viz:'edutrack',color:'#8b9bff',category:'Explainable AI',title:'EduTrack AI',subtitle:'Explainable student risk prediction',description:'An explainable AI product using Random Forest, SHAP, What-If simulations and React dashboards to help investigate student risk.',tech:['Python','SHAP','React','FastAPI','Recharts'],url:'https://github.com/Rahul-Ganatra/EduTrack-AI',demo:'https://drive.google.com/file/d/1ofzM8PhyNhOIUSZQFwhJ_Ubq2I32GuDE/view?usp=drive_link',details:'An AI platform for real-time student risk prediction, featuring Random Forest, SHAP explanations, causal DAG concepts and What-If simulation. React and Recharts support the front end, with FastAPI serving the models.'},
  {id:'intellex',viz:'intellex',color:'#38d9c4',category:'Generative AI',title:'Intellex',subtitle:'Document intelligence with RAG',description:'An intelligent document analysis and question-answering system that extracts knowledge across multiple formats using NLP and retrieval-augmented generation.',tech:['Python','RAG','LLMs','NLP','Streamlit'],url:'https://github.com/Rahul-Ganatra/Intellex',demo:'https://drive.google.com/file/d/1lft0wShEofg6RW0PBwG-JBa8UYbJa-V8/view?usp=drive_link',details:'Built an interactive document Q&A system using retrieval-augmented generation, LLMs and multiformat knowledge extraction. Added Streamlit dashboards and role-based reporting insights.'}
];
const journey=[
  'Cleaned and transformed Excel data, extracted structured information from large PDFs, improved data quality and prepared investor-ready reporting.',
  'Integrated APIs capturing 5,000+ engagement metrics; developed React dashboards and connected them to a Flask backend.',
  'Scraped over 1.4 million rows, automated PostgreSQL ingestion, and used Apache AGE Viewer to explore complex datasets.'
];
const skillSets={
  development:['React','Next.js','Flask','FastAPI','Flutter','JavaScript','HTML','CSS','Dart'],
  analytics:['Python','SQL','Pandas','NumPy','Power BI','Excel','Matplotlib','EDA','Reporting'],
  ai:['OpenCV','MediaPipe','scikit-learn','SHAP','RAG','NLP','LLMs','Random Forest','MOG2'],
  databases:['PostgreSQL','MySQL','MongoDB','Firebase','Neo4j','REST APIs','Data Pipelines'],
  tools:['Git','GitHub','Docker','VS Code','Kaggle','API Integration','Automation','Web Scraping']
};
const skillNames={development:'Development',analytics:'Data & Analytics',ai:'AI & Vision',databases:'Databases & Cloud',tools:'Tools'};
const esc=s=>String(s).replace(/[&<>"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));

/* ------------------------------------------------------------ split text */
function splitWords(el,startIndex=0){
  let i=startIndex;
  const walk=node=>{
    Array.from(node.childNodes).forEach(n=>{
      if(n.nodeType===3){
        const frag=document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(part=>{
          if(!part)return;
          if(/^\s+$/.test(part)){frag.appendChild(document.createTextNode(' '));return}
          const outer=document.createElement('span');outer.className='sw';
          const inner=document.createElement('span');inner.textContent=part;inner.style.setProperty('--i',i++);
          outer.appendChild(inner);frag.appendChild(outer);
        });
        n.replaceWith(frag);
      }else if(n.nodeType===1&&n.tagName!=='BR')walk(n);
    });
  };
  walk(el);return i;
}
$$('[data-split]').forEach(el=>splitWords(el));

/* -------------------------------------------------------------- loader */
const loader=$('#loader'), countEl=$('#loaderCount'), barEl=$('#loaderBar');
let visited=false;try{visited=sessionStorage.getItem('rg-visited')==='1';sessionStorage.setItem('rg-visited','1')}catch(e){}
function revealPage(){
  body.classList.remove('is-loading');
  requestAnimationFrame(()=>body.classList.add('is-ready'));
}
if(reduced||!loader){loader&&loader.classList.add('is-gone');revealPage()}
else{
  body.classList.add('is-loading');
  const minDur=visited?650:1700, t0=performance.now();
  let loaded=document.readyState==='complete', shown=0;
  window.addEventListener('load',()=>{loaded=true});
  const tick=now=>{
    const el=now-t0;
    if(el>4500)loaded=true;
    const cap=loaded?100:88;
    const target=Math.min(cap,el/minDur*100);
    shown+=(target-shown)*.12;
    if(target>=100&&shown>99.4)shown=100;
    countEl.textContent=String(Math.floor(shown)).padStart(3,'0');
    barEl.style.transform=`scaleX(${shown/100})`;
    if(shown<100){requestAnimationFrame(tick);return}
    setTimeout(()=>{
      loader.classList.add('is-done');
      setTimeout(revealPage,280);
      setTimeout(()=>loader.classList.add('is-gone'),1200);
    },180);
  };
  requestAnimationFrame(tick);
}

/* ------------------------------------------------------------ scramble */
const GLYPHS='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=/<>';
function scramble(el){
  if(reduced||el._scr)return;el._scr=1;
  const nodes=[];const walk=n=>n.childNodes.forEach(c=>c.nodeType===3?nodes.push([c,c.textContent]):walk(c));walk(el);
  const total=nodes.reduce((a,[,t])=>a+t.length,0);let f=0;const frames=Math.max(18,total*1.1);
  (function step(){
    const done=f/frames*total;let k=0;
    nodes.forEach(([n,t])=>{n.textContent=t.split('').map(ch=>{const i=k++;return ch===' '||i<done?ch:GLYPHS[(Math.random()*GLYPHS.length)|0]}).join('')});
    if(++f<=frames)requestAnimationFrame(step);else nodes.forEach(([n,t])=>n.textContent=t);
  })();
}

/* -------------------------------------------------------- smooth scroll */
let lenis=null;
if(!reduced&&window.Lenis){
  lenis=new Lenis({duration:1.15,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),smoothWheel:true});
  (function raf(t){lenis.raf(t);requestAnimationFrame(raf)})(performance.now());
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href^="#"]');if(!a)return;
    const el=document.querySelector(a.getAttribute('href'));if(!el)return;
    e.preventDefault();lenis.scrollTo(el,{offset:a.getAttribute('href')==='#home'?0:-parseFloat(getComputedStyle(root).fontSize)*4.5});
  });
}

/* ------------------------------------------------------------- reveals */
const revealObs=new IntersectionObserver(entries=>{
  let k=0;
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    e.target.style.setProperty('--d',(k++*0.09)+'s');
    e.target.classList.add('is-in');
    if(e.target.hasAttribute('data-scramble'))scramble(e.target);
    revealObs.unobserve(e.target);
  });
},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
$$('[data-reveal],[data-split],[data-scramble]').forEach(el=>revealObs.observe(el));

/* ------------------------------------------------- hero: reactive dot field */
(function heroField(){
  const cv=$('#heroCanvas');if(!cv)return;
  const ctx=cv.getContext('2d');
  let W=0,H=0,dpr=1,dots=[],raf=0,visible=true;
  let R=240, K=1;
  const mouse={x:-9999,y:-9999,tx:-9999,ty:-9999,a:0};
  const ripples=[];
  const A=[59,91,255], B=[14,143,174], T=[16,20,32];
  const lerp=(a,b,t)=>a+(b-a)*t;
  function resize(){
    dpr=Math.min(2,window.devicePixelRatio||1);
    W=cv.clientWidth;H=cv.clientHeight;
    cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    K=Math.max(1,W/1440);R=240*K;
    const gap=W<600?24:Math.round(30*K);
    const cols=Math.ceil(W/gap)+1, rows=Math.ceil(H/gap)+1;
    const ox=(W-(cols-1)*gap)/2, oy=(H-(rows-1)*gap)/2;
    dots=[];
    for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)dots.push({x:ox+c*gap,y:oy+r*gap});
  }
  function frame(now){
    const t=(now||0)*.001;
    ctx.clearRect(0,0,W,H);
    mouse.x+=(mouse.tx-mouse.x)*.14;mouse.y+=(mouse.ty-mouse.y)*.14;
    mouse.a+=((mouse.tx>-1000?1:0)-mouse.a)*.06;
    const ma=mouse.a;
    // soft spotlight under the cursor
    if(ma>.01){
      const g=ctx.createRadialGradient(mouse.x,mouse.y,0,mouse.x,mouse.y,R*1.7);
      g.addColorStop(0,`rgba(59,91,255,${.10*ma})`);g.addColorStop(.45,`rgba(14,143,174,${.05*ma})`);g.addColorStop(1,'rgba(245,246,242,0)');
      ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    }
    for(let i=ripples.length-1;i>=0;i--){const rp=ripples[i];rp.r+=7+rp.r*.012;rp.life-=.011;if(rp.life<=0)ripples.splice(i,1)}
    let last='';
    for(const d of dots){
      let x=d.x,y=d.y;
      const w=Math.sin(d.x*.0055+d.y*.0035-t*.8)*.5+.5;           // slow ambient swell
      let size=1+w*.6, alpha=.09+w*.11, mix=0;
      if(ma>.01){
        const dx=x-mouse.x, dy=y-mouse.y, dist=Math.hypot(dx,dy);
        if(dist<R){
          const f=1-dist/R, e=f*f*(3-2*f)*ma;                     // smoothstep lens
          if(dist>.1){x+=dx/dist*e*18;y+=dy/dist*e*18}
          size+=e*2.8;alpha+=e*.8;mix=e;
        }
      }
      for(const rp of ripples){
        const dx=d.x-rp.x, dy=d.y-rp.y, dist=Math.hypot(dx,dy), band=Math.abs(dist-rp.r);
        if(band<46){const e=(1-band/46)*rp.life;if(dist>.1){x+=dx/dist*e*12;y+=dy/dist*e*12}size+=e*2;alpha+=e*.7;mix=Math.max(mix,e)}
      }
      let col='16,20,32';
      if(mix>.03){
        const k=clamp(x/W,0,1), m=Math.min(1,mix*1.3);
        col=`${Math.round(lerp(T[0],lerp(A[0],B[0],k),m))},${Math.round(lerp(T[1],lerp(A[1],B[1],k),m))},${Math.round(lerp(T[2],lerp(A[2],B[2],k),m))}`;
      }
      const fs=`rgb(${col})`;if(fs!==last){ctx.fillStyle=fs;last=fs}
      ctx.globalAlpha=Math.min(1,alpha);
      if(size<2){ctx.fillRect(x-size/2,y-size/2,size,size)}
      else{ctx.beginPath();ctx.arc(x,y,size/2,0,Math.PI*2);ctx.fill()}
    }
    ctx.globalAlpha=1;
    // crosshair + live coordinate readout
    if(ma>.05){
      ctx.strokeStyle=`rgba(16,20,32,${.08*ma})`;ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(0,Math.round(mouse.y)+.5);ctx.lineTo(W,Math.round(mouse.y)+.5);
      ctx.moveTo(Math.round(mouse.x)+.5,0);ctx.lineTo(Math.round(mouse.x)+.5,H);ctx.stroke();
      ctx.font=`500 ${Math.round(10*K)}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.fillStyle=`rgba(59,91,255,${.85*ma})`;
      ctx.fillText(`X ${(mouse.x/W).toFixed(3)}  Y ${(mouse.y/H).toFixed(3)}`,mouse.x+36*K,mouse.y+40*K);
    }
    raf=visible&&!reduced?requestAnimationFrame(frame):0;
  }
  resize();frame(0);
  let rt;window.addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{resize();if(!raf)frame(performance.now())},150)});
  const hero=$('#home');
  hero.addEventListener('pointermove',e=>{
    if(e.pointerType==='touch')return;
    const r=cv.getBoundingClientRect();mouse.tx=e.clientX-r.left;mouse.ty=e.clientY-r.top;
    if(mouse.x<-1000){mouse.x=mouse.tx;mouse.y=mouse.ty}
  });
  hero.addEventListener('pointerleave',()=>{mouse.tx=mouse.ty=-9999});
  hero.addEventListener('pointerdown',e=>{
    if(reduced||e.target.closest('a,button'))return;
    const r=cv.getBoundingClientRect();ripples.push({x:e.clientX-r.left,y:e.clientY-r.top,r:0,life:1});
    if(ripples.length>4)ripples.shift();
  });
  new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(visible&&!raf&&!reduced)raf=requestAnimationFrame(frame)}).observe(hero);
})();

/* -------------------------------------------------------------- cursor */
if(finePointer&&!reduced){
  root.classList.add('has-cursor');
  const dot=$('#cursorDot'), ring=$('#cursorRing'), label=$('#cursorLabel');
  let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y;
  window.addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;root.classList.remove('cursor-hidden')},{passive:true});
  document.addEventListener('pointerleave',()=>root.classList.add('cursor-hidden'));
  window.addEventListener('pointerdown',()=>root.classList.add('cursor-down'));
  window.addEventListener('pointerup',()=>root.classList.remove('cursor-down'));
  (function loop(){
    rx+=(x-rx)*.18;ry+=(y-ry)*.18;
    dot.style.transform=`translate3d(${x}px,${y}px,0)`;
    ring.style.transform=`translate3d(${rx}px,${ry}px,0)`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener('pointerover',e=>{
    const t=e.target.closest('a,button,input,.skill-chip,[data-tilt]');
    root.classList.toggle('cursor-hover',!!t);
  });
}

/* ------------------------------------------------------ cursor-lit grid */
if(finePointer&&!reduced){
  let gx=-999,gy=-999,gq=false;
  window.addEventListener('pointermove',e=>{gx=e.clientX;gy=e.clientY;if(!gq){gq=true;requestAnimationFrame(()=>{root.style.setProperty('--gx',gx+'px');root.style.setProperty('--gy',gy+'px');gq=false})}},{passive:true});
}

/* ------------------------------------------------------------ magnetic */
if(finePointer&&!reduced){
  $$('.magnetic').forEach(el=>{
    const strength=el.classList.contains('mail-blob')?.35:.28;
    el.addEventListener('pointermove',e=>{
      const b=el.getBoundingClientRect();
      const mx=e.clientX-(b.left+b.width/2), my=e.clientY-(b.top+b.height/2);
      el.style.transform=`translate(${mx*strength}px,${my*strength}px)`;
      $$(':scope>span,:scope>i',el).forEach(c=>c.style.transform=`translate(${mx*.12}px,${my*.12}px)`);
    });
    el.addEventListener('pointerleave',()=>{el.style.transform='';$$(':scope>span,:scope>i',el).forEach(c=>c.style.transform='')});
  });
}

/* ------------------------------------------------------------- tilt */
if(finePointer&&!reduced){
  $$('[data-tilt]').forEach(el=>{
    el.addEventListener('pointermove',e=>{
      const b=el.getBoundingClientRect(), px=(e.clientX-b.left)/b.width, py=(e.clientY-b.top)/b.height;
      el.style.setProperty('--tx',`${(.5-py)*6}deg`);el.style.setProperty('--ty',`${(px-.5)*8}deg`);
      el.style.setProperty('--mx',`${e.clientX-b.left}px`);el.style.setProperty('--my',`${e.clientY-b.top}px`);
      el.classList.add('is-tilting');
    });
    el.addEventListener('pointerleave',()=>{el.style.setProperty('--tx','0deg');el.style.setProperty('--ty','0deg');el.classList.remove('is-tilting')});
  });
}

/* -------------------------------------------------------- spotlight cards */
$$('.spot').forEach(el=>el.addEventListener('pointermove',e=>{
  const b=el.getBoundingClientRect();
  el.style.setProperty('--mx',`${e.clientX-b.left}px`);el.style.setProperty('--my',`${e.clientY-b.top}px`);
}));

/* ------------------------------------------------------ header / scroll */
const topbar=$('#topbar'), nav=$('#nav'), menu=$('#menuToggle'), progress=$('#progressFill');
const heroTitle=$('.hero-title'), heroCanvas=$('#heroCanvas');
const statement=$('#aboutStatement'), portraitImg=$('.portrait img');
let words=[];
if(statement){
  statement.innerHTML=statement.textContent.trim().split(/\s+/).map(w=>`<span class="word">${esc(w)}</span>`).join(' ');
  words=$$('.word',statement);
}
let lastY=scrollY, ticking=false;
const sections=$$('main > .section');
let pinJ=null;
function onScroll(){
  const y=scrollY, vh=innerHeight;
  const max=document.documentElement.scrollHeight-vh;
  progress.style.transform=`scaleX(${max>0?y/max:0})`;
  topbar.classList.toggle('is-scrolled',y>20);
  pinJ&&pinJ();
  if(!nav.classList.contains('is-open'))topbar.classList.toggle('is-hidden',y>lastY&&y>300);
  lastY=y;
  if(!reduced&&y<vh*1.2){
    heroTitle.style.transform=`translate3d(0,${y*.22}px,0)`;
    heroTitle.style.opacity=String(clamp(1-y/(vh*.9),0,1));
    heroCanvas.style.opacity=String(clamp(1-y/vh,0,1));
  }
  if(words.length){
    const r=statement.getBoundingClientRect();
    const p=clamp((vh*.88-r.top)/(r.height+vh*.3),0,1);
    const lit=reduced?words.length:Math.round(p*words.length*1.1);
    words.forEach((w,i)=>w.classList.toggle('is-lit',i<lit));
  }
  if(portraitImg&&!reduced){
    const r=portraitImg.parentElement.getBoundingClientRect();
    portraitImg.style.setProperty('--py',`${((r.top+r.height/2)-vh/2)*-.08-20}px`);
  }
  for(const sec of sections){
    const r=sec.getBoundingClientRect();
    const out=clamp((vh*.35-r.bottom)/(vh*.6),0,1)*(reduced?0:1);
    const inn=clamp((vh-r.top)/(vh*.5),0,1);
    sec.style.setProperty('--out',out.toFixed(3));sec.style.setProperty('--in',inn.toFixed(3));
  }
  ticking=false;
}
window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});
window.addEventListener('resize',()=>requestAnimationFrame(onScroll));
onScroll();

menu.addEventListener('click',()=>{
  const open=nav.classList.toggle('is-open');
  menu.setAttribute('aria-expanded',String(open));
  menu.setAttribute('aria-label',open?'Close menu':'Open menu');
  body.style.overflow=open?'hidden':'';
});
$$('#nav a').forEach(a=>a.addEventListener('click',()=>{
  if(!nav.classList.contains('is-open'))return;
  nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');body.style.overflow='';
}));
const navLinks=$$('#nav a');
const navObs=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting)navLinks.forEach(a=>a.classList.toggle('is-active',a.getAttribute('href')==='#'+e.target.id));
}),{rootMargin:'-45% 0px -50% 0px'});
$$('main section[id]').forEach(s=>navObs.observe(s));

/* ------------------------------------------------------------- journey */
// Career trajectory: a pinned chart that draws itself with scroll; each node is a role.
const exp=$('#exp');
if(exp){
  const roles=$$('.exp-role',exp), W=1000, H=300;
  const X=[0,.10,.22,.73,1], Y=[.88,.66,.5,.2,.08];   // start, three roles (by date), end
  const P=[0,.08,.40,.72,1];                          // scroll progress at which each point is reached
  const pts=X.map((x,i)=>[x*W,Y[i]*H]);
  let d=`M${pts[0]}`;
  for(let i=0;i<pts.length-1;i++){
    const p0=pts[i-1]||pts[i], p1=pts[i], p2=pts[i+1], p3=pts[i+2]||p2;
    d+=`C${p1[0]+(p2[0]-p0[0])/6},${p1[1]+(p2[1]-p0[1])/6} ${p2[0]-(p3[0]-p1[0])/6},${p2[1]-(p3[1]-p1[1])/6} ${p2}`;
  }
  const line=$('#expLine'), area=$('#expArea'), ghost=$('#expGhost'), clipR=$('#expClipRect');
  line.setAttribute('d',d);ghost.setAttribute('d',d);area.setAttribute('d',d+`L${W},${H}L0,${H}Z`);
  const len=line.getTotalLength(), LUT=[];
  for(let i=0;i<=400;i++){const q=line.getPointAtLength(len*i/400);LUT.push([q.x/W,q.y/H])}
  const yAt=x=>{let lo=0,hi=LUT.length-1;while(hi-lo>1){const m=(lo+hi)>>1;LUT[m][0]<x?lo=m:hi=m}const a=LUT[lo],b=LUT[hi],t=(x-a[0])/((b[0]-a[0])||1);return a[1]+(b[1]-a[1])*t};
  const nodesEl=$('#expNodes'), names=['BlackCoffer','WhizMedia','Continuum Media'];
  nodesEl.innerHTML=[1,2,3].map((k,i)=>`<button class="exp-node" type="button" data-k="${i}" style="left:${X[k]*100}%;top:${Y[k]*100}%" aria-label="Jump to ${names[i]}"><span class="mono">${names[i]}</span></button>`).join('');
  const nodes=$$('.exp-node',nodesEl), head=$('#expHead'), scan=$('#expScan'), dateEl=$('#expDate');
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const interp=(xs,ys,v)=>{for(let i=0;i<xs.length-1;i++){if(v<=xs[i+1]){const t=(v-xs[i])/((xs[i+1]-xs[i])||1);return ys[i]+(ys[i+1]-ys[i])*t}}return ys[ys.length-1]};
  let cur=-1;
  function countUp(el){
    const to=parseFloat(el.dataset.to);if(isNaN(to))return;
    const dec=+(el.dataset.dec||0), suf=el.dataset.suf||'', t0=performance.now(), dur=1100;
    const f=v=>(dec?v.toFixed(dec):Math.round(v).toLocaleString('en-US'))+suf;
    el._run=t0;(function step(now){const q=Math.min(1,Math.max(0,(now-t0)/dur));el.textContent=f(to*(1-Math.pow(1-q,3)));if(q<1&&el._run===t0)requestAnimationFrame(step)})(t0);
  }
  function setRole(i){
    if(i===cur)return;cur=i;
    roles.forEach((r,n)=>{r.classList.toggle('is-active',n===i);r.classList.toggle('is-before',n<i);r.classList.toggle('is-after',n>i)});
    nodes.forEach((n,k)=>n.classList.toggle('is-active',k===i));
    if(!reduced)countUp($('.exp-metric',roles[i]));
  }
  const pinnedExp=()=>innerWidth>900&&!reduced;
  function sizeExp(){
    const det=$('#expDetail');
    if(!pinnedExp()){exp.style.height='';det.style.height='';return}
    det.style.height=Math.max(...roles.map(r=>r.offsetHeight))+'px';
    exp.style.height='calc(100svh + 240svh)';
  }
  function draw(x){
    clipR.setAttribute('width',(x*W).toFixed(1));
    const y=yAt(Math.max(x,.0005));
    head.style.left=scan.style.left=(x*100)+'%';head.style.top=(y*100)+'%';
    const m=Math.round(x*15)+5;dateEl.textContent=`${months[m%12]} ${2025+Math.floor(m/12)}`;
    nodes.forEach((n,k)=>n.classList.toggle('is-reached',x>=X[k+1]-.002));
  }
  function updateExp(){
    if(!pinnedExp()){draw(1);setRole(cur<0?0:cur);return}
    const r=exp.getBoundingClientRect(), span=r.height-innerHeight;
    const p=clamp(-r.top/span,0,1);
    draw(interp(P,X,p));
    setRole(p>=P[3]?2:p>=P[2]?1:0);
  }
  nodes.forEach(n=>n.addEventListener('click',()=>{
    const k=+n.dataset.k;
    if(!pinnedExp()){roles[k].scrollIntoView({behavior:'smooth',block:'center'});return}
    const r=exp.getBoundingClientRect(), span=r.height-innerHeight;
    const y=scrollY+r.top+span*(P[k+1]+.02);
    lenis?lenis.scrollTo(y):window.scrollTo({top:y,behavior:'smooth'});
  }));
  window.addEventListener('resize',()=>{sizeExp();updateExp()});
  if(document.fonts)document.fonts.ready.then(()=>{sizeExp();updateExp()});
  sizeExp();setRole(0);updateExp();pinJ=updateExp;
}

/* ------------------------------------------------------------ counters */
const countObs=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(!e.isIntersecting)return;countObs.unobserve(e.target);
  const el=e.target, end=parseFloat(el.dataset.count), dec=Number(el.dataset.decimals||0), suf=el.dataset.suffix||'';
  const fmt=v=>(dec?v.toFixed(dec):Math.round(v).toLocaleString('en-US'))+suf;
  if(reduced){el.textContent=fmt(end);return}
  const t0=performance.now(), dur=1800;
  const step=now=>{const p=Math.min((now-t0)/dur,1);el.textContent=fmt(end*(1-Math.pow(1-p,4)));if(p<1)requestAnimationFrame(step)};
  requestAnimationFrame(step);
}),{threshold:.6});
$$('[data-count]').forEach(el=>countObs.observe(el));

/* ---------------------------------------------------------------- deck */
const V=window.PortfolioVisuals||{};
const pad=n=>String(n+1).padStart(2,'0');
const deck=$('#deck');
deck.innerHTML=projects.map((p,i)=>`
  <article class="pcard" style="--project:${p.color};--i:${i}" data-reveal>
    <button class="pcard-visual" type="button" data-open="${i}" aria-label="Open ${esc(p.title)} case study">
      ${V[p.viz]?V[p.viz](`s${i}`,p.color):''}
      <span class="pcard-glare" aria-hidden="true"></span>
      <span class="pcard-num mono">${pad(i)}</span>
    </button>
    <div class="pcard-info">
      <span class="pcard-cat mono">${esc(p.category)}</span>
      <h3>${esc(p.title)}</h3>
      <p class="pcard-sub">${esc(p.subtitle)}</p>
      <p class="pcard-desc">${esc(p.description)}</p>
      <div class="chips">${p.tech.map(t=>`<span>${esc(t)}</span>`).join('')}</div>
      <div class="pcard-actions">
        <button class="btn btn-project" type="button" data-open="${i}"><span>Case study</span><i>↗</i></button>
        <a class="btn btn-ghost btn-icon" href="${p.url}" target="_blank" rel="noopener noreferrer" aria-label="${esc(p.title)} code"><span>Code</span><i>↗</i></a>
      </div>
    </div>
  </article>`).join('');
const pcards=$$('.pcard',deck);
$$('[data-open]',deck).forEach(b=>b.addEventListener('click',()=>openProject(+b.dataset.open)));
pcards.forEach(c=>{revealObs.observe(c);new IntersectionObserver(([e])=>{if(e.isIntersecting)c.classList.add('is-in')},{threshold:.3}).observe(c)});
if(finePointer&&!reduced){
  $$('.pcard-visual',deck).forEach(v=>{
    v.addEventListener('pointermove',e=>{
      const b=v.getBoundingClientRect(), px=(e.clientX-b.left)/b.width, py=(e.clientY-b.top)/b.height;
      v.style.setProperty('--ry',`${(px-.5)*8}deg`);v.style.setProperty('--rx',`${(.5-py)*6}deg`);
      v.style.setProperty('--gx',`${px*100}%`);v.style.setProperty('--gy',`${py*100}%`);
    });
    v.addEventListener('pointerleave',()=>{v.style.setProperty('--ry','0deg');v.style.setProperty('--rx','0deg')});
  });
}

/* --------------------------------------------------------------- modal */
// A modal <dialog> sits in the browser's top layer, above every z-index, so the
// custom cursor would be hidden behind it. Re-showing the cursor as a popover puts
// it back on top; older browsers get the cursor moved inside the dialog instead.
const cursorEl=$('#cursor');
function liftCursor(){
  if(!root.classList.contains('has-cursor')||!cursorEl)return;
  if(typeof cursorEl.showPopover==='function'){
    if(!cursorEl.hasAttribute('popover'))cursorEl.setAttribute('popover','manual');
    try{cursorEl.hidePopover()}catch(e){}
    try{cursorEl.showPopover()}catch(e){}
  }else{
    $('#projectDialog').appendChild(cursorEl);
  }
}
function dropCursor(){
  if(cursorEl&&cursorEl.parentElement!==body)body.insertBefore(cursorEl,body.firstChild);
}
const modal=$('#projectDialog'), modalBody=$('#modalBody');
let modalCount=0;
function openProject(i){
  const p=projects[i];
  modal.style.setProperty('--project',p.color);
  $('#modalLabel').textContent=`Project ${pad(i)} / ${p.category}`;
  modalBody.innerHTML=`<div class="modal-visual">${V[p.viz]?V[p.viz](`m${modalCount++}`,p.color):''}</div>
  <div class="modal-content">
    <div>
      <h2 id="modalTitle">${esc(p.title)}</h2>
      <p><strong>${esc(p.subtitle)}</strong></p>
      <p>${esc(p.details)}</p>
    </div>
    <div class="modal-side">
      <div class="modal-tags">${p.tech.map(t=>`<span>${esc(t)}</span>`).join('')}</div>
      <div class="modal-actions">
        <a class="btn btn-project" href="${p.url}" target="_blank" rel="noopener noreferrer"><span>View repository</span><i>↗</i></a>
        ${p.demo?`<a class="btn btn-ghost" href="${p.demo}" target="_blank" rel="noopener noreferrer"><span>Watch demo</span><i>▶</i></a>`:''}
      </div>
    </div>
  </div>`;
  modal.showModal();
  lenis&&lenis.stop();
  liftCursor();
  body.style.overflow='hidden';
}
function closeModal(){
  if(!modal.open||modal.classList.contains('is-closing'))return;
  if(reduced){modal.close();return}
  modal.classList.add('is-closing');
  setTimeout(()=>{modal.classList.remove('is-closing');modal.close()},380);
}
modal.addEventListener('close',()=>{body.style.overflow='';dropCursor();lenis&&lenis.start()});
modal.addEventListener('cancel',e=>{e.preventDefault();closeModal()});
$('#modalClose').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});

/* -------------------------------------------------------------- skills */
const cloud=$('#skillCloud'), tabs=$$('.skill-tab'), caption=$('#skillCaption'), cmdEl=$('#termCmd');
let typeTimer=0;
function showSkills(cat){
  tabs.forEach(t=>{const on=t.dataset.skill===cat;t.classList.toggle('is-active',on);t.setAttribute('aria-selected',String(on))});
  const list=skillSets[cat], cmd=`ls ./${cat} --all`;
  clearTimeout(typeTimer);cloud.innerHTML='';caption.textContent='';
  const render=()=>{
    cloud.innerHTML=list.map((s,i)=>`<span class="skill-chip" style="--i:${i}"><i>${String(i+1).padStart(2,'0')}</i>${esc(s)}</span>`).join('');
    requestAnimationFrame(()=>cloud.classList.add('is-on'));
    caption.innerHTML=`<b>${String(list.length).padStart(2,'0')}</b> items in ${esc(skillNames[cat])} · 0.0${(list.length%7)+1}s`;
  };
  cloud.classList.remove('is-on');
  if(reduced){cmdEl.textContent=cmd;render();return}
  let k=0;
  (function type(){cmdEl.textContent=cmd.slice(0,k);if(k++<cmd.length){typeTimer=setTimeout(type,22)}else{typeTimer=setTimeout(render,120)}})();
}
tabs.forEach(t=>t.addEventListener('click',()=>{msg('');showSkills(t.dataset.skill)}));
showSkills('development');
const termMsg=$('#termMsg'), termForm=$('#termForm'), termInput=$('#termInput');
function msg(html){termMsg.innerHTML=html;termMsg.classList.toggle('is-on',!!html)}
const alias={dev:'development',development:'development',web:'development',analytics:'analytics',data:'analytics',ai:'ai','ai-vision':'ai',vision:'ai',ml:'ai',db:'databases',databases:'databases',cloud:'databases',tools:'tools'};
termForm.addEventListener('submit',e=>{
  e.preventDefault();
  const raw=termInput.value.trim();termInput.value='';if(!raw)return;
  const [cmd,...rest]=raw.toLowerCase().split(/\s+/), arg=(rest.join(' ')||'').replace(/^\.\/|\/$/g,'');
  if(cmd==='help')msg(`<b>commands</b> · <i>ls</i> [folder] · <i>cd</i> folder · <i>whoami</i> · <i>contact</i> · <i>clear</i><br>folders · development · analytics · ai · databases · tools`);
  else if((cmd==='ls'||cmd==='cd'||cmd==='cat')&&!arg)msg(`development/  analytics/  ai-vision/  databases/  tools/`);
  else if((cmd==='ls'||cmd==='cd'||cmd==='cat')&&alias[arg]){msg('');showSkills(alias[arg])}
  else if(alias[cmd]){msg('');showSkills(alias[cmd])}
  else if(cmd==='whoami')msg(`rahul ganatra — data analyst &amp; ai engineer · mumbai · open to work`);
  else if(cmd==='contact'||raw.toLowerCase().startsWith('sudo hire'))msg(`opening mail client… <a href="mailto:rahuljganatra07@gmail.com">rahuljganatra07@gmail.com</a>`),location.href='mailto:rahuljganatra07@gmail.com';
  else if(cmd==='clear')msg('');
  else msg(`zsh: command not found: ${esc(cmd)} — try <i>help</i>`);
});

/* ------------------------------------------------------------- contact */
const toast=$('#toast');let toastT=0;
function showToast(t){toast.textContent=t;toast.classList.add('is-on');clearTimeout(toastT);toastT=setTimeout(()=>toast.classList.remove('is-on'),2200)}
$('#copyEmail').addEventListener('click',async()=>{
  const v='rahuljganatra07@gmail.com';
  try{await navigator.clipboard.writeText(v);showToast('✓ email copied to clipboard')}
  catch(e){showToast(v)}
});

/* ------------------------------------------------------------- footer */
$('#year').textContent=new Date().getFullYear();
const timeEl=$('#localTime');
function tickTime(){
  try{const t=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit'}).format(new Date());timeEl.textContent='Mumbai — '+t+' IST';const n=$('#navTime');if(n)n.textContent='MUM '+t+' IST'}catch(e){}
}
tickTime();setInterval(tickTime,30000);
})();
