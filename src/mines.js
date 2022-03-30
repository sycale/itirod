let win;
let timerVar;
let amountOfFlags;
let amountOfMines;
let seconds = 0;
let minutes = 0;
let end;
let rows;
let columns;
let checkpoint = true;
let bombed = false;

function remove(arr, value) {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    }
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkIfHasMines(i1, i2) {
  if (
    document.querySelector(`[data-order = "${i1}_${i2}"]`) !== null &&
    parseInt(
      document
        .querySelector(`[data-order = "${i1}_${i2}"]`)
        .getAttribute("data-mined"),
      2
    ) === 1
  ) {
    return true;
  }
  return false;
}
function checkIfHasMinesObject(cell) {
  return parseInt(cell.getAttribute("data-mined"), 2) === 1;
}

function revealCell(row, coll) {
  document
    .querySelector(`[data-order = '${row}_${coll}']`)
    .classList.add("cell-opened");
  document
    .querySelector(`[data-order = '${row}_${coll}']`)
    .classList.remove("cell-not_opened");
  const mineCount = document
    .querySelector(`[data-order = '${row}_${coll}']`)
    .getAttribute("data-amount");
  if (
    mineCount > 0 &&
    document.querySelector(`[data-order = '${row}_${coll}']`).firstChild ===
      null
  ) {
    document
      .querySelector(`[data-order = '${row}_${coll}']`)
      .insertAdjacentHTML(
        "beforeend",
        `<span class="counter">${mineCount}</span>`
      );
  }
}

function createMines() {
  for (let i = 0; i < amountOfMines; i += 1) {
    const randomX = getRandomInt(0, rows - 1);
    const randomY = getRandomInt(0, columns - 1);
    const status = checkIfHasMines(randomX, randomY);
    if (!status) {
      document
        .querySelector(`[data-order = "${randomX}_${randomY}"]`)
        .setAttribute("data-mined", 1);
      document
        .querySelector(`[data-order = "${randomX}_${randomY}"]`)
        .insertAdjacentHTML(
          "beforeend",
          "<img src = 'https://static.thenounproject.com/png/965385-200.png' class = 'bomb-pic'></img>"
        );
    } else {
      i -= 1;
      continue;
    }
  }
  for (let cellRow = 0; cellRow < rows; cellRow += 1) {
    for (let cellColl = 0; cellColl < columns; cellColl += 1) {
      let MineCounts = 0;
      for (let i = cellRow - 1; i < cellRow + 2; i += 1) {
        for (let j = cellColl - 1; j < cellColl + 2; j += 1) {
          if (checkIfHasMines(i, j)) {
            MineCounts += 1;
          }
        }
      }

      document
        .querySelector(`[data-order = '${cellRow}_${cellColl}']`)
        .setAttribute("data-amount", MineCounts);
    }
  }
}

function createField(rows_, columns_, mines_) {
  document.querySelector("#board").innerHTML = "";
  amountOfFlags = mines_;
  rows = rows_;
  columns = columns_;
  amountOfMines = mines_;
  document.querySelector(
    "#flags"
  ).innerHTML = `<div class = "flags">Left flags: ${amountOfFlags}</div>`;
  for (let i = 0; i < rows; i += 1) {
    document
      .querySelector("#board")
      .insertAdjacentHTML("beforeend", `<div class = 'row row-${i}'></div>`);
    for (let j = 0; j < columns; j += 1) {
      document
        .querySelector(`.row-${i}`)
        .insertAdjacentHTML(
          "beforeend",
          `<div class = "cell cell-not_opened" data-order = '${i}_${j}'></div>`
        );
    }
  }
  checkpoint = true;

  createMines();
}

function newGame() {
  document.querySelector(".game-status").innerHTML = "";
  createField(rows, columns, amountOfMines);
  checkpoint = true;
  document
    .querySelector("#newGame")
    .classList.add("game-controll__btn--hidden");
  turn();
}

function userWins() {
  let amountOfCellsOpened = 0;
  document.querySelectorAll(".cell").forEach((cell) => {
    if (cell.classList.contains("cell-opened")) {
      amountOfCellsOpened += 1;
    }
  });
  if (amountOfCellsOpened === rows * columns - amountOfMines) {
    return true;
  }
  return false;
}

