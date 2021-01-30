<template>
  <div class="contact">
    <div class="fb fb-row fb-main-between h-1085">
      <div class="left w70">
        <div class="left-header">关于视爵</div>
        <div class="h-555 mt-20 left-img" id="left-img"> </div>
        <div class="font-15 lh-15  c-66492B p-10-0"
          >我们是一群创作人，用图形动画创造社会价值。年轻的我们不将就，学习、改变、创造让梦想更真实；专注、高效、创想，让传播更有趣。</div
        >
        <div class="left-header">服务客户</div>
        <div class="fb fb-wrap left-con mt-20" id="customer">
          <div
            v-for="(item, index) in clients"
            :key="index"
            class="customer-con"
          >
            <img :src="item.src" :alt="item.alt" />
          </div>
        </div>
      </div>
      <div class="w25">
        <div class="right-header">联系方式</div>
        <div v-for="(item, index) in contactCon" :key="index" class="right-con">
          <span class="">{{ item.name }}</span>
          <span>{{ item.value }}</span>
        </div>
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
      clients: [
        {
          alt: '杭州视爵文化创意有限公司与阿里巴巴合作',
          src: 'https://shijue0-1301666182.cos.ap-nanjing.myqcloud.com/ali.jpg'
        },
        {
          alt: '杭州视爵文化创意有限公司与支付宝合作',
          src:
            'https://shijue0-1301666182.cos.ap-nanjing.myqcloud.com/Alipay.jpg'
        },
        {
          alt: '杭州视爵文化创意有限公司与华为合作',
          src:
            'https://shijue0-1301666182.cos.ap-nanjing.myqcloud.com/hauwei.jpg'
        },
        {
          alt: '杭州视爵文化创意有限公司与招商银行合作',
          src:
            'https://shijue0-1301666182.cos.ap-nanjing.myqcloud.com/zhaoshang.jpg'
        },
        {
          alt: '杭州视爵文化创意有限公司与西门子合作',
          src:
            'https://shijue0-1301666182.cos.ap-nanjing.myqcloud.com/ximenzi.jpg'
        },
        {
          alt: '杭州视爵文化创意有限公司与电气合作',
          src:
            'https://shijue0-1301666182.cos.ap-nanjing.myqcloud.com/dianqi.jpg'
        },
        {
          alt: '杭州视爵文化创意有限公司与融创合作',
          src:
            'https://shijue0-1301666182.cos.ap-nanjing.myqcloud.com/rongchuang.jpg'
        },
        {
          alt: '杭州视爵文化创意有限公司与抖音合作',
          src:
            'https://shijue0-1301666182.cos.ap-nanjing.myqcloud.com/douyin.jpg'
        },
        {
          alt: '杭州视爵文化创意有限公司与金地合作',
          src:
            'https://shijue0-1301666182.cos.ap-nanjing.myqcloud.com/jindi.jpg'
        },
        {
          alt: '杭州视爵文化创意有限公司与省旅合作',
          src:
            'https://shijue0-1301666182.cos.ap-nanjing.myqcloud.com/shenglv.jpg'
        }
      ],
      contactCon: [
        { name: 'QQ：', value: '779848540' },
        { name: '电话：', value: '18268026434' },
        { name: '邮箱 E-Mail：', value: '779848540@qq.com' },
        { name: '地址 Address：', value: '浙江省杭州市余杭区翠湖苑' },
        { name: '微信二维码Wechat：', value: 'ShiJue_Creative' }
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
  methods: {}
}
</script>

<style scoped>
.font-15 {
  font-size: 15px;
}
.lh-15 {
  line-height: 20px;
}
.p-10-0 {
  padding: 10px 10px;
}
.mt-20 {
  margin-top: 20px;
}
.w-928 {
  width: 928px;
}
.h-555 {
  height: 555px;
}
.left-con > div {
  width: 18%;
  height: 154px;
  line-height: 154px;
  box-sizing: border-box;
  /* border: 1px solid black; */
  text-align: center;
}
.right-con {
  padding: 10px 0;
}
.right-con span:first-child {
  font-family: '微软雅黑';
  font-size: 15px;
  color: #000;
  font-weight: bolder;
}
.right-con span:last-child {
  font-family: '微软雅黑';
  font-size: 15px;
  color: #000;
  font-weight: bolder;
}
.left-img {
  background: url('https://shijue0-1301666182.cos.ap-nanjing.myqcloud.com/11.jpg')
    no-repeat;
  background-size: 100% 100%;
}
.wrap {
  text-align: left;
}
.left-header,
.right-header {
  font-family: '微软雅黑';
  font-size: 20px;
  color: #000;
  font-weight: bolder;
  width: 80px;
}
.w70 {
  width: 70%;
}
.w25 {
  width: 27%;
}
.bb {
  /* border: 1px solid black; */
}
/* #customer, */
/* #left-img  */
.contact {
  /* animation: slowShow 2s; */
}
@keyframes slowShow {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 0.8;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.customer-con {
  padding: 8px;
  box-shadow: 0 0 2px gray;
  margin: 8px;
}
/* .left-img:hover , */
.customer-con:hover {
  cursor: pointer;
  transform: scale(1.02);
}
</style>
