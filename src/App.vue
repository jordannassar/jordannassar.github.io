<template>
    <div class="container">
        <section class="section" v-if="!hasUsername">
            <div class="field has-addons">
                <div class="control is-fullwidth">
                    <input 
                        class="input"
                        type="text"
                        placeholder="Username"
                        v-model="username"
                        @keydown.enter="sendUsername">
                </div>
                <div class="control">
                    <a class="button is-info" @click="sendUsername">
                    Enter
                    </a>
                </div>
            </div>
        </section>
    

    <section class="section" v-if="hasUsername">
        <div class="field has-addons">
            <div class="control is-fullwidth">
                <input 
                    class="input"
                    type="text"
                    placeholder="Message...."
                    v-model="message"
                    @keydown.enter="sendMessage">
            </div>
            <div class="control">
                <a class="button is-info" @click="sendMessage">
                Send
                </a>
            </div>
        </div>
    </section>
    <section class="section" v-if="hasUsername">
        <Message 
            v-for="msg in messages"
            :message="msg.message"
            :isOwner="msg.isOwner"
            :username="msg.username"></Message>
    </section>
</div>
</template>

<script>
import Message from './Message.vue';

export default {
    created() {
        // Create WebSocket connection.
        this.socket = new WebSocket("ws://172.18.25.10:8080");
        // Connection opened
        this.socket.addEventListener("open", this.open);
        // Listen for messages
        this.socket.addEventListener("message", this.receive);
    },
    data() {
        return {
            message: "",
            messages: [],
            socket: null,
            username: '',
            hasUsername: false
        };
    },
    methods: {
        open(event) {
            //this.socket.send('Hello Server!');
        },
        receive(event) {
            let data = JSON.parse(event.data);
            console.log("Message from server ", data);
            if(data.type === 'message'){
                this.messages.push({
                    message: data.value.message,
                    isOwner: false,
                    username: data.value.username
                });
            }
            
        },
        sendMessage() {
            this.send({type: 'message', value: this.message});
            this.messages.push({
                message: this.message,
                isOwner: true,
                username: this.username
            });
            this.message = "";
        },
        sendUsername(){
            this.send({type: 'username', value: this.username});
            this.hasUsername = true;
        },
        send(data){
            this.socket.send(JSON.stringify(data));
        }

    },
    components: { Message }
};
</script>

<style scoped>
    .control.is-fullwidth {
        width: 100%;
    }
    .is-halfwidth {
        width: 50%;
    }
</style>