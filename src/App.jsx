import { useState, useEffect, useRef } from "react";
import { config } from "./config.js";
import { contactInfo } from "./contact_info.js";

const C = {
  bg:"#F9FAFB",bg2:"#F3F4F6",bg3:"#E5E7EB",text:"#1F2937",textMid:"#4B5563",textSoft:"#9CA3AF",
  blue:"#3B82F6",green:"#10B981",border:"rgba(31,41,55,0.1)",cardBg:"#FFFFFF",
  shadow:"0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
  shadowMd:"0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)",
  shadowLg:"0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)",
};

const HERO_1 = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80";
const HERO_2 = "https://images.unsplash.com/photo-1468276898467-8f7de5abe7c3?w=1400&q=80";
const ROOMS = [
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=75",
  "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=75",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=75",
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=75",
  "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=75",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=75",
];
const LIFESTYLE = [
  "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?w=800&q=75",
  "https://images.unsplash.com/photo-1471623432079-b009d30b6729?w=800&q=75",
  "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&q=75",
  "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=75",
];

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}
function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return <div ref={ref} style={{ opacity: visible?1:0, transform: visible?"translateY(0)":"translateY(20px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>{children}</div>;
}

function Tag({ children, color = C.blue }) {
  return <span style={{ display:"inline-flex", alignItems:"center", gap:"0.3rem", background: color===C.blue?"rgba(59,130,246,0.1)":"rgba(16,185,129,0.1)", color, fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.04em", padding:"0.25rem 0.65rem", borderRadius:"999px", fontFamily:"'Inter','DM Sans',sans-serif" }}>{children}</span>;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const links = [["Apartment","#apartment"],["Experiences","#experiences"],["Location","#location"],["Reviews","#reviews"]];
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, background: scrolled?"rgba(249,250,251,0.97)":"rgba(249,250,251,0.9)", backdropFilter:"blur(12px)", borderBottom:`1px solid ${scrolled?C.border:"transparent"}`, transition:"all 0.3s ease" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 1.5rem", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:C.blue }} />
          <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.95rem", fontWeight:700, color:C.text, letterSpacing:"-0.02em" }}>La Perla del Mare</div>
        </div>
        <div style={{ display:"flex", gap:"2rem", alignItems:"center" }} className="desk-nav">
          {links.map(([l,h]) => <a key={l} href={h} style={{ color:C.textMid, textDecoration:"none", fontSize:"0.82rem", fontWeight:500, fontFamily:"'Inter',sans-serif", transition:"color 0.2s" }} onMouseEnter={e=>e.target.style.color=C.blue} onMouseLeave={e=>e.target.style.color=C.textMid}>{l}</a>)}
          <div style={{ display:"flex", gap:"0.25rem", borderLeft:`1px solid ${C.border}`, paddingLeft:"1rem" }}>
            <a href={config.langIT} style={{ fontSize:"0.72rem", fontWeight:500, color:C.textSoft, textDecoration:"none", fontFamily:"'Inter',sans-serif", padding:"0.2rem 0.35rem", borderRadius:4, transition:"color 0.2s" }} onMouseEnter={e=>e.target.style.color=C.blue} onMouseLeave={e=>e.target.style.color=C.textSoft}>IT</a>
            <a href={config.langEN} style={{ fontSize:"0.72rem", fontWeight:700, color:C.blue, textDecoration:"none", fontFamily:"'Inter',sans-serif", padding:"0.2rem 0.35rem", borderRadius:4, background:"rgba(59,130,246,0.1)" }}>EN</a>
          </div>
          <a href={config.airbnbUrl} target="_blank" rel="noopener noreferrer"
            style={{ background:C.blue, color:"#fff", padding:"0.5rem 1.25rem", borderRadius:8, fontSize:"0.8rem", fontWeight:600, textDecoration:"none", fontFamily:"'Inter',sans-serif", transition:"all 0.2s" }}
            onMouseEnter={e=>{e.currentTarget.style.background="#2563EB";e.currentTarget.style.transform="translateY(-1px)";}}
            onMouseLeave={e=>{e.currentTarget.style.background=C.blue;e.currentTarget.style.transform="translateY(0)";}}>
            Book now
          </a>
        </div>
        <button onClick={()=>setOpen(!open)} className="burger" style={{ display:"none", background:"none", border:"none", cursor:"pointer", padding:"0.5rem", flexDirection:"column", gap:5 }}>
          {[0,1,2].map(i=><div key={i} style={{ width:20, height:2, background:C.text, borderRadius:2 }}/>)}
        </button>
      </div>
      {open && (
        <div style={{ background:C.cardBg, borderTop:`1px solid ${C.border}`, padding:"1rem 1.5rem 1.5rem" }}>
          {links.map(([l,h])=><a key={l} href={h} onClick={()=>setOpen(false)} style={{ display:"block", color:C.textMid, textDecoration:"none", padding:"0.65rem 0", fontFamily:"'Inter',sans-serif", fontSize:"0.95rem", borderBottom:`1px solid ${C.border}` }}>{l}</a>)}
          <div style={{ display:"flex", gap:"0.5rem", margin:"1rem 0 0.75rem" }}>
            <a href={config.langIT} style={{ fontSize:"0.75rem", fontWeight:500, color:C.textSoft, textDecoration:"none", padding:"0.3rem 0.75rem", borderRadius:6, background:C.bg2 }}>IT</a>
            <a href={config.langEN} style={{ fontSize:"0.75rem", fontWeight:700, color:C.blue, textDecoration:"none", padding:"0.3rem 0.75rem", borderRadius:6, background:"rgba(59,130,246,0.1)" }}>EN</a>
          </div>
          <a href={config.airbnbUrl} target="_blank" rel="noopener noreferrer" style={{ display:"inline-block", background:C.blue, color:"#fff", padding:"0.7rem 1.5rem", borderRadius:8, fontSize:"0.82rem", fontWeight:600, textDecoration:"none", fontFamily:"'Inter',sans-serif" }}>Book on Airbnb</a>
        </div>
      )}
      <style>{`@media(max-width:768px){.desk-nav{display:none!important}.burger{display:flex!important}}`}</style>
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [slide, setSlide] = useState(0);
  useEffect(()=>{setTimeout(()=>setLoaded(true),80);},[]);
  useEffect(()=>{const t=setInterval(()=>setSlide(s=>(s+1)%2),5000);return()=>clearInterval(t);},[]);
  return (
    <section style={{ position:"relative", minHeight:"100vh", background:C.text, overflow:"hidden" }}>
      {[HERO_1,HERO_2].map((src,i)=>(
        <img key={i} src={src} alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", opacity:slide===i?0.35:0, transition:"opacity 1.5s ease", pointerEvents:"none" }}/>
      ))}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(31,41,55,0.92) 0%, rgba(31,41,55,0.7) 60%, rgba(59,130,246,0.15) 100%)", pointerEvents:"none" }}/>
      <div style={{ position:"relative", zIndex:2, maxWidth:1200, margin:"0 auto", padding:"0 1.5rem", minHeight:"100vh", display:"flex", alignItems:"center", paddingTop:"5rem" }}>
        <div style={{ maxWidth:680 }}>
          <div style={{ opacity:loaded?1:0, transform:loaded?"translateY(0)":"translateY(16px)", transition:"all 0.6s ease 0.1s", display:"flex", gap:"0.5rem", flexWrap:"wrap", marginBottom:"1.5rem" }}>
            <Tag color={C.green}>★ 4.96 · Guest Favourite</Tag>
            <Tag color={C.blue}>400m from the Beach</Tag>
            <Tag color={C.blue}>Private Garage</Tag>
          </div>
          <h1 style={{ opacity:loaded?1:0, transform:loaded?"translateY(0)":"translateY(24px)", transition:"all 0.8s ease 0.2s", fontFamily:"'Inter',sans-serif", fontSize:"clamp(2.4rem,5.5vw,4.5rem)", fontWeight:800, color:"#fff", lineHeight:1.1, letterSpacing:"-0.03em", marginBottom:"1.25rem" }}>
            The beach is just<br/><span style={{ color:C.blue }}>a bike ride away.</span>
          </h1>
          <p style={{ opacity:loaded?1:0, transform:loaded?"translateY(0)":"translateY(20px)", transition:"all 0.8s ease 0.35s", fontFamily:"'Inter',sans-serif", fontSize:"clamp(0.95rem,1.8vw,1.1rem)", color:"rgba(255,255,255,0.75)", lineHeight:1.8, maxWidth:500, marginBottom:"2rem" }}>
            Bright apartment with private garage and bicycles included, 400 metres from the beach in Cesenatico. Perfect for families, groups of friends and remote workers.
          </p>
          <div style={{ opacity:loaded?1:0, transform:loaded?"translateY(0)":"translateY(20px)", transition:"all 0.8s ease 0.48s", display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
            <a href={config.airbnbUrl} target="_blank" rel="noopener noreferrer"
              style={{ background:C.blue, color:"#fff", padding:"0.9rem 2rem", borderRadius:10, fontSize:"0.88rem", fontWeight:700, textDecoration:"none", fontFamily:"'Inter',sans-serif", boxShadow:"0 4px 14px rgba(59,130,246,0.4)", transition:"all 0.25s" }}
              onMouseEnter={e=>{e.currentTarget.style.background="#2563EB";e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background=C.blue;e.currentTarget.style.transform="translateY(0)";}}>
              Book on Airbnb ↗
            </a>
            <a href="#apartment" style={{ background:"rgba(255,255,255,0.1)", color:"#fff", padding:"0.9rem 1.75rem", borderRadius:10, fontSize:"0.88rem", fontWeight:600, textDecoration:"none", fontFamily:"'Inter',sans-serif", border:"1px solid rgba(255,255,255,0.2)", transition:"all 0.25s" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.18)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}>
              Discover more
            </a>
          </div>
          <div style={{ opacity:loaded?1:0, transition:"opacity 0.8s ease 0.65s", display:"flex", gap:"2rem", marginTop:"3rem", paddingTop:"2rem", borderTop:"1px solid rgba(255,255,255,0.1)", flexWrap:"wrap" }}>
            {[["6","Guests"],["2","Bedrooms"],["27","Reviews"],["4.96","Rating"]].map(([v,l])=>(
              <div key={l}>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"1.5rem", fontWeight:800, color:"#fff" }}>{v}</div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.7rem", color:"rgba(255,255,255,0.5)", textTransform:"uppercase", letterSpacing:"0.08em", marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Apartment() {
  const [active, setActive] = useState(0);
  const amenities = [
    { icon:"🚗", title:"Private garage", desc:"Box below the apartment + bicycles included — a real rarity in the area" },
    { icon:"🛗", title:"Lift", desc:"Barrier-free access from garage to apartment floor" },
    { icon:"📶", title:"Fibre WiFi", desc:"Fast connection, dedicated workspace for remote workers" },
    { icon:"❄️", title:"A/C in every room", desc:"Split unit in each bedroom and in the living area" },
    { icon:"👨‍🍳", title:"Full kitchen", desc:"Oven, dishwasher, coffee machine, everything you need" },
    { icon:"🌅", title:"2 Balconies", desc:"South-facing, with table and chairs — perfect for morning coffee" },
  ];
  return (
    <section id="apartment" style={{ background:C.bg, padding:"6rem 1.5rem" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <Reveal>
          <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"0.5rem" }}>
            <div style={{ width:3, height:18, background:C.blue, borderRadius:2 }}/>
            <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.78rem", fontWeight:600, color:C.blue, textTransform:"uppercase", letterSpacing:"0.1em" }}>The Apartment</span>
          </div>
          <h2 style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:800, color:C.text, letterSpacing:"-0.03em", marginBottom:"0.5rem" }}>Space, light and every comfort</h2>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"1rem", color:C.textMid, lineHeight:1.75, maxWidth:580, marginBottom:"3rem" }}>
            Renovated apartment, south-facing, with large communal spaces. The private garage with bicycles is a real rarity in this area.
          </p>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"1.1fr 0.9fr", gap:"3rem", alignItems:"start" }} className="apt-grid">
          <Reveal>
            <div>
              <div style={{ borderRadius:12, overflow:"hidden", boxShadow:C.shadowLg, marginBottom:"0.5rem" }}>
                <img src={ROOMS[active]} alt="La Perla del Mare" loading="lazy" style={{ width:"100%", aspectRatio:"4/3", objectFit:"cover", display:"block", transition:"transform 0.5s ease" }} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}/>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:"0.35rem" }}>
                {ROOMS.map((src,i)=>(
                  <div key={i} onClick={()=>setActive(i)} style={{ borderRadius:6, overflow:"hidden", cursor:"pointer", border:active===i?`2px solid ${C.blue}`:"2px solid transparent", transition:"border 0.15s" }}>
                    <img src={src} alt="" loading="lazy" style={{ width:"100%", aspectRatio:"1", objectFit:"cover", display:"block", filter:active===i?"none":"brightness(0.65)", transition:"filter 0.15s" }}/>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem", marginBottom:"1.75rem" }}>
              {amenities.map(({icon,title,desc})=>(
                <div key={title} style={{ background:C.cardBg, padding:"1rem", borderRadius:10, border:`1px solid ${C.border}`, transition:"all 0.2s" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=C.blue;e.currentTarget.style.boxShadow=`0 0 0 3px rgba(59,130,246,0.08)`;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.boxShadow="none";}}>
                  <div style={{ fontSize:"1.3rem", marginBottom:"0.5rem" }}>{icon}</div>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.8rem", fontWeight:600, color:C.text, marginBottom:"0.2rem" }}>{title}</div>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.72rem", color:C.textSoft, lineHeight:1.5 }}>{desc}</div>
                </div>
              ))}
            </div>
            <div style={{ background:"linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(16,185,129,0.06) 100%)", border:`1px solid rgba(59,130,246,0.15)`, borderRadius:10, padding:"1.25rem", marginBottom:"1.5rem" }}>
              <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.72rem", fontWeight:600, color:C.blue, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"0.5rem" }}>Check-in · Check-out</div>
              <div style={{ display:"flex", gap:"2rem" }}>
                <div><div style={{ fontFamily:"'Inter',sans-serif", fontSize:"1.1rem", fontWeight:700, color:C.text }}>16:00</div><div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.7rem", color:C.textSoft }}>Check-in</div></div>
                <div><div style={{ fontFamily:"'Inter',sans-serif", fontSize:"1.1rem", fontWeight:700, color:C.text }}>10:00</div><div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.7rem", color:C.textSoft }}>Check-out</div></div>
                <div><div style={{ fontFamily:"'Inter',sans-serif", fontSize:"1.1rem", fontWeight:700, color:C.text }}>Max 6</div><div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.7rem", color:C.textSoft }}>Guests</div></div>
              </div>
            </div>
            <a href={config.airbnbUrl} target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:C.blue, color:"#fff", padding:"0.85rem 1.75rem", borderRadius:10, fontSize:"0.85rem", fontWeight:700, textDecoration:"none", fontFamily:"'Inter',sans-serif", boxShadow:`0 4px 12px rgba(59,130,246,0.3)`, transition:"all 0.2s" }}
              onMouseEnter={e=>{e.currentTarget.style.background="#2563EB";e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background=C.blue;e.currentTarget.style.transform="translateY(0)";}}>
              Check availability on Airbnb ↗
            </a>
          </Reveal>
        </div>
      </div>
      <style>{`@media(max-width:768px){.apt-grid{grid-template-columns:1fr!important;gap:2rem!important}}`}</style>
    </section>
  );
}

