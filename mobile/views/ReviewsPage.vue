<template>
  <div class="container mx-auto py-4">
    <div class="grid grid-cols-1 gap-y-4">
      <review-card
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :with-buttons="true"
        @set:like="like"
        @set:disLike="disLike"
      />
    </div>
  </div>
</template>

<script>
import ReviewCard from '~/mobile/components/review-components/ReviewCard'
import Comment from '~/api/Comment'

export default {
  name: 'ReviewsPage',
  components: { ReviewCard },
  async asyncData ({ params }) {
    return await Comment.getReviews(params.id)
      .then((res) => {
        const comments = res.data.data.comments
        return {
          comments
        }
      }).catch((err) => {
        console.log(err)
      })
  },
  methods: {
    async like (id) {
      await Comment.setLike({
        comment_id: id
      })
    },
    async disLike (id) {
      await Comment.setDisLike({
        comment_id: id
      })
    }
  }
}
</script>

<style scoped>

</style>
