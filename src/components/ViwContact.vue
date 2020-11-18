<template>
  <div class="vieContact">
    <div v-if="contact" class="container">
      <!-- Delete modal -->
      <modal
        title="Deletion"
        message="Do you want to delete record ?"
        :name="deleteModal.currentDeleteName"
        @close="deleteModal.modalOpened = false"
        @callback="deleteInfo"
        v-if="deleteModal.modalOpened"
      />
      <!-- Delete modal -->

      <!-- Edit modal -->

      <modal
        title="Editing"
        message="Do you want to revert changes ?"
        name=""
        @close="revertConfirmModal = false"
        @callback="revertEdit"
        v-if="revertConfirmModal"
      />
      <!-- Edit modal -->

      <!-- Back button -->
      <div class="row btn__back">
        <button @click="$router.back()">
          <font-awesome-icon icon="arrow-left" />
          Back
        </button>
      </div>

      <!-- Back button -->

      <!-- Header and revert buutton -->
      <div class="row header__name">
        <h2>{{ contact.name }}</h2>
        <button @click="revert" style="float: right" class="action edit">
          <font-awesome-icon icon="undo" />
          Undo
        </button>
      </div>
      <!-- Header and revert buutton -->

      <!-- Form to add info -->
      <div class="row text-center">
        <form v-on:submit.prevent="onSubmit" class="w-100 mt-2">
          <!-- Add btn-->
          <input class="contact__input__submit" type="submit" value="Add" />
          <!-- Add btn-->

          <div class="contact__input__name">
            <!-- Name input-->
            <input
              class="contact__input__key"
              v-model="name"
              type="text"
              placeholder="Name"
            />
            <!-- Name input-->

            <!-- Value input-->
            <input
              class="contact__input__value"
              v-model="value"
              type="text"
              placeholder="Value"
            />
            <!-- Value input-->
          </div>
        </form>
      </div>
      <!-- Form to add info -->

      <!-- Table with values -->

      <div class="row text-center mt-2">
        <table>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
          <!-- V-for items -->
          <tr v-for="item in contact.info" v-bind:key="item.id">
            <!-- Edit mode name-->
            <td v-if="item.id === editModal.editRowId">
              <input class="edit__input" v-model="editModal.editRowName" />
            </td>
            <!-- Edit mode name -->

            <!-- Read mode name -->
            <td v-else>{{ item.name }}</td>
            <!-- Read mode name -->

            <!-- Edit mode value-->
            <td v-if="item.id === editModal.editRowId">
              <input class="edit__input" v-model="editModal.editRowValue" />
            </td>
            <!-- Edit mode value-->

            <!-- Read mode value-->
            <td v-else>{{ item.value }}</td>
            <!-- Read mode value-->

            <td>
              <!-- Edit mode actions-->

              <div v-if="item.id === editModal.editRowId">
                <button @click="save" class="action edit">
                  <font-awesome-icon icon="save" />
                  Save
                </button>
                <button @click="revertConfirmModal = true" class="action edit">
                  <font-awesome-icon icon="undo" />
                  Undo
                </button>
              </div>
              <!-- Edit mode actions-->

              <!-- Read mode actions-->

              <div v-else>
                <button @click="editRow(item.id)" class="action edit">
                  <font-awesome-icon icon="edit" />
                  Edit
                </button>

                <button @click="openDeleteModal(item.id)" class="action trash">
                  <font-awesome-icon icon="trash" />
                  Delete
                </button>
              </div>
              <!-- Read mode actions-->
            </td>
          </tr>
          <!-- V-for items -->
        </table>
      </div>
      <!-- Table with values -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Modal from "./Modal.vue";

