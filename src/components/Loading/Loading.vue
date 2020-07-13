<template>  
    <div class="w-full flex justify-center pt-20 transform translate-y-48">
        <div class="absolute">
             <pulse-loader></pulse-loader>
        </div>    
    </div>
</template>
<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
 
export default({
    data() {
        return {
        }
    },
    components: {
        PulseLoader
  }
})
</script>