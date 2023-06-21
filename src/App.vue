<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/api-test.vue'

// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:3000');

// 连接建立时触发
socket.onopen = () => {
  console.log('Connected to the WebSocket server');

  // 发送消息示例
  const message = {
    content: 'Hello, server!'
  };
  socket.send(JSON.stringify(message));
};

// 接收到服务器发送的消息时触发
socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('Received message from server:', message);
};

// 连接关闭时触发
socket.onclose = () => {
  console.log('Disconnected from the WebSocket server');
};

// 发生错误时触发
socket.onerror = (error) => {
  console.error('WebSocket error:', error);
};

</script>

<template>
  <HelloWorld />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
