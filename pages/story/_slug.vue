<template>
    <div class="row mb-2 ">
        <div class="col-md-8 offset-md-2">
            <div class="row  p-2">
                <div class="col">
                    <div class="row">
                        <div >
                            <nuxt-link to="/profile/vipin"><b-avatar  variant="info" src="https://placekitten.com/300/300"></b-avatar></nuxt-link >
                        </div>
                        <div>
                            <p class="pl-2 font-weight-bold"><nuxt-link  style="color:black" to="/profile/vipin">Vipin Kumar</nuxt-link> <br>2 min ago</p>
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
                    <a href="#" style="color:black">Some quick example text to build on the card title and make up the bulk of the card's content.</a>
                </p> <br>
                <p class="h5 font-weight-normal">
                    I Started my first failed startup(http://Getdukaan.com ) during my college days with my friends, basically our startup about B2C, in which connects people with local shop, and free advertising of local seller.

Its failed because bad timing, money and bad team member

And my second startup was (Puvi mfg pvt ltd) I borrowed money from my grandfather (75k = 1100$), basically I want to create my own shoe brand and I started making some sample with my father (He has experience of 25 year in shoe industry) and we made nearly 15 model men's and women's
                   

                </p>
                  <b-img class="text-center" src="https://qphs.fs.quoracdn.net/main-qimg-33bb1bdc4181158649e1d72bde7d634f" fluid alt=""></b-img>
                <br>
                <p class="h5 font-weight-normal">
                    But due shortage of money i could not deliver in the market.

So its basically failed because money (still looking some investor if any one interested contact me whatsapp 7696446317, vipinoo7@yahoo.in)

And currently DMSZar -Welcome to Digital Area is the current running startup which is in very initial phase and also looking some good co-founder(marketing specialist interest person whatsapp me above no or email me)
                </p>
            </div>
            <hr>

            <div class="row d-flex">
                <p class="h5 pl-2"> <b-icon icon="chat"></b-icon><span class="pl-1">100</span></p>
                <p class="h5 pl-3"> <b-icon icon="heart"></b-icon><span class="pl-1">5k</span></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    toggle() {
      this.$colorMode.preference =
        this.$colorMode.value == "light" ? "dark" : "light";
    }
  }
};
</script>