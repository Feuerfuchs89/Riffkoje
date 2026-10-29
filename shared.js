/* Musikkoje: gemeinsame Profile, Navigation und Speicher-Namensräume für alle Seiten. */
(function(){
'use strict';
var PK='mk.profiles',AK='mk.active';
function ld(k,d){try{var v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}}
function sv(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}}
var profs=ld(PK,null);
if(!Array.isArray(profs)||!profs.length){profs=[{id:'p1',name:'Micha',emoji:'🎻',stage:'erw'}];sv(PK,profs)}
function newUid(){var a='abcdefghijkmnpqrstuvwxyz23456789',o='';try{var r=new Uint8Array(10);crypto.getRandomValues(r);for(var i=0;i<10;i++)o+=a[r[i]%a.length]}catch(e){for(var j=0;j<10;j++)o+=a[Math.floor(Math.random()*a.length)]}return o}
var uidAdded=false;profs.forEach(function(p){if(!p.uid){p.uid=newUid();uidAdded=true}});if(uidAdded)sv(PK,profs);
var act=ld(AK,'p1');
if(!profs.some(function(p){return p.id===act}))act=profs[0].id;
var STAGES={kita:'Entdecker (Kita)',schule:'Schulkind',erw:'Anfänger (Erwachsene)'};
var EMOJIS=['🎻','🎸','🥁','🎹','🐻','🦊','🐰','🐯','🦄','🐸','🚀','⭐'];
/* Das erste Profil (p1) behält die alten Schlüssel, damit vorhandene Daten erhalten bleiben. */
function key(k,id){id=id||act;return id==='p1'?k:id+'.'+k}
var MK={
  profiles:function(){return ld(PK,profs)},
  active:function(){return act},
  profile:function(){return MK.profiles().find(function(p){return p.id===act})||MK.profiles()[0]},
  key:key,
  get:function(k,d){return ld(key(k),d)},
  set:function(k,v){return sv(key(k),v)},
  dbName:function(base){return act==='p1'?base:base+'-'+act},
  getFor:function(id,k,d){return ld(key(k,id),d)},
  day:function(t){var d=new Date(t||Date.now());return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')},
  switchTo:function(id){sv(AK,id);location.reload()}
};
window.MK=MK;

/* Darstellung: auto folgt dem Gerät, hell/dunkel überschreibt. Gilt für alle Seiten und alle Profile. */
var TK='mk.theme';
function themePref(){var t=ld(TK,'auto');return t==='light'||t==='dark'?t:'auto'}
function themeNow(){var t=themePref();if(t!=='auto')return t;try{return matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}catch(e){return 'dark'}}
function applyTheme(){
  var h=document.documentElement,t=themePref(),r=themeNow();
  if(t==='auto')h.removeAttribute('data-theme');else h.setAttribute('data-theme',t);
  h.setAttribute('data-mk',r);
  var m=document.querySelector('meta[name=theme-color]');
  if(m)m.setAttribute('content',r==='dark'?'#121314':'#f6f4ee');
  var b=document.getElementById('mk-theme');
  if(b){b.textContent=t==='auto'?'🌓':t==='light'?'☀️':'🌙';b.setAttribute('aria-label','Darstellung: '+(t==='auto'?'automatisch':t==='light'?'hell':'dunkel')+'. Zum Wechseln drücken.');b.title=b.getAttribute('aria-label')}
}
MK.theme=function(t){if(t){sv(TK,t);applyTheme()}return themePref()};
applyTheme();
try{matchMedia('(prefers-color-scheme:dark)').addEventListener('change',applyTheme)}catch(e){}

function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var LINKS=[['index.html','Start','🏠'],['geigenpult.html','Geigenpult','Geige'],['riffkoje.html','Riffkoje','Riff'],['akkorde.html','Gitarre','Gitarre',['akkorde.html','tabs.html']],['whistle.html','Low Whistle','Whistle'],['theorie.html','Theorie','Theorie']];
var SUBS=[['akkorde.html','🎸 Akkorde'],['tabs.html','🎼 Tabulatur']];
function css(){
  var s=document.createElement('style');
  s.textContent=':root{--nb:#1c1e24;--nf:#f2f0ea;--nl:#3b3f4a;--nb2:#2c2f38;--nm:#a9a69d;--na:#f2a93b;--nao:#1a1205}'+
  'html[data-mk=light]{--nb:#fbfaf6;--nf:#1d1f24;--nl:#d6d2c6;--nb2:#eeebe2;--nm:#656a75;--na:#2848d2;--nao:#ffffff}'+
  '#mknav{display:flex;align-items:center;gap:4px;flex-wrap:wrap;padding:8px 12px;padding-top:max(8px,env(safe-area-inset-top));background:var(--nb);color:var(--nf);border-bottom:1px solid var(--nl);font:500 14px/1.2 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;position:relative;z-index:30}'+
  '#mknav a{color:var(--nf);opacity:.8;text-decoration:none;padding:8px 12px;border-radius:999px}#mknav a:hover{background:var(--nb2);opacity:1}#mknav a[aria-current=page]{background:var(--nf);color:var(--nb);opacity:1}'+
  '#mknav .ls{display:none}#mknav .sp{flex:1}#mknav button{font:inherit;color:var(--nf);background:var(--nb2);border:1px solid var(--nl);border-radius:999px;padding:7px 12px;min-height:36px;cursor:pointer}'+
  '#mknav button.ic{padding:7px 10px;min-width:36px}@media (max-width:520px){#mknav .ls{display:inline}#mknav{gap:2px;padding-left:8px;padding-right:8px}#mknav{font-size:13px}#mknav a{padding:8px 5px}#mknav .sp{display:none}#mknav button{min-width:34px}#mknav .nm{display:none}#mknav .lf{display:none}#mknav button{padding:7px 9px}#mknav #mk-theme{display:none}}'+
  '#mksub{display:flex;gap:6px;padding:8px 12px;background:var(--nb);border-bottom:1px solid var(--nl);font:500 14px/1.2 system-ui,-apple-system,sans-serif}#mksub a{color:var(--nf);opacity:.85;text-decoration:none;padding:7px 12px;border-radius:999px;border:1px solid var(--nl)}#mksub a[aria-current=page]{background:var(--na);color:var(--nao);border-color:var(--na);opacity:1}'+
  'body.pult #mknav,body.bigmode #mknav,body.pult #mksub,body.bigmode #mksub{display:none}'+
  '#mkdlg{border:1px solid var(--nl);border-radius:14px;padding:18px;max-width:440px;width:calc(100vw - 32px);max-height:88vh;overflow:auto;background:var(--nb);color:var(--nf);font:15px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}'+
  '#mkdlg::backdrop{background:rgba(0,0,0,.55)}#mkdlg h2{margin:0 0 10px;font-size:18px}#mkdlg h3{margin:16px 0 6px;font-size:15px}#mkdlg p{margin:6px 0;color:var(--nm);font-size:13px}#mkdlg .pr{display:flex;gap:8px;align-items:center;padding:8px 0;border-top:1px solid var(--nl)}'+
  '#mkdlg .pr:first-of-type{border-top:0}#mkdlg .pr .n{flex:1;min-width:0;overflow-wrap:anywhere}#mkdlg .pr .n small{display:block;color:var(--nm)}'+
  '#mkdlg button,#mkdlg input,#mkdlg select{font:inherit;border-radius:8px;border:1px solid var(--nl);background:var(--nb2);color:var(--nf);padding:8px 11px;min-height:38px}#mkdlg button{cursor:pointer}'+
  '#mkdlg button.pri{background:var(--na);color:var(--nao);border-color:var(--na)}#mkdlg .row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;align-items:center}#mkdlg input[type=text]{flex:1;min-width:8em}'+
  '#mkdlg .em button{font-size:20px;padding:4px 8px}#mkdlg .em button[aria-pressed=true],#mkdlg .seg button[aria-pressed=true]{background:var(--na);color:var(--nao);border-color:var(--na)}'+
  '#mknav a:focus-visible,#mknav button:focus-visible,#mkdlg button:focus-visible,#mkdlg input:focus-visible,#mkdlg select:focus-visible{outline:2px solid var(--na);outline-offset:2px}';
  document.head.appendChild(s);
}
function openDlg(){
  var d=document.getElementById('mkdlg');if(d)d.remove();
  d=document.createElement('dialog');d.id='mkdlg';
  var list=MK.profiles(),h='<h2>Wer übt gerade?</h2>';
  list.forEach(function(p){
    h+='<div class="pr"><span style="font-size:26px">'+esc(p.emoji)+'</span><span class="n">'+esc(p.name)+'<small>'+esc(STAGES[p.stage]||'')+(p.id===act?' · aktiv':'')+'</small></span>'+
      (p.id===act?'':'<button data-sw="'+p.id+'" type="button">Wechseln</button>')+
      '<button data-ed="'+p.id+'" type="button" aria-label="Bearbeiten">✎</button></div>';
  });
  h+='<h2 style="margin-top:16px">Neues Profil</h2><div class="row"><input type="text" id="np-name" placeholder="Name" maxlength="24" aria-label="Name"></div>'+
    '<div class="row em" id="np-em">'+EMOJIS.map(function(e,i){return '<button type="button" data-e="'+e+'" aria-pressed="'+(i===0)+'">'+e+'</button>'}).join('')+'</div>'+
    '<div class="row"><select id="np-st" aria-label="Stufe">'+Object.keys(STAGES).map(function(k){return '<option value="'+k+'"'+(k==='kita'?'':'')+'>'+STAGES[k]+'</option>'}).join('')+'</select><button class="pri" id="np-add" type="button">Anlegen</button></div>'+
    '<div class="row"><button id="mk-close" type="button" style="margin-left:auto">Schließen</button></div>';
  d.innerHTML=h;document.body.appendChild(d);
  var emo=EMOJIS[0];
  d.addEventListener('click',function(e){
    var b=e.target.closest('button');if(!b)return;
    if(b.dataset.sw)MK.switchTo(b.dataset.sw);
    else if(b.dataset.e){emo=b.dataset.e;Array.prototype.forEach.call(d.querySelectorAll('#np-em button'),function(x){x.setAttribute('aria-pressed',String(x===b))})}
    else if(b.id==='np-add'){
      var n=d.querySelector('#np-name').value.trim();if(!n){d.querySelector('#np-name').focus();return}
      var ps=MK.profiles(),id='p'+(Math.max.apply(null,ps.map(function(p){return +p.id.slice(1)||1}))+1);
      ps.push({id:id,uid:newUid(),name:n,emoji:emo,stage:d.querySelector('#np-st').value});sv(PK,ps);MK.switchTo(id);
    }
    else if(b.dataset.ed)editDlg(b.dataset.ed);
    else if(b.id==='mk-close')d.close();
  });
  d.showModal();
}
function editDlg(id){
  var d=document.getElementById('mkdlg'),p=MK.profiles().find(function(x){return x.id===id});if(!p)return;
  var n=MK.profiles().length;
  d.innerHTML='<h2>Profil bearbeiten</h2><div class="row"><input type="text" id="ed-name" maxlength="24" value="'+esc(p.name)+'" aria-label="Name"></div>'+
   '<div class="row em" id="ed-em">'+EMOJIS.map(function(e){return '<button type="button" data-e="'+e+'" aria-pressed="'+(e===p.emoji)+'">'+e+'</button>'}).join('')+'</div>'+
   '<div class="row"><select id="ed-st" aria-label="Stufe">'+Object.keys(STAGES).map(function(k){return '<option value="'+k+'"'+(k===p.stage?' selected':'')+'>'+STAGES[k]+'</option>'}).join('')+'</select></div>'+
   '<div class="row"><button class="pri" id="ed-save" type="button">Speichern</button><button id="ed-ex" type="button">Exportieren</button><button id="ed-back" type="button">Zurück</button>'+(n>1?'<button id="ed-del" type="button" style="margin-left:auto">Profil löschen</button>':'')+'</div>'+
   '<p id="ed-warn" style="color:var(--nm);font-size:13px" hidden>Löscht alle Daten dieses Profils auf diesem Gerät. Zum Bestätigen noch einmal drücken.</p>';
  var emo=p.emoji,armed=false;
  d.onclick=function(e){
    var b=e.target.closest('button');if(!b)return;
    if(b.dataset.e){emo=b.dataset.e;Array.prototype.forEach.call(d.querySelectorAll('#ed-em button'),function(x){x.setAttribute('aria-pressed',String(x===b))})}
    else if(b.id==='ed-back')openDlg();
    else if(b.id==='ed-ex')MK.exportProfile(id);
    else if(b.id==='ed-save'){
      var ps=MK.profiles(),q=ps.find(function(x){return x.id===id});q.name=d.querySelector('#ed-name').value.trim()||q.name;q.emoji=emo;q.stage=d.querySelector('#ed-st').value;sv(PK,ps);location.reload();
    }else if(b.id==='ed-del'){
      if(!armed){armed=true;d.querySelector('#ed-warn').hidden=false;b.textContent='Wirklich löschen';return}
      var ps2=MK.profiles().filter(function(x){return x.id!==id});sv(PK,ps2);
      try{var pre=id+'.',del=[];for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k&&k.indexOf(pre)===0)del.push(k)}del.forEach(function(k){localStorage.removeItem(k)})}catch(e2){}
      try{indexedDB.deleteDatabase('riffkoje-'+id)}catch(e3){}
      if(id===act)MK.switchTo(ps2[0].id);else openDlg();
    }
  };
}

