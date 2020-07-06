<template>
  <!-- component -->
  <div class="main-content flex-1 bg-gray-100 mt-12 pb-24 md:pb-5">
    
    <div
      class="container mx-auto px-4 sm:px-8 mt-10 md:flex md:justify-center mb-6"
    >
      <form 
        class="w-full max-w-lg bg-gray-100" 
        @submit.prevent="checkForm"
      >
        <div class="mb-4">
                <h2 class="text-2xl font-semibold leading-tight">Edit {{  bug.title  }}</h2>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="title"
            >
              Bug
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              :class="{'border-red-500': isError}"
              name="title"
              v-model="title"
            />
            <p v-if="isError" class="text-gray-600 text-xs italic">
              this field is required
            </p>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="description"
            >
                Description
            </label>
            <textarea
              class="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
              name="description"
              v-model="description"
            ></textarea>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="status"
            >
              status
            </label>
            <select v-model="checkStatus"
                    class="block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="status"
                >
                <option disabled value="">Please select one</option>
                <option>Pending</option>
                <option>Finished</option>
            </select>
            <select v-model="country"
                    class="block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="status">
          <!-- as recommended by Vue -->
                <option disabled value="">Please select one</option>
                <option>US</option>
                <option>UK</option>
                <option>EU</option>
            </select>
          </div>
        </div>
        <div>
            <button
              class="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
              @click="editProject"
            >
              Edit
            </button>
            <router-link to='/projects'>
              <button class="bg-green-400 py-2 px-3 rounded text-white hover:bg-green-300 float-right">Go Back</button>
            </router-link>
        </div>
      </form>
  
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import { required } from 'vuelidate/lib/validators'
export default {
    data: function(){
        return {
            title: '',
            description: '',
            checkStatus: '',
            isError: false,
            id: this.$route.params.id,
            bugId: this.$route.params.bugId,
            bug: {},
            country: 'UK'
        }
    },
    methods: {
        checkForm(){
          this.$v.$touch()
          if(this.$v.title.$invalid){
            this.isError = true;
            console.log(this.isError)
          } else {
            this.isError = false;
          }

        },
        async editProject(){
          if(this.title === ''){
            console.log(this.title)
            return;
          }
          try {
            let bugStatus;
            if(this.checkStatus === 'Pending') {
              bugStatus = 1;
            } else {
              bugStatus = 0;
            }
            console.log('bugStatus: ' + bugStatus)
            console.log(this.title)
            const data = {
              status: bugStatus,
              description: this.description,
              title: this.title,
              
              
            }

            console.log(data.status)
            const project = await axios.put(
              `/projects/${this.id}/bugs/${this.bugId}`,
               data,
               { headers: {
                  'Authorization' :'Bearer ' + localStorage.getItem('token')
              }}
            )
            console.log(project)
            this.title = '';
            this.description = '';
            await this.$router.push({ path : `/projectDetail/${this.id}/bugDetail/${this.bugId}` });
          } catch(err) {
            alert(err.message);
            console.log(err.response);
          }
        }
    },
    async mounted() {
        try {
            const response = await axios.get(
                `/projects/${this.id}/bugs/${this.bugId}`,
                { headers: {
                    'Authorization' :'Bearer ' + localStorage.getItem('token')
                }}
            );
            console.log(response.data);
            this.bug = response.data;
            this.title = this.bug.title;
            console.log(this.bug.title, this.bug.description)
            this.description = this.bug.description;
            if(this.bug.status === 0){
              this.checkStatus = 'Finished'
            } else {
              this.checkStatus = 'Pending'
            }
            console.log(this.checkStatus)
        } catch (err) {
            console.log(err.message)
            console.log(err.response)
        }
    },
    validations: {
      title: { required },
      status: { required }
    }
}
</script>