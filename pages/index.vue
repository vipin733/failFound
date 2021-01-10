<template>
  <div>
    <v-row
      align="center"
      justify="center"
      v-if="!isLoading"
    >
      <v-col cols="12"  v-for="(story, index) in stories" :key="index">
        <StoryCard :story="story" :isFull="false" :isEdit="false"/>
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
    <NoData v-if="!isLoading &&  stories.length == 0"/>
    <DialogPopUP/>
 </div>
</template>

<script>
import NavBar from '~/components/layouts/navbar'
import DialogPopUP from '~/components/layouts/dialogCMP'
import StoryLoader from '~/components/main/story/storyLoader'
import StoryCard from '~/components/main/story'
import  _changeError  from '~/lib/_changeError'

export default {

  mounted(){
    _changeError('success', '', this.$store)
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
        // console.log(res)
        this.stories = res.data.data ?? []
        this.isLoading  = false
      } catch (error) {
        
      }
    }
  }
}
</script>