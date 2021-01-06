<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea v-model="myComment.body" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button @click="addComment" class="btn btn-sm btn-primary">
          Post Comment
        </button>
      </div>
    </form>
    
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="card"
    >
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
           class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username
            }
          }"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <a href="" class="comment-author">{{ comment.author.username }}</a>
        <span class="date-posted">{{ comment.createAt | date('MMM DD, YYYY')}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getArticleComments, addArticleComment } from '@/api/article'
import { mapState } from 'vuex'
export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['user'])
  },
  data() {
    return {
      comments: [],
      myComment: {
        body: ''
      }
    }
  },
  async mounted() {
    const { data } = await getArticleComments(this.article.slug)
    this.comments = data.comments
  },
  methods: {
    async addComment () {
      if (!this.myComment.body) return
      await addArticleComment(this.article.slug, { comment: this.myComment })
    }
  }
}
</script>
<style scoped>
  
</style>