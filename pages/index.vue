<template>
  <div class="container">
    <AboutMe />
    <div class="content">
      <main>
        <ArticleCard v-for="article in articles" :key="article.slug" />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data: () => ({
    articles: [1, 2, 3, 4, 5],
  }),
}
</script>

<style lang="scss">
.container {
  @apply m-auto;
}
.container .content {
  @apply flex flex-col justify-center items-center sm:p-2 md:p-4 lg:p-8 xl:p-16;
  main {
    @apply max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6;
  }
}
</style>
