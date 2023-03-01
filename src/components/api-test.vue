<template>
  <div>qeq</div>
</template>

<script setup lang="ts">
import { onMounted, ref} from 'vue';
import {getCatsAll} from "../api/common";

onMounted(() => {
  getData();
})

const listData = ref([]);
const getData = async () => {
  const res = await getCatsAll({
    page: 1,
  })
  console.log(res, 11)
  listData.value = res;
}

</script>

<style lang="scss"></style>