function revealNeighbourCells(cellRow, cellCol) {
  console.log(cellRow, cellCol);
  if (
    document.querySelector(`[data-order = '${cellRow}_${cellCol}']`) !== null
  ) {
    document
      .querySelector(`[data-order = '${cellRow}_${cellCol}']`)
      .classList.add("visited");
  }
  if (cellRow === rows || cellCol === columns || cellRow < 0 || cellCol < 0) {
    return;
  }
  if (
    document
      .querySelector(`[data-order = '${cellRow}_${cellCol}']`)
      .getAttribute("data-amount") > 0
  ) {
    revealCell(cellRow, cellCol);
    return;
  }
  if (
    !document
      .querySelector(`[data-order = '${cellRow}_${cellCol}']`)
      .classList.contains("cell-opened")
  ) {
    revealCell(cellRow, cellCol);
    revealNeighbourCells(cellRow - 1, cellCol);
    revealNeighbourCells(cellRow, cellCol - 1);
    revealNeighbourCells(cellRow, cellCol + 1);
    revealNeighbourCells(cellRow + 1, cellCol);
  }
}

function gameOver() {
  document
    .querySelectorAll(".bomb-pic")
    .forEach((bomb) => bomb.classList.add("shown"));
  document
    .querySelector("#board")
    .insertAdjacentHTML(
      "beforeend",
      "<div class = 'game-status'><span class = 'game-status_text'>Press New Game button to start a new game</span></div>"
    );
  bombed = true;
  document
    .querySelector("#newGame")
    .classList.remove("game-controll__btn--hidden");
}

