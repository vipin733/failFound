<template>
  <div>
    <div v-if="!isLoading">
      <div  v-for="(story, index) in stories" :key="index">
        <Story :story="story" :isFull="$auth.loggedIn  ? true : false"/>
      </div>
    </div>
    <div v-else class="row">
      <div :class="$auth.loggedIn  ? 'col-md-12' : 'col-md-8 offset-md-2'">
        <StoryLoader/>
        <StoryLoader/>
      </div>
    </div>
  </div>
</template>

<script>
  import Story from '~/components/main/story'
  import StoryLoader from '~/components/main/story/storyLoader'

  export default {

    data() {
      return {
        stories: [],
        isLoading: true
      }
    },

    components:{
      Story,
      StoryLoader
    },

    layout({$auth}) {
     
      if ($auth.loggedIn) {
        return 'auth'
      }
      return 'default'
    },

    // layout: this.$auth.loggedIn ?  "auth": "default",

    mounted() {
      this._getStories()
    },

    methods: {
      async _getStories() {
        try {
          let res = await this.$axios.get('/api/v1/stories')
          this.stories = res.data.data
          this.isLoading = false
        } catch (error) {
          this.isLoading = false
        }
      },

      _isCheckOnline(){
        return this.$auth.loggedIn
      }
    }
  }
</script>