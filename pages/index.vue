<template>
  <div>
    <v-row
      align="center"
      justify="center"
      v-if="!isLoading"
    >
      <v-col cols="12"  v-for="(story, index) in stories" :key="index">
        <StoryCard :story="story" :isFull="false"/>
      </v-col>
    </v-row>

    <v-row
      align="center"
      justify="center"
      v-if="isLoading"
    >
      <v-col cols="12">
        <StoryLoader/>
      </v-col>
      <v-col cols="12">
        <StoryLoader/>
      </v-col>
    </v-row>

    <DialogPopUP/>
 </div>
</template>

<script>
import NavBar from '~/components/layouts/navbar'
import DialogPopUP from '~/components/layouts/dialogCMP'
import StoryLoader from '../components/main/story/storyLoader'
import StoryCard from '../components/main/story'
export default {

  props: {
    source: String,
  },

  mounted(){
    this._getStories()
  },

  layout(context) {
    if (context.$auth && context.$auth.loggedIn) {
      return 'auth'
    }
    return 'default'
  },

  components: {
    NavBar, DialogPopUP, StoryLoader, StoryCard
  },

  data: () => ({
    stories: [],
    isLoading: true
  }),

  methods: {
    async _getStories(){
      try {
        let res = await this.$axios.get('/api/v1/stories')
        this.stories = res.data.data
        this.isLoading  = false
      } catch (error) {
        
      }
    }
  }
}
</script>