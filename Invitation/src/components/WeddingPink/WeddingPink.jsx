import { useState, useEffect } from "react";

const Rose = ({ size = 1, style }) => (
  <svg viewBox="0 0 100 100" style={{ width: size * 70, height: size * 70, flexShrink: 0, ...style }} xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(50,50)">
      {[0,45,90,135,180,225,270,315].map(r=><ellipse key={r} cx="0" cy="-18" rx="10" ry="14" fill={r%90===0?"#f9a8c0":"#f4829c"} transform={`rotate(${r})`}/>)}
      {[22,67,112,157,202,247].map(r=><ellipse key={r} cx="0" cy="-12" rx="8" ry="11" fill={r%45===22?"#f06292":"#ec4899"} transform={`rotate(${r})`}/>)}
      {[30,90,150,210,270].map(r=><ellipse key={r} cx="0" cy="-7" rx="6" ry="8" fill={r%60===30?"#db2777":"#be185d"} transform={`rotate(${r})`}/>)}
      <circle cx="0" cy="0" r="5" fill="#9d174d"/>
    </g>
  </svg>
);

const Divider = () => (
  <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:8,margin:"12px 0"}}>
    <div style={{width:32,height:0.5,background:"#f48fb1"}}/>
    <Rose size={0.22}/>
    <div style={{width:32,height:0.5,background:"#f48fb1"}}/>
  </div>
);

