<template>
	<div
		class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5 h-full"
	>
		<div class="container mx-auto px-4 sm:px-8 w-3/4">
			<!------------------navigator part----------------------->
			<div class="py-8">
				<div>
					<h2
						class="px-4 text-2xl font-semibold leading-tight text-gray-600"
					>
						Projects
					</h2>
				</div>
				<div class="px-4 my-2 flex sm:flex-row flex-col">
					<div class="flex-1 my-2">
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
								class="appearance-none rounded block pl-8 pr-6 py-2 w-full nm-inset-gray-100 text-sm text-gray-500 focus:nm-inset-gray-200 focus:outline-none"
							/>
						</div>
					</div>
					<div class="flex-1 block relative my-auto text-right">
						<router-link to="/submitProject">
							<button
								class="transition duration-300 ease-in-out nm-flat-orange-200-lg text-gray-700 hover:nm-flat-orange-200-sm font-semibold py-2 px-4 rounded focus:outline-none"
							>
								Create Project
							</button>
						</router-link>
					</div>
				</div>

				<!----------------bottom part  ----------------------------->
				<div class=" py-4 overflow-x-auto">
					<div class="w-full overflow-hidden">
						<ul class="w-full leading-normal">
							<router-link
								v-bind:to="`/projectDetail/${project.id}`"
								v-for="project in projects"
								:key="project.id"
								class="transition duration-300 ease-in-out nm-flat-gray-100 hover:nm-flat-gray-100-lg rounded my-6 mx-4 px-5 py-5 text-md cursor-pointer"
								tag="li"
							>
								<p class="text-gray-700 hiddenTheContetnt">
									{{ project.name }}
								</p>
							</router-link>
						</ul>
					</div>
				</div>
				<router-link
					to="/home"
					tag="button"
					class="mx-4 transition duration-300 ease-in-out text-center nm-flat-gray-200 text-gray-700 hover:nm-flat-gray-200-sm py-2 px-3 rounded focus:outline-none"
				>
					Go Back
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
				alert(
					'something went wrong, please try it again.' + err.message
				);
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
