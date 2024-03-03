export type PageSliceType = {
  zoom: number
  location: {
    lat: number
    lng: number
    alt?: number
  }
  selectedSubmissionId: string
  isLoading: boolean
}
