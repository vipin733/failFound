<template>
  <div>
    <v-btn
        bottom
        color="blue"
        dark
        fab
        fixed
        right
        @click="_changeMenue"
      >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
   
  </div>
</template>

<script>
import DialogStep from '~/lib/DialogStep'
import StoryCreate from '~/components/main/story/editorjsCMP'

export default {

  components: {
    StoryCreate
  },

  data: () => ({
    DialogStep
  }),

  computed: {
    _isOpenDialog(){
      return this.$store.getters.isOpenDialog
    },

    _DialogStep(){
      return this.$store.getters.dialogStep
    }
  },

  methods: {
    _changeMenue(){
      if (this.$auth.loggedIn) {
        this.$router.push('/story/create')
      }else{
        this.$router.push('/login')
      }
      
    }
  }
}

</script>