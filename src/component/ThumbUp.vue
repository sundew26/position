<template>
  <label class="fl label label-praise" @click.stop="praises()">
    <span class="iconfont icon-praise"></span>
    <span>{{datas.praises}}</span>
    <span class="praise-trans move-down" v-if="moveDown">+1</span>
  </label>
  <label class="fl label label-tread" @click.stop="treads()">
    <span class="iconfont icon-tread"></span>
    <span>{{datas.treads}}</span>
    <span class="tread-trans move-up" v-if="moveUp">-1</span>
  </label>
</template>
<script>
/* eslint-disable */
import * as FastClick from 'fastclick/lib/fastclick'
export default {
  props: ['datas', 'idx'],
  data () {
    return {
      moveDown: false,
      moveUp: false
    }
  },
  methods: {
    praises () {
      this.moveDown = true
      setTimeout(function () {
        this.datas.praises += 1
        this.moveDown = false
      }.bind(this), 400)
    },
    treads () {
      this.moveUp = true
      this.datas.treads -= 1
      setTimeout(function () {
        this.moveUp = false
      }.bind(this), 400)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../style/common.scss';
.label{
  width: 50%;
  height: 100%;
  text-align: center;
  color: #008000;
span{
  width: 50%;
  height: 50%;
  text-align: center;
}
}
.iconfont{
  width: 32px;
  height: 32px;
  font-size: 32px;
}
.label-tread{
  color: #ff0000;
}
.praise-trans{
  position: absolute;
  left: 0;
  z-index: 99;
}
.tread-trans{
  position: absolute;
  right: 0;
  z-index: 99;
}
.move-down{
  animation: trans-down .4s;
}
.move-up{
  animation: trans-up .4s;
}
@keyframes trans-down {
  0% {
    top: -50%;opacity: 1;
  }
  50% {
    top: 10%;opacity: 0.7;
  }
  100% {
    top: 50%;opacity: 0;
  }
}
@keyframes trans-up {
  0% {
    top: 50%;opacity: 1;
  }
  50% {
    top: 10%;opacity: 0.3;
  }
  100% {
    top: -50%;opacity: 0;
  }
}
</style>
