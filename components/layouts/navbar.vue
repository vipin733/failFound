<template>
  <div >
    <b-navbar  toggleable="lg" type="dark" variant="info">
      <b-navbar-brand class=" container" href="#"> 
        <nuxt-link style="color:white" to="/">FailFound</nuxt-link >
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto container">
          <b-navbar-nav right>
            
            <nuxt-link to="/auth/profile" v-if="$auth.loggedIn">
              <b-avatar  class="mr-sm-2"   size="3rem" v-if="$auth.user.data.avatar" 
                :src="$auth.user.data.avatar"></b-avatar>
              <b-avatar class="mr-sm-2" :text="user.first_last" size="3rem" v-else></b-avatar>
            </nuxt-link>

            <b-nav-text class="mr-sm-2 pl-3" v-if="!$auth.loggedIn">
              <nuxt-link style="color:white" to="/login">Login</nuxt-link >
            </b-nav-text>

            <b-nav-text class="mr-sm-2 pl-3" v-if="$auth.loggedIn">
              <nuxt-link style="color:white" to="/create">Create</nuxt-link >
            </b-nav-text>


          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    toggle() {
      this.$colorMode.preference =
        this.$colorMode.value == "light" ? "dark" : "light";
    }
  },
  data() {
    return {
      user: this.$auth.loggedIn ? this.$auth.user.data : {}
    }
  },

  head: {
    bodyAttrs: {
      style: 'background:grey'
    }
  }

}
</script>

