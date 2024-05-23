document.addEventListener("DOMContentLoaded", function() 
{
  const textFilePath = "text/3m.txt"; //File of Pi digits to read.
  let index = 0; // Tweak this number to verify digits with an external source. 101 would be the 100th decimal digit of Pi.
  let digitCount = 0;
  let isMuted = true;
  let indexOn = true;

  //HTML Elements.
  const number = document.getElementById("number");
  const decNum = document.getElementById("decNum");
  const digNum = document.getElementById("digNum");
  const message = document.getElementById("message");
  const soundEffectSelect = document.getElementById("soundEffectSelect");
  const muteButton = document.getElementById("muteButton");

  //Function for printing out the characters.
  function printDigit(character) 
  {
    number.textContent = character;
    //If it is not muted, play the sound effect the user has selected.
    if (!isMuted) 
    {
      const selectedSound = soundEffectSelect.value;
      const soundEffect = new Audio(selectedSound);
      soundEffect.play();
    }
    //If the character is a number, increase the digit count. This excludes the decimal symbol.
    if (character >= '0' && character <= '9')
    {
      digitCount++;
    }
    digNum.textContent = `(Digits Of Pi: ${digitCount})`;
    //Only start counting the decimal position 2 (after '3.') and beyond.
    if (index > 1)
    {
      decNum.textContent = `(Decimal Position: ${index - 1})`;
    }
  }

  //Function for muting/unmuting.
  function toggleMute() 
  {
    isMuted = !isMuted;
    muteButton.textContent = isMuted ? "🔇Muted 🔇" : "🔊Unmuted🔊";
  }

  //Event listeners for the muting.
  muteButton.addEventListener("click", toggleMute);

  //Fetch the text file and print digits.
  fetch(textFilePath)
  .then(response => 
  {
    return response.text();
  })
  .then(text => 
  {
    const interval = setInterval(() => 
    {
      //If the index hasn't reached the text length yet and indexOn is on, keep printing.
      if (index <= text.length && indexOn === true) 
      {
        printDigit(text.charAt(index));
        index++;
      }
      //If the index is not on (off/null), then printing will stop and the latest number will be shown.
      if (!indexOn) 
      {
        clearInterval(interval);
        number.textContent = character;
      }
      //If index is more than the text length (it finishes) then print out they reached the end
      if (index > text.length) 
      {
        clearInterval(interval);
        decNum.textContent = `(Decimal Position: ${index - 3})`;
        message.textContent = "You reached the end! :D";
      }
    //Update every second.
    }, 1000);
  })
  //Print an error in Console if there are any.
  .catch(error => 
  {
    console.error('Error fetching text file:', error);
  });

  document.querySelector('.main').style.width = '100px'; // Change width dynamically
document.querySelector('.main').style.height = '100x'; // Change height dynamically
});