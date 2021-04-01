//wxcharts.js
const LoginUtil=require('../util/checkLogin.js')
var Charts = require('../util/wxcharts-min.js');
const dateUtil=require('../util/Date.js')
const ArrUtil=require('../util/arrUtil.js')
import Dialog from '/@vant/weapp/dialog/dialog';
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth()+1;
Page({
  data: {
    showSearch:true,//显示搜索空状态
    hiddenCanvas:" ",//一开始显示图表
    Canvas2:"removeCanvas",
    showDate: '',
    arrObjI:[], //时间段数据
    arrObjO:[],
    minDate:dateUtil.getMinDate(year,month),
    defaultDate:new Date().getTime(),
    activeNames: ['1'], //折叠面板参数
    overlayShow:true,
    //日历组件数据
    years:[year,year-1,year-2],
    months:['1','2','3','4','5','6','7','8','9','10','11','12'],
    tempMinyear:year,//临时年
    tempMinmon:month, //临时月
    confirmMinYear:year,//确定年
    confirmMinMon:month,//确定月
    tempMinIndex:'0', //控制年的样式添加

    tempMaxyear:year,//临时大年
    temMaxmon:month, //临时大月
    confirmMaxYear:year,//确定大年
    confirmMaxMon:month,//确定大月
    tempMaxIndex:'0' //控制大年的样式添加
  },
  clickIO:function(e){
    //点击收入时
    if(e.detail.index===0){
      //显示收入图表
      this.setData({
        Canvas1:"removeCanvas",
        Canvas2:' '
      })
      this.showCanvas(this.data.ii,'canvas1')
    }else{
      //显示支出图表   
      this.setData({   
        Canvas1:' ',
        Canvas2:'removeCanvas'
      })
      this.showCanvas(this.data.oo,'canvas2')
    }
  },
  clickUrl:function(e){
    var data=e.currentTarget.dataset.obj
    console.log(data)
    //跳转带参
    wx.navigateTo({
      url:"/pages/list/list?arr="+JSON.stringify(data),   
    })
  },
  //自定义日历组件
  clickMinYear(event){
    this.setData({
      tempMinyear:event.currentTarget.dataset.year,
      tempMinIndex:event.currentTarget.dataset.index
    })
  },
  clickMinMon(event){
    this.setData({
      tempMinmon:event.currentTarget.dataset.mon
    })
  },
  onMyMinClose() {
    //关闭日历弹窗，隐藏日历，显示canvas
    this.setData({ 
      showMinRili:false,
      removeCanvasOne:false,
      //hiddenCanvas:""
    });
    var that=this
    setTimeout(function(){
      that.setData({ 
        hiddenCanvas:""
      })
    },100)
  },
  comfirmMinFun(){
    //将临时year mon 存储到正式区
    this.setData({
      confirmMinYear:this.data.tempMinyear,
      confirmMinMon:this.data.tempMinmon
    })
    //查询
  },
  showRiliMinDialog(){
    //显示日历控件，移除画布
    this.setData({ showMinRili: true ,removeCanvasOne:true,hiddenCanvas:"hiddenCanvas"});
    
  },
  //自定义日历组件2
  clickMaxYear(event){
    this.setData({
      tempMaxyear:event.currentTarget.dataset.year,
      tempMaxIndex:event.currentTarget.dataset.index
    })
  },
  clickMaxMon(event){
    this.setData({
      temMaxmon:event.currentTarget.dataset.mon
    })
  },
  onMyMaxClose() {
   this.setData({ showMaxRili: false });
   var that=this
   setTimeout(function(){
     that.setData({ 
       hiddenCanvas:""
     })
   },100)
  },
  comfirmMaxFun(){
    //将临时year mon 存储到正式区
    this.setData({
      confirmMaxYear:this.data.tempMaxyear,
      confirmMaxMon:this.data.temMaxmon
    })
    //查询
  },
  showRiliMaxDialog(){
    //显示日历控件
    this.setData({ showMaxRili: true ,hiddenCanvas:"hiddenCanvas"});
  },
  selectDateRangBtn(){
    this.setData({
      showSearch:false
    })
    //区间查找数据
    let miny=this.data.confirmMinYear
    let minm=dateUtil.changeNum(this.data.confirmMinMon)
    let minDate=miny+minm+'01' //最小日期
    let maxy=this.data.confirmMaxYear
    let maxm=dateUtil.changeNum(this.data.confirmMaxMon)
    let mmday=dateUtil.getMaxDate(maxy,maxm)
    let maxDate=dateUtil.formatDate(mmday) //最大日期 
    console.log(minDate,maxDate)
    if(parseInt(minDate)>parseInt(maxDate)){
      Dialog.alert({
        title: '标题',
        message: '右边日期不能小于左边日期',
      }).then(() => {
        // on close
      });
    }else{    
      //拿到支出收入数组
      this.callSelectRangDate(minDate,maxDate)
    } 
  },
  showCanvas:function(newArr,canvas){
     if(newArr.length<=0) return false;
      new Charts({
        canvasId: canvas,
        type: 'pie',
        series:newArr,
        width:250,
        height: 250,
        dataLabel: true
      }); 
  },
  //自定义组件2
  onLoad:function(e){
       
  },
  onLoginTip:function(){
    Dialog.alert({
      message: '在我的页面授权后，才能使用~',
    }).then(() => {
      // on close
    });
  },
  callSelectRangDate:function(minDate,maxDate){
    wx.cloud.callFunction({
      // 云函数名称
      name: 'SelectRangDate',
      // 传给云函数的参数
      data: {
        //一个月的范围
        minDate:parseInt(minDate),
        maxDate:parseInt(maxDate)
      },
      complete: res => {
        let arr=[]
        if(res.result.data.length>0){
            arr=ArrUtil.GroupByArr(res.result.data,"item_type")   
            let newArrI=[]
            let newArrO=[]
            //遍历newArr，把收入支出按类目分类
            for(let j=0;j<arr.length;j++){
                if(arr[j].key=='O'){
                  newArrO=arr[j].value //支出数据集合             
                }else{
                  newArrI=arr[j].value //收入数据集合
                }
            }
            //支出
            if(newArrO.length>0){
              let arr2=ArrUtil.GroupByArr(newArrO,"item_name")
              let oo=[]
              for(let i=0;i<arr2.length;i++){          
                //count 总数
                oo.push({
                  "name":arr2[i].key,
                  "data":Math.abs(arr2[i].count) ,
                  "color":this.color16(),
                  "sum":arr2[i].sum,
                  "index":arr2[i].index
                })
              }
              this.setData({
                msg:false,
                oo:oo,
                arrObjO:arr2,
                messageO:''
              })
              this.showCanvas(oo,'canvas2')
            }         
            //收入的
            if(newArrI.length>0){
                let arr3=ArrUtil.GroupByArr(newArrI,"item_name")
                let ii=[]
                for(let i=0;i<arr3.length;i++){          
                  //count 总数
                  ii.push({
                    "name":arr3[i].key,
                    "data":Math.abs(arr3[i].count) ,
                    "color":this.color16(),
                    "sum":arr3[i].sum,
                    "index":arr3[i].index
                  })
                }
                this.setData({
                  ii:ii,
                  msg:false,                
                  arrObjI:arr3,
                  messageI:''
                }) 
                  this.showCanvas(ii,'canvas1')   
              }                            
        }else{
          console.log("无数据")
          this.setData({
            msg:true,
            arrObjO:null,
            arrObjI:null
          })
        }            
      } 
    })   
  },
  color16:function(){//rgb颜色随机
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256); 
    var b = Math.floor(Math.random()*256); 
    var rs = r.toString(16); var gs = g.toString(16);
    var bs = b.toString(16); if(rs.length<2) rs = "0"+rs; 
    if(gs.length<2) gs = "0"+gs;
    if(bs.length<2) bs = "0"+bs; 
    return '#' + rs + gs + bs; 
  },
  onReady: function (e) {
    
  },
  onShow:function(){
    var cover=LoginUtil.getOverlayShowStorge()
    if(cover){
      this.setData({
        overlayShow:false
      })
      //加载图表 默认统计当月
      // let minDate=dateUtil.formatDate(this.data.minDate) 
      // let maxDate=dateUtil.formatDate(this.data.defaultDate)
      // this.setData({
      //   min:minDate,
      //   max:maxDate,
      //   msg:false
      // }) 
     // this.callSelectRangDate(minDate,maxDate)
    }
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  }
  
});

