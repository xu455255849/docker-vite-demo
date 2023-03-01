<template>
  <div>
    <div>
      <a-button @click="handleAdd"> add item</a-button>
    </div>
    <a-table :dataSource="listData" :columns="columns" />

    {{ curInfo }}
  </div>
</template>

<script setup lang="tsx">
import { onMounted, ref} from 'vue';
import {createCat, getCatsAll, getCatsOne, ICats} from "../api/common";

onMounted(() => {
  getData();
})

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: '姓名',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: '年龄',
  },
  {
    title: '操作',
    key: '操作',
    customRender: ({ record }: { record: ICats }) => {
      return (
          <div>
            <a-button onclick={() => handleCheck(record.id)}>查看</a-button>
          </div>
      )
    },
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

const curInfo = ref();
const handleCheck = async (id: string) => {
  const { data } = await getCatsOne({ id });
  curInfo.value = data;
}

</script>