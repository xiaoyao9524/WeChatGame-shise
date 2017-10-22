//index.js
Page({
  startGame() {
    wx.redirectTo({
      url: "../game/game"
    })
  },
  onShareAppMessage: function () {
    return {
      title: '小游戏：识色',
      desc: '作者：xiaoyao9524',
      path: '/page/index/index'
    }
  }
})
