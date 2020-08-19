<template>
  <!-- <div >
    <b-navbar  toggleable="lg" type="dark" variant="info">
      <b-navbar-brand class=" container" href="#"> 
        <nuxt-link style="color:white" to="/">FailFound</nuxt-link >
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
       
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
              <nuxt-link style="color:white" to="/story/create">Create</nuxt-link >
            </b-nav-text>


          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div> -->
<div>

  <b-navbar  toggleable="lg" type="dark" variant="info" v-if="!isMobile">
    <b-navbar-brand class=" container" href="#"> 
      <nuxt-link style="color:white" to="/">FailFound</nuxt-link >
    </b-navbar-brand>
  

   <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      
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
            <nuxt-link style="color:white" to="/story/create">Create</nuxt-link >
          </b-nav-text>


        </b-navbar-nav>
      </b-navbar-nav>
    </b-collapse>
</b-navbar>

<b-navbar  toggleable="lg" type="dark" variant="info" v-if="isMobile">
    <b-navbar-brand class=" container" href="#"> 
      <nuxt-link style="color:white" to="/">FailFound</nuxt-link >
    </b-navbar-brand>
</b-navbar>

  <nav class="nav" v-if="isMobile">
  <a href="#" class="nav__link">
    <b-icon icon="heart" class="nav__icon">Home</b-icon>
    <span class="nav__text">Home</span>
  </a>
  <a href="#" class="nav__link nav__link--active">
     <b-icon icon="heart" class="nav__icon">Profile</b-icon>
    <span class="nav__text">Profile</span>
  </a>
  <a href="#" class="nav__link">
     <b-icon icon="heart" class="nav__icon">Create Story</b-icon>
    <span class="nav__text">Create Story</span>
  </a>
 
</nav>
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

  computed: {
    isMobile(){
      if (process.client) {
        return window.innerWidth < 600
      }
      
    }
  }
  ,

  head: {
    bodyAttrs: {
      style: 'background:grey'
    }
  }

}
</script>

<style lang="css" scoped>
body {
    margin: 0 0 55px 0;
}

.nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 55px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
    display: flex;
    overflow-x: auto;
    z-index: 37;
}

.nav__link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    min-width: 50px;
    overflow: hidden;
    white-space: nowrap;
    font-family: sans-serif;
    font-size: 13px;
    color: #444444;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    transition: background-color 0.1s ease-in-out;
}

.nav__link:hover {
    background-color: #eeeeee;
}

.nav__link--active {
    color: #009578;
}

.nav__icon {
    font-size: 18px;
}

</style>

