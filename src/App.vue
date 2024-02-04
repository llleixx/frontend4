<template>
  <svg aria-hidden="true" class="w-0 h-0 absolute">
    <defs>
      <symbol id="icon-moon-fill" viewBox="0 0 32 32">
        <path
          d="M24.633 22.184c-8.188 0-14.82-6.637-14.82-14.82 0-2.695 0.773-5.188 2.031-7.363-6.824 1.968-11.844 8.187-11.844 15.644 0 9.031 7.32 16.355 16.352 16.355 7.457 0 13.68-5.023 15.648-11.844-2.18 1.254-4.672 2.028-7.367 2.028z">
        </path>
      </symbol>
      <symbol id="icon-search" viewBox="0 0 32 32">
        <path
          d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z">
        </path>
      </symbol>
    </defs>
  </svg>
  <div class="font-base-font bg-white dark:bg-very-dark-blue dark:text-gray-100 min-h-dvh">
    <header
      class="sticky inset-x-0 top-0 mb-8 px-3 py-6 flex justify-between border-b-1 border-b-gray-400 shadow-md bg-white dark:bg-dark-blue lg:px-16 z-50">
      <RouterLink class="font-bold" :to="{ name: 'home' }">Where in the world?</RouterLink>
      <button type="button" @click="darkModeConfig.changeMode" class="flex items-center justify-center">
        <svg class="w-4 h-4 fill-transparent stroke-black stroke-2 dark:stroke-white dark:fill-white">
          <use xlink:href="#icon-moon-fill"></use>
        </svg>
        <span class="ml-1">Dark Mode</span>
      </button>
    </header>
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { darkModeConfig } from './dark';

darkModeConfig.resolveDarkMode(true)
</script>