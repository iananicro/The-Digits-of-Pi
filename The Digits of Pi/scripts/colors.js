function toggleNightMode() 
{
    var stylesheet = document.getElementById('mainStylesheet');
    if (stylesheet.getAttribute('href') === 'css/main.css') 
    {
      stylesheet.setAttribute('href', 'css/night.css'); //Toggle to Night Mode.
      nightModeButton.textContent = '🌙Night Mode🌙'
    } 
    else 
    {
      stylesheet.setAttribute('href', 'css/main.css'); //Toggle to Light Mode.
      nightModeButton.textContent = '☀️Light Mode☀️'
    }
}
document.getElementById('nightModeButton').addEventListener('click', toggleNightMode);