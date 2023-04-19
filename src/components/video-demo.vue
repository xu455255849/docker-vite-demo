<template>
  <div>
    <video id="video" src="../assets/test.mp4" autoplay width="180" />
    <button @click="captureCamera">摄像头采集</button>
  </div>
  <div>
    <canvas id="canvas" width="720" height="480" />
  </div>
</template>

<script setup lang="ts">
import { onMounted,} from 'vue';

let videoEl: any;
let canvasEl: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

onMounted(() => {
  videoEl = document.getElementById('video');
  canvasEl = document.getElementById('canvas') as HTMLCanvasElement;
  ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;
  document.getElementById('video')?.addEventListener('play' , () => {
    captureStream()
  })
})

let videoStream: MediaStream;
const captureCamera = () => {
  navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then(stream => {
    console.log(stream, 111)
    // videoStream = stream;
    videoEl.srcObject = stream
    console.log(stream.getVideoTracks()[0])
  }).catch(error => {
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
  })
}

let screenStream: MediaStream;
const captureScreen = async () => {
  try {
    screenStream = await navigator.mediaDevices.getDisplayMedia()
    paintScreen();
  } catch (err) {
    console.error("Error: " + err);
  }
}

const paintScreen = () => {
  console.log(screenStream, 11)
  const videoTrack = screenStream.getVideoTracks()[0];
  // 流无法绘制到 canvas ，前端目前通过必须转成video
  // ctx.drawImage(videoTrack, 960, 540, 320, 180)
}

const captureStream = () => {
  if (videoEl.paused || videoEl.ended) return;
  ctx.drawImage(videoEl, 0, 0, 1200, 720)
  requestAnimationFrame(captureStream);
  // const stream = videoEl.captureStream(30);
  // const audioTrack = stream.getAudioTracks()[0];
  // const videoTrack = stream.getVideoTracks()[0];
}

</script>

<style lang="less">
video {
  display: none;
}
</style>