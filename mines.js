let win;
let timerVar;
let amountOfFlags;
let amountOfMines;
let seconds = 0;
let minutes = 0;
let end;
let rows;
let columns;
let isGameUp = true;

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkIfHasMinesByCoords = (i1, i2) => {
  const cell = document.querySelector(`[data-order = "${i1}_${i2}"]`);
  return cell !== null && checkIfHasMinesByElem(cell);
};

const checkIfHasMinesByElem = (cell) => {
  return parseInt(cell.getAttribute("data-mined"), 2) === 1;
};

const revealCell = (row, coll) => {
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
};

const createMines = () => {
  for (let i = 0; i < amountOfMines; i += 1) {
    const randomX = getRandomInt(0, rows - 1);
    const randomY = getRandomInt(0, columns - 1);
    const status = checkIfHasMinesByCoords(randomX, randomY);
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
          if (checkIfHasMinesByCoords(i, j)) {
            MineCounts += 1;
          }
        }
      }

      document
        .querySelector(`[data-order = '${cellRow}_${cellColl}']`)
        .setAttribute("data-amount", MineCounts);
    }
  }
};

const createField = (rows_, columns_, mines_) => {
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
  isGameUp = true;

  createMines();
};

const newGame = () => {
  document.querySelector(".game-status").innerHTML = "";
  createField(rows, columns, amountOfMines);
  isGameUp = true;
  document
    .querySelector("#newGame")
    .classList.add("game-controll__btn--hidden");
  turn();
};

const userWins = () => {
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
};

const revealNeighbourCells = (cellRow, cellCol) => {
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
};

const gameOver = () => {
  document
    .querySelectorAll(".bomb-pic")
    .forEach((bomb) => bomb.classList.add("shown"));
  document
    .querySelector("#board")
    .insertAdjacentHTML(
      "beforeend",
      "<div class = 'game-status'><span class = 'game-status_text'>Press New Game button to start a new game</span></div>"
    );
  isGameUp = false;
  document
    .querySelector("#newGame")
    .classList.remove("game-controll__btn--hidden");
};

const turn = () => {
  seconds = 0;
  minutes = 0;
  isGameUp = true;

  clearInterval(timerVar);

  timerVar = setInterval(() => {
    seconds += 1;
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }
    if (!isGameUp) {
      clearInterval(timerVar);
    }
    if (win) {
      document
        .querySelector("#winTimes")
        .insertAdjacentHTML(
          "beforeend",
          `<span class = "attemptsBox">00:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}</span>`
        );
      win = false;

      seconds = 0;
      minutes = 0;
      clearInterval(timerVar);
    }
    document.querySelector(
      "#timer"
    ).innerHTML = `<div class = "timer" id = "storage"><span class = "timer_text">00:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}</span></div> `;
  }, 1000);

  document.querySelectorAll(".cell").forEach((cell) =>
    cell.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (isGameUp) {
        if (!e.target.classList.contains("cell-opened")) {
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
      end = false;
      if (isGameUp) {
        if (
          cell.classList.contains("cell-opened") ||
          cell.classList.contains("flagged")
        ) {
          console.log("no");
        } else if (checkIfHasMinesByElem(cell)) {
          isGameUp = false;
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
};

const markActiveController = (controllerId) => {
  document
    .querySelectorAll('[id~="Lvl"')
    .forEach((controller) => controller.classList.remove("active-field"));

  document.getElementById(controllerId).classList.add("active-field");
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#easyLvl").addEventListener("click", () => {
    markActiveController("easyLvl");

    createField(9, 9, 10);

    document
      .getElementById("newGame")
      .classList.add("game-controll__btn--hidden");
    turn();
  });

  document.getElementById("mediumLvl").addEventListener("click", () => {
    markActiveController("mediumLvl");

    createField(13, 15, 40);

    document
      .getElementById("newGame")
      .classList.add("game-controll__btn--hidden");
    turn();
  });

  document.getElementById("hardLvl").addEventListener("click", () => {
    markActiveController("hardLvl");

    createField(16, 30, 99);

    document
      .getElementById("newGame")
      .classList.add("game-controll__btn--hidden");
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
