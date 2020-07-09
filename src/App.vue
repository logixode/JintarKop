<template>
    <div id="app">
        <div v-if="loggedIn">
            <span>Logged in</span>
            <button @click="signOut">Sign out</button>
        </div>
        <div id="nav">
            <div v-if="isLoggedIn()">
                <router-link to="/">Home</router-link>|
                <router-link to="/about">About</router-link>|
                <router-link to="/register">Register New User</router-link>|
            </div>
        </div>
        <router-view />
    </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

// import TopHeader from "./components/TopHeader";

export default {
    data() {
        return {
            loggedIn: false
        };
    },
    created() {
        firebase.auth().onAuthStateChanged(user => {
            this.loggedIn = !!user;
        });
    },
    methods: {
        async signOut() {
            await firebase.auth().signOut();
            // .then((this.error = ""));
            // .catch(err => {
            //     this.error = err;
            //     // console.log(err);
            // });
            await this.$router.replace({ name: "Login" });
        },
        isLoggedIn() {
            return firebase.auth().currentUser;
        }
    }
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
