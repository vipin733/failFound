<template>
    <div class="row">
        
        <div class="col-md-8 offset-md-2">
            <b-card
                class="mb-2  p-2"
                >
                <b-card-text>

                    <div class="card-body text-center">
                
                        <b-avatar :src="Avatar" size="6rem" v-if="Avatar"></b-avatar> 
                        <b-avatar :text="FirstLastData" size="6rem" v-else></b-avatar> 
                        <b-icon icon="arrow-up-right-square"  @click="$refs.fileInput.click()"></b-icon>
                        <!-- <h3 class="card-title">{{Name}} <b-icon icon="arrow-up-right-square"></b-icon></h3> --> <br>
                        <br>
                        <b-form-input
                                id="name"
                                v-model="Name"
                                type="text"
                                required
                                placeholder="name"
                                ></b-form-input>

                        <br>
                        <br>
                        <b-form-textarea
                            id="textarea"
                            v-model="AboutMe"
                            placeholder="About me"
                            rows="3"
                            max-rows="6"
                            >
                        </b-form-textarea>

                        
                        <!-- <p class="card-text h5">{{AboutMe}}</p> <b-icon icon="arrow-up-right-square"></b-icon> -->
                        <br>
                        <hr>
                    </div>

                    <input
                        style="display:none"
                        type="file"
                        @change="onFileChange"
                        ref="fileInput"
                        name="file"
                        accept="image/*"
                    />

                   <div class="row text-center">
                        <div class="col">
                            <h1>{{user.story_count}} Story</h1>
                        </div>
                        <div class="col">
                            <h1>{{user.view_count}} Views</h1>
                        </div>
                        <div class="col">
                            <h1><b-icon :icon="HireMe ? 'emoji-smile' :  'emoji-frown'"></b-icon> Hire   </h1>
                        </div>
                    </div>

                </b-card-text>

            </b-card>
        </div>

        <div class="col-md-8 offset-md-2">
            <b-card
                class="mb-2  p-2"
                >
                <b-card-text>
                    <div class="card-body">
            
                        <div class="row">
                            <div class="col">
                                <p class="h4"> Email</p>
                            </div>
                            <div class="col">
                                <b-form-input
                                id="input-1"
                                v-model="Email"
                                type="email"
                                required
                                placeholder="Enter email"
                                disabled
                                ></b-form-input>

                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col">
                                <p class="h4"> Mobile</p>
                            </div>
                            <div class="col">
                                 <b-form-input
                                id="input-1"
                                v-model="Mobile"
                                type="number"
                                required
                                placeholder="mobile"
                                ></b-form-input>
                            </div>
                        </div>

                        <hr>
                        <div class="row">
                            <div class="col">
                                <p class="h4"> Skils</p>
                            </div>
                            <div class="col">
                               <b-form-tags input-id="tags-basic" v-model="Skills"  tag-variant="primary" class="mb-2"></b-form-tags>
                            </div>
                        </div>

                       
                    </div>
                </b-card-text>
            </b-card>
        </div>

         <div class="col-md-8 offset-md-2">
            <b-card
                class="mb-2  p-2"
                >
                <b-card-text>
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <p class="h4"> Hire me</p>
                            </div>
                            <div class="col">
                                <b-form-checkbox v-model="HireMe" switch size="lg"></b-form-checkbox>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col">
                                <p class="h4"> Show My No</p>
                            </div>
                            <div class="col">
                                <b-form-checkbox v-model="ShowMobile" switch size="lg"></b-form-checkbox>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col">
                                <p class="h4"> Show My Email</p>
                            </div>
                            <div class="col">
                                <b-form-checkbox v-model="ShowEmail" switch size="lg"></b-form-checkbox>
                            </div>
                        </div>

                        <hr>
                        <div class="row">
                            <div class="col d-flex justify-content-center">
                               <b-button block @click="_updateProfile" v-if="!isLoading" variant="primary">{{isLoading ? 'Submit...' : 'Submit'}}</b-button>
                               <b-spinner class="text-center" v-if="isLoading" variant="primary" label="Spinning"></b-spinner>
                            </div>
                        </div>

                        <hr>
                        <div class="row" v-if="!isLoading">
                            <div class="col d-flex justify-content-center">
                               <b-button block @click="_logout"  variant="primary">Logout</b-button>
                            </div>
                        </div>

                    </div>
                </b-card-text>
            </b-card>
        </div>

    </div>
</template>

<script>
import Story from '~/components/main/story'
export default {

    middleware: 'auth',
    methods: {
        push(route) {
            this.$router.push(route)
        }
    },

    components:{
        Story
    },

    data() {
        return {
            user: {...this.$auth.user.data},
            Name: this.$auth.user.data.name,
            Email: this.$auth.user.data.email,
            Mobile: this.$auth.user.data.mobile,
            AboutMe: this.$auth.user.data.about_me,
            HireMe: this.$auth.user.data.hire_me,
            ShowMobile: this.$auth.user.data.show_mobile,
            ShowEmail: this.$auth.user.data.show_email,
            Skills: this.$auth.user.data.skills,
            Avatar: this.$auth.user.data.avatar,
            FirstLast: this.$auth.user.data.first_last,
            File: '',
            errMsg: '',
            isNameEdit: false,
            isAboutEdit: false,
            isLoading: false
        }
    },

    computed: {
        FirstLastData(){
            if (this.$auth.user) {
                return this.$auth.user.data.first_last
            }
            return ""
        }
    },

    mounted() {
      this._user()
    },

    methods: {

        async _logout() {
            await this.$auth.logout()
        },

        async _user() {
            try {
                let res = await this.$axios.get('/api/v1/auth/me')
                this.user = res.data.data
            } catch (error) {
            
            }
        },

        async _errorPopup(variant = null, title = "", body = "") {
            this.$bvToast.toast(body, {
                title: title,
                variant: variant,
                solid: true
            })
        },

        async _updateProfile(){
            try {
                if (this.isLoading) {
                    return
                }
                let variant = null
                this.isLoading = true
                let res = this.$axios.post('/api/v1/auth/profile/update', this._data)
                this._errorPopup('success', 'Success', "Successfully Updated" )
                this.isLoading = false
                this.$auth.fetchUser()
            } catch (error) {
                this.isLoading = false
                this.errMsg = error.response
                this._errorPopup('danger', 'Oops', this.errMsg )
            }
        },

        async _avatarUpdate(){
            try {
                let formData = new FormData();
                formData.append("image", this.File)
                await this.$axios.post('/api/v1/auth/avatar/update', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                this._errorPopup('success', 'Success', "Successfully Avatar Updated" )
                this.File = ''
                this.$auth.fetchUser()
            } catch (error) {
                this.isLoading = false
                this.errMsg = error.response
                this._errorPopup('danger', 'Oops', this.errMsg)
            }
        },

        _updatedAt(time){
            return moment(time).utcOffset('+0530').fromNow()
        },

        onFileChange(e) {
            this.File = ''
            let files = e.target.files || e.dataTransfer.files
            let vim = this
            for (var i = 0; i < files.length; i++) {
                ;(function(file) {
                var name = file.name
                var reader = new FileReader()
                reader.onload = function(e) {
                    vim.File = file
                    vim.Avatar =  e.target.result
                    vim._avatarUpdate()
                }
                    reader.readAsDataURL(file)
                })(files[i])
            }
           
        },

    }
    
};
</script>