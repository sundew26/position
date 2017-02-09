<template>
  <ul class="slide-list" id="slideList">
    <li class="clearfix lists" v-for="(index,item) in listData" id="list{{$index}}" @click="hideMask()">
      <div class="info" id="info{{$index}}">
        <p><span class="iconfont icon-avatar"></span>{{item.name}}</p>
        <p><span class="iconfont icon-tel"></span>{{item.tel}}</p>
        <p><span class="iconfont icon-addr"></span>{{item.addr}}</p>
      </div>
      <div class="mask clearfix" id="mask{{$index}}">
        <thumb-up :datas.sync="listData[$index]"></thumb-up>
      </div>
    </li>
  </ul>
  <toast :show.sync="showToast" type="text" width="20em">{{toastMsg}}</toast>
</template>
<script>
/* eslint-disable */
import {Toast} from 'vux/src/components'
import ThumbUp from './ThumbUp.vue'
import * as FastClick from 'fastclick/lib/fastclick'
export default {
  data () {
    return {
      toastMsg: '',
      listData: [
        {"name": '111111111', "tel": '111111111', "addr": '111111111', "praises": 10, "treads": 0},
        {"name": '222222222', "tel": '222222222', "addr": '222222222', "praises": 10, "treads": 0},
        {"name": '333333333', "tel": '333333333', "addr": '333333333', "praises": 10, "treads": 0},
        {"name": '444444444', "tel": '444444444', "addr": '444444444', "praises": 10, "treads": 0},
        {"name": '555555555', "tel": '555555555', "addr": '555555555', "praises": 10, "treads": 0},
        {"name": '666666666', "tel": '666666666', "addr": '666666666', "praises": 10, "treads": 0},
        {"name": '777777777', "tel": '777777777', "addr": '777777777', "praises": 10, "treads": 0},
        {"name": '888888888', "tel": '888888888', "addr": '888888888', "praises": 10, "treads": 0},
        {"name": '999999999', "tel": '999999999', "addr": '999999999', "praises": 10, "treads": 0},
        {"name": 'aaaaaaaaa', "tel": 'aaaaaaaaa', "addr": 'aaaaaaaaa', "praises": 10, "treads": 0},
        {"name": 'bbbbbbbbb', "tel": 'bbbbbbbbb', "addr": 'bbbbbbbbb', "praises": 10, "treads": 0},
        {"name": 'ccccccccc', "tel": 'ccccccccc', "addr": 'ccccccccc', "praises": 10, "treads": 0},
        {"name": 'ddddddddd', "tel": 'ddddddddd', "addr": 'ddddddddd', "praises": 10, "treads": 0}
      ],
      showToast: false,
      moveFlag: false, // 判断是否应该展开蒙版,移动超过1/3展开
      moveLength: 0,  // 蒙版移动距离
      idx: {}       //需要左移动的li元素
    }
  },
  components: {
    Toast,
    ThumbUp
  },
  methods: {
    // 隐藏所有蒙版
    hideMask() {
      let liEl = document.getElementsByClassName('lists')
      for (let i = 0, len = liEl.length; i < len; i++) {
        liEl[i].style.marginLeft = 0
      }
    }
  },
  ready () {
    let _this = this
    // fastclick 解决穿透
    FastClick.attach(document.body)
    // 以下为滑动时,展示蒙版方法
    _this.$nextTick(function () {
      let oB = document.getElementById('slideList')
      let startX
      let startY
      let oBh = oB.offsetTop
      var mskW = document.getElementById('mask0').offsetWidth
      var listH = document.getElementById('info0').offsetHeight
      var isTouch
      oB.addEventListener('touchstart', function (e) {
        startX = e.touches[0].pageX
        startY = e.touches[0].pageY
        _this.idx = document.getElementById('list' + parseInt((startY - oBh) / listH, 10))
        isTouch = false
      })
      oB.addEventListener('touchmove', function (e) {
        if (!isTouch) {
          _this.hideMask()
        }
        isTouch = true
        let endX = e.changedTouches[0].pageX
        let endY = e.changedTouches[0].pageY
        let isScrolling = Math.abs(endY - startY) > 10 ? 1 : 0
        if (isScrolling === 0) {
          e.preventDefault()
        }
        let len = startX - endX
        _this.moveLength = len >= mskW ? mskW : len <= 0 ? 0 : len
        _this.idx.style.marginLeft = -_this.moveLength + 'px'
      }, false)
      oB.addEventListener('touchend', function () {
        if (isTouch) {
          _this.moveFlag = _this.moveLength >= mskW / 3 ? 1 : 0
          _this.moveLength = _this.moveFlag === 1 ? mskW : 0
          _this.idx.style.marginLeft = -_this.moveLength + 'px'
          _this.moveFlag = 0
          _this.moveLength = 0
        }
      })
    })
  }
}
</script>
<style>
  html, body{
    overflow-x: hidden;
  }
</style>
<style lang="scss" scoped>
@import '../style/common.scss';
.slide-list{
  li{
    width: 100%;
    border-top: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    background-color: #fff;
    box-sizing: border-box;
    position: relative;
    .info{
      p{
        font-size: 12px;
        color: #333;
        line-height: 28px;
        height: 28px;
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .iconfont{
          padding: 0 10px;
        }
      }
    }
    .mask{
      overflow: hidden;
      transition: all .3s;
      position: absolute;
      top: 0;
      right: -100px;
      width: 100px;
      height: 100%;
      background: rgba(0,0,0,0.1);
      z-index: 999;
      vertical-align: middle;
      box-sizing: border-box;
    }
  }
}
</style>
