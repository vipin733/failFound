<template>
    <div class="row">
        <div class="col-md-8 offset-md-2">
            <div>
                <b-card
                class="mb-2  p-2"
                >
                    <b-card-text>
                        <div class="row">
                            <div class="col">
                                <div class="row">
                                    <div >
                                        <nuxt-link to="/profile/vipin"> <b-avatar  variant="info" src="https://placekitten.com/300/300"></b-avatar></nuxt-link >
                                    </div>
                                    <div>
                                        <p class="pl-2 font-weight-bold"> <nuxt-link  style="color:black" to="/profile/vipin">Vipin Kumar</nuxt-link> <br>2 min ago</p>
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                            <div class="col text-right">
                                <p class="h4"><b-icon icon="arrow-up-right-square"></b-icon></p>
                            </div>
                        </div>

                        <div class="row">
                            <p class="h5 font-weight-bold">
                                <nuxt-link  style="color:black" to="/story/tesdting">Some quick example text to build on the card title and make up the bulk of the card's content.</nuxt-link>
                            </p> <br>
                            <p class="h5 font-weight-normal">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make 
                                a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, 
                                remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                 and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum....

                            </p>
                        </div>
                        <hr>

                        <div class="row d-flex">
                            <p class="h5 pl-2"> <b-icon icon="chat"></b-icon><span class="pl-1">100</span></p>
                            <p class="h5 pl-3"> <b-icon icon="heart"></b-icon><span class="pl-1">5k</span></p>
                        </div>

                    </b-card-text>

                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    push(route) {
      this.$router.push(route)
    }
  }
};
</script>