

let playGame = function() {
  let $btns = document.getElementsByClassName("btn");
  let $start = document.getElementById("start");
  let $reset = document.getElementById("reset");
  let $counter = document.getElementById("counter");

  let pattern = [];
  let userPattern = [];

  let sound0 = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
  );
  let sound1 = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
  );
  let sound2 = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
  );
  let sound3 = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  );

  function displayCounter() {
    $counter.innerHTML = pattern.length;
  }

  function simulateClick(element) {
    var mousedown = new Event("mousedown");
    var mouseup = new Event("mouseup");
    mouseup.shiftKey = true;
    element.dispatchEvent(mousedown);
    window.setTimeout(function() {
      element.dispatchEvent(mouseup);
    }, 500);
  }

  function displayPattern(arr, index) {
    simulateClick($btns[arr[index]]);
    window.setTimeout(function() {
      if (pattern.length !== 0 && arr[index + 1] != undefined) {
        displayPattern(arr, index + 1);
      }
    }, 1000);
  }

  function generateNum() {
    return Math.floor(Math.random() * 4);
  }

  function patternCheck() {
    for (var i = 0; i < userPattern.length; i++) {
      if (pattern[i] !== userPattern[i]) {
        alert("Try again");
        userPattern = [];
        window.setTimeout(function() {
          displayPattern(pattern, 0);
        }, 1000);
      }
      if (
        i === userPattern.length - 1 &&
        pattern.length === userPattern.length
      ) {
        console.log(pattern.length);
        console.log(userPattern.length);
        userPattern = [];
        pattern.push(generateNum());
        displayCounter();
        window.setTimeout(function() {
          displayPattern(pattern, 0);
        }, 1000);
      }
    }
  }

  for (var i = 0; i < $btns.length; i++) {
    var originalClasses = $btns[i].className;
    $btns[i].addEventListener("mousedown", function(e) {
      e.target.className += " lighten";
      if (e.target.id === "red") {
        sound0.play();
      } else if (e.target.id === "yellow") {
        sound1.play();
      } else if (e.target.id === "green") {
        sound2.play();
      } else if (e.target.id === "blue") {
        sound3.play();
      }
    });

    $btns[i].addEventListener("mouseup", function(e) {
      e.target.className = originalClasses;
      if (!e.shiftKey) {
        if (e.target.id === "red") {
          userPattern.push(0);
        } else if (e.target.id === "yellow") {
          userPattern.push(1);
        } else if (e.target.id === "green") {
          userPattern.push(2);
        } else if (e.target.id === "blue") {
          userPattern.push(3);
        }
        patternCheck();
      }
    });
  }

  $start.addEventListener("click", function() {
    if (pattern.length === 0) {
      pattern.push(generateNum());
      displayCounter();
      simulateClick($btns[pattern[0]]);
    }
  });

  $reset.addEventListener("click", function() {
    pattern = [];
    userPattern = [];
    displayCounter();
  });
}

playGame();


