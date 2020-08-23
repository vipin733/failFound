<template>
    <v-card>
        <v-snackbar
            v-model="snackbar"
            :bottom="y === 'bottom'"
            :color="color"
            :left="x === 'left'"
            :multi-line="mode === 'multi-line'"
            :right="x === 'right'"
            :timeout="timeout"
            :top="y === 'top'"
            :vertical="mode === 'vertical'"
        >
            {{ text }}
            <template v-slot:action="{ attrs }">
                <v-btn
                    dark
                    text
                    v-bind="attrs"
                    @click="_closeError"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-card>
</template>

<script>
  export default {
    data () {
        return {
            color: this.$store.getters.error.type,
            mode: '',
            snackbar: true,
            text: this.$store.getters.error.message,
            timeout: -1,
            x: 'right',
            y: 'top',
        }
    },

    methods: {
        _closeError(){
            let data = {
                type: 'error',
                message: ''
            }
            this.$store.dispatch('changeErrorData', data)
        },
    }

  }
  </script>