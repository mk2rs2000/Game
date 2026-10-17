/* Mimi's Magic Playhouse — local-only audio and child-friendly activities. */
(() => {
'use strict';
const $ = id => document.getElementById(id);
const all = sel => Array.from(document.querySelectorAll(sel));
const safeGet = (k) => { try{return localStorage.getItem(k)}catch{return null} };
const safeSet = (k,v) => {try{localStorage.setItem(k,v)}catch{}};
const stateKey='mimi-playhouse-v4';
const outfits={
 Everyday:[
 ['daisy','Daisy Dress','🌼','#ffafd4','🌼'],['rainbow','Rainbow','🌈','#ffbfe4','🌈'],['princess','Princess','👸','#c6a6ff','💖'],['unicorn','Unicorn','🦄','#b0eefb','🦄'],
 ['ballerina','Ballerina','🩰','#f9c7dc','✨'],['starry','Starry Night','⭐','#8881dc','⭐'],['overalls','Dungarees','🧸','#80bbf0','🐻'],['cosy','Cosy Jumper','🧶','#ffd38d','💗']],
 Halloween:[
 ['witch','Witch','🧙','#7e56ac','⭐'],['pumpkin','Pumpkin','🎃','#fb9d45','🎃'],['ghost','Friendly Ghost','👻','#fcfcff','👻'],['bat','Little Bat','🦇','#434268','🦇'],
 ['vampire','Vampire','🧛','#af4661','🖤'],['spider','Sparkle Spider','🕷️','#7c7cba','🕸️'],['candy','Trick or Treat','🍬','#ff91cf','🍬'],['spooky','Spooky Princess','👑','#b493f0','🌙']],
 Christmas:[
 ['santa','Santa Kitty','🎅','#e74e65','🎄'],['elf','Little Elf','🧝','#60bb74','🎁'],['snowflake','Snowflake','❄️','#a4dcff','❄️'],['reindeer','Reindeer','🦌','#c58a65','🔔'],
 ['gingerbread','Gingerbread','🍪','#c89567','🍬'],['tree','Christmas Tree','🎄','#54a36f','⭐'],['present','Gift Wrap','🎁','#ff88be','🎀'],['xmasprincess','Winter Princess','👸','#b4cafa','✨']],
 Seasons:[
 ['spring','Spring Blossom','🌷','#ffb2ca','🌸'],['summer','Sunny Days','☀️','#ffe075','☀️'],['beach','Beach Fun','🏖️','#83d9e8','🌊'],['autumn','Autumn Leaves','🍁','#d78346','🍁'],
 ['rain','Rainy Day','🌧️','#80b6de','☔'],['winter','Winter Cosy','⛄','#b1d8eb','❄️'],['picnic','Picnic Time','🧺','#ed9ea7','🍓'],['pjs','Sleepy Pyjamas','🌙','#9996ed','🌙']]
};
const hairstyle=[['none','No hair','🐱'],['fringe','Fringe','💇'],['curly','Curly','🌀'],['pigtails','Pigtails','🎀'],['braids','Braids','🌼'],['ponytail','Ponytail','🐴'],['buns','Space Buns','🪐'],['bob','Bob Cut','✨'],['long','Long Waves','🌊'],['spiky','Spiky','⭐'],['rainbow','Rainbow Hair','🌈']];
const hairColours=[['chocolate','Chocolate','#885a57'],['gold','Golden','#efb95d'],['pink','Candy Pink','#ff83b8'],['purple','Purple','#9270d9'],['aqua','Mermaid','#60c9d8']];
const hats=[['none','Nothing','🐱'],['bow','Big Bow','🎀'],['crown','Royal Crown','👑'],['flower','Flower','🌸'],['sunglasses','Sunglasses','😎'],['party','Party Hat','🥳'],['witchhat','Witch Hat','🧙'],['santahat','Santa Hat','🎅'],['reindeerhat','Antlers','🦌'],['star','Star Clips','⭐'],['heart','Heart Glasses','💖'],['elfhat','Elf Hat','🎄']];
const furs=[['lavender','Lavender','#d5adfa','#aa7fd8'],['pink','Strawberry','#ffb4d6','#df82b8'],['ginger','Ginger','#ffcd8f','#dca26f'],['mint','Mint','#b6f4df','#79c8a9'],['snow','Snowball','#fff8f9','#dcd2e5'],['blue','Sky Blue','#acddff','#82b5dd']];
const voices=[
 ['squeaky','Squeaky','🐭','Super cute',1.42,'high'],['chipmunk','Chipmunk','🐿️','Super fast',1.88,'high'],['fairy','Fairy','🧚','Tiny & magical',1.23,'high'],
 ['alien','Alien','👽','Spacey',1.64,'alien'],['robot','Robot','🤖','Beep boop',1.04,'robot'],['giant','Giant','🦖','Big & deep',.72,'deep'],
 ['monster','Monster','👹','Funny growl',.60,'monster'],['sleepy','Sleepy','😴','Slow & low',.84,'low'],['echo','Echo','🌈','Boing boing',1.10,'echo'],['normal','Normal','🐱','Just like you',1,'normal']
];
const gems=[
 ['ruby','Ruby','❤️','Red sparkle'],['sapphire','Sapphire','💙','Ocean gem'],['emerald','Emerald','💚','Forest gem'],['amethyst','Amethyst','💜','Purple power'],['topaz','Golden Topaz','💛','Sunny shine'],['rose','Rose Quartz','🩷','Heart gem'],
 ['diamond','Diamond','💎','Shiny crystal'],['moon','Moonstone','🌙','Moon magic'],['rainbow','Rainbow','🌈','Colour splash'],['star','Starlight','🌟','Twinkle star'],['snow','Snow Crystal','❄️','Winter wish'],['pumpkin','Pumpkin Gem','🎃','Spooky fun'],
 ['holly','Holly Gem','🎄','Festive joy'],['butterfly','Butterfly','🦋','Spring wings'],['ocean','Ocean Pearl','🫧','Bubbly'],['unicorn','Unicorn Gem','🦄','Wish magic'],['sun','Sunstone','☀️','Summer days'],['royal','Royal Heart','👑','Princess shine']
];
const games=[['stars','Star Pop','⭐','Tap the stars!','#ffe0ae'],['gifts','Mystery Gifts','🎁','Pick a present!','#fcd4df'],['feed','Feed Mimi','🍓','Funny snacks!','#d1f7c7'],['dance','Dance Party','🪩','Kitty disco!','#e0d5ff'],['garden','Magic Garden','🌷','Grow flowers!','#d8f7f0'],['colours','Colour Magic','🎨','Match colours!','#ffe1e6'],['dare','Silly Dares','🎲','Make Mimi giggle!','#f1ddff'],['hunt','Gem Hunt','💎','Find treasure!','#d7e8ff']];
const defaults={fur:'lavender',outfit:'daisy',hair:'none',hairColour:'chocolate',hat:'bow',voice:'squeaky',total:0,album:[],actions:0};
let save={...defaults};try{const old=JSON.parse(safeGet(stateKey)||'null');if(old&&typeof old==='object')save={...defaults,...old};}catch{}
if(!Array.isArray(save.album))save.album=[]; save.total=Math.max(0,Number(save.total)||0);save.actions=Math.max(0,Number(save.actions)||0);
function store(){safeSet(stateKey,JSON.stringify(save));}
const choice=(items,key,def)=>items.some(it=>it[0]===key)?key:def;
save.voice=choice(voices,save.voice,'squeaky');save.fur=choice(furs,save.fur,'lavender');save.hair=choice(hairstyle,save.hair,'none');save.hat=choice(hats,save.hat,'none');save.hairColour=choice(hairColours,save.hairColour,'chocolate');
if(!Object.values(outfits).flat().some(o=>o[0]===save.outfit))save.outfit='daisy';
let page='home', dressTab='outfit', season='Everyday', activity='', activeTimer=0, toastTimer=0, faceTimer=0, dancingTimer=0, muted=false;
const wrap=$('cat-wrap'), speech=$('bubble'), hint=$('hint');
const recBtn=$('record'), recLabel=$('record-label'), recDetail=$('record-detail'), replay=$('replay');
function message(txt,detail='Tap the mic to talk with Mimi!'){speech.textContent=txt;hint.textContent=detail;}
function toast(txt){const el=$('toast');el.textContent=txt;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.hidden=true,2350);}
function confetti(num=14){const colours=['#ff8dba','#ffcc4e','#9d7eef','#7bdfbd','#fff','#79cdea'];for(let i=0;i<num;i++){const c=document.createElement('i');c.className='confetti';c.style.background=colours[i%colours.length];c.style.left=(20+Math.random()*60)+'%';c.style.top=(25+Math.random()*55)+'%';c.style.setProperty('--dx',(Math.random()*420-210)+'px');c.style.setProperty('--dy',(Math.random()*320-220)+'px');c.style.setProperty('--spin',(Math.random()*850)+'deg');wrap.append(c);setTimeout(()=>c.remove(),1350);}}
function face(kind=''){wrap.classList.remove('is-giggling','is-meme','is-listening','is-talking','is-dancing');if(kind)wrap.classList.add('is-'+kind);}
function happy(txt='Yay! 🎉'){clearTimeout(faceTimer);message(txt);face('giggling');confetti(12);faceTimer=setTimeout(()=>face(),1100);}
function updateGemUI(){ $('gem-count').textContent=save.total; $('gem-total').textContent=save.total;$('gem-found').textContent=`${save.album.length} / ${gems.length}`;$('album-caption').textContent=`${gems.length-save.album.length} to discover`;
 $('gem-album').innerHTML=gems.map(([key,name,emoji,note])=>{const owned=save.album.includes(key);return `<div class="gem-entry"><span class="gem-art ${owned?'':'locked'}">${owned?emoji:'🔒'}</span><b>${owned?name:'Mystery gem'}</b><small>${owned?note:'Keep playing!'}</small></div>`}).join('');}
function reward(points=1){save.total+=points;save.actions++;let found='';if(save.album.length<gems.length){const left=gems.filter(g=>!save.album.includes(g[0]));const pick=left[Math.floor(Math.random()*left.length)];found=pick[0];save.album.push(found);}store();updateGemUI();toast(found?`+${points} 💎  New gem: ${gems.find(g=>g[0]===found)[1]}!`:`+${points} 💎 Sparkle points!`);}
function outfitSVG(info){if(!info)return '';const [id,,emoji,colour,decoration]=info;
 const pale=['ghost','snowflake','snow','winter','xmasprincess'].includes(id)?'#8d7dc1':'#fff';
 return `<path d="M169 270 Q187 257 207 263 Q228 257 247 271 L272 355 Q205 400 145 357 Z" fill="${colour}" stroke="#ffffff" stroke-width="4"/><path d="M169 272 Q208 291 247 272" stroke="${pale}" opacity=".8" fill="none" stroke-width="6"/><path d="M156 333 Q209 350 262 334" stroke="${pale}" fill="none" stroke-width="4" opacity=".8"/><rect x="185" y="294" width="46" height="9" rx="4" fill="${pale}" opacity=".9"/><text x="208" y="337" font-size="37" text-anchor="middle">${decoration}</text>${id==='overalls'?'<path d="M172 267 L196 302 M244 267 L222 302" stroke="white" stroke-width="11"/>':''}`;
}
function hairSVG(style,colour){if(style==='none')return '';
 const head='<path d="M135 114 Q142 79 185 72 Q234 62 277 112 Q245 102 232 91 Q209 110 189 92 Q165 106 135 114 Z"/>';
 const curls=Array.from({length:7},(_,i)=>`<circle cx="${150+i*19}" cy="${86+((i%2)*-8)}" r="19"/>`).join('');
 const left='<path d="M127 103 Q81 151 105 234 L133 224 Q121 157 153 100 Z"/>';
 const right='<path d="M283 102 Q332 155 301 238 L281 229 Q296 159 263 101 Z"/>';
 const circle=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}"/>`;
 let shape=head;
 if(style==='fringe') shape='<path d="M126 111 Q139 66 207 70 Q278 66 291 112 Q274 136 258 114 Q238 145 219 112 Q192 146 174 115 Q150 137 126 111 Z"/>';
 else if(style==='curly')shape=curls+circle(133,107,19)+circle(284,106,19);
 else if(style==='pigtails')shape=head+circle(106,130,39)+circle(310,128,39);
 else if(style==='braids')shape=head+Array.from({length:4},(_,i)=>circle(109-i%2*5,153+i*18,16)+circle(305+i%2*5,153+i*18,16)).join('');
 else if(style==='ponytail')shape=head+'<path d="M280 101 Q367 78 342 186 Q325 214 301 183 Q334 140 285 121 Z"/>';
 else if(style==='buns')shape=head+circle(111,89,35)+circle(304,89,35);
 else if(style==='bob')shape=head+left.replace('234','203')+right.replace('238','203');
 else if(style==='long')shape=head+left+right;
 else if(style==='spiky')shape='<path d="M121 115 L140 58 L169 84 L194 35 L217 85 L252 41 L261 90 L300 65 L286 114 Q211 91 121 115 Z"/>';
 else if(style==='rainbow')shape=head+left+right;
 if(style==='rainbow')return `<g fill="#fa86a4">${shape}</g><path d="M154 100 Q205 62 264 100" stroke="#ffe16a" stroke-width="16" fill="none"/><path d="M150 100 Q205 73 269 100" stroke="#76dcb8" stroke-width="7" fill="none"/>`;
 return `<g fill="${colour}" stroke="#fff" stroke-width="2" stroke-linejoin="round">${shape}</g>`;
}
function hatSVG(id){const obj=hats.find(a=>a[0]===id);if(!obj || id==='none')return '';
 const top=['witchhat','santahat','elfhat','crown','party','flower','star','bow','reindeerhat'].includes(id);
 const x=top?207:207,y=top?65:163,scale=top?'1':'0.95';
 if(id==='sunglasses'||id==='heart')return `<text x="207" y="186" text-anchor="middle" font-size="86">${obj[2]}</text>`;
 return `<text x="${x}" y="${y}" text-anchor="middle" font-size="75" transform="translate(0 0) scale(${scale})">${obj[2]}</text>`;
}
function applyLook(){const f=furs.find(a=>a[0]===save.fur)||furs[0];document.documentElement.style.setProperty('--cat-fur',f[2]);document.documentElement.style.setProperty('--cat-fur-dark',f[3]);
 const o=Object.values(outfits).flat().find(a=>a[0]===save.outfit),c=(hairColours.find(a=>a[0]===save.hairColour)||hairColours[0])[2];
 all('svg.cat').forEach(svg=>{svg.querySelector('.dress-layer').innerHTML=outfitSVG(o);svg.querySelector('.hair-layer').innerHTML=hairSVG(save.hair,c);svg.querySelector('.hat-layer').innerHTML=hatSVG(save.hat)});
 $('wearing').textContent=`${o?o[1]:'Fluffy Mimi'} • ${hairstyle.find(a=>a[0]===save.hair)[1]}`;
}
function selectLook(key,value){save[key]=value;store();applyLook();renderWardrobe();chirp([720,970],.09);toast('✨ Mimi looks fabulous!');}
function renderWardrobe(){all('[data-dress-tab]').forEach(b=>{b.classList.toggle('selected',b.dataset.dressTab===dressTab);b.setAttribute('aria-selected',String(b.dataset.dressTab===dressTab));});let html='';
 if(dressTab==='outfit'){
  html='<p>Pick the perfect costume — mix it with any hair or hat!</p><div class="season-tabs">'+Object.keys(outfits).map(s=>`<button type="button" class="${season===s?'selected':''}" data-season="${s}">${({Everyday:'🌈',Halloween:'🎃',Christmas:'🎄',Seasons:'☀️'})[s]} ${s}</button>`).join('')+'</div><h3 class="subhead">'+season+' outfits</h3><div class="wardrobe-grid">'+outfits[season].map(([id,label,emoji])=>`<button type="button" class="wardrobe-item" data-outfit="${id}" aria-pressed="${save.outfit===id}"><span>${emoji}</span><b>${label}</b></button>`).join('')+'</div>';
 }else if(dressTab==='hair'){
  html='<p>Try a hairstyle and choose its colour.</p><h3 class="subhead">Hairstyles</h3><div class="wardrobe-grid">'+hairstyle.map(([id,label,emoji])=>`<button type="button" class="wardrobe-item" data-hair="${id}" aria-pressed="${save.hair===id}"><span>${emoji}</span><b>${label}</b></button>`).join('')+'</div><h3 class="subhead">Hair colours</h3><div class="wardrobe-grid">'+hairColours.map(([id,label,colour])=>`<button type="button" class="wardrobe-item colour-choice" data-hair-colour="${id}" aria-pressed="${save.hairColour===id}"><span class="colour-dot" style="background:${colour}"></span><b>${label}</b></button>`).join('')+'</div>';
 }else if(dressTab==='hat'){
  html='<p>Top it off with something sparkly!</p><div class="wardrobe-grid">'+hats.map(([id,label,emoji])=>`<button type="button" class="wardrobe-item" data-hat="${id}" aria-pressed="${save.hat===id}"><span>${emoji}</span><b>${label}</b></button>`).join('')+'</div>';
 }else {
  html='<p>Mimi can be any colour you like!</p><div class="wardrobe-grid">'+furs.map(([id,label,colour])=>`<button type="button" class="wardrobe-item colour-choice" data-fur="${id}" aria-pressed="${save.fur===id}"><span class="colour-dot" style="background:${colour}"></span><b>${label}</b></button>`).join('')+'</div>';
 }
 $('wardrobe-content').innerHTML=html;
}
function renderVoice(){ $('voice-grid').innerHTML=voices.map(([id,label,emoji,note])=>`<button type="button" class="voice-card" data-voice="${id}" aria-pressed="${save.voice===id}"><span>${emoji}</span><b>${label}</b><small>${note}</small></button>`).join('');
 $('quick-voice').innerHTML=voices.filter(v=>['squeaky','alien','giant','robot'].includes(v[0])).map(([id,label,emoji])=>`<button type="button" class="quick-chip ${save.voice===id?'selected':''}" data-voice="${id}" aria-pressed="${save.voice===id}">${emoji} ${label}</button>`).join('');
}
function setVoice(id){save.voice=choice(voices,id,'squeaky');store();renderVoice();chirp([550,840]);const v=voices.find(x=>x[0]===save.voice);toast(`${v[2]} ${v[1]} voice selected!`);if(lastBuffer||lastBlob)replay.hidden=false;}
function showPage(id){if(!['home','wardrobe','play','voices','gems'].includes(id))return;
 if(page==='home' && id!=='home' && (recState==='recording'||recState==='requesting'||recState==='processing'))cancelRecording();
 if(page==='home' && id!=='home' && recState==='playing')stopPlayback();
 page=id;all('.page').forEach(p=>{const yes=p.id===`page-${id}`;p.hidden=!yes;p.classList.toggle('active',yes)});all('[data-page]').forEach(b=>{b.classList.toggle('selected',b.dataset.page===id);b.setAttribute('aria-selected',String(b.dataset.page===id));});if(id!=='play')closeActivity();window.scrollTo({top:0,behavior:'auto'});}