export default {
  name: "vieContact",
  components: {
    Modal,
  },
  props: ["id"],
  data() {
    return {
      name: "",
      value: "",
      revertConfirmModal: false,

      editModal: {
        editRowId: undefined,
        editRowName: "",
        editRowValue: "",
      },
      deleteModal: {
        modalOpened: false,
        currentDeleteName: "",
        currentDeleteId: undefined,
      },
    };
  },
  methods: {
    ...mapActions(["addInfo", "removeInfo", "updateInfo", "revert"]),
    onSubmit() {
      if (!this.name || !this.value) alert("One of the fields is empty");
      else {
        this.addInfo({
          id: this.id,
          name: this.name,
          value: this.value,
        });
        this.name = "";
        this.value = "";
      }
    },
    revertEdit() {
      //Disable edit mode
      this.editModal.editRowId = undefined;
    },
    save() {
      // Updates edit
      this.updateInfo({
        contractId: this.id,
        infoId: this.editModal.editRowId,
        name: this.editModal.editRowName,
        value: this.editModal.editRowValue,
      });
      this.editModal.editRowId = undefined;
    },
    // Enable edit mode
    editRow(infoId) {
      if (this.editModal.editRowId === infoId)
        this.editModal.editRowId = undefined;
      else {
        this.editModal.editRowId = infoId;
        const value = this.contact.info.find((x) => x.id === infoId);
        this.editModal.editRowName = value.name;
        this.editModal.editRowValue = value.value;
      }
    },
    // Openes delete modal for confirm
    openDeleteModal(infoId) {
      const value = this.contact.info.find((x) => x.id === infoId);
      this.deleteModal = {
        modalOpened: true,
        currentDeleteName: `${value.name} - ${value.value}`,
        currentDeleteId: infoId,
      };
    },
    //Callback from modal to be executed if YES
    deleteInfo() {
      this.removeInfo({
        contactId: this.id,
        infoId: this.deleteModal.currentDeleteId,
      });
    },
  },
  computed: {
    ...mapGetters(["getContactById"]),
    contact() {
      return this.getContactById(this.id);
    },
  },
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin: auto;
  table-layout: fixed;
}

td,
th {
  border: 1px solid #dddddd;
  padding: 20px 10px;
  text-align: center;
  overflow: hidden;
}

tr:nth-child(even) {
  background-color: #9cc88d;
}

.container {
  display: block;
  width: 100%;
}

.contact__input__submit {
  float: right;
  margin-left: 10px;
  padding: 8px 20px;
  float: right;
  background-color: #9cc88d;
  border: none;
  font-size: 1.2rem;
  border: 2px solid transparent;
  outline: none;
  color: white;
  width: 33%;
}

.contact__input__submit:hover {
  border: 2px solid #9cc88d;
  cursor: pointer;
  color: #9cc88d;
  background-color: transparent;
  transition: 0.33s;
}

.contact__input__name {
  overflow: hidden;
  padding-right: 0.5em;
}

.contact__input__name input {
  padding: 8px 20px;
  font-size: 1.1rem;
  width: 33%;
  color: rgba(0, 0, 0, 0.7);
  border: 2px solid rgba(0, 0, 0, 0.5);
  outline: none;
}

.contact__input__name input:focus {
  border: 2px solid #9cc88d;
  transition: 0.33s;
}

.bad_btn {
  float: right;
  padding: 10px 15px 10px 15px;
  background-color: rgba(184, 15, 10, 0.85);
  border: none;
  font-size: 1.2rem;
  outline: none;
  color: white;
  border: 2px solid transparent;
}

.bad_btn:hover {
  cursor: pointer;
  transition: 0.3s;
  border: 2px solid rgba(0, 0, 0, 0.6);
}

.row {
  overflow: hidden;
  width: 80%;
  margin: auto;
}

.btn__back {
  margin-top: 1em;
  margin-left: 1em;
}

.btn__back button {
  padding: 5px 10px;
  cursor: pointer;
}

.header__name {
  text-align: center;
  margin-top: 2em;
}

.text-center {
  text-align: center;
}

.w-100 {
  width: 100%;
}

.contact__input__key {
  float: left;
}

.contact__input__value {
  float: right;
  width: 50% !important;
}

.mt-2 {
  margin-top: 2em;
}

.action {
  padding: 0.3em;
  cursor: pointer;
  margin-right: 0.5em;
  margin-left: 0.5em;
}

.edit__input {
  width: 75% !important;
  padding: 3px 5px;
  font-size: 0.9rem;
  width: 33%;
  color: rgba(0, 0, 0, 0.7);
  border: 2px solid rgba(0, 0, 0, 0.5);
  outline: none;
}
</style>
