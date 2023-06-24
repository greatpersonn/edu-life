<template>
    <el-footer>
        <div class="flex flex-row justify-center items-center gap-10">
            <div class="flex flex-col w-1/2">
                <span class="font-mono text-3xl font-light p-3 text-blue-500">У цьому епізоді ви дізнаєтесь: </span>
                <span class="font-sans text-lg font-normal">
                    {{ lessonStore.currentLesson.description }}
                </span>
            </div>
            <div class="flex flex-col justify-center items-center gap-3" v-if="lessonStore.currentLesson.isWatched">
                <span class="font-sans text-lg font-normal w-72">
                    Тепер можна перейти і до наступного уроку!
                </span>
                <el-button type="primary" class="w-1/2 p-5" @click="changeEpisode" plain>Наступний епізод</el-button>
            </div>
        </div>
    </el-footer>
</template>
  
<script lang="ts">
import { useLessonStore } from '../stores/LessonStore';

export default {
    name: 'Footer',
    data() {
        return {
            lessonStore: useLessonStore()
        }
    },

    methods: {
        changeEpisode() {
            if (this.lessonStore.currentLesson) {
                
                console.log(this.lessonStore.currentLesson)
                // if (this.lessonStore.currentLesson.id) {
                //     this.lessonStore.setCurrent(this.lessonStore.lessons[])
                // }
            }
            // console.log(this.lessonStore.currentLesson)
        }
    },
}
</script>
  
<style></style>
  