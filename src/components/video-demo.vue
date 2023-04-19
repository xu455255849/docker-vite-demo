<template>
  <div>
    <video id="video" src="" />
    <button @click="captureCamera">摄像头采集</button>
  </div>
  <div style="display: flex; justify-content: center">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { fabric } from 'fabric';

let canvas: unknown;
const videoEl = new fabric.Image(document.getElementById('video'), {
  left: 200,
  top: 300,
  angle: -15,
  originX: 'center',
  originY: 'center',
  objectCaching: false,
});


const sizeOpts = {
  Basic: {
    w: 720,
    h: 480
  }
}

onMounted(() => {
  initCanvas()
})

const initCanvas = () => {
  canvas = new fabric.Canvas('canvas', {
    width: sizeOpts.Basic.w,
    height: sizeOpts.Basic.h,
  });

}

const captureCamera = () => {
  navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then(stream => {
    // console.log(stream, 111)
    // videoStream = stream;
    videoEl.srcObject = stream
    canvas.add(videoEl)
    videoEl.moveTo(0); // move webcam element to back of zIndex stack
    videoEl.getElement().play();
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