<template>
  <el-aside width="200px">
    <el-row>
      <el-col>
        <el-menu :default-active="defaultActive">
          <el-menu-item index="1" @click="handleRouterLink(1)">
            <el-icon><HomeFilled /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="2" @click="handleRouterLink(2)">
            <el-icon><UserFilled /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="3" @click="handleRouterLink(3)">
            <el-icon><List /></el-icon>
            <span>任务管理</span>
          </el-menu-item>
          <el-menu-item index="4" @click="handleRouterLink(4)">
            <el-icon><Shop /></el-icon>
            <span>商品管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const defaultActive = ref('1');
switch (route.name) {
  case 'Index':
    defaultActive.value = '1';
    break;
  case 'User':
    defaultActive.value = '2';
    break;
  case 'Task':
    defaultActive.value = '3';
    break;
  case 'Store':
    defaultActive.value = '4';
    break;
}

const handleRouterLink = (index: number) => {
  switch (index) {
    case 1:
      router.push({ name: 'Index' });
      break;
    case 2:
      router.push({ name: 'User' });
      break;
    case 3:
      router.push({ name: 'Task' });
      break;
    case 4:
      router.push({ name: 'Store' });
      break;
  }
};
</script>

<style lang="less" scoped>
.el-aside {
  position: fixed;
  z-index: 999;
  top: 50px;
  left: 0;
  bottom: 0;
  border-right: 1px solid #e8e8e8;
  background-color: #fff;
}

.el-menu {
  border: 0;
}
</style>