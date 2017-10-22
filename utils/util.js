const cubeMap = [2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 8, 8, 8, 9];

function getData(currentScore) {
  let currentMapNum = cubeMap[currentScore] || 9; // 根据传进来的值判断选哪个数
  let difficulty = 15 * (Math.max(9 - currentMapNum, 1)); // 难度系数
  difficulty = currentScore > 20 ? 8 : difficulty;
  difficulty = currentScore > 40 ? 5 : difficulty;
  difficulty = currentScore > 60 ? 3 : difficulty;

  let currentClass = "w" + currentMapNum;
  let baseColor = createBaseColor(difficulty);
  let baseColorText = "rgb(" + baseColor[0] + "," + baseColor[1] + "," + baseColor[2] + ")";
  let changeColor = [baseColor[0] - difficulty, baseColor[1] - difficulty, baseColor[2] - difficulty];
  let changeColorText = "rgb(" + changeColor[0] + "," + changeColor[1] + "," + changeColor[2] + ")";

  return {
    difficulty,
    currentMapNum,
    currentClass,
    baseColor,
    baseColorText,
    changeColor,
    changeColorText,
  }
}

function createBaseColor(difficulty) {
  let baseColor = [Math.ceil((Math.random() * (225 - difficulty)) + difficulty), Math.ceil((Math.random() * (225 - difficulty)) + difficulty), Math.ceil((Math.random() * (225 - difficulty)) + difficulty)];
  return baseColor;
}

module.exports = {
  getData
};