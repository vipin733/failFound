<template>
    <v-container fluid>
        <v-combobox
        v-model="model"
        hide-selected
        multiple
        small-chips
        solo
        >

            <template v-slot:selection="{ attrs, item, parent, selected }">
                <v-chip
                    v-if="item === Object(item)"
                    v-bind="attrs"
                    :color="`${item.color} lighten-3`"
                    :input-value="selected"
                    label
                    small
                >
                    <span class="pr-2">
                        {{ item.text }}
                    </span>
                    <v-icon  small  @click="parent.selectItem(item)">mdi-close</v-icon>
                </v-chip>
            </template>
     
        </v-combobox>
    </v-container>
</template>

<script>
  export default {
    
    props: {
        skillData: Array
    },

    data () {
        return {
            colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
            index: -1,
            nonce: 1,
            items:this.skillData,
            model: this.skillData,
        }
    },

    watch: {
        model (val, prev) {
            if (val.length === prev.length) return
            this.model = val.map(v => {
                if (typeof v === 'string') {
                    v = {
                        text: v,
                        color: this.colors[this.nonce - 1],
                    }
                    this.items.push(v)
                    this.nonce++
                }
                return v
            })

            this.$emit('addedSkill',  this.model)
        },
        
    },
}
</script>