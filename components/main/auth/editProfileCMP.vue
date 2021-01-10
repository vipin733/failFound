<template>
    <v-card-text >
        <v-row >

            <v-col cols="12">
                <v-text-field
                    prepend-icon="mdi-account"
                    placeholder="Name"
                    v-model="user.Name"
                    :disabled="isLoging"
                    :rules="Rules.nameRules"
                    
                    ref="Name"
                    error-count="3"
                ></v-text-field>
            </v-col>

            <v-col cols="12">
                <v-text-field
                    prepend-icon="mdi-account"
                    placeholder="Email"
                    v-model="user.Email"
                    :disabled="true"
                    :rules="Rules.loginUsernameRules"
                    
                    ref="Email"
                    error-count="3"
                ></v-text-field>
            </v-col>

            <v-col cols="12">
                <v-text-field
                    prepend-icon="mdi-account"
                    placeholder="Mobile"
                    v-model="user.Mobile"
                    :disabled="isLoging"
                    :rules="Rules.mobileRules"
                    
                    ref="Mobile"
                    error-count="3"
                ></v-text-field>
            </v-col>

            <v-col cols="12">
                <v-textarea
                    prepend-icon="mdi-account"
                    :label="!user.AboutMe ? 'About Me' : ''"
                    v-model="user.AboutMe"
                    
                    ref="AboutMe"
                >
                </v-textarea>
            </v-col>

            <v-col cols="6">
                <br>
                <b>Hire Me</b>
            </v-col>
            <v-col cols="6">
                <v-switch v-model="user.HireMe" label=""></v-switch>
            </v-col>

            <v-col cols="6">
                <br>
                <b>Show Mobile</b>
            </v-col>
            <v-col cols="6">
                <v-switch v-model="user.ShowMobile" label=""></v-switch>
            </v-col>

            <v-col cols="6">
                <br>
                <b>Show Email</b>
            </v-col>
            <v-col cols="6">
                <v-switch v-model="user.ShowEmail" label=""></v-switch>
            </v-col>

            <v-col cols="1"><br><b> Skills:</b> </v-col>
            <v-col cols="11">
                <SkillCMP :skillData="skillData" :key="skillKey" @addedSkill="_skillUpdated"/>
            </v-col>

            <v-col cols="12"  class="text-center">
                <v-divider></v-divider>
                <v-btn block color="primary"  @click="_updateProfile" :disabled="isLoging">Update</v-btn>
            </v-col>

        </v-row>
    </v-card-text>
</template>

<script>
import errorMessage from '~/lib/errors'
import  _isValid  from '~/lib/validateFunc'
import  _changeError  from '~/lib/_changeError'
import Rules from '~/lib/rules'
import SkillCMP from '~/components/main/auth/skillCMP'
export default {
    
    components: {
        SkillCMP
    },

    props:{
        userData: Object
    },
    data () {
        return {
            user: {
                Name: this.userData.name,
                Email: this.userData.email,
                AboutMe: this.userData.about_me,
                Mobile: this.userData.mobile,
                HireMe: this.userData.hire_me,
                ShowMobile: this.userData.show_mobile,
                ShowEmail: this.userData.show_email,
                Skills: this.userData.skills
            },
            skillData: [],
            Rules,
            skillKey: 1
        }
    },

    mounted(){
        this._recreateSkills()
    },

    methods:{
       
        async _updateProfile(){
            try {
                _changeError('success', '', this.$store)
                let data = {
                    Name: this.user.Name
                }
                let isValid  = _isValid(data, this.$refs)
                if (this.$store.getters.isLoading || !isValid) {
                    return
                }

                this.$store.dispatch('changeLoading', true)
                let res = this.$axios.post('/api/v1/auth/profile/update', this.user)
                _changeError('success', 'Successfully Updated', this.$store)
                this.$store.dispatch('changeLoading', false)
                this.$emit('updated', false)
                this.$auth.fetchUser()
                this.skillKey ++
            } catch (error) {
                this.$store.dispatch('changeLoading', false)
                let errMsg = errorMessage(error.response)
                _changeError('error', errMsg, this.$store)
            }
        },

        _skillUpdated(skills) {
            let data = []
            if(skills && skills.length > 0) {
                skills.forEach(element => {
                    data.push(element.text)
                })
            }
            this.user.Skills = [...data]
        },

        _recreateSkills(){
            let skills = []
            this.userData.skills.forEach(element => {
                 let data = {
                    text: element,
                    color: 'teal',
                }
                skills.push(data)
            })
            this.skillData = [...skills]
            this.skillKey ++
        }
    },

    computed: {
        isLoging(){
            return this.$store.getters.isLoading
        }
    }
}
</script>