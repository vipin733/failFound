<template>
    <div class="md:flex dark:bg-black ">
        <div class="md:flex-shrink-0">
            <img class="rounded-lg md:w-56" src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80" alt="Woman paying for a purchase">
        </div>
        <div class="mt-4 md:mt-0 md:ml-6">
            <div class="uppercase tracking-wide text-sm text-indigo-600  dark:text-white font-bold">Marketing</div>
            <a href="#" class="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline dark:text-white ">Finding customers for your new business</a>
            <p class="mt-2 text-gray-600 dark:text-white">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
        </div>
        <button @click="toggle" class="">butt</button>
    </div>
</template>

<script>
    export default {
        methods: {
            toggle() {
            this.$colorMode.preference =
                this.$colorMode.value == "light" ? "dark" : "light";
            }
        }
    };
</script>