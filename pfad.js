/* pfad.js – gemeinsamer Lehrpfad-Kern für Musikkoje: Musiktheorie-Bausteine, Töne, Mikrofon, Notenzeile, Klaviatur, Quiz-Seite */
(function(){
'use strict';
var PF=window.PF={};
var NAMES=['C','D','E','F','G','A','H'],PCW=[0,2,4,5,7,9,11];
var COL={C:'#e0453a',D:'#f08a1c',E:'#e9c200',F:'#46b04f',G:'#1fa3b8',A:'#4d7be0',H:'#a35bd0'};
PF.NAMES=NAMES;PF.PCW=PCW;PF.COL=COL;
PF.rnd=function(a,b){return a+Math.floor(Math.random()*(b-a+1))};
PF.pick=function(a){return a[PF.rnd(0,a.length-1)]};
PF.shuffle=function(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=PF.rnd(0,i),t=a[i];a[i]=a[j];a[j]=t}return a};
var PCS=[[0,0],[0,1],[1,0],[1,1],[2,0],[3,0],[3,1],[4,0],[4,1],[5,0],[5,1],[6,0]];
PF.mkNote=function(m){var pc=PCS[((m%12)+12)%12],o=Math.floor(m/12)-1;return {m:m,l:pc[0],a:pc[1],s:o*7+pc[0]}};
PF.white=function(s){var l=((s%7)+7)%7,o=Math.floor(s/7);return {m:12*(o+1)+PCW[l],s:s,a:0,l:l}};
PF.nm=function(n){var L=NAMES[n.l];if(!n.a)return L;
  if(n.a===1)return L+'is';if(n.a===2)return L+'isis';
  if(n.a===-1)return L==='H'?'B':L==='E'?'Es':L==='A'?'As':L+'es';
  return L==='H'?'Heses':L==='E'?'Eses':L==='A'?'Asas':L+'eses'};
PF.sym=function(n){var L=NAMES[n.l];if(n.a>0)return L+(n.a>1?'x':'#');if(n.a<0)return L==='H'?'B':L+'b';return L};
PF.colN=function(n){return COL[NAMES[n.l]]};
/* Notenname aus Notenwert mit Stufe */
PF.spell=function(root,loff,semis){return loff.map(function(lo,i){var s=root.s+lo,m=root.m+semis[i],nat=12*(Math.floor(s/7)+1)+PCW[((s%7)+7)%7];return {m:m,s:s,l:((s%7)+7)%7,a:m-nat}})};
PF.okAcc=function(ns){return ns.every(function(n){return Math.abs(n.a)<=1})};
PF.ROOTS={'C':[0,0],'G':[4,0],'D':[1,0],'A':[5,0],'E':[2,0],'H':[6,0],'F':[3,0],'B':[6,-1],'Es':[2,-1],'As':[5,-1],'Des':[1,-1],'Fis':[3,1]};
PF.root=function(name,oct){oct=oct==null?4:oct;var r=PF.ROOTS[name],s=oct*7+r[0],nat=12*(oct+1)+PCW[r[0]];return {m:nat+r[1],s:s,a:r[1],l:r[0]}};
PF.ROOTN=Object.keys(PF.ROOTS);
PF.rootLabel=function(k){return k};
PF.INT=[{k:1,s:0,n:'Prime'},{k:1,s:1,n:'übermäßige Prime'},{k:2,s:0,n:'verminderte Sekunde'},{k:2,s:1,n:'kleine Sekunde'},{k:2,s:2,n:'große Sekunde'},{k:2,s:3,n:'übermäßige Sekunde'},{k:3,s:2,n:'verminderte Terz'},{k:3,s:3,n:'kleine Terz'},{k:3,s:4,n:'große Terz'},{k:3,s:5,n:'übermäßige Terz'},{k:4,s:4,n:'verminderte Quarte'},{k:4,s:5,n:'reine Quarte'},{k:4,s:6,n:'übermäßige Quarte'},{k:5,s:6,n:'verminderte Quinte'},{k:5,s:7,n:'reine Quinte'},{k:5,s:8,n:'übermäßige Quinte'},{k:6,s:8,n:'kleine Sexte'},{k:6,s:9,n:'große Sexte'},{k:7,s:10,n:'kleine Septime'},{k:7,s:11,n:'große Septime'},{k:8,s:12,n:'reine Oktave'}];
PF.ivByName=function(n){return PF.INT.filter(function(x){return x.n===n})[0]};
PF.SEMI={0:'Prime',1:'kleine Sekunde',2:'große Sekunde',3:'kleine Terz',4:'große Terz',5:'reine Quarte',6:'Tritonus',7:'reine Quinte',8:'kleine Sexte',9:'große Sexte',10:'kleine Septime',11:'große Septime',12:'Oktave'};
PF.CHORDS={
 dur:{n:'Dur',s:[0,4,7],l:[0,2,4],sym:''},moll:{n:'Moll',s:[0,3,7],l:[0,2,4],sym:'m'},
 dim:{n:'vermindert',s:[0,3,6],l:[0,2,4],sym:'dim'},aug:{n:'übermäßig',s:[0,4,8],l:[0,2,4],sym:'aug'},
 maj7:{n:'Dur-Septakkord (maj7)',s:[0,4,7,11],l:[0,2,4,6],sym:'maj7'},dom7:{n:'Dominantseptakkord (7)',s:[0,4,7,10],l:[0,2,4,6],sym:'7'},
 m7:{n:'Moll-Septakkord (m7)',s:[0,3,7,10],l:[0,2,4,6],sym:'m7'},m7b5:{n:'halbvermindert (m7b5)',s:[0,3,6,10],l:[0,2,4,6],sym:'m7b5'},
 dim7:{n:'vermindert-septakkord (dim7)',s:[0,3,6,9],l:[0,2,4,6],sym:'dim7'},
 sus2:{n:'Sus2',s:[0,2,7],l:[0,1,4],sym:'sus2'},sus4:{n:'Sus4',s:[0,5,7],l:[0,3,4],sym:'sus4'},
 add9:{n:'Add9',s:[0,4,7,14],l:[0,2,4,8],sym:'add9'},six:{n:'Dur-Sext (6)',s:[0,4,7,9],l:[0,2,4,5],sym:'6'}
};
PF.SCALES={
 dur:{n:'Dur',s:[0,2,4,5,7,9,11]},moll:{n:'natürlich Moll',s:[0,2,3,5,7,8,10]},harm:{n:'harmonisch Moll',s:[0,2,3,5,7,8,11]},mel:{n:'melodisch Moll (aufwärts)',s:[0,2,3,5,7,9,11]},
 dor:{n:'Dorisch',s:[0,2,3,5,7,9,10]},phr:{n:'Phrygisch',s:[0,1,3,5,7,8,10]},lyd:{n:'Lydisch',s:[0,2,4,6,7,9,11]},mix:{n:'Mixolydisch',s:[0,2,4,5,7,9,10]},loc:{n:'Lokrisch',s:[0,1,3,5,6,8,10]},
 pdur:{n:'Dur-Pentatonik',s:[0,2,4,7,9],l:[0,1,2,4,5]},pmoll:{n:'Moll-Pentatonik',s:[0,3,5,7,10],l:[0,2,3,4,6]},blues:{n:'Blues-Tonleiter',s:[0,3,5,6,7,10],l:[0,2,3,4,4,6]}
};
PF.scaleNotes=function(rootName,key,oct){var sc=PF.SCALES[key],r=PF.root(rootName,oct);return PF.spell(r,sc.l||[0,1,2,3,4,5,6],sc.s)};
PF.chordNotes=function(root,key){var c=PF.CHORDS[key];return PF.spell(root,c.l,c.s)};

/* ───── Audio ───── */
var AC=null;
PF.ac=function(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(AC&&AC.state==='suspended')AC.resume();return AC};
PF.fq=function(m){return 440*Math.pow(2,(m-69)/12)};
PF.tone=function(m,dur,delay,vol){
  var c=PF.ac();if(!c)return;var t=c.currentTime+(delay||0),g=c.createGain(),f=PF.fq(m),len=dur||1.1,v=vol||.3;
  g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(v,t+0.012);g.gain.exponentialRampToValueAtTime(0.0001,t+len);g.connect(c.destination);
  [[1,'triangle',1],[2,'sine',.35],[3,'sine',.12],[4,'sine',.05]].forEach(function(p){var o=c.createOscillator(),pg=c.createGain();o.type=p[1];o.frequency.value=f*p[0];pg.gain.value=p[2];o.connect(pg);pg.connect(g);o.start(t);o.stop(t+len+.05)});
};
PF.click=function(strong,delay){var c=PF.ac();if(!c)return;var t=c.currentTime+(delay||0),o=c.createOscillator(),g=c.createGain();o.type='square';o.frequency.value=strong?1500:1000;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.12,t+.003);g.gain.exponentialRampToValueAtTime(.0001,t+.05);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+.06)};
/* events: [{m:[..],at:s,d:s}] → Gesamtdauer in s */
PF.play=function(ev){var end=0;PF.ac();ev.forEach(function(e){(e.m||[]).forEach(function(m){PF.tone(m,Math.min(3,(e.d||.6)+.25),e.at,.28/Math.sqrt(Math.max(1,e.m.length)))});if(e.at+(e.d||.6)>end)end=e.at+(e.d||.6)});
  if(PF.Mic.on)PF.Mic.ign=performance.now()+end*1000+500;return end};
