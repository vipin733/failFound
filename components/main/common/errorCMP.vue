<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-text>
            <v-alert type="error">
                I'm an error alert.
            </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="_close">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {

    data () {
      return {
        dialog: true,
      }
    },

    methods: {
        _close(){
          this.$store.dispatch('changeError')
        },
    }

  }
</script>