const AudioCtx=window.AudioContext||window.webkitAudioContext;
let ctx=null;
async function getContext(){if(!AudioCtx)throw new Error('Web Audio is not available.');if(!ctx)ctx=new AudioCtx();if(ctx.state==='suspended')await ctx.resume();return ctx;}
function chirp(notes=[600,860,700],duration=.095){if(muted)return;getContext().then(ac=>{const t=ac.currentTime;notes.forEach((freq,i)=>{const osc=ac.createOscillator(),gain=ac.createGain();osc.type='sine';osc.frequency.setValueAtTime(freq,t+i*duration);gain.gain.setValueAtTime(.001,t+i*duration);gain.gain.exponentialRampToValueAtTime(.095,t+i*duration+.016);gain.gain.exponentialRampToValueAtTime(.001,t+(i+1)*duration);osc.connect(gain);gain.connect(ac.destination);osc.start(t+i*duration);osc.stop(t+(i+1)*duration+.01);});}).catch(()=>{});}
// Microphone audio NEVER touches localStorage, logs, network requests, or any server.
const maxRecordMs=8000;
let recState='idle',mediaStream=null,recorder=null,chunks=[],processor=null,micSource=null,muteNode=null,pcmChunks=[],pcmSamples=0,pcmFallback=false;
let started=0,recordTimer=0,recordAnimation=0,playingSource=null,playingNodes=[],fallbackAudio=null,audioURL=null,lastBuffer=null,lastBlob=null;
function recordingLabel(){recBtn.classList.remove('is-recording');recBtn.disabled=false;recLabel.textContent='Tap to talk';recDetail.textContent='Tap again to hear Mimi';$('mic-emoji').textContent='🎤';$('progress').style.width='0%';if(recState!=='playing')face();}
function stopTimers(){clearTimeout(recordTimer);cancelAnimationFrame(recordAnimation);recordTimer=0;recordAnimation=0;}
function stopMic(){if(processor){processor.onaudioprocess=null;try{processor.disconnect()}catch{}processor=null}if(micSource){try{micSource.disconnect()}catch{}micSource=null}if(muteNode){try{muteNode.disconnect()}catch{}muteNode=null}if(mediaStream){mediaStream.getTracks().forEach(t=>t.stop());mediaStream=null}}
function stopPlayback(){if(playingSource){try{playingSource.onended=null;playingSource.stop()}catch{}playingSource=null}playingNodes.forEach(n=>{try{n.stop?.()}catch{}try{n.disconnect()}catch{}});playingNodes=[];if(fallbackAudio){fallbackAudio.onended=null;fallbackAudio.pause();fallbackAudio=null}if(audioURL){URL.revokeObjectURL(audioURL);audioURL=null}if(recState==='playing'){recState='idle';recordingLabel()}}
function discardVoice(){stopPlayback();lastBuffer=null;lastBlob=null;replay.hidden=true;}
function cancelRecording(){stopTimers();if(recorder){recorder.onstop=null;recorder.ondataavailable=null;recorder.onerror=null;try{if(recorder.state!=='inactive')recorder.stop()}catch{}recorder=null}stopMic();chunks=[];pcmChunks=[];pcmSamples=0;recState='idle';recordingLabel();}
function voiceData(){return voices.find(v=>v[0]===save.voice)||voices[0]}
function voiceFilter(source,ac){const v=voiceData(),nodes=[source];let destination=source;
 if(v[5]==='robot'){const filter=ac.createBiquadFilter();filter.type='bandpass';filter.frequency.value=1050;filter.Q.value=.5;destination.connect(filter);destination=filter;nodes.push(filter);
  const ring=ac.createGain();ring.gain.value=.7;const lfo=ac.createOscillator(),lfoGain=ac.createGain();lfo.frequency.value=34;lfoGain.gain.value=.3;lfo.connect(lfoGain);lfoGain.connect(ring.gain);lfo.start();nodes.push(lfo,lfoGain,ring);destination.connect(ring);destination=ring;
 }else if(v[5]==='monster'||v[5]==='deep'||v[5]==='low'){const filter=ac.createBiquadFilter();filter.type='lowpass';filter.frequency.value=v[5]==='monster'?850:1500;destination.connect(filter);destination=filter;nodes.push(filter);
 }else if(v[5]==='high'||v[5]==='alien'){const filter=ac.createBiquadFilter();filter.type='highshelf';filter.frequency.value=1100;filter.gain.value=v[5]==='alien'?7:3;destination.connect(filter);destination=filter;nodes.push(filter);}
 const volume=ac.createGain();volume.gain.value=.88;destination.connect(volume);volume.connect(ac.destination);nodes.push(volume);
 if(v[5]==='echo'){const delay=ac.createDelay(.6),wet=ac.createGain();delay.delayTime.value=.21;wet.gain.value=.33;destination.connect(delay);delay.connect(wet);wet.connect(ac.destination);nodes.push(delay,wet);}
 return nodes;
}
function playing(){recState='playing';recBtn.disabled=true;recLabel.textContent='Mimi is talking!';recDetail.textContent=voiceData()[1]+' voice';face('talking');message(`Hee hee! ${voiceData()[2]} That's you!`,'Choose another voice and replay it!');confetti(9);replay.hidden=true;}
function finishedPlaying(){stopPlayback();recState='idle';recordingLabel();replay.hidden=!(lastBuffer||lastBlob);message('That was funny! 😹','Change voice and tap Hear that again!');}
function needTap(){recState='idle';recordingLabel();replay.hidden=!(lastBuffer||lastBlob);message('Tap Hear that again! 🔊','Safari sometimes needs an extra tap to play sound.');}
async function playLatest(){if(!lastBuffer&&!lastBlob)return;stopPlayback();try{const ac=await getContext();if(lastBuffer){const src=ac.createBufferSource();src.buffer=lastBuffer;src.playbackRate.value=voiceData()[4];playingNodes=voiceFilter(src,ac);playingSource=src;src.onended=finishedPlaying;src.start();playing();return;}
 if(lastBlob){if(audioURL)URL.revokeObjectURL(audioURL);audioURL=URL.createObjectURL(lastBlob);const audio=new Audio(audioURL);fallbackAudio=audio;audio.playbackRate=voiceData()[4];audio.preservesPitch=false;audio.webkitPreservesPitch=false;audio.onended=finishedPlaying;await audio.play();playing();return;}
 }catch(err){console.warn('Local playback could not start:',err?.name);needTap();}}
