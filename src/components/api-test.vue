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
          total: pagination.total,
          onChange: handlePageChange
        }"
    />

    {{ curInfo }}

    <a-button @click="handleExportCsv">export</a-button>

    <a-upload
        v-model:file-list="fileList"
        name="file"
        action="http://localhost:3000/upload/file"
        @change="handleChange"
    >
      <a-button>Click to Upload</a-button>
    </a-upload>
  </div>
</template>

<script setup lang="tsx">
import {onMounted, reactive, ref} from 'vue';
import {exportCsv, createCat, deleteCat, getCatsAll, getCatsOne, ICats, updateCat} from "../api/common";

onMounted(() => {
  getData();
})

const handleExportCsv = () => {
  exportCsv().then(blob => {
    // 这里就是创建一个a标签，等下用来模拟点击事件
    const a = document.createElement('a')
    // 兼容webkix浏览器，处理webkit浏览器中href自动添加blob前缀，默认在浏览器打开而不是下载
    const URL = window.URL || window.webkitURL
    // 根据解析后的blob对象创建URL 对象
    const herf = URL.createObjectURL(blob)
    // 下载链接
    a.href = herf
    // 下载文件名,如果后端没有返回，可以自己写a.download = '文件.pdf'
    a.download = 'data.csv'
    document.body.appendChild(a)
    // 点击a标签，进行下载
    a.click()
    // 收尾工作，在内存中移除URL 对象
    document.body.removeChild(a)
    window.URL.revokeObjectURL(herf)

  })
}

const fileList = ref([]);
const handleChange = (info) => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === 'done') {
    message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};

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
  pageSize: 5,
  total: 0
})
const getData = async () => {
  const { data } = await getCatsAll({
    page: pagination.page,
    pageSize: pagination.pageSize
  })

  listData.value = data.list;
  pagination.total = data.total;
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

const handlePageChange = (page: number) => {
  pagination.page = page
  getData()
}

</script>