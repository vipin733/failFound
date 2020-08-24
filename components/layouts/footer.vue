<template>
  <v-footer
    padless
    :app="true"
  >
    <v-card
      
      tile
      class="text-center"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4t"
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class=" pt-0">
        FailFound a space for Failed Founder who want share his/her story with other Founder, and share skills, share new idea and also  
        FailFound a space for Failed Founder who want share his/her story with other Founder, and share skills, share new idea and also  
        FailFound a space for Failed Founder who want share his/her story with other Founder, and share skills, share new idea and also  

      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="">
        {{ new Date().getFullYear() }} — <strong>FailFound</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
</script>