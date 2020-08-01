<template>
  <div>
    <navbar/>
    <div class="container mt-3">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import navbar from "~/components/layouts/navbar"
export default {
  components: {
    navbar
  },
}
</script>

