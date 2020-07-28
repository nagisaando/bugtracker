<template>
	<div class="main-content flex-1 bg-gray-100 mt-12 pb-24 md:pb-5">
		<div
			class="container mx-auto px-4 sm:px-8 mt-10 md:flex md:justify-center mb-6"
		>
			<form
				class="w-full max-w-lg bg-gray-100"
				@submit.prevent="checkForm"
			>
				<div class="mb-4">
					<h2
						class="text-2xl text-gray-600 font-semibold leading-tight"
					>
						Add New Bugs
					</h2>
				</div>
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full px-3">
						<label
							class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2"
							for="title"
						>
							Bugs
						</label>
						<input
							class="appearance-none block w-full text-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none nm-inset-gray-100 focus:nm-inset-gray-200"
							:class="{ 'border-red-500': isError }"
							name="title"
							v-model="title"
						/>
						<p v-if="isError" class="text-red-600 text-xs italic">
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
							class="appearance-none block w-full text-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none nm-inset-gray-100 focus:nm-inset-gray-200 h-48 resize-none"
							name="description"
							v-model="description"
						></textarea>
					</div>
				</div>
				<div class="flex justify-between">
					<router-link
						tag="button"
						v-bind:to="`/projectDetail/${id}`"
						class="py-2 px-3 rounded text-gray-700 transition duration-300 ease-in-out nm-flat-gray-200 hover:nm-flat-gray-200-sm focus:outline-none"
					>
						Go Back
					</router-link>
					<button
						class="focus:outline-none py-2 px-4 rounded text-gray-700 transition duration-300 ease-in-out nm-flat-green-200 hover:nm-flat-green-200-sm"
						type="submit"
						@click="addBug"
					>
						Send
					</button>
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
				title: '',
				description: '',
				isError: false,
				id: this.$route.params.id,
				showModel: false,
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
			async addBug() {
				if (this.title === '') {
					return;
				}
				try {
					const post = {
						description: this.description,
						title: this.title,
					};
					await axios.post(`/projects/${this.id}/bugs`, post, {
						headers: {
							Authorization:
								'Bearer ' + localStorage.getItem('token'),
						},
					});
					this.title = '';
					this.description = '';
					await this.$router.push({
						path: `/projectDetail/${this.id}`,
					});
				} catch (err) {
					alert(
						'something went wrong, please try it again.' +
							err.message
					);
				}
			},
			mounted() {
				this.$store.dispatch('checkLoginStatus');
			},
		},
		validations: {
			title: { required },
		},
	};
</script>
