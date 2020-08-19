<template>
    <b-list-group>
        <b-list-group-item href="#" @click.prevent="_push('/')">Home</b-list-group-item>
        <b-list-group-item href="#" @click.prevent="_push('/auth/story/published')">Published Story</b-list-group-item>
        <b-list-group-item href="#"  @click.prevent="_push('/auth/story/draft')">Draft Story</b-list-group-item>
        <b-list-group-item href="#"  @click.prevent="_push('/story/create')">Create Story</b-list-group-item>
        <b-list-group-item href="#" @click.prevent="_push('/auth/me/'+username)">Public Profile</b-list-group-item>
        <b-list-group-item href="#" @click.prevent="_push('/auth/profile')">Profile</b-list-group-item>
        <b-list-group-item href="#" @click.prevent="_logout">Logout</b-list-group-item>
    </b-list-group>
</template>

<script>
export default {
    methods: {

        _push(url) {
            this.$router.push(url)
        },

        _logout() {
            this.$auth.logout()
        }
    },

    computed: {
        username() {
            if (this.$auth.user) {
               return  this.$auth.user.data.username
            }
            return ""
        }
    }
}
</script>

<style>

</style>