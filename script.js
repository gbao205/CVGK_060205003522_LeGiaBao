/**
 * Khởi tạo thư viện AOS (Animate On Scroll)
 * duration: thời gian chạy animation (1 giây)
 * once: animation chỉ chạy một lần khi element hiện ra
 * offset: khoảng cách từ element đến viewport để trigger animation (100px)
 */
AOS.init({ duration: 1000, once: true, offset: 100 });

/**
 * Hiệu ứng Typewriter (đánh chữ) cho tiêu đề
 * Hiệu ứng sẽ đánh từng chữ một, sau đó xóa và chuyển sang câu tiếp theo
 */
const typeTarget = document.getElementById("typewriter");
const phrases = [
  "Sinh viên Trường Đại học Giao thông Vận tải TP.HCM",
  "Đam mê kiểm thử phần mềm",
  "Hướng tới Senior Test Manager",
];

// Các biến theo dõi trạng thái hiệu ứng
let currentPhrase = 0,    // Index của câu hiện tại trong mảng phrases
    currentChar = 0,      // Vị trí ký tự hiện tại trong câu
    isDeleting = false;   // Trạng thái: true = đang xóa, false = đang đánh chữ

/**
 * Hàm tạo hiệu ứng đánh chữ
 * - Khi đang xóa (isDeleting = true): giảm số ký tự hiển thị
 * - Khi đang đánh chữ (isDeleting = false): tăng số ký tự hiển thị
 * - Tốc độ xóa (50ms) nhanh hơn tốc độ đánh chữ (90ms)
 * - Sau khi đánh xong một câu, đợi 1.1s trước khi xóa
 * - Sau khi xóa xong, chuyển sang câu tiếp theo trong mảng
 */
function typeWriterEffect() {
  if (!typeTarget) return;
  const phrase = phrases[currentPhrase];
  
  if (isDeleting) {
    // Đang trong quá trình xóa chữ
    currentChar--;
    typeTarget.textContent = phrase.substring(0, currentChar);
    if (currentChar === 0) {
      // Đã xóa hết, chuyển sang đánh chữ câu tiếp theo
      isDeleting = false;
      currentPhrase = (currentPhrase + 1) % phrases.length;
    }
  } else {
    // Đang trong quá trình đánh chữ
    currentChar++;
    typeTarget.textContent = phrase.substring(0, currentChar);
    if (currentChar === phrase.length) {
      // Đã đánh xong câu, chuyển sang chế độ xóa sau 1.1s
      isDeleting = true;
      setTimeout(typeWriterEffect, 1100);
      return;
    }
  }
  
  // Đặt timeout cho ký tự tiếp theo
  // Tốc độ xóa (50ms) nhanh hơn tốc độ đánh chữ (90ms)
  setTimeout(typeWriterEffect, isDeleting ? 50 : 90);
}

// Bắt đầu hiệu ứng khi trang web đã load xong
document.addEventListener("DOMContentLoaded", typeWriterEffect);


