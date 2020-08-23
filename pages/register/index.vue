<template>
    <v-card >
        <v-card-title class="">
          Register
        </v-card-title>
        <v-container>
          <v-row class="mx-2">
             
                <v-col cols="12">
                    <v-text-field
                        prepend-icon="mdi-account"
                        placeholder="Username"
                        @keydown="onChange"
                        v-model="user.Username"
                        required
                        :error="showError"
                        :error-messages="showError ? 'username already taken': ''"
                        :success="showSuccess"
                        :success-messages="showSuccess ? 'Success' : ''"
                        ref="Username"
                        :clearable="true"
                        :disabled="_isLoading"
                        :rules="Rules.usernameRules"
                        error-count="3"
                    ></v-text-field>
                </v-col>

                <v-col cols="12"
                >
                    <v-text-field
                        prepend-icon="mdi-mail"
                        placeholder="Email"
                        required
                        ref="Email"
                        :clearable="true"
                        v-model="user.Email"
                        :disabled="_isLoading"
                        :rules="Rules.emailRules"
                        error-count="2"
                    ></v-text-field>
                </v-col>

                <v-col cols="12"
                >
                    <v-text-field
                        prepend-icon="mdi-mail"
                        placeholder="Name"
                        required
                        ref="Name"
                        v-model="user.Name"
                        :clearable="true"
                        :disabled="_isLoading"
                        :rules="Rules.nameRules"
                        error-count="3"
                    ></v-text-field>
                </v-col>
            
                <v-col  cols="12"
                >
                    <v-text-field
                        prepend-icon="mdi-key"
                        placeholder="Password"
                        type="password"
                        required
                        ref="Password"
                        v-model="user.Password"
                        :clearable="true"
                        :disabled="_isLoading"
                        :rules="Rules.passwordRules"
                        error-count="2"
                    ></v-text-field>
                </v-col>

                <v-col  cols="12"
                >
                    <v-text-field
                        prepend-icon="mdi-key"
                        placeholder="Confirm Password"
                        required
                        type="password"
                         ref="ConfirmPassword"
                        :clearable="true"
                        :disabled="_isLoading"
                         v-model="user.ConfirmPassword"
                        :rules="Rules.confirmPasswordRules"
                        
                        error-count="2"
                    ></v-text-field>
                </v-col>

            
            <v-col  cols="12"
              >
              Already have account ? <a  @click.prevent="_changeStep" href="#">Login</a> 
            </v-col>
           
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="_register"
            :disabled="_isLoading"
          >Register</v-btn>
        </v-card-actions>
        
    </v-card>
</template>

<script>
import debounce from 'lodash/debounce'
import errorMessage from '~/lib/errors'
import Rules from '~/lib/rules'
import  _isValid  from '~/lib/validateFunc'
import  _changeError  from '~/lib/_changeError'


export default {
    layout: "guest",
    data() {
        return {
            user: {
                Username: '',
                Email: '',
                Name: '',
                Password: '',
                ConfirmPassword: '',
            },
            isFetching: false,
            usernameValid: false,
            ConfirmPasswordError: false,
            Rules
        }
    },

    computed: {

        isLoging(){
            return this.$store.getters.isLoading
        },


        showError() {
           
            if (!this.usernameValid && !this.isFetching && this.user.Username && this.user.Username.length > 0) {
                return true
            }
            return false
        },

        showSuccess() {
            
            if (this.usernameValid && !this.isFetching && this.user.Username &&  this.user.Username.length > 0) {
                if (this.$refs.Username && this.$refs.Username.hasError) {
                    return false
                }
                return true
            }
            return false
        },

        _isLoading(){
            if (this.isFetching || this.isLoging) {
                return true
            }
            return false
        }
    },

  

    methods: {
        
        showPasswordError(){
            let Password = this.$refs.Password 
            let ConfirmPassword = this.$refs.ConfirmPassword 
            if (!Password || !ConfirmPassword) {
                this.ConfirmPasswordError = false
                return false
            }

            if (Password.hasError || ConfirmPassword.hasError) {
                this.ConfirmPasswordError = false
                return false
            }

            if (this.user.Password != this.user.ConfirmPassword ) {
                this.ConfirmPasswordError = true
                return false
            }
            this.ConfirmPasswordError = false
        },

        _changeStep(){
            if (this.isLoging) {
                return false
            }
            this.$router.push('/login')
        },
    
        onChange: debounce(function() {
            this._validateUsername()
        }, 1000),

        async _validateUsername() {
            try {
                
                if (this.isFetching || !this.user.Username) {
                    return
                }
                this.usernameValid = false
                this.isFetching = true
                await this.$axios.post('/api/v1/user/validate/username', {Username: this.user.Username})
                this.usernameValid = true
                this.isFetching = false
            } catch (error) {
                this.isFetching = false
                this.usernameValid = false
            }
        },

        async _register() {
            try {
            
                _changeError('success', '', this.$store)
                let isValid  = _isValid(this.user, this.$refs)
                this.showPasswordError()
                if (this.ConfirmPasswordError) {
                    _changeError('error', 'Password does not match', this.$store)
                    return
                }
                if (this.isFetching || !isValid || this.isLoging) {
                    return
                }
                this.$store.dispatch('changeLoading', true)
                let res = await this.$axios.post('/api/v1/registration', this.user)
                await this.$auth.loginWith('local', {data: {
                    Username: this.user.Email,
                    Password: this.user.Password,
                }})
                this.$store.dispatch('changeLoading', false)
                _changeError('success', 'Successfully logged in', this.$store)
                this.$router.push({ path: '/' })
            } catch (error) {
                this.$store.dispatch('changeLoading', false)
                let errMsg = errorMessage(error.response)
                _changeError('error', errMsg, this.$store)
            }
        }
    }
}
</script>