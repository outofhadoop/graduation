<template>
  <div class="index_main_middle">
      <nav class="index_main_category_nav">
          <h5>热门</h5>
          <ul>
              <li v-for="item in navList" v-bind:key='item.index'>{{ item }}</li>
          </ul>
      </nav>
  </div>
</template>
<script>
export default {
    data () {
        return {
            navList: [ '医学', '生物', '数学', '国际' ]
        }
    },
    methods: {

    }
}
</script>
<style>
h5{font-size: 1.03rem;}
</style>

