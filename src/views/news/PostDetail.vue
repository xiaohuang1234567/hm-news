<template>
  <div class="post-detail">
    <div class="header">
      <div class="left" @click="$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="right">
        <div class="followed" v-if="post.has_follow" @click="unfollow">已关注</div>
        <div class="follow" v-else @click="follow">关注</div>
      </div>
    </div>
    <div class="content">
      <div class="title">{{post.title}}</div>
      <div class="name">
        <span>{{post.user.nickname}}</span>
        <span>{{post.create_date | time}}</span>
      </div>
      <div v-if="post.type === 1" class="info" v-html="post.content"></div>
      <!-- autoplay 自动播放 muted 静音播放 -->
      <video v-else :src="getUrl(post.content)" controls autoplay muted></video>
      <div class="buttons">
        <div class="good" @click="like" :class="{active:post.has_like}">
          <span class="iconfont icondianzan"></span>
          <span>{{post.like_length || 0}}</span>
        </div>
        <div class="share">
          <span class="iconfont iconweixin"></span>
          <span>微信</span>
        </div>
      </div>
    </div>
    <!-- 评论 -->
    <div class="comment-list">
      <h3>精彩跟帖</h3>
      <hm-comment
        :comment="comment"
        v-for="comment in commentList"
        :key="comment.id"
      ></hm-comment>
    </div>
    <div class="footer">
      <div class="search">
        <input type="text" placeholder="回复">
      </div>
        <span class="iconfont iconpinglun-"><i>20</i></span>
        <span class="iconfont iconshoucang" :class="{now:post.has_star}" @click="star"></span>
        <span class="iconfont iconfenxiang"></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        user: {}
      },
      commentList: []
    }
  },
  created() {
    this.getInfo()
    // 获取文章的评论列表
    this.getCommentList()
  },
  methods: {
    noLogin() {
      // 判断是否登录
      const token = localStorage.getItem('token')
      if (!token) {
        // 没有登录
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        // 代表没登录
        return true
      } else {
        // 代表登录
        return false
      }
    },
    async getInfo() {
      // 需要id
      const { id } = this.$route.params
      const res = await this.$axios.get(`/post/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
        console.log(this.post)
      }
    },
    getUrl(url) {
      const div = document.createElement('div')
      div.innerHTML = url
      return div.innerText
    },
    async follow() {
      if (this.noLogin()) return
      // 发送ajax请求进行关注
      const res = await this.$axios.get(`/user_follows/${this.post.user.id}`)
      // console.log(res.data)
      if (res.data.statusCode === 200) {
        this.$toast.success('关注成功')
        this.getInfo()
      }
    },
    async unfollow() {
      // 发送请求取消关注
      const res = await this.$axios.get(`/user_unfollow/${this.post.user.id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('取消关注成功')
        this.getInfo()
      }
    },
    async like() {
      /**
       * 判断是否登录
       * 如果没有登录需要跳转到登录页
       * 如果登录 发送请求进行点赞
       */
      if (this.noLogin()) return
      // 说明登录了
      const res = await this.$axios.get(`/post_like/${this.post.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    async star() {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/post_star/${this.post.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    async getCommentList() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        console.log(this.commentList)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.post-detail {
  padding-bottom: 50px;
}
.header {
  display: flex;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  height: 50px;
  align-items: center;
  .left{
    span {
      line-height: 50px;
    }
  }
  .center {
    flex: 1;
    span {
    font-size: 50px;
    }
  }
  .right {
    div {
        width: 60px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 15px;
    }
    font-size: 14px;
      .followed{
        border: 1px solid #ccc;

      }
      .follow {
        color: #fff;
        background-color: red;
      }
  }
}
.content {
  padding: 10px;
  border-bottom: 3px solid #ccc;
  .title {
  font-size: 18px;
  font-weight: 700;
  }
  .name {
    font-size: 14px;
    color: #666;
    margin: 10px 0;
    span {
      margin-right: 10px;
    }
  }
 .info {
   font-size: 14px;
   /deep/ img {
    width: 100%;
    }
  }
  video {
    width: 100%;
  }
  .buttons {
    display: flex;
    justify-content: space-around;
    > div {
      width: 120px;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      border: 1px solid #ccc;
      text-align: center;
      font-size: 16px;
      .iconfont {
        font-size: 18px;
        margin-right: 5px;
      }
      .iconweixin {
        color: lawngreen;
      }
    }
    .active {
      border-color: red;
      color: red;
    }
  }
}
.comment-list {
  h3 {
    text-align: center;
    padding: 10px 0;
  }
}
.footer {
  background-color: #fff;
  width: 100%;
  height: 50px;
  display: flex;
  border-top: 1px solid #cccccc;
  position: fixed;
  bottom: 0;
  align-items: center;
  justify-content: space-around;
  padding: 0 10px;
  .iconfont {
    font-size: 24px;
  }
  .now {
    color: blue;
  }
  .iconpinglun- {
    position: relative;
    i {
      position: absolute;
      right: -5px;
      top: -3px;
      background-color: red;
      font-size: 10px;
      color: #fff;
      padding: 0 3px;
      border-radius: 5px;
      font-style: normal;
    }
  }
  .search {
    width: 180px;
    padding-right: 10px;
    input {
      background-color: #ddd;
      height: 30px;
      // margin-top: 10px;
      border-radius: 15px;
      width: 100%;
      border: none;
      font-size: 14px;
      padding-left: 10px;
    }
  }
}
</style>
