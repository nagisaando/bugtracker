<template>
	<div
		class="nm-flat-gray-100-lg md:flex-none shadow-lg fixed bottom-0 md:relative z-10 w-full md:w-48 "
	>
		<div
			class="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between"
		>
			<ul
				class="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left"
			>
				<router-link to="/projects">
					<li class="mr-3 flex-1">
						<a
							href="#"
							class="block py-1 md:py-3 pl-1 align-middle no-underline"
						>
							<i class="fas fa-tasks pr-0 text-black md:pr-3"></i
							><span
								class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 hover:text-gray-400 block md:inline-block"
								>Projects</span
							>
						</a>
					</li>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
	
	};
</script>
