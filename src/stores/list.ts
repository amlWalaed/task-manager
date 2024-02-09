import { defineStore } from 'pinia'

export const useListStore = defineStore('list', () => {
const taskStore = useTaskStore()
   const lists = reactive([
      {
         id: 0,
         items:taskStore.tasks.filter(task => task.list_id === 0) ,
         name: 'Working'
      },
      {
         id: 1,
         items: taskStore.tasks.filter(task => task.list_id === 1) ,
         name: 'Home'
      },
      {
         id: 2,
         items:taskStore.tasks.filter(task => task.list_id ===2) ,
         name: 'Planning'
      },
      {
         id: 3,
         items:taskStore.tasks.filter(task => task.list_id === 3) ,
         name: 'Wishes'
      },
   ])

   return {
      lists,
   }

})