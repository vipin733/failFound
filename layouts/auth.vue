<template>
  <div>
    <Navbar/>
    <div class="container mt-3">
      <div class="row">
        <div class="col-md-3" v-if="!isMobile">
            <SideBar/>
        </div>
        <div class="col-md-8">
            <Nuxt />
        </div>
        <div class="col-md-1">
           
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "~/components/layouts/navbar"
import SideBar from "~/components/layouts/sidebar"

export default {
  components: {
    Navbar,
    SideBar
  },

  computed: {
    isMobile(){
      if (process.client) {
        return window.innerWidth < 600
      }
      
    }
  }
}
</script>

