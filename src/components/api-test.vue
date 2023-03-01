<template>
  <div>
    <div>
      <a-button @click="handleAdd"> add item</a-button>
    </div>
    <a-table
        :dataSource="listData"
        :columns="columns"
        :pagination="{
          current: pagination.page,
          pageSize: pagination.pageSize,
          onChange: handlePageChange
        }"
    />

    {{ curInfo }}
  </div>
</template>

<script setup lang="tsx">
import {onMounted, reactive, ref} from 'vue';
import {createCat, deleteCat, getCatsAll, getCatsOne, ICats, updateCat} from "../api/common";

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
            <a-button type="primary" onclick={() => handleUpdate(record.id)}>随机修改</a-button>
            <a-button danger onclick={() => handleDelete(record.id)}>删除</a-button>
          </div>
      )
    },
  }
]
const listData = ref([]);
const pagination = reactive({
  page: 1,
  pageSize: 5
})
const getData = async () => {
  const { data } = await getCatsAll({
    page: pagination.page,
    pageSize: pagination.pageSize
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

const handleUpdate = async (id: string) => {
  await updateCat({
    id,
    name: ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4),
    age: 99
  })
  await getData();
}

const handleDelete = async (id: string) => {
  await deleteCat({ id })
  await getData();
}

const handlePageChange = () => {
  console.log(111)
}

</script>