
<template>  
    <div class="w-full flex justify-center pt-20 transform translate-y-48">
        <div class="absolute">
             <grid-loader></grid-loader>
        </div>    
    </div>
</template>
<script>
import gridLoader from 'vue-spinner/src/GridLoader.vue'
export default({
    data() {
        return {
        }
    },
    components: {
        gridLoader
  }
})
</script>