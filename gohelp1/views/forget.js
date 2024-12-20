function sendotp(){
  const email = document.getElementById('email');
  const otpverify = document.getElementsByClassName('otpverify')[0];

  let otp_val = Math.floor(Math.random() * 1000);

  let emailbody = `<h2>your otp is</h2> ${otp_val}`;

  Email.send({
    SecureToken : "  c0cd6e93-e658-41d1-8953-cd6c7949dfbc",
    To : email.value,
    From : "hetvikpatel0907@gmail.com",
    Subject : "This is the subject",
    Body : emailbody 
}).then(


  message => {
    if (message === "OK") {
      alert("otp sent to your mail" + email.value);

      otpverify.computedStyleMap.display = "flex";
      const otp_inp = document.getElementById('otp_inp');
      const otp_btn = document.getElementById('otp_btn');

      otp_btn.addEventListner('click',()=>{
        if(otp_inp.value == otp_val){
          alert("email address verified...");
        }
        else{
          alert("invalid otp");
        }
      })
    }
  }
);
}