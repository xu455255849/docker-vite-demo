<template>
  <div style="margin-bottom: 20px">
    <video height="360" width="500" id="webcam" style="display: none"></video>
    <button @click="captureCamera">摄像头采集</button>
  </div>
  <div style="display: flex; justify-content: center">
    <canvas id="canvas" style="border:1px solid #ccc"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { fabric } from 'fabric';

let canvas: unknown;
let videoEl: unknown;
let fabVideoObj: unknown

const sizeOpts = {
  Basic: {
    w: 720,
    h: 480
  }
}

onMounted(() => {
  videoEl = document.getElementById('webcam');
  initCanvas()
})

const initCanvas = () => {
  canvas = new fabric.Canvas('canvas', {
    width: sizeOpts.Basic.w,
    height: sizeOpts.Basic.h,
  });
  fabVideoObj = new fabric.Image(videoEl, {
    width: sizeOpts.Basic.w,
    height: sizeOpts.Basic.h,
    left: 0,
    top: 0,
    angle: 0,
    originX: 'left',
    originY: 'top',
    objectCaching: false,
    transparentCorners: false,

  })
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


const captureStream = () => {
  if (videoEl.paused || videoEl.ended) return;
  ctx.drawImage(videoEl, 0, 0, 720, 480)
  requestAnimationFrame(captureStream);
  // const stream = videoEl.captureStream(30);
  // const audioTrack = stream.getAudioTracks()[0];
  // const videoTrack = stream.getVideoTracks()[0];
}

</script>

<style lang="less">
video {
  // display: none;
}
</style>