async function finishBlob(blob){if(recState!=='processing')return;if(!blob?.size){cancelRecording();message('I missed that! 🐱','Speak a little longer, then try again.');return}lastBlob=blob;lastBuffer=null;
 try{const ac=await getContext();lastBuffer=await ac.decodeAudioData(await blob.arrayBuffer());if(recState==='processing')await playLatest();}
 catch{if(recState==='processing')await playLatest();}}
async function beginRecording(){if(recState!=='idle')return;stopDancing();discardVoice();recState='requesting';recBtn.disabled=true;message('Mimi is waking up… 🐾','Safari may ask for permission to use the microphone.');
 try{const ac=await getContext();if(!navigator.mediaDevices?.getUserMedia)throw new Error('Mic needs an HTTPS website.');const mic=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,channelCount:1},video:false});if(recState!=='requesting'){mic.getTracks().forEach(t=>t.stop());return}mediaStream=mic;chunks=[];pcmChunks=[];pcmSamples=0;pcmFallback=false;recorder=null;
 if(window.MediaRecorder){let mime='';for(const m of ['audio/mp4','audio/webm;codecs=opus','audio/webm','audio/ogg;codecs=opus'])if(MediaRecorder.isTypeSupported?.(m)){mime=m;break}
  try{recorder=mime?new MediaRecorder(mediaStream,{mimeType:mime}):new MediaRecorder(mediaStream);recorder.ondataavailable=e=>{if(e.data?.size)chunks.push(e.data)};recorder.onerror=()=>{cancelRecording();message('Oops! Mic error 🎤','Try the mic again.');};recorder.onstop=()=>{const parts=chunks;chunks=[];const type=parts[0]?.type||recorder?.mimeType||'audio/mp4';recorder=null;stopMic();if(recState==='processing')finishBlob(new Blob(parts,{type}));};recorder.start();}
  catch{recorder=null}
 }
 if(!recorder){pcmFallback=true;micSource=ac.createMediaStreamSource(mediaStream);processor=ac.createScriptProcessor(2048,1,1);muteNode=ac.createGain();muteNode.gain.value=0;processor.onaudioprocess=e=>{if(recState!=='recording')return;const slice=new Float32Array(e.inputBuffer.getChannelData(0));pcmChunks.push(slice);pcmSamples+=slice.length;e.outputBuffer.getChannelData(0).fill(0)};micSource.connect(processor);processor.connect(muteNode);muteNode.connect(ac.destination);}
 started=performance.now();recState='recording';recBtn.disabled=false;recBtn.classList.add('is-recording');recLabel.textContent='Stop & repeat!';recDetail.textContent='Mimi is listening';$('mic-emoji').textContent='⏹️';face('listening');message("I'm all ears! 👂",'Talk for up to 8 seconds.');
 function meter(){if(recState!=='recording')return;$('progress').style.width=Math.min(100,(performance.now()-started)/maxRecordMs*100)+'%';recordAnimation=requestAnimationFrame(meter)}meter();recordTimer=setTimeout(endRecording,maxRecordMs);
 }catch(e){cancelRecording();message('Microphone needs permission 🎤','Open this page using HTTPS, then allow Safari microphone access.');console.warn('Microphone permission/device problem:',e?.name);}}
