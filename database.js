import { randomUUID } from 'node:crypto'
//unique universal ID

export class DatabaseMemory {
  #videos = new Map()

  create(video) {
    const videoId = randomUUID()

    this.#videos.set(videoId, video)
  }

  list(search) {
    return Array.from(this.#videos.entries())
      .map(videoItem => {
        const id = videoItem[0]
        const data = videoItem[1]

        return {
          id, ...data
        }
      })
      .filter(video => {
        if(search) {
          return video.title.includes(search)
        }
        return true
      })
  }

  update(id, video) {
    this.#videos.set(id, video)
  }

  delete(id) {
    this.#videos.delete(id)
  }
}