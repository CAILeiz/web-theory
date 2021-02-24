1. mixin.js 文件
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  beforeCreate() {
    console.log(this.pageNum);
    console.log("子组件 beforeCreate");
    this.father();
  },
  created() {
    console.log(this.pageNum);
    console.log("子组件 created");
    this.father();
  },
  beforeMount() {
    console.log(this.pageNum);
    console.log("子组件 beforeMount");
    this.father();
  },
  mounted() {
    console.log(this.pageNum);
    console.log("子组件 mounted");
    this.father();
  },
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    alert(msg) {
      alert(msg);
    },
    queryByTaskId() {
      this.$requestFn(
        "POST",
        this.$url.common.queryByTaskId,
        {
          key: this.taskId
        },
        true
      )
        .then(res => {
          let _res = res || {};
          if (_res.totalNum && _res.totalNum === _res.finishNum) {
            clearInterval(this.interval);
            if (res.state == "DEFECT") {
              let errKey = Object.keys(res.errorMsgMap)[0];
              this.$toast.error(res.errorMsgMap[errKey]);
              return;
            }
            let _ossConfValue = JSON.parse(
              this.$utils.getLocalItem("_ossConfValue")
            );
            let domainName = _ossConfValue.domainName;
            let { ossObjectName, totalRow } = this.$utils.retExportAndTotal(
              _res.successMsgMap
            );
            if (!totalRow) {
              this.$toast.error("导出文件不存在");
              return;
            }
            let fileOrder = domainName + ossObjectName;
            console.log("fileOrder", fileOrder);
            window.open(fileOrder);
            this.$toast.success("导出成功");
          }
        })
        .catch(err => {
          clearInterval(this.interval);
        });
    }
  }
};
2. 将要引入mixin组件 father.vue
<template>
  <div class=""></div>
</template>

<script>
import mixin from "../../mixin";
export default {
  name: "",
  components: {},
  props: {},
  mixins: [mixin],
  data() {
    return {
      pageNum: 1
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {
    console.log("父组件 beforeCreate");
    this.alert("父组件 beforeCreate");
  },
  created() {
    console.log("父组件 created");
    this.alert("父组件 created");
  },
  beforeMount() {
    console.log("父组件 beforeMount");
    this.alert("父组件 beforeMount");
  },
  mounted() {
    console.log("父组件 mounted");
    this.alert("父组件 mounted");
    this.handlePaing(1);
  },
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
      father() {
          console.log("这是father");
      }
  }
};
</script>

<style scoped></style>

3. 路由到father.vue组件时生命周期依次调用
[undefined]
子组件
beforeCreate
父组件 beforeCreate
vue.esm.js?efeb:628 [Vue warn]: Error in beforeCreate hook: "TypeError: this.alert is not a function"
[1]
子组件 created
父组件 created
子组件中的alert函数被调用
[1]
子组件 beforeMount
父组件 beforeMount
子组件中的alert函数被调用
[1]
子组件 mounted
父组件 mounted
子组件中的alert函数被调用
## 总结: 父组件mixins之后 对于同一钩子函数先执行mixin中的再执行父组件的 mixin中只有created才能获取到父组件data中的值 父组件在created才能获取到mixin中的methods

