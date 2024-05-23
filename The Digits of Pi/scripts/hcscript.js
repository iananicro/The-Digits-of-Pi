function checkWindowSize()
{
  const screenSize = screen.width * screen.height;
  const windowSize = window.innerWidth * window.innerHeight;
  
  // Check for window size and zoom level
  if (windowSize == screenSize) //Change to 0.8 later.
  {
    hardcore();
  }
  //Display an alert telling the user their window is too small for hardcore mode.
  else 
  {
    alert("Sorry, but your browser is too small to play Hardcore Mode.\n\nPlease try again by going fullscreen (F11) and refresh (Ctrl + R).\nPlease also make sure that your browser zoom setting is at 100%.");
  }
}

//If everything is good, then hardcore mode can be played.
function hardcore() 
{
  const textFilePath = "text/3m.txt"; //File of Pi digits to read.
  let index = 0;  // Tweak this number to verify digits with an external source. 101 would be the 100th decimal digit of Pi.
  let digitCount = 0;
  let isMuted = true
  let indexOn = true;
  let isVisible = true;

  //HTML Elements.
  const number = document.getElementById("number");
  const decNum = document.getElementById("decNum");
  const digNum = document.getElementById("digNum");
  const message = document.getElementById("message");
  const soundEffectSelect = document.getElementById("soundEffectSelect");
  const muteButton = document.getElementById("muteButton");

  //Other elements.
  const normalLink = document.querySelector('a[href="pi.html"]');
  const aboutLink = document.querySelector('a[href="about.html"]');

  //If the user clicks on a link, alert them that leaving the page will cause them to lose progress.
  if (normalLink) 
  {
    normalLink.addEventListener('click', confirmNavigation);
  }

  if (aboutLink) 
  {
    aboutLink.addEventListener('click', confirmNavigation);
  }

  //Function to alert the user that leaving the page will cause their progress to be lost.
  function confirmNavigation(event) 
  {
    /*
    Turn off indexOn while the alert is displayed.
    When you click a link, the alert will pop up, which would visually stop the digits
    from printing, but the index is going up while you're confirming or cancelling the alert.
    Instead, when the alert pops up, the index stops iterating, until you cancel.
    */
    indexOn = false;

    const confirmation = confirm("Are you sure you want to leave this page? Your progress will be lost.");
    if (!confirmation) 
    {
      event.preventDefault(); //If you do not confirm, you will stay on the page.
      indexOn = true; //When returned to the page, turn back the index to keep iterating.
    }
  }
  
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

  //Function to turn off the index.
  function indexOff() 
  {
    indexOn = false;
  }

  //Function for handling any visiblity changes (resizing/minimizing)
  function handleVisibilityChange() 
  {
    isVisible = document.visibilityState === "visible";
    //If the page is not visible, the index will be turned off and counting will stop.
    if (!isVisible) 
    {
      indexOff();
    }
  }
  
  //Event listeners for the muting and resizing/visiblity changes.
  muteButton.addEventListener("click", toggleMute);
  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("resize", indexOff);

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
        message.textContent = "You reached the end of the document! :D";
      }
      //Update every second.
    }, 1000);
  })
  //Print an error in Console if there are any.
  .catch(error => 
  {
    console.error('Error fetching text file:', error);
  });
}
//When the window is opened up for the first time, check the Window Size to see if it's allowed to use hardcore mode.
window.onload = checkWindowSize;
