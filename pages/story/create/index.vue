<template>
    <Editorjs :isReady="isReady"   :title="title"
     :value="data" @saveData="_addHtmlEditor"/>
</template>

<script>

import Editorjs from '~/components/main/story/editorjsCMP'
import errorMessage from '~/lib/errors'
import  _changeError  from '~/lib/_changeError'

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
                _changeError('success', '', this.$store)
                this.$store.dispatch('changeLoading', true)
                let storyData = {
                    Title:   data.title,
                    Content: data.data,
                    Status:  data.status,
                }
                let res = await this.$axios.post('/api/v1/story/create',storyData)
                this.$store.dispatch('changeLoading', false)
                this.$router.push({ path: '/story/'+res.data.slug })
            } catch (error) {
                this.$store.dispatch('changeLoading', true)
                let errMsg = errorMessage(error.response)
                _changeError('error', errMsg, this.$store)
            }
        }
    },

    mounted(){
        this.isReady = true
    },

    data() {
        return {
            isLoging:  this.$store.getters.isLoading,
            isReady: false,
            title: '',
            data: {}
        }
    },

    
}
</script>