/* Einstellungen und Sicherung. Gesichert wird alles, was dieser Browser lokal speichert (Fortschritt, Profile, Einstellungen).
   Nicht enthalten: der Gemini-Schlüssel und die Aufnahmen aus Riffkoje (große Audiodateien). */
var SKIP=/(^|\.)gp\.gkey$/;
function allLs(only,id){
  var o={};
  for(var i=0;i<localStorage.length;i++){
    var k=localStorage.key(i);if(!k||SKIP.test(k)||k.indexOf('mk.last')===0)continue;
    if(only){
      if(k.indexOf('mk.')===0)continue;
      var m=/^(p\d+)\./.exec(k),owner=m?m[1]:'p1';
      if(owner!==id)continue;
      o[m?k.slice(m[0].length):k]=localStorage.getItem(k);
    }else o[k]=localStorage.getItem(k);
  }
  return o;
}
function download(name,obj){
  var a=document.createElement('a'),u=URL.createObjectURL(new Blob([JSON.stringify(obj)],{type:'application/json'}));
  a.href=u;a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(u);a.remove()},1000);
}
function stamp(){return MK.day()}
MK.backupAll=function(){download('musikkoje-sicherung-'+stamp()+'.json',{app:'musikkoje',v:1,kind:'all',date:stamp(),ls:allLs(false)});sv('mk.last',Date.now())};
MK.exportProfile=function(id){var p=MK.profiles().find(function(x){return x.id===id});if(!p)return;download('musikkoje-'+p.name.replace(/[^\wäöüÄÖÜß-]+/g,'_')+'-'+stamp()+'.json',{app:'musikkoje',v:1,kind:'profile',date:stamp(),profile:{name:p.name,emoji:p.emoji,stage:p.stage},ls:allLs(true,id)})};
MK.lastBackup=function(){return ld('mk.last',0)};
function readFile(cb){
  var i=document.createElement('input');i.type='file';i.accept='.json,application/json';
  i.onchange=function(){var f=i.files&&i.files[0];if(!f)return;var r=new FileReader();r.onload=function(){try{var d=JSON.parse(r.result);if(!d||d.app!=='musikkoje'||!d.ls||typeof d.ls!=='object')throw 0;cb(d)}catch(e){msg('Diese Datei ist keine Musikkoje-Sicherung.',true)}};r.readAsText(f)};
  i.click();
}
function msg(t,bad){var m=document.getElementById('mk-msg');if(m){m.textContent=t;m.style.color=bad?'#e5484d':'var(--nm)';m.hidden=false}}
function restoreAll(d){
  Object.keys(d.ls).forEach(function(k){if(!SKIP.test(k)&&k.indexOf('mk.last')!==0&&typeof d.ls[k]==='string')try{localStorage.setItem(k,d.ls[k])}catch(e){}});
  location.reload();
}
function importProfile(d){
  var ps=MK.profiles(),id='p'+(Math.max.apply(null,ps.map(function(p){return +p.id.slice(1)||1}))+1),pr=d.profile||{name:'Importiert',emoji:'🎻',stage:'erw'};
  ps.push({id:id,uid:newUid(),name:String(pr.name||'Importiert').slice(0,24),emoji:EMOJIS.indexOf(pr.emoji)>=0?pr.emoji:'🎻',stage:STAGES[pr.stage]?pr.stage:'erw'});sv(PK,ps);
  Object.keys(d.ls).forEach(function(k){if(!SKIP.test(k)&&typeof d.ls[k]==='string')try{localStorage.setItem(id+'.'+k,d.ls[k])}catch(e){}});
  MK.switchTo(id);
}

