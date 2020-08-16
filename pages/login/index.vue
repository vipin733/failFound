<template>
    <div class="row">
        <div class="col-md-8 offset-md-2">
            <b-card class="mb-2  p-2">
                <b-card-text>
                    <form class="needs-validation" novalidate>
                        <div class="form-row">
                            
                            <div class="col-md-12 text-center">
                                <p class="h3">Login</p> <br>
                            </div>

                            
                           
                            <div class="col-md-12">
                                <input type="text" v-model="Username" ref="Username" class="form-control" 
                                placeholder="Username or Email" id="validationCustom01" required>
                            </div>

                            <div class="col-md-12">
                                <br>
                            </div>

                            <div class="col-md-12">
                                <input type="text" v-model="Password" ref="Password" class="form-control"
                                 placeholder="Password" id="validationCustom02" required>
                            </div>

                            <div class="col-md-12">
                                <br>
                            </div>

                            <div class="col-md-12 text-center">
                                <b-button @click="_login" block v-if="!isLoging" variant="primary">{{isLoging ? 'Login...' : 'Login'}}</b-button>
                                <b-spinner v-if="isLoging" variant="primary" label="Spinning"></b-spinner>
                            </div>

                            <div class="col-md-12 text-center">
                                Do not have account? 
                                <nuxt-link to="/register" v-if="!isLoging">
                                    <a href="#">Register</a>
                                </nuxt-link>
                                <a href="#" @click="_push" v-if="isLoging">Register</a>
                            </div>

                        </div>
                    </form>
                </b-card-text>
            </b-card>
        </div>
    </div>
</template>

<script>
import errorMessage from '~/lib/errors'
export default {

    data() {
        return {
            Username: '',
            Password: '',
            isLoging: false
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

        async _login() {
            try {
                let data = {
                    Username: this.Username,
                    Password: this.Password,
                }
                if (!this.isValid(data)) {
                    return
                }
                if (this.isLoging) {
                    return
                }
                this.isLoging = true
                await this.$auth.loginWith('local', {data: this._data})
                this.isLoging = false
                this.$router.push({ path: '/' })
            } catch (error) {
                this.isLoging = false
                let errMsg = errorMessage(error.response)
                this._errorPopup('danger', 'Oops', errMsg )
            }
        },
    }
}
</script>