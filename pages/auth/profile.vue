<template>
    <v-card>
        <v-card-text >
            <v-row >
                <input type="file" accept="image/*" ref="_selectFile" @change="onFileChange" hidden/>
                <v-col cols="12" class="text-center" >
                    <v-badge
                        bordered
                        overlap
                        icon="mdi-lock"
                        
                    >
                        <v-avatar color="primary" size="62" @click="$refs._selectFile.click()">
                            
                            <span class="white--text headline" 
                                v-if="!Avatar">{{user.first_last}}</span>
                            <img
                                :src="Avatar"
                                :alt="user.name"
                                v-if="Avatar"
                            >
                        </v-avatar>
                    </v-badge>

                </v-col>
               
                <v-col cols="12" class="text-center">
                    <v-divider></v-divider><br>
                    <h3><b>{{user.name}}(@{{user.username}})</b></h3>
                </v-col>
                <v-col cols="12" class="text-center" v-if="user.about_me">
                    <v-divider></v-divider><br>
                    <h4><b>{{user.about_me}}</b></h4>
                </v-col>

                <v-col cols="4" class="text-center">
                    <v-divider></v-divider><br>
                    <h4>View: <b>{{user.view_count}}</b></h4>
                </v-col>
                <v-col cols="4" class="text-center" >
                    <v-divider></v-divider><br>
                    <h4>Stories: <b>{{user.story_count}}</b></h4>
                </v-col>
                <v-col cols="4" class="text-center" >
                    <v-divider></v-divider><br>
                    <h4>Hire Me: <b>{{user.hire_me ? 'Yes' : 'No'}}</b></h4>
                </v-col>

                <v-col cols="6" class="text-center" >
                    <v-divider></v-divider><br>
                    <h4>Email: <b>{{user.email}}</b></h4>
                </v-col>
                <v-col cols="6" class="text-center" >
                    <v-divider></v-divider><br>
                    <h4>Mobile: <b>{{user.mobile}}</b></h4>
                </v-col>

                 <v-col cols="6" class="text-center" >
                    <v-divider></v-divider><br>
                    <h4>Join At: <b>{{_updatedAt(user.created_at)}}</b></h4>
                </v-col>
                <v-col cols="6" class="text-center" >
                    <v-divider></v-divider><br>
                    <h4>Updated At: <b>{{_updatedAt(user.updated_at)}}</b></h4>
                </v-col>

                <v-col cols="12">
                    <v-divider></v-divider><br>
                    Skills: 
                    <v-chip
                        v-for="(skill, index) in user.skills"
                        class="ma-2"
                        :key="index"
                        color="indigo"
                        text-color="white"
                        >
                        {{skill}}
                        </v-chip>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import Story from '~/components/main/story'
import moment from 'moment'
import  _changeError  from '~/lib/_changeError'
export default {
    layout: "auth",
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
                let errMsg = error.response
                _changeError('error', errMsg, this.$store)
            }
        },

        async _avatarUpdate(){
            try {
                _changeError('success', '', this.$store)
                this.$store.dispatch('changeLoading', true)

                let formData = new FormData();
                formData.append("image", this.File)
                await this.$axios.post('/api/v1/auth/avatar/update', formData, {
                    // headers: {
                    //     'Content-Type': 'multipart/form-data'
                    // }
                })
                _changeError('success', 'Successfully Avatar Updated', this.$store)
                this.$store.dispatch('changeLoading', false)
                this.File = ''
                this.$auth.fetchUser()
               
            } catch (error) {
                let errMsg = error.response
                this.$store.dispatch('changeLoading', false)
                _changeError('error', errMsg, this.$store)

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