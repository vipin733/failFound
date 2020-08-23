<template>
  <div>
    <v-app-bar
    >
      <v-btn icon @click="_changeSearchMenu">
        <v-avatar size="36">
          <v-icon>mdi-arrow-left</v-icon>
        </v-avatar>
      </v-btn>

      <v-text-field
          flat
          hide-details
          label="Search"
      ></v-text-field>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  
  methods: {
    _changeSearchMenu(){
      this.$store.dispatch('changeSearchMenu')
    }
  },

  data() {
    return {
      user: this.$auth.loggedIn ? this.$auth.user.data : {},
      activeBtn: false,
      vuetify: this.$vuetify.theme.dark
    }
  },

  computed: {
    isMobile(){
      if (process.client) {
        return window.innerWidth < 600
      }
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

