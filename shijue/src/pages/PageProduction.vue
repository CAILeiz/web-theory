<template>
  <div class="fb wrap bg-ffffff">
    <div class="w-300 h-700 scroll">
      <el-menu
        class="el-menu-vertical-demo"
        unique-opened
        active-text-color="#f00"
        @select="handleSelect"
      >
        <el-submenu
          :index="item.id"
          v-for="(item, index) in titleList"
          :key="index"
        >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ item.name }}</span>
          </template>
          <div v-show="item.children.length">
            <el-menu-item
              :index="itm.id"
              v-for="(itm, idx) in item.children"
              :key="idx"
              >{{ itm.name }}</el-menu-item
            >
          </div>
        </el-submenu>
      </el-menu>
    </div>
    <div class="width-full h-700 scroll" style="padding:24px;">
      <common-video
        v-for="(item, index) in videos"
        :key="index"
        :poster="item.poster"
        :class="[index != 0 ? 'mt-16' : '']"
      ></common-video>
    </div>
  </div>
</template>

<script>
import commonVideo from '@/components/commonVideo'
export default {
  components: { commonVideo },
  props: {},
  data() {
    return {
      videos: [1, 2, 3, 4, 5, 6],
      titleList: [
        {
          id: 'programa',
          name: '栏目包装',
          children: []
        },
        {
          id: 'three',
          name: '三维',
          children: [
            {
              id: 'product',
              name: '产品类'
            },
            {
              id: 'idea',
              name: '概念类'
            }
          ]
        },
        {
          id: 'mg',
          name: 'Mg运动图形',
          children: []
        },
        {
          id: 'two',
          name: '二维线',
          children: []
        },
        {
          id: 'logo',
          name: 'Logo演绎',
          children: []
        },
        {
          id: 'publish',
          name: '发布会',
          children: [
            {
              id: 'begin',
              name: '开场'
            },
            {
              id: 'lasting',
              name: '倒计时'
            },
            {
              id: 'judged',
              name: '串场'
            },
            {
              id: 'walk',
              name: '走秀'
            },
            {
              id: 'dance',
              name: '舞蹈'
            },
            {
              id: 'start',
              name: '启动仪式'
            },
            {
              id: 'kv',
              name: 'KV'
            },
            {
              id: 'out',
              name: '外场'
            }
          ]
        },
        {
          id: 'short',
          name: '短视频',
          children: [
            {
              id: 'product',
              name: '朋友圈'
            },
            {
              id: 'idea',
              name: '抖音新媒体'
            }
          ]
        }
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
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.wrap {
  box-shadow: 0 0 2px gray;
}
</style>
