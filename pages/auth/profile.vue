<template>
    <div class="row">
        
        <h3>Profile</h3>

    </div>
</template>

<script>
import Story from '~/components/main/story'
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