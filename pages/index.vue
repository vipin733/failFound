<template>
  <div>
    <div v-if="!isLoading">
      <div  v-for="(story, index) in stories" :key="index">
        <Story :story="story"/>
      </div>
    </div>
    <div v-else>
      <StoryLoader/>
      <StoryLoader/>
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
      }
    }
  }
</script>