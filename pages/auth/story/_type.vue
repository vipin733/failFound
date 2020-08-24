<template>
  <div>
    <v-row
      align="center"
      justify="center"
      v-if="!isLoading"
    >
      <v-col cols="12"  v-for="(story, index) in stories" :key="index">
        <StoryCard :story="story" :isFull="false" :isAuth="true" :isEdit="false"/>
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
 </div>
</template>

<script>
  import StoryCard from '~/components/main/story'
  import StoryLoader from '~/components/main/story/storyLoader'
  import NoData from '~/components/main/common/noData'
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
      StoryCard,
      StoryLoader,
      NoData
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
          let res = await this.$axios.post('/api/v1/auth/stories', {Type:this.type})
          this.stories = res.data.data ? res.data.data : []
          this.isLoading = false
        } catch (error) {
          this.isLoading = false
        }
      }
    }
  }
</script>