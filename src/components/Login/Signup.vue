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
				@submit.prevent="onSubmit"
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
							/>
						</div>
						<div class="px-3 mb-6 w-1/2">
							<input
								class="w-full appearance-none bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
								type="text"
								required
								placeholder="Last Name"
								v-model="lastName"
							/>
						</div>
					</div>			
					
					<div class="w-full md:w-full px-3 mb-6">
						<input
							class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
							type="email"
							required
							placeholder="Email Address"
							v-model="email"
						/>
					</div>					
					<div class="w-full md:w-full px-3 mb-6">
						<input
							class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
							type="text"
							required
							placeholder="User Name"
							v-model="userName"
						/>
					</div>
					<div class="w-full md:w-full px-3 mb-6">
						<input
							class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
							type="password"
							required
							placeholder="Password"
							v-model="password"
						/>
					</div>
					<div
						class="w-full flex items-center justify-between px-3 mb-3 "
					>
						<label for="remember" class="flex items-center w-1/2">
							<input
								type="checkbox"
								name=""
								id=""
								class="mr-1 bg-white shadow"
							/>
							<span class="text-sm text-gray-700 pt-1"
								>Remember Me</span
							>
						</label>
						<div class="w-1/2 text-right">
							<a
								href="#"
								class="text-blue-500 text-sm tracking-tight"
								>Forget your password?</a
							>
						</div>
					</div>
					<div class="w-full md:w-full px-3">
						<button
							class="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500"
							type="submit"
						>
							Sign in
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	data (){
		return {
			firstName: '',
			lastName: '',
			email: '',
			userName: '',
			password: ''

		}
	},
	methods: {
		onSubmit () {
			const formData = {
				first_name: this.firstName,
				last_name: this.lastName,
				password: this.password,
				email: this.email,
				username: this.userName
			}
			console.log(formData)
			this.$store.dispatch('signup', formData)
		}
	}
}
</script>