<template>
  <div>
    <Story/>
    <Story/>
  </div>
</template>

<script>
import datas from '~/lib/data'
import Story from '~/components/main/story'
export default {
  data() {
    return {
      datas
    }
  },
  components:{
    Story
  }
}
</script>