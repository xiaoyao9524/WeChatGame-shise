// pages/over/over.js
Page({
  data: {
    msg: '',
    currentScore: 0
  },
  onShow: function () {
    let app = getApp();
    console.log(app);
    let msg = app.msg;
    let currentScore = app.currentScore;
    this.setData({
      msg,
      currentScore
    })
  },
  restart: function () {
    wx.redirectTo({
      url: "../index/index"
    })
  }
})