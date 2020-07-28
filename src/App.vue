<template>
	<div
		id="app"
		class="bg-gray-100 font-sans leading-normal tracking-normal mt-16 min-h-full"
	>
		<NavBar />
		<div v-if="!auth" class="flex justify-center relative pt-20 md:pt-0 h-full">
			<router-view></router-view>
		</div>
		<div v-if="auth" class="flex flex-col md:flex-row min-h-screen">
			<LeftBar></LeftBar>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import NavBar from './components/Header/Navbar.vue';
	import LeftBar from './components/Header/LeftBar.vue';

	export default {
		data: function() {
			return {
			};
		},
		computed: {
			auth() {
				return this.$store.getters.userToken;
			},
		},
		created() {
			this.$store.dispatch('tryAutoLogin');
		},
		components: {
			NavBar,
			LeftBar,
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
