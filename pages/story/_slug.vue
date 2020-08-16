<template>
    <div >
        <div >
            <Story :story="story"/>
        </div>
    </div>
</template>


<script>

import Story from '~/components/main/story'

export default {

  async asyncData ({ params, error, store }) {
    try {
        let slug = params.slug
        let res = await store.$axios.get('/api/v1/story/'+slug)
        return {
            slug: params.slug,
            story: res.data.data
        }
    } catch (error) {
      return {
        slug: '',
        story: {}
      }
    }
  },

  components:{
    Story
  },

  mounted() {
    this._updateView()
  },

  methods: {

    async _updateView() {
      try {
        let res = await this.$axios.post('/api/v1/story/view/update', {ID: this.story.id})
        
      } catch (error) {
        
      }
    },

   
  }
}
</script>