# Hướng Dẫn Khởi Chạy & Trải Nghiệm Micro-Prototypes (A/B/C)

Tài liệu này cung cấp liên kết và hướng dẫn vận hành bộ prototype tương tác Human–AI phục vụ bài lab Day 18 & 19 (Track 1 — Codelab VLearn K4).

---

## 1. LIÊN KẾT TRỰC TIẾP ĐẾN PROTOTYPE

### 1.1. Khởi Chạy Bộ Prototype Tương Tác Ngoại Tuyến (Offline-First via `file://`)
Toàn bộ mã nguồn ứng dụng được xây dựng hoàn toàn bằng Native HTML5, CSS3 và Vanilla JavaScript hiện đại, không sử dụng bất kỳ thư viện bên ngoài (Zero Dependencies), không yêu cầu font CDN hay kết nối mạng, sẵn sàng chạy ngay khi mở tệp:

* **Liên kết tương đối trong Repository (Nhấp mở trực tiếp):**  
  👉 [**Mở Prototype Trực Tiếp: `prototype/index.html`**](prototype/index.html)
* **Đường dẫn tệp trong repo:**  
  `prototype/index.html`
* **Đường dẫn tuyệt đối trên máy tính cục bộ:**  
  `file:///D:/Lab/Track1-Day19-2A202602695-TranPhamThaiVu/prototype/index.html`
* **Hướng dẫn mở trên trình duyệt:**  
  1. **Cách 1 (Nhanh nhất):** Nhấp đúp chuột trực tiếp vào tệp [`prototype/index.html`](prototype/index.html) trong thư mục dự án.  
  2. **Cách 2:** Mở trình duyệt web bất kỳ (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari), nhấn `Ctrl + O` (hoặc kéo thả tệp `index.html` vào tab trình duyệt).  
  3. **Cách 3:** Dán đường dẫn `file:///D:/Lab/Track1-Day19-2A202602695-TranPhamThaiVu/prototype/index.html` vào thanh địa chỉ của trình duyệt.

*(Lưu ý: Toàn bộ thư mục `prototype/` đã được commit và theo dõi trực tiếp trong git repository bao gồm `index.html`, `style.css`, `app.js` và test suite `check.cjs`, đảm bảo người chấm/người dùng clone repo về có thể mở và kiểm thử offline ngay lập tức).*

### 1.2. Kiểm Tra Cú Pháp & Kiểm Thử Hồi Quy Cục Bộ (Node.js)
Bạn có thể chạy kiểm tra cú pháp và bộ kiểm thử hồi quy tương tác (regression test) đã tích hợp sẵn trong repo thông qua Node.js (sử dụng module built-in `assert` và `vm`, không cần cài thêm package):
```powershell
# Kiểm tra cú pháp JavaScript
node --check prototype/app.js

# Chạy bộ kiểm thử hồi quy 6 kịch bản tương tác với DOM stub
node prototype/check.cjs
```
*Lưu ý kỹ thuật:* Bộ test suite `prototype/check.cjs` thực thi trực tiếp logic ứng dụng và các event handler thông qua một DOM stub tối giản của Node.js kết hợp trình biên dịch `vm.Script`, đảm bảo toàn bộ 6/6 kịch bản tương tác (A, B, C, storage guard, recovery actions, exact fixture validation) đều đạt chuẩn 100% trước khi đưa vào thử nghiệm người dùng.

---

## 2. HƯỚNG DẪN DÀNH CHO NGƯỜI QUAN SÁT (FACILITATOR)

Khi đóng vai trò người điều phối phiên thử nghiệm (Facilitator - Trần Phạm Thái Vũ):

1. **Mở Bảng Quan Sát (Observer Drawer):**  
   - Bấm vào nút **“📋 Bảng Quan Sát Tester”** ở góc trên bên phải màn hình.
   - Bảng trượt sẽ mở ra, hiển thị sẵn:
     - Lệnh tác vụ trung tính (Outcome Task cho Bài tập chung Day 12).
     - 3 câu cứu hộ trung tính (Neutral Rescue Prompts).
     - Danh sách các điểm cần quan sát (What to watch for).
     - Ô ghi chép tức thời (Observer Scratchpad) để ghi lại hành vi và phát ngôn nguyên văn của tester.
2. **Quy tắc quan sát bất di bất dịch:**  
   - Tuyệt đối **không giải thích trước** cách thức hoạt động của các nút bấm.
   - Tuyệt đối **không mớm lời** hay chỉ tay vào nút bấm nào.
   - Để người tham gia tự do đọc terminal, đọc code và chọn tab để thao tác.

---

## 3. CÁC TÍNH NĂNG VÀ CƠ CHẾ TƯƠNG TÁC THEN CHỐT CẦN THỬ NGHIỆM

### 3.1. Khung Bối Cảnh Dùng Chung (70% Common Context)
* **Terminal Error Output:** Hiển thị thông báo container crash thực tế trên Google Cloud Run (`Container failed to start listening on port 8080`).
* **Trình soạn thảo mã nguồn `server.js`:** 
  - Hiển thị đoạn mã ban đầu đang mắc 2 lỗi kinh điển: hardcode `PORT = 3000` và bind `localhost`.
  - Cho phép người dùng chỉnh sửa trực tiếp bằng bàn phím.
