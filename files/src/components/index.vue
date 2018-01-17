<template>
  <div class="index">
    <top-nav></top-nav>
  </div>
</template>

<script>
import indexTopNav from '@/components/topBar/indexTopBar'
export default {
  name: 'index',
  data () {
    return {
      
    }
  },
  components: {
    'top-nav': indexTopNav
  }
}
</script>

<style scoped>

</style>