const PhotoBox = ({ label, role }) => (
  <div style={{display:"flex",flexDirection:"column",alignItems:"center",flex:1}}>
    <div style={{width:110,height:110,borderRadius:"50%",background:"linear-gradient(135deg,#fce4ec,#f8bbd0,#f48fb1)",border:"3px solid #fff",boxShadow:"0 4px 16px rgba(236,72,153,0.18)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
      <svg viewBox="0 0 80 80" width="60" height="60" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="28" r="15" fill="#f48fb1"/>
        <ellipse cx="40" cy="66" rx="22" ry="17" fill="#f48fb1"/>
      </svg>
    </div>
    <p style={{fontFamily:"'Great Vibes',cursive",fontSize:26,color:"#9d174d",margin:"10px 0 2px",lineHeight:1}}>{label}</p>
    <p style={{fontSize:9,color:"#be185d",letterSpacing:2,margin:0,textTransform:"uppercase",textAlign:"center",lineHeight:1.4}}>{role}</p>
  </div>
);

export default function WeddingPink() {
  const [tab, setTab] = useState("acara");
  const [opened, setOpened] = useState(false);
  const [cd, setCd] = useState({d:0,h:0,m:0,s:0});
  const [wishes, setWishes] = useState([
    {name:"Budi Santoso",msg:"Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Barakallah! 🌸",attend:"hadir",time:"2 jam lalu"},
    {name:"Sari Dewi",msg:"Selamat menempuh hidup baru, semoga bahagia selalu dan langgeng ya kak!",attend:"hadir",time:"5 jam lalu"},
  ]);
  const [form, setForm] = useState({name:"",msg:"",attend:"hadir"});
  const [sent, setSent] = useState(false);

  useEffect(()=>{
    const target = new Date("2025-09-20T09:00:00");
    const t = setInterval(()=>{
      const diff = target - new Date();
      if(diff>0) setCd({d:Math.floor(diff/86400000),h:Math.floor(diff%86400000/3600000),m:Math.floor(diff%3600000/60000),s:Math.floor(diff%60000/1000)});
    },1000);
    return ()=>clearInterval(t);
  },[]);

  const submit = () => {
    if(!form.name.trim()||!form.msg.trim()) return;
    setWishes([{...form,time:"Baru saja"},...wishes]);
    setForm({name:"",msg:"",attend:"hadir"});
    setSent(true); setTimeout(()=>setSent(false),3000);
  };

  const tabs = ["Acara","Hitung Mundur","Lokasi","Ucapan"];

  return (
    <div style={{fontFamily:"'Josefin Sans',sans-serif",background:"#fff5f7",minHeight:"100vh",WebkitTextSizeAdjust:"100%"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Josefin+Sans:wght@200;300;400&family=Great+Vibes&display=swap');
        *{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes petal{0%{transform:translateY(-10px) rotate(0deg) translateX(0);opacity:1}100%{transform:translateY(100vh) rotate(360deg) translateX(30px);opacity:0}}
        .tab-btn{background:none;border:none;border-bottom:2px solid transparent;padding:10px 10px 8px;font-family:'Josefin Sans',sans-serif;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#be185d;cursor:pointer;white-space:nowrap;transition:all 0.2s;-webkit-appearance:none;}
        .tab-btn.on{border-bottom-color:#ec4899;color:#9d174d;font-weight:400;}
        .inp{width:100%;border:1px solid #fce4ec;border-radius:10px;padding:11px 14px;font-family:'Josefin Sans',sans-serif;font-size:14px;color:#4a0010;background:#fff;outline:none;-webkit-appearance:none;}
        .inp:focus{border-color:#f48fb1;}
        .btn-pink{background:linear-gradient(135deg,#f48fb1,#ec4899);color:#fff;border:none;border-radius:24px;padding:12px 28px;font-family:'Josefin Sans',sans-serif;font-size:12px;letter-spacing:2px;cursor:pointer;-webkit-appearance:none;display:inline-block;}
      `}</style>

      {/* Falling petals */}
      {[10,25,40,55,70,85].map((l,i)=>(
        <div key={i} style={{position:"fixed",top:-20,left:`${l}%`,width:10,height:7,borderRadius:"50% 0",background:"rgba(249,168,192,0.45)",animation:`petal ${4+i*0.7}s ${i*0.9}s linear infinite`,pointerEvents:"none",zIndex:0}}/>
      ))}

      {/* Cover screen */}
      {!opened && (
        <div style={{position:"fixed",inset:0,zIndex:50,background:"linear-gradient(160deg,#fff0f4,#fce4ec,#fdf2f8)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,animation:"fadeUp 0.7s ease"}}>
          <div style={{position:"absolute",top:16,right:8,opacity:0.3}}><Rose size={0.7}/></div>
          <div style={{position:"absolute",bottom:32,left:8,opacity:0.3}}><Rose size={0.55}/></div>
          <p style={{fontSize:10,letterSpacing:4,color:"#be185d",textTransform:"uppercase",margin:"0 0 8px",textAlign:"center"}}>Undangan Pernikahan</p>
          <h1 style={{fontFamily:"'Great Vibes',cursive",fontSize:"clamp(48px,14vw,72px)",color:"#9d174d",margin:"4px 0",textAlign:"center",lineHeight:1.1}}>Rizky & Annisa</h1>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:15,color:"#be185d",margin:"8px 0 32px",textAlign:"center"}}>20 September 2025</p>
          <Divider/>
          <button className="btn-pink" onClick={()=>setOpened(true)} style={{marginTop:28}}>Buka Undangan</button>
        </div>
      )}

      <div style={{maxWidth:480,margin:"0 auto"}}>
        {/* Header */}
        <div style={{background:"linear-gradient(175deg,#fff0f4,#fce4ec,#fff5f7)",padding:"52px 20px 36px",textAlign:"center",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-16,left:-16,opacity:0.35}}><Rose size={0.9}/></div>
          <div style={{position:"absolute",top:-16,right:-16,opacity:0.35}}><Rose size={0.9}/></div>
          <p style={{fontSize:9,letterSpacing:4,color:"#be185d",textTransform:"uppercase",margin:"0 0 6px"}}>Bismillahirrahmanirrahim</p>
          <h1 style={{fontFamily:"'Great Vibes',cursive",fontSize:"clamp(44px,13vw,68px)",color:"#9d174d",margin:"0 0 4px",lineHeight:1.1}}>Rizky & Annisa</h1>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",color:"#be185d",fontSize:14,margin:"6px 0 28px",letterSpacing:0.5}}>Menyatu dalam ikatan suci</p>

          {/* Couple photos */}
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:12,margin:"0 0 28px"}}>
            <PhotoBox label="Rizky" role={"Mempelai\nPria"}/>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,flexShrink:0}}>
              <Rose size={0.35}/>
              <span style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:24,color:"#f48fb1",lineHeight:1}}>&</span>
              <Rose size={0.35}/>
            </div>
            <PhotoBox label="Annisa" role={"Mempelai\nWanita"}/>
          </div>

          <blockquote style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:"#9d174d",lineHeight:1.9,fontStyle:"italic",margin:"0 auto",maxWidth:320,padding:"0 8px"}}>
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri supaya kamu cenderung dan merasa tenteram kepadanya."
            <br/><span style={{fontSize:11,color:"#be185d",fontStyle:"normal"}}>QS. Ar-Rum: 21</span>
          </blockquote>
        </div>

        {/* Sticky nav */}
        <nav style={{display:"flex",justifyContent:"center",background:"#fff",borderBottom:"0.5px solid #fce4ec",position:"sticky",top:0,zIndex:10,overflowX:"auto",gap:0}}>
          {tabs.map(t=>(
            <button key={t} className={`tab-btn${tab===t.toLowerCase().replace(" ","")?" on":""}`} onClick={()=>setTab(t.toLowerCase().replace(" ",""))}>{t}</button>
          ))}
        </nav>

        {/* ACARA */}
        {tab==="acara" && (
          <div style={{padding:"32px 16px",animation:"fadeUp 0.5s ease"}}>
            <p style={{fontSize:10,letterSpacing:3,color:"#be185d",textTransform:"uppercase",textAlign:"center",margin:"0 0 4px"}}>Rangkaian Acara</p>
            <Divider/>
            <div style={{marginTop:20,display:"flex",flexDirection:"column",gap:12}}>
              {[{icon:"🕌",label:"Akad Nikah",time:"08.00 – 10.00 WIB",date:"Sabtu, 20 September 2025"},
                {icon:"🌸",label:"Resepsi",time:"11.00 – 15.00 WIB",date:"Sabtu, 20 September 2025"}].map((e,i)=>(
                <div key={i} style={{background:"#fff",border:"0.5px solid #fce4ec",borderRadius:14,padding:"16px",display:"flex",gap:14,alignItems:"center",boxShadow:"0 2px 12px rgba(236,72,153,0.06)"}}>
                  <div style={{width:48,height:48,borderRadius:"50%",background:"#fce4ec",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{e.icon}</div>
                  <div>
                    <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:19,color:"#9d174d",fontWeight:600,margin:"0 0 3px"}}>{e.label}</p>
                    <p style={{fontSize:12,color:"#be185d",margin:"0 0 2px",letterSpacing:0.5}}>{e.time}</p>
                    <p style={{fontSize:11,color:"#d4788c",margin:0}}>{e.date}</p>
                  </div>
                </div>
              ))}
              <div style={{background:"#fff",border:"0.5px solid #fce4ec",borderRadius:14,padding:"16px",boxShadow:"0 2px 12px rgba(236,72,153,0.06)"}}>
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:"#9d174d",fontWeight:600,margin:"0 0 6px"}}>📍 Lokasi</p>
                <p style={{fontSize:13,color:"#be185d",margin:"0 0 3px",fontWeight:300}}>Gedung Graha Permai</p>
                <p style={{fontSize:12,color:"#d4788c",margin:0,lineHeight:1.6}}>Jl. Kartini No. 45, Kelurahan Sukorejo<br/>Kota Blitar, Jawa Timur 66117</p>
              </div>
            </div>
          </div>
        )}

        {/* HITUNG MUNDUR */}
        {tab==="hitungmundur" && (
          <div style={{padding:"32px 16px",textAlign:"center",animation:"fadeUp 0.5s ease"}}>
            <p style={{fontSize:10,letterSpacing:3,color:"#be185d",textTransform:"uppercase",margin:"0 0 4px"}}>Hitung Mundur</p>
            <Divider/>
            <p style={{fontFamily:"'Great Vibes',cursive",fontSize:"clamp(28px,9vw,40px)",color:"#9d174d",margin:"16px 0 8px"}}>20 September 2025</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,margin:"20px 0",maxWidth:340,marginLeft:"auto",marginRight:"auto"}}>
              {[["Hari",cd.d],["Jam",cd.h],["Menit",cd.m],["Detik",cd.s]].map(([l,v])=>(
                <div key={l} style={{background:"#fff",border:"0.5px solid #fce4ec",borderRadius:12,padding:"14px 8px",boxShadow:"0 2px 10px rgba(236,72,153,0.07)"}}>
                  <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(28px,8vw,40px)",color:"#9d174d",fontWeight:600,margin:"0 0 4px",lineHeight:1}}>{String(v).padStart(2,"0")}</p>
                  <p style={{fontSize:9,color:"#be185d",letterSpacing:1.5,margin:0,textTransform:"uppercase"}}>{l}</p>
                </div>
              ))}
            </div>
            <div style={{marginTop:24}}><Rose size={0.65} style={{margin:"0 auto"}}/></div>
          </div>
        )}

        {/* LOKASI */}
        {tab==="lokasi" && (
          <div style={{padding:"32px 16px",animation:"fadeUp 0.5s ease"}}>
            <p style={{fontSize:10,letterSpacing:3,color:"#be185d",textTransform:"uppercase",textAlign:"center",margin:"0 0 4px"}}>Lokasi Acara</p>
            <Divider/>
            <div style={{background:"#fff",border:"0.5px solid #fce4ec",borderRadius:16,overflow:"hidden",boxShadow:"0 2px 14px rgba(236,72,153,0.08)",marginTop:20}}>
              <div style={{background:"linear-gradient(135deg,#fce4ec,#fff0f4)",padding:"36px 16px",textAlign:"center"}}>
                <div style={{fontSize:36,marginBottom:8}}>📍</div>
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:"#9d174d",fontWeight:600,margin:0}}>Gedung Graha Permai</p>
              </div>
              <div style={{padding:"20px 20px 24px"}}>
                <p style={{fontSize:13,color:"#4a0010",lineHeight:1.7,marginBottom:20}}>Jl. Kartini No. 45, Kelurahan Sukorejo,<br/>Kota Blitar, Jawa Timur 66117</p>
                <a href="https://maps.google.com" style={{display:"inline-block",background:"linear-gradient(135deg,#f48fb1,#ec4899)",color:"#fff",borderRadius:24,padding:"11px 24px",fontSize:11,letterSpacing:2,textDecoration:"none",textTransform:"uppercase"}}>Buka Google Maps</a>
              </div>
            </div>
          </div>
        )}

        {/* UCAPAN */}
        {tab==="ucapan" && (
          <div style={{padding:"32px 16px",animation:"fadeUp 0.5s ease"}}>
            <p style={{fontSize:10,letterSpacing:3,color:"#be185d",textTransform:"uppercase",textAlign:"center",margin:"0 0 4px"}}>Kirim Ucapan & Doa</p>
            <Divider/>
            <div style={{background:"#fff",border:"0.5px solid #fce4ec",borderRadius:16,padding:"20px 16px",marginTop:20,marginBottom:20,boxShadow:"0 2px 12px rgba(236,72,153,0.06)"}}>
              <input className="inp" placeholder="Nama Anda" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{marginBottom:10}}/>
              <textarea className="inp" placeholder="Tulis ucapan & doa untuk kedua mempelai..." value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} rows={3} style={{marginBottom:12,resize:"none"}}/>
              <p style={{fontSize:10,color:"#be185d",letterSpacing:1.5,margin:"0 0 8px",textTransform:"uppercase"}}>Konfirmasi Kehadiran</p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
                {["hadir","tidak hadir","masih ragu"].map(o=>(
                  <label key={o} style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:form.attend===o?"#9d174d":"#d4788c",cursor:"pointer",padding:"6px 12px",border:`1px solid ${form.attend===o?"#f48fb1":"#fce4ec"}`,borderRadius:20,background:form.attend===o?"#fce4ec":"transparent",transition:"all 0.2s"}}>
                    <input type="radio" name="att" value={o} checked={form.attend===o} onChange={()=>setForm({...form,attend:o})} style={{display:"none"}}/>{o.charAt(0).toUpperCase()+o.slice(1)}
                  </label>
                ))}
              </div>
              <div style={{textAlign:"right"}}>
                <button className="btn-pink" onClick={submit}>Kirim Ucapan ✉</button>
              </div>
              {sent && <p style={{textAlign:"center",color:"#ec4899",fontSize:12,marginTop:12,fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic"}}>Terima kasih atas doa & ucapannya 🌸</p>}
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {wishes.map((w,i)=>(
                <div key={i} style={{background:"#fff",border:"0.5px solid #fce4ec",borderRadius:12,padding:"14px 16px",boxShadow:"0 1px 8px rgba(236,72,153,0.04)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                    <div style={{display:"flex",gap:9,alignItems:"center"}}>
                      <div style={{width:32,height:32,borderRadius:"50%",background:"#fce4ec",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"#9d174d",fontFamily:"'Cormorant Garamond',serif",fontWeight:600,flexShrink:0}}>{w.name[0]}</div>
                      <div>
                        <p style={{fontSize:13,color:"#4a0010",fontWeight:400,margin:0,lineHeight:1.2}}>{w.name}</p>
                        <span style={{fontSize:10,color:w.attend==="hadir"?"#059669":w.attend==="tidak hadir"?"#be185d":"#d4788c",letterSpacing:0.5}}>
                          {w.attend==="hadir"?"✓ Hadir":w.attend==="tidak hadir"?"✗ Tidak hadir":"? Masih ragu"}
                        </span>
                      </div>
                    </div>
                    <span style={{fontSize:10,color:"#d4788c",flexShrink:0}}>{w.time}</span>
                  </div>
                  <p style={{fontSize:13,color:"#4a0010",lineHeight:1.7,margin:0,fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic"}}>{w.msg}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer style={{textAlign:"center",padding:"28px 20px 40px",borderTop:"0.5px solid #fce4ec",marginTop:8}}>
          <Rose size={0.5} style={{margin:"0 auto 10px"}}/>
          <p style={{fontFamily:"'Great Vibes',cursive",fontSize:"clamp(28px,9vw,36px)",color:"#9d174d",margin:"0 0 4px"}}>Rizky & Annisa</p>
          <p style={{fontSize:9,color:"#d4788c",letterSpacing:2,margin:"0 0 14px"}}>20 SEPTEMBER 2025</p>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:12,color:"#be185d",lineHeight:1.9,margin:0}}>Merupakan suatu kehormatan bagi kami apabila<br/>Bapak/Ibu/Saudara/i berkenan hadir<br/>memberikan doa restu</p>
        </footer>
      </div>
    </div>
  );
}
