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

/* ------------------------------------------------------------- reveals */
const revealObs=new IntersectionObserver(entries=>{
  let k=0;
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    e.target.style.setProperty('--d',(k++*0.08)+'s');
    e.target.classList.add('is-in');
    revealObs.unobserve(e.target);
  });
},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
$$('[data-reveal],[data-split]').forEach(el=>revealObs.observe(el));

/* ------------------------------------------------------- hero particles */
(function heroNetwork(){
  const cv=$('#heroCanvas');if(!cv)return;
  const ctx=cv.getContext('2d');
  let W=0,H=0,dpr=1,pts=[],raf=0,visible=true;
  const mouse={x:-9999,y:-9999,tx:-9999,ty:-9999};
  const ACC=[255,107,74], ACC2=[139,155,255];
  function resize(){
    dpr=Math.min(2,window.devicePixelRatio||1);
    W=cv.clientWidth;H=cv.clientHeight;
    cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    const n=clamp(Math.round(W*H/15000),36,120);
    pts=Array.from({length:n},()=>{
      const t=Math.random();
      return{x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.28,vy:(Math.random()-.5)*.28,r:Math.random()*1.4+.6,c:t<.08?ACC:t<.16?ACC2:null};
    });
  }
  function frame(){
    ctx.clearRect(0,0,W,H);
    mouse.x+=(mouse.tx-mouse.x)*.12;mouse.y+=(mouse.ty-mouse.y)*.12;
    const LINK=128, MR=190;
    for(const p of pts){
      const dx=mouse.x-p.x, dy=mouse.y-p.y, d=Math.hypot(dx,dy);
      if(d<MR&&d>1){const f=(1-d/MR)*.018;p.vx+=dx/d*f;p.vy+=dy/d*f}
      p.vx*=.992;p.vy*=.992;
      const sp=Math.hypot(p.vx,p.vy);if(sp<.08){p.vx+=(Math.random()-.5)*.04;p.vy+=(Math.random()-.5)*.04}
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<-20)p.x=W+20;if(p.x>W+20)p.x=-20;if(p.y<-20)p.y=H+20;if(p.y>H+20)p.y=-20;
    }
    for(let i=0;i<pts.length;i++){
      const a=pts[i];
      for(let j=i+1;j<pts.length;j++){
        const b=pts[j], dx=a.x-b.x, dy=a.y-b.y;
        if(Math.abs(dx)>LINK||Math.abs(dy)>LINK)continue;
        const d=Math.hypot(dx,dy);if(d>LINK)continue;
        const near=Math.hypot(mouse.x-(a.x+b.x)/2,mouse.y-(a.y+b.y)/2)<MR;
        const al=(1-d/LINK)*(near?.5:.13);
        ctx.strokeStyle=near?`rgba(255,107,74,${al})`:`rgba(236,232,225,${al})`;
        ctx.lineWidth=near?1:.7;
        ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
      }
    }
    for(const p of pts){
      const d=Math.hypot(mouse.x-p.x,mouse.y-p.y), glow=d<MR?1-d/MR:0;
      const col=p.c||[236,232,225];
      ctx.fillStyle=`rgba(${col[0]},${col[1]},${col[2]},${p.c?.95:.45+glow*.5})`;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r+glow*1.6+(p.c?1:0),0,Math.PI*2);ctx.fill();
      if(p.c){ctx.fillStyle=`rgba(${col[0]},${col[1]},${col[2]},.12)`;ctx.beginPath();ctx.arc(p.x,p.y,7+glow*6,0,Math.PI*2);ctx.fill()}
    }
    raf=visible&&!reduced?requestAnimationFrame(frame):0;
  }
  resize();frame();
  let rt;window.addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{resize();if(!raf)frame()},150)});
  const hero=$('#home');
  hero.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();mouse.tx=e.clientX-r.left;mouse.ty=e.clientY-r.top;if(mouse.x<-1000){mouse.x=mouse.tx;mouse.y=mouse.ty}});
  hero.addEventListener('pointerleave',()=>{mouse.tx=mouse.ty=-9999;mouse.x=mouse.y=-9999});
  new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(visible&&!raf&&!reduced)frame()}).observe(hero);
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
    const t=e.target.closest('[data-cursor],a,button,.skill-chip');
    const lbl=t&&t.dataset.cursor;
    root.classList.toggle('cursor-label',!!lbl);
    root.classList.toggle('cursor-hover',!!t&&!lbl);
    if(lbl)label.textContent=lbl;
  });
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
function onScroll(){
  const y=scrollY, vh=innerHeight;
  const max=document.documentElement.scrollHeight-vh;
  progress.style.transform=`scaleX(${max>0?y/max:0})`;
  topbar.classList.toggle('is-scrolled',y>20);
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

/* ------------------------------------------------------------- journey */
const jCards=$$('.journey-card'), jDetail=$('#journeyDetail'), jLine=$('#journeyLine');
function chooseJourney(i){
  jCards.forEach((c,k)=>{c.classList.toggle('is-active',k===i);c.setAttribute('aria-selected',String(k===i))});
  jLine.parentElement.style.setProperty('--p',`${((i+.5)/jCards.length)*100}%`);
  jLine.style.width=`${((i+.5)/jCards.length)*100}%`;
  jDetail.classList.remove('is-in');
  jDetail.textContent=journey[i];
  splitWords(jDetail);
  requestAnimationFrame(()=>requestAnimationFrame(()=>jDetail.classList.add('is-in')));
}
jCards.forEach((c,i)=>c.addEventListener('click',()=>chooseJourney(i)));
$('#journeyCards').addEventListener('keydown',e=>{
  const cur=jCards.findIndex(c=>c.classList.contains('is-active'));
  if(e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault();const n=(cur+1)%jCards.length;chooseJourney(n);jCards[n].focus()}
  if(e.key==='ArrowLeft'||e.key==='ArrowUp'){e.preventDefault();const n=(cur-1+jCards.length)%jCards.length;chooseJourney(n);jCards[n].focus()}
});
chooseJourney(0);

/* ------------------------------------------------------------ showcase */
const V=window.PortfolioVisuals||{};
const showcase=$('#showcase'), indexEl=$('#showcaseIndex'), visual=$('#stageVisual'), info=$('#stageInfo');
const glare=$('.stage-glare',visual);
const pad=n=>String(n+1).padStart(2,'0');
let active=-1, infoTimer=0, inView=false;
$('#projectTotal').textContent=pad(projects.length-1);

projects.forEach((p,i)=>{
  const b=document.createElement('button');
  b.className='index-item';b.type='button';b.setAttribute('role','tab');b.setAttribute('aria-selected','false');
  b.innerHTML=`<span class="mono">${pad(i)}</span><strong>${esc(p.title)}</strong><small>${esc(p.category)}</small><i class="bar"></i>`;
  b.addEventListener('click',()=>go(i));
  indexEl.appendChild(b);
  const s=document.createElement('div');
  s.className='slide';s.dataset.i=i;
  s.innerHTML=(V[p.viz]?V[p.viz](`s${i}`,p.color):'')+`<span class="slide-num">${pad(i)}</span>`;
  visual.insertBefore(s,glare);
});
const items=$$('.index-item',indexEl), slides=$$('.slide',visual);

function infoHTML(p){
  const m=(i,html)=>`<div class="m">${html.replace(/^<(\w+)/,`<$1 style="--i:${i}"`)}</div>`;
  return `<div class="info-text">
    ${m(0,`<span class="info-cat mono">${esc(p.category)}</span>`)}
    ${m(1,`<h3 class="info-title">${esc(p.title)}</h3>`)}
    ${m(2,`<p class="info-sub">${esc(p.subtitle)}</p>`)}
    ${m(3,`<p class="info-desc">${esc(p.description)}</p>`)}
    ${m(4,`<div class="info-chips">${p.tech.map(t=>`<span>${esc(t)}</span>`).join('')}</div>`)}
  </div>
  <div class="info-actions">
    ${m(5,`<button class="btn btn-project" type="button" data-open><span>Case study</span><i>↗</i></button>`)}
    ${m(6,`<a class="btn btn-ghost" href="${p.url}" target="_blank" rel="noopener noreferrer"><span>Repository</span><i>↗</i></a>`)}
    ${p.demo?m(7,`<a class="btn btn-ghost" href="${p.demo}" target="_blank" rel="noopener noreferrer"><span>Watch demo</span><i>▶</i></a>`):''}
  </div>`;
}

function go(i,dir){
  i=(i+projects.length)%projects.length;
  if(i===active)return;
  if(dir===undefined)dir=active<0||i>active?1:-1;
  const prev=active;active=i;
  const p=projects[i];
  showcase.style.setProperty('--project',p.color);
  showcase.dataset.dir=String(dir);
  // visual: wipe in new slide over a receding old one
  const next=slides[i];
  slides.forEach((s,k)=>{if(k!==i&&k!==prev)s.classList.remove('is-active','is-leaving')});
  if(prev>=0){
    const old=slides[prev];
    old.style.setProperty('--lx',dir>0?-1:1);
    old.classList.remove('is-active');old.classList.add('is-leaving');
    clearTimeout(old._t);old._t=setTimeout(()=>old.classList.remove('is-leaving'),1100);
  }
  void next.offsetWidth;
  next.classList.add('is-active');
  // index + counter
  items.forEach((it,k)=>{it.classList.toggle('is-active',k===i);it.setAttribute('aria-selected',String(k===i))});
  items[i].scrollIntoView&&indexEl.scrollWidth>indexEl.clientWidth&&indexEl.scrollTo({left:items[i].offsetLeft-16,behavior:reduced?'auto':'smooth'});
  $('#projectCurrent').textContent=pad(i);
  // text: out, then in
  clearTimeout(infoTimer);
  const swap=()=>{
    info.innerHTML=infoHTML(p);
    info.classList.remove('is-out','is-in');
    $('[data-open]',info).addEventListener('click',()=>openProject(active));
    void info.offsetWidth;
    info.classList.add('is-in');
  };
  if(prev<0||reduced)swap();
  else{info.classList.remove('is-in');info.classList.add('is-out');infoTimer=setTimeout(swap,420)}
}

if(reduced)showcase.classList.add('is-static');
indexEl.addEventListener('animationend',e=>{if(e.animationName==='fill'&&!reduced)go(active+1,1)});
showcase.addEventListener('pointerenter',()=>showcase.classList.add('is-paused'));
showcase.addEventListener('pointerleave',()=>{if(inView)showcase.classList.remove('is-paused')});
showcase.addEventListener('focusin',()=>showcase.classList.add('is-paused'));
showcase.addEventListener('focusout',e=>{if(!showcase.contains(e.relatedTarget))showcase.classList.remove('is-paused')});
new IntersectionObserver(([e])=>{
  inView=e.isIntersecting;
  if(inView&&active<0)go(0,1);
  showcase.classList.toggle('is-paused',!inView);
},{threshold:.25}).observe(showcase);
document.addEventListener('visibilitychange',()=>showcase.classList.toggle('is-paused',document.hidden||!inView));

$('#projectPrev').addEventListener('click',()=>go(active-1,-1));
$('#projectNext').addEventListener('click',()=>go(active+1,1));
document.addEventListener('keydown',e=>{
  if(!inView||modal.open||/INPUT|TEXTAREA/.test(document.activeElement.tagName))return;
  if(e.key==='ArrowRight'){go(active+1,1)}
  if(e.key==='ArrowLeft'){go(active-1,-1)}
});
// swipe + click-to-open on the visual
let sx=0,sy=0,swiped=false;
visual.addEventListener('pointerdown',e=>{sx=e.clientX;sy=e.clientY;swiped=false});
visual.addEventListener('pointerup',e=>{
  const dx=e.clientX-sx, dy=e.clientY-sy;
  if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)){swiped=true;go(active+(dx<0?1:-1),dx<0?1:-1)}
});
visual.addEventListener('click',e=>{if(!swiped&&!e.target.closest('.stage-controls'))openProject(active)});
// tilt + glare
if(finePointer&&!reduced){
  visual.addEventListener('pointermove',e=>{
    const b=visual.getBoundingClientRect(), px=(e.clientX-b.left)/b.width, py=(e.clientY-b.top)/b.height;
    visual.style.setProperty('--ry',`${(px-.5)*7}deg`);visual.style.setProperty('--rx',`${(.5-py)*5}deg`);
    visual.style.setProperty('--gx',`${px*100}%`);visual.style.setProperty('--gy',`${py*100}%`);
  });
  visual.addEventListener('pointerleave',()=>{visual.style.setProperty('--ry','0deg');visual.style.setProperty('--rx','0deg')});
}

