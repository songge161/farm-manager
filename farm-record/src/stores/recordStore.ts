import {defineStore} from  "pinia";
import {ref} from "vue";

export const useRecordStore = defineStore('record', {

    state: () => {
        return {
            id: 1,
            name: 'name',
            artist: 'artist',
            price: 100,
        }
    },
});