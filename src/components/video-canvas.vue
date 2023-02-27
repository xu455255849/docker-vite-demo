<template>
  <div>
    <video id="video" src="../assets/test.mp4" controls />
  </div>
  <div>
    <canvas id="canvas" width="320" height="180" />
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

const captureStream = () => {
  if (videoEl.paused || videoEl.ended) return;
  const stream = videoEl.captureStream(30);
  const audioTrack = stream.getAudioTracks()[0];
  const videoTrack = stream.getVideoTracks()[0];

  console.log(videoTrack, 111)
  console.log(audioTrack, 222)
  paintVideo()
}

const paintVideo = () => {
  ctx.drawImage(videoEl, 0, 0, 320, 180)
}

</script>

<style lang="scss"></style>