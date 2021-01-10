<template>
    <div>
    <v-card>
        
        <ProfileCMP v-if="!isEdit"/>
        <EditProfileCMP v-if="isEdit" :key="profileKey" :userData="$auth.user.data" @updated=" _updated"/>

        
        <!-- updated -->
        <v-btn
            bottom
            color="blue"
            dark
            fab
            fixed
            right
            v-if="!isEdit"
            @click="isEdit = !isEdit"
        >
            <v-icon>mdi-pencil</v-icon>
        </v-btn>

    </v-card>
    </div>
</template>

<script>
import moment from 'moment'
import  _changeError  from '~/lib/_changeError'
import AvatarCMP from '~/components/main/auth/avatarCMP'
import ProfileCMP from '~/components/main/auth/profileCMP'
import EditProfileCMP from '~/components/main/auth/editProfileCMP'


export default {

    layout: "auth",
    middleware: 'auth',
 

    components:{
        AvatarCMP,
        ProfileCMP,
        EditProfileCMP
    },

    data() {
        return {
            profileKey: 1,
            isEdit: false
        }
    },


    mounted() {
      this.profileKey++
    },

    methods: {
        _updated(){
            this.isEdit= false
            this.profileKey++
        }
    }
    
};
</script>