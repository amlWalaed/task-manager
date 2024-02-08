<script setup lang='ts'>
import draggable from "vuedraggable";

const isDragging = ref(false)

const tasks = ref([
   { name: "John", id: 0, is_completed: false },
   { name: "Joao", id: 1, is_completed: false },
   { name: "Jean", id: 2, is_completed: false }
])

</script>
<template>
   <ul class="bg-white border shadow rounded-xl">

      <transition-group type="transition" :name="!isDragging ? 'flip-list' : null">
         <draggable v-model="tasks" class="p-2 space-y-2" chosen-class="outline-2" ghost-class="opacity-50"
            handle=".drag-icon" @start="isDragging = true" @end="isDragging = false" item-key="id" :animation="100">
            <template #item="{ element }">
               <TaskCard :task="element" />
            </template>
         </draggable>
      </transition-group>
   </ul>
</template>