PF.seqEv=function(ms,gap,d){return ms.map(function(m,i){return {m:[].concat(m),at:i*gap,d:d||gap*.9}})};

/* ───── Mikrofon ───── */
PF.detect=function(buf,sr){
  var N=buf.length,W=2048,minL=Math.floor(sr/1300),maxL=Math.min(Math.floor(sr/60),N-W-2),base=Math.max(0,N-W-maxL-1),i,t;
  var e0=0;for(i=0;i<W;i++)e0+=buf[base+i]*buf[base+i];
  if(e0<1e-4)return null;
  var e1=0;for(i=0;i<W;i++)e1+=buf[base+minL+i]*buf[base+minL+i];
  var nsdf=new Float32Array(maxL+2);
  for(t=minL;t<=maxL;t++){var c=0;for(i=0;i<W;i++)c+=buf[base+i]*buf[base+i+t];nsdf[t]=2*c/(e0+e1);e1+=buf[base+t+W]*buf[base+t+W]-buf[base+t]*buf[base+t]}
  var peaks=[],inPos=false,bi=-1,bv=-1;
  for(t=minL;t<=maxL;t++){
    if(nsdf[t]>0){if(!inPos){inPos=true;bi=-1;bv=-1}if(nsdf[t]>bv&&nsdf[t]>=nsdf[t-1]&&nsdf[t]>=nsdf[t+1]){bv=nsdf[t];bi=t}}
    else if(inPos){inPos=false;if(bi>0)peaks.push([bi,bv])}
  }
  if(inPos&&bi>0)peaks.push([bi,bv]);
  var mx=0;peaks.forEach(function(p){if(p[1]>mx)mx=p[1]});if(mx<.6)return null;
  var pk=null;for(i=0;i<peaks.length;i++)if(peaks[i][1]>=.88*mx){pk=peaks[i];break}if(!pk)return null;
  var tau=pk[0],a=nsdf[tau-1],b=nsdf[tau],c2=nsdf[tau+1],den=a-2*b+c2,sh=den?0.5*(a-c2)/den:0;
  return sr/(tau+sh);
};
PF.ui=function(){var u=MK.get('pf.ui',{});return u&&typeof u==='object'?u:{}};
PF.uiSet=function(o){var u=PF.ui();Object.keys(o).forEach(function(k){u[k]=o[k]});MK.set('pf.ui',u)};
PF.Mic={on:false,ign:0,cb:null,log:[],
  start:function(cb,done){
    var M=PF.Mic;M.cb=cb;if(M.on){if(done)done(true);return}
    if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){if(done)done(false,'Dieser Browser erlaubt hier kein Mikrofon (https nötig).');return}
    var cfg=MK.mic(),cons={echoCancellation:false,noiseSuppression:false,autoGainControl:false};if(cfg.dev)cons.deviceId={ideal:cfg.dev};
    navigator.mediaDevices.getUserMedia({audio:cons}).then(function(st){
      var K=window.AudioContext||window.webkitAudioContext,ctx=new K();if(ctx.resume)ctx.resume();
      var src=ctx.createMediaStreamSource(st),an=ctx.createAnalyser();an.fftSize=4096;an.smoothingTimeConstant=0;src.connect(an);
      M.st=st;M.ctx=ctx;M.an=an;M.buf=new Float32Array(4096);M.sr=ctx.sampleRate;M.ema=0;M.noise=.003;M.lastOn=0;M.pend=null;M.on=true;
      M.timer=setInterval(M.frame,25);if(done)done(true);
    },function(e){var n=e&&e.name;if(done)done(false,n==='NotAllowedError'||n==='SecurityError'?'Mikrofon nicht erlaubt. Prüfe die Seiteneinstellungen des Browsers.':n==='NotFoundError'?'Kein Mikrofon gefunden.':'Das Mikrofon konnte nicht gestartet werden.')});
  },
  stop:function(){var M=PF.Mic;if(!M.on)return;clearInterval(M.timer);try{M.st.getTracks().forEach(function(t){t.stop()})}catch(e){}try{M.ctx.close()}catch(e){}M.on=false;M.cb=null},
  thr:function(){var v=PF.ui().sens;v=v==null?1:+v;return v===0?.005:v===2?.025:.012},
  frame:function(){
    var M=PF.Mic;if(!M.on)return;M.an.getFloatTimeDomainData(M.buf);
    var now=performance.now(),s=0,i,L=M.buf.length;for(i=L-1024;i<L;i++)s+=M.buf[i]*M.buf[i];
    var r=Math.sqrt(s/1024),thr=Math.max(M.thr(),M.noise*4);
    if(M.cb&&M.cb.level)M.cb.level(r,thr);
    if(now<M.ign){M.ema=r;M.pend=null;return}
    if(M.cb&&M.cb.pitch){if(r>thr){M.pc=(M.pc||0)+1;if(M.pc%2===0){var f0=PF.detect(M.buf,M.sr);M.cb.pitch(f0&&f0>60&&f0<1400?f0:null,r)}}else M.cb.pitch(null,r)}
    var onset=r>thr&&r>M.ema*1.7&&now-M.lastOn>150&&!M.pend;
    M.ema=M.ema*.8+r*.2;if(r<thr)M.noise=M.noise*.97+r*.03;
    if(onset){M.lastOn=now;if(M.cb&&M.cb.onset)M.cb.onset(now/1000);if(M.cb&&M.cb.note)M.pend={t0:now,ps:[]}}
    if(M.pend&&now-M.pend.t0>=70){
      var f=PF.detect(M.buf,M.sr);if(f&&f>60&&f<1300)M.pend.ps.push(Math.round(69+12*Math.log2(f/440)));
      if(M.pend.ps.length>=4||now-M.pend.t0>300){
        var cnt={},best=null,ps=M.pend.ps;M.pend=null;
        ps.forEach(function(p){cnt[p]=(cnt[p]||0)+1;if(best==null||cnt[p]>cnt[best])best=p});
        if(best!=null&&cnt[best]>=2){M.log.push(best);if(M.cb&&M.cb.note)M.cb.note(best)}else if(M.cb&&M.cb.miss)M.cb.miss();
      }
    }
  }
};

