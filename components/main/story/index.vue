<template>
    <div>
        <v-card
            class="mx-auto"
        >
            <v-list-item>
                <v-list-item-avatar color="grey">
                    {{story.user.first_last}}
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="headline">
                        <nuxt-link :to="_userPath(story)" style="text-decoration: blink;">{{story.user.name}}</nuxt-link>
                    </v-list-item-title>
                    <v-list-item-subtitle>{{_createdAt(story.created_at)}}</v-list-item-subtitle>
                </v-list-item-content>

                <v-btn icon @click="isShare = true">
                    <v-icon>mdi-share-variant</v-icon>
                </v-btn>

            </v-list-item>

            
            <v-card-text >
                <a style="text-decoration: blink;" href="#" @click.prevent="_push(false)"><h3>{{story.title}}</h3></a>
                <br>
                <div v-html="_content(story.content)"></div>
            </v-card-text>

            <v-card-actions>
                <v-btn icon @click="_updateLike">
                    <span>{{story.like_count}}</span>
                    <v-icon :color="story.is_liked ? 'primary' : ''" >mdi-heart</v-icon>
                </v-btn>
            
                <v-btn icon class="pl-7">
                    {{story.comments_count}}
                    <v-icon>mdi-comment</v-icon>
                </v-btn>

                <v-btn icon class="pl-10"> 
                    {{story.view_count}}
                    <v-icon>mdi-eye</v-icon>
                </v-btn>

                 <v-btn icon class="pl-10" v-if="_isMe && isFull" @click="_push(true)"> 
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>


                <v-spacer></v-spacer>
                <v-btn
                    v-if="!isFull"
                    @click="_push(false)"
                    text
                    color="primary"
                >
                    Read More
                </v-btn>
                 <v-btn
                    v-if="isFull && _allowChangeStatus"
                    @click="_updateStatus"
                    text
                    color="primary"
                >
                    Mark {{story.isDraft ? 'Published' : 'Draft'}}
                </v-btn>
            </v-card-actions>
            
        </v-card>
        <br v-if="isFull && $auth.loggedIn">
        <CommentBox :story="story" v-if="isFull && $auth.loggedIn" @CreatedComment="_insertComment"/>
        <br>
        <div v-if="isFull && story.comments && story.comments.length> 0">
            <Comment v-for="(comment, cindex) in story.comments" :key="cindex"  @deleteComment="_deleteComment(cindex)" :comment="comment"/>
        </div>
        <ShareDialop 
            v-if="isShare" 
            @closeShare="isShare = false"
            :url="url"
            :title="story.title"
            :description="story.title"
            quote=""
            hashtags="founder,story"
        />
    </div>
</template>

<script>
import moment from 'moment'
import CommentBox from '~/components/main/commentBox'
import ShareDialop from '~/components/main/story/shareDialop'
import Comment from '~/components/main/comment'
import convert from '~/lib/jsonToHtml'
import errorMessage from '~/lib/errors'
import  _changeError  from '~/lib/_changeError'
let url
if (process.client) {
    url =  window.location.href 
}
export default {

    props:['story', 'isFull', 'isEdit', 'isAuth'],
   
    components: {
        CommentBox,
        Comment,
        ShareDialop
    },

    mounted(){
        console.log(this.url)
    },

    data(){
        return {
            isShare: false,
            url
        }
    },

    computed:{
        _allowChangeStatus(){
            if (!this.$auth.loggedIn) {
                return false
            }

            if (this.$auth.user.data.id != this.story.user.id) {
                return false
            }
            return true
            
        },

        _isMe(){
            if (!this.$auth.loggedIn) {
                return false
            }

            if (this.$auth.user.data.id == this.story.user.id) {
                return true
            }
            return false
        },
    },

    methods: {

        _content(content){
            let html = convert(content)
            return html
        },

        _userPath(story){
            if (this.$auth.loggedIn) {
                if (story.user.id == this.$auth.user.data.id) {
                    return '/auth/me/'+story.user.username
                }
            }

            return '/profile/'+story.user.username
        },

        _push(isEdit = false) {
            if (isEdit) {
                this.$router.push('/story/edit/'+this.story.slug)
                return
            }
            if (this.isAuth) {
                this.$router.push('/story/'+this.story.slug+"?source=auth")
                return
            }
            this.$router.push('/story/'+this.story.slug)
        },

        _createdAt(time){
            return moment(time).utcOffset('+0530').fromNow()
        },

        _insertComment(comment){
            if ( this.story.comments) {
                this.story.comments.unshift(comment)
            }else{
                this.story.comments = []
                this.story.comments.unshift(comment)
            }
            this.story.comments_count++
        },

        _deleteComment(index) {
            let comments = [...this.story.comments]
            delete comments[index]
            this.story.comments = comments
            this.story.comments_count--
        },

        async _updateLike(){
            try {
                if (!this.$auth.loggedIn) {
                    return
                }
                let data = {
                    StoryID: this.story.id
                }
                let res = await this.$axios.post('/api/v1/story/like/update', data )
                this.story.is_liked = !this.story.is_liked
                if (this.story.is_liked) {
                    this.story.like_count ++
                }else{
                    this.story.like_count --
                }
            } catch (error) {
                
            }
        },

        async _updateStatus(){
            try {
                let isLoading = this.$store.getters.isLoading
                console.log(isLoading)
                if (isLoading) {
                    return
                }
                _changeError('success', '', this.$store)
                let data = {
                    Published: this.story.isDraft ? true : false
                }
                this.$store.dispatch('changeLoading', true)
                let res = await this.$axios.post('/api/v1/story/update/status/'+this.story.id, data )
                this.story.isDraft = !this.story.isDraft
                this.$store.dispatch('changeLoading', false)
                let msg = "successfully marked " + this.story.isDraft ? 'draft' : 'published'
                _changeError('success', msg , this.$store)
            } catch (error) {
                this.$store.dispatch('changeLoading', false)
                let errMsg = errorMessage(error.response)
                _changeError('error', errMsg, this.$store)
            }
        }
    }
}
</script>
