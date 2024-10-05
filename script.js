const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const digits = "0123456789";
const specialChars = "!@#$%^&*()_+";

function getRandomCharacter(set) {
  const index = Math.floor(Math.random() * set.length);
  return set[index];
}

function generatePassword(length, userInput) {
  let password = userInput;
  const allChars = lowerCase + upperCase + digits + specialChars;
  const requiredLength = length - userInput.length;

  for (let i = 0; i < requiredLength; i++) {
    password += getRandomCharacter(allChars);
  }

  return shuffleString(password);
}

function shuffleString(str) {
  return str
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
}

function generatePasswords() {
  const passwordList = document.getElementById("passwordList");
  const strongPasswordDisplay = document.getElementById("strongPassword");
  const length = parseInt(document.getElementById("length").value, 10);
  const userInput = document.getElementById("userInput").value;

  if (userInput.length > length) {
    alert("Your input is longer than the specified password length!");
    return;
  }

  passwordList.innerHTML = "";
  let passwords = [];

  for (let i = 0; i < 10; i++) {
    const password = generatePassword(length, userInput);
    passwords.push(password);

    const li = document.createElement("li");
    li.textContent = password;
    li.addEventListener("click", () => copyToClipboard(password));
    passwordList.appendChild(li);
  }

  if (passwords.length > 0) {
    const strongPassword = suggestStrongPassword(passwords);
    strongPasswordDisplay.textContent = strongPassword
      ? strongPassword
      : "No valid password found!";
    strongPasswordDisplay.addEventListener("click", () =>
      copyToClipboard(strongPassword)
    );
  }
}

function suggestStrongPassword(passwords) {
  let strongest = "";
  let maxSpecialAndDigits = 0;

  passwords.forEach((password) => {
    const specialAndDigitsCount = (password.match(/[0-9!@#$%^&*()_+]/g) || [])
      .length;

    if (specialAndDigitsCount > maxSpecialAndDigits) {
      maxSpecialAndDigits = specialAndDigitsCount;
      strongest = password;
    }
  });

  return strongest;
}

function copyToClipboard(text) {
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  showCopyNotification();
}

function showCopyNotification() {
  const notification = document.getElementById("copyNotification");
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}
document.body.addEventListener("pointermove", (e) => {
  const { currentTarget: el, clientX: x, clientY: y } = e;
  const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();
  el.style.setProperty("--posX", x - l - w / 2);
  el.style.setProperty("--posY", y - t - h / 2);
});
