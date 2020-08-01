<template>
  <div >
    <b-navbar  toggleable="lg" type="dark" variant="info">
      <b-navbar-brand class=" container" href="#"> 
        <nuxt-link style="color:white" to="/">NavBar</nuxt-link >
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto container">
          <b-navbar-nav right>
            <nuxt-link to="/auth/profile"><b-avatar class="mr-sm-2" src="https://placekitten.com/300/300" size="3rem"></b-avatar></nuxt-link>
            <b-nav-text class="mr-sm-2 pl-3">
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
  }
};
</script>

