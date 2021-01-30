<template>
  <div class>
    <div
      class="header fb fb-cross-center fb-main-between container-min container-max"
    >
      <div class="left"></div>
      <div class="right fb fb-cross-center fb-main-between">
        <div
          class="con"
          :class="[globalId === item.id ? 'bd-2' : '']"
          v-for="(item, index) in list"
          :key="index"
          @click="handleSelect(item)"
          >{{ item.name }}</div
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      globalId: 1,
      list: [
        { name: '首页', id: 1, href: '/' },
        { name: '作品', id: 2, href: '/production' },
        { name: '联系', id: 3, href: '/contact' },
        { name: '加入', id: 4, href: '/join' }
      ]
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    handleSelect(item) {
      this.globalId = item.id
      this.$router.push(item.href)
    }
  }
}
</script>

<style scoped>
.header {
  margin: 0 auto;
  padding: 28px 0;
  font-family: '微软雅黑';
  height: 80px;
  text-align: center;
}
.left {
  height: 76px;
  width: 595px;
  background: url('https://shijue0-1301666182.cos.ap-nanjing.myqcloud.com/13.png') no-repeat;
  background-color: #000;
  background-size: 100% 100%;
}
.con {
  height: 42px;
  width: 68px;
  line-height: 42px;
  font-family: '微软雅黑';
  font-size: 20px;
  color: #000;
  margin-left: 10px;
  font-weight: bolder;
  border: 2px solid transparent;
}
.con:hover {
  cursor: pointer;
  border: 2px solid black;
}
.con:first {
}
.bd-2 {
  border: 2px solid black;
}
</style>
