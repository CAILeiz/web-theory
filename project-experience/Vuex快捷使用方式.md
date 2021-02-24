## 全局挂载Vuex
import Vue from "vue";
import Vuex from "vuex";
store: 
    export default new Vuex.store({
        state: { // 相当于vue中的data
            count: 1
        },
        getters: { // 想当于vue中的computed属性
            count(state) {
                return state.count;
            }
        },
        mutations: { // 改变state 想当于react中的this.setState() 必须是同步函数
            increment(state) {
                state.count ++;
            } 
        },
        actions: { // 异步出发mutation
            increment({state, dispatch, commit, getter}) {
                commit("increment", state.count + 1);
            }
        }
    })
    new Vue({
        el: "#app",
        store
    })

## state getters mutatuion action快速访问
1. state
import { mapState } from "vuex"; 
computed: {
    ...mapState(['count'])
}
2. getters 
import { mapGetter } from "vuex";
computed: {
    ...mapGetters(["increment"])
}
3. mutations
import { mapMutations } from "vuex";
methods: {
    ...mapMutations("increment")
}
4. import { mapActions } from "vuex";
methods: {
    ...mapActions("increment");
}