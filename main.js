// ===== NAV SCROLL =====
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{nav.classList.toggle('s',window.scrollY>40);},{passive:true});

// ===== MOBILE MENU =====
const ham=document.getElementById('ham');
const mob=document.getElementById('mob');
function closeMob(){mob.classList.remove('o');ham.classList.remove('o');ham.setAttribute('aria-expanded','false');document.body.style.overflow='';}
ham.addEventListener('click',()=>{const open=mob.classList.toggle('o');ham.classList.toggle('o',open);ham.setAttribute('aria-expanded',open);document.body.style.overflow=open?'hidden':'';});

// ===== INTERSECTION OBSERVER (reveal) =====
const ro=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');ro.unobserve(e.target);}});},{threshold:0.08,rootMargin:'0px 0px -28px 0px'});
document.querySelectorAll('.r').forEach(el=>ro.observe(el));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const href=a.getAttribute('href');
    if(!href||href==='#')return;
    const target=document.querySelector(href);
    if(!target)return;
    e.preventDefault();
    window.scrollTo({top:target.getBoundingClientRect().top+window.pageYOffset-76,behavior:'smooth'});
    closeMob();
  });
});

// ===== PRIVACY MODAL =====
function openPP(){document.getElementById('ppOverlay').classList.add('on');document.body.style.overflow='hidden';}
function closePP(){document.getElementById('ppOverlay').classList.remove('on');document.body.style.overflow='';}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closePP();});

document.addEventListener('DOMContentLoaded',()=>{
  const ppOverlay=document.getElementById('ppOverlay');
  if(ppOverlay)ppOverlay.addEventListener('click',e=>{if(e.target===ppOverlay)closePP();});
  const ppClose=document.querySelector('.pp-close');
  if(ppClose)ppClose.addEventListener('click',closePP);
  const mobClose=document.getElementById('mobClose');
  if(mobClose)mobClose.addEventListener('click',closeMob);
  document.querySelectorAll('.mob-link').forEach(a=>{a.addEventListener('click',()=>closeMob());});
  document.querySelectorAll('a[href="javascript:void(0)"]').forEach(a=>{a.addEventListener('click',e=>{e.preventDefault();openPP();});});
  const footPP=document.querySelector('.foot-pp');
  if(footPP)footPP.addEventListener('click',openPP);
});

// ===== STATS COUNTER =====
function easeOutQuart(t){return 1-(1-t)**4;}
function animateCounter(el){
  const target=parseInt(el.dataset.target,10);
  const suffix=el.dataset.suffix||'';
  const duration=1600;
  const start=performance.now();
  function tick(now){
    const elapsed=now-start;
    const progress=Math.min(elapsed/duration,1);
    const val=Math.round(easeOutQuart(progress)*target);
    el.textContent=val+suffix;
    if(progress<1)requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const statsObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const nums=e.target.querySelectorAll('.stat-num[data-target]');
      nums.forEach(n=>animateCounter(n));
      statsObs.unobserve(e.target);
    }
  });
},{threshold:0.3});
const statsEl=document.querySelector('.stats');
if(statsEl)statsObs.observe(statsEl);

