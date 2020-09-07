<template>
  <div class="user-edit">
    <hm-header>编辑资料</hm-header>
    <!-- 头像 -->
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + user.head_img" alt="">
      <van-uploader :after-read="afterRead" />
    </div>
    <!-- 导航 -->
    <hm-navbar @click="showNickname">
      <template>昵称</template>
      <template #content>{{user.nickname}}</template>
    </hm-navbar>
    <hm-navbar @click="showPassword">
      <template>密码</template>
      <template #content>******</template>
    </hm-navbar>
    <hm-navbar @click="showGender">
      <template>性别</template>
      <template #content>{{user.gender === 1 ? '男' : '女'}}</template>
    </hm-navbar>

    <!-- 渲染diglog组件 -->
    <van-dialog v-model="isShowNickname" title="编辑昵称" show-cancel-button @confirm="updateNickname">
      <van-field v-model="nickname" ref="nickname" placeholder="请输入用户名" />
    </van-dialog>
    <!-- 修改密码 -->
    <van-dialog v-model="isShowPassword" title="修改密码" show-cancel-button @confirm="updatePassword">
      <van-field v-model="password" ref="password" placeholder="请输入密码" />
    </van-dialog>
    <!-- 修改性别 -->
    <van-dialog v-model="isShowGender" title="修改性别" show-cancel-button @confirm="updateGender">
      <!-- <van-radio-group v-model="gender">
        <van-radio :name="1">男</van-radio>
        <van-radio :name="0">女</van-radio>
      </van-radio-group> -->
      <van-radio-group v-model="gender">
       <van-cell-group>
        <van-cell title="男" clickable @click="gender = 1">
          <template #right-icon>
            <van-radio :name="1" />
          </template>
        </van-cell>
        <van-cell title="女" clickable @click="gender = 0">
          <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <!-- 裁剪的模态框 -->
    <div class="mask" v-show="isShowMask">
      <van-button type="primary" class="crop" @click="crop">裁剪</van-button>
      <van-button type="danger" class="cancel" @click="isShowMask = false">取消</van-button>
      <VueCropper
      ref='aa'
       :img="img"
       autoCrop
       autoCropWidth="100"
       autoCropHeight="100"
       fixed
       ></VueCropper>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'

export default {
  components: {
    VueCropper
  },
  data() {
    return {
      user: '',
      isShowNickname: false,
      nickname: '',
      isShowPassword: false,
      password: '',
      isShowGender: false,
      gender: 1,
      // 是否显示裁剪框
      isShowMask: false,
      img: ''
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      // 发送请求获取个人信息
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    },
    async showNickname() {
      this.isShowNickname = true
      this.nickname = this.user.nickname
      // 等到DOM的更新
      await this.$nextTick()
      // 自动获取焦点
      this.$refs.nickname.focus()
    },
    // 封装updateUser 重复调用
    async updateUser(data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      if (res.data.statusCode === 200) {
        // 重新渲染
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },
    async updateNickname() {
      // const userId = localStorage.getItem('userId')
      // const res = await this.$axios.post(`/user_update/${userId}`, {
      //   nickname: this.nickname
      // })
      // if (res.data.statusCode === 200) {
      //   // 重新渲染
      //   this.getUserInfo()
      //   this.$toast.success('修改成功')
      // }
      this.updateUser({
        nickname: this.nickname
      })
    },
    async showPassword() {
      this.isShowPassword = true
      this.password = this.user.password
      // 等到DOM的更新
      await this.$nextTick()
      // 自动获取焦点
      this.$refs.password.focus()
    },
    async updatePassword() {
      // const userId = localStorage.getItem('userId')
      // const res = await this.$axios.post(`/user_update/${userId}`, {
      //   password: this.password
      // })
      // if (res.data.statusCode === 200) {
      //   // 重新渲染
      //   this.getUserInfo()
      //   this.$toast.success('修改成功')
      // }
      this.updateUser({
        password: this.password
      })
    },
    showGender() {
      this.isShowGender = true
      this.gender = this.user.gender
    },
    updateGender() {
      this.updateUser({
        gender: this.gender
      })
    },
    isImg(name) {
      if (name.endsWith('.gif') || name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg')) {
        return true
      } else {
        return false
      }
    },
    afterRead(file) {
      // 校验图片的类型和大小 如果满足 才上传 不满足提示重新上传
      if (!this.isImg(file.file.name)) {
        return this.$toast.fail('请上传图片')
      }
      if (file.file.size >= 50 * 1024) {
        return this.$toast.fail('上传图片过大')
      }
      // 显示裁剪框
      this.isShowMask = true
      // 设置裁剪的图片
      this.img = file.content
      // 此时可以自行将文件上传至服务器
      // console.log(file)
      // 如果是通过ajax上次文件 请求体不能直接是一个普通对象 必须是一个formData对象
      // 创建一个空的formData对象

      // 给formData对象添加上传的文件
      // 第一个file 后台要求的名字叫file
      // 第二个file 插件读取的时候得到的参数
      // 第三file 代表真正上传的文件
    },
    crop() {
      this.$refs.aa.getCropBlob(async blob => {
        const fd = new FormData()
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        // console.log(res.data)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
        // 修改用户头像
          this.updateUser({
            head_img: data.url
          })
        }
        // 隐藏裁剪框
        this.isShowMask = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  position: relative;
  padding: 40px 0;
  text-align: center;
  img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .van-uploader {
  position: absolute;
  left: 50%;
  top: 40px;
  transform: translate(-50%);
  width: 100px;
  height: 100px;
  opacity: 0;
}
}
/**
  深度作用选择器 三种写法
   >>> css 写法
   /deep/  less写法
   ::v-deep scss写法
*/
/deep/ .van-dialog__content {
  padding: 15px !important;
  .van-field {
    border: 1px solid #ccc;
  }
}
.mask {
width: 100%;
height: 100%;
z-index: 999;
position: fixed;
top: 0;
left: 0;
.crop,
.cancel {
  position: fixed;
  top: 0;
  z-index: 1;
 }
 .cancel{
   right: 0;
 }
}
</style>
