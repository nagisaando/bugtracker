<template>
	<div class="main-content flex-1 bg-gray-100 pb-24 md:pb-5">
		<Loading v-if="loading"></Loading>
		<div v-else>
			<div
				class="mx-auto md:mx-0 my-6 md:ml-12 md:w-2/5 w-4/5 text-xl text-gray-500"
			>
				<h3 class="font-bold">Summary</h3>
			</div>
			<div class="flex flex-wrap md:justify-between justify-center">
				<div class="md:w-2/5 w-4/5 md:ml-12 md:my-0 my-6">
					<!--Metric Card-->
					<div
						class="transition duration-300 ease-in-out nm-flat-gray-100 hover:nm-flat-gray-100-lg rounded-lg p-5"
					>
						<div class="flex flex-row items-center">
							<div class="flex-1 text-right md:text-center">
								<h5 class="font-bold uppercase text-gray-600">
									Total Projects
								</h5>
								<h3 class="font-bold text-3xl">
									{{ totalProjects }}
								</h3>
							</div>
						</div>
					</div>
					<!--/Metric Card-->
				</div>
				<div class="md:w-2/5 w-4/5 md:mr-12 md:my-0 my-6">
					<!--Metric Card-->
					<div
						class="transition duration-300 ease-in-out nm-flat-gray-100 hover:nm-flat-gray-100-lg rounded-lg p-5"
					>
						<div class="flex flex-row items-center">
							<div class="flex-1 text-right md:text-center">
								<h5 class="font-bold uppercase text-gray-600">
									Total Bugs
								</h5>
								<h3 class="font-bold text-3xl">
									{{ totalBugs }}
								</h3>
							</div>
						</div>
					</div>
					<!--/Metric Card-->
				</div>
			</div>
		</div>
			<!--------------------------------- v-modal for delete ------------------------------->
		<!-- <transition name="fade" appear>
			<div class="modal-overlay container w-full" v-if="showModal">
				<div
					class="info-card mx-auto md:-translate-x-20 translate-y-10 max-w-sm rounded-lg overflow-hidden shadow-lg bg-white"
				>
					<div class="flex flex-col min-h-full">
						<div class="px-6 py-4 border-b">
							<div class="text-xl text-center">
								Do you want to leave this page?
							</div>
						</div>
						<div class="px-6 py-10 flex-grow text-center">
							<p
								class="text-gray-700 text-base"
								v-if="!hasDeleted"
							>
								the data will not be saved
							</p>
						</div>
						<div
							class="px-5 py-3 border-t bg-gray-100 flex justify-end"
						>
							<button
								class="text-gray-600 font-medium text-sm py-1 px-5 rounded mr-3 hover:text-gray-400 focus:outline-none"
								v-if="!hasDeleted"
								@click="showModal = false"
							>
								Cancel
							</button>
							<button
								class="text-red-600 font-medium text-sm py-1 px-5 rounded hover:text-red-300 focus:outline-none"
								v-if="!hasDeleted"
								@click="deleteBugs"
							>
								Go Back
							</button>
						</div>
					</div>
				</div>
			</div>
		</transition> -->
	</div>
</template>

<script>
	import Loading from '../components/Loading/Loading.vue';
	import store from '../store/store';
	// import axios from 'axios';
	export default {
		name: 'Home',
		data() {
			return {
				showModal: false,
			};
		},
		beforeRouteEnter(to, from, next) {
			if (to.name === '/' || to.name === 'signUp') {
				next();
			} else {
				store.dispatch('fetchCount');
				next();
			}
			// if(from.name === '/' || from.name === 'signUp') {
			// 	this.showModal = true
			// 	next
			// }
		},
		mounted() {
			this.$store.dispatch('checkLoginStatus');
			this.$store.dispatch('topPageshowSpinner', false);
		},
		computed: {
			loading() {
				return this.$store.getters.checkLoading;
			},
			totalProjects() {
				return this.$store.getters.getProjects;
			},
			totalBugs() {
				return this.$store.getters.getBugs;
			},
		},
		components: {
			Loading,
		},
	};
</script>

<style scoped>
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