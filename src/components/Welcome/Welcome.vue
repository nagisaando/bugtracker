<template>
	<div class=" w-4/5">
        <LoadingTopPage v-if="loadingTopPage"></LoadingTopPage>
		<div class="container md:flex items-center justify-between md:pt-18 md:pb-0 pb-10" v-else>
			<div class="flex flex-col content-center h-100 pt-18 md:pt-0 w-full md:w-auto">
				<h1
					class="text-center lg:text-6xl md:text-5xl text-4xl font-bold tracking-wide text-gray-700"
				>
					Bug Tracker
				</h1>
				<p class="text-gray-500 w-54 text-center">
					Bug tracker helps you to keep track and
					<br>
					organize the bug ofyour peoject.
				</p>
				<!-- <p class="text-gray-400 pt-10">
					Create New Account? -->
					<router-link tag="button" class="appearance-none transition duration-200 ease-in-out block w-1/3 mx-auto mt-10 nm-convex-green-200 text-gray-700 font-bold rounded-full py-3 px-3 leading-tight hover:nm-convex-green-200-sm focus:outline-none" to="/signUp">
						<!-- <span
							class="text-gray-600 hover:text-gray-800 text-lg ml-2 font-bold"
						> -->
							Sign Up
						<!-- </span> -->
					</router-link>
				<!-- </p> -->
			</div>
			<div class="w-full md:max-w-md mt-6">
				<Signin></Signin>
			</div>
		</div>
	</div>
</template>

<script>
    import LoadingTopPage from '../../components/Loading/LoadingTopPage.vue'
	import Signin from '../Login/Signin.vue';
	export default {
		data() {
			return {};
		},
		components: {
            Signin,
            LoadingTopPage
        },
        computed: {
            loadingTopPage() {
                return this.$store.getters.checkTopPageLoading
            }
        }
	};
</script>

<style scoped>

</style>