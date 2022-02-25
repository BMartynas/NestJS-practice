<template>
    <div @click="onClick" class="w-96 my-4 mx-6 bg-blue-50 rounded-xl rounded-t-3xl shadow-sm hover:scale-50 hover:shadow-2xl cursor-pointer">
        <img :src="pic || defaultCat" alt="cat" class=" rounded-t-3xl max-h-60 w-full"/>
        <div class="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        <div class="mx-2 px-2 py-6">
            <p class=" text-gray-800 text-4xl font-bold">{{ name }}</p>
            <p class=" text-gray-800 text-2xl font-semibold">({{ breed }})</p>
        </div>  
    </div>
</template>

<script setup> 
import { ref, onMounted, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import CatsService from '@/api/services/CatsService'
import defaultCat from '../assets/defaultCat.jpg'

const router = useRouter()
const props = defineProps(['name', 'breed', 'catId', 'hasPicture'])
const pic = ref('')
const { catId, hasPicture } = toRefs(props)

onMounted(async () => {
    if(hasPicture.value) {
        const result  = await CatsService.getPicture(catId.value)
        pic.value = URL.createObjectURL(result)
    }
})

function onClick() {
    router.push({ path: `/cats/${catId.value}`
    })
}
</script>
