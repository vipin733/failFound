<template>
    <v-card>
        <v-card-text>
            <v-row :key="key">

                <v-col cols="12">
                    <v-text-field
                        prepend-icon="mdi-account"
                        placeholder="Current Password"
                        v-model="user.CurrentPassword"
                        :disabled="isLoging"
                        :rules="Rules.currentPasswordRules"
                        ref="CurrentPassword"
                        error-count="3"
                        type="password"
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-text-field
                        prepend-icon="mdi-account"
                        placeholder="Password"
                        v-model="user.Password"
                        :disabled="isLoging"
                        :rules="Rules.passwordRules"
                        ref="Password"
                        error-count="3"
                        type="password"
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-text-field
                        prepend-icon="mdi-account"
                        placeholder="Confirm Password"
                        v-model="user.ConfirmPassword"
                        :disabled="isLoging"
                        :rules="Rules.confirmPasswordRules"
                        ref="ConfirmPassword"
                        error-count="3"
                        type="password"
                    ></v-text-field>
                </v-col>

                <v-col cols="12"  class="text-center">
                    <v-divider></v-divider>
                    <v-btn block color="primary"  @click="_submit" :disabled="isLoging">Update</v-btn>
                </v-col>

            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>

import errorMessage from '~/lib/errors'
import  _isValid  from '~/lib/validateFunc'
import  _changeError  from '~/lib/_changeError'
import Rules from '~/lib/rules'

export default {

    layout(context) {
        if (context.$auth && context.$auth.loggedIn) {
            return 'auth'
        }
        return 'default'
    },

    data() {
        return {
            user:{
                CurrentPassword: '',
                Password: '',
                ConfirmPassword: ''
            },
            Rules,
            key: 1
        }
    },

    computed:{
        isLoging(){
            return this.$store.getters.isLoading
        }
    },

    methods:{
        _clear(){
            this.user = {
                CurrentPassword: '',
                Password: '',
                ConfirmPassword: ''
            }
        },
        async _submit(){
            try {
                _changeError('success', '', this.$store)
                let isValid  = _isValid(this.user, this.$refs)

                if (!isValid || this.$store.getters.isLoading) {
                    return
                }
               
                if (this.user.Password != this.user.ConfirmPassword) {
                    _changeError('error', 'Password does not match', this.$store)
                    return
                }
                this.$store.dispatch('changeLoading', true)
                let res = await this.$axios.post('/api/v1/auth/password/update', this.user)
                this.$store.dispatch('changeLoading', false)
                this._clear()
                _changeError('success', 'Successfully password changed', this.$store)
                this.key++
            } catch (error) {
                console.log(error)
                this.$store.dispatch('changeLoading', false)
                let errMsg = errorMessage(error.response)
                _changeError('error', errMsg, this.$store)
            }
        }
    }

}
</script>