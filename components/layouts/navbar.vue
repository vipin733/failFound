<template>
  <div>
    <v-app-bar
    :elevation="1"
    >
      <v-toolbar-title @click="_push('/')"><b>FailFound</b></v-toolbar-title>
     
      <v-spacer></v-spacer>

      <v-text-field
        flat
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        v-if="!$vuetify.breakpoint.mobile"
      ></v-text-field>

      <v-spacer></v-spacer>
      <v-btn @click="_searchPage" icon  v-if="$vuetify.breakpoint.mobile">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon @click="_changeMenue">
        <v-avatar size="36">
          <v-icon>mdi-account-circle</v-icon>
        </v-avatar>
      </v-btn>


      <v-btn @click="_changeTheme" icon>
        <v-icon v-if="$vuetify.theme.dark">mdi-brightness-6</v-icon>
        <v-icon v-else>mdi-brightness-7</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>


<script>
export default {
  
  methods: {
    _changeMenue(){
      if (this.$auth.loggedIn && this.$vuetify.breakpoint.mobile) {
        this.$store.dispatch('changeMenu')
      }else{
        this._push('/login')
      }
    },

    _changeTheme(){
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },

    _searchPage() {
      this.$store.dispatch('changeSearchMenu')
    },

    _push(path){
      this.$router.push(path)
    }
  },

  data() {
    return {
      user: this.$auth.loggedIn ? this.$auth.user.data : {},
      activeBtn: false,
      vuetify: this.$vuetify.theme.dark
    }
  },

  head: {
    bodyAttrs: {
      style: 'background:grey'
    }
  }

}
</script>

<style lang="css" scoped>

</style>

