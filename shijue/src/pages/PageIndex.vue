<template>
  <div class="hello">
    <el-carousel height="600px">
      <el-carousel-item v-for="(item, index) in imgs" :key="index">
        <!-- <h3 class="small">{{ item }}</h3> -->
        <img
          :src="item.src"
          :alt="item.alt"
          width="100%"
          height="100%"
          :title="item.alt"
        />
      </el-carousel-item>
    </el-carousel>
    <div class="content"> </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      imgs: [
        {
          alt: '杭州视爵文化创意有限公司星空图',
          src: 'https://shijue0-1301666182.cos.ap-nanjing.myqcloud.com/10.jpg'
        },
        {
          alt: '杭州视爵文化创意有限公司穿梭图',
          src: 'https://shijue0-1301666182.cos.ap-nanjing.myqcloud.com/8.jpg'
        },
        {
          alt: '杭州视爵文化创意有限公司金属手',
          src: 'https://shijue0-1301666182.cos.ap-nanjing.myqcloud.com/7.jpg'
        },
        {
          alt: '杭州视爵文化创意有限公司星球图',
          src: 'https://shijue0-1301666182.cos.ap-nanjing.myqcloud.com/12.jpg'
        },
        {
          alt: '杭州视爵文化创意有限公司枫叶图',
          src: 'https://shijue0-1301666182.cos.ap-nanjing.myqcloud.com/6.jpg'
        },
        {
          alt: '杭州视爵文化创意有限公司枫叶魔方',
          src: 'https://shijue0-1301666182.cos.ap-nanjing.myqcloud.com/9.jpg'
        },
        {
          alt: '杭州视爵文化创意有限公司五彩斑斓图',
          src: 'https://shijue0-1301666182.cos.ap-nanjing.myqcloud.com/10.jpg'
        }
      ]
    }
  }
}
</script>

<style scoped></style>
<style>
.hello {
  min-width: 1200px;
  max-width: 1200px;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/* .content {
  min-width: 1200px;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 40px;
  font-family: '微软雅黑';
  height: 1200px;
} */
</style>
