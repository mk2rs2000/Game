/* Mimi's Magic Playhouse — local-only audio and child-friendly activities. */
(() => {
'use strict';
const $ = id => document.getElementById(id);
const all = sel => Array.from(document.querySelectorAll(sel));
const safeGet = (k) => { try{return localStorage.getItem(k)}catch{return null} };
const safeSet = (k,v) => {try{localStorage.setItem(k,v)}catch{}};
const stateKey='mimi-playhouse-v6';
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
 ['squeaky','Squeaky','🐭','Cute & chirpy',1.42,'high'],
 ['chipmunk','Chipmunk','🐿️','Tiny speedster',1.88,'high'],
 ['fairy','Fairy','🧚','Sparkly magic',1.23,'high'],
 ['alien','Alien','👽','From outer space',1.64,'alien'],
 ['robot','Robot','🤖','Beep boop!',1.04,'robot'],
 ['giant','Giant','🦖','Big & deep',.72,'deep'],
 ['monster','Monster','👹','Silly grumble',.60,'monster'],
 ['sleepy','Sleepy','😴','Sleepy kitty',.84,'low'],
 ['echo','Echo','🏔️','Bouncy echo',1.10,'echo'],
 ['normal','My voice','🐱','No voice changes',1,'normal'],
 ['baby','Baby Kitty','🍼','Sweet and tiny',1.58,'high'],
 ['princessvoice','Princess','👑','Royal sparkle',1.16,'high'],
 ['dinosaur','Dinosaur','🦕','Rumbly roar',.66,'monster'],
 ['space','Space Radio','🚀','Bleepy space voice',1.12,'robot'],
 ['underwater','Underwater','🐠','Bubbly and soft',.91,'underwater'],
 ['witchvoice','Witch','🧙','Magic potion voice',.78,'witch'],
 ['bunny','Bouncy Bunny','🐰','Extra bouncy',1.68,'high'],
 ['superhero','Superhero','🦸','Brave and bold',.90,'deep'],
 ['butterfly','Butterfly','🦋','Fluttery & light',1.30,'high'],
 ['telephone','Telephone','☎️','Old-fashioned phone',1,'telephone'],
 ['cave','Cave Echo','🦇','Spooky echoes',.86,'echo'],
 ['pixie','Pixie','🌸','Tiny twinkles',1.75,'alien']
];
// Gem-shop items are bought ONLY with pretend gems earned by playing; no payments/network.
// [id, name, emoji, price, colour, accent, visual theme]
const magicDresses=[
 ['stardust','Stardust Princess','🌟',12,'#ab8cff','#fff2aa','stars',1],
 ['frostglow','Snowglow Fairy','❄️',18,'#9fdcf9','#e6fdff','snow',1],
 ['fairyglow','Fairy Light Dress','🧚',22,'#ffa6cc','#e9ffba','stars',2],
 ['christmaslights','Christmas Tree Lights','🎄',25,'#36a873','#ffef83','lights',2],
 ['candyglow','Candy Cane Twinkle','🍭',30,'#e85670','#fff5ef','lights',3],
 ['pumpkinglow','Pumpkin Glow Dress','🎃',32,'#d580ef','#ffe57e','pumpkin',3],
 ['winterqueen','Winter Queen','👑',38,'#a4c5ff','#f9fbff','snow',4],
 ['elfglimmer','Christmas Elf Sparkle','🧝',40,'#71c684','#ffd87a','lights',4],
 ['rainbowmagic','Rainbow Magic Gown','🌈',45,'#ef97e5','#8af3f2','rainbow',5],
 ['moonwish','Moonlight Dream Dress','🌙',48,'#6968c9','#f5dcff','stars',5],
 ['royaltree','Christmas Tree Princess','🎄',55,'#28784e','#ffd85c','lights',6],
 ['galaxydream','Galaxy Princess','🌌',65,'#604ea9','#b9a6ff','stars',7],
 ['sugarplum','Sugar Plum Ballet','🩰',72,'#ff9bd2','#fff0f8','stars',8],
 ['candlewish','Holiday Candle Glow','🕯️',78,'#ffcb7a','#fff6cf','lights',8],
 ['icecastle','Ice Castle Ballgown','🏰',86,'#a9d7ff','#f7fdff','snow',9],
 ['sunbeam','Sunbeam Sparkle','☀️',92,'#ffc75f','#fff2a8','stars',9],
 ['mermaidmagic','Mermaid Magic Dress','🧜',99,'#61d8df','#d7fffb','rainbow',10],
 ['twinklewitch','Twinkle Witch Dress','🧙',108,'#8f6be6','#ffd1ff','pumpkin',11],
 ['fairyblossom','Fairy Blossom Gown','🧚',32,'#faa7dd','#fff4bd','stars',3],
 ['forestfairy','Forest Fairy Dress','🍃',44,'#83dda9','#f5ffad','stars',4],
 ['starfairy','Starlight Fairy Dress','🌟',63,'#a9a0ff','#ffeb8d','stars',7],
 ['fairyqueenrobe','Fairy Queen Gown','🦋',105,'#e6a4fe','#fcffc7','rainbow',11]
]
// [id, name, emoji, price, glow colour]
const magicWands=[
 ['starwand','Star Wand','⭐',8,'#ffcf4a',1],
 ['heartwand','Heart Wand','💖',12,'#ff8cc3',1],
 ['snowwand','Snowflake Wand','❄️',15,'#7ed9f7',2],
 ['fairywand','Fairy Wand','🧚',20,'#c898ff',2],
 ['pumpkinwand','Pumpkin Wand','🎃',22,'#ffb568',3],
 ['hollywand','Christmas Holly Wand','🎄',25,'#8ce59c',3],
 ['moonwand','Moon Wand','🌙',30,'#d1a8ff',4],
 ['rainbowwand','Rainbow Wand','🌈',35,'#ffb7e4',4],
 ['treewand','Twinkling Tree Wand','🎄',42,'#ffe97d',5],
 ['candywand','Candy Cane Wand','🍭',48,'#ff7999',6],
 ['starlightwand','Starlight Scepter','🌟',55,'#ffe47c',7],
 ['aurorawand','Aurora Wand','✨',62,'#90f0ff',8],
 ['royalwand','Royal Heart Scepter','👑',70,'#ff94d7',9],
 ['galaxywand','Galaxy Wand','🌌',82,'#9d8dff',10],
 ['glitterwand','Pixie Dust Wand','✨',28,'#fbb1f4',3],
 ['fireflywand','Firefly Lantern Wand','🪲',48,'#ffeaa9',6],
 ['fairyqueenwand','Fairy Queen Wand','🦋',98,'#d5b7ff',12]
]
// Gem-only magical accessories. All have a permanent level and gem cost.
// [id, name, icon, cost, glow tint, minimum level]
const magicHats=[
 ['moonhalo','Moonbeam Halo','🌙',15,'#ecd1ff',2],
 ['fairycrown','Fairy Blossom Crown','🌸',22,'#ffabd4',3],
 ['glowbow','Colour-Changing Bow','🎀',27,'#ff95e8',4],
 ['fireflyhat','Firefly Tiara','✨',35,'#ffe68c',5],
 ['butterflycrown','Butterfly Crown','🦋',45,'#a4e5ff',6],
 ['christmascrown','Twinkling Christmas Hat','🎄',54,'#d3ff9c',7],
 ['starhalo','Rainbow Star Halo','🌈',70,'#ffb9ee',9],
 ['fairyqueen','Fairy Queen Crown','👑',90,'#d5b1ff',12],
 ['piratehat','Pirate Hat','🏴‍☠️',12,'#9acff7',1],
 ['beanie','Cosy Rainbow Beanie','🧢',14,'#ff9bc6',1],
 ['crystalcrown','Crystal Princess Crown','💎',38,'#c0efff',4],
 ['moonqueen','Moon Queen Crown','👑',62,'#c4acff',8]
];
const magicHair=[
 ['fairylocks','Fairy Glitter Locks','🧚',18,'#ffb1df',2],
 ['rainbowcurls','Slow Rainbow Curls','🌈',25,'#ffa5d5',3],
 ['mermaidwaves','Mermaid Glow Waves','🧜',38,'#9ccfff',5],
 ['blossombuns','Blossom Fairy Buns','🌺',48,'#ff9fd8',6],
 ['aurorahair','Aurora Glow Hair','✨',58,'#b4afff',8],
 ['stardustbraids','Stardust Braids','🌟',82,'#e3a7ff',10]
];
const magicWings=[
 ['fairywings','Little Fairy Wings','🧚',21,'#ffd1f3',2],
 ['butterflywings','Butterfly Sparkle Wings','🦋',34,'#97e8ff',4],
 ['winterwings','Snow Fairy Wings','❄️',49,'#c5e7ff',6],
 ['rainbowwings','Rainbow Dream Wings','🌈',76,'#ffb4d5',9],
 ['starlightwings','Starlight Queen Wings','🌟',105,'#d4acff',12]
];
const petTypes=[
 ['lavender','Lilac Kitten','#d9affd','💜',12,1],
 ['ocean','Bluebell Kitten','#8dd3ff','💙',12,1],
 ['ginger','Gingerbread Kitten','#ffc47a','🧡',12,1],
 ['mint','Minty Kitten','#9ce8b8','💚',12,1],
 ['starlight','Rainbow Star Kitten','#e6a8f9','🌈',18,6]
];
const toyItems=[
 ['startoy','Starry Toy Box','🎁',18,'#ffe69a',1],
 ['parrot','Pirate Parrot','🦜',35,'#8fdfbb',2]
];
const allMagic=[...magicDresses.map(x=>({type:'dress',data:x})),...magicWands.map(x=>({type:'wand',data:x})),...magicHats.map(x=>({type:'hat',data:x})),...magicHair.map(x=>({type:'hair',data:x})),...magicWings.map(x=>({type:'wings',data:x})),...toyItems.map(x=>({type:'toy',data:x}))];
const gems=[
 ['ruby','Ruby','❤️','Red sparkle'],['sapphire','Sapphire','💙','Ocean gem'],['emerald','Emerald','💚','Forest gem'],['amethyst','Amethyst','💜','Purple power'],['topaz','Golden Topaz','💛','Sunny shine'],['rose','Rose Quartz','🩷','Heart gem'],
 ['diamond','Diamond','💎','Shiny crystal'],['moon','Moonstone','🌙','Moon magic'],['rainbow','Rainbow','🌈','Colour splash'],['star','Starlight','🌟','Twinkle star'],['snow','Snow Crystal','❄️','Winter wish'],['pumpkin','Pumpkin Gem','🎃','Spooky fun'],
 ['holly','Holly Gem','🎄','Festive joy'],['butterfly','Butterfly','🦋','Spring wings'],['ocean','Ocean Pearl','🫧','Bubbly'],['unicorn','Unicorn Gem','🦄','Wish magic'],['sun','Sunstone','☀️','Summer days'],['royal','Royal Heart','👑','Princess shine']
];
const rooms=[
 ['dance','Dance Room','🪩','A sparkly room full of disco fun.','dance','music'],
 ['bedroom','Dream Bedroom','🛏️','Cosy pillows, silly dares and bedtime games.','memory','gifts'],
 ['garden','Magic Garden','🌷','Grow flowers and pick pretty colours.','garden','colours'],
 ['kitchen','Treat Kitchen','🧁','Feed Mimi and catch tasty treats.','feed','cookies'],
 ['gem','Gem Cave','💎','Hidden treasure and shiny special gems.','hunt','stars'],
 ['art','Art Studio','🎨','Painty colours and creative play.','colours','bubbles']
];
const games=[['stars','Star Pop','⭐','Tap the stars!','#ffe0ae','dance'],['gifts','Mystery Gifts','🎁','Pick a present!','#fcd4df','bedroom'],['feed','Feed Mimi','🍓','Funny snacks!','#d1f7c7','kitchen'],['dance','Dance Party','🪩','Kitty disco!','#e0d5ff','dance'],['garden','Magic Garden','🌷','Grow flowers!','#d8f7f0','garden'],['colours','Colour Magic','🎨','Match colours!','#ffe1e6','art'],['dare','Silly Dares','🎲','Make Mimi giggle!','#f1ddff','bedroom'],['hunt','Gem Hunt','💎','Find treasure!','#d7e8ff','gem'],['bubbles','Bubble Pop','🫧','Pop the floating bubbles!','#dff7ff','art'],['memory','Memory Match','🧠','Match the cute cards!','#f4e6ff','bedroom'],['music','Music Mixer','🎵','Make a fun tune!','#fff0c9','dance'],['cookies','Cookie Catch','🍪','Catch sweet treats!','#ffe4d1','kitchen']]
const defaults={fur:'lavender',outfit:'daisy',hair:'none',hairColour:'chocolate',hat:'bow',wand:'none',voice:'squeaky',speed:1,total:0,album:[],actions:0,unlocked:[],discoverySteps:0,xp:0,room:'dance',wings:'none',toy:'none',friend:'none',eggsHatched:[],incubating:null,activeKitten:'none',completedChallenges:0};
let save={...defaults};try{const old=JSON.parse(safeGet(stateKey)||safeGet('mimi-playhouse-v4')||'null');if(old&&typeof old==='object')save={...defaults,...old};}catch{}
if(!Array.isArray(save.album))save.album=[];
if(!Array.isArray(save.unlocked))save.unlocked=[];
save.album=[...new Set(save.album.filter(id=>gems.some(g=>g[0]===id)))];
save.unlocked=[...new Set(save.unlocked.filter(id=>allMagic.some(m=>m.data[0]===id)))];
save.total=Math.max(0,Math.floor(Number(save.total)||0));
save.actions=Math.max(0,Math.floor(Number(save.actions)||0));
save.discoverySteps=Math.max(0,Math.floor(Number(save.discoverySteps)||0));
save.xp=Math.max(0,Math.floor(Number(save.xp)||0));
if(!Array.isArray(save.eggsHatched))save.eggsHatched=[];
save.eggsHatched=[...new Set(save.eggsHatched.filter(id=>petTypes.some(t=>t[0]===id)))];
if(!save.incubating||typeof save.incubating!=='object'||!petTypes.some(t=>t[0]===save.incubating.id)||save.eggsHatched.includes(save.incubating.id))save.incubating=null;
if(save.incubating)save.incubating.progress=Math.max(0,Math.floor(Number(save.incubating.progress)||0));
save.activeKitten=save.eggsHatched.includes(save.activeKitten)?save.activeKitten:'none';
save.completedChallenges=Math.max(0,Math.floor(Number(save.completedChallenges)||0));
if(!toyItems.some(t=>t[0]===save.toy&&save.unlocked.includes(t[0])))save.toy='none';
if(!toyItems.some(t=>t[0]===save.friend&&save.unlocked.includes(t[0])))save.friend='none';
save.speed=Math.max(.5,Math.min(1.75,Number(save.speed)||1));
if(save.wand!=='none'&&!save.unlocked.includes(save.wand))save.wand='none';
if(!rooms.some(r=>r[0]===save.room))save.room='dance';
function store(){safeSet(stateKey,JSON.stringify(save));}
const choice=(items,key,def)=>items.some(it=>it[0]===key)?key:def;
save.voice=choice(voices,save.voice,'squeaky');save.fur=choice(furs,save.fur,'lavender');save.hair=(magicHair.some(i=>i[0]===save.hair)&&save.unlocked.includes(save.hair))?save.hair:choice(hairstyle,save.hair,'none');save.hat=(magicHats.some(i=>i[0]===save.hat)&&save.unlocked.includes(save.hat))?save.hat:choice(hats,save.hat,'none');save.wings=(magicWings.some(i=>i[0]===save.wings)&&save.unlocked.includes(save.wings))?save.wings:'none';save.hairColour=choice(hairColours,save.hairColour,'chocolate');
if(!Object.values(outfits).flat().some(o=>o[0]===save.outfit) && !(magicDresses.some(o=>o[0]===save.outfit)&&save.unlocked.includes(save.outfit)))save.outfit='daisy';
let page='home', dressTab='outfit', season='Everyday', shopTab='dress', activity='', activeTimer=0, toastTimer=0, faceTimer=0, dancingTimer=0, muted=false;
const wrap=$('cat-wrap'), speech=$('bubble'), hint=$('hint');
const recBtn=$('record'), recLabel=$('record-label'), recDetail=$('record-detail'), replay=$('replay');
function message(txt,detail='Tap the mic to talk with Mimi!'){speech.textContent=txt;hint.textContent=detail;}
function toast(txt){const el=$('toast');el.textContent=txt;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.hidden=true,2350);}
function confetti(num=14){const colours=['#ff8dba','#ffcc4e','#9d7eef','#7bdfbd','#fff','#79cdea'];for(let i=0;i<num;i++){const c=document.createElement('i');c.className='confetti';c.style.background=colours[i%colours.length];c.style.left=(20+Math.random()*60)+'%';c.style.top=(25+Math.random()*55)+'%';c.style.setProperty('--dx',(Math.random()*420-210)+'px');c.style.setProperty('--dy',(Math.random()*320-220)+'px');c.style.setProperty('--spin',(Math.random()*850)+'deg');wrap.append(c);setTimeout(()=>c.remove(),1350);}}
function face(kind=''){wrap.classList.remove('is-giggling','is-meme','is-listening','is-talking','is-dancing');if(kind)wrap.classList.add('is-'+kind);}
function happy(txt='Yay! 🎉'){clearTimeout(faceTimer);message(txt);face('giggling');confetti(12);faceTimer=setTimeout(()=>face(),1100);}
function levelInfo(){const level=Math.max(1,Math.floor(save.xp/20)+1);const prev=(level-1)*20;const next=level*20;const current=save.xp-prev;const need=Math.max(1,next-prev);return {level,current,need,pct:Math.max(0,Math.min(100,current/need*100)),nextLevel:level+1};}
function currentRoom(){return rooms.find(r=>r[0]===save.room)||rooms[0];}
function roomClass(){return 'room-'+currentRoom()[0];}
function updateGemUI(){
 const info=levelInfo(), room=currentRoom();
 $('gem-count').textContent=save.total;if($('nursery-gems'))$('nursery-gems').textContent=save.total;
 $('gem-total').textContent=save.total;
 $('shop-balance').textContent=save.total;
 $('gem-found').textContent=`${save.album.length} / ${gems.length}`;
 $('album-caption').textContent=`${gems.length-save.album.length} left to discover`;
 if($('level-count'))$('level-count').textContent=info.level;
 if($('level-title'))$('level-title').textContent=`Level ${info.level}`;
 if($('level-copy'))$('level-copy').textContent=`Play games with Mimi to unlock more shop items. ${Math.max(0,20-info.current)} XP to go!`;
 if($('xp-copy'))$('xp-copy').textContent=`${info.current} / ${info.need} XP to level ${info.nextLevel}`;
 if($('xp-bar-fill'))$('xp-bar-fill').style.width=info.pct+'%';
 if($('shop-level'))$('shop-level').textContent=`Level ${info.level}`;
 if($('current-room-name'))$('current-room-name').textContent=`${room[2]} ${room[1]}`;
 if($('current-room-copy'))$('current-room-copy').textContent=room[3];
 if($('room-location'))$('room-location').textContent=`${room[2]} ${room[1]}`;
 const background=$('room-background-image'); if(background){ const target=`rooms/${room[0]}.svg`; if(background.getAttribute('src')!==target) background.setAttribute('src',target); }
 const stage=$('stage'); if(stage){stage.classList.remove('room-dance','room-bedroom','room-garden','room-kitchen','room-gem','room-art');stage.classList.add(roomClass());}
 const countdown=save.discoverySteps===0?1:(save.discoverySteps%2===0?1:2);
 $('discovery-next').textContent=save.album.length===gems.length?'🏆 You found all 18 special gems!':countdown===1?'🌟 One more game reward to find a special gem!':'✨ Two more game rewards to find a special gem!';
 $('discovery-bar-fill').style.width=(countdown===1?50:0)+'%';
 $('gem-album').innerHTML=gems.map(([key,name,emoji,note])=>{const owned=save.album.includes(key);return `<button type="button" class="gem-entry ${owned?'gem-owned':''}" data-gem-info="${key}" aria-label="${name}, ${owned?'collected':'not yet found'}"><span class="gem-art ${owned?'':'locked'}">${owned?emoji:'💎'}</span><b>${name}</b><small>${owned?'✅ Collected!':'🔒 Find in games'}</small></button>`}).join('');
}
function reward(points=1,xpGain=points){
 save.total+=points;save.actions++;save.discoverySteps++;save.xp+=xpGain;
 let found='';
 if(save.album.length<gems.length && save.discoverySteps%2===1){
   const left=gems.filter(g=>!save.album.includes(g[0]));
   const pick=left[(save.album.length*7+3)%left.length];
   found=pick[0];save.album.push(found);
 }
 store();updateGemUI();renderShop();renderRooms();renderNursery();
 toast(found?`💎 +${points} gems! ✨ NEW special gem: ${gems.find(g=>g[0]===found)[1]}!`:`💎 +${points} gems! +${xpGain} XP!`);
}

