const minimumJackpot = 1993897.50;
const maximumJackpot = 25000000;
// this should be provided along with the minimumJackpot
const startDate =  new Date(2022, 03, 28, 0, 0, 0);

const numberOfSecondsPassed = (new Date().getTime() - startDate.getTime())/1000;
const difference = numberOfSecondsPassed / 100;
let startNumber = minimumJackpot + difference;

if (startNumber > maximumJackpot) {
  startNumber = maximumJackpot;
}

function animateValue(obj, endNumber, duration) {
  let startTimestamp = null;
  let numberOfDigits = Math.floor(endNumber).toString().length;
  const step = (timestamp) => {
    startTimestamp = startTimestamp || timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    let number = randomFixedInteger(numberOfDigits);
    let numberAfterComma = randomFixedInteger(2);
    obj.innerHTML = (number + numberAfterComma / 100).toLocaleString("en-En", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
      return;
    }
    
    obj.innerHTML = endNumber.toLocaleString("en-En", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  window.requestAnimationFrame(step);
}

function randomFixedInteger(length) {
  return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}

const obj = document.querySelector(".jackpotNumber");
animateValue(obj, startNumber, 3000);

setTimeout(function () {
  if(startNumber < maximumJackpot) {
    var interval = setInterval(() => {
      if (startNumber >= maximumJackpot) {
        clearInterval(interval);
      }

      startNumber += 0.01;
      obj.innerHTML = startNumber.toLocaleString("en-En", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }, 1000);
  }
}, 4000);