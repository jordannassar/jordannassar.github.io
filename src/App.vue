<template>
    <div class="container">
        <section class="section">
            <div class="content">
                <input type="text" class="input" v-model="message">
                <button class="button is-primary" @click="add()">Add</button>

                <ItemList title="All Items" :items="items"></ItemList>
                <ItemList title="Done Items" :items="doneItems"></ItemList>
                <ItemList title="Not Done Items" :items="notDoneItems"></ItemList>
            </div>
        </section>
    </div>
</template>

<script>
import ItemList from './ItemList.vue';

export default {
    components: { ItemList },
    data() {
        return {
            message: "",
            items: [
                { title: "Piim", isDone: true, id: crypto.randomUUID() },
                { title: "Viin", isDone: false, id: crypto.randomUUID() },
                { title: "Sai", isDone: true, id: crypto.randomUUID() },
                { title: "Õlu", isDone: false, id: crypto.randomUUID() },
                { title: "Burks", isDone: false, id: crypto.randomUUID() },
            ],
        };
    },
    methods: {
        add() {
            if (this.message.length !== 0) {
                this.items.push({ title: this.message, isDone: false, id: crypto.randomUUID() });
                this.message = "";
            }
        }
    },
    computed: {
        doneItems() {
            return this.items.filter(item => item.isDone);
        },
        notDoneItems() {
            return this.items.filter(item => !item.isDone);
        },
    }
};
</script>

<style>

</style>