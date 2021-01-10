<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" scrollable max-width="300px">
            <v-card>
                <v-card-title>Share</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 300px;">
                    <v-list flat>
                        <v-list-item-group color="primary">
                            <v-list-item v-for="(network, i) in networks" :key="i"  @click="_openPopup(network.network)">
                                <ShareNetwork
                                    :network="network.network"
                                    :url="url"
                                    :title="title"
                                    :description="description"
                                    :quote="quote"
                                    :hashtags="hashtags"
                                    :ref="network.network"
                                >
                                </ShareNetwork>
                               
                                <v-list-item-icon class="pr-6">
                                    <v-icon :color="network.color" v-text="network.icon"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="network.title"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="_closeWindow">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
  export default {
    
    props: {
        url:         String,
        title:       String,
        url:         String,
        description: String,
        quote:       String,
        hashtags:    String        
    },

    data () {
        return {
            dialogm1: '',
            dialog: true,
            // item: 0,
            networks:[
                {
                    network: 'facebook', title: 'Facebook', icon: 'mdi-facebook', color: "light-blue darken-4"
                },
                {
                    network: 'quora', title: 'Quora', icon: 'mdi-quora', color: "red darken-4"
                },
                {
                    network: 'twitter', title: 'Twitter',  icon: 'mdi-twitter', color: "blue lighten-1"
                },
                {
                    network: 'linkedin', title: 'Linkedin', icon: 'mdi-linkedin', color: "blue darken-2"
                },
                {
                    network: 'whatsapp', title: 'Whatsapp', icon: 'mdi-whatsapp', color: "green darken-2"
                }
            ]
        }
    },

    methods:{

        _closeWindow(){
            this.$emit('closeShare')
        },

        _openPopup(network){
            this.$refs[network][0].share()
        }
    }
  }
</script>