function turn() {
  seconds = 0;
  minutes = 0;
  bombed = false;
  clearInterval(timerVar);
  timerVar = setInterval(() => {
    seconds += 1;
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }
    if (bombed) {
      clearInterval(timerVar);
    }
    if (win) {
      if (minutes > 10 && seconds > 10) {
        document
          .querySelector("#winTimes")
          .insertAdjacentHTML(
            "beforeend",
            `<span class = "attemptsBox">00:${minutes}:${seconds}</span>`
          );
      } else if (minutes < 10 && seconds < 10) {
        document
          .querySelector("#winTimes")
          .insertAdjacentHTML(
            "beforeend",
            `<span class = "attemptsBox">00:0${minutes}:0${seconds}</span>`
          );
      } else if (minutes < 10 && seconds > 10) {
        document
          .querySelector("#winTimes")
          .insertAdjacentHTML(
            "beforeend",
            `<span class = "attemptsBox">00:0${minutes}:${seconds}</span>`
          );
      } else if (minutes > 10 && seconds < 10) {
        document
          .querySelector("#winTimes")
          .insertAdjacentHTML(
            "beforeend",
            `<span class = "attemptsBox">00:${minutes}:0${seconds}</span>`
          );
      }
      win = false;

      seconds = 0;
      minutes = 0;
      clearInterval(timerVar);
    }

    if (seconds / 10 < 1 && minutes / 10 < 1) {
      document.querySelector(
        "#timer"
      ).innerHTML = `<div class = "timer" id = "storage"><span class = "timer_text">00:0${minutes}:0${seconds}</span></div> `;
    } else if (seconds / 10 > 1 && minutes / 10 < 1) {
      document.querySelector(
        "#timer"
      ).innerHTML = `<div class = "timer" ><span class = "timer_text">00:0${minutes}:${seconds}</span></div> `;
    } else if (minutes / 10 > 1 && seconds / 10 < 1) {
      document.querySelector(
        "#timer"
      ).innerHTML = `<div class = "timer"><span class = "timer_text">00:${minutes}:0${seconds}<span></div> `;
    } else if (minutes / 10 === 1 && seconds / 10 === 1) {
      document.querySelector(
        "#timer"
      ).innerHTML = `<div class = "timer"><span class = "timer_text">00:${minutes}:${seconds}</span></div> `;
    } else if (minutes / 10 === 1 && seconds / 10 < 1) {
      document.querySelector(
        "#timer"
      ).innerHTML = `<div class = "timer"><span class = "timer_text">00:${minutes}:0${seconds}</span></div> `;
    } else if (minutes / 10 < 1 && seconds / 10 === 1) {
      document.querySelector(
        "#timer"
      ).innerHTML = `<div class = "timer"><span class = "timer_text">00:0${minutes}:${seconds}</span></div> `;
    }
  }, 1000);
  document.querySelectorAll(".cell").forEach((cell) =>
    cell.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (checkpoint) {
        if (!e.target.classList.contains("cell-opened")) {
          console.log(e.target.parentNode);
          if (e.target.parentNode.classList.contains("flagged")) {
            e.target.parentNode.classList.remove("flagged");
            amountOfFlags += 1;
            e.target.parentNode.removeChild(e.target);
          } else if (amountOfFlags !== 0) {
            e.target.classList.add("flagged");
            amountOfFlags -= 1;
            e.target.insertAdjacentHTML(
              "beforeend",
              "<img src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Flag_icon_orange_4.svg/250px-Flag_icon_orange_4.svg.png' class = 'flag-pic'></img>"
            );
          }
          document.querySelector(
            "#flags"
          ).innerHTML = `<div class = "flags">Left flags: ${amountOfFlags}</div>`;
        }
      }
    })
  );

  document.querySelectorAll(".cell").forEach((cell) =>
    cell.addEventListener("click", () => {
      console.log("here");
      end = false;
      if (checkpoint) {
        if (
          cell.classList.contains("cell-opened") ||
          cell.classList.contains("flagged")
        ) {
          console.log("no");
        } else if (checkIfHasMinesObject(cell)) {
          checkpoint = false;
          cell.style.backgroundColor = "red";
          gameOver();
        } else {
          const cellRow = parseInt(
            cell.getAttribute("data-order").split("_")[0]
          );
          const cellCol = parseInt(
            cell.getAttribute("data-order").split("_")[1]
          );
          revealNeighbourCells(cellRow, cellCol);
          if (userWins()) {
            win = true;
            document
              .querySelector("#newGame")
              .classList.remove("game-controll__btn--hidden");
            document
              .querySelectorAll(".bomb-pic")
              .forEach((bomb) => bomb.classList.add("shown"));
            document.querySelectorAll(".cell").forEach((cell) => {
              cell.outerHTML = cell.outerHTML;
            });
            document
              .querySelector("#board")
              .insertAdjacentHTML(
                "beforeend",
                "<div class = 'game-status'><span class = 'game-status_text>Press New Game button to start a new game</span></div>'"
              );
          }
        }
      }
    })
  );
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("here");
  document.querySelector("#easyLvl").addEventListener("click", () => {
    console.log("here");
    document.getElementById("mediumLvl").classList.remove("active-field");
    document.getElementById("hardLvl").classList.remove("active-field");
    document.getElementById("easyLvl").classList.add("active-field");
    createField(9, 9, 80);
    document
      .getElementById("newGame")
      .classList.add("game-controll__btn--hidden");
    turn();
  });
  document.getElementById("mediumLvl").addEventListener("click", () => {
    createField(13, 15, 40);
    document.getElementById("easyLvl").classList.remove("active-field");
    document
      .getElementById("newGame")
      .classList.add("game-controll__btn--hidden");
    document.getElementById("hardLvl").classList.remove("active-field");
    document.getElementById("mediumLvl").classList.add("active-field");
    turn();
  });
  document.getElementById("hardLvl").addEventListener("click", () => {
    createField(16, 30, 99);

    document
      .getElementById("newGame")
      .classList.add("game-controll__btn--hidden");
    document.getElementById("easyLvl").classList.remove("active-field");
    document.getElementById("mediumLvl").classList.remove("active-field");
    document.getElementById("hardLvl").classList.add("active-field");
    turn();
  });

  document.querySelector("#showmines").addEventListener("click", () => {
    document
      .querySelectorAll(".bomb-pic")
      .forEach((bomb) => bomb.classList.toggle("shown"));
  });
  document.querySelector("#newGame").addEventListener("click", () => {
    end = true;
    newGame();
  });
});
