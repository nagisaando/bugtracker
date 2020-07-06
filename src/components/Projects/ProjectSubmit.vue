<template>
  <!-- component -->
  <div class="main-content flex-1 bg-gray-100 mt-12 pb-24 md:pb-5 h-full">
    <div
      class="container mx-auto px-4 sm:px-8 mt-10 md:flex md:justify-center mb-6"
    >
      <form class="w-full max-w-lg bg-gray-100" @submit.prevent="checkForm">
        <div class="mb-4">
          <h2 class="text-2xl font-semibold leading-tight">
            Submit New Project
          </h2>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="name"
            >
              Project
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              :class="{ 'border-red-500': isError }"
              name="name"
              v-model="name"
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
        <div>
          <button
            class="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
            @click="createProject"
          >
            Send
          </button>
          <router-link to="/projects">
            <button
              class="bg-green-400 py-2 px-3 rounded text-white hover:bg-green-300 float-right"
            >
              Go Back
            </button>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { required } from 'vuelidate/lib/validators';
export default {
  data: function() {
    return {
      name: '',
      description: '',
      isError: false,
      id: this.$route.params.id,
    };
  },
  methods: {
    checkForm() {
      this.$v.$touch();
      if (this.$v.name.$invalid) {
        this.isError = true;
        console.log(this.isError);
      } else {
        this.isError = false;
      }
    },
    // greeting(){
    //   console.log('hola')
    // },
    async createProject() {
      if (this.name === '') {
        console.log(this.name);
        return;
      }
      try {
        console.log(this.name);
        const post = {
          description: this.description,
          name: this.name,
        };
        console.log(post);
        const project = await axios.post(
          '/projects',
          post,
          { headers: {
              'Authorization' :'Bearer ' + localStorage.getItem('token')
          }}
        );
        console.log(project);
        this.name = '';
        this.description = '';
        await this.$router.push({ path : `/projects` });
      } catch (err) {
        alert(err.message);
        console.log(err.response);
      }
    },
  },
  validations: {
    name: { required },
  },
};
</script>
