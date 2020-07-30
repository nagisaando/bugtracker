<template>
	<div
		class="main-content h-full flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5"
	>
		<div class="container mx-auto px-4 sm:px-8">
			<!----------------top navigator part  ---------------------------------->
			<div class="pt-16">
				<!-- <div class="flex"> -->
					<div class="break-words w-1/2 mb-10">
						<h2
							class="break-words inline w-full text-2xl font-semibold leading-tight text-gray-600"
						>
							{{ project.name }}
						</h2>
						<router-link
								tag="i"
								v-bind:to="`/projectDetail/${id}/projectEdit`"
								class="fas fa-pen text-gray-700 hover:text-gray-400 font-semibold rounded cursor-pointer"
							>
						</router-link>
						<h1 class="italic text-gray-500 text-sm">
							{{ project.description }}
						</h1>
					</div>
						<div class="flex justify-between sm:mb-0">
							<div>
							<div class="relative inline-block">
								<select
									class="appearance-none h-full rounded-l rounded-r-none block w-full py-2 px-4 pr-8 leading-tight nm-flat-gray-100 text-sm text-gray-500 focus:outline-none"
									v-model="selectedCategory"
								>
									<option>All</option>
									<option>Pending</option>
									<option>Finished</option>
								</select>
								<div
									class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
								>
									<svg
										class="fill-current h-4 w-4"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path
											d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
										/>
									</svg>
								</div>
							</div>
							
							<div class="inline-block relative">
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
									placeholder="Search title.."
									class="appearance-none rounded-r rounded-l sm:rounded-l-none block pl-8 pr-6 py-2 w-full text-sm placeholder-gray-400 nm-inset-gray-100 text-gray-500 focus:nm-inset-gray-200 focus:outline-none"
									v-model="search"
								/>
							</div>
							</div>
							<router-link
								v-bind:to="
									`/projectDetail/${project.id}/submitBug`
								"
								class="transition duration-300 ease-in-out nm-flat-gray-100 hover:nm-flat-gray-100-sm text-gray-600 font-semibold py-2 px-4 rounded focus:outline-none"
								tag="button"
							>
								Add Bugs
							</router-link>
						</div>
					<!-- </div> -->
				<!-- </div> -->
			</div>

			<!-------------project table  -------------------------------------->
			<div class="-mx-4 md:-mx-8 px-4 md:px-8 py-4">
				<div
					class="w-full nm-flat-gray-100 rounded-lg overflow-hidden"
				>
					<table class="w-full leading-normal">
						<thead>
							<tr v-if="showBugList">
								<th
									class="w-2/6 px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
								>
									Bugs
								</th>
								<th
									class="w-2/6 px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
								>
									Description
								</th>
								<th
									class="w-1/6 px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
								>
									Status
								</th>
								<th
									class="w-1/6 px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
								></th>
							</tr>
						</thead>
						<tbody v-if="!showBugList">
							<td class="text-center py-5 text-gray-700">
								There is no bug list in this project
							</td>
						</tbody>
						<tbody v-if="showBugList">
							<!-- <div v-if="!showBugList" class="text-gray-700 px-12 py-5 w-full">There is no bug in this project.</div> -->
							<tr v-for="bug in filteredBugs" :key="bug.title">

								<!-- <tr v-for="bug in bugs" :key="bug.title" > -->
								<!-- <td v-if="!showBugList">
									There is no bug in this project
								</td> -->
								<td
									class="px-5 py-5 border-b border-gray-200 bg-gray-100 text-gray-700 hiddenTheContetnt"
								>
									{{ bug.title }}
								</td>
								<td
									class="px-5 py-5 border-b border-gray-200 bg-gray-100 text-gray-700 hiddenTheContetnt"
								>
									{{ bug.description === "" ? '     ': bug.description}}
								</td>
								<td
									class="px-5 py-5 border-b border-gray-200 bg-gray-100 text-sm"
								>
									<p
										class="rounded py-1 px-3 text-xs font-bold text-gray-600 text-center whitespace-no-wrap w-auto cursor-default"
										:class="
											bug.status === 1
												? 'nm-flat-orange-200'
												: 'nm-flat-green-200'
										"
									>
										{{
											bug.status === 1
												? 'pending'
												: 'finished'
										}}
									</p>
								</td>
								<td
									class="px-5 py-5 border-b border-gray-200 bg-gray-100 text-xs"
								>
									<router-link
										v-bind:to="
											`/projectDetail/${id}/bugDetail/${bug.id}`
										"
									>
										<button
											class="transition duration-200 ease-in-out nm-flat-gray-100 text-gray-600 font-semibold hover:nm-flat-gray-100-sm py-2 px-4 rounded focus:outline-none"
										>
											Detail
										</button>
									</router-link>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<!------------------ go back button -------------------------->
				<router-link to="/projects">
					<button
						class="transition duration-300 ease-in-out nm-flat-gray-200  py-2 px-3 rounded text-gray-600 hover:nm-flat-gray-200-sm my-4 focus:outline-none"
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
				id: this.$route.params.id,
				project: {},
				bugs: [],
				showBugList: '',
				// showModal: false,
				// hasDeleted: false,
				selectedCategory: 'All',
				search: ''
			};
		},
		methods: {
			async projectDetail() {
				try {
					const response = await axios.get(`/projects/${this.id}`, {
						headers: {
							Authorization:
								'Bearer ' + localStorage.getItem('token'),
						},
					});
					this.project = response.data;
				} catch (err) {
					alert(
						'something went wrong, please try it again.' +
							err.message
					);
				}
			},
			async bugList() {
				try {
					const response = await axios.get(
						`/projects/${this.id}/bugs`,
						{
							headers: {
								Authorization:
									'Bearer ' + localStorage.getItem('token'),
							},
						}
					);
					this.bugs = response.data;
					console.log(this.bugs)
					if(this.bugs.length === 0) {
						this.showBugList = false
					} else {
						this.showBugList = true
					}
				} catch (err) {
					alert(
						'something went wrong, please try it again.' +
							err.message
					);
				}
			},
			checkStatus() {
				if (this.bugs.status === 0) {
					return { 'bg-red-400': true };
				} else if (this.bugs.status === 1) {
					return { 'bg-green-400': true };
				} else {
					return;
				}
			},
		},
		computed: {
			filteredBugs: function() {
				var category = this.selectedCategory;
				let vm = this
				if (category === 'All') {
					return this.bugs.filter(bug => {
						return bug.title.toLowerCase().includes(vm.search.toLowerCase())
					})
				} else if (category === 'Pending') {
					return this.bugs.filter(function(bugs) {
						return (bugs.status === 1) && bugs.title.toLowerCase().includes(vm.search.toLowerCase())
					});
				} else {
					return this.bugs.filter(function(bugs) {
						return (bugs.status === 0) &&  bugs.title.toLowerCase().includes(vm.search.toLowerCase())
					});
				}
			},
			filteredTitle(){
				return this.bugs.filter(bug => {
					return bug.title.toLowerCase().includes(this.search.toLowerCase())
				})
			}
		},
		mounted() {
			this.$store.dispatch('checkLoginStatus');
			this.projectDetail();
			this.bugList();
		},
	};
</script>

<style scoped>
	/* @media only screen and (max-width: 768px) { */
		/* For mobile phones: */
		.hiddenTheContetnt {
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			max-width: 20px;
		}
	/* } */


</style>