/* ───── Notenzeile ───── */
var SHO=[3,0,4,1,5,2,6],FLO=[6,2,5,1,4,0,3],SHS=[38,35,39,36,33,37,34],FLS=[34,37,33,36,32,35,31];
function accSvg(a,x,y,col){
  var s='stroke="'+col+'" stroke-width="1.8" fill="none" stroke-linecap="round"';
  if(a>0)return '<g '+s+'><path d="M'+(x-2.5)+' '+(y-9)+'V'+(y+9)+'M'+(x+2.5)+' '+(y-7)+'V'+(y+11)+'"/><path stroke-width="2.6" d="M'+(x-5)+' '+(y+2)+'L'+(x+5)+' '+(y-1)+'M'+(x-5)+' '+(y+8)+'L'+(x+5)+' '+(y+5)+'"/></g>';
  if(a<0)return '<g '+s+'><path d="M'+(x-3)+' '+(y-14)+'V'+(y+6)+'M'+(x-3)+' '+(y+6)+'C'+(x+7)+' '+(y+1)+' '+(x+6)+' '+(y-8)+' '+(x-3)+' '+(y-3)+'"/></g>';
  return '<g '+s+'><path d="M'+(x-3)+' '+(y-10)+'V'+(y+4)+'L'+(x+3)+' '+(y+2)+'M'+(x+3)+' '+(y-4)+'V'+(y+10)+'M'+(x-3)+' '+(y-2)+'L'+(x+3)+' '+(y-4)+'"/></g>';
}
function ksMap(n){var m={},i;if(n>0)for(i=0;i<n;i++)m[SHO[i]]=1;else for(i=0;i<-n;i++)m[FLO[i]]=-1;return m}
function stepSvg(st,x,clef,col,op,km,y0,sp,showAcc){
  var base=clef==='f'?18:30,h='',rx=10,ns=st.n.slice().sort(function(a,b){return a.m-b.m}),d=st.d||1;
  var pos=ns.map(function(n){return n.s-base}),ys=pos.map(function(p){return y0-p*sp/2});
  var open=d>=2,stemUp=(pos.reduce(function(a,b){return a+b},0)/pos.length)<4;
  h+='<g opacity="'+op+'">';
  var offs=[],prev=-9;pos.forEach(function(p,i){var o=0;if(i&&p-prev===1&&!offs[i-1])o=rx*1.8;offs.push(o);prev=p});
  pos.forEach(function(p,i){
    var y=ys[i],xx=x+offs[i],n=ns[i];
    if(p<=-2)for(var l=-2;l>=p;l-=2)h+='<line class="ln" x1="'+(xx-rx-5)+'" x2="'+(xx+rx+5)+'" y1="'+(y0-l*sp/2)+'" y2="'+(y0-l*sp/2)+'"/>';
    if(p>=10)for(var l2=10;l2<=p;l2+=2)h+='<line class="ln" x1="'+(xx-rx-5)+'" x2="'+(xx+rx+5)+'" y1="'+(y0-l2*sp/2)+'" y2="'+(y0-l2*sp/2)+'"/>';
    if(showAcc!==false&&n.a!==(km[n.l]||0)){var ax=xx-rx-10-(i%2?10:0);if(Math.abs(n.a)<=1)h+=accSvg(n.a,ax,y,col);else h+=accSvg(n.a>0?1:-1,ax,y,col)+accSvg(n.a>0?1:-1,ax-10,y,col)}
    h+='<ellipse cx="'+xx+'" cy="'+y+'" rx="'+rx+'" ry="'+(rx*.72)+'" transform="rotate(-20 '+xx+' '+y+')" '+(open?'fill="var(--card)" stroke="'+col+'" stroke-width="2.6"':'fill="'+col+'"')+'/>';
  });
  if(d<4){
    var ytop=Math.min.apply(null,ys),ybot=Math.max.apply(null,ys),sx=stemUp?x+rx-1.5:x-rx+1.5;
    if(stemUp)h+='<line x1="'+sx+'" x2="'+sx+'" y1="'+ybot+'" y2="'+(ytop-38)+'" stroke="'+col+'" stroke-width="2.4"/>';
    else h+='<line x1="'+sx+'" x2="'+sx+'" y1="'+ytop+'" y2="'+(ybot+38)+'" stroke="'+col+'" stroke-width="2.4"/>';
  }
  return h+'</g>';
}
/* o: {clef,ks,steps:[{n:[notes],d,col}],w,hideNames} → SVG-Markup */
PF.staff=function(o){
  var y0=90,sp=14,h='',clef=o.clef||'g',ks=o.ks||0,km=ksMap(ks),i,W=340;
  h+='<svg viewBox="0 0 '+W+' 130" class="staffsvg" role="img" aria-label="'+(o.label||'Notenzeile')+'"><style>.staffsvg .ln{stroke:var(--ink);stroke-width:1.4}</style>';
  for(i=0;i<5;i++)h+='<line class="ln" x1="8" x2="332" y1="'+(y0-i*sp)+'" y2="'+(y0-i*sp)+'"/>';
  if(clef==='g')h+='<path d="M 34 106 C 34 116 24 118 22 111 C 20 104 30 102 33 108 L 36 40 C 38 20 46 14 48 24 C 50 36 36 46 28 56 C 18 68 22 86 34 86 C 47 86 49 68 38 65 C 30 63 24 71 28 78" fill="none" stroke="var(--ink)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>';
  else h+='<circle cx="22" cy="48" r="4.6" fill="var(--ink)"/><path d="M 22 48 C 42 46 48 60 40 72 C 34 80 26 85 17 89" fill="none" stroke="var(--ink)" stroke-width="3.2" stroke-linecap="round"/><circle cx="50" cy="41" r="2.5" fill="var(--ink)"/><circle cx="50" cy="55" r="2.5" fill="var(--ink)"/>';
  var base=clef==='f'?18:30;
  for(i=0;i<Math.abs(ks);i++){var s=(ks>0?SHS[i]:FLS[i])-(clef==='f'?14:0);h+=accSvg(ks>0?1:-1,56+i*9,y0-(s-base)*sp/2,'var(--ink)')}
  var x0=Math.max(84,70+Math.abs(ks)*10),steps=o.steps||[],n=steps.length;
  if(n){var gap=n===1?0:Math.min(54,(W-x0-26)/(n-1)),xs0=n===1?(x0+W-14)/2:x0+14;
    steps.forEach(function(st,k){h+=stepSvg(st,xs0+k*gap,clef,st.col||'var(--ink)',st.op==null?1:st.op,km,y0,sp,true)})}
  return h+'</svg>';
};

