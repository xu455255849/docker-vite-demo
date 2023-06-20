<template>
  <div style="margin-bottom: 20px">
    <video id="ffmpeg" autoplay></video>
    <video width="640" height="480" id="webcam" style="display: none"></video>
    <button @click="captureCamera">摄像头采集</button>
    <a-upload :customRequest="testFF" :show-upload-list="false">
      <a-button>FFmpeg</a-button>
    </a-upload>
    <div>
      <a-button @click="addLine">打开陀螺仪</a-button>
      <a-select v-model:value="value1" @change="handleLineChange">
        <a-select-option :value="-15">-15</a-select-option>
        <a-select-option :value="0">0</a-select-option>
        <a-select-option :value="30">30</a-select-option>
        <a-select-option :value="60">60</a-select-option>
      </a-select>
      <a-button @click="handleAddArea">+ 水印</a-button>
    </div>
  </div>
  <div style="display: flex; justify-content: center">
    <canvas id="canvas" style="border:1px solid #ccc"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fabric } from 'fabric';
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";


let canvas: fabric.Canvas;
let videoEl: HTMLVideoElement;
let fabVideoObj: fabric.Image;
let horizontalLine: fabric.Line;

const testFF = async ({ file }) => {
  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();
  ffmpeg.FS('writeFile', 'test.avi', await fetchFile(file));
  await ffmpeg.run('-i', 'test.avi', 'test.mp4');
  // await writeFile('./test.mp4', ffmpeg.FS('readFile', 'test.mp4'));


  const mp4ArrayBuffer = ffmpeg.FS('readFile', 'test.mp4');
  console.log(mp4ArrayBuffer);
// 将ArrayBuffer转换为Blob
  const mp4Blob = new Blob([mp4ArrayBuffer], { type: 'video/mp4' });

// 创建临时URL
  const mp4Url = URL.createObjectURL(mp4Blob);

// 获取video元素
  const videoElement = document.getElementById('ffmpeg');

// 设置video元素的src属性为临时URL
  videoElement.src = mp4Url;

}

const sizeOpts = {
  Basic: {
    w: 640,
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


    setTimeout(() => {
      const frame = canvas.toCanvasElement().getContext('2d').getImageData(0, 0, 40, 40)

      console.log(frame, 1231)
      const dataPtr = Module._malloc(frame.length);
      Module.HEAPU8.set(frame.data, dataPtr);
      Module._process_frame(dataPtr, frame.width, frame.height);
      Module._free(dataPtr);
    }, 1500)
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
const handleLineChange = (val: number) => {
  horizontalLine.set({ angle: val })
}


function initRect(rectStyle: any) {
  const rect = new fabric.Rect({
    ...rectStyle,
    opacity: 0.5,
    cornerSize: 6,
    borderColor: '#0073FF',
    cornerColor: '#0073FF',
    borderDashArray: [5], // 边框虚线
    transparentCorners: false, // 控制角填充色不透明
  });
  rect.controls = {
    ...fabric.Rect.prototype.controls,
    mtr: new fabric.Control({ visible: false }),
  };

  return rect;
}

const handleAddArea = () => {
  const defaultStyle = {
    left: 0,
    top: 0,
    height: 120,
    width: 120,
    scaleX: 1,
    scaleY: 1,
    fill: 'rgba(19,116,246,0.6)',
  };
  const rect = initRect(defaultStyle);
  canvas.add(rect);
};


</script>

<style lang="less">
video {
  // display: none;
}
</style>