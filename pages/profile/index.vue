<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button
              v-if="user.username !== profile.username"
              class="btn btn-sm action-btn"
              :class="{ 'btn-secondary': profile.following, 'btn-outline-secondary': !profile.following}"
              :disabled="profile.followDisabled"
              @click="onFollow"
            >
              <i class="ion-plus-round"></i>
              &nbsp;
              {{ profile.following ? 'Unfollow' : 'Follow' }} {{ profile.username }}
            </button>
            <button
              v-else
              class="btn btn-sm action-btn btn-outline-secondary"
              @click="editProfileSetting"
            >
              <i class="ion-gear-a"></i>
              &nbsp;
              Edit Profile Setting
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  :class="{ 'active': tab === 'my_articles'}"
                  class="nav-link"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'my_articles'
                    }
                  }"
                >
                  My Articles
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  :class="{ 'active': tab === 'favorited_articles'}"
                  class="nav-link"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'favorited_articles'
                    }
                  }"
                >
                  Favorited Articles
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div
            v-for="article in articles"
            :key="article.slug"
            class="article-preview"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  }
                }"
              >
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <a href="" class="author">{{ article.author.username }}</a>
                <span class="date">{{ article.createAt | date('MMM DD, YYYY')}}</span>
              </div>
              <button
                :class="{ 'active' : article.favorited }"
                class="btn btn-outline-primary btn-sm pull-xs-right"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: article.slug
                }
              }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
              <ul
                v-for="(tag, index) in article.tagList"
                :key="index"
                class="tag-list"
              >
                <li class="tag-default tag-pill tag-outline">{{ tag }}</li>
              </ul>
            </nuxt-link>
          </div>

          <nav>
            <ul class="pagination">

              <li
                v-for="item in totalPages"
                :key="item"
                :class="{ 'active': item === page }"
                class="page-item"
              >
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: {
                      username: $route.params.username
                    },
                    query: {
                      page: item,
                      tab: tab
                    }
                  }"
                  class="page-link"
                >
                  {{ item }}
                </nuxt-link>
              </li>
            </ul>
          </nav>

        </div>

      </div>
    </div>

  </div>
</template>
<script>
import { getProfileDetail, addFollow, cancelFollow } from '@/api/profile'
import { getPublicArticles, addFavorite, cancelFavorite } from '@/api/article'
import { mapState } from 'vuex'

export default {
  middleware: 'authenticated',
  name: 'UserProfile',
  async asyncData ({ params, query }) {
    const tab = query.tab || 'my_articles'
    const page = Number.parseInt(query.page || 1)
    const limit = 10
    const articleParams = {
      limit,
      offset: (page - 1) * limit
    }
    if (tab === 'my_articles') {
      articleParams.author = params.username
    } else {
      articleParams.favorited = params.username
    }
    const [ profileData, articleData ] = await Promise.all([
      getProfileDetail(params.username),
      getPublicArticles(articleParams)
    ])
    const { profile } = profileData.data
    const { articles, articlesCount } = articleData.data
    return {
      profile,
      articles,
      articlesCount,
      tab,
      limit,
      page
    }
  },
  watchQuery: ['page', 'tab'],
  computed: {
    ...mapState(['user']),
    totalPages () {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
    editProfileSetting () {
      this.$router.push('/settings')
    },
    async onFollow () {
      const profile = this.profile
      profile.followDisabled = true
      if (profile.following) {
        await cancelFollow(profile.username)
        profile.following = false
      } else {
        await addFollow(profile.username)
        profile.following = true
      }
      profile.followDisabled = false
    },
    async onFavorite (article) {
      article.favoriteDisabled = true
      if (article.favorited) {
        await cancelFavorite(article.slug)
        article.favorited = false
        article.favoritesCount -= 1
      } else {
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    }
  }
}
</script>
<style scoped>
  
</style>
