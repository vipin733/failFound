<template>  
  <ProfileCMP :user="user" :slug="slug"/>
</template>

<script>
import moment from "moment"
import ProfileCMP from '~/components/main/user/profile'
export default {
   
    layout(context) {
      if (context.$auth && context.$auth.loggedIn) {
        return 'auth'
      }
      return 'default'
    },

    components:{ProfileCMP},
    async asyncData ({ params, error, store }) {
      try {
        let slug = params.slug
        let res = await store.$axios.get('/api/v1/user/'+slug)
        return {
          slug: params.slug,
          user: res.data.data
        }
      } catch (error) {
        return {
          slug: '',
          user: {}
        }
      }
    },

  
    data() {
      return {
        slug: this.$route.params.slug
      }
    },

    mounted() {
      // this._user()
    },

    methods: {
      async _user() {
        try {
          let res = await this.$axios.get('/api/v1/user/'+this.slug )
          this.user = res.data.data
        } catch (error) {
          
        }
      },
      _updatedAt(time){
        return moment(time).utcOffset('+0530').fromNow()
      }
    }
}
</script>