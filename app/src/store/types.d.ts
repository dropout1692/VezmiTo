export type IdleEntityType<NullEntityType = null> = {
  status: 'idle'
  entity: NullEntityType
  error: null
}

export type LoadingEntityType<NullEntityType = null> = {
  status: 'loading'
  entity: NullEntityType
  error: null
}

export type SuccessEntityType<EntityType> = {
  status: 'succeeded'
  entity: EntityType
  error: null
}

export type FailedEntityType<NullEntityType = null> = {
  status: 'failed'
  entity: NullEntityType
  error: string
}

export type EntityWithStatusType<EntityType, NullEntityType = null> =
  | IdleEntityType<NullEntityType>
  | LoadingEntityType<NullEntityType>
  | SuccessEntityType<EntityType>
  | FailedEntityType<NullEntityType>

export type IdleEntitiesType = {
  status: 'idle'
  entities: []
  error: null
}

export type LoadingEntitiesType = {
  status: 'loading'
  entities: []
  error: null
}

export type SuccessEntitiesType<EntityType> = {
  status: 'succeeded'
  entities: EntityType[]
  error: null
}

export type FailedEntitiesType = {
  status: 'failed'
  entities: []
  error: string
}

export type EntitiesWithStatusType<EntityType> =
  | IdleEntitiesType
  | LoadingEntitiesType
  | SuccessEntitiesType<EntityType>
  | FailedEntitiesType
