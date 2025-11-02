import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseInit";
import { useParams } from "react-router-dom";

export default function Invite(){
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function load(){
      try{
        const d = await getDoc(doc(db, "invites", id));
        if(d.exists()){
          setData(d.data());
        } else {
          setData({ notFound: true });
        }
      }catch(err){
        console.error(err);
        setData({ error: true });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if(loading) return <div>Đang tải...</div>;
  if(data?.notFound) return <div>Không tìm thấy thiệp.</div>;
  if(data?.error) return <div>Lỗi khi tải dữ liệu.</div>;

  return (
    <div style={{maxWidth:720, margin:'20px auto'}}>
      <div className="card" style={{textAlign:'center'}}>
        <h2>Thân mời: {data.name}</h2>
        {data.photoURL ? <img src={data.photoURL} alt="guest" style={{maxWidth:240, borderRadius:12}} /> : null}
        <p style={{whiteSpace:'pre-wrap', marginTop:12}}>{data.message || "Rất vui được đón bạn tới dự đám cưới của Đức & Trúc!"}</p>
        <p style={{marginTop:12}}>📅 <b>Ngày:</b> 01/01/2026 &nbsp; 📍 <b>Địa điểm:</b> Nhà hàng ABC</p>
        <div style={{marginTop:12}}>
          <a href="https://www.google.com/maps" target="_blank" rel="noreferrer">Xem địa điểm trên Google Maps</a>
        </div>
      </div>
    </div>
  )
}