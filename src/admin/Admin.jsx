import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebaseInit";
import { useNavigate } from "react-router-dom";

export default function Admin(){
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  async function onCreate(e){
    e.preventDefault();
    if(!name){ alert("Nhập tên người nhận"); return; }
    setCreating(true);
    try{
      let photoURL = "";
      if(file){
        const storageRef = ref(storage, `invites/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        photoURL = await getDownloadURL(storageRef);
      }
      const docRef = await addDoc(collection(db, "invites"), {
        name, message, photoURL, createdAt: serverTimestamp()
      });
      const id = docRef.id;
      const link = `${window.location.origin}/invite/${id}`;
      alert("Tạo thành công! Link: " + link);
      navigate(`/invite/${id}`);
    }catch(err){
      console.error(err);
      alert("Lỗi khi tạo thiệp. Kiểm tra console.");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="card" style={{maxWidth:600}}>
      <h2>Tạo thiệp mới</h2>
      <form onSubmit={onCreate} style={{display:'grid', gap:12}}>
        <label> Tên người nhận
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Ví dụ: Anh Nam" />
        </label>
        <label> Ảnh (tùy chọn)
          <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} />
        </label>
        <label> Lời nhắn (tùy chọn)
          <textarea value={message} onChange={e=>setMessage(e.target.value)} rows={4} />
        </label>
        <div style={{display:'flex', gap:8}}>
          <button type="submit" disabled={creating}>{creating ? "Đang tạo..." : "Tạo thiệp"}</button>
          <button type="button" onClick={()=>{setName(""); setMessage(""); setFile(null);}}>Reset</button>
        </div>
      </form>
      <hr />
      <p>Lưu ý: Trang admin chưa có bảo mật mạnh. Bạn có thể triển khai authentication Firebase hoặc chỉ dùng trang này trong môi trường an toàn.</p>
    </div>
  )
}