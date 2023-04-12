<template>
  <canvas id="canvas" width="1200" height="720" />
</template>

<script setup lang="ts">
import { onMounted} from 'vue';

let canvasEl: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

onMounted(() => {
  canvasEl = document.getElementById('canvas') as HTMLCanvasElement;
  ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;
  paintRect();
  paintPath();
})

const paintRect = () => {
  ctx.fillRect(25,25, 20, 20,);
  ctx.strokeRect(30, 30,1, 1)
}

const paintPath = () => {
  ctx.beginPath();
  ctx.moveTo(75, 50);
  ctx.lineTo(100, 75);
  ctx.lineTo(100, 25);
  ctx.fill();
}

</script>