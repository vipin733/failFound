<template>
  <div>
    <div v-if="!isLoading">
      <div  v-for="(story, index) in stories" :key="index">
        <Story :story="story" :isFull="true"/>
      </div>
    </div>
    <div v-else class="row">
      <div class="col-md-12">
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
    layout: "auth",
    middleware: 'auth',

    data() {
      return {
        stories: [],
        isLoading: true,
        type: this.$route.params.type
      }
    },

    components:{
      Story,
      StoryLoader
    },

    mounted() {
      if (this.type != 'published' && this.type != 'draft') {
        this.$router.push({ path: '/' })
        return
      }
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
      }
    }
  }
</script>