<template>
    <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 pt-8 pb-6">
        <h1 class="font-bold text-4xl my-8">Add new cat</h1>
        <form @submit.prevent="onSubmit" class="sm:max-w-sm md:max-w-lg mx-auto bg-indigo-100 px-8 py-1 mb-8 rounded-3xl">
            <div class=" text-left">
                <label class="mt-6 text-xl text-gray-900 font-semibold block" for="name">Name</label>
                <input type="text" placeholder="name" v-model="name" class="px-2 py-2 mt-2 w-full rounded-md border-2 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition duration-300" id="name"/>
                <label class="mt-6 text-xl text-gray-900 font-semibold block" for="breed">Breed</label>
                <input type="text" placeholder="breed" v-model="breed" class="px-2 py-2 mt-2 w-full rounded-md border-2 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition duration-300" id="breed"/>
                <label class="mt-6 text-xl text-gray-900 font-semibold block" for="birth">Date of birth</label>
                <input type="date" v-model="date" class="px-2 py-2 mt-2 w-full rounded-md border-2 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition duration-300" id="birth"/>
            </div>
            <button type="submit" class="mt-8 mb-5 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-12 rounded-3xl">Add new cat</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import CatsService from '../api/services/CatsService'

const emit = defineEmits(['addedCat'])
const name = ref('')
const breed = ref('')
const date = ref('')

async function onSubmit() {
    await CatsService.addCat({ 
        name: name.value, breed: breed.value , dateOfBirth: date.value
    })
    emit('addedCat')
}
</script>
