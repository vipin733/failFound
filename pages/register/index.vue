<template>
    <div class="row">
        <div class="col-md-8 offset-md-2">
            <b-card class="mb-2  p-2">
                <b-card-text>
                    <form class="needs-validation" novalidate>
                        <div class="form-row">
                            
                            <div class="col-md-12 text-center">
                                <p class="h3">Register</p> <br>
                            </div>
                           
                           <div class="col-md-12">
                                <input type="text" v-model="Name" ref="Name" class="form-control" placeholder="Name"  required>
                            </div>

                            <div class="col-md-12">
                                <br>
                            </div>
                            <div class="col-md-12">
                                <input type="text" ref="Username" @keyup="onChange" v-model="Username" 
                                :class="{
                                    'form-control': true,
                                    'is-valid': Username.length > 0 && usernameValid && !isFetching,
                                    'is-invalid': Username.length > 0 && !usernameValid && !isFetching,
                                }"
                                placeholder="Username"  
                                required>
                                <div class="invalid-feedback">
                                    username already taken
                                </div>            
                            </div>

                            
                            <div class="col-md-12">
                                <br>
                            </div>
                            <div class="col-md-12">
                                <input type="email" ref="Email" v-model="Email" class="form-control" placeholder="Email"  required>
                            </div>

                            <div class="col-md-12">
                                <br>
                            </div>

                            <div class="col-md-12">
                                <input type="password" ref="Password" v-model="Password" class="form-control" placeholder="Password" required>
                            </div>


                            <div class="col-md-12">
                                <br>
                            </div>
                            <div class="col-md-12">
                                <input type="password" ref="ConfirmPassword" v-model="ConfirmPassword" class="form-control" placeholder="Confirm Password" required>
                            </div>

                            <div class="col-md-12">
                                <br>
                            </div>

                            <div class="col-md-12  text-center justify-content-center">
                                <b-button block @click="_register" v-if="!isFetching" variant="primary">Register</b-button>
                                <b-spinner v-if="isFetching" variant="primary" label="Spinning"></b-spinner>
                            </div>

                            <div class="col-md-12 text-center">
                                Already have account? 
                                <nuxt-link to="/login" v-if="!isFetching">
                                    <a href="#">Login</a>
                                </nuxt-link>
                                <a href="#" @click="_push" v-if="isFetching">Login</a>
                            </div>

                        </div>
                    </form>
                </b-card-text>
            </b-card>
        </div>
    </div>
</template>

<script>
import debounce from 'lodash/debounce'
import errorMessage from '~/lib/errors'

export default {

    data() {
        return {
            Name: '',
            Email: '',
            Username: '',
            Password: '',
            ConfirmPassword: '',
            isFetching: false,
            usernameValid: false
        }
    },

    methods: {
        
        isValid(data) {
            var isValidData = true
            for (let i = 0; i < Object.keys(data).length; i++) {
                if (!data[Object.keys(data)[i]]) {
                    this.$refs[Object.keys(data)[i]].focus()
                    isValidData = false
                    break
                }
            }
            return isValidData
        },
            
        _push($event){
            $event.preventDefault()
            return
        },
        async _errorPopup(variant = null, title = "", body = "") {
            this.$bvToast.toast(body, {
                title: title,
                variant: variant,
                solid: true
            })
        },

        onChange: debounce(function() {
            this._validateUsername()
        }, 1000),

        async _validateUsername() {
            try {
                
                if (this.isFetching) {
                    return
                }
               
                this.usernameValid = false
                this.isFetching = true
                await this.$axios.post('/api/v1/user/validate/username', {Username: this.Username})
                this.usernameValid = true
                this.isFetching = false
            } catch (error) {
                this.isFetching = false
                this.usernameValid = false
            }
        },

        async _register() {
            try {
                let data = {
                    Name: this.Name,
                    Email: this.Email,
                    Username: this.Username,
                    Password: this.Password,
                    ConfirmPassword: this.ConfirmPassword,
                }
                if (!this.isValid(data)) {
                    return
                }
                if (this.isFetching) {
                    return
                }
                this.isFetching = true
                
                let res = await this.$axios.post('/api/v1/registration', this._data)
                await this.$auth.loginWith('local', {data: {
                    Username: this.Email,
                    Password: this.Password,
                }})
                this.isLoging = false
                this.$router.push({ path: '/' })
                this.isFetching = false
            } catch (error) {
                this.isFetching = false
                let errMsg = errorMessage(error.response)
                this._errorPopup('danger', 'Oops', errMsg )
            }
        }
    }
};
</script>