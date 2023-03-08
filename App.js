function updatePara() {
  quote_text.textContent = null;
  current_quote = Paragraph[quoteNo];

  current_quote.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    quote_text.appendChild(charSpan)
  })

  if (quoteNo < Paragraph.length - 1)
    quoteNo++;
  else
    quoteNo = 0;
}

function passingText() {

  curr_input = input_area.value;
  curr_input_array = curr_input.split('');

  characterTyped++;

  errors = 0;

  quoteSpanArray = quote_text.querySelectorAll('span');
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index]

    if (typedChar == null) {
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');

    } else if (typedChar === char.innerText) {
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');

    } else {
      char.classList.add('incorrect_char');
      char.classList.remove('correct_char');

      errors++;
    }
  });

  error_text.textContent = total_errors + errors;

  let correctCharacters = (characterTyped - (total_errors + errors));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);
  accuracy_text.textContent = Math.round(accuracyVal);


  if (curr_input.length == current_quote.length) {
    updatePara();

    total_errors += errors;

    input_area.value = "";
  }
}

function timeModify() {
  if (timeLeft < 2) {
    timeLeft++;

    timeElapsed++;

    timer_text.textContent = timeLeft + "s";
  }
  else {
    CompleteGame();
  }
}

function CompleteGame() {
  clearInterval(timer);

  input_area.disabled = true;

  quote_text.textContent = "Click on restart to start a new game.";

  restart_btn.style.display = "block";

  wpm = Math.round((((characterTyped / 5) / timeElapsed) * timeElapsed));

  wpm_text.textContent = wpm;

  input_area.style.display = "none";
  accuracy_group.style.display = "block";
  error_group.style.display = "block";
  wpm_group.style.display = "block";

  timer_text.textContent = timeElapsed + "s";
}


function typingStart() {

  resetValues();
  updatePara();

  clearInterval(timer);
  timer = setInterval(timeModify, 1000);
}

function resetValues() {
  timeLeft = 0;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;

  input_area.value = "";
  quote_text.textContent = Paragraph[0];
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + 's';
  error_text.textContent = 0;
  restart_btn.style.display = "none";
  wpm_group.style.display = "none";
  accuracy_group.style.display = "none";
  error_group.style.display = "none";
  input_area.style.display = "block";
}

let Paragraph = [
  "Push yourself, because no one else is going to do it for you. Failure is the condiment that gives success its flavor The greatest glory in living lies not in never falling, but in rising every time we fall.",
  "Wake up with determination. Go to bed with satisfaction It's going to be hard, but hard does not mean impossible Learning never exhausts the mind The only way to do great work is to love what you do.",
  "Life is a beautiful journey that is meant to be embraced to the fullest every day. However, that doesn't mean you always wake up ready to seize the day, and sometimes need a reminder that life is a great gift"
];

let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = 0;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;
