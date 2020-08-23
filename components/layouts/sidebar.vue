<template>
  <v-card
    class="mx-auto"
    max-width="300"
    tile
  >
    <v-list rounded>
      <v-subheader></v-subheader>
      <v-list-item-group v-model="item" color="primary">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="_push(item.route)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-divider></v-divider>

    <v-list rounded>
      <v-list-item-group color="primary">
        <v-list-item
        @click="_logout"
        >
            
          <v-list-item-icon>
            <v-icon  >mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title >Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

  </v-card>
</template>

<script>
  export default {
    data: () => ({
      item: 0,
      items: [
        { text: 'Home', icon: 'mdi-home', route: '/' },
        { text: 'Create Story', icon: 'mdi-plus', route: '/story/create' },
        { text: 'Published Story', icon: 'mdi-plus-box-multiple', route: '/auth/story/published' },
        { text: 'Draft Story', icon: 'mdi-plus-box-multiple-outline',  route: '/auth/story/draft' },
        { text: 'My Profile', icon: 'mdi-account', route: '/auth/profile' },
      ],
    }),

    methods: {
      async _logout(){
        this.$store.dispatch('changeMenu')
        await this.$auth.logout()
      },

      _push(route){
        this.$store.dispatch('changeMenu')
        this.$router.push(route)
      }
    }
  }
</script>