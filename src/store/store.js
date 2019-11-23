import Vue from 'vue';
import Vuex from 'vuex';
import { ContactModule } from "./module/Contact.Module";



Vue.use(Vuex);
export const store = new Vuex.Store({
    modules: {
        ContactModule
    }
})

export default store;