function Experience() {
  const items = [
    { img:LIFESTYLE[0], tag:"Beach", tagColor:C.blue, title:"400 metres from the beach", desc:"Take the bicycles from the garage and reach the sea in minutes. The Cesenatico seafront is one of the most beautiful on the Riviera." },
    { img:LIFESTYLE[1], tag:"Remote Work", tagColor:C.green, title:"Fibre WiFi and workspace", desc:"Fast connection and a dedicated desk. Work in the morning, hit the beach in the afternoon. The ideal work-life balance." },
    { img:LIFESTYLE[2], tag:"Nature", tagColor:C.green, title:"Parco di Levante — 4 min walk", desc:"40 hectares of meadow, pine forest and ponds with wildlife. Perfect for a morning walk or a run among the trees." },
    { img:LIFESTYLE[3], tag:"Region", tagColor:C.blue, title:"Romagna within easy reach", desc:"Bertinoro 25 min, UNESCO Ravenna 50 min, San Marino 35 min. An ideal base to explore the region." },
  ];
  return (
    <section id="experiences" style={{ background:C.bg2, padding:"6rem 1.5rem" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <Reveal>
          <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"0.5rem" }}>
            <div style={{ width:3, height:18, background:C.green, borderRadius:2 }}/>
            <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.78rem", fontWeight:600, color:C.green, textTransform:"uppercase", letterSpacing:"0.1em" }}>Experiences</span>
          </div>
          <h2 style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:800, color:C.text, letterSpacing:"-0.03em", marginBottom:"0.5rem" }}>
            Sea, nature and remote work.<br/><span style={{ color:C.blue }}>All in one place.</span>
          </h2>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"1rem", color:C.textMid, lineHeight:1.75, maxWidth:540, marginBottom:"3rem" }}>
            Cesenatico is the perfect destination for those who want to combine relaxation, nature and productivity.
          </p>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1.25rem" }} className="exp-grid">
          {items.map(({img,tag,tagColor,title,desc},i)=>(
            <Reveal key={title} delay={i*60}>
              <div style={{ background:C.cardBg, borderRadius:12, overflow:"hidden", border:`1px solid ${C.border}`, transition:"all 0.25s", boxShadow:C.shadow }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=C.shadowLg;}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=C.shadow;}}>
                <div style={{ overflow:"hidden", height:200 }}>
                  <img src={img} alt={title} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s ease" }} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}/>
                </div>
                <div style={{ padding:"1.25rem" }}>
                  <div style={{ marginBottom:"0.6rem" }}><Tag color={tagColor}>{tag}</Tag></div>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.97rem", fontWeight:700, color:C.text, marginBottom:"0.4rem" }}>{title}</div>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.83rem", color:C.textMid, lineHeight:1.7 }}>{desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"1px", background:C.border, marginTop:"3rem", borderRadius:12, overflow:"hidden" }} className="dist-grid">
            {[["400 m","to the beach"],["15 min","to Cesena"],["25 min","to Bertinoro"],["35 min","to San Marino"],["50 min","to Ravenna"]].map(([v,l])=>(
              <div key={l} style={{ background:C.cardBg, padding:"1.25rem", textAlign:"center" }}>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"1.2rem", fontWeight:800, color:C.blue }}>{v}</div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.68rem", color:C.textSoft, textTransform:"uppercase", letterSpacing:"0.08em", marginTop:3 }}>{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <style>{`@media(max-width:768px){.exp-grid{grid-template-columns:1fr!important}.dist-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n:"01", t:"Choose your dates", b:"Check availability on Airbnb. Secure booking with payment protected by the platform.", color:C.blue },
    { n:"02", t:"Instant confirmation", b:"Receive your confirmation immediately, access instructions and local tips from Cesare.", color:C.blue },
    { n:"03", t:"Self check-in", b:"Smartlock — arrive whenever you like, no waiting for anyone. Your digital key is ready.", color:C.green },
    { n:"04", t:"Enjoy Cesenatico", b:"Bicycles in the garage, beach 400m away, full kitchen. Your holiday starts right away.", color:C.green },
  ];
  return (
    <section style={{ background:C.bg, padding:"6rem 1.5rem" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <Reveal>
          <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"0.5rem" }}>
            <div style={{ width:3, height:18, background:C.blue, borderRadius:2 }}/>
            <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.78rem", fontWeight:600, color:C.blue, textTransform:"uppercase", letterSpacing:"0.1em" }}>How it works</span>
          </div>
          <h2 style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:800, color:C.text, letterSpacing:"-0.03em", marginBottom:"3rem" }}>
            Booking as simple<br/>as it should be.
          </h2>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1.25rem" }} className="steps-grid">
          {steps.map(({n,t,b,color},i)=>(
            <Reveal key={n} delay={i*60}>
              <div style={{ background:C.cardBg, padding:"1.75rem", borderRadius:12, border:`1px solid ${C.border}`, height:"100%", boxSizing:"border-box", transition:"all 0.2s" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=color;e.currentTarget.style.boxShadow=`0 0 0 3px ${color}18`;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.boxShadow="none";}}>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.72rem", fontWeight:700, color, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"1rem" }}>{n}</div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"1rem", fontWeight:700, color:C.text, marginBottom:"0.5rem" }}>{t}</div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.82rem", color:C.textMid, lineHeight:1.7 }}>{b}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.steps-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { q:"The apartment is exactly as shown in the photos — welcoming, clean and full of every comfort. Perfect location, close to the sea and all services. The local tips were very helpful.", name:"Nicole", origin:"Paris", stars:5 },
    { q:"Found at the last minute. The apartment is clean and perfectly laid out. The private garage and bicycles were a huge plus — incredibly rare in the area.", name:"Emanuele", origin:"Rome", stars:5 },
    { q:"Lovely apartment, well maintained with everything you could want. The heating works perfectly. My family and I had a wonderful New Year here — thank you!", name:"Francesco", origin:"Como", stars:5 },
    { q:"Spacious, bright and full of every comfort. Excellent location, very close to the sea. We will definitely come back.", name:"Marco & Giulia", origin:"Milan", stars:5 },
  ];
  return (
    <section id="reviews" style={{ background:C.bg2, padding:"6rem 1.5rem" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <Reveal>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"2.5rem", flexWrap:"wrap", gap:"1rem" }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"0.5rem" }}>
                <div style={{ width:3, height:18, background:C.green, borderRadius:2 }}/>
                <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.78rem", fontWeight:600, color:C.green, textTransform:"uppercase", letterSpacing:"0.1em" }}>Reviews</span>
              </div>
              <h2 style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:800, color:C.text, letterSpacing:"-0.03em" }}>What our guests say.</h2>
            </div>
            <div style={{ display:"flex", gap:"1.5rem" }}>
              {[["★ 4.96","Rating"],["27","Reviews"],["100%","5 stars"]].map(([v,l])=>(
                <div key={l} style={{ background:C.cardBg, padding:"0.75rem 1.25rem", borderRadius:10, border:`1px solid ${C.border}`, textAlign:"center" }}>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"1.1rem", fontWeight:800, color:C.text }}>{v}</div>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.65rem", color:C.textSoft, textTransform:"uppercase", letterSpacing:"0.08em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1.25rem" }} className="rev-grid">
          {reviews.map(({q,name,origin,stars})=>(
            <Reveal key={name}>
              <div style={{ background:C.cardBg, padding:"1.75rem", borderRadius:12, border:`1px solid ${C.border}`, transition:"all 0.2s", boxShadow:C.shadow }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=C.shadowMd;}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=C.shadow;}}>
                <div style={{ display:"flex", gap:"2px", marginBottom:"1rem" }}>{Array(stars).fill("★").map((s,i)=><span key={i} style={{ color:"#FBBF24", fontSize:"0.85rem" }}>{s}</span>)}</div>
                <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.9rem", color:C.text, lineHeight:1.75, marginBottom:"1.25rem" }}>"{q}"</p>
                <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", borderTop:`1px solid ${C.border}`, paddingTop:"1rem" }}>
                  <div style={{ width:32, height:32, borderRadius:"50%", background:`linear-gradient(135deg, ${C.blue}, ${C.green})`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontFamily:"'Inter',sans-serif", fontSize:"0.75rem", fontWeight:700, flexShrink:0 }}>{name.charAt(0)}</div>
                  <div>
                    <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.82rem", fontWeight:600, color:C.text }}>{name}</div>
                    <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.72rem", color:C.textSoft }}>{origin}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.rev-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

function Location() {
  const places = [
    { icon:"🏖️", name:"Beach and sea", dist:"400 m", tag:"On foot" },
    { icon:"🛒", name:"Shops and restaurants", dist:"5 min", tag:"On foot" },
    { icon:"🌳", name:"Parco di Levante (40 ha)", dist:"4 min", tag:"On foot" },
    { icon:"🎡", name:"Kinderland children's park", dist:"2 min", tag:"On foot" },
    { icon:"⛵", name:"Leonardo da Vinci canal port", dist:"10 min", tag:"On foot" },
    { icon:"🚗", name:"Cesena", dist:"15 min", tag:"By car" },
    { icon:"🏖️", name:"Rimini", dist:"30 min", tag:"By car" },
    { icon:"🏰", name:"Republic of San Marino", dist:"35 min", tag:"By car" },
  ];
  return (
    <section id="location" style={{ background:C.bg, padding:"6rem 1.5rem" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <Reveal>
          <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"0.5rem" }}>
            <div style={{ width:3, height:18, background:C.blue, borderRadius:2 }}/>
            <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.78rem", fontWeight:600, color:C.blue, textTransform:"uppercase", letterSpacing:"0.1em" }}>Location</span>
          </div>
          <h2 style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:800, color:C.text, letterSpacing:"-0.03em", marginBottom:"3rem" }}>
            In the heart of Cesenatico.<br/><span style={{ color:C.blue }}>Close to everything.</span>
          </h2>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem" }} className="loc-grid">
          <Reveal>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
              {places.map(({icon,name,dist,tag})=>(
                <div key={name} style={{ background:C.cardBg, padding:"0.85rem 1rem", borderRadius:10, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:"0.75rem", transition:"all 0.2s" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=C.blue;e.currentTarget.style.background="rgba(59,130,246,0.02)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.cardBg;}}>
                  <span style={{ fontSize:"1.1rem", flexShrink:0 }}>{icon}</span>
                  <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.85rem", color:C.text, flex:1 }}>{name}</span>
                  <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.7rem", color:C.textSoft, background:C.bg2, padding:"0.15rem 0.5rem", borderRadius:999 }}>{tag}</span>
                  <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.85rem", fontWeight:700, color:C.blue, whiteSpace:"nowrap" }}>{dist}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
              <div style={{ background:"linear-gradient(135deg, rgba(59,130,246,0.06), rgba(16,185,129,0.06))", border:`1px solid rgba(59,130,246,0.15)`, borderRadius:12, padding:"1.5rem" }}>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.72rem", fontWeight:600, color:C.blue, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"0.75rem" }}>The Neighbourhood</div>
                <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.88rem", color:C.textMid, lineHeight:1.8, margin:0 }}>
                  Cesenatico is one of the most beloved seaside resorts on the Riviera. Near the canal port designed by Leonardo da Vinci, with restaurants, shops and services within walking distance.
                </p>
              </div>
              <div style={{ background:C.cardBg, border:`1px solid ${C.border}`, borderRadius:12, padding:"1.5rem" }}>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.72rem", fontWeight:600, color:C.textSoft, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"0.75rem" }}>Address</div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.88rem", color:C.text, lineHeight:1.7 }}>{contactInfo.address}</div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.78rem", color:C.textSoft, marginTop:"0.5rem" }}>Exact location provided after booking.</div>
              </div>
              <div style={{ background:C.cardBg, border:`1px solid ${C.border}`, borderRadius:12, padding:"1.5rem" }}>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.72rem", fontWeight:600, color:C.textSoft, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"0.75rem" }}>Host · Superhost</div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.88rem", color:C.text, fontWeight:600 }}>Cesare</div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.78rem", color:C.textSoft, marginTop:"0.25rem" }}>100% response rate · Responds within 1 hour</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`@media(max-width:768px){.loc-grid{grid-template-columns:1fr!important;gap:2rem!important}}`}</style>
    </section>
  );
}

function FinalCTA() {
  return (
    <section style={{ background:C.text, padding:"7rem 1.5rem", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:-100, right:-100, width:400, height:400, borderRadius:"50%", background:"rgba(59,130,246,0.08)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:-80, left:-80, width:300, height:300, borderRadius:"50%", background:"rgba(16,185,129,0.06)", pointerEvents:"none" }}/>
      <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
        <Reveal>
          <div style={{ display:"flex", justifyContent:"center", gap:"0.5rem", marginBottom:"1.5rem" }}>
            <Tag color={C.green}>★ 4.96 Guest Favourite</Tag>
            <Tag color={C.blue}>27 Reviews</Tag>
          </div>
          <h2 style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(2rem,5vw,3.8rem)", fontWeight:800, color:"#fff", letterSpacing:"-0.03em", lineHeight:1.1, marginBottom:"1.25rem" }}>
            Your summer in Cesenatico<br/><span style={{ color:C.blue }}>starts here.</span>
          </h2>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"1rem", color:"rgba(255,255,255,0.65)", lineHeight:1.8, maxWidth:520, margin:"0 auto 2.5rem" }}>
            Summer dates fill up fast. Check availability on Airbnb and book your stay by the sea.
          </p>
          <a href={config.airbnbUrl} target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:"0.6rem", background:C.blue, color:"#fff", padding:"1.1rem 2.5rem", borderRadius:12, fontSize:"0.9rem", fontWeight:700, textDecoration:"none", fontFamily:"'Inter',sans-serif", boxShadow:"0 8px 24px rgba(59,130,246,0.35)", transition:"all 0.25s" }}
            onMouseEnter={e=>{e.currentTarget.style.background="#2563EB";e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.background=C.blue;e.currentTarget.style.transform="translateY(0)";}}>
            Check availability on Airbnb ↗
          </a>
          <div style={{ marginTop:"1.25rem", fontFamily:"'Inter',sans-serif", fontSize:"0.75rem", color:"rgba(255,255,255,0.4)", letterSpacing:"0.06em" }}>
            Secure booking · Instant confirmation · Rating 4.96 stars
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background:"#111827", borderTop:"1px solid rgba(255,255,255,0.06)", padding:"3.5rem 1.5rem 2rem" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:"3rem", marginBottom:"3rem" }} className="footer-grid">
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"0.5rem" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:C.blue }}/>
              <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.95rem", fontWeight:700, color:"#fff" }}>La Perla del Mare</div>
            </div>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.78rem", color:"rgba(255,255,255,0.4)", marginBottom:"1rem" }}>Holiday apartment · Cesenatico · IT</div>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.82rem", color:"rgba(255,255,255,0.55)", lineHeight:1.75 }}>{contactInfo.address}</div>
            <div style={{ marginTop:"0.75rem" }}>
              <a href={`tel:${contactInfo.phone}`} style={{ display:"block", fontFamily:"'Inter',sans-serif", fontSize:"0.82rem", color:"rgba(255,255,255,0.55)", textDecoration:"none", marginBottom:"0.3rem", transition:"color 0.2s" }} onMouseEnter={e=>e.target.style.color=C.blue} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.55)"}>{contactInfo.phone}</a>
              <a href={`mailto:${contactInfo.email}`} style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.82rem", color:"rgba(255,255,255,0.55)", textDecoration:"none", transition:"color 0.2s" }} onMouseEnter={e=>e.target.style.color=C.blue} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.55)"}>{contactInfo.email}</a>
            </div>
          </div>
          <div>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.7rem", fontWeight:600, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"1rem" }}>Navigate</div>
            {[["Apartment","#apartment"],["Experiences","#experiences"],["Location","#location"],["Reviews","#reviews"]].map(([l,h])=>(
              <a key={l} href={h} style={{ display:"block", fontFamily:"'Inter',sans-serif", fontSize:"0.85rem", color:"rgba(255,255,255,0.55)", textDecoration:"none", marginBottom:"0.5rem", transition:"color 0.2s" }} onMouseEnter={e=>e.target.style.color=C.blue} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.55)"}>{l}</a>
            ))}
          </div>
          <div>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.7rem", fontWeight:600, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"1rem" }}>Book & Social</div>
            <a href={config.airbnbUrl} target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-block", background:C.blue, color:"#fff", padding:"0.55rem 1.1rem", borderRadius:8, fontSize:"0.78rem", fontWeight:600, textDecoration:"none", fontFamily:"'Inter',sans-serif", marginBottom:"1rem", transition:"background 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.background="#2563EB"} onMouseLeave={e=>e.currentTarget.style.background=C.blue}>
              Airbnb ↗
            </a>
            <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer"
              style={{ display:"block", fontFamily:"'Inter',sans-serif", fontSize:"0.82rem", color:"rgba(255,255,255,0.55)", textDecoration:"none", transition:"color 0.2s" }} onMouseEnter={e=>e.target.style.color=C.blue} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.55)"}>
              @luceacollection_ ↗
            </a>
            <div style={{ marginTop:"1.25rem", display:"flex", gap:"0.5rem" }}>
              <a href={config.langIT} style={{ fontSize:"0.72rem", fontWeight:500, color:"rgba(255,255,255,0.4)", textDecoration:"none", padding:"0.25rem 0.6rem", borderRadius:6, background:"rgba(255,255,255,0.06)", transition:"color 0.2s" }} onMouseEnter={e=>e.target.style.color=C.blue} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.4)"}>IT</a>
              <a href={config.langEN} style={{ fontSize:"0.72rem", fontWeight:700, color:C.blue, textDecoration:"none", padding:"0.25rem 0.6rem", borderRadius:6, background:"rgba(59,130,246,0.15)" }}>EN</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:"1.25rem", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"0.5rem" }}>
          <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.72rem", color:"rgba(255,255,255,0.3)" }}>© {new Date().getFullYear()} La Perla del Mare · Cesenatico · IT040008B4TXYYNLI4</div>
          <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.72rem", color:"rgba(255,255,255,0.3)" }}>Secure booking via Airbnb</div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.footer-grid{grid-template-columns:1fr!important;gap:2rem!important}}`}</style>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #F9FAFB; color: #1F2937; -webkit-font-smoothing: antialiased; }
        ::selection { background: rgba(59,130,246,0.2); color: #1F2937; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #F9FAFB; }
        ::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.3); border-radius: 3px; }
      `}</style>
      <Nav />
      <Hero />
      <Apartment />
      <Experience />
      <HowItWorks />
      <Testimonials />
      <Location />
      <FinalCTA />
      <Footer />
    </>
  );
}
