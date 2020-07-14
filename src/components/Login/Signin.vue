<template>
	<div class="flex justify-center my-2 mx-4 md:mx-0 lg:pt-20 pt-10">
		<form class="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
			<div class="text-center">
				<h2 class="text-4xl tracking-tight">
					Sign In
				</h2>
			</div>
			<div class="flex flex-wrap -mx-3 mb-6">
				<div class="w-full md:w-full px-3 mb-6">
					<label
						class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						for="username"
						>Username</label
					>
					<input
						class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
						type="text"
						required
						v-model="username"
						:class="{ 'border-red-500': usernameError }"
					/>
					<p class="text-red-500 text-sm" v-if="usernameError">
						Username is required
					</p>
				</div>
				<div class="w-full md:w-full px-3 mb-6">
					<label
						class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						for="Password"
						>Password</label
					>
					<input
						class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
						type="password"
						required
						v-model="password"
						:class="{ 'border-red-500': passwordError }"
					/>
					<p class="text-red-500 text-sm" v-if="passwordError">
						Password is required
					</p>
				</div>
				<div class="w-full md:w-full px-3">
					<button
						class="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500"
						type="submit"
						@click.prevent="onSubmit"
					>
						Sign in
					</button>
				</div>
			</div>
			<router-link to="/signUp">
				<div
					class="text-gray-500 hover:text-gray-700 text-sm text-center"
				>
					New to Bug Tracker?
				</div>
			</router-link>
			<p class="text-center text-sm">
				To log in, use username: admin, password: admin
			</p>
		</form>
	</div>
</template>
<script>
	import { required } from 'vuelidate/lib/validators';
	export default {
		data() {
			return {
				username: '',
				password: '',
				passwordError: false,
				usernameError: false,
			};
		},
		methods: {
			onSubmit() {
				this.checkForm();
				if (this.username === '' || this.password === '') {
					return;
				}
				this.$store.dispatch('showSpinner', true);
				const formData = {
					username: this.username,
					password: this.password,
				};
				this.$store.dispatch('login', formData);
			},
			checkForm() {
				this.$v.$touch();
				if (this.$v.password.$invalid) {
					this.passwordError = true;
				} else {
					this.passwordError = false;
				}
				if (this.$v.username.$invalid) {
					this.usernameError = true;
				} else {
					this.usernameError = false;
				}
			},
		},
		validations: {
			username: { required },
			password: { required },
		},
	};
</script>
