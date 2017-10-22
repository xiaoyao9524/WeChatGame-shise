// pages/game/game.js
import { getData } from '../../utils/util.js'
const app = getApp();

console.log(app);
Page({
  data: {
    currentScore: 0, // 当前的分数,
    gameData: getData(0),
    baseColor: {},
    changeColor: {},
    list: [],
    timer: null,
    timeCount: 60,
    suspend: false
  },
  onReady () {
    console.log(this.data.gameData);
    this.handleData();
    this.calculationTime();
  },
  calculationTime: function () { // 计时
    let timeCount = this.data.timeCount;
    let timer = setInterval(() => {
      timeCount--;
      if (timeCount < 0) {
        clearInterval(timer);
        let score = app.currentScore = this.data.currentScore;
        let levels = ["瞎子", "色盲", "色郎", "色狼", "色鬼", "色魔", "超级色魔", "变态色魔", "孤独求色"];
        app.msg = levels[score] || levels[levels.length - 1];
        wx.redirectTo({
          url: "../over/over"
        })
        return;
      }
      this.setData({
        timeCount
      });
    }, 1000);
    this.setData({
      timer
    });
  },
  suspend: function () { // 暂停
    let timer = this.data.timer;
    clearInterval(timer);
    this.setData({
      suspend: true
    });
  },
  continue: function () { // 继续
    this.calculationTime();
    this.setData({
      suspend: false
    })
  },
  handleData: function () { // 二次处理数据
    let baseColor = {
      color: this.data.gameData.baseColor,
      colorText: this.data.gameData.baseColorText,
      flag: true,
      currentClass: this.data.gameData.currentClass
    };
    let changeColor = {
      color: this.data.gameData.changeColor,
      colorText: this.data.gameData.changeColorText,
      flag: false,
      currentClass: this.data.gameData.currentClass
    }
    let list = [];
    let currentMapNum = (this.data.gameData.currentMapNum * this.data.gameData.currentMapNum - 1);
    for (let i = 0; i < currentMapNum; i++) {
      list.push(JSON.parse(JSON.stringify(changeColor)));
    };
    list.push(JSON.parse(JSON.stringify(baseColor)));
    list.sort(() => {
      return Math.random() - 0.5;
    });
    this.setData({
      list
    });
    console.log(this.data.list);
  },
  nextCheckpoint (ev) {
    let flag = ev.target.dataset.flag;
    if (!flag) {
      return;
    };
    let _this = this.data;
    _this.currentScore++;
    let currentScore = _this.currentScore;
    this.setData({
      currentScore
    })
    _this.gameData = getData(_this.currentScore);
    this.handleData();
    console.log(this.data.gameData);
  }
})