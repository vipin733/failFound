<template>
    <div class="row">
        <div :class="isFull ? 'col-md-12': 'col-md-8 offset-md-2'">
            <div>
                <b-card
                class="mb-2  p-3"
                >
                    <b-card-text>
                        <div class="row">
                            <div class="col">
                                <div class="row">
                                    <div v-if="story && story.user && story.user.username"  >
                                        <nuxt-link   :to="`/profile/${story.user.username}`"> 
                                            <b-avatar  variant="info" v-if="story && story.user && story.user.avatar" 
                                            :src="story.user.avatar"></b-avatar>
                                            <b-avatar :text="story.user.first_last" v-else></b-avatar>
                                        </nuxt-link >
                                    </div>
                                    <div>
                                        <p v-if="story && story.user && story.user.username" class="pl-2 font-weight-bold"> 
                                            <nuxt-link  style="color:black" :to="`/profile/${story.user.username}`">{{story && story.user ? story.user.name : ''}}</nuxt-link>
                                            <br>{{_createdAt(story.created_at)}}</p>
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                            <div class="col text-right">
                                <p class="h4"><b-icon icon="arrow-up-right-square"></b-icon></p>
                            </div>
                        </div>

                        <div class="row">
                            <p class="h5 font-weight-bold">
                                <nuxt-link  style="color:black" :to="`/story/${story.slug}`">{{story.title}}</nuxt-link>
                            </p>
                        </div>

                        <div class="row">
                            <p class="h5 font-weight-normal" v-html=" _content(story.content)">
                            </p>
                        </div>
                        <hr>

                        <div class="row d-flex">
                            <p class="h5 pl-2"> <b-icon icon="chat"></b-icon><span class="pl-1">{{story.comments_count}}</span></p>
                            <p class="h5 pl-3"> 
                                <a href="#" v-if="$auth.loggedIn" @click.prevent="_updateLike"><b-icon fill :icon="story.is_liked ?  'heart-fill' : 'heart'"></b-icon></a>
                                <b-icon icon="heart" v-else></b-icon>
                                <span class="pl-1">{{story.like_count}}</span>
                            </p>
                            <p class="h5 pl-3 text-right"> <b-icon icon="eye"></b-icon><span class="pl-1">{{story.view_count}}</span></p>
                            <p class="h5 pl-3 text-right" v-if="$auth.loggedIn"> 
                               <a href="#" @click.prevent="_editPush"> <b-icon icon="pencil"></b-icon></a>
                            </p>

                        </div>

                    </b-card-text>
                    <hr> 
                    <CommentBox :story="story"  v-if="$auth.loggedIn" @CreatedComment="_insertComment"/>
                    <div v-if="story.comments && story.comments.length > 0" >
                        <Comment v-for="(comment, index) in story.comments" :comment="comment" :key="index"/>
                    </div>
                </b-card>
            </div>
        </div>
        
    </div>
</template>

<script>
import moment from 'moment'
import CommentBox from '~/components/main/commentBox'
import Comment from '~/components/main/comment'
import convert from '~/lib/jsonToHtml'
export default {

    props:['story', 'isFull'],

    components: {
        CommentBox,
        Comment
    },

    methods: {

        _content(content){
            let html = convert(content)
             console.log(html)
            return html
           
        },

        _editPush() {
            this.$router.push('/story/edit/'+this.story.slug)
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
        }
    }
};
</script>