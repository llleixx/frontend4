<template>
  <div class="flex place-content-center text-center flex-col mt-32">
    <h1 class="text-9xl font-black text-gray-300">
      404
    </h1>
    <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
      Uh-oh!
    </p>
    <p class="mt-4 text-gray-500 dark:text-gray-400">We can't find that page.</p>
    <RouterLink :to="{ name: 'home' }"
      class="rounded inline-block mx-auto mt-6 px-5 py-3 border border-gray-200 shadow-lg font-medium text-gray-900 dark:bg-dark-blue dark:text-gray-200 hover:scale-105 transition-all dark:border-gray-800">
      Go Back Home
    </RouterLink>
  </div>
</template>

<script setup>
</script>