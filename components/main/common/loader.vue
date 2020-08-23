<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      hide-overlay
      :persistent="true"
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Please wait...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialog: true,
      }
    }
  }
</script>