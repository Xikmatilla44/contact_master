import ContactService from "../service/Contact.Service";

const state = {

    table: [

        {
            firstName:'Xikmatilla',
            lastName:'Maxmudov',
            email: [{id: 0, value: 'Xikmatilla@mail.com', label: 'Home'},{id: 1, value: 'Xikmatilla@mail.com', label: 'Home'}, ],
            phone:  [{id: 0, value: '+998997204575', label: 'Other'}],
            address:  [{id: 0, value: 'Toshkent', label: 'Home'}]
        },
        {
            firstName:'Shaxzodbek',
            lastName:'Xasanov',
            email: [{id: 0, value: 'Shaxzodbek@mail.com', label: 'Home'}],
            phone:  [{id: 0, value: '+9958454216589', label: 'Other'}],
            address:  [{id: 0, value: 'Toshkent', label: 'Home'}]
        },

    ],

    listStatus: ['Salom', 'Malaip'],

};
const getters = {}

const actions = {


    async PushCreate({commit}) {
        const  res =  await ContactService.pushCreateService(this.state.ContactModule.table);
        commit('CreateToStore', res);
    },



    async PushLocalStore({commit}, payloads) {
        const  resPush =  await ContactService.pushLocalService(payloads);
        commit('PushtoStore', resPush);
    },

    async EditeLocalStore({commit},payloads) {
        // debugger
        const  res=  await ContactService.editeService(payloads.index, payloads.payload);
        commit('EditetoStore', res);
    },

    async DeleteLocalStore({commit}, index) {
        // debugger
        const  res =  await ContactService.deleteService(index);
        commit('DeletetoStore', res);
    },

    async SeachLocalStore({commit}, payload) {
        // debugger
        const  res =  await ContactService.searchService(payload);
        commit('SeachtoStore', res);
    },


}
const mutations = {


    SeachtoStore(state, res){
        // debugger
        state.table = res;
    },



    DeletetoStore(state, res){
        // debugger
        state.table = res;
    },


    EditetoStore(state, res){
        // debugger
        state.table = res;
    },

    PushtoStore(state, PushStatus){
        // debugger
        state.table = PushStatus;
    },

    CreateToStore(state, Push){

        state.table = Push;
    },

}

export const ContactModule = {

    namespaced: true,
    state,
    actions,
    mutations,
    getters


};
