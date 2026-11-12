'use strict';
/* Animated, illustrated SVG scenes for each featured project.
   Every scene is drawn on an 800×500 canvas. `u` is a unique id prefix so the
   same scene can appear twice on the page (stage + modal) without id clashes. */
(function(){
  function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
  const gauss=(r)=>{let a=0;for(let i=0;i<4;i++)a+=r();return(a-2)/2};
  const css=(o)=>Object.entries(o).map(([k,v])=>`--${k}:${v}`).join(';');
  const BG='#0d0e12', PANEL='#13141a', LINE='rgba(236,232,225,.09)', TEXT='#ece8e1', MUTED='#8e909a';

  const gridDefs=(u,size=40)=>`<pattern id="${u}grid" width="${size}" height="${size}" patternUnits="userSpaceOnUse"><path d="M${size} 0H0V${size}" fill="none" stroke="rgba(236,232,225,.045)"/></pattern>`;

  /* ---------------- DRISHTI — crowd monitoring CCTV feed ---------------- */
  function drishti(u,c){
    const r=rng(11);
    const hot={x:505,y:300};
    let floor='';
    // perspective floor
    for(let i=0;i<9;i++){const y=150+Math.pow(i/8,1.7)*350;floor+=`<line x1="0" y1="${y.toFixed(1)}" x2="800" y2="${y.toFixed(1)}" stroke="${LINE}"/>`}
    for(let i=-8;i<=8;i++){floor+=`<line x1="${400+i*22}" y1="150" x2="${400+i*150}" y2="500" stroke="${LINE}"/>`}
    let people='';
    for(let i=0;i<110;i++){
      const near=r()<.55;
      const x=near?hot.x+gauss(r)*95:20+r()*760;
      const y=near?hot.y+gauss(r)*55:165+r()*320;
      if(y<158||y>495)continue;
      const s=.55+(y-150)/350*.8;
      const close=Math.hypot(x-hot.x,(y-hot.y)*1.6)<110;
      people+=`<circle class="drift" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(3.4*s).toFixed(2)}" fill="${close?c:'#c9cdd6'}" fill-opacity="${close?.95:.55}" style="${css({dx:((r()-.5)*22).toFixed(1)+'px',dy:((r()-.5)*10).toFixed(1)+'px',t:(3+r()*4).toFixed(2)+'s',dl:(-r()*5).toFixed(2)+'s'})}"/>`;
    }
    const box=(x,y,w,h,id,conf,dl)=>`<g class="fade" style="--dl:${dl}s"><path d="M${x} ${y+12}V${y}H${x+12}M${x+w-12} ${y}H${x+w}V${y+12}M${x+w} ${y+h-12}V${y+h}H${x+w-12}M${x+12} ${y+h}H${x}V${y+h-12}" fill="none" stroke="${c}" stroke-width="2"/><rect x="${x}" y="${y-20}" width="92" height="16" rx="3" fill="${c}"/><text x="${x+6}" y="${y-8.5}" font-size="9.5" fill="#0a0a0c" font-weight="600">ID ${id} · ${conf}</text></g>`;
    const spark=[18,22,20,27,25,31,30,38,36,44,49,47,56].map((v,i)=>`${i?'L':'M'}${150+i*7.5} ${452-v*.75}`).join('');
    return `<svg class="viz viz-drishti" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration: live crowd-density feed with risk alerts">
<defs>${gridDefs(u)}
<radialGradient id="${u}heat"><stop offset="0" stop-color="${c}" stop-opacity=".7"/><stop offset=".45" stop-color="${c}" stop-opacity=".22"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>
<radialGradient id="${u}heat2"><stop offset="0" stop-color="#f5c451" stop-opacity=".35"/><stop offset="1" stop-color="#f5c451" stop-opacity="0"/></radialGradient>
<linearGradient id="${u}scan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity="0"/><stop offset=".85" stop-color="${c}" stop-opacity=".10"/><stop offset="1" stop-color="${c}" stop-opacity=".45"/></linearGradient>
<linearGradient id="${u}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16171d"/><stop offset="1" stop-color="${BG}"/></linearGradient>
</defs>
<rect width="800" height="500" fill="url(#${u}sky)"/>
<rect width="800" height="150" fill="url(#${u}grid)" opacity=".7"/>
${floor}
<ellipse class="pulse" cx="${hot.x}" cy="${hot.y}" rx="220" ry="130" fill="url(#${u}heat)" style="--t:3.6s"/>
<ellipse class="pulse" cx="230" cy="380" rx="140" ry="80" fill="url(#${u}heat2)" style="--t:4.4s;--dl:-1s"/>
${people}
${box(430,248,150,104,'042','0.94',.6)}
${box(560,214,96,82,'117','0.88',.9)}
${box(168,330,110,90,'009','0.91',1.2)}
<rect class="scan" x="0" y="0" width="800" height="140" fill="url(#${u}scan)"/>
<g fill="none" stroke="${TEXT}" stroke-opacity=".6" stroke-width="1.5"><path d="M24 48V24h24M776 48V24h-24M24 452v24h24M776 452v24h-24"/></g>
<g font-size="11" fill="${TEXT}"><circle class="blink" cx="48" cy="54" r="5" fill="#ff3b3b"/><text x="60" y="58" letter-spacing="1.5">REC  CAM-03 / GATE B</text><text x="752" y="58" text-anchor="end" fill="${MUTED}" letter-spacing="1">MOG2 · 30 FPS</text></g>
<g class="fade" style="--dl:.5s"><rect x="40" y="372" width="290" height="96" rx="12" fill="rgba(10,10,12,.78)" stroke="${LINE}"/>
<text x="58" y="398" font-size="9.5" fill="${MUTED}" letter-spacing="1.5">CROWD DENSITY</text>
<text x="56" y="446" class="serif" font-size="46" fill="${TEXT}">4.2</text><text x="118" y="446" font-size="11" fill="${MUTED}">p/m²</text>
<path class="draw" d="${spark}" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" style="--len:160;--dl:.8s"/>
<circle class="pulse" cx="240" cy="410" r="4" fill="${c}"/>
<text x="250" y="398" font-size="9.5" fill="${MUTED}" letter-spacing="1.5">Z-SCORE</text>
<text x="250" y="420" font-size="15" fill="${c}" font-weight="600">+2.8σ</text>
<text class="blink" x="250" y="446" font-size="10" fill="${c}" letter-spacing="1.2">▲ ELEVATED</text></g>
<g class="fade" style="--dl:1.4s"><rect x="560" y="410" width="200" height="40" rx="20" fill="${c}"/><text x="660" y="434" text-anchor="middle" font-size="10.5" fill="#0a0a0c" font-weight="600" letter-spacing="1">ALERT → STEWARD TEAM</text></g>
</svg>`;
  }

  /* ---------------- Customer Trend Analysis — BI dashboard ---------------- */
  function customer(u,c){
    const bars=[46,62,38,74,58,92,66,52,80,44];
    const bx=210, bw=24, gap=10, base=430;
    let barSvg='';
    bars.forEach((v,i)=>{const h=v*2.1;const hi=i===5;barSvg+=`<rect class="grow" x="${bx+i*(bw+gap)}" y="${base-h}" width="${bw}" height="${h}" rx="5" fill="${hi?c:`url(#${u}bar)`}" style="--dl:${(.25+i*.06).toFixed(2)}s"/>`});
    const line=[30,42,36,55,48,66,60,78,74,90];
    const lx=592, lw=158, ly=430;
    const pts=line.map((v,i)=>[lx+i*(lw/(line.length-1)),ly-v*.9]);
    const lp=pts.map((p,i)=>`${i?'L':'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('');
    const ap=`${lp}L${lx+lw} ${ly}L${lx} ${ly}Z`;
    const seg=(off,len,col,dl)=>`<circle cx="671" cy="252" r="44" fill="none" stroke="${col}" stroke-width="14" stroke-dasharray="${len} 400" stroke-dashoffset="${-off}" transform="rotate(-90 671 252)" class="fade" style="--dl:${dl}s"/>`;
    const C=2*Math.PI*44;
    return `<svg class="viz viz-customer" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration: interactive customer analytics dashboard">
<defs>${gridDefs(u,32)}
<linearGradient id="${u}bar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3c48"/><stop offset="1" stop-color="#22232b"/></linearGradient>
<linearGradient id="${u}area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity=".35"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></linearGradient>
<radialGradient id="${u}glow" cx=".7" cy=".2" r=".8"><stop offset="0" stop-color="${c}" stop-opacity=".16"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>
</defs>
<rect width="800" height="500" fill="${BG}"/><rect width="800" height="500" fill="url(#${u}grid)"/><rect width="800" height="500" fill="url(#${u}glow)"/>
<g class="float" style="--t:7s"><rect x="28" y="28" width="744" height="444" rx="18" fill="${PANEL}" stroke="${LINE}"/>
<g fill="#2a2c36"><circle cx="50" cy="50" r="5"/><circle cx="66" cy="50" r="5"/><circle cx="82" cy="50" r="5"/></g>
<rect x="28" y="70" width="744" height="1" fill="${LINE}"/>
<rect x="28" y="71" width="150" height="401" fill="#101116"/>
<rect x="46" y="90" width="26" height="26" rx="7" fill="${c}"/><text x="82" y="108" font-size="11" fill="${TEXT}" letter-spacing="1">TRENDS</text>
<g fill="#262833"><rect x="46" y="140" width="96" height="9" rx="4.5"/><rect x="46" y="200" width="70" height="9" rx="4.5"/><rect x="46" y="230" width="88" height="9" rx="4.5"/><rect x="46" y="260" width="62" height="9" rx="4.5"/></g>
<rect x="38" y="160" width="130" height="28" rx="8" fill="rgba(245,196,81,.12)"/><rect x="46" y="170" width="80" height="9" rx="4.5" fill="${c}"/>
<g class="fade" style="--dl:.2s"><rect x="194" y="86" width="176" height="74" rx="12" fill="#181920" stroke="${LINE}"/><text x="210" y="108" font-size="9.5" fill="${MUTED}" letter-spacing="1.5">RECORDS ANALYZED</text><text x="208" y="146" class="serif" font-size="34" fill="${TEXT}">3,900</text></g>
<g class="fade" style="--dl:.3s"><rect x="382" y="86" width="176" height="74" rx="12" fill="#181920" stroke="${LINE}"/><text x="398" y="108" font-size="9.5" fill="${MUTED}" letter-spacing="1.5">SQL · PANDAS</text>${[18,26,14,30,22,34].map((h,i)=>`<rect x="${398+i*14}" y="${146-h}" width="8" height="${h}" rx="2" fill="${i===5?c:'#3a3c48'}"/>`).join('')}<text x="542" y="146" text-anchor="end" font-size="10" fill="${c}">CLEAN ✓</text></g>
<g class="fade" style="--dl:.4s"><rect x="570" y="86" width="186" height="74" rx="12" fill="#181920" stroke="${LINE}"/><text x="586" y="108" font-size="9.5" fill="${MUTED}" letter-spacing="1.5">POWER BI · EXCEL</text><path d="M586 146 L612 136 L634 140 L660 124 L684 128 L706 114 L740 118" fill="none" stroke="${c}" stroke-width="2"/></g>
<rect x="194" y="174" width="370" height="282" rx="12" fill="#15161c" stroke="${LINE}"/>
<text x="210" y="198" font-size="9.5" fill="${MUTED}" letter-spacing="1.5">PURCHASES BY CATEGORY</text>
<g stroke="${LINE}">${[0,1,2,3].map(i=>`<line x1="206" x2="552" y1="${430-i*55}" y2="${430-i*55}"/>`).join('')}</g>
${barSvg}
<g class="fade" style="--dl:1.2s"><rect x="352" y="216" width="72" height="24" rx="6" fill="${TEXT}"/><text x="388" y="232" text-anchor="middle" font-size="10" fill="#0a0a0c" font-weight="600">PEAK ↑</text><path d="M384 240 l4 5 l4 -5" fill="${TEXT}"/></g>
<rect x="576" y="174" width="180" height="150" rx="12" fill="#15161c" stroke="${LINE}"/>
<text x="592" y="198" font-size="9.5" fill="${MUTED}" letter-spacing="1.5">SEGMENTS</text>
<circle cx="671" cy="252" r="44" fill="none" stroke="#22232b" stroke-width="14"/>
${seg(0,C*.46,c,.5)}${seg(C*.47,C*.30,'#8b9bff',.7)}${seg(C*.78,C*.21,'#ff6b4a',.9)}
<rect x="576" y="334" width="180" height="122" rx="12" fill="#15161c" stroke="${LINE}"/>
<text x="592" y="358" font-size="9.5" fill="${MUTED}" letter-spacing="1.5">RETENTION TREND</text>
<path d="${ap}" fill="url(#${u}area)" class="fade" style="--dl:1s"/>
<path class="draw" d="${lp}" fill="none" stroke="${c}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="--len:240;--dl:.6s"/>
<circle class="pulse" cx="${pts[9][0].toFixed(1)}" cy="${pts[9][1].toFixed(1)}" r="5" fill="${c}"/>
</g></svg>`;
  }

  /* ---------------- EduTrack AI — explainable risk prediction ---------------- */
  function edutrack(u,c){
    const warm='#ff6b4a';
    const feats=[['Attendance',.21],['Late submissions',.11],['Assignment avg',.14],['Study hours',-.09],['Prior GPA',-.12],['LMS engagement',.08]];
    const cx=600, scale=520;
    let rows='';
    feats.forEach(([n,v],i)=>{
      const y=128+i*46, w=Math.abs(v)*scale, pos=v>0;
      const x=pos?cx:cx-w;
      rows+=`<text x="${cx-150}" y="${y+14}" font-size="10.5" fill="${MUTED}" text-anchor="start" class="fade" style="--dl:${(.2+i*.08).toFixed(2)}s">${n}</text>
<rect class="grow-x" x="${x.toFixed(1)}" y="${y+28}" width="${w.toFixed(1)}" height="12" rx="3" fill="${pos?warm:c}" style="--ox:${pos?'0%':'100%'};--dl:${(.35+i*.1).toFixed(2)}s"/>
<text class="fade" x="${(pos?cx+w+8:cx-w-8).toFixed(1)}" y="${y+38}" font-size="10" fill="${pos?warm:c}" text-anchor="${pos?'start':'end'}" style="--dl:${(.9+i*.1).toFixed(2)}s">${pos?'+':'−'}${Math.abs(v).toFixed(2)}</text>`;
    });
    // gauge arc (semi-circle) from 180° to 0°
    const gx=190, gy=250, R=92;
    const arc=(p)=>{const a=Math.PI*(1-p);return [gx+R*Math.cos(a),gy-R*Math.sin(a)]};
    const [ex,ey]=arc(.72);
    return `<svg class="viz viz-edutrack" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration: explainable student risk prediction with SHAP values">
<defs>${gridDefs(u)}
<linearGradient id="${u}g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c}"/><stop offset=".6" stop-color="#c58bff"/><stop offset="1" stop-color="${warm}"/></linearGradient>
<radialGradient id="${u}glow" cx=".25" cy=".45" r=".6"><stop offset="0" stop-color="${c}" stop-opacity=".18"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>
</defs>
<rect width="800" height="500" fill="${BG}"/><rect width="800" height="500" fill="url(#${u}grid)"/><rect width="800" height="500" fill="url(#${u}glow)"/>
<g class="float" style="--t:6s"><rect x="36" y="40" width="308" height="420" rx="18" fill="${PANEL}" stroke="${LINE}"/>
<circle cx="72" cy="78" r="16" fill="#23253a"/><circle cx="72" cy="73" r="6" fill="${c}"/><path d="M61 89a11 9 0 0 1 22 0" fill="${c}"/>
<text x="98" y="74" font-size="10" fill="${MUTED}" letter-spacing="1.5">STUDENT</text><text x="98" y="90" font-size="12" fill="${TEXT}">#2048 · Sem 5</text>
<text x="56" y="136" font-size="9.5" fill="${MUTED}" letter-spacing="1.5">PREDICTED RISK</text>
<path d="M${gx-R} ${gy}A${R} ${R} 0 0 1 ${gx+R} ${gy}" fill="none" stroke="#23242c" stroke-width="16" stroke-linecap="round"/>
<path class="draw" d="M${gx-R} ${gy}A${R} ${R} 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)}" fill="none" stroke="url(#${u}g)" stroke-width="16" stroke-linecap="round" style="--len:${(Math.PI*R*.72+4).toFixed(0)};--dl:.4s"/>
<circle class="pulse fade" cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="11" fill="none" stroke="${warm}" stroke-width="2" style="--dl:1.6s"/>
<text x="${gx}" y="${gy-14}" text-anchor="middle" class="serif" font-size="54" fill="${TEXT}">0.72</text>
<text x="${gx}" y="${gy+24}" text-anchor="middle" font-size="10.5" fill="${warm}" letter-spacing="2" class="blink">● HIGH RISK</text>
<rect x="56" y="300" width="268" height="1" fill="${LINE}"/>
<text x="56" y="330" font-size="9.5" fill="${MUTED}" letter-spacing="1.5">WHAT-IF SIMULATION</text>
<text x="56" y="352" font-size="11" fill="${TEXT}">Attendance +10%</text>
<rect x="56" y="370" width="268" height="4" rx="2" fill="#23242c"/><rect x="56" y="370" width="168" height="4" rx="2" fill="${c}"/>
<g class="drift" style="--dx:26px;--dy:0px;--t:2.8s"><circle cx="224" cy="372" r="10" fill="${TEXT}"/><circle cx="224" cy="372" r="4" fill="${c}"/></g>
<g class="fade" style="--dl:1.8s"><rect x="56" y="400" width="268" height="40" rx="10" fill="rgba(139,155,255,.12)" stroke="rgba(139,155,255,.35)"/><text x="72" y="425" font-size="11" fill="${TEXT}">Risk 0.72 → <tspan fill="${c}" font-weight="600">0.48</tspan></text><text x="308" y="425" text-anchor="end" font-size="10" fill="${c}">▼ 33%</text></g>
</g>
<g class="float" style="--t:7s;--dl:-2s"><rect x="364" y="40" width="400" height="420" rx="18" fill="${PANEL}" stroke="${LINE}"/>
<text x="384" y="74" font-size="9.5" fill="${MUTED}" letter-spacing="1.5">SHAP · FEATURE CONTRIBUTION</text>
<text x="744" y="74" text-anchor="end" font-size="9.5" fill="${c}">RANDOM FOREST</text>
<line x1="${cx}" y1="110" x2="${cx}" y2="410" stroke="${LINE}" stroke-dasharray="3 4"/>
${rows}
<rect x="384" y="416" width="360" height="1" fill="${LINE}"/>
<text x="384" y="440" font-size="10" fill="${MUTED}">E[f(x)] = 0.39</text><text x="744" y="440" text-anchor="end" font-size="10" fill="${TEXT}">f(x) = <tspan fill="${warm}">0.72</tspan></text>
</g></svg>`;
  }

  /* ---------------- Intellex — RAG document intelligence ---------------- */
  function intellex(u,c){
    const r=rng(5);
    const docs=[['PDF',70,'#ff6b4a'],['DOCX',195,'#8b9bff'],['CSV',320,'#f5c451']];
    let docSvg='', paths='', parts='';
    docs.forEach(([t,y,col],i)=>{
      docSvg+=`<g class="float" style="--t:${4+i}s;--dl:${-i}s"><rect x="40" y="${y}" width="150" height="104" rx="12" fill="${PANEL}" stroke="${LINE}"/><rect x="56" y="${y+16}" width="40" height="18" rx="4" fill="${col}"/><text x="76" y="${y+29}" text-anchor="middle" font-size="9" fill="#0a0a0c" font-weight="600">${t}</text>${[0,1,2,3].map(k=>`<rect x="56" y="${y+46+k*13}" width="${[110,92,104,64][k]}" height="6" rx="3" fill="#262833"/>`).join('')}</g>`;
      const pid=`${u}p${i}`;
      paths+=`<path id="${pid}" d="M190 ${y+52} C 260 ${y+52}, 270 250, 330 250" fill="none" stroke="${LINE}" stroke-width="1.5" stroke-dasharray="4 5"/>`;
      for(let k=0;k<3;k++)parts+=`<circle r="3.2" fill="${col}"><animateMotion dur="2.6s" begin="${(-k*.87-i*.3).toFixed(2)}s" repeatCount="indefinite" rotate="auto"><mpath href="#${pid}"/></animateMotion></circle>`;
    });
    paths+=`<path id="${u}out" d="M470 250 C 510 250, 520 210, 566 210" fill="none" stroke="${LINE}" stroke-width="1.5" stroke-dasharray="4 5"/>`;
    for(let k=0;k<3;k++)parts+=`<circle r="3.6" fill="${c}"><animateMotion dur="1.8s" begin="${(-k*.6).toFixed(2)}s" repeatCount="indefinite"><mpath href="#${u}out"/></animateMotion></circle>`;
    // vector index cluster
    const nodes=[];for(let i=0;i<26;i++){const a=r()*Math.PI*2, d=Math.sqrt(r())*68;nodes.push([400+Math.cos(a)*d,250+Math.sin(a)*d])}
    let edges='';nodes.forEach((a,i)=>nodes.forEach((b,j)=>{if(j>i&&Math.hypot(a[0]-b[0],a[1]-b[1])<34)edges+=`<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${c}" stroke-opacity=".25"/>`}));
    const nodeSvg=nodes.map(([x,y],i)=>`<circle class="pulse" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${i%5===0?4.5:2.6}" fill="${i%5===0?c:TEXT}" fill-opacity="${i%5===0?1:.55}" style="--t:${(2+r()*2.5).toFixed(2)}s;--dl:${(-r()*3).toFixed(2)}s"/>`).join('');
    return `<svg class="viz viz-intellex" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration: documents flowing through a vector index into an answer">
<defs>${gridDefs(u)}
<radialGradient id="${u}core"><stop offset="0" stop-color="${c}" stop-opacity=".35"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>
</defs>
<rect width="800" height="500" fill="${BG}"/><rect width="800" height="500" fill="url(#${u}grid)"/>
${paths}
${docSvg}
<circle cx="400" cy="250" r="120" fill="url(#${u}core)" class="pulse" style="--t:4s"/>
<circle cx="400" cy="250" r="86" fill="none" stroke="${c}" stroke-opacity=".35" stroke-dasharray="2 7" class="spin" style="--t:40s"/>
<circle cx="400" cy="250" r="100" fill="none" stroke="${LINE}" class="spin" style="--t:60s" stroke-dasharray="30 12"/>
<g class="spin" style="--t:90s">${edges}${nodeSvg}</g>
<text x="400" y="376" text-anchor="middle" font-size="10" fill="${MUTED}" letter-spacing="2">VECTOR INDEX · RETRIEVE</text>
${parts}
<g class="float" style="--t:6s;--dl:-1s"><rect x="566" y="56" width="202" height="388" rx="16" fill="${PANEL}" stroke="${LINE}"/>
<text x="584" y="84" font-size="9.5" fill="${MUTED}" letter-spacing="1.5">INTELLEX · Q&amp;A</text><circle cx="750" cy="81" r="4" fill="${c}" class="pulse"/>
<g class="fade" style="--dl:.3s"><rect x="606" y="104" width="146" height="40" rx="12" fill="#262833"/><text x="618" y="128" font-size="10.5" fill="${TEXT}">Summarize key risks</text></g>
<g class="fade" style="--dl:.8s"><rect x="582" y="160" width="170" height="150" rx="12" fill="rgba(56,217,196,.08)" stroke="rgba(56,217,196,.3)"/>
${[150,132,144,96,138,112].map((w,i)=>`<rect class="grow-x" x="596" y="${178+i*16}" width="${w}" height="6" rx="3" fill="${i===2?c:'#3a3c48'}" style="--dl:${(1+i*.12).toFixed(2)}s"/>`).join('')}
<rect x="596" y="276" width="54" height="20" rx="6" fill="${c}" class="fade" style="--dl:1.8s"/><text x="623" y="290" text-anchor="middle" font-size="9" fill="#0a0a0c" font-weight="600" class="fade" style="--dl:1.8s">[1] PDF</text>
<rect x="656" y="276" width="62" height="20" rx="6" fill="#8b9bff" class="fade" style="--dl:1.95s"/><text x="687" y="290" text-anchor="middle" font-size="9" fill="#0a0a0c" font-weight="600" class="fade" style="--dl:1.95s">[2] DOCX</text></g>
<g><circle cx="600" cy="336" r="3.5" fill="${MUTED}" class="blink"/><circle cx="612" cy="336" r="3.5" fill="${MUTED}" class="blink" style="animation-delay:.2s"/><circle cx="624" cy="336" r="3.5" fill="${MUTED}" class="blink" style="animation-delay:.4s"/></g>
<rect x="582" y="392" width="170" height="36" rx="18" fill="#191a21" stroke="${LINE}"/><text x="598" y="414" font-size="10" fill="${MUTED}">Ask anything…</text><circle cx="734" cy="410" r="12" fill="${c}"/><path d="M729 410h10m-4-4 4 4-4 4" stroke="#0a0a0c" stroke-width="1.6" fill="none"/>
</g></svg>`;
  }

  window.PortfolioVisuals={drishti,customer,edutrack,intellex};
})();
