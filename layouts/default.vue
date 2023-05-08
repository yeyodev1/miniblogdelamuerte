<template>
  <div class="layout-default">
    <header>
      <menu>
        <nuxt-link to="/">Miniblog</nuxt-link>
        <nuxt-link to="/">Sobre mi </nuxt-link>
      </menu>
    </header>
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',
}
</script>

<style lang="scss" scoped>
.layout-default {
  @apply min-h-full;
  header {
    @apply sticky absolute top-0 bg-white z-10;
    menu {
      @apply m-auto flex justify-between items-center w-full max-w-5xl px-4 py-6;
    }
    .brand {
      @apply font-bold text-2xl;
    }
  }
}
</style>
