
import React, {useMemo, useState} from 'react';
import { createRoot } from 'react-dom/client';
import { Plane, CalendarDays, Utensils, Dumbbell, Languages, Luggage, WalletCards, MapPin, Heart, Copy, RotateCcw } from 'lucide-react';
import { itinerary, foods, wellness, packing, thaiGuide } from './data';
import './style.css';

const mapUrl = (name) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' Bangkok')}`;
const useLocal = (key, initial) => {
  const [val, setVal] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial; } catch { return initial; }
  });
  const save = (next) => { setVal(next); localStorage.setItem(key, JSON.stringify(next)); };
  return [val, save];
};

function Home() {
  const [passport, setPassport] = useLocal('passport', {bib:'', finish:''});
  const daysLeft = useMemo(() => Math.ceil((new Date('2026-08-12T13:30:00+08:00') - new Date()) / 86400000), []);
  return <main className="page">
    <section className="hero">
      <div className="topline"><b>🇹🇭 HYROX Bangkok Guide</b><span>Travel • Race • Recover</span></div>
      <h1>Bangkok<br/>5天4夜完賽旅行</h1>
      <p>2026/08/12–08/16｜HYROX、美食、咖啡、泰裝、Recovery、夜生活</p>
      <div className="heroGrid">
        <div><small>去程 華航</small><b>8/12 13:30 TPE → 16:20 BKK</b></div>
        <div><small>回程 華航</small><b>8/16 13:20 BKK → 18:00 TPE</b></div>
      </div>
    </section>
    <section className="section">
      <div className="title"><h2>Dashboard</h2><span className="tag">{daysLeft > 0 ? `倒數 ${daysLeft} 天` : 'Travel Mode'}</span></div>
      <div className="card">
        <h3>行程重點</h3>
        {itinerary.map((d,i)=><div className="event" key={d.day}><div className="time">Day {i+1}</div><div><b>{d.date}｜{d.theme}</b><p>{d.items.slice(2,5).map(x=>x[1]).join(' → ')}</p></div></div>)}
      </div>
      <div className="card passport">
        <h3>🏅 HYROX Passport</h3>
        <p>不綁定個人名字，適合你、媽媽、朋友一起使用。</p>
        <div className="row">
          <input placeholder="Bib No." value={passport.bib} onChange={e=>setPassport({...passport,bib:e.target.value})}/>
          <input placeholder="Finish Time" value={passport.finish} onChange={e=>setPassport({...passport,finish:e.target.value})}/>
        </div>
      </div>
      <div className="card warn"><b>Day 1 晚餐備案</b><p>Phed Mark 若太晚、客滿或停止點餐，改 ROAST Coffee & Eatery 或 Zaew Thonglor - Since 1984。</p></div>
    </section>
  </main>
}

function Itinerary() {
  const [idx, setIdx] = useState(0);
  const d = itinerary[idx];
  return <main className="page section">
    <div className="title"><h2>每日行程</h2><span className="tag">{d.date}</span></div>
    <div className="tabs">{itinerary.map((x,i)=><button key={x.day} className={i===idx?'active':''} onClick={()=>setIdx(i)}>{x.day}</button>)}</div>
    <div className="card">
      <h3>{d.day}｜{d.date}</h3><p className="muted">{d.theme}</p>
      {d.items.map((x,i)=><div className="event" key={i}><div className="time">{x[0]}</div><div><b>{x[1]}</b><p>{x[2]}</p><a href={mapUrl(x[1])} target="_blank">Google Maps →</a></div></div>)}
    </div>
  </main>
}

function Food() {
  return <main className="page section">
    <div className="title"><h2>Food Guide</h2><span className="tag">{foods.length} places</span></div>
    <div className="grid">{foods.map(f=><div className="card food" key={f[0]}><span>{f[2]}</span><h3>{f[0]}</h3><p>{f[1]}</p><a href={mapUrl(f[0])} target="_blank">導航 →</a></div>)}</div>
  </main>
}

function Wellness() {
  return <main className="page section">
    <div className="title"><h2>Wellness / Recovery</h2><span className="tag">HYROX Recovery</span></div>
    {wellness.map(w=><div className="card" key={w[0]}><h3>{w[0]}</h3><p>{w[1]}</p><a href={mapUrl(w[0])} target="_blank">Google Maps →</a></div>)}
    <div className="card"><h3>Recovery Timeline</h3><p>HYROX → Vault Red Light HIIT → Lumphini Recovery Run → Lucky Rose Massage → Red Light Sound Healing</p></div>
  </main>
}

function Thai() {
  const copy = (txt) => navigator.clipboard?.writeText(txt);
  return <main className="page section">
    <div className="title"><h2>Thai Survival Guide</h2><span className="tag">空耳</span></div>
    <div className="card warn"><b>使用方式</b><p>直接照「空耳」唸給司機或店員聽。女生句尾常加 ka，比較有禮貌。</p></div>
    {Object.entries(thaiGuide).map(([cat, list])=><div className="card" key={cat}><h3>{cat}</h3>{list.map((p,i)=><div className="phrase" key={i}><b>{p[0]}</b><p>🇹🇭 {p[1]}<br/>🔤 {p[2]}<br/><strong>🇹🇼 {p[3]}</strong></p><button onClick={()=>copy(p[1])}><Copy size={14}/> 複製泰文</button></div>)}</div>)}
  </main>
}

function Packing() {
  const [checked, setChecked] = useLocal('packing', {});
  const toggle = (item) => setChecked({...checked, [item]: !checked[item]});
  const reset = () => setChecked({});
  return <main className="page section">
    <div className="title"><h2>Packing List</h2><button onClick={reset}><RotateCcw size={15}/> 重置</button></div>
    <div className="card">{Object.entries(packing).map(([cat, items])=><div key={cat}><h3 className="cat">{cat}</h3>{items.map(item=><label className="check" key={item}><input type="checkbox" checked={!!checked[item]} onChange={()=>toggle(item)}/><span>{item}</span></label>)}</div>)}</div>
  </main>
}

function Budget() {
  const [items, setItems] = useLocal('budget', []);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const total = items.reduce((s,x)=>s+Number(x.amount),0);
  const add = () => { if(!name || !amount) return; setItems([...items,{name, amount:Number(amount)}]); setName(''); setAmount(''); };
  return <main className="page section">
    <div className="title"><h2>Budget</h2><span className="tag">{total.toLocaleString()} THB</span></div>
    <div className="card"><div className="row"><input placeholder="項目，例如 Grab" value={name} onChange={e=>setName(e.target.value)}/><input type="number" placeholder="THB" value={amount} onChange={e=>setAmount(e.target.value)}/></div><button className="primary" onClick={add}>新增花費</button></div>
    {items.map((x,i)=><div className="card mini" key={i}><b>{x.name}</b><span>{x.amount.toLocaleString()} THB</span></div>)}
  </main>
}

const pages = [
  ['home','首頁',Plane,Home],
  ['itinerary','行程',CalendarDays,Itinerary],
  ['food','美食',Utensils,Food],
  ['wellness','恢復',Dumbbell,Wellness],
  ['thai','泰語',Languages,Thai],
  ['packing','行李',Luggage,Packing],
  ['budget','預算',WalletCards,Budget],
];

function App(){
  const [page,setPage]=useState('home');
  const Active = pages.find(p=>p[0]===page)?.[3] || Home;
  return <div className="app"><Active/><nav>{pages.map(([id,label,Icon])=><button key={id} className={page===id?'active':''} onClick={()=>setPage(id)}><Icon size={22}/><span>{label}</span></button>)}</nav></div>
}

createRoot(document.getElementById('root')).render(<App />);
