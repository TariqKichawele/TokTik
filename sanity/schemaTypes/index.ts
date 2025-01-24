import { type SchemaTypeDefinition } from 'sanity'
import { userType } from './user'
import { videoType } from './video'
import { commentType } from './comments'
import { likeType } from './like'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [userType, videoType, commentType, likeType],
}
