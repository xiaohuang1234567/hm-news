<template>
  <div class="my-comment">
    <hm-header>我的跟帖</hm-header>
    <div class="list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="onLoad"
        >
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="time">{{item.create_date | time('YYYY-MM-DD HH:mm')}}</div>
        <div class="comment" v-if="item.parent">
          <div class="name">回复:{{item.parent.user.nickname}}</div>
          <div class="comment_content">{{item.parent.content}}</div>
        </div>
        <div class="content">{{item.content}}</div>
        <div class="origin">
          <span class="one-txt-cut" @click="$router.push(`/post-detail/${item.post.id}`)">原文:{{item.post.title}}</span>
          <span class="iconfont iconjiantou1"></span>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentList: [],
      // 当前页
      pageIndex: 1,
      // 每一页的条数
      pageSize: 5,
      // 代表加载状态 如果loading为true的时候 代表List组件正在加载数据 onLoad就不在触发
      // 当滚动到底部 触发onLoad的时候 自动会把loading改成true
      loading: false,
      // 代表是否结束 false代表还有数据 finished 代表没有更多数据
      // finished 默认是false 但是后台如果没有更多数据 应该改成true
      finished: false,
      // 代表是否正在下拉刷新
      // 等数据加载完成 需要把下拉刷新改成true
      refreshing: false
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    async getCommentList() {
      const res = await this.$axios.get('/user_comments', {
        // get请求的参数 必须放到params中 或者拼接到url地址中
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = [...this.commentList, ...data]
        // 把loading改成false 加载完成
        this.loading = false
        // 判断如果没有更多数据 需要把finished改成true
        if (data.length < this.pageSize) {
          this.finished = true
        }
        // 结束下拉刷新
        this.refreshing = false
      }
    },
    onLoad() {
      setTimeout(() => {
        // 加载下一页的数据
        this.pageIndex++
        this.getCommentList()
      }, 1000)
    },
    onRefresh() {
      console.log('下拉刷新中')
      setTimeout(() => {
        // 下拉刷新需要清除原来的数据
        this.commentList = []
        // 防止之前已经没有数据
        this.finished = false
        this.loading = true
        // 重新加载第一页的数据
        this.pageIndex = 1
        this.getCommentList()
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
  .item {
    border-bottom: 1px solid #666;
    padding: 10px 20px;
    .time {
      color:#ccc;
      padding: 10px 0;
    }
    .comment {
      background-color: #ddd;
      padding: 10px;
      .name {
        color: #666;
        font-size: 14px;
      }
      .comment_content {
        color: #999;
        line-height: 30px;
        margin-top: 10px;
      }
    }
    .content {
      margin: 10px 0;
    }
    .origin {
      color: #ddd;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
    }
  }
</style>
