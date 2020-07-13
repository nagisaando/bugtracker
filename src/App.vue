<template>
	<div
		id="app"
		class="bg-gray-100 font-sans leading-normal tracking-normal mt-16 min-h-full"
	>
		<NavBar />
		<div v-if="!auth" class="relative pt-20 md:pt-0 min-h-screen w-full">
			<Loading v-if="loading"></Loading>
			<router-view v-else></router-view>
		</div>
		<div v-if="auth" class="flex flex-col md:flex-row min-h-screen">
			<LeftBar></LeftBar>
			<Loading v-if="loading"></Loading>
			<router-view v-else></router-view>
		</div>
	</div>
</template>

<script>
	import NavBar from './components/Header/Navbar.vue';
	import LeftBar from './components/Header/LeftBar.vue';
	import Loading from './components/Loading/Loading.vue'

	export default {
		data: function() {
			return {
				HomeIsActive: true,
			};
		},
		computed: {
			auth() {
				return this.$store.getters.userToken;
			},
			loading() {
				return this.$store.getters.checkLoading
			}
		},
		created() {
			this.HomeIsActive = false;
			this.$store.dispatch('tryAutoLogin');
		},
		destroyed() {
			this.HomeIsActive;
		},
		components: {
			NavBar,
			LeftBar,
			Loading
		},
	};
</script>

<style>
	html,
	body,
	#app {
		min-height: 100vh;
	}
	.test {
		position: absolute;
		transform: translateY(50px);
	}
</style>
