<template>
    <div class="row">
        
        <div class="col-md-8 offset-md-2">
            <b-card
                class="mb-2  p-2"
                >
                <b-card-text>
                    <div class="card-body text-center">
                        <b-avatar src="https://placekitten.com/300/300" size="6rem"></b-avatar> <b-icon icon="arrow-up-right-square"></b-icon>
                        <h3 class="card-title">Vipin  Auth Kumar <b-icon icon="arrow-up-right-square"></b-icon></h3>
                        <p class="card-text h5">This is a wider card with supporting text below as a natural lead-in
                             to additional content. This content is a little bit longer.</p> <b-icon icon="arrow-up-right-square"></b-icon>
                        <br>
                        <hr>
                    </div>

                   <div class="row text-center">
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

                </b-card-text>

            </b-card>
        </div>

        <div class="col-md-8 offset-md-2">
            <b-card
                class="mb-2  p-2"
                >
                <b-card-text>
                    <div class="card-body">
            
                        <div class="row">
                            <div class="col">
                                <p class="h4"> Email</p>
                            </div>
                            <div class="col">
                                <b-form-input
                                id="input-1"
                                v-model="email"
                                type="email"
                                required
                                placeholder="Enter email"
                                disabled
                                ></b-form-input>

                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col">
                                <p class="h4"> Mobile</p>
                            </div>
                            <div class="col">
                                 <b-form-input
                                id="input-1"
                                v-model="mobile"
                                type="number"
                                required
                                placeholder="mobile"
                                ></b-form-input>
                            </div>
                        </div>

                        <hr>
                        <div class="row">
                            <div class="col">
                                <p class="h4"> Skils</p>
                            </div>
                            <div class="col">
                               <b-form-tags input-id="tags-basic" v-model="skills"  tag-variant="primary" class="mb-2"></b-form-tags>
                            </div>
                        </div>

                       
                    </div>
                </b-card-text>
            </b-card>
        </div>

         <div class="col-md-8 offset-md-2">
            <b-card
                class="mb-2  p-2"
                >
                <b-card-text>
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <p class="h4"> Hire me</p>
                            </div>
                            <div class="col">
                                <b-form-checkbox switch size="lg"></b-form-checkbox>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col">
                                <p class="h4"> Show My No</p>
                            </div>
                            <div class="col">
                                <b-form-checkbox switch size="lg"></b-form-checkbox>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col">
                                <p class="h4"> Show My Email</p>
                            </div>
                            <div class="col">
                                <b-form-checkbox switch size="lg"></b-form-checkbox>
                            </div>
                        </div>

                        <hr>
                        <div class="row">
                            <div class="col">
                                <p class="h4"> Skils</p>
                            </div>
                            <div class="col">
                               <b-form-tags input-id="tags-basic" v-model="skills"  tag-variant="primary" class="mb-2"></b-form-tags>
                            </div>
                        </div>

                        <hr>
                         <div class="row">
                            <div class="col">
                               <b-button block variant="primary">Submit</b-button>
                            </div>
                        </div>

                    </div>
                </b-card-text>
            </b-card>
        </div>

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
  },

    data() {
      return {
        skills: [],
        email: 'vipin@failfound.com',
        mobile:''
      }
    }
};
</script>