<template>
    <div>
        <form @submit.prevent = "generate">
            <input type="file" accept=".pdf" ref="fileUpload" class="focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition mb-10 px-3 py-2 w-full border-2 rounded border-gray-200" required/>
            <input type="submit" placeholder="Submit" class=""/>
        </form>
    </div>  
</template>

<script setup>

const fileUpload = ref();

const generate = async () => {
    const formData = new FormData();
    const file = fileUpload.value.files[0];
    formData.append('pdf', file);

    let pdfText = await $fetch('https://pdf-parse.vercel.app', {
        method: 'POST',
        body: formData
    })
    console.log(pdfText)
    const data = await $fetch('/api/formatter', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: { content: pdfText },
    });

    console.log(data);

}



</script>

<style lang="scss" scoped>

</style>