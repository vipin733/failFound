<template> 
  <div>
    <Story :story="story" :isEdit="false" :isFull="true" :isAuth="source"/>
  </div>
</template>


<script>

import Story from '~/components/main/story'

export default {

  async asyncData ({ params, error, store, query }) {
    try {
      let slug = params.slug
      let source = query.source
      let res = await store.$axios.get('/api/v1/story/'+slug+"?source="+source)
      return {
        slug: params.slug,
        story: res.data.data,
        source: source ? true : false
      }
    } catch (error) {
      return {
        slug: '',
        source: false,
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