<template>
  <div class="box">
    <article class="post">
      <h1>{{ post.title }}</h1>
      <div class="author">
        <p>Por {{ post.author }}</p>
        <small>Fecha de publicación: {{ post.updated }}</small>
      </div>
      <p>{{ post.description }}</p>
      <figure>
        <img :src="post.cover" :alt="post.cover" />
        <figcaption>Portada - {{ post.title }}</figcaption>
      </figure>
      <div class="markdown">{{ post.content }}</div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'ArticlePage',
  component: {},
  data: () => ({
    post: {
      slug: 'mi-primer-post',
      title: 'Mi primer post',
      author: 'Diego Reyes',
      updated: '05/05/2023',
      description: 'Lorem ipsum dolor sit amet, consectetur',
      cover: 'https://via.placeholder.com/1024x420',
      content:
        '#title\n\n##Second title\n\nLorem ipsum dolor sit amet, consectetur',
    },
  }),
}
</script>