/* ───── Klaviatur ───── */
PF.keyboard=function(svg,lo,hi,onKey,opt){
  opt=opt||{};svg.innerHTML='';var keys={},whites=[],m,down={};
  for(m=lo;m<=hi;m++)if(PCW.indexOf(m%12)>=0)whites.push(m);
  var W=whites.length,ww=400/W,hh=opt.h||140,h='';
  svg.setAttribute('viewBox','0 0 400 '+hh);
  whites.forEach(function(n,i){h+='<rect class="w" data-m="'+n+'" x="'+(i*ww).toFixed(2)+'" y="0" width="'+ww.toFixed(2)+'" height="'+hh+'" rx="4"/>'});
  whites.forEach(function(n,i){var nx=n+1;if(nx<=hi&&PCW.indexOf(nx%12)<0&&n!==hi)h+='<rect class="b" data-m="'+nx+'" x="'+((i+1)*ww-ww*.3).toFixed(2)+'" y="0" width="'+(ww*.6).toFixed(2)+'" height="'+(hh*.6).toFixed(0)+'" rx="3"/>'});
  if(opt.labels)whites.forEach(function(n,i){h+='<text class="lb" x="'+(i*ww+ww/2).toFixed(2)+'" y="'+(hh-8)+'">'+NAMES[PCW.indexOf(n%12)]+'</text>'});
  svg.innerHTML=h;svg.querySelectorAll('rect').forEach(function(r){keys[r.getAttribute('data-m')]=r});
  function at(e){var el=document.elementFromPoint(e.clientX,e.clientY);return el&&el.getAttribute&&el.getAttribute('data-m')?+el.getAttribute('data-m'):null}
  svg.onpointerdown=function(e){var n=at(e);if(n==null)return;e.preventDefault();down[e.pointerId]=n;keys[n].classList.add('dn');if(!opt.silent)PF.tone(n,.9);if(onKey)onKey(n,'screen')};
  function up(e){var n=down[e.pointerId];if(n==null)return;delete down[e.pointerId];if(keys[n])keys[n].classList.remove('dn')}
  svg.onpointerup=up;svg.onpointercancel=up;svg.onpointerleave=up;
  return {keys:keys,flash:function(m,c){var r=keys[m];if(!r)return;r.classList.remove('ok','no');void r.getBoundingClientRect();r.classList.add(c);setTimeout(function(){r.classList.remove(c)},700)},
    mark:function(ms,col){Object.keys(keys).forEach(function(k){keys[k].classList.remove('t')});(ms||[]).forEach(function(m){var r=keys[m];if(r){r.classList.add('t');r.style.setProperty('--c',col||'var(--acc)')}})},
    lo:lo,hi:hi};
};

