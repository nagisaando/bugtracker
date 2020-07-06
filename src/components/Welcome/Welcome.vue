<template>
<div class="h-full md:flex items-center justify-between mx-12 md:pt-18">
	<div
		class="h-100 pt-18 md:pt-0 w-full md:w-1/2 mr-auto"
	>
		<h1 class="lg:text-5xl text-4xl font-bold tracking-wide text-gray-800">Bug Tracker</h1>
		<p class="font-bold tracking-wide text-gray-600">
			Bug tracker helps you to keep track and organize the bug of your peoject.
		</p>
		<p class="text-gray-400 pt-10"
			>Create New Account?
            <router-link to="/signUp">
                <span
                    class="text-gray-600 hover:text-gray-800 text-lg ml-2 font-bold">
                    Sign Up
                </span>
            </router-link>
        </p>
        
	</div>
    <div class="w-full md:max-w-md mt-6" >
    <Signin></Signin>
    </div>
</div>
</template>

<script>
import Signin from '../Login/Signin.vue';
export default {
    data(){
        return {}
    },
    components: {
        Signin
    }
}
</script>