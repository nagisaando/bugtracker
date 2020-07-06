<template>
  
  <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5 h-full">
      
    <div class="container mx-auto px-4 sm:px-8 ">
        <!------------------navigator part----------------------->
        <div class="py-8">
            <div>
                <h2 class="text-2xl font-semibold leading-tight">Projects</h2>
            </div>
            <div class="my-2 flex sm:flex-row flex-col">
              <div class="flex-1 my-2 flex sm:flex-row flex-col">
                  <div class="flex flex-row mb-1 sm:mb-0">
                      <div class="relative">
                          <select
                              class="h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                              <option>5</option>
                              <option>10</option>
                              <option>20</option>
                          </select> 
                          <div
                              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                          </div>
                      </div>
                      <div class="relative"> 
                           <select
                              class="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                              <option>All</option>
                              <option>Active</option>
                              <option>Inactive</option>
                          </select> 
                         <div
                              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                          </div>
                      </div>
                  </div>
                  <div class="block relative">
                      <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                          <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
                              <path
                                  d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                              </path>
                          </svg>
                      </span>
                      <input placeholder="Search"
                          class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                  </div>
              </div>
              <div class="flex-1 block relative">
                <router-link to="/submitProject">
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded float-right">Create Project</button>
                </router-link>  
              </div>
            </div>
                
            
            <!----------------bottom part  ----------------------------->
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <ul class="min-w-full leading-normal">  
                      <li v-for="project in projects" :key="project.id" class="hover:bg-gray-100 px-5 py-5 border-b border-gray-200 bg-white text-md">
                          <router-link v-bind:to="`/projectDetail/${project.id}`">
                               <p class="text-gray-900 whitespace-no-wrap">{{  project.name  }}</p>
                          </router-link>
                      </li>       
                    </ul>
                    <div
                        class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                        <span class="text-xs xs:text-sm text-gray-900">
                            Showing 1 to 4 of 50 Entries
                        </span>
                        <div class="inline-flex mt-2 xs:mt-0">
                            <button
                                class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                                Prev
                            </button>
                            <button
                                class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <router-link to="/Home">
                <button class="bg-green-400 py-2 px-3 rounded text-white hover:bg-green-300 float-right">Go Back</button>
            </router-link>            
        </div>
    </div>
</div> 

</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            projects: []
        }
    },
    async mounted () {
        try{
            const response = await axios.get(
                '/projects',
                { headers: {
                    'Authorization' :'Bearer ' + localStorage.getItem('token')
                }
                }
            );
            this.projects = response.data;
            console.log(this.projects)
        } catch(err){
            alert(err.msg);
            console.log(err.response);
        }
        
    },
}
</script>
<style scoped>

</style>