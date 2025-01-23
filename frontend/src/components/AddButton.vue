<template>
  <button @click="clicked()" class="floating-button">+</button>
  <TransactionForm v-if="this.pressed && this.currentPage === 'Transaction'" @update-variable="closed"/>
</template>
<script>
import TransactionForm from './TransactionForm.vue';
export default {
  data(){
    return{
      pressed: false
    }
  },
  props: {
    currentPage: {
      type: String,
      required: true,
    },
  },
  components: {
    TransactionForm
  },
  methods: {
    clicked() {
      this.pressed = true;
    },
    closed(press) {
      this.pressed = press;
    }
  },
};
</script>
<style scoped>
.floating-button {
  position: fixed; 
  bottom: 20px; 
  right: 20px; 
  width: 60px; 
  height: 60px;
  border: none;
  border-radius: 50%; 
  background-color: #644147; 
  color: white;
  font-size: 24px; 
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.floating-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}
</style>