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
				<div class="mb-4 flex justify-between w-full">
					<h2
						class="text-2xl break-words w-1/2 font-semibold leading-tight inline-block"
					>
						Edit {{ bug.title }}
					</h2>
					<button
						class="transition duration-300 ease-in-out nm-flat-orange-200 hover:nm-flat-orange-200-sm w-20 h-10 text-gray-700 py-2 px-4 hover:border-transparent rounded focus:outline-none"
						@click="showModal = true"
					>
						Delete
					</button>
				</div>

				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full px-3">
						<label
							class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2"
							for="title"
						>
							Bug
						</label>
						<input
							class="appearance-none block w-full text-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none nm-inset-gray-100 focus:nm-inset-gray-200"
							:class="{ 'border-red-500': isError }"
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
							class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2"
							for="description"
						>
							Description
						</label>
						<textarea
							class="no-resize appearance-none block w-full text-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none nm-inset-gray-100 focus:nm-inset-gray-200 h-48 resize-none"
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
						<select
							v-model="checkStatus"
							class="appearance-none block w-full text-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none nm-inset-gray-100 focus:nm-inset-gray-200"
							name="status"
						>
							<option disabled value="">Please select one</option>
							<option>Pending</option>
							<option>Finished</option>
						</select>
					</div>
				</div>
				<div class="flex justify-between">
					<router-link
						tag="button"
						v-bind:to="`/projectDetail/${id}/bugDetail/${bugId}`"
						class="py-2 px-3 rounded text-gray-700 transition duration-300 ease-in-out nm-flat-gray-200 hover:nm-flat-gray-200-sm focus:outline-none"
					>
						Go Back
					</router-link>
					<button
						class="focus:outline-none py-2 px-4 rounded text-gray-700 transition duration-300 ease-in-out nm-flat-green-200 hover:nm-flat-green-200-sm"
						type="submit"
						@click="editBug"
					>
						Edit
					</button>
				</div>
			</form>
		</div>
		<!--------------------------------- v-modal for delete ------------------------------->
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
						<div class="px-6 py-10 flex-grow text-center">
							<p
								class="text-gray-700 text-base"
								v-if="!hasDeleted"
							>
								Do you want to delete:
								<span class="font-bold">
									{{ bug.title }}
								</span>
								?
								<br />
								This action can not be undone.
							</p>
							<p
								class="text-gray-700 text-base"
								v-if="hasDeleted"
							>
								<span class="font-bold">
									{{ bug.title }}
								</span>
								has been sucessfully deleted ☑️
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
								Delete
							</button>
							<router-link v-bind:to="`/projectDetail/${id}`">
								<button
									class="text-gray-700 transition duration-300 ease-in-out nm-flat-green-200 hover:nm-flat-green-200-sm focus:outline-none py-2 px-3 rounded"
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
	import { required } from 'vuelidate/lib/validators';
	export default {
		data: function() {
			return {
				title: '',
				description: '',
				checkStatus: '',
				isError: false,
				id: this.$route.params.id,
				bugId: this.$route.params.bugId,
				bug: {},
				showModal: false,
				hasDeleted: false,
			};
		},
		methods: {
			checkForm() {
				this.$v.$touch();
				if (this.$v.title.$invalid) {
					this.isError = true;
				} else {
					this.isError = false;
				}
			},
			async editBug() {
				if (this.title === '') {
					return;
				}
				try {
					let bugStatus;
					if (this.checkStatus === 'Pending') {
						bugStatus = 1;
					} else {
						bugStatus = 0;
					}
					const data = {
						status: bugStatus,
						description: this.description,
						title: this.title,
					};
					await axios.put(
						`/projects/${this.id}/bugs/${this.bugId}`,
						data,
						{
							headers: {
								Authorization:
									'Bearer ' + localStorage.getItem('token'),
							},
						}
					);
					this.title = '';
					this.description = '';
					await this.$router.push({
						path: `/projectDetail/${this.id}/bugDetail/${this.bugId}`,
					});
				} catch (err) {
					alert(
						'something went wrong, please try it again.' +
							err.message
					);
				}
			},
			async deleteBugs() {
				try {
					await axios.delete(
						`/projects/${this.id}/bugs/${this.bugId}`,
						{
							headers: {
								Authorization:
									'Bearer ' + localStorage.getItem('token'),
							},
						}
					);
					this.hasDeleted = true;
				} catch (err) {
					alert(
						'Something went wrong! Please try it again.' +
							err.message
					);
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
				this.bug = response.data;
				this.title = this.bug.title;
				this.description = this.bug.description;
				if (this.bug.status === 0) {
					this.checkStatus = 'Finished';
				} else {
					this.checkStatus = 'Pending';
				}
			} catch (err) {
				alert(
					'something went wrong, please try it again.' + err.message
				);
			}
		},
		validations: {
			title: { required },
			status: { required },
		},
	};
</script>

<style scoped>
	select {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none; /* Remove default arrow */
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
