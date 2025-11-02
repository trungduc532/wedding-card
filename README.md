# Thiệp cưới - Project (React + Firebase)

Mô tả: Ứng dụng đơn giản cho phép vợ/bạn nhập tên người nhận và ảnh, tạo một link thiệp cá nhân: `/invite/:id`.

## Các bước sử dụng

1. Cài Node.js (>=16) và npm.
2. Tải project (file zip kèm theo) và giải nén, hoặc clone.
3. Mở terminal trong thư mục project.

```bash
npm install
```

4. **Cấu hình Firebase**
- Tạo project trên https://console.firebase.google.com
- Bật **Firestore (native mode)** và **Storage**.
- Tạo Web App và copy config (apiKey, projectId, ...).
- Dán vào `src/firebaseConfig.js` thay thế phần `REPLACE_ME`.

5. Cài thêm `react-router-dom`:
```bash
npm install react-router-dom
```

(Lưu ý: `react-router-dom` không được liệt kê trong package.json để giữ file gọn. Chạy lệnh trên để thêm.)

6. Chạy dev:
```bash
npm run dev
```
Mở trình duyệt tới `http://localhost:5173`

7. Mở `/admin` để tạo thiệp cho khách mời. Sau khi tạo, bạn sẽ được điều hướng đến `/invite/:id` — đó là link để gửi cho khách mời.

## Triển khai
- Đẩy repo lên GitHub, deploy bằng Vercel (1 click) hoặc Firebase Hosting.
- Trước khi deploy, đảm bảo `firebaseConfig.js` đã chứa config thật.

## Ghi chú / nâng cao
- Hiện admin chưa bảo mật. Bạn có thể tích hợp `Firebase Authentication` để chỉ cho phép vợ bạn truy cập.
- Bạn có thể thêm meta tags đẹp cho social sharing (OpenGraph).
- Thích hợp cho desktop + mobile.

