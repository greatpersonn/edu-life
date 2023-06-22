import { defineStore } from "pinia";

import { Lessons, State } from "../interfaces";

export const useLessonStore = defineStore('lessonStore', {
    state: (): State => ({
        lessons: [],
        currentLesson: {}
    }),

    actions: {
        setLesson(lessons: Array<any>) {
            this.lessons = lessons
        },

        setCurrent(lesson: Lessons) {
            this.currentLesson = lesson;
        },

        nextCurrent(current: Lessons) {
            if (current && current.id) {
                this.setCurrent(this.lessons[current.id + 1])
            }
        }
    }
});