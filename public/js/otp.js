const data = localStorage.getItem("usernumber");
const tok = localStorage.getItem("SavedToken");

const html = `<span>+91 </span>
            <span>${data}</span>
            <a href="/">Edit</a>`;

const divelm = document.querySelector(".right_portion_numbersection");
divelm.innerHTML = html;

const otpcode = document.getElementById("otpcode");
const butn = document.getElementById("otp-button");

butn.addEventListener("click", (e) => {
  // console.log('1');
  const otp = otpcode.value;
  axios
    .post(
      "http://localhost:3000/verify",
      { body: otp },
      { headers: { Authorization: localStorage.getItem("SavedToken") } }
    )
    .then((res) => {
      window.location.assign("/product.html");
      console.log(res);
    })
    .catch((err) => {
      // window.location.assign('/product.html');
      // alert(err);
      alert("Invalid OTP");
    });
  otpcode.value = "";
});

const resotp = document.getElementById("Resend_otp");

resotp.addEventListener("click", (e) => {
  axios
    .get("http://localhost:3000/resendotp", {
      headers: { Authorization: localStorage.getItem("SavedToken") },
    })
    .then((res) => {
      console.log(res);
    });
});
