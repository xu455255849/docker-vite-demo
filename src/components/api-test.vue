<template>
  <div>
    <div>
      <a-button @click="handleAdd"> add item</a-button>
    </div>
    <a-table :dataSource="listData" :columns="columns" />

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref} from 'vue';
import {createCat, getCatsAll} from "../api/common";

onMounted(() => {
  getData();
})

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }
]
const listData = ref([]);
const getData = async () => {
  const { data } = await getCatsAll({
    page: 1,
    pageSize: 20
  })

  listData.value = data.list;
}

const handleAdd = async () => {
  await createCat({
    name: `xyz.${Math.random() * 10}`,
    age: 20,
  })
  await getData();
}

</script>