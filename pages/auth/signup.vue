<template>
    <div class="bg-gray-100 h-screen w-screen flex justify-center items-center px-2">
        <div class="bg-white rounded-xl p-8 shadow-2xl shadow-gray-200 w-full max-w-[420px] "> 
            <div class="mb-8 text-center">
                <div class="flex justify-center mb-3"><img src="/icon.png" alt="Cobzar Logo" class="w-12 h-12 object-cover"/></div>
                <h1 class="text-3xl font-bold mb-1">Sign Up</h1>
                <h2 class="text-gray-500">Create an account and get started</h2>
            </div>

            <UForm class="space-y-4 mb-10"  :schema="schema" :state="credentials" @submit="createUser">
                <UFormGroup label="Email" name="email">
                    <UInput v-model="credentials.email" placeholder="Your Email" type="email" size="xl" />
                </UFormGroup>

                <UFormGroup label="Password" name="password">
                    <UInput v-model="credentials.password" placeholder="Your Password" type="password" size="xl" />
                </UFormGroup>

                <UButton type="submit" size="xl" block>Sign Up</UButton>
            </UForm>
            <div class="text-center"><span class="mr-1.5 text-gray-500">Already have an account?</span><NuxtLink to="/auth/login" class="text-blue-ribbon-500 font-semibold">Login</NuxtLink></div>
        </div>
    </div>
</template>

<script setup>
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { z } from 'zod'

const toast = useToast();

const credentials = ref({
    email: '',
    password: '',
});

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string()
            .min(8, 'Must be at least 8 characters')
            .regex(/[0-9]/, "Must contain at least one digit") ,
})

const { $auth, $db } = useNuxtApp();
const createUser = () => {
    createUserWithEmailAndPassword($auth, credentials.value.email, credentials.value.password)
    .then((data) => {
        setDoc(doc($db, "users", data.user.uid), {
            email: credentials.value.email,
            pages: [],
        });

        navigateTo('/app')
    })
    .catch((error) => {
        toast.add({
            title: 'Please Try Again',
            description: `Invalid Email or Password`,
            icon: 'i-heroicons-x-circle',
            color: 'red',
            timeout: 3500,
        })
    });
}

</script>

<style lang="scss" scoped>

</style>