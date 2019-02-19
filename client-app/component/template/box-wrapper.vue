<template lang="html">
  <div id="box-wrapper">
    <slot> </slot>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="css">
#box-wrapper {
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 0px 0 #e0e0e0, 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-right: 10px;
  margin: 50px auto 10px auto;
  max-width: 1024px;
  padding: 10px;
  width: calc(100% - 40px);
  z-index: 1;
}
</style>