function endRecording(){if(recState!=='recording')return;const length=performance.now()-started;stopTimers();recState='processing';recBtn.disabled=true;recLabel.textContent='Mimi is thinking…';recDetail.textContent='Just a moment';face();if(length<300){cancelRecording();message('Just a little longer! 🐱','Say a word or two first.');return}
 if(pcmFallback){const total=pcmSamples,parts=pcmChunks;pcmSamples=0;pcmChunks=[];stopMic();if(!total){cancelRecording();message('Try once more!','I missed that.');return}try{const b=ctx.createBuffer(1,total,ctx.sampleRate),dest=b.getChannelData(0);let pos=0;for(const part of parts){dest.set(part,pos);pos+=part.length;}lastBuffer=b;lastBlob=null;playLatest();}catch{cancelRecording();message('Try again, please! 🎤');}}
 else if(recorder&&recorder.state!=='inactive'){try{recorder.stop()}catch{cancelRecording();message('Try again, please! 🎤');}}
 else{cancelRecording()}}
function stopDancing(){clearTimeout(dancingTimer);dancingTimer=0;if(recState!=='playing')face();}
function catAction(kind){if(recState==='recording'||recState==='requesting'||recState==='processing')return;stopDancing();if(kind==='meme'){$('numbers').classList.remove('show');void $('numbers').offsetHeight;$('numbers').classList.add('show');face('meme');message('SIX! SEVEN! 🙌','Mimi is doing the 6–7 dance!');chirp([470,550,470,710,880],.13);confetti(33);playMeme();dancingTimer=setTimeout(()=>{face();$('numbers').classList.remove('show')},1850);}
 else if(kind==='dance'){face('dancing');message('Disco Mimi! 💃🪩','Dance dance dance!');chirp([450,530,610,730,650,530],.12);confetti(23);dancingTimer=setTimeout(()=>{face();message('Phew, that was fun! 😹')},2900)}
 else{happy(kind==='tickle'?'Tee hee hee! 😹':'Boop! 💖');chirp(kind==='tickle'?[820,950,1140]:[510,800]);}}
