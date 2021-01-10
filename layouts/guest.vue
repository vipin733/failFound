<template>
 
  <v-app id="inspire">
   
    <NavBar v-show="!_isSearch"/>
    <SearchMenu v-show="_isSearch"/>

    <v-main v-show="!_isSearch">
      <v-container
        class="fill-height"
        
      >

      <v-row no-gutters  class="hidden-sm-and-down">
        <v-col  
          cols="12"
          sm="2"
        >
        </v-col>

        <v-col  
          cols="12"
          sm="8"
        >
          <Nuxt />
        </v-col>

        <v-col  
          cols="12"
          sm="2"
        ></v-col>
        
      </v-row>

       <v-row no-gutters  class="hidden-sm-and-up">
        <Nuxt />
      </v-row>

      </v-container>
    </v-main>
    <!-- <Footer  v-if="!$vuetify.breakpoint.mobile"/> -->
    <Loader v-if="_isLoading"/>
    <ErrorCMP v-if="_isError"/>
  </v-app>
</template>

<script>
import NavBar from "~/components/layouts/navbar"
import ProfileMenu from "~/components/layouts/profileMenu"
import SearchMenu from "~/components/layouts/searchMenu"
import Loader from '~/components/main/common/loader'
import ErrorCMP from  '~/components/main/common/alertCMP'
import Footer from '~/components/layouts/footer'

export default {
  components: {
    NavBar,
    ProfileMenu,
    SearchMenu,
    Loader,
    ErrorCMP,
    Footer
  },

  computed: {

    _isSearch(){
      return this.$store.getters.isSearch
    },

    _isLoading(){
      return this.$store.getters.isLoading
    },

    _isError(){
      let data = this.$store.getters.error
      if (data.message) {
          return true
      }
      return false
    }
  },
}
</script>

