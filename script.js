const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

// Mendefinisikan karakter untuk passwordnya
const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!$%&|[](){}:;.,*+-#@<>~",
};

// Fungsi untuk men-generate passwordnya
const generatePassword = () => {
  let staticPassword = "";
  let randomPassword = "";
  let excludeDuplicate = false;
  let passLength = lengthSlider.value;

  // looping untung ulangi setiap option
  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        // menambahkan characters staticPassword jika setiap option itu dipilih
        staticPassword += characters[option.id];
      } else if (option.id == "spaces") {
        // Jika opsi "spaces" dipilih, maka spasi akan ditambahkan ke staticPassword.
        staticPassword += ` ${staticPassword} `;
      } else {
        // Jika opsi "exc-duplicate" dipilih, maka variabel excludeDuplicate akan diaktifkan.
        excludeDuplicate = true;
      }
    }
  });
  // generate password secara acak dengan loopng for
  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      // menambahkan karakter to randompass tanpa ada duplicate
      if (!randomPassword.includes(randomChar) || randomChar == " ") {
        randomPassword += randomChar;
      } else {
        i--;
      }
    } else {
      //add random karakter ke password
      randomPassword += randomChar;
    }
  }

  // atur nilai dari input password
  passwordInput.value = randomPassword;
};

// Fungsi ini untuk upadate indikator password
const updatePassIndicator = () => {
  passIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};

// fungsi untuk update slider tanpa harus tekan generate btn
const updateSlider = () => {
  // update panjang label
  document.querySelector(".pass-length span").innerText = lengthSlider.value;

  // hubungkan ke fungsi generatePassword
  generatePassword();

  // update indicator password
  updatePassIndicator();
};

// inisisalisasi si slider & generate passwordnya
updateSlider();

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.innerText = "check";
  copyIcon.style.color = "#4285f4";
  setTimeout(() => {
    copyIcon.innerText = "copy_all";
    copyIcon.style.color = "#707070";
  }, 1500);
};

// memanggil semua kejadian agar berfungsi
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
copyIcon.addEventListener("click", copyPassword);
