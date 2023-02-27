<template>
  <div>qeq</div>
</template>

<script setup lang="ts">
import { onMounted} from 'vue';
import {getBaseApi} from "../api/common";

onMounted(() => {
  getData();
})


const getData = async () => {
  const res = await getBaseApi({});
  console.log(res, 11)
}

</script>

<style lang="scss"></style>