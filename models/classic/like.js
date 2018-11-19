import { HTTP } from '../../utils/http.js'
class LikeModel extends HTTP {
  like(behavior, artID, category) {
    let url = behavior === 'like' ? 'like' : 'like/cancel'
    this.request({
      url: url,
      method: 'post',
      data: {
        art_id: artID,
        type: category
      }
    })
  }
}
export { LikeModel }