let memeBufferPromise=null;
function playMeme(){if(muted)return;try{getContext().then(async ac=>{if(!memeBufferPromise)memeBufferPromise=fetch('./six-seven.wav').then(r=>{if(!r.ok)throw new Error('Missing sound');return r.arrayBuffer()}).then(bytes=>ac.decodeAudioData(bytes)).catch(()=>null);const buffer=await memeBufferPromise;if(!buffer)return;const src=ac.createBufferSource();src.buffer=buffer;src.playbackRate.value=1.12;src.connect(ac.destination);src.start();}).catch(()=>{});}catch{}}
function buildGameTiles(){$('game-tiles').innerHTML=games.map(([id,label,emoji,note,tint])=>`<button type="button" class="game-tile" style="--tile:${tint}" data-game="${id}"><span>${emoji}</span><b>${label}</b><small>${note}</small></button>`).join('')}
function closeActivity(){if(activeTimer){clearInterval(activeTimer);clearTimeout(activeTimer);activeTimer=0}activity='';$('activity').hidden=true}
function openActivity(id){closeActivity();const g=games.find(x=>x[0]===id);if(!g)return;activity=id;showPage('play');$('activity').hidden=false;$('activity-title').textContent=`${g[2]} ${g[1]}`;$('activity-info').textContent=g[3];renderActivity();$('activity').scrollIntoView({behavior:'smooth',block:'start'});}
function awardActivity(n,text='Brilliant!'){reward(n);confetti(18);chirp([523,659,784,1000],.13);if(text)toast(text+` +${n} 💎`);}
function renderActivity(){const body=$('activity-body');body.innerHTML='';if(activity==='stars')startStars();if(activity==='gifts')startGifts();if(activity==='feed')startFeed();if(activity==='dance')startPartyGame();if(activity==='garden')startGarden();if(activity==='colours')startColours();if(activity==='dare')startDare();if(activity==='hunt')startHunt()}
function startStars(){let score=0,time=15;const body=$('activity-body');body.innerHTML='<div class="game-status"><span>⭐ <b id="star-score">0</b></span><span>⏱️ <b id="star-clock">15</b>s</span></div><div class="star-field" id="star-field"><button type="button" class="star-target" id="star-target">⭐</button></div><p class="activity-note">Tap the star before it moves!</p>';
 const target=$('star-target'),field=$('star-field');function move(){const maxX=Math.max(1,field.clientWidth-82),maxY=Math.max(1,field.clientHeight-80);target.style.left=Math.floor(Math.random()*maxX)+'px';target.style.top=Math.floor(Math.random()*maxY)+'px';target.textContent=['⭐','🌟','💖','✨'][Math.floor(Math.random()*4)]}move();target.onclick=()=>{if(activity!=='stars'||time<=0)return;score++;$('star-score').textContent=score;move();chirp([610+(score%5)*85],.065);if(score%4===0)confetti(5)};
 activeTimer=setInterval(()=>{if(activity!=='stars')return;time--;$('star-clock').textContent=time;if(time<=0){clearInterval(activeTimer);activeTimer=0;body.innerHTML=`<div class="game-board" style="text-align:center"><div style="font-size:66px">🌟</div><h2>You popped ${score} stars!</h2><p>You're a superstar!</p><button class="game-again" id="again-stars">Play again</button></div>`;awardActivity(Math.max(1,Math.min(10,Math.ceil(score/3))),'Star power!');$('again-stars').onclick=startStars;}},1000);
}
function startGifts(){let answer=Math.floor(Math.random()*3),opened=false;const body=$('activity-body');body.innerHTML='<div class="choice-grid">'+[0,1,2].map(i=>`<button data-gift="${i}" type="button">🎁</button>`).join('')+'</div><p class="activity-msg" id="gift-msg">Which present has the star?</p><div class="game-action"><button class="game-again" id="again-gifts">New presents 🔀</button></div>';
 all('[data-gift]').forEach(b=>b.onclick=()=>{if(opened)return;opened=true;const win=Number(b.dataset.gift)===answer;all('[data-gift]').forEach(k=>{const i=Number(k.dataset.gift);k.textContent=i===answer?'🌟':i===Number(b.dataset.gift)?'🐸':'🎁';k.disabled=true});$('gift-msg').textContent=win?'Hooray! You found it! 🌟':'Ribbit! A funny frog! 🐸';reward(win?3:1);confetti(win?18:6);chirp([520,690,840]);});$('again-gifts').onclick=startGifts;
}
function startFeed(){const foods=[['🐟','Fish','Mmm, yummy fish!'],['🍓','Berry','Sweet strawberries!'],['🥦','Broccoli','Crunch crunch!'],['🧁','Cupcake','Sprinkles everywhere!'],['🍕','Pizza','Cheesy meow!'],['🍉','Melon','Slurp slurp!']];const b=$('activity-body');b.innerHTML='<div class="choice-grid">'+foods.map(([e,n])=>`<button type="button" data-feed="${e}" aria-label="Feed Mimi ${n}">${e}</button>`).join('')+'</div><p id="feed-msg" class="activity-msg">What does Mimi want?</p>';
 all('[data-feed]').forEach(btn=>btn.onclick=()=>{const f=foods.find(a=>a[0]===btn.dataset.feed);$('feed-msg').textContent=`${f[0]} ${f[2]}`;happy(f[2]);reward(1);});}
