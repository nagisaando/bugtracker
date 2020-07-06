<template>
	
			<div class="flex justify-center my-2 mx-4 md:mx-0 lg:pt-20 pt-10">
			<form 
				class="w-full max-w-lg bg-white rounded-lg shadow-md p-6"
				@submit.prevent="onSubmit"
			>
				
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
							v-model="userName"
						/>
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
						/>
					</div>
					<div
						class="w-full flex items-center justify-between px-3 mb-3"
					>
						<label for="remember" class="flex items-center w-1/2">
							<input
								type="checkbox"
								name
								id
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
									<router-link to="/signUp">
						<div class="text-gray-500 hover:text-gray-700 text-sm text-center">
							New to Bug Tracker?
						</div>
					</router-link> 
					<p class="text-center text-sm">To log in, use username: admin, password: admin</p>
			</form>
			
			</div>


</template>
<script>
export default {
	data (){
		return {
			userName: '',
			password: ''
		}
	},
	methods: {
		onSubmit (){
			const formData = {
				username: this.userName,
				password: this.password
			}
			console.log(formData)
			this.$store.dispatch('login', formData)
		}
	}
}
</script>