<template>
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <b-card
        class="mb-2  p-2"
        >
            <b-card-text>
          <div class="card-body text-center">
              <b-avatar src="https://placekitten.com/300/300" size="6rem"></b-avatar>
              <h3 class="card-title">Vipin Kumar</h3>
              <p class="card-text h5">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              <br>
              <hr>
              <div class="row">
                  <div class="col d-flex">
                    <P class="h5 pr-1">Skills: </P> <span> Web Developer, Mobile Developer, Lead</span>
                  </div>
              </div>
              <hr>
              <div class="row">
                <div class="col">
                  <h1>2 Story</h1>
                </div>
                <div class="col">
                  <h1>2K Views</h1>
                </div>
                <div class="col">
                  <h1><b-icon icon="emoji-smile"></b-icon> Hire   </h1>
                </div>
              </div>
          </div>
        </b-card-text>
      </b-card>
    </div>
    <Story/>
    <Story/>
  </div>
</template>

<script>
import Story from '~/components/main/story'
export default {
  methods: {
    push(route) {
      this.$router.push(route)
    }
  },
  components:{
    Story
  }
};
</script>