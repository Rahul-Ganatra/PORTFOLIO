'use strict';
const projects=[
  {id:'drishti',category:'COMPUTER VISION',title:'DRISHTI',subtitle:'Intelligent Crowd Monitoring & Stampede Prediction',description:'A real-time crowd-monitoring and early-warning system built with OpenCV and MOG2, combining detection, risk alerts, and multi-platform delivery.',tech:['Python','OpenCV','Flask','Flutter'],url:'https://github.com/Rahul-Ganatra/DRISHTI',details:'Developed real-time crowd monitoring with OpenCV and MOG2. Built predictive risk alerts using Z-score and persistence techniques, with Flask/FastAPI, Flutter and Firebase supporting the web, mobile and cloud experience.'},
  {id:'customer',category:'DATA ANALYTICS',title:'Customer Trend Analysis Dashboard',subtitle:'Customer behavior, SQL and business intelligence',description:'Analyzed 3,900 transaction records with SQL and Pandas, then built interactive Power BI and Excel dashboards to surface patterns in customer behavior.',tech:['SQL','Python','Power BI','Pandas'],url:'https://github.com/Rahul-Ganatra/Customer-Trend-Analysis-Dashboard',details:'Analyzed 3,900 customer transactions, prepared the data using SQL and Pandas, and developed interactive KPI dashboards in Power BI and Excel to support reporting and marketing decisions.'},
  {id:'edutrack',category:'EXPLAINABLE AI',title:'EduTrack AI',subtitle:'Explainable student risk prediction',description:'An explainable AI product using Random Forest, SHAP, What-If simulations and React dashboards to help investigate student risk.',tech:['Python','SHAP','React','FastAPI'],url:'https://github.com/Rahul-Ganatra/EduTrack-AI',demo:'https://drive.google.com/file/d/1ofzM8PhyNhOIUSZQFwhJ_Ubq2I32GuDE/view?usp=drive_link',details:'An AI platform for real-time student risk prediction, featuring Random Forest, SHAP explanations, causal DAG concepts and What-If simulation. React and Recharts support the front end, with FastAPI serving the models.'},
  {id:'intellex',category:'GENERATIVE AI',title:'Intellex',subtitle:'Document intelligence with RAG',description:'An intelligent document analysis and question-answering system that extracts knowledge across multiple formats using NLP and retrieval-augmented generation.',tech:['Python','RAG','NLP','Streamlit'],url:'https://github.com/Rahul-Ganatra/Intellex',demo:'https://drive.google.com/file/d/1lft0wShEofg6RW0PBwG-JBa8UYbJa-V8/view?usp=drive_link',details:'Built an interactive document Q&A system using retrieval-augmented generation, LLMs and multiformat knowledge extraction. Added Streamlit dashboards and role-based reporting insights.'}
];
const journey=[
 'Cleaned and transformed Excel data, extracted structured information from large PDFs, improved data quality and prepared investor-ready reporting.',
 'Integrated APIs capturing 5,000+ engagement metrics; developed React dashboards and connected them to a Flask backend.',
 'Scraped over 1.4 million rows, automated PostgreSQL ingestion, and used Apache AGE Viewer to explore complex datasets.',
];
const skillSets={development:['React','Next.js','Flask','FastAPI','Flutter','JavaScript','HTML','CSS','Dart'],analytics:['Python','SQL','Pandas','NumPy','Power BI','Excel','Matplotlib','EDA','Reporting'],ai:['OpenCV','MediaPipe','scikit-learn','SHAP','RAG','NLP','LLMs','Random Forest','MOG2'],databases:['PostgreSQL','MySQL','MongoDB','Firebase','Neo4j','REST APIs','Data Pipelines'],tools:['Git','GitHub','Docker','VS Code','Kaggle','API Integration','Automation','Web Scraping']};
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const stage=$('#carouselStage'),dots=$('#carouselDots');let activeProject=1;let projectDirection=1;
function relativePosition(i){let d=i-activeProject;if(d>projects.length/2)d-=projects.length;if(d< -projects.length/2)d+=projects.length;return d;}
function renderCarousel(){stage.classList.remove('is-sliding');void stage.offsetWidth;stage.dataset.direction=projectDirection>0?'forward':'backward';stage.classList.add('is-sliding');stage.innerHTML='';dots.innerHTML='';projects.forEach((project,i)=>{const pos=relativePosition(i);const btn=document.createElement('button');btn.type='button';btn.className='project-card'+(Math.abs(pos)>2?' hidden':'');btn.dataset.pos=String(pos);btn.setAttribute('aria-label',`View ${project.title}`);btn.setAttribute('aria-hidden',pos===0?'false':'true');btn.tabIndex=pos===0?0:-1;btn.innerHTML=`<div><div class="window-dots"><i></i><i></i><i></i></div><span class="project-label">${project.category}</span><h3>${project.title}</h3><p>${project.description}</p></div><div class="project-bottom"><div class="chips">${project.tech.slice(0,3).map(t=>`<span class="chip">${t}</span>`).join('')}</div><span class="card-go">↗</span></div>`;btn.addEventListener('click',()=>{if(i===activeProject)openProject(i);else{projectDirection=relativePosition(i)>=0?1:-1;activeProject=i;renderCarousel()}});stage.appendChild(btn);const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label',`Show ${project.title}`);dot.className=i===activeProject?'active':'';dot.addEventListener('click',()=>{projectDirection=relativePosition(i)>=0?1:-1;activeProject=i;renderCarousel()});dots.appendChild(dot);});}
function moveProject(delta){projectDirection=delta>=0?1:-1;activeProject=(activeProject+delta+projects.length)%projects.length;renderCarousel()}
$('#projectPrev').addEventListener('click',()=>moveProject(-1));$('#projectNext').addEventListener('click',()=>moveProject(1));renderCarousel();
let touchStart=0;stage.addEventListener('touchstart',e=>{touchStart=e.changedTouches[0].screenX},{passive:true});stage.addEventListener('touchend',e=>{const delta=e.changedTouches[0].screenX-touchStart;if(Math.abs(delta)>35)moveProject(delta<0?1:-1)},{passive:true});stage.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')moveProject(-1);if(e.key==='ArrowRight')moveProject(1)});
const modal=$('#projectDialog');function openProject(i){const p=projects[i];$('#modalBody').innerHTML=`<div class="modal-topline">PROJECT ${String(i+1).padStart(2,'0')} / ${p.category}</div><h2>${p.title}</h2><p><strong>${p.subtitle}</strong></p><p>${p.details}</p><div class="modal-tags">${p.tech.map(t=>`<span>${t}</span>`).join('')}</div><div class="modal-actions"><a class="button button-orange" href="${p.url}" target="_blank" rel="noopener noreferrer">View repository ↗</a>${p.demo?`<a class="button button-outline" href="${p.demo}" target="_blank" rel="noopener noreferrer">View demo ↗</a>`:''}</div>`;modal.showModal()}
$('#modalClose').addEventListener('click',()=>modal.close());modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
function chooseJourney(i){const cards=$$('.journey-card');cards.forEach((c,idx)=>{c.classList.toggle('active',idx===i);c.setAttribute('aria-selected',String(idx===i))});$$('.journey-track i').forEach((n,idx)=>n.classList.toggle('selected',idx===i));const progress=cards.length>1?i/(cards.length-1)*100:0;$('#journeyLine').style.width=progress+'%';const detail=$('#journeyDetail');detail.classList.remove('is-changing');void detail.offsetWidth;detail.textContent=journey[i];detail.classList.add('is-changing')};$$('[data-journey]').forEach(c=>c.addEventListener('click',()=>chooseJourney(Number(c.dataset.journey))));
function showSkills(category){const list=skillSets[category];const selected=new Set(list);const all=[...new Set(Object.values(skillSets).flat())];const target=$('#orbitTags');target.dataset.category=category;target.innerHTML='';all.forEach((item,i)=>{const el=document.createElement('span');el.className='orbit-tag'+(selected.has(item)?' is-highlighted':'');el.textContent=item;el.style.animationDelay=i*18+'ms';target.appendChild(el)});$$('[data-skill]').forEach(el=>{el.classList.toggle('active',el.dataset.skill===category);el.setAttribute('aria-pressed',String(el.dataset.skill===category))})}$$('[data-skill]').forEach(el=>el.addEventListener('click',()=>showSkills(el.dataset.skill)));showSkills('development');
$('#year').textContent=new Date().getFullYear();
const menu=$('#menuToggle');menu.addEventListener('click',()=>{const open=$('#nav').classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});$$('#nav a').forEach(a=>a.addEventListener('click',()=>{$('#nav').classList.remove('open');menu.setAttribute('aria-expanded','false')}));
const anchors=$$('main section[id]');const navLinks=$$('#nav a');const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id))}})},{rootMargin:'-18% 0px -67% 0px',threshold:0});anchors.forEach(el=>observer.observe(el));
function updateScroll(){const max=document.documentElement.scrollHeight-window.innerHeight;$('#progressFill').style.width=(max>0?window.scrollY/max*100:0)+'%';$('#topbar').classList.toggle('scrolled',window.scrollY>25)}window.addEventListener('scroll',updateScroll,{passive:true});updateScroll();
const reveals=$$('.section,.contact');reveals.forEach(el=>el.classList.add('reveal'));const revealObserver=new IntersectionObserver(entries=>{entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add('visible');revealObserver.unobserve(x.target)}})},{threshold:.07});reveals.forEach(el=>revealObserver.observe(el));
const magneticTargets=$$('.button-orange,.button-dark,.outline-pill,.round-social');
magneticTargets.forEach(target=>target.addEventListener('pointermove',event=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const box=target.getBoundingClientRect();
  const x=(event.clientX-(box.left+box.width/2))*.12;
  const y=(event.clientY-(box.top+box.height/2))*.12;
  target.style.transform=`translate(${x}px,${y}px)`;
}));
magneticTargets.forEach(target=>target.addEventListener('pointerleave',()=>{target.style.transform=''}));
const pointerRoot=document.documentElement;
window.addEventListener('pointermove',event=>{
  pointerRoot.style.setProperty('--pointer-x',`${event.clientX}px`);
  pointerRoot.style.setProperty('--pointer-y',`${event.clientY}px`);
},{passive:true});
const counters=$$('[data-count]');
const countUp=(element)=>{
  const end=Number(element.dataset.count);
  const suffix=element.dataset.suffix||'';
  const start=performance.now();
  const tick=(now)=>{
    const progress=Math.min((now-start)/900,1);
    element.textContent=`${Math.round((1-Math.pow(1-progress,3))*end)}${suffix}`;
    if(progress<1)requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){countUp(entry.target);counterObserver.unobserve(entry.target)}
}),{threshold:.8});
counters.forEach(counter=>counterObserver.observe(counter));
const projectArea=$('.project-area');
let projectTimer=setInterval(()=>moveProject(1),6500);
projectArea?.addEventListener('mouseenter',()=>clearInterval(projectTimer));
projectArea?.addEventListener('mouseleave',()=>{clearInterval(projectTimer);projectTimer=setInterval(()=>moveProject(1),6500)});
$$('.project-card').forEach(card=>card.addEventListener('pointermove',event=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const rect=card.getBoundingClientRect();
  card.style.setProperty('--tilt-x',`${((event.clientY-rect.top)/rect.height-.5)*-5}deg`);
  card.style.setProperty('--tilt-y',`${((event.clientX-rect.left)/rect.width-.5)*5}deg`);
}));
$$('.project-card').forEach(card=>card.addEventListener('pointerleave',()=>{card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg')}));
stage.addEventListener('pointermove',event=>{
  const card=event.target.closest('.project-card');
  if(!card||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const rect=card.getBoundingClientRect();
  card.style.setProperty('--tilt-x',`${((event.clientY-rect.top)/rect.height-.5)*-5}deg`);
  card.style.setProperty('--tilt-y',`${((event.clientX-rect.left)/rect.width-.5)*5}deg`);
});
stage.addEventListener('pointerleave',()=>stage.querySelectorAll('.project-card').forEach(card=>{
  card.style.setProperty('--tilt-x','0deg');
  card.style.setProperty('--tilt-y','0deg');
}));
