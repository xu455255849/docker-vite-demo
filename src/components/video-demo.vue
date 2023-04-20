<template>
  <div style="margin-bottom: 20px">
    <video height="480" width="720" id="webcam" style="display: none"></video>
    <button @click="captureCamera">摄像头采集</button>
    <div>
      <a-button @click="addLine">打开陀螺仪</a-button>
      <a-select v-model:value="value1" @change="handleLineChange">
        <a-select-option :value="0">0</a-select-option>
        <a-select-option :value="30">30</a-select-option>
        <a-select-option :value="60">60</a-select-option>
      </a-select>
    </div>
  </div>
  <div style="display: flex; justify-content: center">
    <canvas id="canvas" style="border:1px solid #ccc"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fabric } from 'fabric';

let canvas: fabric.Canvas;
let videoEl: HTMLVideoElement;
let fabVideoObj: fabric.Image;
let horizontalLine: fabric.Line;

const sizeOpts = {
  Basic: {
    w: 720,
    h: 480
  }
}

onMounted(() => {
  videoEl = document.getElementById('webcam') as HTMLVideoElement;
  initCanvas()

 navigator.mediaDevices.enumerateDevices().then(devices => {
   devices.forEach(function(device) {
     console.log(device.kind + ": " + device.label +
         " id = " + device.deviceId);
   });
 }).catch(function(err) {
   console.log(err.name + ": " + err.message);
 });
})

const initCanvas = () => {
  canvas = new fabric.Canvas('canvas', {
    width: sizeOpts.Basic.w,
    height: sizeOpts.Basic.h,
  });
  fabVideoObj = new fabric.Image(videoEl, {
    // width: sizeOpts.Basic.w,
    // height: sizeOpts.Basic.h,
    left: 0,
    top: 0,
    angle: 0,
    originX: 'left',
    originY: 'top',
    objectCaching: false,
    hasControls: false,
    lockMovementX: true,
    lockMovementY: true,
    hoverCursor: 'default',
    selectable: false
  })
}

const opts = {
  deviceId: {
    exact: 'c1303730b8b9191e85026b6ef876bf4497cabc89c396e0391c68041800f76c2a',
  }
}

const captureCamera = () => {
  navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then(stream => {
    // console.log(stream, 111)
    videoEl.srcObject = stream
    canvas.add(fabVideoObj)
    fabVideoObj.moveTo(0); // move webcam element to back of zIndex stack
    fabVideoObj.getElement().play();
  }).catch(error => {
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
  })

  fabric.util.requestAnimFrame((function render() {
    canvas.renderAll();
    fabric.util.requestAnimFrame(render);
  }))
}

const value1 = ref(0)
const addLine = () => {
  horizontalLine = new fabric.Line([
    0,
    sizeOpts.Basic.h / 2,
    sizeOpts.Basic.w,
    sizeOpts.Basic.h / 2,
  ], {
    stroke: '#1374F6',
    selectable: false,
    type: 'line',
    angle: 0,
    originX: 'center',
    originY: 'center',
    centeredRotation: true
  })
  canvas.add(horizontalLine)
}
const handleLineChange = (val) => {
  horizontalLine.set({ angle: val })
}


</script>

<style lang="less">
video {
  // display: none;
}
</style>