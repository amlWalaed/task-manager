<script setup lang='ts'>
import draggable from "vuedraggable";
const props = defineProps<{
   list: Record<string, unknown>,
}>()

const taskStore = useTaskStore()
</script>
<template>
   <section class="p-3 rounded-ss-3xl rounded-ee-3xl bg-primary-800 min-w-72 h-[60svh]">
      <span class="block mx-auto -mt-4 text-gray-200 size-10 i-heroicons-ellipsis-horizontal"></span>
      <header class="flex items-center justify-between">
         <div class="flex items-center gap-1">
            <span
                  class="text-xs rounded-full text-gray-100 p-0.5 bg-primary-300 aspect-square size-4 flex items-center justify-center">{{ list.items.length }}</span>
            <h1 class="px-4 py-2 font-semibold text-white w-fit ">
               {{ list.name }}
            </h1>
         </div>

         <BaseButton icon-class="i-heroicons-plus"
                     @click="taskStore.openTaskForm(list.id)" />
      </header>
      <TaskForm :list="list" />
      <draggable group="tasks"
                 class="py-2 space-y-2 overflow-y-auto h-80 hideScrollbar"
                 ghost-class="opacity-40"
                 :list="list.items"
                 itemKey=".id"
                 v-auto-animate
                 :animation="200">
         <template #item="{ element }">
            <TaskCard :task="element" />
         </template>
      </draggable>
   </section>
</template>