function startPartyGame(){const b=$('activity-body');let beats=0;b.innerHTML='<div class="game-board" style="text-align:center"><div style="font-size:85px" id="party-emoji">🪩</div><h2>Tap for a dance move!</h2><p>Every 5 moves earns some gems.</p><button type="button" id="dance-move" class="game-again">💃 Dance!</button><p id="dance-count" class="activity-note">0 moves</p></div>';
 $('dance-move').onclick=()=>{beats++;$('dance-emoji');$('party-emoji').textContent=['💃','🕺','🐈','🪩','🎉'][beats%5];$('dance-count').textContent=`${beats} moves`;chirp([480+(beats%5)*95,700],.08);if(beats%5===0){confetti(25);reward(3)}};}
function startGarden(){const b=$('activity-body');let growth=0;b.innerHTML='<div class="game-board" style="text-align:center"><div class="flowers" id="garden-flower">🌱</div><p id="garden-msg">Water the little seed!</p><button type="button" id="water" class="game-again">💧 Water!</button></div>';
 $('water').onclick=()=>{growth++;$('garden-flower').textContent=['🌱','🌿','🌷','🌸','🌻'][Math.min(growth,4)];$('garden-msg').textContent=growth>=4?'A gorgeous flower! 🌼':'Keep watering! 💦';chirp([650,760,870]);if(growth>=4){reward(3);growth=0;setTimeout(()=>{if(activity==='garden'){$('garden-flower').textContent='🌱';$('garden-msg').textContent='Another flower?';}},850)}};}
