<template>
    <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen">
        <Navbar />
       <div v-if="cat" class="flex flex-col md:flex-row px-5 mx-5 mt-8 pb-8 flex-wrap rounded-3xl rounded-t-lg">
            <div class="md:w-1/2 mt-16">
                <form class="flex flex-col mx-auto w-3/4 mb-6">
                    <label for="name" class="font-bold mb-4 ml-2 text-2xl">Name</label>
                    <input v-model="name" :disabled="disabled" id="name" class="px-4 py-2 border-4 border-indigo-400 rounded-full font-semibold text-lg text-gray-600 outline-none focus:border-indigo-700"/>
                    <label for="breed" class="font-bold my-4 ml-2 text-2xl">Breed</label>
                    <input v-model="breed" :disabled="disabled" id="breed" class="px-4 py-2 border-4 border-indigo-400 rounded-full font-semibold text-lg text-gray-600 outline-none focus:border-indigo-700"/>
                    <label for="date" class="font-bold my-4 ml-2 text-2xl">Date of birth</label>
                    <input :value="cat.dateOfBirth.split('T').shift()" disabled id="date" class="px-4 py-2 border-4 border-indigo-400 rounded-full font-semibold text-lg text-gray-600 "/>
                </form>
                <div class="flex">
                    <button @click="onSaveClick" v-if="!disabled" class="mx-auto w-1/5 mt-4 cursor-pointer border-2 px-6 py-2 rounded-full bg-green-300 hover:bg-green-400 ring-2 ring-green-500 border-none font-semibold hover:font-bold">Save</button>
                    <button @click="onEditClick" v-if="disabled" class="mx-auto w-1/5 mt-4 cursor-pointer border-2 px-6 py-2 rounded-full bg-yellow-300 hover:bg-yellow-400 ring-2 ring-yellow-500 border-none font-semibold hover:font-bold">Edit</button>
                    <button @click="onCancelClick" v-if="!disabled" class="mx-auto w-1/5 mt-4 cursor-pointer border-2 px-6 py-2 rounded-full bg-red-300 hover:bg-red-400 ring-2 ring-red-500 border-none font-semibold hover:font-bold">Cancel</button>
                </div>
           </div>
           <div class="md:w-1/2 mt-16 flex flex-col items-center">
               <img v-if="pic" :src="pic" alt="cat" class=" w-2/3 rounded-2xl max-h-96"/>
               <img v-else :src="defaultCat" alt="cat" class=" w-2/3 rounded-2xl max-h-96"/>
               <label for="img" class="mt-4 cursor-pointer border-2 px-6 py-2 rounded-full bg-indigo-400 ring-4 border-none font-semibold hover:font-bold hover:bg-indigo-500">Upload photo</label>
               <input type="file" class="hidden" id="img"/>
           </div>
           <div class="md:w-1/2 flex justify-center mt-2">
               <button @click="onDelete" class="w-1/5 py-2 px-4 bg-red-700 font-semibold hover:bg-red-800 ring-2 ring-black rounded-full">Delete</button>
           </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import CatsService from '@/api/services/CatsService'
import defaultCat from '../assets/defaultCat.jpg'

const props = defineProps(['id'])
const router = useRouter()
const cat = ref(null)
const name = ref(null)
const breed = ref(null)
const nameBeforeEdit = ref(null)
const breedBeforeEdit = ref(null)
const pic = ref(null)
const disabled = ref(true)

onMounted(async() => {
    cat.value = await CatsService.getCat(props.id)
    name.value = cat.value.name
    breed.value = cat.value.breed
    if(cat.value.picture) {
    const catPictureResult = await CatsService.getPicture(cat.value._id)
    pic.value = URL.createObjectURL(catPictureResult)
    }
})

function onEditClick() {
    nameBeforeEdit.value = name.value
    breedBeforeEdit.value = breed.value
    disabled.value = false
}

function onCancelClick() {
    name.value = nameBeforeEdit.value
    breed.value = breedBeforeEdit.value
    disabled.value = true
}

async function onSaveClick() {
    await CatsService.updateCat(cat.value._id, {
        name: name.value,
        breed: breed.value
    })
    disabled.value = true
}

async function onDelete() {
    await CatsService.deleteCat(cat.value._id)
    router.push({ name: 'Home' })
}
</script>