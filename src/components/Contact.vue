<template>
  <div class="contact">
    <!-- Modal -->
    <modal
      title="Удаление"
      message="Вы хотите удалить запись ?"
      :name="currentDelete['currentDeleteName']"
      @close="modalConfirm = false"
      @callback="removeContact"
      v-if="modalConfirm"
    />
    <!-- Modal -->
    <div class="container">
      <div class="row contact__add_create">
        <!-- Add new contanct form -->
        <form v-on:submit.prevent="onSubmit">
          <input
            class="contact__input__submit"
            type="submit"
            value="Add"
            style="float: right"
          />
          <div class="contact__input__name">
            <input v-model="name" type="text" placeholder="Contact name" />
          </div>
        </form>
        <!-- Add new contanct form -->
      </div>
      <div class="row">
        <div class="header_list">Contact list</div>
      </div>
      <div class="row mt-2">
        <!-- Contact List -->
        <ul class="contact_list">
          <li v-for="contact in allContacts" v-bind:key="contact.id">
            <!-- Name -->
            <router-link class="contact__link" :to="`contacts/${contact.id}`">
              {{ contact.name }}
            </router-link>
            <!-- Name -->
            <button @click="callModalConfirm(contact.id)" class="bad__btn">
              Remove
            </button>
          </li>
        </ul>
        <!-- Contact List -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Modal from "./Modal.vue";

export default {
  name: "contact",
  components: {
    Modal,
  },
  data() {
    return {
      name: "",
      modalConfirm: false,
      currentDelete: {
        currentDeleteName: "",
        idToDelete: 0,
      },
    };
  },
  methods: {
    ...mapActions(["addContact", "deleteContact"]),

    onSubmit: function () {
      if (!this.name) alert("Field is empty");
      else this.addContact(this.name);
      this.name = "";
    },
    callModalConfirm(id) {
      // Fills currentDelete and opened modal
      const name = this.allContacts.find((x) => x.id == id).name;
      this.currentDelete = { currentDeleteName: name, idToDelete: id };
      this.modalConfirm = true;
    },
    removeContact: function () {
      // Deletes contact from store
      this.deleteContact(this.currentDelete.idToDelete);
    },
  },
  computed: mapGetters(["allContacts"]),
};
</script>

<style scoped>
ul {
  padding-inline-start: 0px;
}

.container {
  display: block;
  width: 100%;
}

.contact__input__submit {
  margin-left: 10px;
  padding: 8px 20px;
  float: right;
  background-color: #9cc88d;
  border: none;
  font-size: 1.2rem;
  border: 2px solid transparent;
  outline: none;
  color: white;
}

.contact__input__submit:hover {
  border: 2px solid #9cc88d;
  color: #9cc88d;
  background-color: transparent;
  cursor: pointer;
  transition: 0.3s;
}

.contact__input__name {
  overflow: hidden;
  padding-right: 0.5em;
}

.contact__input__name input {
  overflow: hidden;
  padding-right: 0.5em;
  padding: 8px 20px;
  font-size: 1.2rem;
  width: 90%;
  outline: none;
  color: rgba(0, 0, 0, 0.7);
  border: 2px solid rgba(0, 0, 0, 0.5);
  outline: none;
}

.contact__input__name input:hover {
  border: 2px solid #9cc88d;
  transition: 0.33s;
}

.contact__input__name input:focus {
  border: 2px solid #9cc88d;
  transition: 0.33s;
}

.contact_list li {
  list-style-type: none;
  font-size: 1.5rem;
  border-bottom: 1px solid black;
  margin-bottom: 1em;
  padding: 1em;
}

.contact_list button {
  float: right;
  margin: 0px 5px 0px 5px;
}

.bad__btn {
  float: right;
  padding: 8px 20px;
  background-color: rgba(184, 15, 10, 0.85);
  border: none;
  font-size: 1.2rem;
  outline: none;
  color: white;
  border: 2px solid transparent;
}

.bad__btn:hover {
  cursor: pointer;
  transition: 0.3s;
  border: 2px solid rgba(184, 15, 10, 0.85);
  color: rgba(184, 15, 10, 0.85);
  background-color: transparent;
}

.header_list {
  margin-top: 1em;
  text-align: center;
  font-size: 1.5rem;
}

.row {
  overflow: hidden;
}

.contact {
  width: 600px;
  margin: 0 auto;
  margin-top: 15vh;
}

.contact__link {
  outline: none;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.8);
  transition: 0.3s;
}

.contact__link:hover {
  color:#0276FD	;
}
.mt-2 {
  margin-top: 2em;
}
</style>
