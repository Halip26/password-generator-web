const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

// Buat dictionary karakter2 untuk passwordnya
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

  // Looping untung ulangi setiap option
  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        // Menambahkan characters staticPassword jika setiap option itu dipilih
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
  // Generate password secara acak dengan loopng for
  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      // Menambahkan karakter to randompass tanpa ada duplicate
      if (!randomPassword.includes(randomChar) || randomChar == " ") {
        randomPassword += randomChar;
      } else {
        i--;
      }
    } else {
      // Add random karakter ke password
      randomPassword += randomChar;
    }
  }

  // Atur nilai dari input password
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

// Fungsi untuk update slider tanpa harus tekan generate btn
const updateSlider = () => {
  // Update panjang label
  document.querySelector(".pass-length span").innerText = lengthSlider.value;

  // Hubungkan ke fungsi generatePassword
  generatePassword();

  // Update indicator password
  updatePassIndicator();
};

// Inisisalisasi si slider & generate passwordnya
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

// Memanggil semua kejadian agar berfungsi
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
copyIcon.addEventListener("click", copyPassword);
