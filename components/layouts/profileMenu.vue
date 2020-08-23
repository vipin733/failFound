<template>
  <div class="text-center">
      <v-bottom-sheet v-model="_isOpen" :fullscreen="true" persistent :hide-overlay="true">
         <SideBar/>
      </v-bottom-sheet>
    </div>
</template>

<script>
import  SideBar from '../layouts/sidebar'
export default {
  computed: {
    _isOpen(){
      return this.$store.getters.isOpen
    }
  },

  components: {
    SideBar
  },

  methods: {
    _changeMenue(){
      this.$store.dispatch('changeMenu')
    }
  }
}
</script>

<style>

</style>