// ===== 3D CARD TILT =====
(function initTilt(){
  if(window.matchMedia('(hover: none)').matches)return; // skip on touch
  const cards=document.querySelectorAll('.svc-card');
  cards.forEach(card=>{
    let rafId=null;
    card.addEventListener('mousemove',e=>{
      if(rafId)cancelAnimationFrame(rafId);
      rafId=requestAnimationFrame(()=>{
        const rect=card.getBoundingClientRect();
        const x=((e.clientX-rect.left)/rect.width-.5)*2;
        const y=((e.clientY-rect.top)/rect.height-.5)*2;
        const rx=-y*7;
        const ry=x*7;
        card.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px) scale(1.01)`;
        const glow=card.querySelector('.svc-glow');
        if(glow){
          const gx=((e.clientX-rect.left)/rect.width)*100;
          const gy=((e.clientY-rect.top)/rect.height)*100;
          glow.style.left=gx-50+'%';
          glow.style.top=gy-50+'%';
        }
      });
    });
    card.addEventListener('mouseleave',()=>{
      if(rafId)cancelAnimationFrame(rafId);
      card.style.transform='';
      card.style.transition='border-color .3s, transform .5s cubic-bezier(.16,1,.3,1), box-shadow .3s';
      setTimeout(()=>{card.style.transition='';},500);
    });
  });
})();

// ===== CONTACT FORM =====
document.addEventListener('DOMContentLoaded',()=>{
  const cForm=document.getElementById('cForm');
  if(!cForm)return;
  cForm.addEventListener('submit',async e=>{
    e.preventDefault();
    const form=e.target;
    const name=document.getElementById('fname');
    const email=document.getElementById('femail');
    const msg=document.getElementById('fmsg');
    const gdpr=document.getElementById('fgdpr');
    if(!name.value.trim()){name.focus();return;}
    if(!email.value.trim()||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){email.focus();return;}
    if(!msg.value.trim()){msg.focus();return;}
    if(!gdpr.checked){gdpr.focus();return;}
    const btn=form.querySelector('.f-sub');
    btn.textContent='A enviar…';btn.disabled=true;
    try{
      const resp=await fetch('https://formspree.io/f/xaqvedjq',{method:'POST',headers:{'Accept':'application/json'},body:new FormData(form)});
      if(!resp.ok)throw new Error();
      form.style.transition='opacity .25s ease';
      form.style.opacity='0';
      setTimeout(()=>{form.style.display='none';document.getElementById('fOk').classList.add('on');},260);
    }catch{
      btn.textContent='Erro ao enviar. Tente novamente.';btn.disabled=false;
    }
  });
});

// ===== CANVAS (TRON) ANIMATION =====
(function initTron(){
  const canvas=document.getElementById('tronBg');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const A={r:56,g:189,b:248};
  const G={r:16,g:185,b:129};
  const V={r:129,g:140,b:248};
  const GRID=60;
  let segs=[],pulses=[],W,H,rafId,pulseTimer;
  function rc(c,a){return 'rgba('+c.r+','+c.g+','+c.b+','+a+')';}
  function build(){
    segs=[];
    const cols=Math.ceil(W/GRID)+2,rows=Math.ceil(H/GRID)+2;
    for(let i=0;i<52;i++){
      const x=Math.floor(Math.random()*cols)*GRID;
      const y=Math.floor(Math.random()*rows)*GRID;
      const h=Math.random()>.5;
      const len=(Math.floor(Math.random()*5)+2)*GRID;
      const r=Math.random();
      const col=r>.92?V:r>.84?G:A;
      const opa=.04+Math.random()*.07;
      segs.push({x1:x,y1:y,x2:h?x+len:x,y2:h?y:y+len,col,opa});
      const tx=h?x+len:x,ty=h?y:y+len;
      const l2=(Math.floor(Math.random()*3)+1)*GRID;
      segs.push({x1:tx,y1:ty,x2:h?tx:tx+l2,y2:h?ty+l2:ty,col,opa});
    }
  }
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;build();}
  resize();
  window.addEventListener('resize',resize,{passive:true});
  function startPulse(){
    if(pulseTimer)clearInterval(pulseTimer);
    pulseTimer=setInterval(()=>{
      if(!segs.length)return;
      const s=segs[Math.floor(Math.random()*segs.length)];
      pulses.push({s,t:0,spd:.003+Math.random()*.005});
    },420);
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    segs.forEach(sg=>{
      ctx.globalAlpha=sg.opa;
      ctx.strokeStyle=rc(sg.col,1);
      ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(sg.x1,sg.y1);ctx.lineTo(sg.x2,sg.y2);ctx.stroke();
      ctx.globalAlpha=sg.opa*3;
      ctx.fillStyle=rc(sg.col,1);
      ctx.beginPath();ctx.arc(sg.x1,sg.y1,2,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(sg.x2,sg.y2,2,0,Math.PI*2);ctx.fill();
    });
    ctx.globalAlpha=1;
    pulses=pulses.filter(p=>p.t<1.15);
    pulses.forEach(p=>{
      p.t+=p.spd;
      if(p.t>1)return;
      const sg=p.s;
      const px=sg.x1+(sg.x2-sg.x1)*p.t;
      const py=sg.y1+(sg.y2-sg.y1)*p.t;
      for(let i=4;i>=0;i--){
        const tt=Math.max(0,p.t-i*.055);
        const tx=sg.x1+(sg.x2-sg.x1)*tt;
        const ty=sg.y1+(sg.y2-sg.y1)*tt;
        ctx.globalAlpha=.5*(1-i/5);
        ctx.fillStyle=rc(sg.col,1);
        ctx.beginPath();ctx.arc(tx,ty,Math.max(.1,2-i*.35),0,Math.PI*2);ctx.fill();
      }
      const gr=ctx.createRadialGradient(px,py,0,px,py,14);
      gr.addColorStop(0,rc(sg.col,.7));
      gr.addColorStop(1,rc(sg.col,0));
      ctx.globalAlpha=.6;
      ctx.fillStyle=gr;
      ctx.fillRect(px-14,py-14,28,28);
      ctx.globalAlpha=1;
      ctx.fillStyle='#ffffff';
      ctx.beginPath();ctx.arc(px,py,2.2,0,Math.PI*2);ctx.fill();
    });
    ctx.globalAlpha=1;
    rafId=requestAnimationFrame(draw);
  }
  startPulse();draw();
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){clearInterval(pulseTimer);pulseTimer=null;if(rafId)cancelAnimationFrame(rafId);}
    else{startPulse();draw();}
  });
})();
