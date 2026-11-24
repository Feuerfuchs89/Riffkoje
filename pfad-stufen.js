/* pfad-stufen.js – Instrumenten-Lehrpfad in Stufen mit Aufgaben (Haken, Zähler, Mikrofon-Töne, Griffbrett). Benötigt shared.js und pfad.js */
(function(){
'use strict';
var PF=window.PF,esc=PF.esc;
function pcEq(a,b){return ((a%12)+12)%12===((b%12)+12)%12}
function nmM(m){return PF.nm(PF.mkNote(m))}

/* Töne nacheinander auf dem echten Instrument spielen (Mikrofon) */
PF.noteCheck=function(el,spec,onDone){
  var notes=spec.notes,i=0,done=false,msg='';
  function draw(){
    el.innerHTML='<p class="small muted" style="margin:0">'+esc(spec.hint||'Spiele die Töne nacheinander auf deinem Instrument. Die Oktave ist egal.')+'</p>'+
      '<div class="row" id="ncs" style="gap:6px">'+notes.map(function(n,k){return '<span class="pill'+(k<i?' ok':'')+'" style="'+(k===i&&!done?'border-color:var(--acc);color:var(--ink);font-weight:700;':'')+'">'+esc(n.label||nmM(n.m))+'</span>'}).join('')+'</div>'+
      '<div class="meter" id="ncm" hidden><i></i><u></u></div><div class="small" id="ncg">'+(done?'Geschafft!':esc(msg))+'</div>'+
      '<div class="row"><button class="btn" id="ncmic" type="button" aria-pressed="'+(PF.Mic.on?'true':'false')+'">🎤 Mikrofon '+(PF.Mic.on?'aus':'starten')+'</button><button class="btn" id="ncman" type="button">✓ Habe ich gespielt</button></div>';
    el.querySelector('#ncmic').onclick=function(){if(PF.Mic.on){PF.Mic.stop();draw()}else startMic()};
    el.querySelector('#ncman').onclick=function(){if(done)return;i=notes.length;finish()};
    if(PF.Mic.on)bind();
  }
  function bind(){
    var m=el.querySelector('#ncm');if(m)m.hidden=false;
    PF.Mic.start({note:function(p){hit(p)},level:function(r,t){var mm=el.querySelector('#ncm');if(mm){mm.firstChild.style.width=Math.min(100,r*500)+'%';mm.lastChild.style.left=Math.min(100,t*500)+'%'}},miss:function(){var g=el.querySelector('#ncg');if(g)g.textContent='Ton nicht erkannt. Lauter oder deutlicher spielen.'}});
  }
  function startMic(){PF.Mic.start({},function(ok,err){if(ok){draw();bind()}else{msg=err;draw()}})}
  function hit(p){
    if(done||i>=notes.length||!document.body.contains(el))return;
    var want=notes[i].m,ok=pcEq(p,want);
    msg='Gehört: '+nmM(p)+(ok?' ✓':' (gesucht: '+(notes[i].label||nmM(want))+')');
    if(ok){i++;if(i>=notes.length){finish();return}}
    draw();
  }
  function finish(){done=true;draw();if(onDone)onDone()}
  spec.hit=hit;el._nc=hit;draw();
};

/* Griffbrett-Trainer (Gitarre): Saite und Bund finden */
PF.boardTrainer=function(el,spec,onDone){
  var T=spec.tuning,names=spec.names,fr=spec.frets||12,rounds=spec.rounds||10,cnt=0,cur=null,done=false,msg='',showPos=true;
  function nextT(){var s=PF.pick(spec.pick),f=PF.rnd(0,fr);cur={s:s,f:f,m:T[s]+f}}
  function svg(){
    var W=340,H=120,x0=30,fw=(W-x0-8)/fr,h='<svg viewBox="0 0 '+W+' '+H+'" class="staffsvg" role="img" aria-label="Griffbrett">';
    for(var f=0;f<=fr;f++)h+='<line x1="'+(x0+f*fw)+'" x2="'+(x0+f*fw)+'" y1="14" y2="'+(14+5*18)+'" stroke="var(--muted)" stroke-width="'+(f===0?4:1)+'"/>';
    [3,5,7,9,12].forEach(function(f){if(f<=fr)h+='<text x="'+(x0+(f-.5)*fw)+'" y="'+(H-2)+'" font-size="9" text-anchor="middle" fill="var(--muted)">'+f+'</text>'});
    for(var s=0;s<6;s++){var y=14+(5-s)*18;h+='<line x1="'+x0+'" x2="'+(W-8)+'" y1="'+y+'" y2="'+y+'" stroke="var(--ink)" stroke-width="'+(1+(5-s)*.0+ (s<3?1.2:.6))+'"/><text x="12" y="'+(y+4)+'" font-size="11" text-anchor="middle" fill="var(--muted)">'+names[s]+'</text>'}
    if(cur&&showPos){var cx=cur.f===0?x0-8:x0+(cur.f-.5)*fw,cy=14+(5-cur.s)*18;h+='<circle cx="'+cx+'" cy="'+cy+'" r="8" fill="var(--acc)"/>'}
    return h+'</svg>';
  }
  function draw(){
    if(done){el.innerHTML='<p class="ok">Geschafft! '+rounds+' Töne gefunden.</p><button class="btn" id="bagain" type="button">Nochmal</button>';el.querySelector('#bagain').onclick=function(){cnt=0;done=false;nextT();draw()};return}
    el.innerHTML='<div class="row" style="justify-content:space-between"><span class="small muted">'+cnt+' / '+rounds+'</span><button class="btn" id="bpos" type="button" aria-pressed="'+showPos+'">Position zeigen</button></div>'+svg()+
      '<p class="q" id="bq">'+(showPos?'Spiele diesen Punkt':'Spiele '+esc(PF.nm(PF.mkNote(cur.m)))+' auf der '+esc(spec.strNames[cur.s]))+'</p><div class="small" id="bg">'+esc(msg)+'</div>'+
      '<div class="meter" id="bm" '+(PF.Mic.on?'':'hidden')+'><i></i><u></u></div>'+
      '<div class="row"><button class="btn" id="bmic" type="button">🎤 Mikrofon '+(PF.Mic.on?'aus':'starten')+'</button><button class="btn" id="bman" type="button">✓ Gespielt</button></div>';
    el.querySelector('#bpos').onclick=function(){showPos=!showPos;draw()};
    el.querySelector('#bmic').onclick=function(){if(PF.Mic.on){PF.Mic.stop();draw()}else PF.Mic.start({},function(ok,err){if(ok){draw();bind()}else{msg=err;draw()}})};
    el.querySelector('#bman').onclick=function(){ok()};
    if(PF.Mic.on)bind();
  }
  function bind(){var m=el.querySelector('#bm');if(m)m.hidden=false;PF.Mic.start({note:function(p){hit(p)},level:function(r,t){var mm=el.querySelector('#bm');if(mm){mm.firstChild.style.width=Math.min(100,r*500)+'%';mm.lastChild.style.left=Math.min(100,t*500)+'%'}}})}
  function hit(p){if(done||!cur||!document.body.contains(el))return;if(pcEq(p,cur.m))ok();else{msg='Gehört: '+nmM(p)+'. Gesucht: '+nmM(cur.m)+'.';var g=el.querySelector('#bg');if(g)g.textContent=msg}}
  function ok(){cnt++;msg='';if(cnt>=rounds){done=true;draw();if(onDone)onDone();return}nextT();draw()}
  el._nc=hit;nextT();draw();
};

/* Wechselzähler: Aktionen in 60 Sekunden */
PF.counter=function(el,spec,best,onSave){
  var run=false,n=0,left=60,tm=null;
  function draw(){
    el.innerHTML='<p class="small muted" style="margin:0">'+esc(spec.hint||'Wechsle so oft wie möglich zwischen den Griffen. Tippe bei jedem sauberen Wechsel auf den großen Knopf. Ziel: '+spec.target+' in einer Minute.')+'</p>'+
      '<div class="big2" style="text-align:center;font-size:2.4rem;font-weight:800" id="cn">'+(run?n:best||0)+'</div><div class="small muted" style="text-align:center" id="ct">'+(run?left+' s':'Bestwert: '+(best||0)+' (Ziel '+spec.target+')')+'</div>'+
      (run?'<button class="btn primary pad" id="ctap" type="button">Wechsel!</button>':'<button class="btn primary" id="cstart" type="button">▶ 60 Sekunden starten</button>');
    var s=el.querySelector('#cstart');if(s)s.onclick=go;var t=el.querySelector('#ctap');if(t)t.onpointerdown=function(e){e.preventDefault();n++;el.querySelector('#cn').textContent=n};
  }
  function go(){run=true;n=0;left=60;draw();tm=setInterval(function(){left--;var c=el.querySelector('#ct');if(c)c.textContent=left+' s';if(left<=0){clearInterval(tm);run=false;if(n>best){best=n}onSave(n,best);draw()}},1000)}
  draw();
};

PF.stufenPage=function(cfg){
  PF.css();
  var app=document.getElementById('app'),P=MK.get(cfg.key,null);
  if(!P||typeof P!=='object')P={};P.done=P.done||{};P.best=P.best||{};
  function save(){try{MK.set(cfg.key,P)}catch(e){}}
  var all=[];cfg.stufen.forEach(function(s,si){s.tasks.forEach(function(t){t._s=si;all.push(t)})});
  function isDone(t){return !!P.done[t.id]}
  function stufeDone(s){return s.tasks.every(isDone)}
  function firstOpen(){return all.filter(function(t){return !isDone(t)})[0]}
  function render(openT){
    var d=all.filter(isDone).length,nx=firstOpen(),h='<h1>'+cfg.emoji+' '+esc(cfg.title)+'</h1>';
    h+='<section class="card"><p class="small muted" style="margin:0">'+esc(cfg.desc)+'</p><div class="meter" aria-hidden="true"><i style="width:'+Math.round(d/all.length*100)+'%"></i></div><div class="small muted">'+d+' von '+all.length+' Aufgaben, '+cfg.stufen.filter(stufeDone).length+' von '+cfg.stufen.length+' Stufen geschafft.</div>'+
      (nx?'<button class="btn primary" id="nxt" type="button">▶ Nächste Aufgabe: '+esc(nx.t)+'</button>':'<p class="ok" style="margin:0">Alle Stufen geschafft. Starke Leistung!</p>')+'</section>';
    var openS=openT?openT._s:(nx?nx._s:0);
    cfg.stufen.forEach(function(s,si){
      var sd=s.tasks.filter(isDone).length;
      h+='<details class="ch"'+(si===openS?' open':'')+'><summary><span>'+(stufeDone(s)?'✓ ':'')+esc(s.t)+'</span><span class="small muted">'+sd+' / '+s.tasks.length+'</span></summary><div class="cd">'+esc(s.ziel)+'</div><div style="display:grid;gap:8px;padding:6px 12px 12px">';
      s.tasks.forEach(function(t){
        var done=isDone(t);
        h+='<div class="card" style="padding:10px" data-t="'+t.id+'"><div class="chk'+(done?' done':'')+'"><input type="checkbox" '+(done?'checked ':'')+(t.kind==='check'||t.kind==='link'?'':'disabled ')+'aria-label="'+esc(t.t)+'" data-ck="'+t.id+'"><span>'+esc(t.t)+(t.kind==='counter'?' <span class="pill">Ziel '+t.target+(P.best[t.id]?', Best '+P.best[t.id]:'')+'</span>':'')+'</span></div>'+
          (t.d?'<p class="small muted" style="margin:0 0 0 32px">'+esc(t.d)+'</p>':'')+
          '<div class="row" style="margin-left:32px">'+(t.link?'<a class="btn" href="'+t.link[0]+'">'+esc(t.link[1])+' →</a>':'')+(t.kind==='counter'||t.kind==='notes'||t.kind==='board'?'<button class="btn" data-op="'+t.id+'" type="button">'+(t.kind==='counter'?'Zähler öffnen':'Üben')+'</button>':'')+'</div><div data-pn="'+t.id+'" style="margin-left:32px;display:grid;gap:8px"></div></div>';
      });
      h+='</div></details>';
    });
    app.innerHTML=h;
    var nb=app.querySelector('#nxt');if(nb)nb.onclick=function(){var t=nx;var e=app.querySelector('[data-t="'+t.id+'"]');if(e){var det=e.closest('details');if(det)det.open=true;e.scrollIntoView({block:'center'});var b=e.querySelector('[data-op]');if(b)b.click()}};
    app.querySelectorAll('[data-ck]').forEach(function(c){c.onchange=function(){var id=c.getAttribute('data-ck');if(c.checked)P.done[id]=1;else delete P.done[id];save();render(all.filter(function(t){return t.id===id})[0])}});
    app.querySelectorAll('[data-op]').forEach(function(b){b.onclick=function(){openPanel(b.getAttribute('data-op'))}});
    if(openT){var e2=app.querySelector('[data-t="'+openT.id+'"]');if(e2)e2.scrollIntoView({block:'center'})}
  }
  function complete(t){P.done[t.id]=1;save();var e=app.querySelector('[data-t="'+t.id+'"]');if(e){var c=e.querySelector('.chk');c.classList.add('done');var inp=c.querySelector('input');inp.checked=true;setTimeout(function(){if(document.body.contains(app))render(t)},1400)}}
  function openPanel(id){
    var t=all.filter(function(x){return x.id===id})[0],el=app.querySelector('[data-pn="'+id+'"]');
    if(el.innerHTML){el.innerHTML='';return}
    if(t.kind==='counter')PF.counter(el,t,P.best[id]||0,function(n,best){P.best[id]=best;if(best>=t.target)P.done[id]=1;save();render(t)});
    if(t.kind==='notes')PF.noteCheck(el,t,function(){complete(t)});
    if(t.kind==='board')PF.boardTrainer(el,t,function(){complete(t)});
  }
  render();
  window.__sp={all:all,P:P,openPanel:openPanel,render:render};
};
})();
