<template>
  <div class="table-box">

    <div class="title">
      <h2>最简单的CRUD</h2>
    </div>

    <div class="query-box">
      <el-input class="query-input" v-model="queryInput" placeholder="请输入姓名查询" :input="handleQueryName"></el-input>
      <div class="btn-list">
        <el-button type="primary" @click="handleAdd">增加</el-button>
        <el-button type="primary" @click="handleDelList">删除多条</el-button>
      </div>
     
    </div>

    <el-table ref="multipleTableRef"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange" 
        border>
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="Id" width="120" />
      <el-table-column prop="name" label="名字" width="100" />
      <el-table-column prop="email" label="邮箱" width="140" />
      <el-table-column prop="phone" label="电话" width="120" />
      <el-table-column prop="state" label="状态" width="120" />
      <el-table-column prop="address" label="地址" width="400" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleDel(scope.row)">
            删除
          </el-button>
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
  </el-table>

  
  <el-dialog v-model="dialogFormVisible" :title="dialogType==='add'?'新增':'编辑'">
    <el-form :model="tableForm">
      <el-form-item label="姓名" :label-width="80">
        <el-input v-model="tableForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" :label-width="80">
        <el-input v-model="tableForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="电话" :label-width="80">
        <el-input v-model="tableForm.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="状态" :label-width="80">
        <el-input v-model="tableForm.state" autocomplete="off" />
      </el-form-item>
      <el-form-item label="地址" :label-width="80">
        <el-input v-model="tableForm.address" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogConfirm">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
  </div>
</template>

<script setup>
import {ref,reactive} from 'vue'
 let queryInput=ref()
 let dialogFormVisible=ref(false)
 let dialogType=ref('add')
//  let tableDataCopy=tableData
 let multipleSelection=ref([])
 let tableData=ref([
  {
    id:'1',
    name: 'Tom',
    email:'1234@qq.com',
    phone:'123433543',
    state: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id:'2',
    name: 'Tom',
    email:'1234@qq.com',
    phone:'123433543',
    state: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id:'3',
    name: 'Tom',
    email:'1234@qq.com',
    phone:'123433543',
    state: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id:'4',
    name: 'Tom',
    email:'1234@qq.com',
    phone:'123433543',
    state: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id:'5',
    name: 'Tom',
    email:'1234@qq.com',
    phone:'123433543',
    state: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id:'6',
    name: 'Tom',
    email:'1234@qq.com',
    phone:'123433543',
    state: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  },
  
 ])
 let tableForm=ref({
  name:'张三',
  email:'123@qq.com',
  phone:'123333',
  state:'在职',
  address:'广东省'

 })
// 通过名字进行查询
const handleQueryName=(val)=>{
  if(val.length>0){
    tableData.value=tableData.value.filter(item=>(item.name).toLowerCase().match(val))
  }else{
    // tableData.value=tableDataCopy
  }
}
 //  删除一条数据
 const handleDel=(row)=>{
    console.log(row.id);
    // 1通过id获取索引值
    let index=tableData.value.findIndex(item=>item.id===row.id)
    // 2.通过索引值进行删除
    tableData.value.splice(index,1)
 }
 //删除选中多条数据
//  const handleDelList=(row)=>{
//   mul
//  }
 //选中
const handleSelectionChange=(val)=>{
  // multipleSelection.value=[]
  // val.array.forEach(item => {
  //   multipleSelection.value.push(item.id)
  // });
  multipleSelection.value=val
}
//  确认按钮
 const handleAdd=()=>{
    dialogFormVisible.value=true
    tableForm.value={}
 }
//  确认按钮
 const dialogConfirm=()=>{
  dialogFormVisible.value=false
  if(dialogType==='add'){
    // 添加到table
  tableData.value.push({
    // id:(tableData.length+1).toString(),
     id:Math.max(...tableData.value.map(item=>item.id))+1,//所有的id以数组形式返回并取最大值
    ...tableForm.value
  })
  }else{
    // 1.获取当前这条数据的索引值
    let index=tableData.value.findIndex(item=>item.id===tableForm.id)
    // 2.更新数据
    tableData[index]=tableForm.value
  }
  
 }
//编辑
const handleEdit=(row)=>{
  dialogFormVisible.value=true
  dialogType='edit'
  console.log(row);
  tableForm.value={...row}
  console.log(row);
}
</script>
<style scoped>
.table-box{
  width: 800px;
  margin:200px auto;
  /* position:absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%); */
}
.title{
  text-align: center;
}
.query-box{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.query-input{
  width: 200px;
}
</style>