/* ───── Fortschritt, Protokoll ───── */
PF.logSecs=function(name,sec){
  try{var d=MK.day(),a=MK.get('gp.log',[]);if(!Array.isArray(a))a=[];var e=a.filter(function(x){return x.d===d&&x.t===name})[0];if(!e){e={d:d,t:name,s:0,p:0,h:null};a.push(e)}
  e.s+=Math.max(1,Math.round(sec));if(a.length>400)a=a.slice(-400);MK.set('gp.log',a)}catch(x){}
};
PF.starsStr=function(s){return '★'.repeat(s)+'☆'.repeat(3-s)};

/* ───── Stil ───── */
PF.css=function(){
  if(document.getElementById('pfcss'))return;var s=document.createElement('style');s.id='pfcss';
  s.textContent=':root{--bg:#F5F1EA;--card:#fff;--ink:#14283B;--muted:#4D5F70;--line:#DDD5C8;--acc:#17466E;--on:#fff;--ok:#2f6b3d;--bad:#A3352B;--key:#fff;--keyl:#8d8478;--blk:#1c2530}'+
  '@media (prefers-color-scheme:dark){:root:not([data-theme=light]){--bg:#0F1A24;--card:#172633;--ink:#E7EDF2;--muted:#A3B3C2;--line:#2B3D4E;--acc:#8CBBEA;--on:#0B1520;--ok:#86B08D;--bad:#E08A80;--key:#EFEAE0;--keyl:#6c7a88;--blk:#0a0f15;color-scheme:dark}}'+
  ':root[data-theme=dark]{--bg:#0F1A24;--card:#172633;--ink:#E7EDF2;--muted:#A3B3C2;--line:#2B3D4E;--acc:#8CBBEA;--on:#0B1520;--ok:#86B08D;--bad:#E08A80;--key:#EFEAE0;--keyl:#6c7a88;--blk:#0a0f15;color-scheme:dark}'+
  '*{box-sizing:border-box}[hidden]{display:none!important}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;-webkit-tap-highlight-color:transparent}'+
  'main{max-width:700px;margin:0 auto;padding:14px 14px 80px;display:grid;gap:12px}h1{font-size:1.5rem;margin:2px 0 0}h2{font-size:1.1rem;margin:0}.muted{color:var(--muted)}.small{font-size:.86rem}'+
  '.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:12px;display:grid;gap:10px;min-width:0}.row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}'+
  '.btn{font:inherit;border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:12px;padding:8px 14px;min-height:46px;cursor:pointer;touch-action:manipulation}.btn.primary{background:var(--acc);color:var(--on);border-color:var(--acc);font-weight:600}.btn[aria-pressed=true]{background:var(--acc);color:var(--on);border-color:var(--acc)}'+
  'details.ch{border:1px solid var(--line);border-radius:12px;background:var(--bg)}details.ch>summary{cursor:pointer;padding:10px 12px;min-height:46px;display:flex;justify-content:space-between;gap:8px;align-items:center;font-weight:700;list-style:none}details.ch>summary::-webkit-details-marker{display:none}details.ch>summary::after{content:"▾";margin-left:6px;color:var(--muted)}details.ch[open]>summary::after{content:"▴"}details.ch .cd{padding:0 12px 6px;color:var(--muted);font-size:.86rem}'+
  '.lessons{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;padding:8px 12px 12px}.les{text-align:left;border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:12px;padding:10px;display:grid;gap:2px;cursor:pointer;font:inherit;min-height:84px;align-content:start}.les b{font-size:.98rem}.les .st{letter-spacing:2px;color:#d99a00;font-size:1.05rem}.les .sub{font-size:.8rem;color:var(--muted)}'+
  'details.intro{border:1px solid var(--line);border-radius:10px;padding:6px 10px;background:var(--bg)}details.intro summary{cursor:pointer;font-weight:600;min-height:32px;display:flex;align-items:center}details.intro p{margin:4px 0 6px}'+
  '.bar{display:flex;gap:4px;flex-wrap:wrap;justify-content:center;min-height:14px}.bar i{width:12px;height:12px;border-radius:50%;background:var(--line);display:block}.bar i.r{background:var(--ok)}.bar i.w{background:var(--bad)}.bar i.c{outline:3px solid var(--ink);outline-offset:1px}'+
  '.q{font-size:1.15rem;font-weight:700;text-align:center;margin:0}.opts{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px}.opt{min-height:54px;font-size:1rem}.opt.right{background:var(--ok);color:#fff;border-color:var(--ok)}.opt.wrong{background:var(--bad);color:#fff;border-color:var(--bad)}'+
  '.fb{text-align:center;font-weight:600;min-height:1.6em}.fb.ok{color:var(--ok)}.fb.bad{color:var(--bad)}.ex{text-align:center;color:var(--muted);font-size:.92rem;margin:0}'+
  '.staffsvg{width:100%;height:auto;display:block;background:var(--card);border:1px solid var(--line);border-radius:12px}'+
  '.kbs{width:100%;height:auto;display:block;touch-action:none;user-select:none;-webkit-user-select:none}.kbs .w{fill:var(--key);stroke:var(--keyl);stroke-width:1.2}.kbs .b{fill:var(--blk);stroke:#000;stroke-width:1}.kbs .t{fill:var(--c)}.kbs .dn{fill:#9fb6cc}.kbs .w.ok{fill:#7fd18b}.kbs .w.no{fill:#e59089}.kbs .lb{font:700 12px system-ui,sans-serif;fill:#14283B;text-anchor:middle;pointer-events:none}'+
  '.pad{min-height:110px;font-size:1.3rem}.win{text-align:center;display:grid;gap:8px;padding:10px}.win .big2{font-size:2.4rem;letter-spacing:6px;color:#d99a00}.ok{color:var(--ok);font-weight:600}'+
  '.meter{height:10px;border-radius:6px;background:var(--line);position:relative;overflow:hidden}.meter i{position:absolute;left:0;top:0;bottom:0;width:0;background:var(--ok);display:block}.meter u{position:absolute;top:0;bottom:0;width:2px;background:var(--bad);display:block}'+
  '.chk{display:flex;gap:10px;align-items:flex-start;min-height:40px}.chk input{width:22px;height:22px;margin-top:2px;flex:none}.chk.done span{color:var(--muted);text-decoration:line-through}'+
  '.pill{display:inline-block;border:1px solid var(--line);border-radius:999px;padding:1px 10px;font-size:.8rem;color:var(--muted)}.pill.ok{color:var(--ok);border-color:var(--ok)}select.btn{padding:6px 10px}a{color:var(--acc)}'+
  '.card{box-shadow:0 1px 4px rgba(0,0,0,.06);border-radius:16px}.btn{transition:transform .1s,box-shadow .1s,background .1s}.btn:hover{box-shadow:0 2px 8px rgba(0,0,0,.12)}.btn:active{transform:scale(.97)}.btn.primary{box-shadow:0 2px 8px rgba(0,0,0,.18)}.btn:focus-visible{outline:3px solid var(--acc);outline-offset:2px}h1{letter-spacing:-.01em}@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}';
  document.head.appendChild(s);
};
PF.esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
})();
