<template>
  <div>
    <div class="mt-24 text-center text-gray-800">
      <span class=" text-3xl font-semibold">Log in</span>
      <form @submit.prevent="onSubmit" class="mx-auto mt-4 bg-gray-100 sm:max-w-sm md:max-w-lg shadow-lg rounded-lg">
        <div class="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-lg"></div>
        <div class="px-8 py-6 text-left  text-lg">
            <label class="font-semibold block" for="username">Username</label>
            <input type="text" placeholder="Username" v-model="username" class="px-2 py-2 mt-2 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 transition duration-300" id="username"/>
            <label class="font-semibold block mt-4" for="password">Password</label>
            <input type="password" placeholder="Password" v-model="password" class="px-2 py-2 mt-2 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 transition duration-300" id="password"/>
        </div>
        <button type="submit" class="mt-3 mb-5 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-12 rounded-3xl">Log in</button>
        <div class="pb-4">
            <p>Don't have an account? <router-link to="/register" class="underline hover:text-indigo-600">Register</router-link></p>
        </div> 
      </form>  
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UsersService from '@/api/services/UsersService'

const router = useRouter()
const username = ref('')
const password = ref('')

async function onSubmit() {
    let response = await UsersService.login({ 
        username: username.value, password: password.value 
    })
    let access_token = response.data.access_token;
    window.localStorage.setItem('jwtToken', access_token);
    router.push({ name: 'Home'});
}

</script>