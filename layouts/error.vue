<template>
  <main
    class="container mx-auto flex-grow flex flex-col justify-center items-center text-lg"
  >
    <p class="text-9xl text-center text-primary">
      {{ error.statusCode ?? '404' }}
    </p>
    <h1 class="mb-8 text-center">
      {{ error.message ?? 'An error occurred' }}
    </h1>
    <nuxt-link to="/" class="btn btn-outline max-w-screen-sm">
      Go back to home page
    </nuxt-link>
  </main>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
