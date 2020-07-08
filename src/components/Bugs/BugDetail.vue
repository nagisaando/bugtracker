<template>
	<div class="container mx-auto px-4 sm:px-8 w-3/4">
		<div class="py-8">
			<div class="my-2 sm:flex-row flex-col">
				<div class="flex-1 ">
					<h2 class="text-2xl font-semibold leading-tight">
						Bug Detail
					</h2>
				</div>
				<div class="flex-1 block relative">
					<div class="inline-flex float-right">
						<router-link
							v-bind:to="`/projectDetail/${id}/BugEdit/${bugId}`"
						>
							<button
								class="w-20 bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-l"
							>
								Edit
							</button>
						</router-link>
						<button
							class="w-20 bg-orange-500 hover:bg-orange-400 text-white font-semibold py-2 px-4 hover:border-transparent rounded-r"
							@click="showModal = true"
						>
							Delete
						</button>
					</div>
				</div>
			</div>

			<div class="mt-20 px-4 sm:px-8 py-4 w-full">
				<div
					class="inline-block w-full shadow rounded-lg overflow-hidden bg-white break-words"
				>
					<div
						class="text-center px-5 py-5 border-b border-gray-200 bg-white text-xl w-full  relative"
					>
						<span
							class="absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
							>Bugs</span
						>
						{{ bug.title }}
					</div>
					<div
						class="text-center px-5 py-8 border-b border-gray-200 bg-white text-sm w-full relative"
					>
						<span
							class=" absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
							>Description</span
						>
						{{ bug.description }}
					</div>

					<div
						class="text-center  px-5 py-5 border-b border-gray-200 bg-white text-sm w-full relative"
					>
						<span
							class=" absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
							>Status</span
						>
						<span
							class="rounded py-1 px-3 text-xs font-bold"
							:class="
								bug.status === 1 ? 'bg-red-400' : 'bg-green-400'
							"
						>
							{{ bug.status === 1 ? 'pending' : 'finished' }}
						</span>
					</div>
				</div>
			</div>
			<router-link to="/projects">
				<button
					class="bg-green-400 py-2 px-3 rounded text-white hover:bg-green-300 float-right"
				>
					Go Back
				</button>
			</router-link>
		</div>
		<transition name="fade" appear>
			<div class="modal-overlay container w-full" v-if="showModal">
				<div
					class="info-card mx-auto md:-translate-x-20 translate-y-10 max-w-sm rounded-lg overflow-hidden shadow-lg bg-white"
				>
					<div class="flex flex-col min-h-full">
						<div class="px-6 py-4 border-b">
							<div class="text-xl text-center">
								Delete Bug Item
							</div>
						</div>
						<div class="px-6 py-10 flex-grow">
							<p
								class="text-gray-700 text-base"
								v-if="!hasDeleted"
							>
								Do you want to delete: {{ bug.title }}? This
								action can not be undone.
							</p>
							<p
								class="text-gray-700 text-base"
								v-if="hasDeleted"
							>
								{{ bug.title }} has been sucessfully deleted ☑️
							</p>
						</div>
						<div
							class="px-5 py-3 border-t bg-gray-100 flex justify-end"
						>
							<button
								class="text-gray-600 font-medium text-sm py-1 px-5 rounded mr-3 hover:text-gray-400"
								v-if="!hasDeleted"
								@click="showModal = false"
							>
								Cancel
							</button>
							<button
								class="text-red-600 font-medium text-sm py-1 px-5 rounded hover:text-red-400"
								v-if="!hasDeleted"
								@click="deleteBugs"
							>
								Delete
							</button>
							<router-link v-bind:to="`/projectDetail/${id}`">
								<button
									class="bg-green-400 py-2 px-3 rounded text-white hover:bg-green-300"
									v-if="hasDeleted"
								>
									Go Back
								</button>
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				bug: {},
				id: this.$route.params.id,
				bugId: this.$route.params.bugId,
				showModal: false,
				hasDeleted: false,
			};
		},
		methods: {
			async deleteBugs() {
				try {
					const response = await axios.delete(
						`/projects/${this.id}/bugs/${this.bugId}`,
						{
							headers: {
								Authorization:
									'Bearer ' + localStorage.getItem('token'),
							},
						}
					);
					console.log(response.data);
					this.hasDeleted = true;
				} catch (err) {
					console.log(err.message);
					console.log(err.response);
				}
			},
		},
		async mounted() {
			this.$store.dispatch('checkLoginStatus');
			try {
				const response = await axios.get(
					`/projects/${this.id}/bugs/${this.bugId}`,
					{
						headers: {
							Authorization:
								'Bearer ' + localStorage.getItem('token'),
						},
					}
				);
				console.log(response.data);
				this.bug = response.data;
			} catch (err) {
				console.log(err.message);
				console.log(err.response);
			}
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
		width: auto;
		top: 0;
		right: 0;
		align-content: center;
		background-color: rgba(228, 233, 237, 0.8);
	}
	.info-card {
		position: absolute;
		top: 30%;
		right: 10vw;
		left: 10vw;
	}
</style>
