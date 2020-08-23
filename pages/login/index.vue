<template>
  <v-card>
      <v-card-title class="">
        Login
      </v-card-title>
      <v-container>
        <v-row class="mx-2">
          
          <v-col cols="12"
            >
            <v-text-field
              prepend-icon="mdi-account"
              placeholder="Username or Email"
              v-model="user.Username"
              :disabled="isLoging"
              :rules="Rules.loginUsernameRules"
              :clearable="true"
              ref="Username"
              error-count="3"
            ></v-text-field>
          </v-col>
        
          <v-col  cols="12"
            >
            <v-text-field
              prepend-icon="mdi-key"
              placeholder="Password"
              v-model="user.Password"
              type="password"
              :disabled="isLoging"
              :rules="Rules.passwordRules"
              :clearable="true"
              ref="Password"
              error-count="3"
            ></v-text-field>
          </v-col>

            <v-col  cols="12"
            >
            Don't have acount ? <a @click.prevent="_changeStep" href="#">Register</a> 
          </v-col>
          
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="_login"
          :disabled="isLoging"
        >Login</v-btn>
      </v-card-actions>
  </v-card>
</template>
<script>

import DialogStep from '~/lib/DialogStep'
import errorMessage from '~/lib/errors'
import  _isValid  from '~/lib/validateFunc'
import  _changeError  from '~/lib/_changeError'
import Rules from '~/lib/rules'

export default {
  
  layout: "guest",

  data () {
    return {
      user: {
        Username: '',
        Password: '',
      },
      Rules
    }
  },

  computed: {
    isLoging(){
      return this.$store.getters.isLoading
    }
  },

  methods: {

    _changeStep(){
      if (this.isLoging) {
        return false
      }
      this.$router.push('/register')
    },

    
    async _login() {
      try {
         _changeError('success', '', this.$store)
        let isValid  = _isValid(this.user, this.$refs)
       
        if (this.isLoging || !isValid) {
          return
        }
        this.$store.dispatch('changeLoading', true)
        await this.$auth.loginWith('local', {data: this.user})
        this.$store.dispatch('changeLoading', false)
        _changeError('success', 'Successfully logged in', this.$store)
        this.$router.push({ path: '/' })
        // this.$store.dispatch('changeOpenDialog')
      } catch (error) {
        this.$store.dispatch('changeLoading', false)
        let errMsg = errorMessage(error.response)
        _changeError('error', errMsg, this.$store)
        // this.$store.dispatch('changeError')
      }
    },

  }
}
</script>