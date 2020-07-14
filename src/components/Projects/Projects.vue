<template>
	<div
		class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5 h-full"
	>
		<div class="container mx-auto px-4 sm:px-8 w-3/4">
			<!------------------navigator part----------------------->
			<div class="py-8">
				<div>
					<h2 class="text-2xl font-semibold leading-tight">
						Projects
					</h2>
				</div>
				<div class="my-2 flex sm:flex-row flex-col">
					<div class="flex-1 my-2 flex sm:flex-row flex-col">
						<div class="block relative">
							<span
								class="h-full absolute inset-y-0 left-0 flex items-center pl-2"
							>
								<svg
									viewBox="0 0 24 24"
									class="h-4 w-4 fill-current text-gray-500"
								>
									<path
										d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
									></path>
								</svg>
							</span>
							<input
								placeholder="Search"
								class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
							/>
						</div>
					</div>
					<div class="flex-1 block relative">
						<router-link to="/submitProject">
							<button
								class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded float-right"
							>
								Create Project
							</button>
						</router-link>
					</div>
				</div>

				<!----------------bottom part  ----------------------------->
				<div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
					<div
						class="inline-block min-w-full shadow rounded-lg overflow-hidden"
					>
						<ul class="min-w-full leading-normal">
							<li
								v-for="project in projects"
								:key="project.id"
								class="hover:bg-gray-100 px-5 py-5 border-b border-gray-200 bg-white text-md"
							>
								<router-link
									v-bind:to="`/projectDetail/${project.id}`"
								>
									<p class="text-gray-900 hiddenTheContetnt">
										{{ project.name }}
									</p>
								</router-link>
							</li>
						</ul>
					</div>
				</div>
				<router-link to="/home">
					<button
						class="bg-green-400 py-2 px-3 rounded text-white hover:bg-green-300 float-right"
					>
						Go Back
					</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		data() {
			return {
				projects: [],
			};
		},
		async mounted() {
			this.$store.dispatch('checkLoginStatus');
			try {
				const response = await axios.get('/projects', {
					headers: {
						Authorization:
							'Bearer ' + localStorage.getItem('token'),
					},
				});
				this.projects = response.data;
			} catch (err) {
				alert('something went wrong, please try it again.' + err.message)
			}
		},
	};
</script>
<style scoped>
	.hiddenTheContetnt {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		max-width: 40vw;
	}
</style>