/* ───── Geräte-Abgleich über eine Sync-Datei im Cloud-Ordner ─────
   Die Datei enthält alle Profile mit Fortschritt. Beim Abgleich werden beide Seiten zusammengeführt
   (Zahlen: der größere Wert, Zeiten: der kleinere, Listen und Tage: Vereinigung), dann wird die Datei neu geschrieben.
   Profile werden über eine zufällige Kennung (uid) erkannt, notfalls über den Namen. */
var SYNCSKIP=/(^|\.)gp\.pads$/;
function mv(a,b,low){
  if(a===null||a===undefined)return b;if(b===null||b===undefined)return a;
  var ta=typeof a,tb=typeof b;
  if(Array.isArray(a)&&Array.isArray(b)){var seen={},o=[];a.concat(b).forEach(function(x){var k=JSON.stringify(x);if(!seen[k]){seen[k]=1;o.push(x)}});return o}
  if(ta==='number'&&tb==='number')return low?Math.min(a,b):Math.max(a,b);
  if(ta==='boolean'&&tb==='boolean')return a||b;
  if(ta==='object'&&tb==='object'&&!Array.isArray(a)&&!Array.isArray(b)){
    var r={};Object.keys(a).concat(Object.keys(b)).forEach(function(k){if(!(k in r))r[k]=mv(a[k],b[k],low||k==='fbest')});return r;
  }
  return a;
}
function mergeStr(a,b){
  if(a==null)return b;if(b==null)return a;if(a===b)return a;
  var x,y;try{x=JSON.parse(a);y=JSON.parse(b)}catch(e){return a}
  return JSON.stringify(mv(x,y,false));
}
MK._mv=mv;
function syncDoc(){
  return {app:'musikkoje',v:2,kind:'sync',date:new Date().toISOString(),profiles:MK.profiles().map(function(p){
    var ls=allLs(true,p.id);Object.keys(ls).forEach(function(k){if(SYNCSKIP.test(k))delete ls[k]});
    return {uid:p.uid,name:p.name,emoji:p.emoji,stage:p.stage,ls:ls};
  })};
}
MK.syncDoc=syncDoc;
/* Führt eine Sync-Datei in die lokalen Daten ein. Gibt {changed, added} zurück. */
MK.syncApply=function(doc){
  if(!doc||doc.app!=='musikkoje'||doc.kind!=='sync'||!Array.isArray(doc.profiles))throw new Error('format');
  var ps=MK.profiles(),changed=0,added=0,used={};
  doc.profiles.forEach(function(rp){
    if(!rp||!rp.uid||!rp.ls||typeof rp.ls!=='object')return;
    var lp=ps.find(function(p){return p.uid===rp.uid});
    if(!lp){
      lp=ps.find(function(p){return !used[p.id]&&p.name.trim().toLowerCase()===String(rp.name||'').trim().toLowerCase()&&!doc.profiles.some(function(q){return q.uid===p.uid})});
      if(lp)lp.uid=rp.uid;
    }
    if(!lp){
      var id='p'+(Math.max.apply(null,ps.map(function(p){return +p.id.slice(1)||1}))+1);
      lp={id:id,uid:rp.uid,name:String(rp.name||'Profil').slice(0,24),emoji:EMOJIS.indexOf(rp.emoji)>=0?rp.emoji:'🎻',stage:STAGES[rp.stage]?rp.stage:'erw'};
      ps.push(lp);added++;
    }
    used[lp.id]=1;
    Object.keys(rp.ls).forEach(function(k){
      if(SKIP.test(k)||SYNCSKIP.test(k)||k.indexOf('mk.')===0||typeof rp.ls[k]!=='string')return;
      var lk=key(k,lp.id),cur=null;try{cur=localStorage.getItem(lk)}catch(e){}
      var m=mergeStr(cur,rp.ls[k]);
      if(m!==cur){try{localStorage.setItem(lk,m);changed++}catch(e){}}
    });
  });
  sv(PK,ps);
  return {changed:changed,added:added};
};
MK.lastSync=function(){return ld('mk.lastsync',0)};
function idb(){return new Promise(function(res,rej){var r=indexedDB.open('mk-sync',1);r.onupgradeneeded=function(){r.result.createObjectStore('h')};r.onsuccess=function(){res(r.result)};r.onerror=function(){rej(r.error)}})}
function hGet(){return idb().then(function(db){return new Promise(function(res){var q=db.transaction('h').objectStore('h').get('file');q.onsuccess=function(){res(q.result||null)};q.onerror=function(){res(null)}})}).catch(function(){return null})}
function hSet(h){return idb().then(function(db){return new Promise(function(res){var t=db.transaction('h','readwrite');if(h)t.objectStore('h').put(h,'file');else t.objectStore('h').delete('file');t.oncomplete=function(){res()};t.onerror=function(){res()}})}).catch(function(){})}
MK.syncSupported=function(){return !!(window.showSaveFilePicker&&window.showOpenFilePicker)};
MK.syncConnected=function(){return ld('mk.syncon',0)===1};
/* Datei lesen, zusammenführen, zurückschreiben. Muss durch einen Klick ausgelöst werden (Berechtigung). */
MK.syncNow=async function(){
  var h=await hGet();if(!h)throw new Error('nofile');
  var perm=await h.queryPermission({mode:'readwrite'});
  if(perm!=='granted')perm=await h.requestPermission({mode:'readwrite'});
  if(perm!=='granted')throw new Error('perm');
  var f=await h.getFile(),txt=await f.text(),res={changed:0,added:0};
  if(txt.trim()){var d;try{d=JSON.parse(txt)}catch(e){throw new Error('format')}res=MK.syncApply(d)}
  var w=await h.createWritable();await w.write(JSON.stringify(syncDoc()));await w.close();
  sv('mk.lastsync',Date.now());
  return res;
};
MK.syncAuto=async function(){
  if(!MK.syncConnected())return null;
  var h=await hGet();if(!h)return null;
  if((await h.queryPermission({mode:'readwrite'}))!=='granted')return null;
  return MK.syncNow();
};
MK.syncConnect=async function(create){
  var h;
  if(create)h=await window.showSaveFilePicker({suggestedName:'musikkoje-sync.json',types:[{description:'Musikkoje-Sync',accept:{'application/json':['.json']}}]});
  else{var a=await window.showOpenFilePicker({types:[{description:'Musikkoje-Sync',accept:{'application/json':['.json']}}]});h=a[0]}
  await hSet(h);sv('mk.syncon',1);
  return MK.syncNow();
};
MK.syncDisconnect=async function(){await hSet(null);sv('mk.syncon',0)};
/* Ohne Datei-Zugriff (Handy, Firefox, Safari): Datei wählen, zusammenführen, die neue Datei zum Speichern anbieten. */
MK.syncFile=function(file){
  return file.text().then(function(txt){
    var res=MK.syncApply(JSON.parse(txt));sv('mk.lastsync',Date.now());return res;
  });
};
MK.syncDelivery=async function(){
  var json=JSON.stringify(syncDoc()),fl=new File([json],'musikkoje-sync.json',{type:'application/json'});
  try{if(navigator.canShare&&navigator.canShare({files:[fl]})){await navigator.share({files:[fl],title:'Musikkoje Sync'});return 'share'}}catch(e){if(e&&e.name==='AbortError')return 'abort'}
  download('musikkoje-sync.json',JSON.parse(json));return 'download';
};
function syncRun(fn){
  msg('Abgleich läuft …');
  fn().then(function(r){
    var t=(r.changed||r.added)?'Abgleich fertig: '+r.changed+' Werte aktualisiert'+(r.added?', '+r.added+' Profil(e) neu':'')+'. Die Seite lädt neu.':'Abgleich fertig, alles war schon aktuell.';
    msg(t);if(r.changed||r.added)setTimeout(function(){location.reload()},1200);else{var e=document.getElementById('mk-sy-st');if(e)e.textContent='Verbunden mit einer Sync-Datei. Letzter Abgleich: '+new Date().toLocaleString('de-DE')+'.'}
  }).catch(function(e){
    var m=e&&e.message;
    msg(m==='format'?'Diese Datei ist keine Musikkoje-Sync-Datei.':m==='perm'?'Zugriff auf die Datei wurde nicht erlaubt.':e&&e.name==='AbortError'?'Abgebrochen.':'Abgleich fehlgeschlagen: '+(m||e),true);
  });
}
function setDlg(){
  var d=document.getElementById('mkdlg');if(d)d.remove();
  d=document.createElement('dialog');d.id='mkdlg';
  var t=themePref(),last=MK.lastBackup(),ago=last?Math.floor((Date.now()-last)/864e5):null;
  d.innerHTML='<h2>Einstellungen</h2><h3>Darstellung</h3><div class="row seg" id="mk-th">'+
   [['auto','Automatisch'],['light','Hell'],['dark','Dunkel']].map(function(x){return '<button type="button" data-t="'+x[0]+'" aria-pressed="'+(t===x[0])+'">'+x[1]+'</button>'}).join('')+'</div>'+
   '<p>Automatisch folgt der Einstellung deines Geräts.</p>'+
   '<h3>Sicherung</h3><p>Alle Daten liegen nur in diesem Browser. Eine Sicherung schützt vor Verlust bei Handywechsel oder gelöschtem Browserspeicher. '+(last?'Letzte Sicherung: '+(ago===0?'heute':ago===1?'gestern':'vor '+ago+' Tagen')+'.':'Es gibt noch keine Sicherung.')+'</p>'+
   '<div class="row"><button class="pri" id="mk-bk" type="button">Alles sichern</button><button id="mk-rs" type="button">Sicherung einspielen</button></div>'+
   '<p>Nicht enthalten: Gemini-Schlüssel (bitte neu eintragen) und die Aufnahmen aus Riffkoje.</p>'+
   '<h3>Geräte-Abgleich</h3><p id="mk-sy-st">'+(MK.syncConnected()?'Verbunden mit einer Sync-Datei. Letzter Abgleich: '+(MK.lastSync()?new Date(MK.lastSync()).toLocaleString('de-DE'):'noch nie')+'.':'Hält deinen Fortschritt auf Handy, Tablet und Computer gleich. Du legst eine Datei in einen Cloud-Ordner (Google Drive, iCloud, Nextcloud, Dropbox). Jede Person nutzt ihre eigene Datei.')+'</p>'+
   (MK.syncSupported()?'<div class="row">'+(MK.syncConnected()?'<button class="pri" id="mk-sy-now" type="button">Jetzt abgleichen</button><button id="mk-sy-off" type="button">Trennen</button>':'<button class="pri" id="mk-sy-new" type="button">Neue Sync-Datei anlegen</button><button id="mk-sy-pick" type="button">Vorhandene wählen</button>')+'</div>':'')+
   '<div class="row"><button id="mk-sy-file" type="button">'+(MK.syncSupported()?'Stattdessen: Datei von Hand abgleichen':'Mit Sync-Datei abgleichen')+'</button></div>'+
   '<p>Ablauf von Hand: Sync-Datei aus der Cloud wählen, die App führt sie mit diesem Gerät zusammen und bietet die neue Datei zum Speichern an. Speichere sie in denselben Cloud-Ordner und ersetze die alte. Beim ersten Mal gibt es noch keine Datei: einfach abbrechen und die Datei speichern lassen.</p>'+
   '<h3>Einzelnes Profil</h3><p>Zum Übertragen aufs Gerät einer anderen Person: Profile bearbeiten → „Exportieren“. Hier eine Profil-Datei als neues Profil einlesen:</p>'+
   '<div class="row"><button id="mk-ip" type="button">Profil-Datei einlesen</button></div>'+
   '<p id="mk-msg" hidden></p><div class="row"><button id="mk-close" type="button" style="margin-left:auto">Schließen</button></div>';
  document.body.appendChild(d);
  d.addEventListener('click',function(e){
    var b=e.target.closest('button');if(!b)return;
    if(b.dataset.t){MK.theme(b.dataset.t);Array.prototype.forEach.call(d.querySelectorAll('#mk-th button'),function(x){x.setAttribute('aria-pressed',String(x===b))})}
    else if(b.id==='mk-bk'){MK.backupAll();msg('Sicherung heruntergeladen. Bewahre die Datei an einem sicheren Ort auf, zum Beispiel in der Cloud.')}
    else if(b.id==='mk-rs')readFile(function(x){
      if(x.kind==='profile')return msg('Das ist eine Profil-Datei. Bitte unten „Profil-Datei einlesen“ nutzen.',true);
      if(!confirm('Sicherung vom '+(x.date||'?')+' einspielen? Vorhandene Daten mit gleichem Namen werden überschrieben.'))return;restoreAll(x)});
    else if(b.id==='mk-sy-new'||b.id==='mk-sy-pick'){syncRun(function(){return MK.syncConnect(b.id==='mk-sy-new')})}
    else if(b.id==='mk-sy-now'){syncRun(function(){return MK.syncNow()})}
    else if(b.id==='mk-sy-off'){MK.syncDisconnect().then(function(){setDlg()})}
    else if(b.id==='mk-sy-file'){
      var i=document.createElement('input');i.type='file';i.accept='.json,application/json';
      i.onchange=function(){var f=i.files&&i.files[0];
        if(!f){MK.syncDelivery().then(function(r){msg(r==='abort'?'Abgebrochen.':'Datei bereit. Speichere sie in deinen Cloud-Ordner und ersetze die alte.')});return}
        syncRun(function(){return MK.syncFile(f).then(function(r){return MK.syncDelivery().then(function(){return r})})})};
      i.addEventListener('cancel',function(){MK.syncDelivery().then(function(r){msg(r==='abort'?'Abgebrochen.':'Neue Sync-Datei erstellt. Speichere sie in deinen Cloud-Ordner.')})});
      i.click();
    }
    else if(b.id==='mk-ip')readFile(function(x){if(x.kind!=='profile')return msg('Das ist eine Gesamt-Sicherung. Bitte „Sicherung einspielen“ nutzen.',true);importProfile(x)});
    else if(b.id==='mk-close')d.close();
  });
  d.showModal();
}
MK.nav=function(){
  css();
  var here=(location.pathname.split('/').pop()||'index.html'),p=MK.profile();
  var n=document.createElement('nav');n.id='mknav';n.setAttribute('aria-label','Bereiche');
  n.innerHTML=LINKS.map(function(l){var cur=here===l[0]||(here===''&&l[0]==='index.html')||(l[3]&&l[3].indexOf(here)>=0);return '<a href="'+l[0]+'"'+(cur?' aria-current="page"':'')+'><span class="lf">'+l[1]+'</span><span class="ls">'+l[2]+'</span></a>'}).join('')+'<span class="sp"></span><button id="mk-theme" class="ic" type="button"></button><button id="mk-set" class="ic" type="button" aria-label="Einstellungen und Sicherung" title="Einstellungen und Sicherung">⚙</button><button id="mk-prof" type="button" aria-haspopup="dialog">'+esc(p.emoji)+'<span class="nm"> '+esc(p.name)+'</span></button>';
  document.body.insertBefore(n,document.body.firstChild);
  if(SUBS.some(function(x){return x[0]===here})){
    var sb=document.createElement('nav');sb.id='mksub';sb.setAttribute('aria-label','Gitarre');
    sb.innerHTML=SUBS.map(function(x){return '<a href="'+x[0]+'"'+(x[0]===here?' aria-current="page"':'')+'>'+x[1]+'</a>'}).join('');
    n.parentNode.insertBefore(sb,n.nextSibling);
  }
  if(here&&here!=='index.html'&&here!=='')sv('mk.lastpage',{p:here,t:(document.title||here).replace(/\s*·.*$/,''),d:Date.now()});
  document.getElementById('mk-prof').addEventListener('click',openDlg);
  document.getElementById('mk-set').addEventListener('click',setDlg);
  document.getElementById('mk-theme').addEventListener('click',function(){var o=['auto','light','dark'];MK.theme(o[(o.indexOf(themePref())+1)%3])});
  applyTheme();
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',MK.nav);else MK.nav();
if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost')){
  window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){})});
}
})();
