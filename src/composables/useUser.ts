import { reactive, ref } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { createUser, deleteUser, editUser, getUser, getUsers, login } from '../api/user';
import { useRouter } from 'vue-router';

export const useUser = () => {
  const router = useRouter();
  interface User {
    _id: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    address: string;
    balance: number;
    role: string | number;
  }

  // 表单校验规则
  const rules = reactive<FormRules>({
    username: [
      { required: true, message: '用户名为必填项', trigger: 'blur' },
      { min: 2, max: 12, message: '用户名长度应为2-12个字符', trigger: 'blur' }
    ],
    email: [
      { required: true, message: '邮箱为必填项', trigger: 'blur' },
      { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ],
    phone: [
      { required: true, message: '手机号为必填项', trigger: 'blur' },
      { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '请输入正确的手机号', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '密码为必填项', trigger: 'blur' },
      { pattern: /^[a-zA-Z0-9_!]{6,16}$/, message: '密码长度应为6-16个字符', trigger: 'blur' }
    ],
    editPassword: [{ pattern: /^[a-zA-Z0-9_!]{6,16}$/, message: '密码长度应为6-16个字符', trigger: 'blur' }]
  });

  // 获取用户列表
  const userList = ref<User[]>([]);
  const handleUserList = async () => {
    const { data: res } = await getUsers();
    if (res.errno === 0) {
      userList.value = res.data;
      userList.value.forEach((item) => {
        if (item.role === 0) {
          item.role = '普通用户';
        } else {
          item.role = '管理员';
        }
      });
    }
  };

  const userModel = ref<User>({
    _id: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    address: '',
    balance: 0,
    role: 0
  });

  // 登录
  const loginFormRef = ref<FormInstance>();
  const handleLogin = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      const { username, password } = userModel.value;
      if (valid) {
        const { data: res } = await login(username, password);
        if (res.errno === 0) {
          if (res.data.role === 1) {
            localStorage.setItem('token', res.data.token);
            userModel.value.username = '';
            router.push({ name: 'Index' });
          } else {
            ElMessage.error('非管理员无法登录！');
          }
        } else {
          ElMessage.error(res.msg);
        }
      }
    });
  };

  const createUserFormVisible = ref(false);
  const editUserFormVisible = ref(false);
  const createFormRef = ref<FormInstance>();
  const editFormRef = ref<FormInstance>();
  // 新增用户
  const handleCreate = (formEl: FormInstance | undefined) => {
    createUserFormVisible.value = true;
    formEl.resetFields();
  };

  // 编辑用户
  const handleEdit = async (row: any) => {
    editUserFormVisible.value = true;
    const { data: res } = await getUser(row._id);
    res.data.password = '';
    userModel.value = res.data;
  };

  // 提交表单
  const handleSubmit = async (formEl: FormInstance | undefined, type: string) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        const { username, password, email, phone } = userModel.value;
        if (type === 'create') {
          const { data: res } = await createUser(username, phone, email, password);
          if (res.errno === 0) {
            createUserFormVisible.value = false;
            ElMessage({ message: '添加成功', type: 'success' });
            formEl.resetFields();
            handleUserList();
          } else {
            ElMessage.error(res.msg);
          }
        } else if (type === 'edit') {
          const { _id, address, balance, role } = userModel.value;
          const { data: res } = await editUser(_id, username, password, email, phone, address, balance, role as number);
          if (res.errno === 0) {
            editUserFormVisible.value = false;
            ElMessage({ message: res.msg, type: 'success' });
            handleUserList();
          } else {
            ElMessage.error(res.msg);
          }
        }
      }
    });
  };

  // 删除用户
  const handleDelete = async (row: any) => {
    if (row.username === 'admin') {
      ElMessage.error('默认管理员不可删除');
      return;
    }
    const { data: res } = await deleteUser(row._id);
    if (res.errno === 0) {
      ElMessage({
        message: res.msg,
        type: 'success'
      });
      handleUserList();
    }
  };

  return {
    rules,
    createUserFormVisible,
    editUserFormVisible,
    loginFormRef,
    createFormRef,
    editFormRef,
    userModel,
    userList,
    handleLogin,
    handleUserList,
    handleCreate,
    handleEdit,
    handleSubmit,
    handleDelete
  };
};
