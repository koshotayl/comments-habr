const state = {
    contacts: [
        {
            id: 1,
            name: 'Koposov Vyacheslav',
            info: [
                {
                    name: "Email",
                    value: "s.koposek@gmail.com",
                    id: 1
                },
                {
                    name: 'Phone',
                    value: "+79042222222",
                    id: 2
                },
                {
                    name: "Country",
                    value: "Russian ",
                    id: 2
                },
                {
                    name: "City",
                    value: "Syktyvkar",
                    id: 3
                }
            ]
        },
        {
            id: 2,
            name: 'Jon Jons',
            info: [
                {
                    name: "Email",
                    value: "example@gmail.com",
                    id: 1
                },
                {
                    name: 'Phone',
                    value: "1111111",
                    id: 2
                },
                {
                    name: "Country",
                    value: "USA",
                    id: 2
                },
                {
                    name: "City",
                    value: "New York",
                    id: 3
                }
            ]
        },
    ],
    backUp: []
};

const getters = {
    allContacts: (state) => state.contacts,
    getContactById: (state) => (id) => state.contacts.find(x => x.id === id)
};

const actions = {
    async addContact({ commit }, name) { commit('addContact', name) },
    async deleteContact({ commit }, id) { commit('deleteContact', id) },
    async addInfo({ commit }, data) { commit('addInfo', data) },
    async removeInfo({ commit }, data) { commit('removeInfo', data) },
    async updateInfo({ commit }, data) { commit('updateInfo', data) },
    async revert({ commit }) { commit('revert') }
};
const mutations = {
    // Adds new contact to states
    addContact: (state, contact) => {
        let maxId = 0;
        if (state.contacts.length > 0)
            maxId = Math.max(...state.contacts.map(x => x.id));

        //No ref backup
        state.backUp = JSON.parse(JSON.stringify(state.contacts));
        return state.contacts.unshift({ id: maxId + 1, name: contact, info: [] });
    },
    //Deletes contact by ID
    deleteContact: (state, id) => {
        const index = state.contacts.findIndex(x => x.id === id);
        state.backUp = JSON.parse(JSON.stringify(state.contacts));
        return state.contacts.splice(index, 1);
    },
    //Adds new name,value to the contact by contact ID 
    addInfo: (state, { id, name, value }) => {
        const index = state.contacts.findIndex(x => x.id === id);
        let maxId = 1;
        if (state.contacts[index].info.length > 0)
            maxId = Math.max(...state.contacts[index].info.map(x => x.id));
        state.backUp = JSON.parse(JSON.stringify(state.contacts));
        return state.contacts[index].info.unshift({
            id: maxId + 1,
            name: name,
            value: value
        })
    },
    //Remove name,value  from contact by contact ID and Info ID
    removeInfo: (state, { contactId, infoId }) => {
        const index = state.contacts.findIndex(x => x.id === contactId);
        const indexInfo = state.contacts[index].info.findIndex(x => x.id === infoId);
        state.backUp = JSON.parse(JSON.stringify(state.contacts));
        return state.contacts[index].info.splice(indexInfo, 1);
    },
    // Update name,value from contact by contact ID and Info ID
    updateInfo: (state, { contractId, infoId, name, value }) => {
        const index = state.contacts.findIndex(x => x.id === contractId);
        const indexInfo = state.contacts[index].info.findIndex(x => x.id === infoId);

        state.backUp = JSON.parse(JSON.stringify(state.contacts));

        state.contacts[index].info[indexInfo] = {
            id: state.contacts[index].info[indexInfo].id,
            name: name,
            value: value
        }
        return state;
    },
    //Applies backup to current state
    revert: (state) => {
        if (state.backUp.length !== 0) state.contacts = [...state.backUp];
        return state
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}