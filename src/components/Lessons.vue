<template>
    <div class="w-full flex flex-row items-center justify-center">
        <div class="flex flex-col p-5 w-full h-96">
            <div ref="player"></div>
        </div>
        <div class="flex flex-col gap-3 w-full p-5">
            <div v-for="lesson, index in lessonsData" :key="lesson.id"
                class="flex justify-center items-center w-96 h-30 p-2 bg-gray-300 bg-opacity-5 shadow-2xl hover:cursor-pointer"
                @click="setCurrentLesson(lesson, index)">
                <span
                    :class="lessonsStore.currentLesson.id == index || lesson.isWatched ? 'text-blue-500' : 'text-gray-400'">
                    {{ lesson.title }}
                </span>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { Lessons } from '../interfaces';
import { useLessonStore } from '../stores/LessonStore';

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

export default {
    name: 'Lessons',
    props: {
        lessonsData: [] as Array<any>
    },

    data() {
        return {
            lessonsStore: useLessonStore(),
            timer: null as number | null,
            player: null as any,
            currentTime: 0,
            validateTime: 0
        }
    },

    methods: {
        setCurrentLesson(lesson: Lessons, index: number) {
            if (index == 0) {
                this.lessonsStore.setCurrent(lesson);
                this.onLoadIframe()
            }

            if (index > 0) {
                if (this.lessonsStore.lessons[index - 1].isWatched) {
                    this.lessonsStore.setCurrent(lesson);
                    this.changeVideo(this.player);
                }
            }
        },

        onLoadIframe() {
            const playerElement = this.$refs.player as HTMLDivElement;

            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

            if (this.lessonsStore.currentLesson.video_url) {
                const videoId = this.lessonsStore.currentLesson.video_url.split("/").pop();

                window.onYouTubeIframeAPIReady = () => {
                    this.player = new window.YT.Player(playerElement, {
                        videoId: videoId,
                        events: {
                            onReady: this.onPlayerReady
                        }
                    });
                };

            }

        },

        onPlayerReady(event: any) {
            const player = event.target;

            player.addEventListener('onStateChange', (event: any) =>
                this.onPlayerStateChange(event, player)
            );
        },

        onPlayerStateChange(event: any, player: any) {
            const state = event.data;

            switch (state) {
                case 1:
                    this.startTimer(player);
                    break;

                case 2:
                    this.stopTimer();
                    break;
                    
                default:
                    console.error("Unknown state, please try again later!");
                    break;
            }

        },

        changeVideo(player: any) {
            if (player) {
                if (this.lessonsStore.currentLesson.video_url) {
                    const videoId = this.lessonsStore.currentLesson.video_url.split("/").pop();
                    player.loadVideoById(videoId);
                }
            }
        },

        startTimer(player: any) {
            this.timer = setInterval(() => {
                this.currentTime = player.getCurrentTime();
                setTimeout(() => {
                    this.validateTime = this.currentTime;
                }, 5000);

                if (this.lessonsStore.currentLesson.video_time) {

                    if (this.currentTime - this.validateTime > 2) {
                        this.stopTimer();
                    }

                    if (this.currentTime / 60 >= this.lessonsStore.currentLesson.video_time) {
                        this.stopTimer();
                        this.lessonsStore.currentLesson.isWatched = !this.lessonsStore.currentLesson.isWatched;
                    }
                }
            }, 1000);
        },

        stopTimer() {
            clearInterval(this.timer!);
            this.timer = null;
        },
    }
}

</script>
  
<style></style>
  