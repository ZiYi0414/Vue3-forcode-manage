<template>
  <div class="wrap">
    <h1>NiceCoder Manage</h1>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="Username" prop="name">
        <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Password" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { reactive, ref } from 'vue'
import { FormInstance } from 'element-plus'

import axios from '../utils/axios'

export default defineComponent({
  name: 'LoginView',
  components: {},
  setup() {
    const ruleFormRef = ref<FormInstance>()

    const ruleForm = reactive({
      name: '',
      pass: ''
    })

    const rules = reactive({
      name: [
        {
          required: true,
          message: 'Please input Activity name',
          trigger: 'blur'
        }
      ],
      pass: [
        {
          required: true,
          message: 'Please input Activity pass',
          trigger: 'blur'
        }
      ]
    })

    const login = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios
        .post('login', {
          account: ruleForm.name,
          user: {
            password: ruleForm.pass
          }
        })
        .then((res) => {
          console.log(res.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          login()
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }

    return { ruleFormRef, ruleForm, rules, submitForm, resetForm }
  }
})
</script>

<style scoped lang="less">
.wrap {
  width: 500px;
  margin: 0 auto;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  h1 {
    color: rgb(78, 78, 78);
  }
}
</style>
