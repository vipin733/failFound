<template>
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <b-card
        class="mb-2  p-2"
        >
            <b-card-text>
          <div class="card-body text-center">
              <b-avatar  variant="info" size="6rem" v-if="user.avatar" 
              :src="user.avatar"></b-avatar>
              <b-avatar size="6rem" :text="user.first_last" v-else></b-avatar>

              <h3 class="card-title">{{user.name}}</h3>
              <p class="card-text h5">{{user.about_me}}</p>
              <p class="card-text"><small class="text-muted">Last updated {{_updatedAt(user.updated_at)}}</small></p>
              <br>
              <hr>
              <div class="row">
                  <div class="col d-flex">
                    <P class="h5 pr-1">Skills: </P> 
                    <b-badge  variant="primary" v-for="(skill, index) in user.skills" :key="index"> {{skill}} </b-badge>
                  </div>
              </div>
              <hr>
              <div class="row">
                <div class="col">
                  <h1>{{user.story_count}} Story</h1>
                </div>
                <div class="col">
                  <h1>{{user.story_views}} Views</h1>
                </div>
                <div class="col">
                  <h1><b-icon :icon="user.hire_me ? 'emoji-smile' :  'emoji-frown'"></b-icon> Hire   </h1>
                </div>
              </div>
          </div>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
import moment from "moment"
export default {
   
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