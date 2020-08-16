<script>
  import { ContentLoader } from "vue-content-loader"

  export default {
    components: { ContentLoader }
  }
</script>

<template>
 <div class="row">
        <div class="col-md-8 offset-md-2">
            <div>
                <b-card
                class="mb-2  p-3"
                >
                    <b-card-text>
   <content-loader
    :width="476"
    :height="350"
    :speed="2"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="55" y="14" rx="3" ry="3" width="88" height="6" /> 
    <rect x="55" y="32" rx="3" ry="3" width="52" height="6" /> 
    <rect x="4" y="250" rx="3" ry="3" width="410" height="6" /> 
    <rect x="4" y="270" rx="3" ry="3" width="380" height="6" /> 
    <rect x="3" y="290" rx="3" ry="3" width="178" height="6" /> 
    <circle cx="21" cy="24" r="20" /> 
    <rect x="419" y="7" rx="0" ry="0" width="29" height="12" /> 
    <rect x="6" y="55" rx="0" ry="0" width="440" height="166" /> 
    <rect x="6" y="317" rx="0" ry="0" width="179" height="30" />
  </content-loader>
                    </b-card-text>
                </b-card></div></div></div>
</template>