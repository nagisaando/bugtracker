<template>
	<div class="container mx-auto px-4 sm:px-8 pb-20 md:pb-0 w-3/4">
		<div class="py-8">
					<h2 class="text-2xl mr-3 inline-block font-semibold leading-tight text-gray-700">
						Bug Detail
					</h2>
					<router-link
								tag="i"
								v-bind:to="`/projectDetail/${id}/BugEdit/${bugId}`"
								class="fas fa-pen text-gray-700 hover:text-gray-400 font-semibold rounded cursor-pointer"
							>
					</router-link>

			<div class="mt-10 py-4 w-full">
				<div
					class="inline-block w-full shadow rounded-lg overflow-hidden break-words nm-flat-gray-100 text-gray-600"
				>
					<div
						class="text-center px-5 py-5 border-b border-gray-200 text-xl w-full relative"
					>
						<span
							class="text-gray-700 absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase"
							>Bugs</span
						>
						{{ bug.title }}
					</div>
					<div
						class="text-center px-5 py-8 border-b border-gray-200 text-sm w-full relative"
					>
						<span
							class="text-gray-700 absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase"
							>Description</span
						>
						{{ bug.description }}
					</div>

					<div
						class="text-center px-5 py-5 border-b border-gray-200 text-sm w-full relative"
					>
						<span
							class="text-gray-700 absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase"
							>Status</span
						>
						<span
							class="rounded py-1 px-3 text-xs font-bold cursor-default"
							:class="
								bug.status === 1 ? 'nm-flat-orange-200' : 'nm-flat-green-100'
							"
						>
							{{ bug.status === 1 ? 'pending' : 'finished' }}
						</span>
					</div>
				</div>
			</div>
			<router-link v-bind:to="`/projectDetail/${id}`">
				<button
					class="transition duration-300 ease-in-out nm-flat-gray-200 py-2 px-3 rounded text-gray-700 hover:nm-flat-gray-200-sm focus:outline-none"
				>
					Go Back
				</button>
			</router-link>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				bug: {},
				id: this.$route.params.id,
				bugId: this.$route.params.bugId,
				showModal: false,
				hasDeleted: false,
			};
		},
		async mounted() {
			this.$store.dispatch('checkLoginStatus');
			try {
				const response = await axios.get(
					`/projects/${this.id}/bugs/${this.bugId}`,
					{
						headers: {
							Authorization:
								'Bearer ' + localStorage.getItem('token'),
						},
					}
				);
				this.bug = response.data;
			} catch (err) {
				alert('something went wrong, please try it again.' + err.message)
			}
		},
	};
</script>
