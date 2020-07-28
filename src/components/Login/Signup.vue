<template>
	<div class="pb-20">
		<LoadingTopPage v-if="loadingTopPage"></LoadingTopPage>
		<div v-else>
			<div class="text-center pt-16">
				<h2 class="text-4xl text-gray-700 tracking-tight">
					Create Account
				</h2>

				<router-link to="/">
					<div class="text-gray-500 hover:text-gray-700 text-sm">
						Sign in Your Account
					</div>
				</router-link>
			</div>
			<div class="flex justify-center my-2 mx-4 md:mx-0">
				<form class="w-full max-w-xl nm-flat-gray-100-lg rounded-lg shadow-md p-6">
					<div class="flex w-5/6 mx-auto flex-wrap mt-5 mb-6">
						<div class="flex w-full">
							<div class="px-3 mb-6 w-1/2">
								<input
									class="w-full appearance-none nm-inset-gray-100 text-gray-500 font-medium rounded-lg py-3 px-3 focus:outline-none"
									type="text"
									required
									placeholder="First Name"
									v-model="firstName"
									:class="{
										'border-red-500': firstNameError,
									}"
								/>
								<p
									class="text-red-300 text-sm"
									v-if="firstNameError"
								>
									First Name is required
								</p>
							</div>
							<div class="px-3 mb-6 w-1/2">
								<input
									class="w-full appearance-none nm-inset-gray-100 text-gray-500 font-medium rounded-lg py-3 px-3 leading-tight focus:outline-none"
									type="text"
									required
									placeholder="Last Name"
									v-model="lastName"
									:class="{ 'border-red-500': lastNameError }"
								/>
								<p
									class="text-red-300 text-sm"
									v-if="lastNameError"
								>
									LastName is required
								</p>
							</div>
						</div>

						<div class="w-full md:w-full px-3 mb-6">
							<input
								class="appearance-none block w-full nm-inset-gray-100 text-gray-500 font-medium rounded-lg py-3 px-3 leading-tight focus:outline-none"
								type="email"
								required
								placeholder="Email Address"
								v-model="email"
								:class="{ 'border-red-500': emailError }"
							/>
							<p class="text-red-300 text-sm" v-if="emailError">
								Password is required
							</p>
						</div>
						<div class="w-full md:w-full px-3 mb-6">
							<input
								class="appearance-none block w-full nm-inset-gray-100 text-gray-500 font-medium rounded-lg py-3 px-3 leading-tight focus:outline-none"
								type="text"
								required
								placeholder="User Name"
								v-model="username"
								:class="{
									'border-red-500': usernameLengthError,
								}"
							/>
							<p
								class="text-red-300 text-sm"
								v-if="usernameLengthError"
							>
								Username must have at least
								{{ $v.username.$params.minLength.min }} letters.
							</p>
							<!-- <p class="text-red-300 text-sm" v-if="usernameError">Username is required</p> -->
						</div>
						<div class="w-full md:w-full px-3 mb-6">
							<input
								class="appearance-none block w-full nm-inset-gray-100 text-gray-500 font-medium rounded-lg py-3 px-3 leading-tight focus:outline-none"
								type="password"
								required
								placeholder="Password"
								v-model="password"
								:class="{
									'border-red-500': passwordLengthError,
								}"
							/>
							<p
								class="text-red-300 text-sm"
								v-if="passwordLengthError"
							>
								Password must have at least
								{{ $v.password.$params.minLength.min }} letters.
							</p>
							<!-- <p class="text-red-300 text-sm" v-if="passwordError">Password is required</p> -->
						</div>
						<div class="w-full md:w-full px-3">
							<button
								class="appearance-none transition duration-200 ease-in-out block w-1/3 mx-auto mt-10 nm-convex-green-200 text-gray-700 hover:nm-convex-green-200-sm rounded-full font-bold py-3 px-3 leading-tight focus:outline-none"
								type="submit"
								@click.prevent="onSubmit"
							>
								Sign up
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import { required, minLength } from 'vuelidate/lib/validators';
	import LoadingTopPage from '../../components/Loading/LoadingTopPage.vue'
	export default {
		data() {
			return {
				firstName: '',
				lastName: '',
				email: '',
				username: '',
				password: '',

				firstNameError: false,
				lastNameError: false,
				emailError: false,
				usernameError: false,
				usernameLengthError: false,
				passwordError: false,
				passwordLengthError: false,
			};
		},
		methods: {
			onSubmit() {
				this.checkForm();
				if (
					this.firstName === '' ||
					this.lastName === '' ||
					this.email === '' ||
					this.username === '' ||
					this.password === '' ||
					this.password.length < 9 ||
					this.username.length < 9
				) {
					return;
				} else {
					const formData = {
						first_name: this.firstName,
						last_name: this.lastName,
						password: this.password,
						email: this.email,
						username: this.username,
					};
					console.log(formData);
					this.$store.dispatch('showSpinner', true);
					this.$store.dispatch('signup', formData);
				}
			},
			checkForm() {
				this.$v.$touch();
				if (this.$v.firstName.$invalid) {
					this.firstNameError = true;
				} else {
					this.firstNameError = false;
				}
				if (this.$v.lastName.$invalid) {
					this.lastNameError = true;
				} else {
					this.lastNameError = false;
				}
				if (this.$v.email.$invalid) {
					this.emailError = true;
				} else {
					this.emailError = false;
				}
				if (this.$v.password.$invalid) {
					this.passwordLengthError = true;
				} else {
					this.passwordLengthError = false;
				}
				// if (this.$v.password.$params.required) {
				// 	this.passwordError = true;
				// } else {
				// 	this.passwordError = false;
				// }
				if (this.$v.username.$invalid) {
					this.usernameLengthError = true;
				} else {
					this.usernameLengthError = false;
				}
				// if (this.$v.username.$params.required) {
				// 	this.usernameError = true;
				// } else {
				// 	this.usernameError = false;
				// }
			},
		},
		computed: {
            loadingTopPage() {
                return this.$store.getters.checkTopPageLoading
            }
        },
		validations: {
			firstName: { required },
			lastName: { required },
			password: { required, minLength: minLength(8) },
			email: { required },
			username: { required, minLength: minLength(8) },
		},
		components: {
			LoadingTopPage
		}
	};
</script>
