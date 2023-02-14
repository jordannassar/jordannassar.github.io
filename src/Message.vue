<template>
    <div class="columns is-mobile">
        <div class="column is-half" :class="{'is-offset-half': isOwner}">
            <p class="has-text-grey-light">{{ username }}</p>
            <div class="notification" :class="{'is-primary': isOwner, 'is-danger': !isOwner}">
                {{ message }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['message', 'isOwner', 'username']
    }
</script>