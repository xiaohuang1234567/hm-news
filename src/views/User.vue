<template>
  <!-- 头部 -->
  <div class="user">
    <div class="header">
      <div class="avatar">
        <!-- 路径必须拼成绝对路径 -->
        <img :src="base + user.head_img" alt="">
      </div>
      <div class="info">
        <div class="name">
          <span v-if="user.gender === 1" class="iconfont iconxingbienan"></span>
          <span v-else class="iconfont iconxingbienv"></span>
          <!-- <span class="iconfont" :class="user.gender === 1 ? 'iconxingbienan' : 'iconxingbienv' "></span> -->
          <span>{{user.nickname}}</span>
        </div>
        <div class="time">
          {{user.create_date | time}}
        </div>
      </div>
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
  <!-- 导航条 -->
  <hm-navbar to='/my-follow'>
    <template>我的关注</template>
    <template #content>关注的内容</template>
  </hm-navbar>
  <hm-navbar>
    <template>我的跟帖</template>
    <template #content>跟帖/恢复</template>
  </hm-navbar>
  <hm-navbar>
    <template>我的收藏</template>
    <template #content>文章/视频</template>
  </hm-navbar>
  <hm-navbar to='edit'>设置</hm-navbar>
  <div style="margin: 15px;">
  <van-button type="danger" block @click="logout">退出</van-button>
  </div>
  </div>
</template>

<script>
export default {
  computed: {
    base() {
      return this.$axios.defaults.baseURL
    }
  },
  data() {
    return {
      user: ''
    }
  },
  async created() {
    // token必须放到请求头中 请求头 Authorization
    // const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const res = await this.$axios.get(`/user/${userId}`)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
    }
  },
  methods: {
    async logout() {
      // 弹框提示退出
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你他妈的确定要退出?'
        })
        // 说明点了确定
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        this.$router.push('/login')
        this.$toast.success('退出成功')
      } catch {
        this.$toast('取消退出')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.user{
  .header{
    display: flex;
    padding: 20px 10px;
    align-items: center;
    border-bottom: 5px solid #ccc;
    .avatar{
      width: 70px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .info{
      flex: 1;
      padding-left: 20px;
      font-size: 12px;
      .time{
        margin-top: 10px;
        color: blue;
      }
    }
    .iconxingbienan{
      color: skyblue;
    }
    .iconxingbienv{
      color:pink;
    }
  }
}
</style>