/* --------------------------------------------------------------- modal */
const modal=$('#projectDialog'), modalBody=$('#modalBody');
let modalCount=0;
function openProject(i){
  const p=projects[i];
  modal.style.setProperty('--project',p.color);
  modalBody.innerHTML=`<div class="modal-visual">${V[p.viz]?V[p.viz](`m${modalCount++}`,p.color):''}</div>
  <div class="modal-content">
    <div>
      <span class="mono">Project ${pad(i)} / ${esc(p.category)}</span>
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
  showcase.classList.add('is-paused');
  modal.showModal();
  body.style.overflow='hidden';
}
function closeModal(){
  if(!modal.open||modal.classList.contains('is-closing'))return;
  if(reduced){modal.close();return}
  modal.classList.add('is-closing');
  setTimeout(()=>{modal.classList.remove('is-closing');modal.close()},380);
}
modal.addEventListener('close',()=>{body.style.overflow='';if(inView&&!showcase.matches(':hover'))showcase.classList.remove('is-paused')});
modal.addEventListener('cancel',e=>{e.preventDefault();closeModal()});
$('#modalClose').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});

/* -------------------------------------------------------------- skills */
const cloud=$('#skillCloud'), tabs=$$('.skill-tab'), pill=$('#skillPill'), caption=$('#skillCaption');
const allSkills=[...new Set(Object.values(skillSets).flat())];
cloud.innerHTML=allSkills.map(s=>`<span class="skill-chip">${esc(s)}</span>`).join('');
const chips=$$('.skill-chip',cloud);
function placePill(tab){
  pill.style.width=tab.offsetWidth+'px';pill.style.height=tab.offsetHeight+'px';
  pill.style.transform=`translate(${tab.offsetLeft}px,${tab.offsetTop}px)`;
}
function showSkills(cat){
  const set=new Set(skillSets[cat]);let k=0;
  chips.forEach(c=>{const on=set.has(c.textContent);c.style.setProperty('--i',on?k++:0);c.classList.toggle('is-on',on)});
  tabs.forEach(t=>{const on=t.dataset.skill===cat;t.classList.toggle('is-active',on);t.setAttribute('aria-selected',String(on));if(on)placePill(t)});
  caption.innerHTML=`<b>${String(set.size).padStart(2,'0')}</b> tools in ${esc(skillNames[cat])}`;
}
tabs.forEach(t=>t.addEventListener('click',()=>showSkills(t.dataset.skill)));
window.addEventListener('resize',()=>{const t=$('.skill-tab.is-active');t&&placePill(t)});
showSkills('development');
document.fonts&&document.fonts.ready.then(()=>{const t=$('.skill-tab.is-active');t&&placePill(t)});

/* ------------------------------------------------------------- footer */
$('#year').textContent=new Date().getFullYear();
const timeEl=$('#localTime');
function tickTime(){
  try{timeEl.textContent='Mumbai — '+new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit'}).format(new Date())+' IST'}catch(e){}
}
tickTime();setInterval(tickTime,30000);
})();
