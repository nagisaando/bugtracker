<template>
	<div class="main-content flex-1 bg-gray-100 pb-24 md:pb-5">
		<Loading v-if="loading"></Loading>
		<div v-else>
		<div class="bg-blue-800 p-2 shadow text-xl text-white">
			<h3 class="font-bold pl-2">Summary</h3>
		</div>

		<div class="flex flex-wrap">
			<div class="w-full">
				<!--Metric Card-->
				<div
					class="bg-green-100 border-b-4 border-green-600 rounded-lg shadow-lg p-5"
				>
					<div class="flex flex-row items-center">
						<div class="flex-shrink pr-4">
							<div class="rounded-full p-5 bg-green-600">
								<i class="fa fa-wallet fa-2x fa-inverse"></i>
							</div>
						</div>
						<div class="flex-1 text-right md:text-center">
							<h5 class="font-bold uppercase text-gray-600">
								Total Projects
							</h5>
							<h3 class="font-bold text-3xl">
								{{ totalProjects
								}}<span class="text-green-500"
									><i class="fas fa-caret-up"></i
								></span>
							</h3>
						</div>
					</div>
				</div>
				<!--/Metric Card-->
			</div>
			<div class="w-full">
				<!--Metric Card-->
				<div
					class="bg-orange-100 border-b-4 border-orange-500 rounded-lg shadow-lg p-5"
				>
					<div class="flex flex-row items-center">
						<div class="flex-shrink pr-4">
							<div class="rounded-full p-5 bg-orange-600">
								<i class="fas fa-users fa-2x fa-inverse"></i>
							</div>
						</div>
						<div class="flex-1 text-right md:text-center">
							<h5 class="font-bold uppercase text-gray-600">
								Total Bugs
							</h5>
							<h3 class="font-bold text-3xl">
								{{ totalBugs
								}}<span class="text-orange-500"
									><i class="fas fa-exchange-alt"></i
								></span>
							</h3>
						</div>
					</div>
				</div>
				<!--/Metric Card-->
			</div>
		</div>
		</div>
	</div>
</template>

<script>
	import Loading from '../components/Loading/Loading.vue'
	import axios from 'axios';
	export default {
		name: 'Home',
		data() {
			return {
				totalProjects: 0,
				totalBugs: 0,

			};
		},
		methods: {
			async showTotal() {
				this.$store.dispatch('checkLoginStatus');
				const vm = this
				try {
					axios.all([
						axios.get('/projects', {
							headers: {
								Authorization: 'Bearer ' + localStorage.getItem('token'),
							},
						}),
						axios.get('/projects/bugs', {
							headers: {
								Authorization: 'Bearer ' + localStorage.getItem('token'),
							},
						})
					])
					.then(responseArr => {
						if (responseArr[0].data.length === 0) {
							this.totalProjects = 0;
						} else {
						this.totalProjects = responseArr[0].data.length;
						}	
						if (responseArr[1].data === undefined) {
							this.totalBugs = 0;
						} else {
							this.totalBugs = responseArr[1].data.bug_count;
						}
						
						console.log('yes')
						setTimeout(()=> {
							vm.$store.dispatch('showSpinner', false)
						}, 2000)
					})
				} catch (err) {
					alert('something went wrong, please try it again.' + err.message)
				} 
				
			},
		},
		mounted() {
			this.showTotal();
		},
		computed: {
			loading() {
				return this.$store.getters.checkLoading
			}
		},
		components: {
			Loading
		},

	};
</script>
