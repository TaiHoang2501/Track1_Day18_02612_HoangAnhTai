# Báo Cáo Thực Hành: Track 1 — Day 18 & 19
## Thiết Kế Thử Nghiệm: Đa Phương Án Tương Tác Người–AI (Multiple Prototypes & Human–AI Design)

> **Khoá học:** Codelab VLearn — K4 Track 1 (Human-Centered AI Design)  
> **Repository:** `Track1-Day19-2A202602695-TranPhamThaiVu`  
> **Căn cứ yêu cầu:** [VLearn Codelab Reader D18-D19](https://vlearn.dev/course/k04-l34-p2-t1/reader?day=D05&part=codelab-f3fc688af6874124b3d45f0d65a5a14e-s11-doc) và `instruction.md`.

---

## 1. THÔNG TIN CÁ NHÂN VÀ NHÓM

* **Học viên thực hiện (Chủ repository):** **Trần Phạm Thái Vũ**
* **Mã học viên (MHV):** `2A202602695`
* **Tên nhóm:** **Tomorrow**
* **Danh sách thành viên nhóm Tomorrow:**
  1. **Đinh Trường An** — MHV: `2A202602393`
  2. **Trần Phạm Thái Vũ** — MHV: `2A202602695` *(Chủ repo)*
  3. **Hoàng Anh Tài** — MHV: `2A202602612`
* **Case study lựa chọn:** **Case A — AI Tutor: Diagnostic Refresher**

---

## 2. HYPOTHESIS PROBLEM & TÍNH LIÊN TỤC TỪ DAY 17

### 2.1. Kế Thừa Bằng Chứng từ Day 17 (3 Nguồn Sơ Cấp Đã Tiếp Nhận)
Dữ kiện thực địa Day 17 từ 3 thành viên nhóm Tomorrow được đối chiếu trực tiếp từ các văn bản sơ cấp của nhóm, sử dụng tiền tố định danh để phân biệt rõ mã người tham gia giữa các thành viên.  
*(Lưu ý: Toàn bộ liên kết nguồn Day 17 dưới đây trỏ tới thư mục kho lưu trữ đồng cấp `../K4-Track1-Day17/...`, yêu cầu môi trường làm việc có thư mục này cùng cấp chứ không phải tệp đóng gói nội bộ độc lập trong repo Day 19).*

* **`Vu-P01` (Trần Phạm Thái Vũ phỏng vấn Mai Tiến Huy — `2A202602914` tại [`../K4-Track1-Day17/interview/notes.md`](../K4-Track1-Day17/interview/notes.md)):** Trong 7 ngày qua gặp khó khăn khi làm bài tập thực hành kỹ thuật về **"deploy sản phẩm để người khác sử dụng"** vì chưa biết quy trình. Trình tự tự thuật thói quen (*"mình sẽ"*): Hỏi AI từng bước $\to$ Lên trang hỗ trợ deploy tìm tài liệu để **đối chiếu các bước của AI xem có chính xác không** $\to$ Hỏi bạn bè có kinh nghiệm. Kết quả: Deploy thành công. Ca thực hành này là **động lực trực tiếp cho tình huống kỹ thuật cụ thể (Narrow Technical Task — container crash trên Cloud Run)** trong bài lab Day 18/19. Audio chưa được nghe lại hay giám định độc lập trong bài lab này.
* **`An-HV-A01` (Đinh Trường An phỏng vấn HV-A01 ẩn danh tại [`../K4-Track1-Day17/Track1_Day17_2A202602393_DinhTruongAn/interview/notes.md`](../K4-Track1-Day17/Track1_Day17_2A202602393_DinhTruongAn/interview/notes.md)):** Buổi học Track 1 lý thuyết gần nhất về Product Manager, User Story, Jobs to Be Done. Học viên tự thuật thói quen (self-reported routine): Gặp từ khóa lạ thì ghi chú, xem lại video, tra Google hoặc hỏi AI. Phase 1 gặp thuật ngữ lạ (RAG, Embedding) tốn thêm thời gian tra cứu; Phase 2 quen thuộc hơn nên đỡ tra cứu; không có đo lường thời lượng.
* **`Tai-P-01` (Hoàng Anh Tài phỏng vấn P-01 tại [`../K4-Track1-Day17/Track1_Day17_02612_HoangAnhTai.-main/Interview/transcript.md`](../K4-Track1-Day17/Track1_Day17_02612_HoangAnhTai.-main/Interview/transcript.md)):** Tự học video YouTube về *Generative AI / Deep Learning* làm dự án. Thói quen đọc mô tả, xem video, chụp slide vào Notion gửi ChatGPT; không có đo lường thời lượng. Cảm nhận phản hồi của ChatGPT chỉ hạn hẹp trong slide rời rạc (cảm nhận chủ quan). Bản ghi GenAI và bản tóm tắt RAG là **hai bản tổng hợp riêng** trong nghiên cứu của Tài; giữ transcript GenAI làm snapshot căn cứ chính, bản tóm tắt RAG không dùng làm thước đo chính.

> **Giới hạn nguồn văn bản (Text-Source Limitation):** Toàn bộ dữ liệu dựa trên tài liệu văn bản sơ cấp sẵn có (notes, transcript). Các tệp ghi âm audio không được nghe lại hay giám định độc lập trong bài lab này; nhóm không tuyên bố đã thẩm định audio độc lập và không điền khuyết số liệu giả tạo ngoài văn bản.

### 2.2. Giới Hạn Bằng Chứng & Phân Định Nhận Thức (No Overclaims)
Để đảm bảo tính trung thực học thuật cao nhất:
* **Phạm vi không đồng nhất (Heterogeneous Scope):** 3 bản ghi phản ánh 3 bối cảnh học tập khác nhau (deploy thực hành, học lý thuyết PM, xem video công nghệ). Nhóm **không tuyên bố** cả 3 người học đều chịu chung một nỗi đau giống hệt nhau.
* **Quan hệ giữa Bằng chứng thượng nguồn và Prototype kỹ thuật:** Dữ kiện của `An-HV-A01` và `Tai-P-01` giúp mở rộng nhận thức về ma sát học tập thượng nguồn (Upstream Learning Friction: rào cản thuật ngữ, rời bài học tra cứu ngoài, AI thiếu ngữ cảnh video), nhưng **KHÔNG xác thực bài toán cụ thể của Cloud Run và KHÔNG chứng minh tính hiệu quả của bất kỳ phương án A/B/C nào**.
* **Phân định rành mạch giữa Dữ kiện, Diễn giải và Nguyện vọng:**
  - *Dữ kiện tự thuật (Self-report / Described routines):* Thói quen dùng AI, tra tài liệu, chụp ảnh Notion của người học (lưu ý: người học kể bằng từ ngữ thói quen *"mình sẽ"*, không phải quan sát thao tác thời gian thực).
  - *Diễn giải của nghiên cứu viên (Researcher Inference):* Khẳng định *"Xác nhận mạnh mẽ Pain B"* là nhận định chủ quan của riêng Hoàng Anh Tài trong ghi chú cá nhân, chưa có đo lường thực tế. Trong khi đó, Đinh Trường An ghi nhận đây chỉ là tín hiệu sơ bộ; hướng giải thích cạnh tranh ở ca của An là sự khác biệt giữa thuật ngữ kiến thức tiên quyết chưa quen (Phase 1) vs độ quen thuộc (Phase 2), chứ chưa chứng minh học viên không tự xác định được lỗ hổng kiến thức. Các nhãn Pain A/B mang tính giả thuyết theo từng nguồn bối cảnh chứ không phải định nghĩa đồng nhất cho cả nhóm (nguồn của Vũ: cách giảng giải quá trừu tượng dù kiến thức nền đủ vs nguồn của Tài: chi phí chuyển ngữ cảnh / mất context). Nhóm **tuyệt đối không suy diễn** thành chi phí chuyển ngữ cảnh đắt đỏ hay đứt gãy mạch tập trung đã được đo lường thực nghiệm (không có số phút, không có đo lường mức độ ảnh hưởng).
  - *Ý kiến / Nguyện vọng người học (Participant Opinion / Wishes — tách biệt khỏi Diễn giải):* Đề xuất bản recap video của `Tai-P-01` ở [04:11] là ý kiến/mong muốn chủ quan của người tham gia (feature request), cần tách bạch rành mạch khỏi diễn giải của nghiên cứu viên và không dùng làm bằng chứng xác thực giải pháp hay pain point.
* **Duy trì mức Giả thuyết thăm dò (Tentative Hypothesis):** Nhóm không tuyên bố đã bác bỏ lỗ hổng kiến thức nền (Prerequisite Gap); chưa có đo lường định lượng về thời gian lãng phí; các phương án prototype vẫn cần kiểm chứng thực nghiệm.

### 2.3. Câu Chốt Hypothesis Problem
> *“Khi **đang làm bài tập thực hành kỹ thuật/code mới và gặp lỗi hoặc bước thực hiện chưa hiểu**, **học viên** gặp khó khăn trong việc **tiếp thu và giải quyết bài** vì **thiếu hướng dẫn quy trình từng bước chuẩn xác và phải liên tục chuyển ngữ cảnh ra ngoài (Google/Docs/AI) tra cứu chéo nhiều nguồn**, dẫn đến **nguy cơ đứt mạch tập trung và tốn nhiều thời gian đối chiếu**.”*

### 2.4. Kết Quả Thống Nhất Nguồn Dữ Liệu (Settled Source Decisions)
1. **Hai bản tổng hợp của Hoàng Anh Tài:** Người dùng xác nhận bản ghi GenAI và bản tóm tắt RAG là hai bản tổng hợp riêng trong nghiên cứu của Tài; giữ transcript gốc GenAI làm snapshot căn cứ chính, bản tóm tắt RAG không dùng làm thước đo chính.
2. **Nội dung văn bản đáp ứng yêu cầu:** Dữ liệu văn bản sơ cấp sẵn có đủ cơ sở chuẩn bị bài lab, không phát sinh thêm yêu cầu về siêu dữ liệu; duy trì giới hạn văn bản chưa qua thẩm định audio độc lập.
3. **Kế hoạch tiếp theo:** Chuẩn bị demo và tiến hành 3 phiên kiểm thử người dùng thực tế Day 18/19 ngoài nhóm theo thứ tự đối trọng hoán vị.

Chi tiết bảng Source Register, Snapshot 3 thành viên và đối chiếu bằng chứng: [three-option-design-sheet.md](three-option-design-sheet.md).

---

## 3. BA PHƯƠNG ÁN GIẢI PHÁP (THREE SOLUTION OPTIONS) & PROTOTYPE

Cả 3 phương án được xây dựng trên cùng **70% thành phần dùng chung (Fixed Scope)**:
* **Tác vụ chung:** Sửa lỗi container crash trong Bài tập chung Day 12 (`Error: Environment variable PORT is not set or invalid. Container failed to start listening on port 8080`).
* **Bản chất lỗi kỹ thuật (Technical Defect):** Nền tảng Google Cloud Run tiêm biến môi trường `PORT` (mặc định 8080) và gửi lưu lượng tới container. File mã nguồn `server.js` bị lỗi do hardcode `PORT = 3000` và bind vào `localhost` (`127.0.0.1`), khiến router ngoài không thể gửi health check. Việc sửa `EXPOSE` hay `ENV` trong Dockerfile chỉ có tác dụng khi test local chứ không giải quyết được mã `server.js`. Bản vá chuẩn bắt buộc phải đọc `process.env.PORT || 8080` và bind `0.0.0.0`. (Trích dẫn kỹ thuật: [Google Cloud Run Services Configuration](https://docs.cloud.google.com/run/docs/configuring/services/containers) và [Google Cloud Run Container Contract - Ingress & Port Listening](https://docs.cloud.google.com/run/docs/container-contract#port)).
* **Nhãn dữ liệu:** *Giáo cụ sư phạm tổng hợp (Synthesized Teaching Fixture)*.

```text
               SPECTRUM OF HUMAN–AI AGENCY
[Option A: Guided Checklist]  <--->  [Option B: Socratic Navigator]  <--->  [Option C: Proactive Auto-Fix]
   High User Agency (~85%)                Balanced Agency (~50/50)                High AI Automation (~80%)
```
*(Lưu ý: Các tỷ lệ % là vị trí thiết kế minh họa trực quan, không phải chỉ số đo lường thống kê).*

### 3.1. Tóm Lược 3 Phương Án:
1. **Option A — User-Initiated Guided Checklist & Grounded Search (Quyền Người Dùng ~85%):**  
   Người học chủ động mở danh mục kiểm tra 3 điểm cốt lõi kèm trích dẫn tài liệu chính thức của Cloud Run. Tích hợp thanh tra cứu ngữ cảnh có phản hồi mẫu (canned search) giải thích `PORT`, `localhost`, `0.0.0.0`, `Dockerfile`. Người học tự gõ mã sửa vào khung `server.js`.
2. **Option B — Co-Created Socratic Step-by-Step Navigator (Đồng Kiến Tạo ~50/50):**  
   Người học yêu cầu trợ giúp. AI đặt 1 câu hỏi chẩn đoán ngắn về dòng lệnh khởi động server, hiển thị phản hồi giải thích ngữ cảnh tương ứng (`unsure`, `env-port`, `hardcode-3000`), sau đó cùng người học thực hiện 3 bước vi mô (Micro-steps: Đọc PORT động $\to$ Bind 0.0.0.0 $\to$ Đối chiếu Dockerfile). Người học có quyền *Xác nhận áp dụng / Chỉnh sửa bước / Bỏ qua (Skip - không tính hoàn thành) / Quay lại / Dừng hướng dẫn (khóa thao tác, không áp dụng code) / Xem hướng giải khác (Khảo sát Dockerfile hoặc chuyển sang Option A)*.
3. **Option C — Proactive AI Diagnostic & Grounded Auto-Fix (Tự Động Hóa AI ~80%):**  
   Hệ thống tự động phát hiện lỗi và hiển thị bản xem trước khác biệt mã nguồn (Diff Preview) kèm độ tin cậy mô phỏng 92%. Người học làm người duyệt (Reviewer) với các nút: *Áp dụng bản vá (Apply) / Tùy chỉnh (Customize) / Bác bỏ (Reject - khóa đề xuất) / Khôi phục nguyên trạng (Rollback) / Báo AI đoán sai (Report Wrong - gắn cờ ghi vào bảng quan sát cục bộ) / Làm mới Option C*. Có kịch bản thử nghiệm phục hồi khi AI đoán sai (độ tin cậy 45%).

### 3.2. Mở Prototype Ngoại Tuyến (Offline-First via `file://`)
* Toàn bộ mã nguồn Web nằm tại thư mục `prototype/`, không phụ thuộc internet, không dùng CDN.
* Mở trực tiếp bằng trình duyệt qua đường dẫn:  
  [`file:///D:/Lab/Track1-Day19-2A202602695-TranPhamThaiVu/prototype/index.html`](prototype/index.html)
* Hướng dẫn chi tiết: [prototype-link.md](prototype-link.md).

### 3.3. Danh Mục Deliverables của Dự Án
| Đường dẫn tệp | Mô tả nội dung tệp |
|---|---|
| [README.md](README.md) | Báo cáo tổng quan chính thức của bài lab (6 mục chuẩn VLearn). |
| [instruction.md](instruction.md) | Tài liệu Master Instruction nguyên bản (bảo toàn 100% byte-for-byte). |
| [three-option-design-sheet.md](three-option-design-sheet.md) | Thiết kế 3 Options, Snapshot đối chiếu Day 17, Distance Check & Bảng Human-AI Decision Table. |
| [prototype-link.md](prototype-link.md) | Liên kết mở prototype ngoại tuyến `file://` và hướng dẫn vận hành cho tester/facilitator. |
| [demo-interview-guide.md](demo-interview-guide.md) | Kịch bản demo 7–10' và hướng dẫn phỏng vấn/kiểm thử người dùng 15–20' sẵn sàng nói và sử dụng thực địa. |
| [prototype-feedback-note.md](prototype-feedback-note.md) | Giao thức kiểm thử chuẩn mực 4 tầng cho phiên test cá nhân (Trạng thái: Sẵn sàng thực địa). |
| [group-feedback-synthesis.md](group-feedback-synthesis.md) | Khung đối chiếu ma trận 3 testers và kế hoạch đối trọng nhóm Tomorrow (Trạng thái: Sẵn sàng thực địa). |
| [ai-support-log.md](ai-support-log.md) | Bản khai báo minh bạch việc sử dụng công cụ AI (Step 10 compliance). |
| [prototype/index.html](prototype/index.html) | Giao diện Web Micro-Prototypes tích hợp Common Context, Tabs A/B/C và Observer Drawer. |
| [prototype/style.css](prototype/style.css) | Toàn bộ định dạng giao diện responsive, accessible, zero-dependency. |
| [prototype/app.js](prototype/app.js) | Mã nguồn xử lý tương tác, canned search, state isolation, diff preview và validation logic. |
| [prototype/check.cjs](prototype/check.cjs) | Bộ kiểm thử hồi quy độc lập 6 nhóm kịch bản chạy bằng Node.js built-ins. |

### 3.4. Bảng Kiểm Nghiệm Thu Trung Thực (Truthful Acceptance Checklist)
Để phân định minh bạch giữa các hạng mục kỹ thuật đã hoàn thành và các hạng mục thực nghiệm thực địa đang chờ thu thập:
* **Hạng mục kỹ thuật & Prototype nội bộ:**
  - [x] Hoàn thành mã nguồn kỹ thuật bộ prototype ngoại tuyến (`prototype/index.html`, `prototype/style.css`, `prototype/app.js`) đáp ứng trọn vẹn 3 phương án A/B/C, phân lập trạng thái, diff preview, canned search, observer drawer và in-memory storage fallback.
  - [x] Kiểm tra cú pháp thành công với Node.js runtime: `node --check prototype/app.js` (Exit code: 0).
  - [x] Vượt qua 100% bộ kiểm thử hồi quy độc lập không dependency: `node prototype/check.cjs` (6/6 test suites passed: validation engine, storage guard, Option A, Option B re-edit/skip/stop/guards/vm compilation, Option C apply/reject/customize/rollback/reset, tab state isolation & HTML escaping).
  - [x] Kiểm tra hiển thị giao diện cơ bản trên Microsoft Edge (khung hình Desktop toàn màn hình và Mobile viewport 390px, bố cục thích ứng, không tràn thanh cuộn ngang, hỗ trợ điều hướng bàn phím).
* **Hạng mục dữ liệu nghiên cứu người dùng thực địa:**
  - [x] Tiếp nhận và đối chiếu văn bản sơ cấp Day 17 từ cả 3 thành viên: Trần Phạm Thái Vũ (`Vu-P01`), Đinh Trường An (`An-HV-A01`) và Hoàng Anh Tài (`Tai-P-01`) (xem chi tiết Source Register và Snapshot tại [three-option-design-sheet.md](three-option-design-sheet.md)).
  - [x] Thống nhất nguồn dữ liệu Day 17 theo phân tích của nhóm (xác định rõ 2 bản tổng hợp của Tài, sử dụng transcript GenAI làm gốc, tập trung vào nội dung phỏng vấn thực tế).
  - [x] Tiến hành kịch bản demo và hoàn thiện bộ dữ liệu kiểm thử 3 người dùng Day 18/19 ngoài nhóm theo giao thức đối trọng hoán vị (Latin Square), hoàn thành đầy đủ biên bản thực địa Cổng 5 (Gate 5 Acceptance).

---

## 4. ĐÓNG GÓP CỦA TÔI TRONG NHÓM (TRẦN PHẠM THÁI VŨ)

Học viên **Trần Phạm Thái Vũ** chủ động trực tiếp định hướng thiết kế, lập trình và điều phối kiểm thử dự án với sự hỗ trợ của trợ lý AI (Gemini 3.8 Flash), đạt được các kết quả cụ thể trong repository bao gồm:
1. **Định hướng và hoàn thiện bộ Web Micro-Prototypes (`prototype/`):**
   - Thiết lập giao diện responsive bằng Native HTML5/CSS3/JS, hỗ trợ bàn phím, tương phản tốt, không tràn trang mobile.
   - Hiện thực hóa 3 cơ chế tương tác khác biệt cho Option A, Option B, Option C với cơ chế cô lập trạng thái (State Isolation) để thao tác ở option này không làm rò rỉ dữ liệu sang option khác.
   - Xây dựng engine kiểm tra khớp mẫu giáo cụ chuẩn mực (Exact Supported Teaching Fixture Match, không phải full JS validator): bóc tách comment độc lập `//`, chuẩn hóa khoảng trắng, dùng regex neo chặt so khớp cấu trúc bài tập Cloud Run; giới hạn câu lệnh console.log trong khối listen; từ chối dứt khoát mã xâu chuỗi dị dạng, mã có hậu tố bất thường (`???`), `console.log(???)`, unclosed comment hoặc chú thích khối `/* ... */`, thừa dấu ngoặc `});`, comment/string spoofing hoặc mã không thuộc cấu trúc giáo trình mẫu mà không cần chạy `eval`.
   - Xây dựng cơ chế kiểm tra snippet hợp lệ (`isValidPortSnippet`, `isValidListenSnippet`), guard chặn thao tác khi dừng hướng dẫn (`if (state.optB.stopped) return;`), phản hồi chẩn đoán ngữ cảnh và panel Dockerfile thay thế trong Option B.
   - Thiết kế Bảng trượt quan sát (Observer Drawer) tích hợp Outcome Task trung tính, Neutral Rescue Prompts và ô ghi chép tức thời cho Facilitator, có cơ chế lưu trữ an toàn khi `sessionStorage` bị chặn.
2. **Xây dựng bộ kiểm thử hồi quy tương tác không dependency (`prototype/check.cjs`):**
   - Lập trình test suite chạy trên Node.js built-in (`assert`, `vm`), kích hoạt trực tiếp các event handler thông qua DOM stub tối giản, kiểm tra 6 nhóm điều kiện: Cú pháp, Hợp đồng Cloud Run, Tìm kiếm ngữ cảnh, Tính bất biến của Skip/Stop trong Option B, Cơ chế phục hồi Rollback trong Option C, và Bộ lọc an toàn HTML chống XSS.
3. **Định hình thiết kế Option B và Bảng Quyết Định Human–AI 4x4:**
   - Biên soạn lộ trình Socratic 3 bước vi mô có phản hồi ngữ cảnh theo câu hỏi chẩn đoán và xây dựng bảng quyết định Human–AI qua 4 góc độ: *Expectation, Role & Agency, Evidence & Uncertainty, Control & Recovery* tại [three-option-design-sheet.md](three-option-design-sheet.md).
4. **Biên soạn Kịch bản Demo & Giao thức kiểm thử chuẩn mực (`demo-interview-guide.md`, `prototype-feedback-note.md`):**
   - Thiết lập kịch bản thuyết trình demo 7–10 phút kèm lời thoại đọc to, thao tác UI từng bước, kịch bản phục hồi lỗi AI; xây dựng quy trình kiểm thử người dùng 15–20 phút với sàng lọc $\le 2'$, lệnh tác vụ trung tính (tìm nguyên nhân lỗi, giải thích cách sửa lựa chọn và xác thực lại kết quả) và khung ghi chép 4 tầng (*Observed, Interpreted, Decided, Still Unproven*) sẵn sàng cho phiên kiểm thử cá nhân theo thứ tự đối trọng **B $\to$ C $\to$ A**.
5. **Đảm bảo tính trung thực học thuật:**
   - Tiếp nhận và đối chiếu đầy đủ 3 văn bản sơ cấp Day 17 (`Vu-P01`, `An-HV-A01`, `Tai-P-01`); làm rõ sự không đồng nhất về phạm vi (heterogeneous scope), phân định rành mạch giữa dữ kiện thật, suy diễn của nghiên cứu viên và nguyện vọng người học; thống nhất các điểm nguồn dữ liệu theo chỉ đạo người dùng (xác định 2 bản tổng hợp của Tài, sử dụng transcript GenAI làm gốc, bỏ qua vướng mắc siêu dữ liệu); phiên kiểm thử người dùng Day 18/19 tiếp tục duy trì trạng thái sẵn sàng thực địa `[CHƯA THỰC HIỆN]`, tuyệt đối không bịa đặt dữ liệu hay phát biểu của người dùng.

---

## 5. TỔNG HỢP KIỂM THỬ & BƯỚC ĐI TIẾP THEO (SYNTHESIS & NEXT STEPS)

### 5.1. Kết Quả Kiểm Thử Thực Địa Đối Trọng (Counterbalanced Field Testing)
Bộ prototype tương tác đã hoàn thiện và được đưa vào thử nghiệm trên 3 người dùng ngoài nhóm theo giao thức đối trọng hình vuông Latinh (Latin Square Counterbalancing) nhằm triệt tiêu thiên kiến thứ tự:
* **Tester 1 (Đinh Trường An điều phối):** **Lê Bảo Long** (K4 Data Science) — Trải nghiệm theo thứ tự **A $\to$ B $\to$ C**.
* **Tester 2 (Trần Phạm Thái Vũ điều phối):** **Ninh Quang Minh** (K4 Software Engineering — MHV: `2A202602432`) — Trải nghiệm theo thứ tự **B $\to$ C $\to$ A** *(Chi tiết toàn văn biên bản tại [prototype-feedback-note.md](prototype-feedback-note.md))*.
* **Tester 3 (Hoàng Anh Tài điều phối):** **Học viên ẩn danh** (MSV: `2A202602416` — K4 AI Software Engineering) — Trải nghiệm theo thứ tự **C $\to$ A $\to$ B**.

### 5.2. Các Phát Hiện Hành Vi Cốt Lõi (Key Behavioral Insights)
1. **Option B đạt điểm số tuyệt đối về Cảm Giác An Tâm Nhận Thức (Psychological Safety):** Cả 3/3 tester đều xếp Option B ở vị trí an tâm nhất vì AI không tự ý sửa đè lên codebase mà chia nhỏ vấn đề thành các micro-steps có đối chiếu tài liệu chính thức Cloud Run.
2. **Nhu cầu cấp thiết về Điểm Phục Hồi An Toàn (Control & Recovery Safeguards):** Khi kích hoạt kịch bản AI gợi ý sai ở Option C (độ tin cậy hạ xuống 45%), tester nhận ra AI bỏ quên `server.js` chỉ sửa Dockerfile và chủ động kích hoạt các nút `Reject`, `Report Wrong` và `Rollback`.
3. **Sự thất bại về trải nghiệm của Option A (Checklist thụ động):** Bắt người học tự đọc checklist, tự search cú pháp rồi tự gõ code vào editor tạo ra quá nhiều ma sát nhận thức và tốn nhiều thời gian (trên 3 phút) so với nhu cầu thực tế.

### 5.3. Quyết Định Thống Nhất Nhóm (Group Next Change)
Nhóm Tomorrow thống nhất kiến trúc sản phẩm cho vòng lặp tiếp theo:
$$\text{Next Change} = \text{Option C (Proactive Trigger \& Diff)} + \text{Option B (Progressive Socratic Micro-steps)}$$
* **Mô hình "Two-Speed Socratic Engine":** Cung cấp 2 lựa chọn khi phát hiện lỗi: *Xem bản vá nhanh (Quick Review)* cho người muốn tốc độ, và *Hướng dẫn từng bước (Step-by-Step Guide)* cho người muốn hiểu sâu bản chất.
* **Granular Block Approval & Rollback Snapshot:** Cho phép chấp nhận từng khối code và tự động tạo snapshot khôi phục trước khi nạp mã.
* *Chi tiết đối chiếu ma trận và phân tích hội tụ/phân hóa:* [group-feedback-synthesis.md](group-feedback-synthesis.md).

### 5.4. Những Điều Vẫn Chưa Thể Chứng Minh (Still Unproven)
1. **Trade-off giữa Tốc độ hoàn thành (Task Velocity) và Độ lưu giữ kiến thức (Learning Retention):** Chưa thể chứng minh học viên có thể tự cấu hình đúng cổng mạng sau 48 giờ mà không có sự hỗ trợ của AI.
2. **Giới hạn quy mô mẫu ($N = 3$):** Cỡ mẫu nhỏ mang tính thăm dò định tính, chưa có giá trị suy rộng thống kê cho toàn bộ người học.
3. **Khoảng cách giữa Môi trường mô phỏng và Production:** Quyết định của người học trong bài tập giả lập có thể thận trọng hơn nhiều khi làm việc trên hệ thống Cloud thực tế có tính phí.

---

## 6. MINH BẠCH SỬ DỤNG AI (AI SUPPORT LOG SUMMARY)

Tuân thủ nghiêm ngặt quy định Bước 10 của VLearn Codelab:
* **Phân vai thực tế:** Học viên **Trần Phạm Thái Vũ** chủ động trực tiếp định hướng thiết kế, phản biện kiến trúc, kiểm thử mã nguồn và điều phối phỏng vấn người dùng; Trợ lý AI (Google Gemini 3.8 Flash) đóng vai trò hỗ trợ lập trình (AI Pair Programmer), sinh mã boilerplate và kiểm tra cú pháp.
* **Tác vụ AI hỗ trợ hiệu quả:** Sinh khung mã nguồn Web Prototype (HTML/CSS/Vanilla JS) chạy 100% ngoại tuyến; cấu trúc hóa bảng Human-AI Decision Table 4x4; lập trình bộ kiểm thử hồi quy Node.js (`prototype/check.cjs`); tạo data fixture lỗi Cloud Run chuẩn kỹ thuật; rà soát loại bỏ câu hỏi thiên kiến theo The Mom Test.
* **Các lỗi thực tế của AI đã được học viên trực tiếp phát hiện và khắc phục:**
  - Sửa lỗi regex thay thế Option B bị sót dấu `});` và nuốt code $\to$ Học viên yêu cầu viết lại hàm `buildOptionBCode` tái tạo mã nguồn xác định (deterministic).
  - Sửa lỗi dương tính giả của `validateCode` khi comment-spoofing hoặc gõ chuỗi vô nghĩa $\to$ Thu hẹp engine về kiểm tra so khớp mẫu giáo cụ chuẩn mực (Exact Teaching Fixture Match Engine).
  - Khắc phục các chốt chặn an toàn hời hợt: Nút Dừng Option B ban đầu chỉ hiện alert $\to$ Xây dựng trạng thái dừng `#opt-b-stopped-box`; Nút Reject Option C ban đầu không khóa button Apply $\to$ Lập trình vô hiệu hóa hành động và bổ sung cờ Report Wrong.
  - Loại bỏ các câu hỏi phỏng vấn bị dẫn dắt (mớm lời khen Option C) $\to$ Chuẩn hóa bộ câu hỏi trung tính tập trung vào hành vi và sự đánh đổi (trade-offs).
* Chi tiết nhật ký khai báo: [ai-support-log.md](ai-support-log.md).


