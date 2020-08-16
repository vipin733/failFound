<template>
    
    <div class="d-flex">
        
        <div class="col-md-12">
            <div class="row"> 
                <div class="col-md-3" style="display: flex;">
                    <div v-if="comment && comment.user && comment.user.username"  >
                        <nuxt-link   :to="`/profile/${comment.user.username}`"> 
                            <b-avatar  variant="info" v-if="comment && comment.user && comment.user.avatar" 
                            :src="comment.user.avatar"></b-avatar>
                            <b-avatar :text="comment.user.first_last" v-else></b-avatar>
                        </nuxt-link >
                    </div>
                    <div>
                        <p v-if="comment && comment.user && comment.user.username" class="pl-2 font-weight-bold"> 
                            <nuxt-link  style="color:black" :to="`/profile/${comment.user.username}`">{{comment && comment.user ? comment.user.name : ''}}</nuxt-link>
                            <br>{{_createdAt(comment.created_at)}}</p>
                        <p></p>
                    </div>
                </div>
                <div class="col-md-9">
                    <p>{{comment.comment}}</p>
                </div>
            </div>
        </div>
        
    </div>
   
</template>

<script>
import moment from 'moment'
export default {

    props:['comment'],

    methods: {
        push(route) {
            this.$router.push(route)
        },

        _createdAt(time){
            return moment(time).utcOffset('+0530').fromNow()
        },
        
       
    }
};
</script>