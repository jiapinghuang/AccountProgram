//wxcharts.js
const util = require('../util/util.js');
var wxCharts = require('../util/wxcharts-min.js');
Page({
  data: {
  },
  onReady: function (e) {
    var windowWidth = 320;
    var windowHeight = 150;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
      windowHeight = res.windowHeight;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    new wxCharts({
      animation: true, //是否有动画
      canvasId: 'feiyu1',
      type: 'pie',
      series: [{
        name: '成交量1',
        data: 15,
      }, {
        name: '成交量2',
        data: 35,
      }, {
        name: '成交量3',
        data: 78,
      }],
      width: windowWidth,
      height: 200,
      dataLabel: true,
    });

    new wxCharts({
      animation:true,
      canvasId: 'feiyu2',
      type: 'line',
      categories: ['2015', '2016', '2017', '2018', '2019', '2020'],
      series: [{
        name: '成交量1',
        data: [0.15, 0.2, 0.45, 0.37, 0.4, 0.8],
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }, {
        name: '成交量2',
        data: [0.30, 0.37, 0.65, 0.78, 0.69, 0.94],
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }],
      yAxis: {
        title: '成交金额 (万元)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: windowWidth,
      height: 200
    });

    new wxCharts({
      canvasId: 'feiyu3',
      type: 'column',
      animation: true,
      categories: ['2013', '2014', '2015', '2016', '2017'],
      series: [{
        name: '订单量',
        color: '#188df0',
        data: [23, 28, 35, 54, 95],
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '万';
        },
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15,
        },
        legendTextColor: '#000000'
      },
      width: windowWidth,
      height: 200,
    });
  
  }
});

