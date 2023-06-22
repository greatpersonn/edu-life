<template>
    <el-header height="auto">
        <div class="flex flex-col">
            <span class="font-sans text-3xl font-bold p-3 text-blue-500">Edu Life</span>
            <span class="font-sans text-lg font-normal">Давай вивчемо Vue разом? Всього за декілька уроків!</span>
            <span class="font-sans text-lg font-normal">Для цього тобі потрібно подивитись наступний епізод: <span
                    class="text-blue-500">{{ lessonStore.currentLesson.subtitle }}</span></span>
        </div>
    </el-header>
</template>
  
<script lang="ts">
import { useLessonStore } from '../stores/LessonStore';

export default {
    name: 'Header',
    data() {
        return {
            lessonStore: useLessonStore()
        }
    },
}
</script>
  
<style></style>
  