function startColours(){const b=$('activity-body'),colors=[['red','#ef6b85','❤️'],['blue','#5ca6ea','💙'],['green','#74c4a1','💚'],['yellow','#f4ca54','💛'],['purple','#a282e3','💜'],['orange','#f5a065','🧡']];let correct='';function round(){const choices=colors.slice().sort(()=>Math.random()-.5).slice(0,3);correct=choices[Math.floor(Math.random()*3)][0];b.innerHTML=`<div class="game-board" style="text-align:center"><h2>Find the colour: ${correct.toUpperCase()}!</h2><div class="game-action">${choices.map(([name,col])=>`<button type="button" class="colour-guess" style="background:${col}" data-guess="${name}" aria-label="${name}"></button>`).join('')}</div><p id="colour-msg" class="activity-msg">Which one is it?</p></div>`;all('[data-guess]').forEach(btn=>btn.onclick=()=>{if(btn.dataset.guess===correct){reward(2);chirp([680,830,1030]);$('colour-msg').textContent='Amazing! ✨ Next one!';setTimeout(()=>{if(activity==='colours')round()},650)}else{$('colour-msg').textContent='Try another one! 💕';chirp([420,370]);}})}round()}
const dares=['Say “SILLY SAUSAGES!” 🌭','Roar like a TINY dinosaur! 🦖','Make the funniest alien sound! 👽','Sing one line of a silly song! 🎶','Say “banana pyjamas”! 🍌','Pretend you are a dancing potato! 🥔','Meow like a kitten! 🐱','Do your best robot noise! 🤖','Whisper “Mimi is amazing!” 🌟'];
function startDare(){const b=$('activity-body');let last=-1;b.innerHTML='<div class="game-board" style="text-align:center"><div style="font-size:58px">🎲</div><h2 id="dare-text">Ready for a silly dare?</h2><p>No need to record unless you want to!</p><button class="game-again" id="dare-go">Give me a dare!</button></div>';const go=()=>{let n=Math.floor(Math.random()*dares.length);if(n===last)n=(n+1)%dares.length;last=n;$('dare-text').textContent=dares[n];reward(1);chirp([660,820],.1)};$('dare-go').onclick=go;go()}
function startHunt(){let found=0;const goal=6,b=$('activity-body');const chosen=[...Array(12).keys()].sort(()=>Math.random()-.5).slice(0,goal);b.innerHTML='<p class="activity-note">Tap the tiles to find 6 hidden gems! ✨</p><div class="hunt-grid">'+[...Array(12)].map((_,i)=>`<button type="button" class="hunt-tile" data-hunt="${i}" aria-label="Open tile ${i+1}">❔</button>`).join('')+'</div><p class="activity-msg" id="hunt-progress">0 of 6 gems</p><div class="game-action"><button class="game-again" id="hunt-again">Shuffle 🪄</button></div>';
 all('[data-hunt]').forEach(tile=>tile.onclick=()=>{if(tile.disabled)return;tile.disabled=true;if(chosen.includes(Number(tile.dataset.hunt))){tile.textContent='💎';tile.classList.add('found');found++;chirp([650,930]);$('hunt-progress').textContent=`${found} of ${goal} gems`;if(found===goal){$('hunt-progress').textContent='You found them ALL! 🎉';reward(6);confetti(33)}}else{tile.textContent='🌼';chirp([420],.07)}});$('hunt-again').onclick=startHunt;
}
// Event wiring is done after every required element exists: a missing optional element cannot block other buttons.
all('[data-page]').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));
all('[data-goto]').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.goto)));
$('gem-shortcut').onclick=()=>showPage('gems');$('gem-hunt').onclick=()=>{showPage('play');openActivity('hunt');};
all('[data-dress-tab]').forEach(b=>b.onclick=()=>{dressTab=b.dataset.dressTab;renderWardrobe()});
$('wardrobe-content').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.season){season=b.dataset.season;renderWardrobe()}else if(b.dataset.outfit)selectLook('outfit',b.dataset.outfit);else if(b.dataset.hair)selectLook('hair',b.dataset.hair);else if(b.dataset.hat)selectLook('hat',b.dataset.hat);else if(b.dataset.fur)selectLook('fur',b.dataset.fur);else if(b.dataset.hairColour)selectLook('hairColour',b.dataset.hairColour)});
$('random-look').onclick=()=>{const get=a=>a[Math.floor(Math.random()*a.length)];save.outfit=get(Object.values(outfits).flat())[0];save.hair=get(hairstyle)[0];save.hairColour=get(hairColours)[0];save.hat=get(hats)[0];store();applyLook();renderWardrobe();confetti(18);toast('🎲 Surprise outfit!')};
$('clear-look').onclick=()=>{save.outfit='daisy';save.hair='none';save.hat='none';store();applyLook();renderWardrobe();toast('Back to fluffy Mimi! 🐱')};
$('voice-grid').addEventListener('click',e=>{const b=e.target.closest('[data-voice]');if(b)setVoice(b.dataset.voice)});$('quick-voice').addEventListener('click',e=>{const b=e.target.closest('[data-voice]');if(b)setVoice(b.dataset.voice)});
$('try-voice').onclick=()=>showPage('home');$('voice-test').onclick=()=>chirp([430,880,570,1020,620],.12);
$('game-tiles').addEventListener('click',e=>{const b=e.target.closest('[data-game]');if(b)openActivity(b.dataset.game)});$('activity-close').onclick=closeActivity;
recBtn.onclick=()=>{if(recState==='recording')endRecording();else if(recState==='idle')beginRecording()};replay.onclick=playLatest;
$('tickle').onclick=()=>catAction('tickle');$('boop').onclick=()=>catAction('boop');$('meme').onclick=()=>catAction('meme');$('home-dance').onclick=()=>catAction('dance');wrap.onclick=()=>catAction('tickle');wrap.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();catAction('tickle')}};
$('sound-toggle').onclick=()=>{muted=!muted;$('sound-toggle').textContent=muted?'🔇 Effects off':'🔊 Effects on';$('sound-toggle').setAttribute('aria-pressed',String(!muted));if(!muted)chirp()};
$('reset-save').onclick=()=>{if(!window.confirm('Grown-ups only: clear all saved gems and outfits on this device?'))return;save={...defaults,album:[]};store();applyLook();renderWardrobe();renderVoice();updateGemUI();toast('Collection reset')};
window.addEventListener('pagehide',()=>{cancelRecording();discardVoice();stopDancing();closeActivity();if(ctx){ctx.close().catch(()=>{});ctx=null}});
applyLook();renderWardrobe();renderVoice();buildGameTiles();updateGemUI();recordingLabel();
if('serviceWorker' in navigator && location.protocol==='https:'){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}))}
})();
