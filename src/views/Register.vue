<template>
    <div>
        <h1>Register</h1>
        <div v-if="error" class="error">{{ error.message }}</div>
        <form @submit.prevent="pressed">
            <div>
                <input v-model="email" type="email" name="email" placeholder="email" />
            </div>
            <div>
                <input v-model="password" type="password" name="password" placeholder="password" />
            </div>
            <div>
                <button type="submit">Register</button>
            </div>
        </form>
    </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
    methods: {
        async pressed() {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then((this.error = ""))
                .catch(err => {
                    this.error = err;
                    // console.log(err);
                });
            if (this.error == "") {
                await this.$router.replace({ name: "Home" });
            }
        }
    },
    data() {
        return {
            email: "",
            password: "",
            error: ""
        };
    }
};
</script>

<style lang="scss" scoped>
</style>