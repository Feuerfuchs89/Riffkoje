/* pfad-quiz.js – Quiz-/Übungsseite mit Kapiteln, Sternen, Schwachstellen. Benötigt shared.js und pfad.js */
(function(){
'use strict';
var PF=window.PF,esc=PF.esc;
PF.quizPage=function(cfg){
  PF.css();
  var app=document.getElementById('app'),P=MK.get(cfg.key,null);
  if(!P||typeof P!=='object')P={};
  P.stars=P.stars||{};P.weak=P.weak||{};P.h=P.h||0;P.m=P.m||0;
  var ALL=[];cfg.chapters.forEach(function(c){c.ls.forEach(function(L){L.ch=c.id;ALL.push(L)})});
  var R=null,KB=null,tim=[],micMsg='',midiMsg='';
  function save(){try{MK.set(cfg.key,P)}catch(e){}}
  function stars(L){return P.stars[L.id]||0}
  function stopT(){tim.forEach(clearTimeout);tim=[]}

  function nextUndone(){var i=P.last?ALL.findIndex(function(l){return l.id===P.last}):-1,k;for(k=1;k<=ALL.length;k++){var L=ALL[(i+k+ALL.length)%ALL.length];if(!stars(L))return L}return ALL[(i+1)%ALL.length]}
  function weakList(){return ALL.filter(function(L){return (P.weak[L.id]||0)>=1}).sort(function(a,b){return P.weak[b.id]-P.weak[a.id]}).slice(0,3)}

  function picker(){
    stopT();R=null;
    var tot=0,openId=P.last?(ALL.filter(function(l){return l.id===P.last})[0]||ALL[0]).ch:cfg.chapters[0].id,h='';
    h+='<h1>'+cfg.emoji+' '+esc(cfg.title)+'</h1>';
    h+='<section class="card"><p class="small muted" style="margin:0">'+esc(cfg.desc)+'</p><div class="row" style="justify-content:space-between"><span class="small muted" id="sum"></span><span class="small muted">Trefferquote: '+(P.h+P.m?Math.round(P.h/(P.h+P.m)*100)+' %':'noch offen')+'</span></div><button class="btn primary" id="cont" type="button"></button><button class="btn" id="weak" type="button" hidden></button></section>';
    cfg.chapters.forEach(function(c){
      var sum=0;c.ls.forEach(function(L){sum+=stars(L)});tot+=sum;
      h+='<details class="ch"'+(c.id===openId?' open':'')+'><summary><span>'+esc(c.t)+'</span><span class="small muted">'+sum+' / '+c.ls.length*3+' ★</span></summary><div class="cd">'+esc(c.desc)+'</div><div class="lessons">'+
        c.ls.map(function(L){var s=stars(L);return '<button class="les" type="button" data-id="'+L.id+'"><b>'+esc(L.t)+'</b><span class="st" aria-label="'+s+' von 3 Sternen">'+PF.starsStr(s)+'</span><span class="sub">'+esc(L.sub||'')+'</span></button>'}).join('')+'</div></details>';
    });
    app.innerHTML=h;
    app.querySelector('#sum').textContent=tot+' von '+ALL.length*3+' Sternen';
    var nx=nextUndone(),c=app.querySelector('#cont');c.textContent='▶ Weiter: '+nx.t;c.onclick=function(){start([nx])};
    var wl=weakList(),w=app.querySelector('#weak');if(wl.length){w.hidden=false;w.textContent='🔁 Schwachstellen üben ('+wl.map(function(l){return l.t}).join(', ')+')';w.onclick=function(){start(wl,true)}}
    app.querySelectorAll('.les').forEach(function(b){b.onclick=function(){start([ALL.filter(function(l){return l.id===b.getAttribute('data-id')})[0]])}});
  }

  function start(pool,mixed){
    var L=pool[0];stopT();
    R={pool:pool,L:L,mixed:!!mixed,n:mixed?10:(L.n||10),qi:0,right:0,wrong:0,res:[],wrongBy:{},q:null,answered:false,t0:0};
    if(!mixed){P.last=L.id;save()}
    app.innerHTML='<section class="card" id="qa"></section><section class="card" id="kbc" hidden><svg class="kbs" id="kb" role="group" aria-label="Klaviertasten"></svg></section>'+
      '<section class="card"><div class="row"><button class="btn" id="mic" type="button" aria-pressed="false">🎤 Mikrofon</button><button class="btn" id="midi" type="button">🔌 MIDI</button></div><div class="meter" id="mtr" hidden><i id="lvl"></i><u id="thr"></u></div><div class="small muted" id="inmsg">Antworten per Bildschirm, MIDI-Keyboard oder Mikrofon (echtes Instrument). Mikrofon: spiele einzelne Töne deutlich.</div></section>';
    app.querySelector('#mic').onclick=toggleMic;app.querySelector('#midi').onclick=connectMidi;
    if(PF.Mic.on){app.querySelector('#mic').setAttribute('aria-pressed','true');app.querySelector('#mtr').hidden=false;bindMic()}
    nextQ(true);window.scrollTo(0,0);
  }
  function bindMic(){
    PF.Mic.start({note:function(m){input(m,'mic')},onset:function(t){tapIn('mic',t)},level:function(r,thr){var l=document.getElementById('lvl'),t=document.getElementById('thr');if(l){l.style.width=Math.min(100,r*500)+'%';t.style.left=Math.min(100,thr*500)+'%'}},miss:function(){var e=document.getElementById('inmsg');if(e)e.textContent='Ton nicht erkannt. Lauter oder deutlicher spielen.'}});
  }
  function toggleMic(){
    var b=app.querySelector('#mic'),msg=app.querySelector('#inmsg');
    if(PF.Mic.on){PF.Mic.stop();b.setAttribute('aria-pressed','false');app.querySelector('#mtr').hidden=true;msg.textContent='Mikrofon aus.';return}
    PF.Mic.start({},function(ok,err){if(ok){b.setAttribute('aria-pressed','true');app.querySelector('#mtr').hidden=false;msg.textContent='Mikrofon an. Es hört einzelne Töne und Klatschen.';msg.className='small ok';bindMic()}else{msg.textContent=err;msg.className='small muted'}});
  }
  var MIDI=null;
  function connectMidi(){
    var msg=app.querySelector('#inmsg');
    if(!navigator.requestMIDIAccess){msg.textContent='Dieser Browser unterstützt kein Web-MIDI. Auf Android geht es in Chrome oder Edge.';return}
    navigator.requestMIDIAccess().then(function(a){MIDI=a;function bind(){var n=0;a.inputs.forEach(function(i){n++;i.onmidimessage=function(e){var d=e.data;if((d[0]&0xF0)===0x90&&d[2]>0)input(d[1],'midi')}});var e2=document.getElementById('inmsg');if(e2){e2.textContent=n?'MIDI verbunden ('+n+' Eingang'+(n>1?'e':'')+').':'Kein MIDI-Gerät gefunden.';e2.className=n?'small ok':'small muted'}}a.onstatechange=bind;bind()},function(){msg.textContent='MIDI nicht erlaubt.'});
  }

  function nextQ(first){
    if(R.qi>=R.n){return finish()}
    var L=R.mixed?R.pool[PF.rnd(0,R.pool.length-1)]:R.L,q=null,g=0;
    while(!q&&g++<20){try{q=L.gen()}catch(e){q=null}}
    if(!q){app.querySelector('#qa').innerHTML='<p>Die Aufgabe konnte nicht erzeugt werden.</p>';return}
    q._L=L;R.q=q;R.answered=false;R.t0=Date.now();R.taps=[];R.got={};R.si=0;
    if(q.kind==='choice'){var txt=q.opts[q.ans];q.opts=PF.shuffle(q.opts);q.ansI=q.opts.indexOf(txt)}
    draw(first);
    if(q.audio)tim.push(setTimeout(function(){playQ()},first?200:100));
  }
  function playQ(){var q=R.q;if(!q||!q.audio)return;PF.play(q.audio)}
  function dotsHtml(){var h='';for(var i=0;i<R.n;i++)h+='<i class="'+(R.res[i]===true?'r':R.res[i]===false?'w':'')+(i===R.qi?' c':'')+'"></i>';return h}
  function draw(first){
    var q=R.q,qa=app.querySelector('#qa'),h='';
    h+='<div class="row" style="justify-content:space-between"><button class="btn" id="back" type="button">← Übersicht</button>'+(q.audio?'<button class="btn" id="rep" type="button">🔊 Nochmal hören</button>':'')+'</div>';
    h+='<h2>'+esc(R.mixed?'Schwachstellen-Training':R.L.t)+'</h2>';
    if(R.qi===0&&!R.mixed&&R.L.intro)h+='<details class="intro"'+(stars(R.L)?'':' open')+'><summary>Info zur Lektion</summary><p>'+esc(R.L.intro)+'</p></details>';
    h+='<div class="bar" aria-hidden="true">'+dotsHtml()+'</div><p class="q">'+esc(q.text)+'</p>';
    if(q.staff)h+=PF.staff(q.staff);
    if(q.kind==='choice')h+='<div class="opts">'+q.opts.map(function(o,i){return '<button class="btn opt" type="button" data-i="'+i+'">'+esc(o)+'</button>'}).join('')+'</div>';
    if(q.kind==='rhythm')h+='<button class="btn primary pad" id="pad" type="button">👏 Hier tippen oder klatschen</button>';
    h+='<div class="fb" id="fb" role="status"></div><p class="ex" id="ex"></p><div class="row" style="justify-content:center"><button class="btn primary" id="nx" type="button" hidden>Weiter</button></div>';
    qa.innerHTML=h;
    qa.querySelector('#back').onclick=function(){stopT();picker()};
    var rp=qa.querySelector('#rep');if(rp)rp.onclick=playQ;
    qa.querySelector('#nx').onclick=function(){R.qi++;nextQ(false)};
    if(q.kind==='choice')qa.querySelectorAll('.opt').forEach(function(b){b.onclick=function(){answerChoice(+b.getAttribute('data-i'))}});
    var kbc=app.querySelector('#kbc');
    if(q.kind==='keys'){kbc.hidden=false;KB=PF.keyboard(app.querySelector('#kb'),q.lo||60,q.hi||83,function(m,src){input(m,src)},{labels:!!q.labels,h:130,silent:!!PF.Mic.on});KB.mark([]);var qq=q;}
    else{kbc.hidden=true;KB=null}
    if(q.kind==='rhythm'){var pad=qa.querySelector('#pad');pad.onpointerdown=function(e){e.preventDefault();PF.click(false);tapIn('screen')};R.audioRh=true;if(!q.audio)q.audio=rhAudio(q)}
  }
  function rhAudio(q){var ev=[],t=0,beat=60/(q.bpm||80);q.pat.forEach(function(d){ev.push({m:[84],at:t*beat,d:.12});t+=d});return ev}
  function mark(ok,shown){
    var q=R.q;if(R.answered)return;R.answered=true;
    var dt=Math.min(25,(Date.now()-R.t0)/1000);PF.logSecs(cfg.log,dt);
    R.res[R.qi]=ok;if(ok){R.right++;P.h++}else{R.wrong++;P.m++;R.wrongBy[q._L.id]=(R.wrongBy[q._L.id]||0)+1}
    var fb=app.querySelector('#fb');fb.className='fb '+(ok?'ok':'bad');
    fb.textContent=ok?['Richtig!','Genau!','Super!','Stimmt!'][R.qi%4]:'Leider nicht. '+(shown?'Richtig wäre: '+shown+'.':'');
    app.querySelector('#ex').textContent=q.expl||'';
    var bar=app.querySelector('.bar');if(bar)bar.innerHTML=dotsHtml();
    app.querySelector('#nx').hidden=false;app.querySelector('#nx').textContent=R.qi+1>=R.n?'Fertig':'Weiter';
    if(!ok&&q.kind!=='choice'&&q.audio){tim.push(setTimeout(playQ,500))}
    save();
  }
  function answerChoice(i){
    if(R.answered)return;var q=R.q,bs=app.querySelectorAll('.opt'),ok=i===q.ansI;
    bs[q.ansI].classList.add('right');if(!ok)bs[i].classList.add('wrong');
    bs.forEach(function(b){b.disabled=true});mark(ok,q.opts[q.ansI]);
  }
  function input(m,src){
    var q=R&&R.q;if(!q||R.answered)return;
    if(q.kind==='rhythm'){if(src==='midi')tapIn('midi');return}
    if(q.kind!=='keys')return;
    var egal=q.pcOnly||src==='mic'||(src==='midi'&&PF.ui().oct!==false),pc=((m%12)+12)%12;
    if(q.mode==='set'){
      var need={};q.need.forEach(function(n){need[((n%12)+12)%12]=1});
      if(need[pc]){R.got[pc]=1;if(KB)KB.flash(m,'ok');if(Object.keys(R.got).length>=Object.keys(need).length)mark(true)}
      else{if(KB)KB.flash(m,'no');mark(false,q.shown||'')}
    }else{
      var want=q.need[R.si],hit=egal?(((want%12)+12)%12===pc):want===m;
      if(hit){if(KB)KB.flash(m,'ok');R.si++;if(R.si>=q.need.length)mark(true)}
      else{if(KB)KB.flash(m,'no');mark(false,q.shown||'')}
    }
  }
  function tapIn(src,t){
    var q=R&&R.q;if(!q||q.kind!=='rhythm'||R.answered)return;
    R.taps.push((t||performance.now()/1000));
    clearTimeout(R.tt);
    if(R.taps.length>=q.pat.length){judgeRh();return}
    R.tt=setTimeout(judgeRh,Math.max(2500,60/(q.bpm||80)*3000));
  }
  function judgeRh(){
    var q=R.q;if(!q||R.answered)return;clearTimeout(R.tt);
    var n=q.pat.length,tp=R.taps,ok=tp.length===n;
    if(ok&&n>1){
      var rat=[],i;for(i=0;i<n-1;i++){rat.push((tp[i+1]-tp[i])/q.pat[i])}
      var srt=rat.slice().sort(function(a,b){return a-b}),s=srt[Math.floor(srt.length/2)];
      for(i=0;i<rat.length;i++)if(Math.abs(rat[i]/s-1)>.3)ok=false;
    }
    mark(ok,'');app.querySelector('#fb').textContent=ok?'Richtig, der Rhythmus stimmt!':'Der Rhythmus war anders ('+tp.length+' von '+n+' Schlägen). Hör ihn dir nochmal an.';
  }
  function finish(){
    stopT();var n=R.n,ratio=R.right/n,s=ratio>=.9?3:ratio>=.7?2:1;
    if(!R.mixed){if(s>(P.stars[R.L.id]||0))P.stars[R.L.id]=s;P.weak[R.L.id]=R.wrong?Math.round((P.weak[R.L.id]||0)*.5+R.wrong):0}
    else R.pool.forEach(function(L){if(!R.wrongBy[L.id])P.weak[L.id]=Math.max(0,(P.weak[L.id]||0)-1)});
    save();
    var nxt=R.mixed?null:ALL[ALL.indexOf(R.L)+1];
    app.innerHTML='<section class="card win"><div class="big2">'+PF.starsStr(s)+'</div><div style="font-weight:600">'+(s===3?'Wunderbar! ':s===2?'Gut gemacht! ':'Geschafft! ')+R.right+' von '+n+' richtig.</div>'+
      '<div class="row" style="justify-content:center"><button class="btn primary" id="again" type="button">Nochmal</button>'+(nxt?'<button class="btn" id="nl" type="button">Nächste Lektion</button>':'')+'<button class="btn" id="ov" type="button">Übersicht</button></div></section>';
    var pool=R.pool,mixed=R.mixed;
    app.querySelector('#again').onclick=function(){start(pool,mixed)};
    var nl=app.querySelector('#nl');if(nl)nl.onclick=function(){start([nxt])};
    app.querySelector('#ov').onclick=picker;
  }
  picker();
  window.__pq={ALL:ALL,start:function(L){start([L])},get R(){return R},input:input,answerChoice:answerChoice,P:P,judgeRh:judgeRh,tapIn:tapIn};
};
})();
