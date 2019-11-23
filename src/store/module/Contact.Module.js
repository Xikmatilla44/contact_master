import ContactService from "../service/Contact.Service";

const state = {

    table: [

        {
            firstName:'Xikmatilla',
            lastName:'Maxmudov',
            email: [{id: 0, value: 'Xikmatilla@mail.com', label: 'Home'}],
            phone:  [{id: 0, value: '+995845421', label: 'Other'}],
            address:  [{id: 0, value: 'Toshkent', label: 'Home'}]
        },
        {
            firstName:'Xikmatilla',
            lastName:'Maxmudov',
            email: [{id: 0, value: 'Xikmatilla@mail.com', label: 'Home'}],
            phone:  [{id: 0, value: '+995845421', label: 'Other'}],
            address:  [{id: 0, value: 'Toshkent', label: 'Home'}]
        },
        {
            firstName:'Xikmatilla',
            lastName:'Maxmudov',
            email: [{id: 0, value: 'Xikmatilla@mail.com', label: 'Home'}],
            phone:  [{id: 0, value: '+995845421', label: 'Other'}],
            address:  [{id: 0, value: 'Toshkent', label: 'Home'}]
        },
        {
            firstName:'Xikmatilla',
            lastName:'Maxmudov',
            email: [{id: 0, value: 'Xikmatilla@mail.com', label: 'Home'}],
            phone:  [{id: 0, value: '+995845421', label: 'Other'}],
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


}
const mutations = {

    PushtoStore(state, PushStatus){
        debugger
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
