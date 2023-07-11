/**
 * HTML elements that need to be updated every second
 */
let time = document.querySelector('.time');
let titleTime = document.querySelector('title');


/**
 * These variables are used to hide the elements, when the user clicks on the time
 */
const header = document.querySelector('header');
const footer = document.querySelector('.footer-container');
const date = document.querySelector('.date');
const description = document.querySelector('.description');
const language = document.querySelector('.language');

/**
 * Shows the language of your Browser UI
 * The string is represented in the RFC 5646 standard
 * Source: https://datatracker.ietf.org/doc/html/rfc5646
 * Examples: 'en-US', 'de-DE'
 */
const myLanguage = document.querySelector('.myLanguage');
myLanguage.textContent = navigator.language;

/**
 * Toggles fullscreen mode for the time
 * Hides all the other elements from the website
*/
time.addEventListener('click', () => {
    // hides everything besides the time -> hide everything
    header.classList.toggle("hide");
    footer.classList.toggle("hide");
    date.classList.toggle("hide");
    description.classList.toggle("hide");
    myLanguage.classList.toggle("hide");
    language.classList.toggle("hide");
});

/**
 * The code below sets the default settings, if there is no localStorage saved on your browser for this website
 * The default settings are:
 *      - Font: Roboto Mono
 *      - Background colour: Dark mode
 *      - Hour format: 24h (assuming, language is in "de-DE")
 */

/**
 * generateDate saves the current date and time in 'Unix time' format
 */
const generateDate = new Date();

/**
 * Options for formatting the date and time
 */
let hourFormat = "h24";
const DateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};
let TimeOptions = {
    hourCycle: hourFormat
};

/**
 * Outputs the date in the HTML element: <p class="date">
*/
function displayDate(){
    date.textContent = generateDate.toLocaleDateString(navigator.language, DateOptions);
}

/**
 * Outputs the time in the HTML element: <p class="time">
*/
function displayTime(param){
    param.textContent = new Date().toLocaleTimeString(navigator.language, TimeOptions);
}

function outputDateAndTime(){
    displayDate();
    displayTime(time);
    displayTime(titleTime);
}
setInterval(outputDateAndTime, 100);

/**
 * Change font
*/
const selectFont = document.getElementById('font-selector');
selectFont.addEventListener('change', (e) => {
    e.preventDefault();
    
    const selectedFont = `${selectFont[selectFont.value].textContent}`
    
    date.style.fontFamily = selectedFont;
    time.style.fontFamily = selectedFont;

    // Save the font setting, so it will be reloaded
    localStorage.setItem("font", selectFont.value);
});

/**
 * Light and dark mode
*/
const selectColourMode = document.getElementById('light-dark-mode-selector');
selectColourMode.addEventListener('change', () => {
    if(document.body.classList.contains('dark')){
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      // Save the light mode setting, so it will be reloaded
      localStorage.setItem("colorMode", "light");
    }else{
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      // Save the dark mode setting, so it will be reloaded
      localStorage.setItem("colorMode", "dark");
    }
});

/**
 * 12-24 Hours
*/
const selectHours = document.getElementById('12-24-h-selector');
selectHours.addEventListener('change', () => {
  if (selectHours.value === "12h") {
    hourFormat = "h12";
  } else {
    hourFormat = "h23";
  }

  TimeOptions = {
    hourCycle: hourFormat,
  };

  // Save the hour format setting, so it will be reloaded
  localStorage.setItem("hourFormat", hourFormat);
});

/**
 * Recover the settings if any setting was assigned
 */
window.addEventListener("load", () => {
  // Font setting
  const savedFont = localStorage.getItem("font");
  if (savedFont) {
    selectFont.value = savedFont;
    date.style.fontFamily = `${selectFont[selectFont.value].textContent}`;
    time.style.fontFamily = `${selectFont[selectFont.value].textContent}`;
  }

  // Light-Mode setting
  const savedColorMode = localStorage.getItem("colorMode");
  if (savedColorMode) {
    if (savedColorMode === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }

  // Hour format setting
  const savedHourFormat = localStorage.getItem("hourFormat");
  if (savedHourFormat) {
    hourFormat = savedHourFormat;
    selectHours.value = hourFormat === "h12" ? "12h" : "24h";
    TimeOptions = {
      hourCycle: hourFormat,
    };
  }
});

/* My little brother's first line of code. He's 9 years old. */
console.log("hotspot");