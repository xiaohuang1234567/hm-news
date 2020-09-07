<template>
  <div>
    <hm-follow :count="count-1" :comment="comment.parent" v-if="comment.parent"></hm-follow>
      <div class="hm-follow">
        <div class="title">
          <div class="left">{{count}}. {{comment.user.nickname}}</div>
          <div class="center">{{comment.create_date | now}}</div>
          <div class="right" @click="reply">回复</div>
        </div>
        <div class="content">{{comment.content}}</div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'hm-follow',
  props: {
    comment: Object,
    count: Number
  },
  methods: {
    reply() {
      // this.$emit('reply', this.comment.id, this.comment.user.nickname)
      this.$bus.$emit('reply', this.comment.id, this.comment.user.nickname)
    }
    // replyFn(id, nickname) {
    //   this.$emit('reply', id, nickname)
    // }
  }

}
</script>

<style lang="less" scoped>
  .hm-follow {
    margin-top: -1px;
    border: 1px solid pink;
    padding: 10px;
    .title {
      display: flex;
      font-size: 14px;
      .center {
        flex: 1;
        font-size: 12px;
        color: #ccc;
        padding-left: 10px;
      }
      .right {
        color: #ccc;
      }
    }
    .content {
      font-size: 14px;
      margin-top: 10px;
    }
  }
</style>
