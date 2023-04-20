<template>
  <div style="margin-bottom: 20px">
    <video height="480" width="720" id="webcam" ></video>
    <button @click="captureCamera">摄像头采集</button>
  </div>
  <div style="display: flex; justify-content: center">
    <canvas id="canvas" style="border:1px solid #ccc"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { fabric } from 'fabric';

let canvas: fabric.Canvas;
let videoEl: HTMLVideoElement;
let fabVideoObj: fabric.Image

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
    transparentCorners: true,

  })
}

const captureCamera = () => {
  navigator.mediaDevices.getUserMedia({ audio: false, video: {
      deviceId: {
      exact: 'c1303730b8b9191e85026b6ef876bf4497cabc89c396e0391c68041800f76c2a',
      }
  }
  }).then(stream => {
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


</script>

<style lang="less">
video {
  // display: none;
}
</style>