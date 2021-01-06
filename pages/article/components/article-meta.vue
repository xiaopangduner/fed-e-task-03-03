<template>
  <div class="article-meta">
    <nuxt-link :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link :to="{
          name: 'profile',
          params: {
            username: article.author.username
          }
        }"
      >
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createAt | date('MMM DD, YYYY') }}</span>
    </div>
    <span v-if="user.username === article.author.username" class="current-user">
      <button
        class="btn btn-sm action-btn btn-outline-secondary"
        @click="editArticle"
      >
        <i class="ion-edit"></i>
        &nbsp;
        Edit Article
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-danger"
        @click="deleteArticle"
      >
        <i class="ion-trash-a"></i>
        &nbsp;
        Delete Article
      </button>
    </span>
    <span v-else class="other-user">
      <button
        class="btn btn-sm action-btn"
        :class="{ 'btn-secondary': article.author.following, 'btn-outline-secondary': !article.author.following}"
        :disabled="article.author.followDisabled"
        @click="onFollow"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
        {{ article.author.following ? 'Unfollow' : 'Follow' }} {{ article.author.username }}
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{ 'active': article.favorited }"
        :disabled="article.favoriteDisabled"
        @click="onFavorite"
      >
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </span>
  </div>
</template>
<script>
import { addFavorite, cancelFavorite, delArticle } from '@/api/article'
import { addFollow, cancelFollow } from '@/api/profile'
import { mapState } from 'vuex'

export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    editArticle () {
      this.$router.push(`/editor/${this.article.slug}`)
    },
    async deleteArticle () {
      await delArticle(this.article.slug)
      this.$router.push('/')
    },
    async onFollow () {
      const author = this.article.author
      author.followDisabled = true
      if (author.following) {
        await cancelFollow(author.username)
        author.following = false
      } else {
        await addFollow(author.username)
        author.following = true
      }
      author.followDisabled = false
    },
    async onFavorite () {
      const article = this.article
      article.favoriteDisabled = true
      if (article.favorited) {
        await cancelFavorite(article.slug)
        article.favorited = false
        article.favoritesCount -= 1
      } else {
        await addFavorite(article.slug)
        article.favorited = true
        this.article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    }
  }
}
</script>
<style scoped>
  
</style>