<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <div class="search-box" @click="$router.push(`/search`)">
          <span class="iconfont iconsearch"></span>
          <span>搜索新闻</span>
        </div>
      </div>
      <div class="user" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <!-- tab栏效果 -->
    <van-sticky class="more-sticky">
      <div class="more" @click="$router.push('/manage')">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </van-sticky>
    <van-tabs v-model="active" sticky animated swipeable >
      <van-tab :title="tab.name"  v-for="tab in tabList" :key="tab.id">
        <!-- :immediate-check="false" 一开始加载 滚动到底部后才加载 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
          >
          <hm-post :post="item" v-for="item in newList" :key="item.id"></hm-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      active: 0,
      // 用于存放栏目列表数据
      tabList: [],
      newList: [],
      pageIndex: 1,
      pageSize: 5,
      // 加载状态
      loading: false,
      // 是否加载完成
      finished: false,
      // 下拉加载状态
      refreshing: false
    }
  },
  created() {
    this.getTabLsit()
  },
  destroyed() {

  },
  methods: {
    async getTabLsit() {
      // 先判断缓存中是否存在
      const activeList = JSON.parse(localStorage.getItem('activeList'))
      if (activeList) {
        this.tabList = activeList
        // 发送请求获取第一个tab的数据
        this.getNewList(this.tabList[0].id)
        return
      }
      const res = await this.$axios.get('/category')
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        // 发送请求获取第一个tab的数据
        this.getNewList(this.tabList[0].id)
      }
    },
    // 获取新闻列表
    async getNewList(id) {
      // 发送请求获取新闻数据
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.newList = [...this.newList, ...data]
        console.log(this.newList)
        // 数据加载完成需要把loading改成false
        this.loading = false
        this.refreshing = false
        // 判断是否还有更多数据
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad() {
      setTimeout(() => {
        console.log('需要加载更多')
        // 加载下一页数据
        this.pageIndex++
        this.getNewList(this.tabList[this.active].id)
      }, 1000)
    },
    onRefresh() {
      this.newList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      // 重新加载当前分类下的数据
      setTimeout(() => {
        this.getNewList(this.tabList[this.active].id)
      }, 1000)
    }
  },
  watch: {
    active(value) {
      this.newList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      // 重新加载当前分类下的数据
      // setTimeout(() => {
      this.getNewList(this.tabList[value].id)
      // }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 50px;
  background-color: #ff0000;
  line-height: 50px;
  text-align: center;
  color: #fff;
  .logo,
  .user {
    width: 70px;
  }
.logo {
    span {
     font-size: 50px;
    }
  }
.user {
  span {
    font-size: 24px;
  }
}
  .search {
    flex: 1;
    .search-box {
      height: 34px;
      line-height: 34px;
      background-color: rgba(255,255,255,.5);
      margin-top: 8px;
      border-radius: 17px;
      font-size: 14px;
      span:first-child {
        margin-right: 5px;
      }
    }
  }
}
/deep/ .van-tabs__wrap {
  width: 85%;
}
  .more {
    width: 15%;
    height: 44px;
    position: absolute;
    right: 0;
    z-index: 999;
    background-color: #fff;
    text-align: center;
    line-height: 44px;
  }
.more-sticky {
  /deep/ .van-sticky--fixed {
    z-index: 100;
  }
}
</style>
