<template>

    <div class="main-content h-full flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
        <div class="container mx-auto px-4 sm:px-8">
            <!----------------top navigator part  ---------------------------------->
            <div class="py-16">
                <div class="flex">
                    <div class="flex-1 w-8 break-words">
                        <h2 class="text-2xl font-semibold leading-tight">{{  project.name  }}</h2>
                        <h1 class="italic text-gray-500 text-sm">{{  project.description  }}</h1>
                    </div>
                <!---------------------- Delete and Edit part----------------------------- -->
                    <div class="flex-1">
                        <div class="inline-flex float-right">
                            <router-link v-bind:to="`/projectDetail/${id}/projectEdit`">
                                <button class="w-20 bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-l">
                                    Edit
                                </button>
                            </router-link>
                            <button class="w-20 bg-orange-500 hover:bg-orange-400 text-white font-semibold py-2 px-4 hover:border-transparent rounded-r" @click="showModal = true">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                <div class="my-2 flex sm:flex-row flex-col">
                    <div class="flex-1 my-2 flex sm:flex-row flex-col">
                        <div class="flex flex-row mb-1 sm:mb-0">
                            <div class="relative">
                                <select
                                    class="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
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
                                class="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                                v-model="selectedCategory" >
                                <option>All</option>
                                <option>Pending</option>
                                <option>Finished</option>
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
                        <router-link v-bind:to="`/projectDetail/${project.id}/submitBug`">
                            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded float-right">Add Bugs</button>
                        </router-link>  
                </div>
            </div>
                
            <!-------------project table  -------------------------------------->
            <div class="-mx-4 md:-mx-8 px-4 md:px-8 py-4">
                <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table class="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Bugs
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Description
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th 
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    
                                </th> 
                            </tr>
                        </thead>
                        <tbody>    
                            <tr v-for="bug in filteredBugs" :key="bug.title" >
                            <!-- <tr v-for="bug in bugs" :key="bug.title" > -->
                                <td class="px-5 py-5 border-b border-gray-200 bg-white hiddenTheContetnt">
                                    {{  bug.title  }}
                                </td>
                                
                                <td class="px-5 py-5 border-b border-gray-200 bg-white hiddenTheContetnt">
                                    {{  bug.description  }}
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p class="rounded py-1 px-3 text-xs font-bold text-gray-900 text-center whitespace-no-wrap" 
                                        :class="bug.status === 1 ? 'bg-red-400' : 'bg-green-400'">
                                        {{  bug.status === 1 ? 'pending' : 'finished'  }}
                                    </p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                                    <router-link v-bind:to="`/projectDetail/${id}/bugDetail/${bug.id}`">
                                        <button class="bg-transparent hover:bg-gray-500 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded">Detail</button>
                                    </router-link> 
                                </td>   
                            </tr>   
                        </tbody>
                    </table>
                    <!-----------------------bottom part------------------- -->
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
                <!--------------------------------- v-modal for delete ------------------------------->
                <transition name="fade" appear>
                    <div class="modal-overlay" v-if="showModal">
                        <div class="info-card mx-auto md:-translate-x-20 translate-y-10 max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
                            <div class="flex flex-col min-h-full">
                                <div class="px-6 py-4 border-b">
                                    <div class="text-xl text-center">Delete This Project</div>
                                </div>
                                <div class="px-6 py-10 flex-grow">
                                    <p class="text-gray-700 text-base" v-if="!hasDeleted">
                                        Do you want to delete {{  project.name  }}?
                                        <br>
                                        This action can not be undone.
                                    </p>
                                    <p class="text-gray-700 text-base" v-if="hasDeleted">
                                        {{  project.name  }} has been sucessfully deleted☑️
                                    </p>
                                </div>
                                <div class="px-5 py-3 border-t bg-gray-100 flex justify-end">
                                    <button class="text-gray-600 font-medium text-sm py-1 px-5 rounded mr-3 hover:text-gray-400" v-if="!hasDeleted" @click="showModal = false">Cancel</button>
                                    <button class="text-red-600 font-medium text-sm py-1 px-5 rounded hover:text-red-400" v-if="!hasDeleted" @click="deleteProject">Delete</button>
                                    <router-link to='/projects'>
                                        <button class="bg-green-400 py-2 px-3 rounded text-white hover:bg-green-300" v-if="hasDeleted">Go Back</button>
                                    </router-link>
                                </div>
                            </div>            
                        </div>
                    </div>
                </transition>
                <!------------------ go back button -------------------------->
                <router-link to="/projects">
                    <button class="bg-green-400 py-2 px-3 rounded text-white hover:bg-green-300 float-right my-4">Go Back</button>
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            id: this.$route.params.id,
            project: {},
            bugs: [],
            showModal: false,
            hasDeleted: false,
            selectedCategory: 'All'
        }
    },
    methods: {
        async projectDetail() {
    
            try {
                const response = await axios.get(
                    `/projects/${this.id}`,
                    { headers: {
                        'Authorization' :'Bearer ' + localStorage.getItem('token')
                    }}
                );
                this.project = response.data;
            } catch (err) {
                console.log(err.message)
                console.log(err.response)
            }

        },
        async bugList() {
            try {
                const response = await axios.get(
                `/projects/${this.id}/bugs`,
                { headers: {
                    'Authorization' :'Bearer ' + localStorage.getItem('token')
                }}
                ); 
                this.bugs = response.data;
            } catch(err) {
                console.log(err.message);
                console.log(err.response);
            }
        },
        async deleteProject() {
            try {
                await axios.delete(
                    `/projects/${this.id}`,
                    { headers: {
                        'Authorization' :'Bearer ' + localStorage.getItem('token')
                        }
                    }
                )
                this.hasDeleted = true;
            } catch(err) {
                console.log(err.message);
                console.log(err.response);
            }
        },
        checkStatus() {
            if(this.bugs.status === 0) {
                return {"bg-red-400" : true};
            } else if(this.bugs.status === 1) {
                return {"bg-green-400" : true};
            } else {
                return;
            }
        }
    },
    computed: {
		filteredBugs: function() {
			var category = this.selectedCategory;
			
			if(category === "All") {
                console.log(this.bugs)
				return this.bugs;
			} else if (category === "Pending"){
				return this.bugs.filter(function(bugs) {
					return bugs.status === 1;
				});
			} else {
				return this.bugs.filter(function(bugs) {
					return bugs.status === 0;
				});
			}
		}
	},
    mounted() {
        this.projectDetail();
        this.bugList();
    }

}
</script>


<style scoped>

    @media only screen and (max-width: 768px) {
    /* For mobile phones: */
        .hiddenTheContetnt {
            white-space: nowrap; 
            text-overflow:ellipsis;
            overflow: hidden;
            max-width:1px;
        }
    }


    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
        -webkit-transition: opacity 0.5s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    .modal-overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        align-content: center;
        background-color: rgba(228, 233, 237, 0.8);
        /* display: flex;
        justify-content: center; */
        /* overflow-y: hidden; */
    }

    .info-card {
        position: absolute;
        top: 30%; 
        right: 10vw;
        left: 10vw;

    }

</style>