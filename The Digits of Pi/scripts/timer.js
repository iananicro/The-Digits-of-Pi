function updateTime() 
{
  //Get the current date and time.
  const startTime = new Date();

  //Update the time display element
  const timeElement = document.getElementById("timeDisplay");

  setInterval(() => 
  {
    const currentTime = new Date();
    const elapsedTime = currentTime - startTime;
    const baseTime = 1000; //Modify this for testing purposes. 1000 = 1 second, 100 = 10 seconds, 10 = 100 seconds, etc.

    const seconds = Math.floor(elapsedTime / baseTime) % 60;
    const minutes = Math.floor(elapsedTime / (baseTime * 60)) % 60;
    const hours = Math.floor(elapsedTime / (baseTime * 60 * 60)) % 24;
    const days = Math.floor(elapsedTime / (baseTime * 60 * 60 * 24));

    const formattedSeconds = seconds.toString().padStart(2, "");
    const formattedMinutes = minutes.toString().padStart(2, "");
    const formattedHours = hours.toString().padStart(2, "");

    const formattedTime = 
    /*
      For seconds, if it is any number but 1, put 's.' at the end of 'second' to make it plural.
      If it is a 1, put a '.' at the end of 'second' to make it singular.

      Let 'x' be 'minute', 'hour' or 'day'.
      For x, if it is any number other than 1, put 's,' at the end of 'x' to make it plural.
      If it is a 1, put a ',' at the end of 'x' to make it singular.
    */
    `${days > 0 ? `${days} day${days === 1 ? ', ' : 's,'}` : ''}
    ${formattedHours > 0 ? (days > 0 ? ' ' : '') + `${formattedHours} hour${hours === 1 ? ', ' : 's, '}` : ''}
    ${formattedMinutes > 0 ? (days > 0 || hours > 0 ? ' ' : '') + `${formattedMinutes} minute${minutes === 1 ? ', ' : 's, '}` : ''}
    ${formattedSeconds} second${seconds === 1 ? '.' : 's.'}`;

    //Display the time spend on the page.
    timeElement.textContent = `Time spent on page: ${formattedTime}`;
  }, 1000); //Update every second.
}
updateTime();