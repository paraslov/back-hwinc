import { ResolutionsTypes } from './VideosEnums'

export type VideosBodyModel = {
  /**
   * max length 40
   */
  title: string
  /**
   * max length 20
   */
  author: string
  availableResolutions?: ResolutionsTypes[]
}