function outfitSVG(info){if(!info)return '';
 const special=magicDresses.find(d=>d[0]===info[0]);if(special){
  const [id,,icon,price,colour,accent,theme]=special;
  const base=`<path class="magic-outline" d="M167 268 Q205 245 249 269 L286 353 Q210 404 133 353 Z" fill="${colour}" stroke="${accent}" stroke-width="6"/><path d="M173 282 Q204 302 242 282" stroke="${accent}" stroke-width="8" fill="none"/><path d="M142 343 Q208 373 279 343" stroke="${accent}" stroke-width="7" opacity=".85" fill="none"/>`;
  let decorations='';
  if(theme==='lights'){
    decorations=`<path d="M146 320 Q165 305 183 325 T225 326 T270 322" stroke="#1a7744" stroke-width="4" fill="none"/>`+
      Array.from({length:10},(_,i)=>{const x=151+i*13, y=318+Math.sin(i*.8)*9;return `<circle class="light-bulb" style="animation-delay:${(i%5)*.24}s" cx="${x}" cy="${y}" r="6" fill="${['#ffe953','#ff7ab4','#8df9f4','#fff','#ffae61'][i%5]}"/>`}).join('');
  }else if(theme==='snow'){
    decorations=Array.from({length:10},(_,i)=>`<text class="light-bulb" style="animation-delay:${i*.16}s" x="${153+i%5*27}" y="${304+Math.floor(i/5)*32}" font-size="19">❄</text>`).join('');
  }else if(theme==='pumpkin'){
    decorations=`<text x="207" y="338" font-size="46" text-anchor="middle">🎃</text>`;
  }else if(theme==='rainbow'){
    decorations=`<path d="M158 322 Q208 270 259 322" stroke="#f9e67e" stroke-width="9" fill="none"/><path d="M161 331 Q208 282 257 331" stroke="#73d8f1" stroke-width="7" fill="none"/>`;
  }else{
    decorations=Array.from({length:10},(_,i)=>`<text class="light-bulb" style="animation-delay:${i*.19}s" x="${151+i%5*28}" y="${303+Math.floor(i/5)*35}" font-size="17">✦</text>`).join('');
  }
  return `<g class="magical-dress" style="--magic-colour:${accent}">${base}${decorations}<text x="207" y="369" font-size="25" text-anchor="middle">${icon}</text></g>`;
 }
const [id,,emoji,colour,decoration]=info;
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
function fairyMotionStyle(col){return `--aura:${col};animation-delay:-${(Math.random()*11).toFixed(1)}s;animation-duration:${(10+Math.random()*6).toFixed(1)}s`;}
function hatSVG(id){
 const magic=magicHats.find(a=>a[0]===id);
 if(magic){const [key,label,emoji,price,glow]=magic;
 if(key==='piratehat') return `<g class="enchanted-hat fairy-fade" style="${fairyMotionStyle(glow)}"><path d="M125 95 Q156 32 210 53 Q265 30 297 95 Q258 123 207 106 Q155 124 125 95 Z" fill="#303452" stroke="#f8d99a" stroke-width="6"/><path d="M139 98 Q173 83 207 95 Q251 84 282 98" fill="none" stroke="#fff" stroke-width="5"/><text x="209" y="96" font-size="38" text-anchor="middle">☠️</text></g>`;
 if(key==='beanie') return `<g class="enchanted-hat fairy-fade" style="${fairyMotionStyle(glow)}"><circle cx="207" cy="33" r="16" fill="#f7d7ff" stroke="#fff" stroke-width="4"/><path d="M143 100 Q144 36 208 38 Q269 39 271 100 Z" fill="#bd8df3" stroke="#fff" stroke-width="5"/><path d="M148 67 Q209 82 268 67" fill="none" stroke="#ff99bc" stroke-width="10"/><rect x="134" y="87" width="144" height="26" rx="13" fill="#ffb0d9" stroke="#fff" stroke-width="5"/></g>`;
 return `<g class="enchanted-hat fairy-fade" style="${fairyMotionStyle(glow)}"><ellipse cx="207" cy="58" rx="53" ry="23" fill="${glow}" opacity=".35"/><text x="207" y="77" text-anchor="middle" font-size="74">${emoji}</text><path d="M168 91 Q207 58 247 91" stroke="${glow}" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="156" cy="78" r="7" fill="#fff"/><circle cx="256" cy="74" r="6" fill="#fff"/></g>`;
 }
 const obj=hats.find(a=>a[0]===id);if(!obj || id==='none')return '';
 const top=['witchhat','santahat','elfhat','crown','party','flower','star','bow','reindeerhat'].includes(id);
 const x=top?207:207,y=top?65:163,scale=top?'1':'0.95';
 if(id==='sunglasses'||id==='heart')return `<text x="207" y="186" text-anchor="middle" font-size="86">${obj[2]}</text>`;
 return `<text x="${x}" y="${y}" text-anchor="middle" font-size="75" transform="translate(0 0) scale(${scale})">${obj[2]}</text>`;
}
function wandSVG(id){
 const wand=magicWands.find(x=>x[0]===id);if(!wand)return '';
 const [,,icon,,glow]=wand;
 return `<g class="magic-wand" style="--wand-glow:${glow}"><path d="M306 329 L351 212" stroke="#8662af" stroke-width="11" stroke-linecap="round"/><path d="M306 329 L351 212" stroke="#fff3dd" stroke-width="5" stroke-linecap="round"/><circle cx="351" cy="210" r="29" fill="${glow}" opacity=".25" class="wand-aura"/><text x="351" y="229" font-size="46" text-anchor="middle" class="wand-star">${icon}</text><text x="325" y="195" font-size="20" class="light-bulb">✧</text><text x="378" y="192" font-size="18" class="light-bulb">✧</text></g>`;
}
function wingSVG(id){const item=magicWings.find(x=>x[0]===id);if(!item)return '';
 const col=item[4];
 return `<g class="fairy-wings fairy-fade" style="${fairyMotionStyle(col)}"><path d="M155 247 C52 140 45 303 147 317 C65 327 93 393 177 336 Z" fill="${col}" stroke="#fff" stroke-width="5" opacity=".83"/><path d="M259 247 C365 140 383 299 273 317 C360 332 337 395 244 336 Z" fill="${col}" stroke="#fff" stroke-width="5" opacity=".83"/><path d="M157 268 Q90 249 128 301 M260 270 Q326 244 291 303" fill="none" stroke="#fff9" stroke-width="6"/><circle cx="113" cy="247" r="9" fill="#fff"/><circle cx="304" cy="253" r="9" fill="#fff"/></g>`;
}
function enchantedHairSVG(id){const item=magicHair.find(x=>x[0]===id);if(!item)return '';
 const forms={fairylocks:'long',rainbowcurls:'curly',mermaidwaves:'long',blossombuns:'buns',aurorahair:'ponytail',stardustbraids:'braids'};
 return `<g class="enchanted-hair fairy-fade" style="${fairyMotionStyle(item[4])}">${hairSVG(forms[id]||'long',item[4])}</g>`;
}
function applyLook(){const f=furs.find(a=>a[0]===save.fur)||furs[0];document.documentElement.style.setProperty('--cat-fur',f[2]);document.documentElement.style.setProperty('--cat-fur-dark',f[3]);
 const o=[...Object.values(outfits).flat(),...magicDresses].find(a=>a[0]===save.outfit),c=(hairColours.find(a=>a[0]===save.hairColour)||hairColours[0])[2];
 all('svg.cat').forEach(svg=>{svg.querySelector('.dress-layer').innerHTML=outfitSVG(o);
  // SVG layer is created inside each cat; no duplicate IDs are introduced.
  let wingsLayer=svg.querySelector('.wings-layer');if(!wingsLayer){wingsLayer=document.createElementNS('http://www.w3.org/2000/svg','g');wingsLayer.setAttribute('class','wings-layer');svg.querySelector('.dress-layer').before(wingsLayer);}
  wingsLayer.innerHTML=wingSVG(save.wings);
  svg.querySelector('.hair-layer').innerHTML=magicHair.some(i=>i[0]===save.hair)?enchantedHairSVG(save.hair):hairSVG(save.hair,c);
  svg.querySelector('.hat-layer').innerHTML=hatSVG(save.hat);
  svg.querySelector('.wand-layer').innerHTML=wandSVG(save.wand)});
 renderCompanions();
 $('wearing').textContent=`${o?o[1]:'Fluffy Mimi'} • ${([...hairstyle,...magicHair].find(a=>a[0]===save.hair)||hairstyle[0])[1]}${save.wand!=='none'?' • Magic wand!':''}`;
}
function selectLook(key,value){if(['outfit','wand','hat','hair','wings'].includes(key) && allMagic.some(m=>m.data[0]===value) && !save.unlocked.includes(value)){toast('🔒 Unlock this in the Magic Shop!');showPage('shop');return;}save[key]=value;store();applyLook();renderWardrobe();chirp([720,970],.09);toast('✨ Mimi looks fabulous!');}
function renderWardrobe(){all('[data-dress-tab]').forEach(b=>{b.classList.toggle('selected',b.dataset.dressTab===dressTab);b.setAttribute('aria-selected',String(b.dataset.dressTab===dressTab));});let html='';
 if(dressTab==='outfit'){
  html='<p>Pick the perfect costume — mix it with any hair or hat!</p><div class="season-tabs">'+Object.keys(outfits).map(s=>`<button type="button" class="${season===s?'selected':''}" data-season="${s}">${({Everyday:'🌈',Halloween:'🎃',Christmas:'🎄',Seasons:'☀️'})[s]} ${s}</button>`).join('')+'</div><h3 class="subhead">'+season+' outfits</h3><div class="wardrobe-grid">'+outfits[season].map(([id,label,emoji])=>`<button type="button" class="wardrobe-item" data-outfit="${id}" aria-pressed="${save.outfit===id}"><span>${emoji}</span><b>${label}</b></button>`).join('')+'</div>';
 }else if(dressTab==='magic'){
 html='<p>✨ These glowing dresses can only be unlocked using gems from the Magic Shop!</p><div class="wardrobe-grid">'+magicDresses.map(([id,label,emoji,price,col,accent,theme,req])=>{const owned=save.unlocked.includes(id);return `<button type="button" class="wardrobe-item ${owned?'magical-tile':'locked-wardrobe'}" data-magic-dress="${id}" aria-pressed="${save.outfit===id}"><span>${emoji}</span><b>${label}</b><small>${owned?'✨ Wear it':'🔒 '+price+' 💎 · Lv '+req}</small></button>`}).join('')+'</div><button type="button" class="shop-shortcut" data-jump-shop="true">🪄 Visit Magic Shop ➜</button>';
 }else if(dressTab==='wand'){
 html='<p>🪄 Wands sparkle in Mimi’s paw. Earn gems to unlock new ones!</p><div class="wardrobe-grid"><button type="button" class="wardrobe-item" data-wand="none" aria-pressed="'+(save.wand==='none')+'"><span>🐾</span><b>No wand</b></button>'+magicWands.map(([id,label,emoji,price,glow,req])=>{const owned=save.unlocked.includes(id);return `<button type="button" class="wardrobe-item ${owned?'magical-tile':'locked-wardrobe'}" data-magic-wand="${id}" aria-pressed="${save.wand===id}"><span>${emoji}</span><b>${label}</b><small>${owned?'✨ Hold it':'🔒 '+price+' 💎 · Lv '+req}</small></button>`}).join('')+'</div><button type="button" class="shop-shortcut" data-jump-shop="true">🪄 Visit Magic Shop ➜</button>';
 }else if(dressTab==='hair'){
  html='<p>Try a hairstyle and choose its colour.</p><h3 class="subhead">Hairstyles</h3><div class="wardrobe-grid">'+hairstyle.map(([id,label,emoji])=>`<button type="button" class="wardrobe-item" data-hair="${id}" aria-pressed="${save.hair===id}"><span>${emoji}</span><b>${label}</b></button>`).join('')+'</div><h3 class="subhead">✨ Magical hairstyles</h3><div class="wardrobe-grid">'+magicHair.map(([id,label,emoji,price,col,level])=>`<button type="button" class="wardrobe-item ${save.unlocked.includes(id)?'magical-tile':'locked-wardrobe'}" data-magic-hair="${id}" aria-pressed="${save.hair===id}"><span class="magic-item-icon">${emoji}</span><b>${label}</b><small>${save.unlocked.includes(id)?'✨ Style it!':'🔒 '+price+' 💎 · Lv '+level}</small></button>`).join('')+'</div><h3 class="subhead">Hair colours</h3><div class="wardrobe-grid">'+hairColours.map(([id,label,colour])=>`<button type="button" class="wardrobe-item colour-choice" data-hair-colour="${id}" aria-pressed="${save.hairColour===id}"><span class="colour-dot" style="background:${colour}"></span><b>${label}</b></button>`).join('')+'</div>';
 }else if(dressTab==='hat'){
  html='<p>Top it off with something sparkly!</p><div class="wardrobe-grid">'+hats.map(([id,label,emoji])=>`<button type="button" class="wardrobe-item" data-hat="${id}" aria-pressed="${save.hat===id}"><span>${emoji}</span><b>${label}</b></button>`).join('')+'</div><h3 class="subhead">✨ Magical hats</h3><div class="wardrobe-grid">'+magicHats.map(([id,label,emoji,price,col,level])=>`<button type="button" class="wardrobe-item ${save.unlocked.includes(id)?'magical-tile':'locked-wardrobe'}" data-magic-hat="${id}" aria-pressed="${save.hat===id}"><span class="magic-item-icon">${emoji}</span><b>${label}</b><small>${save.unlocked.includes(id)?'✨ Wear it!':'🔒 '+price+' 💎 · Lv '+level}</small></button>`).join('')+'</div>';
 }else if(dressTab==='wings'){
  html='<p>🦋 Sparkly fairy wings glow and gently change colours. Unlock with pretend gems!</p><div class="wardrobe-grid"><button type="button" class="wardrobe-item" data-wings="none" aria-pressed="'+(save.wings==='none')+'"><span>🐱</span><b>No wings</b></button>'+magicWings.map(([id,label,emoji,price,col,level])=>`<button type="button" class="wardrobe-item ${save.unlocked.includes(id)?'magical-tile':'locked-wardrobe'}" data-magic-wings="${id}" aria-pressed="${save.wings===id}"><span class="magic-item-icon">${emoji}</span><b>${label}</b><small>${save.unlocked.includes(id)?'🦋 Wear wings':'🔒 '+price+' 💎 · Lv '+level}</small></button>`).join('')+'</div>';
 }else {
  html='<p>Mimi can be any colour you like!</p><div class="wardrobe-grid">'+furs.map(([id,label,colour])=>`<button type="button" class="wardrobe-item colour-choice" data-fur="${id}" aria-pressed="${save.fur===id}"><span class="colour-dot" style="background:${colour}"></span><b>${label}</b></button>`).join('')+'</div>';
 }
 $('wardrobe-content').innerHTML=html;
}
function shopCollection(){return {dress:magicDresses,wand:magicWands,hat:magicHats,hair:magicHair,wings:magicWings,toy:toyItems}[shopTab]||magicDresses;}
function magicLevel(item){return item.data[item.data.length-1];}
function renderShop(){
 const selected=shopCollection(), info=levelInfo();
 all('[data-shop-tab]').forEach(b=>{const yes=b.dataset.shopTab===shopTab;b.classList.toggle('selected',yes);b.setAttribute('aria-pressed',String(yes));});
 $('shop-balance').textContent=save.total;
 $('shop-progress').textContent=`${selected.filter(item=>save.unlocked.includes(item[0])).length} of ${selected.length} unlocked`;
 if($('shop-level'))$('shop-level').textContent=`Level ${info.level}`;
 $('shop-items').innerHTML=selected.map(item=>{
  const [id,name,icon,price,colour]=item, req=item[item.length-1], theme=shopTab==='dress'?item[6]:'';
  const accent=shopTab==='dress'?item[5]:colour;
  const target={dress:'outfit',wand:'wand',hat:'hat',hair:'hair',wings:'wings'}[shopTab]||(id==='parrot'?'friend':'toy');
  const bought=save.unlocked.includes(id),equipped=save[target]===id,afford=save.total>=price,levelOk=info.level>=req;
  const label=equipped?'✓ Equipped':bought?'✨ Wear it!':!levelOk?`⭐ Level ${req} needed`:afford?`💎 ${price} · Unlock`:`🔒 ${price} 💎`;
  const descriptions={dress:'Glowing magical dress',wand:'Sparkling magic wand',hat:'Glowing colour-changing hat',hair:'Slow-fade rainbow hairstyle',wings:'Shimmering fairy wings',toy:'Magical playroom accessory'};
  return `<article class="shop-card ${bought?'owned':''}"><div class="shop-art ${theme==='lights'?'xmas-lights':''}" style="--item-tint:${colour};--item-glow:${accent}"><span class="shop-emoji ${['hair','hat','wings'].includes(shopTab)?'fairy-fade':''}" style="--aura:${colour}">${icon}</span><span class="shop-spark s1">✦</span><span class="shop-spark s2">✨</span><span class="shop-spark s3">✦</span>${theme==='lights'?'<span class="mini-light">🔴🟢🟡🔵</span>':''}</div><h3>${name}</h3><p>✨ ${descriptions[shopTab]}<span class="req">Requires level ${req}</span></p><button type="button" data-shop-buy="${id}" ${equipped?'disabled':''} class="shop-buy ${bought?'equip':''}">${label}</button></article>`;
 }).join('');
}
function buyOrEquip(id){
 const item=allMagic.find(m=>m.data[0]===id);if(!item)return;
 const [key,name,icon,price]=item.data, req=magicLevel(item);
 if(!save.unlocked.includes(key)){
  if(levelInfo().level<req){toast(`⭐ Reach level ${req} to unlock ${name}!`);chirp([390,330]);return;}
  if(save.total<price){toast(`💎 You need ${price-save.total} more gems! Play games to earn them.`);chirp([350,285]);return;}
  save.total-=price;save.unlocked.push(key);confetti(32);chirp([523,659,784,1046],.14);toast(`🎉 ${name} unlocked!`);
 }else{toast(`✨ Mimi is wearing ${name}!`);}
 const target={dress:'outfit',wand:'wand',hat:'hat',hair:'hair',wings:'wings'}[item.type]||(key==='parrot'?'friend':'toy');
 save[target]=key;
 store();applyLook();updateGemUI();renderWardrobe();renderShop();renderNursery();
}
function renderSpeed(){
 const value=Number(save.speed).toFixed(2)+'×';
 all('[data-speed-readout]').forEach(el=>el.textContent=value);
 all('[data-speed-slider]').forEach(el=>el.value=save.speed);
 all('[data-speed-preset]').forEach(el=>{const selected=Math.abs(Number(el.dataset.speedPreset)-save.speed)<.001;el.classList.toggle('selected',selected);el.setAttribute('aria-pressed',String(selected));});
}
function setSpeed(value){save.speed=Math.max(.5,Math.min(1.75,Number(value)||1));store();renderSpeed();if(lastBuffer||lastBlob)replay.hidden=false;}
function renderVoice(){ $('voice-grid').innerHTML=voices.map(([id,label,emoji,note])=>`<button type="button" class="voice-card" data-voice="${id}" aria-pressed="${save.voice===id}"><span>${emoji}</span><b>${label}</b><small>${note}</small></button>`).join('');
 $('quick-voice').innerHTML=voices.filter(v=>['squeaky','alien','giant','robot','baby','dinosaur'].includes(v[0])).map(([id,label,emoji])=>`<button type="button" class="quick-chip ${save.voice===id?'selected':''}" data-voice="${id}" aria-pressed="${save.voice===id}">${emoji} ${label}</button>`).join('');
}
function setVoice(id){save.voice=choice(voices,id,'squeaky');store();renderVoice();chirp([550,840]);const v=voices.find(x=>x[0]===save.voice);toast(`${v[2]} ${v[1]} voice selected!`);if(lastBuffer||lastBlob){replay.hidden=false;$('voice-replay').hidden=false;}}

function littleKittenSVG(colour='#d9affd',sparkle=false){return `<svg class="little-kitten-svg" viewBox="0 0 124 125" aria-hidden="true"><path d="M24 59 18 16 51 33 Q62 28 74 33 L109 16 100 62" fill="${colour}" stroke="#fff" stroke-width="4"/><ellipse cx="62" cy="74" rx="49" ry="43" fill="${colour}" stroke="#fff" stroke-width="4"/><ellipse cx="44" cy="67" rx="6" ry="9" fill="#392e53"/><ellipse cx="80" cy="67" rx="6" ry="9" fill="#392e53"/><circle cx="42" cy="63" r="2.2" fill="#fff"/><circle cx="78" cy="63" r="2.2" fill="#fff"/><path d="M56 84 Q62 78 68 84 L62 88Z" fill="#a34d89"/><path d="M62 88 Q54 98 46 91 M62 88 Q70 98 78 91" stroke="#744b70" fill="none" stroke-width="3" stroke-linecap="round"/><ellipse cx="27" cy="82" rx="8" ry="5" fill="#ff9abf" opacity=".75"/><ellipse cx="97" cy="82" rx="8" ry="5" fill="#ff9abf" opacity=".75"/>${sparkle?'<text x="7" y="25" font-size="23">✨</text><text x="88" y="115" font-size="23">🌟</text>':''}</svg>`;}
function renderCompanions(){
 const box=$('stage-companions');if(!box)return;
 const kitten=petTypes.find(p=>p[0]===save.activeKitten);
 box.innerHTML=`${kitten?`<span class="side-kitten" title="${kitten[1]}">${littleKittenSVG(kitten[2],kitten[0]==='starlight')}</span>`:''}${save.friend==='parrot'?'<span class="perch-parrot" title="Pirate Parrot">🦜</span>':''}${save.toy==='startoy'?'<button type="button" id="home-toy-box" class="home-toy-box" aria-label="Play with the starry toy box">🎁⭐</button>':''}`;
 const toy=$('home-toy-box');if(toy)toy.onclick=e=>{e.stopPropagation();chirp([520,830,660],.1);confetti(14);message('✨ Stars from the toy box!','Your toy box is full of fun!')};
}
function renderNursery(){
 const eggBox=$('egg-shop'), hatchBox=$('incubation-area'),collection=$('kitten-collection');
 if(!eggBox)return;
 const current=save.incubating, info=levelInfo();
 eggBox.innerHTML=petTypes.map(([id,label,colour,emoji,need,minLevel])=>{
 const have=save.eggsHatched.includes(id),busy=!!current,locked=info.level<minLevel;
 const canBuy=!have&&!busy&&!locked&&save.total>=50;
 const text=have?'✅ Hatched':current?.id===id?'🥚 Hatching now':busy?'🥚 Finish your current egg':locked?`⭐ Unlock at level ${minLevel}`:save.total<50?'💎 Need 50 gems':'💎 Buy egg · 50';
 return `<article class="egg-card ${have?'is-hatched':''}"><div class="egg-illustration" style="--egg-colour:${colour}"><span class="egg-shell ${id==='starlight'?'sparkly-egg':''}">${id==='starlight'?'✨':'★'}</span></div><h3>${label}</h3><p>${id==='starlight'?'Rare sparkly kitten · 18 wins':'Colourful kitten · 12 wins'}</p><button type="button" data-buy-egg="${id}" ${!canBuy?'disabled':''}>${text}</button></article>`;
 }).join('');
 if(!current){hatchBox.innerHTML='<div class="empty-nursery">🥚 Choose a 50-gem egg above. Finish games to help it hatch!</div>'}
 else{const pet=petTypes.find(t=>t[0]===current.id);const need=pet[4],pct=Math.min(100,current.progress/need*100);hatchBox.innerHTML=`<div class="egg-progress-card"><div class="big-egg" style="--egg-colour:${pet[2]}">🥚</div><div><b>${pet[1]} is growing!</b><p>${current.progress} of ${need} completed games. Only finished challenges count — not repeated button taps.</p><div class="hatch-track" role="progressbar" aria-label="Egg hatching progress" aria-valuenow="${current.progress}" aria-valuemin="0" aria-valuemax="${need}"><span style="width:${pct}%"></span></div><button type="button" class="small-outline" data-goto-nursery-games="true">🎮 Play a game to help it hatch</button></div></div>`;}
 collection.innerHTML=petTypes.map(([id,label,colour,emoji,need])=>{const found=save.eggsHatched.includes(id),active=save.activeKitten===id;return `<button type="button" class="kitten-card ${found?'owned':''} ${active?'selected':''}" data-pick-kitten="${id}" ${!found?'disabled':''}>${found?littleKittenSVG(colour,id==='starlight'):'<span class="kitten-mystery">❔</span>'}<b>${label}</b><small>${active?'💖 Following Mimi':found?'🐾 Tap to follow':'🔒 In an egg'}</small></button>`}).join('');
 const extras=$('nursery-extras');if(extras)extras.innerHTML=`<div class="nursery-feature">🎁 <b>Star Toy Box</b> — ${save.unlocked.includes('startoy')?'Unlocked! Tap it on Home to play.':'18 gems in the Magic Shop'}</div><div class="nursery-feature">🦜 <b>Pirate Parrot</b> — ${save.unlocked.includes('parrot')?'Your parrot can perch by Mimi.':'35 gems in the Magic Shop'}</div>`;
}
function buyEgg(id){const pet=petTypes.find(t=>t[0]===id);if(!pet)return;
 if(save.incubating){toast('🥚 Hatch your current egg first!');return;}
 if(save.eggsHatched.includes(id)){toast('💖 You already have this kitten!');return;}
 if(levelInfo().level<pet[5]){toast(`⭐ Level ${pet[5]} needed for this egg.`);return;}
 if(save.total<50){toast(`💎 You need ${50-save.total} more gems.`);return;}
 save.total-=50;save.incubating={id,progress:0};store();updateGemUI();renderShop();renderNursery();confetti(20);chirp([550,770,950],.1);toast(`🥚 ${pet[1]} egg bought! Complete ${pet[4]} games to hatch it.`);
}
function completeQualifiedChallenge(gameId){
 // Only real end-of-round results call this function, never raw taps or generic gem rewards.
 save.completedChallenges++;
 if(save.incubating){const pet=petTypes.find(t=>t[0]===save.incubating.id);save.incubating.progress++;
  if(save.incubating.progress>=pet[4]){save.eggsHatched.push(pet[0]);save.activeKitten=pet[0];save.incubating=null;confetti(55);chirp([500,660,800,990,1200],.13);toast(`🎉 ${pet[1]} hatched! Your new kitten follows Mimi!`);}else{toast(`🥚 Hatch progress ${save.incubating.progress}/${pet[4]} · Great game!`);}}
 store();updateGemUI();renderNursery();renderCompanions();
}

function showPage(id){if(!['home','nursery','rooms','wardrobe','play','voices','gems','shop'].includes(id))return;
 if(page==='home' && id!=='home' && (recState==='recording'||recState==='requesting'||recState==='processing'))cancelRecording();
 if(page==='home' && id!=='home' && recState==='playing')stopPlayback();
 page=id;if(id==='shop')renderShop();if(id==='voices')$('voice-replay').hidden=!(lastBuffer||lastBlob);if(id==='rooms')renderRooms();if(id==='nursery')renderNursery();all('.page').forEach(p=>{const yes=p.id===`page-${id}`;p.hidden=!yes;p.classList.toggle('active',yes)});all('[data-page]').forEach(b=>{b.classList.toggle('selected',b.dataset.page===id);b.setAttribute('aria-selected',String(b.dataset.page===id));});if(id!=='play')closeActivity();window.scrollTo({top:0,behavior:'auto'});}
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
function discardVoice(){stopPlayback();lastBuffer=null;lastBlob=null;replay.hidden=true;$('voice-replay').hidden=true;}
function cancelRecording(){stopTimers();if(recorder){recorder.onstop=null;recorder.ondataavailable=null;recorder.onerror=null;try{if(recorder.state!=='inactive')recorder.stop()}catch{}recorder=null}stopMic();chunks=[];pcmChunks=[];pcmSamples=0;recState='idle';recordingLabel();}
function voiceData(){return voices.find(v=>v[0]===save.voice)||voices[0]}
function voiceFilter(source,ac){const v=voiceData(),nodes=[source];let destination=source;
 if(v[5]==='robot'){const filter=ac.createBiquadFilter();filter.type='bandpass';filter.frequency.value=1050;filter.Q.value=.5;destination.connect(filter);destination=filter;nodes.push(filter);
  const ring=ac.createGain();ring.gain.value=.7;const lfo=ac.createOscillator(),lfoGain=ac.createGain();lfo.frequency.value=34;lfoGain.gain.value=.3;lfo.connect(lfoGain);lfoGain.connect(ring.gain);lfo.start();nodes.push(lfo,lfoGain,ring);destination.connect(ring);destination=ring;
 }else if(v[5]==='monster'||v[5]==='deep'||v[5]==='low'){const filter=ac.createBiquadFilter();filter.type='lowpass';filter.frequency.value=v[5]==='monster'?850:1500;destination.connect(filter);destination=filter;nodes.push(filter);
 }else if(v[5]==='underwater'){const filter=ac.createBiquadFilter();filter.type='lowpass';filter.frequency.value=750;destination.connect(filter);destination=filter;nodes.push(filter);
  }else if(v[5]==='telephone'){const filter=ac.createBiquadFilter();filter.type='bandpass';filter.frequency.value=1100;filter.Q.value=.8;destination.connect(filter);destination=filter;nodes.push(filter);
  }else if(v[5]==='witch'){const filter=ac.createBiquadFilter();filter.type='lowpass';filter.frequency.value=1000;destination.connect(filter);destination=filter;nodes.push(filter);
  }else if(v[5]==='high'||v[5]==='alien'){const filter=ac.createBiquadFilter();filter.type='highshelf';filter.frequency.value=1100;filter.gain.value=v[5]==='alien'?7:3;destination.connect(filter);destination=filter;nodes.push(filter);}
 const volume=ac.createGain();volume.gain.value=.88;destination.connect(volume);volume.connect(ac.destination);nodes.push(volume);
 if(v[5]==='echo'){const delay=ac.createDelay(.6),wet=ac.createGain();delay.delayTime.value=.21;wet.gain.value=.33;destination.connect(delay);delay.connect(wet);wet.connect(ac.destination);nodes.push(delay,wet);}
 return nodes;
}
function playbackRate(){return Math.max(.35,Math.min(3,voiceData()[4]*save.speed));}
function playing(){recState='playing';recBtn.disabled=true;recLabel.textContent='Mimi is talking!';recDetail.textContent=voiceData()[1]+' voice';face('talking');message(`Hee hee! ${voiceData()[2]} That's you!`,'Choose another voice and replay it!');confetti(9);replay.hidden=true;}
function finishedPlaying(){stopPlayback();recState='idle';recordingLabel();replay.hidden=!(lastBuffer||lastBlob);$('voice-replay').hidden=!(lastBuffer||lastBlob);message('That was funny! 😹','Change voice and tap Hear that again!');}
function needTap(){recState='idle';recordingLabel();replay.hidden=!(lastBuffer||lastBlob);$('voice-replay').hidden=!(lastBuffer||lastBlob);message('Tap Hear that again! 🔊','Safari sometimes needs an extra tap to play sound.');}
async function playLatest(){if(!lastBuffer&&!lastBlob)return;stopPlayback();try{const ac=await getContext();if(lastBuffer){const src=ac.createBufferSource();src.buffer=lastBuffer;src.playbackRate.value=playbackRate();playingNodes=voiceFilter(src,ac);playingSource=src;src.onended=finishedPlaying;src.start();playing();return;}
 if(lastBlob){if(audioURL)URL.revokeObjectURL(audioURL);audioURL=URL.createObjectURL(lastBlob);const audio=new Audio(audioURL);fallbackAudio=audio;audio.playbackRate=playbackRate();audio.preservesPitch=false;audio.webkitPreservesPitch=false;audio.onended=finishedPlaying;await audio.play();playing();return;}
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
function fartSound(){
 if(muted)return;
 getContext().then(ac=>{
  const length=.72, sampleRate=ac.sampleRate, buffer=ac.createBuffer(1,Math.ceil(sampleRate*length),sampleRate);
  const data=buffer.getChannelData(0);
  let rolling=0;
  for(let i=0;i<data.length;i++){
   const t=i/sampleRate, decay=Math.pow(1-t/length,1.6);
   // Synthetic rasp; no recorded audio, files or network needed.
   rolling=rolling*.84+(Math.random()*2-1)*.16;
   data[i]=(Math.sin(2*Math.PI*(100*t+18*t*t))*.36 + rolling*2.15)*decay*.45;
  }
  const source=ac.createBufferSource(),filter=ac.createBiquadFilter(),gain=ac.createGain();
  source.buffer=buffer;filter.type='lowpass';filter.frequency.value=480;gain.gain.value=.6;
  source.connect(filter);filter.connect(gain);gain.connect(ac.destination);source.start();
 }).catch(()=>{});
}
function doFart(){
 if(recState==='recording'||recState==='requesting'||recState==='processing')return;
 face('giggling');message('Pffffft! 💨😹','Oh Mimi! That was a cheeky one!');fartSound();confetti(9);
 clearTimeout(faceTimer);faceTimer=setTimeout(()=>face(),1100);
}
function catAction(kind){if(recState==='recording'||recState==='requesting'||recState==='processing')return;stopDancing();if(kind==='meme'){$('numbers').classList.remove('show');void $('numbers').offsetHeight;$('numbers').classList.add('show');face('meme');message('SIX! SEVEN! 🙌','Mimi is doing the 6–7 dance!');chirp([470,550,470,710,880],.13);confetti(33);playMeme();dancingTimer=setTimeout(()=>{face();$('numbers').classList.remove('show')},1850);}
 else if(kind==='dance'){face('dancing');message('Disco Mimi! 💃🪩','Dance dance dance!');chirp([450,530,610,730,650,530],.12);confetti(23);dancingTimer=setTimeout(()=>{face();message('Phew, that was fun! 😹')},2900)}
 else{happy(kind==='tickle'?'Tee hee hee! 😹':'Boop! 💖');chirp(kind==='tickle'?[820,950,1140]:[510,800]);}}
let memeBufferPromise=null;
function playMeme(){if(muted)return;try{getContext().then(async ac=>{if(!memeBufferPromise)memeBufferPromise=fetch('./six-seven.wav').then(r=>{if(!r.ok)throw new Error('Missing sound');return r.arrayBuffer()}).then(bytes=>ac.decodeAudioData(bytes)).catch(()=>null);const buffer=await memeBufferPromise;if(!buffer)return;const src=ac.createBufferSource();src.buffer=buffer;src.playbackRate.value=1.12;src.connect(ac.destination);src.start();}).catch(()=>{});}catch{}}
function buildGameTiles(){$('game-tiles').innerHTML=games.map(([id,label,emoji,note,tint,room])=>`<button type="button" class="game-tile" style="--tile:${tint}" data-game="${id}"><span>${emoji}</span><b>${label}</b><small>${note}</small><span class="room-tag">${(rooms.find(r=>r[0]===room)||rooms[0])[1]}</span></button>`).join('')}
function renderRooms(){
 const room=currentRoom();
 $('room-grid').innerHTML=rooms.map(([id,name,emoji,desc])=>`<button type="button" class="room-card ${save.room===id?'selected':''}" data-room="${id}" aria-pressed="${save.room===id}"><img class="room-thumb" src="rooms/${id}.svg" alt="" loading="lazy" draggable="false"><span class="room-card-label"><span class="room-emoji">${emoji}</span><span><b>${name}</b><small>${desc}</small></span></span></button>`).join('');
 const image=$('room-scene-image'); if(image){image.setAttribute('src',`rooms/${room[0]}.svg`);image.setAttribute('alt',`Illustrated ${room[1]}`);}
 $('room-title').textContent=`${room[2]} ${room[1]}`;
 $('room-description').textContent=room[3];
 $('room-actions').innerHTML=`<button type="button" data-room-home="true" class="room-main-action">🐱 See Mimi in this room!</button><button type="button" data-room-game="${room[4]}">Play ${(games.find(g=>g[0]===room[4])||['','Game'])[1]} ➜</button><button type="button" data-room-game="${room[5]}">Play ${(games.find(g=>g[0]===room[5])||['','Game'])[1]} ➜</button>`;
}
function setRoom(id){if(!rooms.some(r=>r[0]===id))return;save.room=id;store();updateGemUI();renderRooms();toast(`${currentRoom()[2]} ${currentRoom()[1]} selected!`);}
let extraGameIntervals=[];
function closeActivity(){if(activeTimer){clearInterval(activeTimer);clearTimeout(activeTimer);activeTimer=0}extraGameIntervals.forEach(x=>{if(typeof x==='object'&&x?.rhythmCleanup)x.rhythmCleanup();else {clearInterval(x);clearTimeout(x)}});extraGameIntervals=[];activity='';$('activity').hidden=true}
function openActivity(id){closeActivity();const g=games.find(x=>x[0]===id);if(!g)return;activity=id;showPage('play');$('activity').hidden=false;$('activity-title').textContent=`${g[2]} ${g[1]}`;$('activity-info').textContent=g[3];renderActivity();$('activity').scrollIntoView({behavior:'smooth',block:'start'});}
function awardActivity(n,text='Brilliant!'){reward(n);confetti(18);chirp([523,659,784,1000],.13);if(text)toast(text+` +${n} 💎`);}
function renderActivity(){const body=$('activity-body');body.innerHTML='';if(activity==='stars')startStars();if(activity==='gifts')startGifts();if(activity==='feed')startFeed();if(activity==='dance')startPartyGame();if(activity==='garden')startGarden();if(activity==='colours')startColours();if(activity==='dare')startDare();if(activity==='hunt')startHunt();if(activity==='bubbles')startBubbles();if(activity==='memory')startMemory();if(activity==='music')startMusic();if(activity==='cookies')startCookies()}
function startStars(){let score=0,time=15;const body=$('activity-body');body.innerHTML='<div class="game-status"><span>⭐ <b id="star-score">0</b></span><span>⏱️ <b id="star-clock">15</b>s</span></div><div class="star-field" id="star-field"><button type="button" class="star-target" id="star-target">⭐</button></div><p class="activity-note">Tap the star before it moves!</p>';
 const target=$('star-target'),field=$('star-field');function move(){const maxX=Math.max(1,field.clientWidth-82),maxY=Math.max(1,field.clientHeight-80);target.style.left=Math.floor(Math.random()*maxX)+'px';target.style.top=Math.floor(Math.random()*maxY)+'px';target.textContent=['⭐','🌟','💖','✨'][Math.floor(Math.random()*4)]}move();target.onclick=()=>{if(activity!=='stars'||time<=0)return;score++;$('star-score').textContent=score;move();chirp([610+(score%5)*85],.065);if(score%4===0)confetti(5)};
 activeTimer=setInterval(()=>{if(activity!=='stars')return;time--;$('star-clock').textContent=time;if(time<=0){clearInterval(activeTimer);activeTimer=0;body.innerHTML=`<div class="game-board" style="text-align:center"><div style="font-size:66px">🌟</div><h2>You popped ${score} stars!</h2><p>You're a superstar!</p><button class="game-again" id="again-stars">Play again</button></div>`;if(score>=4)awardActivity(Math.max(1,Math.min(10,Math.ceil(score/3))),'Star power!');if(score>=4)completeQualifiedChallenge('stars');$('again-stars').onclick=startStars;}},1000);
}
function startGifts(){let answer=Math.floor(Math.random()*3),opened=false;const body=$('activity-body');body.innerHTML='<div class="choice-grid">'+[0,1,2].map(i=>`<button data-gift="${i}" type="button">🎁</button>`).join('')+'</div><p class="activity-msg" id="gift-msg">Which present has the star?</p><div class="game-action"><button class="game-again" id="again-gifts">New presents 🔀</button></div>';
 all('[data-gift]').forEach(b=>b.onclick=()=>{if(opened)return;opened=true;const win=Number(b.dataset.gift)===answer;all('[data-gift]').forEach(k=>{const i=Number(k.dataset.gift);k.textContent=i===answer?'🌟':i===Number(b.dataset.gift)?'🐸':'🎁';k.disabled=true});$('gift-msg').textContent=win?'Hooray! You found it! 🌟':'Ribbit! A funny frog! 🐸';if(win)reward(3);confetti(win?18:6);chirp([520,690,840]);});$('again-gifts').onclick=startGifts;
}
function startFeed(){
 const foods=[['🐟','Fish'],['🍓','Strawberry'],['🥦','Broccoli'],['🧁','Cupcake'],['🍕','Pizza'],['🍉','Watermelon']];
 const b=$('activity-body');let done=0,last=0,doneRound=false,target=null;
 b.innerHTML='<div class="game-board" style="text-align:center"><h2>🍓 Feed Mimi the right treats!</h2><p>Mimi will ask for three different foods.</p><h2 id="food-request"></h2><div class="choice-grid">'+foods.map(([e,n])=>`<button type="button" data-feed="${e}" aria-label="Give ${n}">${e}</button>`).join('')+'</div><p id="feed-msg" class="activity-msg">Help Mimi choose!</p><button class="game-again" id="feed-again" hidden>🍕 Another meal!</button></div>';
 const pick=()=>{target=foods[Math.floor(Math.random()*foods.length)];$('food-request').textContent=`Mimi wants ${target[0]} ${target[1]}!`};pick();
 all('[data-feed]').forEach(btn=>btn.onclick=()=>{if(doneRound||performance.now()-last<700)return;last=performance.now();if(btn.dataset.feed!==target[0]){$('feed-msg').textContent='Not that snack! Look at what Mimi asked for. 💖';chirp([340,290]);return;}
 done++;chirp([560,810],.09);if(done===3){doneRound=true;all('[data-feed]').forEach(el=>el.disabled=true);awardActivity(3,'Happy snack time!');$('feed-msg').textContent='🎉 Three yummy treats! +3 gems';$('food-request').textContent='😻 Mimi is full!';$('feed-again').hidden=false;return;}
 $('feed-msg').textContent=`Great choice! ${done}/3 treats`;pick();});$('feed-again').onclick=startFeed;
}
function startPartyGame(){
 const body=$('activity-body'), arrows=['⬅️','⬆️','⬇️','➡️'];
 const steps=Array.from({length:7},()=>Math.floor(Math.random()*4));
 let beat=-1,correct=0,misses=0,finished=false,answered=false,beatTimeout=0;
 body.innerHTML=`<div class="game-board rhythm-board"><div class="game-status"><span>🎯 <b id="rhythm-points">0</b> / 7</span><span>🎵 Beat <b id="rhythm-beat">0</b> / 7</span></div><h2>Follow Mimi's dance!</h2><p id="rhythm-hint">Watch the arrow. Tap the matching arrow before the next beat.</p><div class="dance-signal" id="dance-signal">🪩</div><div class="rhythm-pad">${arrows.map((x,i)=>`<button type="button" data-dance-arrow="${i}" disabled>${x}</button>`).join('')}</div><p class="activity-msg" id="rhythm-result">Ready for 7 beats?</p><button type="button" id="rhythm-start" class="game-again">▶ Start dance!</button></div>`;
 const buttons=all('[data-dance-arrow]'),clock=()=>performance.now();let startedAt=0;
 function finish(){if(finished)return;finished=true;buttons.forEach(b=>b.disabled=true);clearTimeout(beatTimeout);$('dance-signal').textContent=correct>=5?'🌟':'💜';$('rhythm-start').textContent='🔁 Try a new dance';$('rhythm-start').hidden=false;
   if(correct>=5&&clock()-startedAt>=5000){const score=correct===7?6:4;awardActivity(score,'Dance complete!');completeQualifiedChallenge('dance');$('rhythm-result').textContent=`Wonderful! ${correct}/7 right. +${score} gems!`;}
   else{$('rhythm-result').textContent=`${correct}/7 right. Get 5 to win gems — try again!`;chirp([340,300]);}}
 function next(){if(finished)return;beat++;answered=false;if(beat>=steps.length){finish();return;}
   $('rhythm-beat').textContent=beat+1;$('dance-signal').textContent=arrows[steps[beat]];$('rhythm-result').textContent='Tap the matching arrow!';buttons.forEach(b=>b.disabled=false);
   chirp([480+beat*70],.06);beatTimeout=setTimeout(()=>{if(!answered){misses++;$('rhythm-result').textContent='Missed it! Keep dancing!';}next();},1150);
 }
 buttons.forEach(btn=>btn.onclick=()=>{if(answered||finished||beat<0)return;answered=true;buttons.forEach(b=>b.disabled=true);if(Number(btn.dataset.danceArrow)===steps[beat]){correct++;$('rhythm-points').textContent=correct;$('rhythm-result').textContent='✨ Great move!';chirp([670,840],.06);}else{$('rhythm-result').textContent='Oops, wrong arrow!';chirp([330],.08);} });
 $('rhythm-start').onclick=()=>{if(beat>=0){closeActivity();openActivity('dance');return;}startedAt=clock();$('rhythm-start').hidden=true;next();};
 // Beat timeout is cleared when the game is replaced or closed.
 extraGameIntervals.push({rhythmCleanup:()=>{finished=true;clearTimeout(beatTimeout);}});
}
function startGarden(){
 const body=$('activity-body');const steps=[['seed','🌰','Plant a seed','First, put a seed in the soil.'],['water','💧','Add water','Seeds need a drink to wake up.'],['sun','☀️','Give sunshine','Warm sunshine helps the sprout grow.'],['magic','✨','Add fairy magic','A pinch of magic makes the flower bloom.']];
 let step=0,errors=0,completed=false,lastTap=0,begin=performance.now();
 const scenes=['🪴','🌱','🌿','🌷','🌻'];
 body.innerHTML=`<div class="game-board grow-puzzle"><div class="garden-top"><span class="garden-plant" id="garden-plant">🪴</span><div><h2>Grow a magic flower!</h2><p>Read the clue, then pick the right item in order.</p><b id="garden-step">Step 1 of 4</b></div></div><div id="garden-clue" class="garden-clue">${steps[0][3]}</div><div class="garden-choices">${steps.slice().reverse().map(([id,emoji,label])=>`<button type="button" data-garden-choice="${id}">${emoji}<small>${label}</small></button>`).join('')}</div><p class="activity-msg" id="garden-feedback">Grow your flower, one step at a time!</p><button type="button" class="game-again" id="garden-again" hidden>🌸 Grow another flower</button></div>`;
 all('[data-garden-choice]').forEach(btn=>btn.onclick=()=>{if(completed)return;const now=performance.now();if(now-lastTap<850)return;lastTap=now;const correct=btn.dataset.gardenChoice===steps[step][0];
   if(!correct){errors++;$('garden-feedback').textContent='Not yet! Read the clue and try a different item.';chirp([350,290],.08);return;}
   step++;$('garden-plant').textContent=scenes[step];chirp([570+step*80,720+step*80],.075);
   if(step<4){$('garden-step').textContent=`Step ${step+1} of 4`;$('garden-clue').textContent=steps[step][3];$('garden-feedback').textContent='Great! What comes next?';return;}
   completed=true;all('[data-garden-choice]').forEach(el=>el.disabled=true);$('garden-step').textContent='Flower finished!';$('garden-clue').textContent='🌻 Your flower is blooming!';$('garden-again').hidden=false;
   if(performance.now()-begin>=2550){const n=errors===0?5:3;awardActivity(n,'Garden puzzle complete!');completeQualifiedChallenge('garden');$('garden-feedback').textContent=`✨ Flower grown! +${n} gems, +1 egg progress.`;}
   else {$('garden-feedback').textContent='🌻 Flower finished! Next time, go a little slower to earn gems.';}
 });$('garden-again').onclick=startGarden;
}

function startColours(){
 const b=$('activity-body'),colors=[['red','#ef6b85','❤️'],['blue','#5ca6ea','💙'],['green','#74c4a1','💚'],['yellow','#f4ca54','💛'],['purple','#a282e3','💜'],['orange','#f5a065','🧡']];let correct='',wins=0,last=0;
 function round(){const choices=colors.slice().sort(()=>Math.random()-.5).slice(0,3);correct=choices[Math.floor(Math.random()*3)][0];b.innerHTML=`<div class="game-board" style="text-align:center"><h2>Find the colour: ${correct.toUpperCase()}!</h2><p>${wins} of 4 correct</p><div class="game-action">${choices.map(([name,col])=>`<button type="button" class="colour-guess" style="background:${col}" data-guess="${name}" aria-label="${name}"></button>`).join('')}</div><p id="colour-msg" class="activity-msg">Which one is it?</p></div>`;
 all('[data-guess]').forEach(btn=>btn.onclick=()=>{if(performance.now()-last<450)return;last=performance.now();if(btn.dataset.guess===correct){wins++;chirp([680,830,1030]);if(wins>=4){awardActivity(4,'Colour puzzle solved!');b.innerHTML='<div class="game-board" style="text-align:center"><div style="font-size:65px">🌈</div><h2>You found all the colours!</h2><button class="game-again" id="again-colours">Play again</button></div>';$('again-colours').onclick=startColours;return;}$('colour-msg').textContent='Amazing! ✨ Next one!';setTimeout(()=>{if(activity==='colours')round()},650)}else{$('colour-msg').textContent='Try another one! 💕';chirp([420,370]);}})}round();
}

const dares=['Say “SILLY SAUSAGES!” 🌭','Roar like a TINY dinosaur! 🦖','Make the funniest alien sound! 👽','Sing one line of a silly song! 🎶','Say “banana pyjamas”! 🍌','Pretend you are a dancing potato! 🥔','Meow like a kitten! 🐱','Do your best robot noise! 🤖','Whisper “Mimi is amazing!” 🌟'];
function startDare(){const b=$('activity-body');let last=-1;b.innerHTML='<div class="game-board" style="text-align:center"><div style="font-size:58px">🎲</div><h2 id="dare-text">Ready for a silly dare?</h2><p>No need to record unless you want to!</p><button class="game-again" id="dare-go">Give me a dare!</button></div>';const go=()=>{let n=Math.floor(Math.random()*dares.length);if(n===last)n=(n+1)%dares.length;last=n;$('dare-text').textContent=dares[n];chirp([660,820],.1)};$('dare-go').onclick=go;go()}
function startHunt(){let found=0;const goal=6,b=$('activity-body');const chosen=[...Array(12).keys()].sort(()=>Math.random()-.5).slice(0,goal);b.innerHTML='<p class="activity-note">Tap the tiles to find 6 hidden gems! ✨</p><div class="hunt-grid">'+[...Array(12)].map((_,i)=>`<button type="button" class="hunt-tile" data-hunt="${i}" aria-label="Open tile ${i+1}">❔</button>`).join('')+'</div><p class="activity-msg" id="hunt-progress">0 of 6 gems</p><div class="game-action"><button class="game-again" id="hunt-again">Shuffle 🪄</button></div>';
 all('[data-hunt]').forEach(tile=>tile.onclick=()=>{if(tile.disabled)return;tile.disabled=true;if(chosen.includes(Number(tile.dataset.hunt))){tile.textContent='💎';tile.classList.add('found');found++;chirp([650,930]);$('hunt-progress').textContent=`${found} of ${goal} gems`;if(found===goal){$('hunt-progress').textContent='You found them ALL! 🎉';reward(6);completeQualifiedChallenge('hunt');confetti(33)}}else{tile.textContent='🌼';chirp([420],.07)}});$('hunt-again').onclick=startHunt;
}

function startBubbles(){let score=0,time=18;const body=$('activity-body');body.innerHTML='<div class="game-status"><span>🫧 <b id="bubble-score">0</b></span><span>⏱️ <b id="bubble-clock">18</b>s</span></div><div class="star-field" id="bubble-field"></div><p class="activity-note">Pop as many bubbles as you can!</p>';
 const field=$('bubble-field'); function addBubble(){if(activity!=='bubbles')return;const b=document.createElement('button');b.type='button';b.className='star-target';b.textContent=['🫧','💖','✨'][Math.floor(Math.random()*3)];b.style.left=Math.floor(Math.random()*Math.max(20,field.clientWidth-70))+'px';b.style.top=Math.floor(Math.random()*Math.max(20,field.clientHeight-70))+'px';b.onclick=()=>{score++;$('bubble-score').textContent=score;chirp([640+(score%4)*70],.05);b.remove();};field.append(b);setTimeout(()=>b.remove(),1400);} const spawner=setInterval(()=>{addBubble();addBubble();},700);extraGameIntervals.push(spawner); activeTimer=setInterval(()=>{time--; $('bubble-clock').textContent=time; if(time<=0){clearInterval(spawner); clearInterval(activeTimer); activeTimer=0; body.innerHTML=`<div class="game-board" style="text-align:center"><div style="font-size:66px">🫧</div><h2>You popped ${score} bubbles!</h2><button class="game-again" id="again-bubbles">Play again</button></div>`; awardActivity(Math.max(2,Math.ceil(score/4)),'Bubble burst!');if(score>=5)completeQualifiedChallenge('bubbles'); $('again-bubbles').onclick=startBubbles;}},1000); addBubble();}
function startMemory(){const icons=['🐱','💖','🌈','⭐','🎀','🎄'];const deck=[...icons,...icons].sort(()=>Math.random()-.5);let first=null, lock=false, matches=0;const body=$('activity-body');body.innerHTML='<p class="activity-note">Match all the pairs!</p><div class="hunt-grid">'+deck.map((icon,i)=>`<button type="button" class="hunt-tile" data-memory="${i}" aria-label="Card ${i+1}">❔</button>`).join('')+'</div><p class="activity-msg" id="memory-msg">Pick a card!</p>'; all('[data-memory]').forEach(btn=>btn.onclick=()=>{if(lock||btn.disabled)return; const idx=Number(btn.dataset.memory); btn.textContent=deck[idx]; if(first===null){first=btn; return;} if(first===btn)return; lock=true; if(first.textContent===btn.textContent){ first.disabled=btn.disabled=true; matches++; $('memory-msg').textContent='Match found! ✨'; reward(2,2); lock=false; first=null; if(matches===icons.length){completeQualifiedChallenge('memory'); confetti(28); $('memory-msg').textContent='You matched them all!'; }} else { $('memory-msg').textContent='Oops! Try again!'; setTimeout(()=>{if(activity!=='memory'||!first)return;first.textContent='❔'; btn.textContent='❔'; lock=false; first=null;},650); }});}
function startMusic(){const body=$('activity-body'); const notes=[['🎵',440],['🎶',554],['🥁',220],['🎹',660]]; const seq=Array.from({length:4},()=>Math.floor(Math.random()*4));let cursor=0,playingDemo=false,completed=false;
 body.innerHTML='<div class="game-board" style="text-align:center"><h2>🎹 Copy the music!</h2><p>Listen to four notes, then tap them in the same order.</p><div class="choice-grid">'+notes.map(([emoji,f],i)=>`<button type="button" data-music="${i}">${emoji}</button>`).join('')+'</div><button type="button" id="music-demo" class="game-again">🔊 Hear the pattern</button><p id="music-msg" class="activity-msg">Listen, then copy the notes!</p></div>';
 $('music-demo').onclick=async()=>{if(playingDemo||completed)return;playingDemo=true;$('music-demo').disabled=true;for(let i=0;i<seq.length;i++){if(activity!=='music')break;chirp([notes[seq[i]][1]],.2);await new Promise(resolve=>setTimeout(resolve,560));}playingDemo=false;$('music-demo').disabled=false;};
 all('[data-music]').forEach(btn=>btn.onclick=()=>{if(playingDemo||completed)return;const choice=Number(btn.dataset.music);chirp([notes[choice][1]],.1);if(choice===seq[cursor]){cursor++;$('music-msg').textContent=`Good! ${cursor}/4 notes`;if(cursor===4){completed=true;awardActivity(4,'Musical memory complete!');$('music-msg').textContent='⭐ Lovely song! +4 gems';$('music-demo').textContent='🔁 Play again';$('music-demo').disabled=false;$('music-demo').onclick=startMusic;}}else{cursor=0;$('music-msg').textContent='Not quite — start from the first note and listen again!';}});
}
function startCookies(){let caught=0,time=18;const body=$('activity-body'); body.innerHTML='<div class="game-status"><span>🍪 <b id="cookie-score">0</b></span><span>⏱️ <b id="cookie-clock">18</b>s</span></div><div class="star-field" id="cookie-field"></div><p class="activity-note">Tap the cookies before they disappear!</p>'; const field=$('cookie-field'); function drop(){if(activity!=='cookies')return; const b=document.createElement('button'); b.type='button'; b.className='star-target'; b.textContent=['🍪','🧁','🍓'][Math.floor(Math.random()*3)]; b.style.left=Math.floor(Math.random()*Math.max(20,field.clientWidth-70))+'px'; b.style.top=Math.floor(Math.random()*Math.max(20,field.clientHeight-70))+'px'; b.onclick=()=>{caught++; $('cookie-score').textContent=caught; chirp([520,700],.06); b.remove();}; field.append(b); setTimeout(()=>{if(b.isConnected)b.remove();},1300);} const rain=setInterval(drop,600);extraGameIntervals.push(rain); activeTimer=setInterval(()=>{time--; $('cookie-clock').textContent=time; if(time<=0){clearInterval(rain); clearInterval(activeTimer); activeTimer=0; body.innerHTML=`<div class="game-board" style="text-align:center"><div style="font-size:66px">🍪</div><h2>You caught ${caught} treats!</h2><button class="game-again" id="again-cookies">Play again</button></div>`; awardActivity(Math.max(1,Math.ceil(caught/3)),'Treat time!');if(caught>=4)completeQualifiedChallenge('cookies'); $('again-cookies').onclick=startCookies;}},1000); drop();}
// Event wiring is done after every required element exists: a missing optional element cannot block other buttons.
all('[data-page]').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));
all('[data-goto]').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.goto)));
$('egg-shop').addEventListener('click',e=>{const b=e.target.closest('[data-buy-egg]');if(b)buyEgg(b.dataset.buyEgg)});
$('kitten-collection').addEventListener('click',e=>{const b=e.target.closest('[data-pick-kitten]');if(!b||!save.eggsHatched.includes(b.dataset.pickKitten))return;save.activeKitten=save.activeKitten===b.dataset.pickKitten?'none':b.dataset.pickKitten;store();renderNursery();renderCompanions();toast(save.activeKitten==='none'?'🐱 Kitten is resting!':'🐾 Your kitten is following Mimi!');});
$('incubation-area').addEventListener('click',e=>{if(e.target.closest('[data-goto-nursery-games]'))showPage('play')});
$('gem-shortcut').onclick=()=>showPage('gems');$('gem-hunt').onclick=()=>{showPage('play');openActivity('hunt');};
$('room-grid').addEventListener('click',e=>{const b=e.target.closest('[data-room]');if(b)setRoom(b.dataset.room)});
$('room-actions').addEventListener('click',e=>{const g=e.target.closest('[data-room-game]'); if(g){showPage('play'); openActivity(g.dataset.roomGame); return;} if(e.target.closest('[data-room-home]')){showPage('home');}});
all('[data-dress-tab]').forEach(b=>b.onclick=()=>{dressTab=b.dataset.dressTab;renderWardrobe()});
$('wardrobe-content').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.jumpShop){showPage('shop')}else if(b.dataset.magicDress)selectLook('outfit',b.dataset.magicDress);else if(b.dataset.magicWand)selectLook('wand',b.dataset.magicWand);else if(b.dataset.magicHair)selectLook('hair',b.dataset.magicHair);else if(b.dataset.magicHat)selectLook('hat',b.dataset.magicHat);else if(b.dataset.magicWings)selectLook('wings',b.dataset.magicWings);else if(b.dataset.wings)selectLook('wings',b.dataset.wings);else if(b.dataset.wand)selectLook('wand',b.dataset.wand);else if(b.dataset.season){season=b.dataset.season;renderWardrobe()}else if(b.dataset.outfit)selectLook('outfit',b.dataset.outfit);else if(b.dataset.hair)selectLook('hair',b.dataset.hair);else if(b.dataset.hat)selectLook('hat',b.dataset.hat);else if(b.dataset.fur)selectLook('fur',b.dataset.fur);else if(b.dataset.hairColour)selectLook('hairColour',b.dataset.hairColour)});
$('random-look').onclick=()=>{const get=a=>a[Math.floor(Math.random()*a.length)];save.outfit=get(Object.values(outfits).flat())[0];save.hair=get(hairstyle)[0];save.hairColour=get(hairColours)[0];save.hat=get(hats)[0];store();applyLook();renderWardrobe();confetti(18);toast('🎲 Surprise outfit!')};
$('clear-look').onclick=()=>{save.outfit='daisy';save.hair='none';save.hat='none';store();applyLook();renderWardrobe();toast('Back to fluffy Mimi! 🐱')};
$('voice-grid').addEventListener('click',e=>{const b=e.target.closest('[data-voice]');if(b)setVoice(b.dataset.voice)});$('quick-voice').addEventListener('click',e=>{const b=e.target.closest('[data-voice]');if(b)setVoice(b.dataset.voice)});
all('[data-speed-slider]').forEach(slider=>slider.addEventListener('input',()=>setSpeed(slider.value)));
all('[data-speed-preset]').forEach(b=>b.addEventListener('click',()=>setSpeed(b.dataset.speedPreset)));
$('voice-replay').onclick=playLatest;
all('[data-shop-tab]').forEach(b=>b.addEventListener('click',()=>{shopTab=b.dataset.shopTab;renderShop()}));
$('shop-items').addEventListener('click',e=>{const b=e.target.closest('[data-shop-buy]');if(b)buyOrEquip(b.dataset.shopBuy)});
$('gem-album').addEventListener('click',e=>{const b=e.target.closest('[data-gem-info]');if(!b)return;const g=gems.find(x=>x[0]===b.dataset.gemInfo);if(!g)return;toast(save.album.includes(g[0])?`${g[2]} ${g[1]}: ${g[3]} — collected!`:`🔒 ${g[1]} — play games to discover it!`);});
$('try-voice').onclick=()=>showPage('home');$('voice-test').onclick=()=>chirp([430,880,570,1020,620],.12);
$('game-tiles').addEventListener('click',e=>{const b=e.target.closest('[data-game]');if(b)openActivity(b.dataset.game)});$('activity-close').onclick=closeActivity;
recBtn.onclick=()=>{if(recState==='recording')endRecording();else if(recState==='idle')beginRecording()};replay.onclick=playLatest;
$('fart').onclick=doFart;$('tickle').onclick=()=>catAction('tickle');$('boop').onclick=()=>catAction('boop');$('meme').onclick=()=>catAction('meme');$('home-dance').onclick=()=>catAction('dance');wrap.onclick=()=>catAction('tickle');wrap.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();catAction('tickle')}};
$('sound-toggle').onclick=()=>{muted=!muted;$('sound-toggle').textContent=muted?'🔇 Effects off':'🔊 Effects on';$('sound-toggle').setAttribute('aria-pressed',String(!muted));if(!muted)chirp()};
$('reset-save').onclick=()=>{if(!window.confirm('Grown-ups only: clear all saved gems and outfits on this device?'))return;save={...defaults,album:[],unlocked:[]};store();applyLook();renderWardrobe();renderVoice();renderSpeed();updateGemUI();renderShop();renderRooms();renderNursery();renderCompanions();toast('Collection reset')};
window.addEventListener('pagehide',()=>{cancelRecording();discardVoice();stopDancing();closeActivity();if(ctx){ctx.close().catch(()=>{});ctx=null}});
applyLook();renderWardrobe();renderVoice();renderSpeed();buildGameTiles();updateGemUI();renderShop();renderRooms();renderNursery();renderCompanions();recordingLabel();
if('serviceWorker' in navigator && location.protocol==='https:'){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}))}
})();
