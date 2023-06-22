<template>
  <div class="common-layout">
    <el-container class="flex flex-col">
      <Header />
      <Lessons :lessonsData="lessonStore.lessons" />
      <Footer />
    </el-container>
  </div>
</template>

<script lang="ts">
import Lessons from './components/Lessons.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

import data from './data/data.json';

import { useLessonStore } from './stores/LessonStore';

export default {
  name: "App",
  data() {
    return {
      lessonStore: useLessonStore()
    }
  },
  components: {
    Header,
    Footer,
    Lessons
},

  mounted() {
    this.lessonStore.setLesson(data);
  },
}
</script>

<style></style>
