<template>
  <div class="header">
      <table>
        <tr>
          <td class="header-title">Total :</td>
          <td class="header-value">1000000</td>
        </tr>
      </table>
    </div>
</template>

<style scoped>
.header {
  position: fixed; 
  top: 20px; 
  right: 20px; 
  width: 300px; 
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
  padding: 5px;
}

.header-title{
  text-align: right;
  font-size: 20px;
}

.header-value{
  text-align: left;
  font-size: 20px;
}
</style>