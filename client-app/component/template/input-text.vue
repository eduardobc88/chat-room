<template lang="html">
  <div
    v-bind:class="{
      'input-wrapper': true,
      focus: hasFocus,
      'no-empty': hasText,
    }"
  >
    <label>
      {{ inputName }}
    </label>
    <input
      v-bind:type="inputType"
      v-on:focus="focus"
      v-on:blur="focus"
      v-model="value"
      v-on:keyup.enter="onKeyEnter"
    />
  </div>
</template>

<script>
export default {
  props: [
    'inputValue',
    'inputName',
    'onChangeValue',
    'inputType',
    'propName',
    'onKeyEnter',
  ],
  data() {
    return {
      hasFocus: false,
      hasText: false,
    }
  },
  computed: {
    value: {
      get() {
        this.hasText = false
        if (this.inputValue) this.hasText = true
        return this.inputValue
      },
      set(newVal) {
        this.onChangeValue(this.propName, newVal)
      },
    },
  },
  methods: {
    focus: function() {
      if (this.hasFocus) {
        this.hasFocus = false
        return
      }
      this.hasFocus = true
    },
  },
}
</script>

<style scoped lang="css">
.input-wrapper {
  background-color: transparent;
  margin-top: 25px;
  position: relative;
}
.input-wrapper label {
  background-color: transparent;
  color: #616161;
  font-size: 13px;
  font-weight: 500;
  pointer-events: none;
  position: absolute;
  top: 5px;
  transition-duration: 100ms;
}
.input-wrapper input {
  background: transparent;
  border-bottom: 1px solid #616161;
  border-top: none;
  border-left: none;
  border-right: none;
  box-sizing: border-box;
  caret-color: #607d8b;
  color: #616161;
  font-size: 13px;
  font-weight: 500;
  margin: 0;
  outline: none;
  padding-bottom: 5px;
  width: 100%;
}
.input-wrapper.focus label {
  color: #607d8b;
  top: -15px;
}
.input-wrapper.focus input {
  border-bottom: 1px solid #607d8b;
}
.input-wrapper.no-empty label {
  top: -15px;
}
</style>
