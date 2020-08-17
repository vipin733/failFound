<template>
    <Editorjs :isReady="isReady"  :isSaving="isLoging" :title="title"
     :value="data" @saveData="_addHtmlEditor"/>
</template>

<script>

import Editorjs from '~/components/main/story/editorjsCMP'
import errorMessage from '~/lib/errors'

export default {
    
    middleware: 'auth',
    layout: "auth",
    components: {
        Editorjs
    },

    methods: {

        async _errorPopup(variant = null, title = "", body = "") {
            this.$bvToast.toast(body, {
                title: title,
                variant: variant,
                solid: true
            })
        },

        async _addHtmlEditor(data){
            try {
                if (this.isLoging) {
                    return
                }
                let storyData = {
                    Title:   data.title,
                    Content: data.data,
                    Status:  data.status,
                }
                let res = await this.$axios.post('/api/v1/story/create',storyData)
                this.isLoging = false
                this.$router.push({ path: '/story/'+res.data.slug })
            } catch (error) {
                this.isLoging = false
                let errMsg = errorMessage(error.response)
                this._errorPopup('danger', 'Oops', errMsg )
            }
        }
    },

    mounted(){
        this.isReady = true
    },

    data() {
        return {
            isLoging: false,
            isReady: false,
            title: '',
            data: {}
        }
    },

    
}
</script>