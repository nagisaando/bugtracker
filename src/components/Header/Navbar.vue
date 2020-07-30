<template>
<div>
	
	<nav
		class="nm-flat-gray-100 pt-2 md:pt-1 pb-3 px-1 mt-0 fixed w-full z-20 top-0"
	>
		<div 
		class="responsiveWidth px-1 absolute pt-5 pb-5 inset-0 bg-gray-100"
		v-if="!smallSize && auth">
			<router-link to="/home">
					<span class="text-xl pl-2"
						><i class="fas fa-home"></i
					></span>
			</router-link>
		</div>
		<div class="flex flex-wrap items-center mt-3 mb-3 text-gray-600">
			<div
				v-if="auth"
				class="flex flex-shrink w-1/2 md:justify-start"
			>
				<router-link to="/home">
					<span class="pl-2"
						><i class="fas fa-home"></i
					></span>
				</router-link>
			</div>
			<div
				v-if="!auth"
				class="flex flex-shrink justify-end ml-auto mr-4 w-1/2"
			>
				<a
					href="#"
					class="p-2 hover:text-gray-300 text-sm no-underline hover:no-underline block"
					>Contact</a
				>
			</div>

			<!-- <div
				v-if="auth"
				class="flex flex-1 md:w-1/3 justify-center md:justify-start px-2"
			>
				<span class="relative w-full">
					<input
						type="search"
						placeholder="Search"
						class="w-full nm-inset-gray-100 text-sm transition focus:outline-none focus:nm-inset-gray-200 rounded py-1 px-2 pl-10 appearance-none leading-normal"
					/>
					<div
						class="absolute search-icon"
						style="top: .5rem; left: .8rem;"
					>
						<svg
							class="fill-current pointer-events-none w-4 h-4"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path
								d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
							></path>
						</svg>
					</div>
				</span>
			</div>  -->

			<div
				v-if="auth"
				class="flex pr-3 content-center w-1/2 justify-end"
			>
				<div class="relative inline-block">
					<button
						@click="open = !open"
						class="drop-button focus:outline-none"
					>
						<span class="pr-2"
							><i class="em em-robot_face"></i></span
						>{{ userName
						}}<svg
							class="h-3 fill-current inline"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path
								d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
							/>
						</svg>
					</button>
					<div
						v-if="open"
						class="dropdownlist absolute nm-flat-gray-100-lg right-0 mt-3 p-3 overflow-auto z-30 rounded-md"
					>
						<div
							@click="onLogout"
							class="p-2 hover:text-gray-300 text-sm no-underline hover:no-underline block"
						>
							<i class="fas fa-sign-out-alt fa-fw"></i> Log Out
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
	
	</div>
</template>

<script>
	import router from '../../router'
	export default {
		data: function() {
			return {
				invisible: true,
				open: false,
				
			};
		},
		methods: {
			onLogout() {
				this.$store.dispatch('logout');
				this.open = false;
				router.replace('/').catch(() => {});
			},
			sizeCheck() {
				this.$store.dispatch('checkScreen')
			}
		},
		computed: {
			auth() {
				return this.$store.getters.userToken;
			},
			userName() {
				return this.$store.getters.userData;
			},
			smallSize() {
				return this.$store.getters.smallSize
			}

		},
		created(){
			window.addEventListener('resize', this.sizeCheck);
		},
		// destroyed() {
		// 	window.removeEventListener('resize', this.sizeCheck);
		// },
	};
</script>

<style scoped>
@media only screen and (min-width: 768px) {

.responsiveWidth {
	width: 192px;
	height: 118%;
	
}
}
</style>