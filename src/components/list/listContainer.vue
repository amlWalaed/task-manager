<script setup lang='ts'>
import draggable from "vuedraggable";
import { useListStore } from '@/stores/list'
const listStore = useListStore()
const isDragging = ref(false)
</script>
<template>
   <div>

      <draggable :list="listStore.lists"
                 class="flex items-start gap-6 overflow-x-auto hideScrollbar"
                 ghost-class="opacity-40"
                 group="tasks-list"
                 @start="isDragging = true"
                 @end="isDragging = false"
                 :animation="100"
                 itemKey=".id">
         <template #item="{ element: list }">
            <ListCard :list="list" />
         </template>
      </draggable>
   </div>
</template>