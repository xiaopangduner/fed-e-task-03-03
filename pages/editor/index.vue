<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input v-model="article.title" type="text" class="form-control form-control-lg" placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="article.description" type="text" class="form-control" placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                <textarea v-model="article.body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="tag" type="text" class="form-control" placeholder="Enter tags" @keydown="addTag($event)">
                <div class="tag-list">
                  <span
                    v-for="(tag, index) in article.tagList"
                    :key="index"
                    class="tag-default tag-pill"
                  >
                    <i class="ion-close-round" @click="removeTag(index)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="button" :disabled="publishDisabled" @click="publishArticle">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { addArticle, updateArticle, getArticleDetail } from '@/api/article'

export default {
  middleware: 'authenticated',
  name: 'EditorIndex',
  data () {
    return {
      slug: '',
      publishDisabled: false,
      tag: '',
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    }
  },
  async mounted () {
    this.slug = this.$route.params.slug || ''
    if (this.slug) {
      const { data } = await getArticleDetail(this.slug)
      this.article.title = data.article.title
      this.article.description = data.article.description
      this.article.body = data.article.body
      this.article.tagList = data.article.tagList
    }
  },
  methods: {
    addTag (e) {
      this.tag = this.tag.trim()
      if (e.key === 'Enter' && this.tag && !this.article.tagList.includes(this.tag)) {
        this.article.tagList.push(this.tag)
        this.tag = ''
      }
    },
    removeTag (index) {
      this.article.tagList.splice(index, 1)
    },
    async publishArticle () {
      this.publishDisabled = true
      let data
      if (this.slug) {
        const res = await updateArticle(this.slug, { article: this.article })
        data = res.data
      } else {
        const res = await addArticle({ article: this.article })
        data = res.data
      }
      this.publishDisabled = false
      this.$router.push(`/article/${data.article.slug}`)
    }
  }
}
</script>
<style scoped>
  
</style>
