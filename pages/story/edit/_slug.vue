<template> 
  <div>
    <Editorjs :isReady="isReady"  :key="editkey"  :title="title"
     :value="data" @saveData="_updateHtmlEditor"/>
  </div>
</template>


<script>

import Editorjs from '~/components/main/story/editorjsCMP'
import errorMessage from '~/lib/errors'

export default {
  middleware: 'auth',
  layout: "auth",
  components:{
    Editorjs
  },

  data() {
    return {
      isLoging: false,
      isReady: false,
      title: '',
      slug: this.$route.params.slug,
      data: {},
      editkey: 1,
      story: ''
    }
  },

  mounted() {
    this._getStory()
  },

  methods: {

    async _errorPopup(variant = null, title = "", body = "") {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true
      })
    },

    async _getStory(){
      try {
        let slug = this.slug
        let res = await this.$axios.get('/api/v1/story/'+slug+'?source=auth')
        let story = res.data.data
        this.story = story
        this.title = story.title
        this.data = story.content
        this.isReady = true
        this.editkey++
      } catch (error) {
        console.log(error);
      }
    },

    async _updateHtmlEditor(data){
      try {
        if (this.isLoging) {
          return
        }
        let storyData = {
          Title:   data.title,
          Content: data.data,
          Status:  data.status,
        }
        let res = await this.$axios.post('/api/v1/story/update/'+ this.story.id,storyData)
        this.isLoging = false
        this.$router.push({ path: '/story/'+this.slug })
      } catch (error) {
        this.isLoging = false
        let errMsg = errorMessage(error.response)
        this._errorPopup('danger', 'Oops', errMsg )
      }
    }
  }
}
</script>