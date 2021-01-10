<template>
    <v-col cols="12" class="text-center" v-if="$auth.loggedIn">
        <input type="file" accept="image/*" ref="_selectFile" @change="onFileChange" hidden/>
        <v-badge
            bordered
            overlap
            icon="mdi-pencil"
        >
            <v-avatar color="primary" size="62" @click="$refs._selectFile.click()">
                
                <span class="white--text headline" 
                    v-if="!Avatar">{{$auth.user.data.first_last}}</span>
                <img
                    :src="Avatar"
                    :alt="$auth.user.data.name"
                    v-if="Avatar"
                >
            </v-avatar>
        </v-badge>
   </v-col>
</template>

<script>
export default {

    data() {
        return {
            Avatar: this.$auth.user.data.avatar,
            File: ''
        }
    },

    methods: {
        async _avatarUpdate(){
            try {
                _changeError('success', '', this.$store)
                this.$store.dispatch('changeLoading', true)

                let formData = new FormData()
                formData.append("image", this.File)
                await this.$axios.post('/api/v1/auth/avatar/update', formData)
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
           
        }
    }
}
</script>