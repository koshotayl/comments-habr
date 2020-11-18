<template>
  <div class="modal">
    <div class="screenFiller">
      <div class="message">
        <div class="inner">
          <h3>{{ title }}</h3>
          <p class="mt-2">{{ message }}</p>
          <div class="name">
            <p class="mt-2 name">{{ name }}</p>
          </div>
          <div class="mt-5 buttons">
            <button @click="callbackAndClose" class="yes">YES</button>
            <button @click="$emit('close')" class="no">NO</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "modal",
  props: {
    title: String,
    message: String,
    name: String,
  },
  methods: {
    callbackAndClose() {
      this.$emit("callback");
      this.$emit("close");
    },
  },
};
</script>
<style scoped>
.screenFiller {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.4);
}
.message {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 30em;
  height: 18em;
  margin-top: -9em; /*set to a negative number 1/2 of your height*/
  margin-left: -15em; /*set to a negative number 1/2 of your width*/
  border: 1px solid #ccc;
  background-color: #f3f3f3;
  -webkit-box-shadow: 5px 5px 22px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 5px 5px 22px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 5px 5px 22px 0px rgba(0, 0, 0, 0.75);
  text-align: center;
}
.mt-2 {
  margin-top: 2em;
}
.mt-5 {
  padding-top: 2em;
}
.yes {
  float: left;
  padding: 10px 20px;
  background-color: rgba(184, 15, 10, 1);
  border: none;
  outline: none;
  font-weight: bold;
  color: wheat;
  border: 2px solid transparent;
}

.yes:hover {
  cursor: pointer;
  border: 2px solid rgba(184, 15, 10, 1);
  background-color: transparent;
  color: rgba(184, 15, 10, 1);
  transition: 0.3s;
}
.no {
  float: right;
  padding: 10px 20px;
  background-color: #9cc88d;
  border: none;
  outline: none;
  font-weight: bold;
  border: 2px solid transparent;
}
.no:hover {
  cursor: pointer;
  border: 2px solid #9cc88d;
  background-color: transparent;
  color: #9cc88d;
  transition: 0.3s;
}
.inner {
  padding: 3em 5em;
  padding-top: 1em;
}
.name {
  font-size: 1.3rem;
  font-weight: bold;
}
</style>