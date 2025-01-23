<template>
  <div class="header">
    <table>
      <tr class="header-title">
        <td>Income</td>
        <td>Expenses</td>
        <td>Total</td>
      </tr>
      <tr class="header-value">
        <td>{{ income }}</td>
        <td>{{ expenses }}</td>
        <td>{{ total }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    income: {
      type: Number,
      required: true,
    },
    expenses: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  methods: {
    
  },
};
</script>
<style scoped>
.header {
  position: fixed; 
  top: 20px; 
  right: 20px; 
  width: 600px; 
  height: 60px;
  border: none;
  border-radius: 15px; 
  background-color: #CDB599; 
  font-size: 14px; 
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.header table{
  width: 100%;
  border-collapse: collapse;
}

.header table td{
  text-align: center;
  padding: 5px;
}

.header-title{
  font-size: 14px;
}

.header-value{
  font-size: 18px;
}
</style>