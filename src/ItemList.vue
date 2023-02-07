<template>
    <h1>{{ title }}</h1>
    <ul>
        <li v-for="item in items" :key="item.id">
            {{ item.title }} 
            <input type="checkbox" v-model="item.isDone">
        </li>
    </ul>
</template>
<script>
export default {
    props: ['title', 'items']
}
</script>