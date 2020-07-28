<template>
	<!-- component -->
	<div class="main-content flex-1 bg-gray-100 mt-12 pb-24 md:pb-5 h-full">
		<div
			class="container mx-auto px-4 sm:px-8 mt-10 md:flex md:justify-center mb-6"
		>
			<form
				class="w-full max-w-lg"
				@submit.prevent="checkForm"
			>
				<div class="mb-4">
					<h2 class="text-2xl font-semibold text-gray-600 leading-tight">
						Submit New Project
					</h2>
				</div>
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full px-3">
						<label
							class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2"
							for="name"
						>
							Project
						</label>
						<input
							class="appearance-none block w-full text-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none nm-inset-gray-100 focus:nm-inset-gray-200"
							:class="[{ 'border-red-500': isError }]"
							name="name"
							v-model="name"
						/>
						<p v-if="isError" class="text-red-600 text-xs italic">
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
				<div class="flex justify-between">
					<router-link tag="button" to="/projects" class=" py-2 px-3 rounded text-gray-500 transition duration-300 ease-in-out nm-flat-gray-200 hover:nm-flat-gray-200-sm focus:outline-none">
							Go Back
					</router-link>
					<button
						class="focus:outline-none py-2 px-4 rounded text-gray-700 transition duration-300 ease-in-out nm-flat-green-200 hover:nm-flat-green-200-sm"
						type="submit"
						@click="createProject"
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
				name: '',
				description: '',
				isError: false,
				id: this.$route.params.id,
			};
		},
		methods: {
			checkForm() {
				this.$v.$touch();
				if (this.$v.name.$invalid) {
					this.isError = true;
				} else {
					this.isError = false;
				}
			},
			async createProject() {
				if (this.name === '') {
					return;
				}
				try {
					const post = {
						description: this.description,
						name: this.name,
					};
					await axios.post('/projects', post, {
						headers: {
							Authorization:
								'Bearer ' + localStorage.getItem('token'),
						},
					});
					this.name = '';
					this.description = '';
					await this.$router.push({ path: `/projects` });
				} catch (err) {
					alert('something went wrong, please try it again.' + err.message)
				}
			},
			mounted() {
				this.$store.dispatch('checkLoginStatus');
			}
		},
		validations: {
			name: { required },
		},
	};
</script>
