const typed = new Typed(".hero-title-ani", {
  strings: ["민", "PUSH"],
  typeSpeed: 50,
  loop: true,
  loopCount: Infinity,
  showCursor: false,
});
function copyEmail() {
  const email = "5731rufpskfk@gmail.com";
  navigator.clipboard
    .writeText(email)
    .then(() => {
      alert("메일 주소가 복사되었습니다!");
    })
    .catch((err) => {
      console.error("메일 주소 복사 실패:", err);
      alert("메일 주소 복사에 실패했습니다.");
    });
}
