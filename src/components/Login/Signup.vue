<template>
	<div class="pb-20">
		<div class="text-center pt-16">
			<h2 class="text-4xl tracking-tight">
				Create Account
			</h2>

				<router-link to="/signIn">
					<div class="text-gray-500 hover:text-gray-700 text-sm">
						Do you already have an account?
					</div>
				</router-link>

		</div>
		<div class="flex justify-center my-2 mx-4 md:mx-0">
			<form 
				class="w-full max-w-xl bg-white rounded-lg shadow-md p-6"
			>
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="flex w-full">
						<div class="px-3 mb-6 w-1/2">
							<input
								class="w-full appearance-none bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 focus:outline-none"
								type="text"
								required
								placeholder="First Name"
								v-model="firstName"
								:class="{'border-red-500': firstNameError}"
							/>
							<p class="text-red-500 text-sm" v-if="firstNameError">First Name is required</p>
						</div>
						<div class="px-3 mb-6 w-1/2">
							<input
								class="w-full appearance-none bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
								type="text"
								required
								placeholder="Last Name"
								v-model="lastName"
								:class="{'border-red-500': lastNameError}"
							/>
							<p class="text-red-500 text-sm" v-if="lastNameError">LastName is required</p>
						</div>
					</div>			
					
					<div class="w-full md:w-full px-3 mb-6">
						<input
							class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
							type="email"
							required
							placeholder="Email Address"
							v-model="email"
							:class="{'border-red-500': emailError}"
						/>
						<p class="text-red-500 text-sm" v-if="emailError">Password is required</p>
					</div>					
					<div class="w-full md:w-full px-3 mb-6">
						<input
							class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
							type="text"
							required
							placeholder="User Name"
							v-model="username"
							:class="{'border-red-500': usernameLengthError}"
						/>
						<p class="text-red-500 text-sm" v-if="usernameLengthError">Username must have at least {{$v.username.$params.minLength.min}} letters.</p>
						<!-- <p class="text-red-500 text-sm" v-if="usernameError">Username is required</p> -->
					</div>
					<div class="w-full md:w-full px-3 mb-6">
						<input
							class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
							type="password"
							required
							placeholder="Password"
							v-model="password"
							:class="{'border-red-500': passwordLengthError}"
						/>
						<p class="text-red-500 text-sm" v-if="passwordLengthError">Password must have at least {{$v.password.$params.minLength.min}} letters.</p>
						<!-- <p class="text-red-500 text-sm" v-if="passwordError">Password is required</p> -->

					</div>
					<div class="w-full md:w-full px-3">
						<button
							class="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500"
							type="submit"
							@click="onSubmit"
						>
							Sign up
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { required, minLength} from 'vuelidate/lib/validators';
export default {
	data (){
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
			passwordLengthError: false
			

		}
	},
	methods: {
		onSubmit () {
			this.checkForm()
			if(
				this.firstName === "" || 
				this.lastName === "" ||
				this.email === "" ||
				this.username === "" ||
				this.password === ""
				) {
				return;
			}
			const formData = {
				first_name: this.firstName,
				last_name: this.lastName,
				password: this.password,
				email: this.email,
				username: this.username
			}
			console.log(formData)
			this.$store.dispatch('showSpinner', true)
			this.$store.dispatch('signup', formData)
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
	validations: {
		firstName: { required },
		lastName: { required },
		password: { required, minLength: minLength(8) },
		email: { required },
		username: { required, minLength: minLength(8) }
	},
}
</script>