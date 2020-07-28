<template>
	<div class="flex justify-center my-2 mx-4 md:mx-0 lg:pt-20 pt-10">
		<form class="w-full max-w-lg nm-flat-gray-100-lg rounded-lg p-6">
			<!-- <div class="text-center">
				<h2 class="text-4xl tracking-tight">
					Sign In
				</h2>
			</div> -->
			<div class="flex justify-center flex-col flex-wrap -mx-3 m-6">
				<div class="w-5/6 mx-auto px-3 mb-6">
					<label
						class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						for="username"
						>Username</label
					>
					<input
						class="appearance-none block w-full nm-inset-gray-100 text-gray-500 font-medium rounded-lg py-3 px-3 leading-tight focus:outline-none"
						type="text"
						required
						v-model="username"
						placeholder="username"
						:class="{ 'border-red-300': usernameError }"
					/>
					<p class="text-red-300 text-sm" v-if="usernameError">
						Username is required
					</p>
				</div>
				<div class="w-5/6 mx-auto px-3 mb-6">
					<label
						class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						for="Password"
						>Password</label
					>
					<input
						class="appearance-none block w-full nm-inset-gray-100 text-gray-500 font-medium rounded-lg py-3 px-3 leading-tight focus:outline-none"
						type="password"
						required
						v-model="password"
						placeholder="password"
						:class="{ 'border-red-300': passwordError }"
					/>
					<p class="text-red-300 text-sm" v-if="passwordError">
						Password is required
					</p>
				</div>
				<!-- <div class="px-3"> -->
					<button
						class="appearance-none transition duration-200 ease-in-out block w-2/4 mx-auto mt-10 nm-convex-gray-200 text-gray-700 font-bold rounded-full py-3 px-3 leading-tight hover:nm-convex-gray-200-sm focus:outline-none"
						type="submit"
						@click.prevent="onSubmit"
					>
						Sign in
					</button>
				<!-- </div> -->
			</div>
			<router-link to="/signUp">
				<div
					class="text-gray-500 hover:text-gray-700 text-sm text-center"
				>
					Create New Account
				</div>
			</router-link>
			<!-- <p class="text-center text-sm">
				To log in, use username: admin, password: admin
			</p> -->
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