* **Nút “Chạy thử Deploy (Simulated Fixture Check)”:**
  - Kiểm tra xem mã nguồn hiện tại đã đáp ứng Hợp đồng Container của Cloud Run hay chưa (đọc `process.env.PORT` và bind `0.0.0.0`), đồng thời bóc tách comment để ngăn chặn comment spoofing.
  - Nếu mã rỗng hoặc chưa sửa đúng lỗi: Báo lỗi chi tiết, không bao giờ tạo thông báo thành công giả tạo (no fake success).
  - Nếu sửa đúng: Báo thành công kèm ghi chú minh bạch đây là kiểm tra mô phỏng giả lập theo mẫu giáo cụ của bài học.

### 3.2. Option A: Guided Checklist & Grounded Search (Quyền Người Dùng ~85%)
1. Bấm nút **“🔍 Mở Checklist Kiểm Tra Lỗi Cloud Run”** để hiển thị 3 điểm mấu chốt có kèm trích dẫn tài liệu chính thống.
2. Thử nghiệm hộp tra cứu ngữ cảnh:
   - Gõ từ khóa `PORT` $\to$ Xem trích dẫn về việc Cloud Run tiêm biến môi trường.
   - Gõ từ khóa `localhost` $\to$ Xem giải thích vì sao phải bind `0.0.0.0`.
   - Gõ từ khóa `Dockerfile` $\to$ Xem phân tích về giới hạn của chỉ thị `EXPOSE`.
   - Gõ từ khóa không liên quan (ví dụ: `database`, `python`) $\to$ Quan sát thông báo hướng dẫn khi không tìm thấy tài liệu trong bộ ngữ cảnh mẫu.
3. Bấm **“Làm mới Checklist & Tra cứu”** để kiểm tra tính năng khôi phục trạng thái ban đầu.

### 3.3. Option B: Co-Created Socratic Step-by-Step Navigator (Đồng Kiến Tạo ~50/50)
1. Bấm nút **“🤝 Tôi Cần Hướng Dẫn Từng Bước”**.
2. Trả lời câu hỏi chẩn đoán ban đầu của AI về dòng lệnh khởi động trong `server.js`. Quan sát phản hồi giải thích ngữ cảnh thay đổi tương ứng theo câu trả lời (`unsure`, `env-port`, `hardcode-3000`).
3. Trải nghiệm lần lượt 3 bước vi mô (Micro-steps):
   - **Bước 1 (Cổng động):** Thử tính năng chỉnh sửa snippet trực tiếp trong ô code trước khi bấm **[Xác nhận áp dụng]**. Thử nhập snippet rỗng để kiểm tra cơ chế từ chối (reject empty).
   - **Bước 2 (Host 0.0.0.0):** Thử bấm **[Quay lại Bước 1]** để kiểm tra khả năng thay đổi snippet đã xác nhận trước đó (hệ thống tự động tái tạo mã nguồn chuẩn xác).
   - Thử bấm **[Dừng hướng dẫn]** ở bất kỳ bước nào: quan sát giao diện chuyển sang trạng thái tạm dừng, khóa các nút thao tác để bảo vệ mã nguồn. Bấm **[Tiếp tục bước hiện tại]** để tiếp tục.
   - **Bước 3 (Đối chiếu Docker):** Thử bấm **[Xem hướng giải khác]** để xem hướng dẫn Dockerfile và lệnh chạy thử local `docker run -p 8080:8080 -e PORT=8080`.
   - Hoàn thành: quan sát bảng tổng kết hiển thị chi tiết các bước đã áp dụng vs các bước bị bỏ qua (Skip).

### 3.4. Option C: Proactive AI Diagnostic & Auto-Fix (Tự Động Hóa AI ~80%)
1. Khi chuyển sang Tab C, hệ thống tự động hiển thị Banner chẩn đoán kèm chỉ số **Độ tin cậy mô phỏng: 92%** (kèm chú thích minh bạch đây là giá trị mô phỏng trong kịch bản).
2. Xem bản xem trước khác biệt mã nguồn (**Diff Preview**) tô màu trực quan các dòng bị xóa (đỏ) và các dòng được bổ sung (xanh).
3. **Thử nghiệm kịch bản phục hồi lỗi (Testing Recovery):**
   - Bấm nút màu vàng: **“Kích hoạt tình huống: AI Gợi ý sai (Chỉ sửa Dockerfile EXPOSE, bỏ quên server.js)”**.
   - Quan sát: Huy hiệu độ tin cậy giảm xuống **45%** (màu đỏ) kèm cảnh báo nguy cơ thiếu ngữ cảnh.
   - Kiểm tra các nút kiểm soát và cứu hộ:
     - Bấm **[❌ Bác Bỏ Bản Vá (Reject)]**: Khóa bản vá, vô hiệu hóa nút Apply và Customize để bảo vệ code, hiển thị thông báo kèm nút mở khóa lại.
     - Bấm **[✏️ Tùy Chỉnh (Customize)]**: Mở ô soạn thảo để người học tự tay chỉnh sửa lại code trước khi ghi đè.
     - Bấm **[⏪ Khôi Phục Mã Gốc (Rollback)]**: Lập tức hoàn tác file `server.js` về đoạn code ban đầu.
     - Bấm **[🚩 Báo AI Đoán Sai (Report Wrong)]**: Gắn cờ ghi chú cục bộ và tự động thêm vào Bảng quan sát (không gửi ra ngoài).
     - Bấm **[🔄 Làm Mới Option C]**: Đưa Option C về trạng thái nguyên bản ban đầu.
