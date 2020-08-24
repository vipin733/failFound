<template>
    <v-card>
        <v-card-text >
            <v-row >
                <v-col cols="12" class="text-center" >
                    <v-avatar color="primary" size="62">
                        <span class="white--text headline" 
                        v-if="!user.avatar">{{user.first_last}}</span>
                        <img
                            :src="user.avatar"
                            :alt="user.name"
                            v-if="user.avatar"
                        >
                    </v-avatar>
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
                    <h4>Join At: <b>{{_createdAt(user.created_at)}}</b></h4>
                </v-col>
                <v-col cols="6" class="text-center" >
                    <v-divider></v-divider><br>
                    <h4>Updated At: <b>{{_createdAt(user.updated_at)}}</b></h4>
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

import moment from 'moment'
export default {
    
    props: {
        user: Object
    },

    methods:{
        _createdAt(time){
            return moment(time).utcOffset('+0530').fromNow()
        },
    }
}
</script>