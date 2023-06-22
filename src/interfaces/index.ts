
export interface State {
    lessons: Lessons[]
    currentLesson: Lessons,
}

export interface Lessons {
    id?: number,
    isWatched?: boolean,
    title?: string,
    subtitle?: string,
    video_url?: string
    video_time?: number,
    description?: string
}