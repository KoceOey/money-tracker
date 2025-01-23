<template>
  <div id="transaction">
    <AddButton :currentPage="currentPage"/>
    <TransactionHeader/>
    <div class="dates">
      <h2 class="date">1</h2>
      <div class="trans">
        <table>
          <tr>
            <td rowspan="2" class="tr-cat">Category</td>
            <td class="tr-desc">Description</td>
            <td rowspan="2" class="tr-amount">Amount</td>
            <td rowspan="2" class="tr-btn">
              <button>
                <img src="../assets/edit.png" alt="Edit">
              </button>
            </td>
            <td rowspan="2" class="tr-btn">
              <button>
                <img src="../assets/bin.png" alt="Delete">
              </button>
            </td>
          </tr>
          <tr>
            <td class="tr-acc">Accounts</td>
          </tr>
        </table>
      </div>
      <div class="trans">
        <table>
          <tr>
            <td rowspan="2" class="tr-cat">Category</td>
            <td class="tr-desc">Description</td>
            <td rowspan="2" class="tr-amount">Amount</td>
            <td rowspan="2" class="tr-btn">
              <button>
                <img src="../assets/edit.png" alt="Edit">
              </button>
            </td>
            <td rowspan="2" class="tr-btn">
              <button>
                <img src="../assets/bin.png" alt="Delete">
              </button>
            </td>
          </tr>
          <tr>
            <td class="tr-acc">Accounts</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  import TransactionHeader from './TransactionHeader.vue';
  import AddButton from './AddButton.vue';
  export default {
  data() {
    return {
      currentPage: "Transaction"
    };
  },
  methods: {

  },
  components: {
    TransactionHeader,
    AddButton
  },
};
</script>
<style scoped>
/* Container for the transaction section */
#transaction {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Container for date sections */
.dates {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #CDB599;
  border-radius: 15px;
  padding: 20px;
}

.date{
  margin: 0;
}

/* Individual transaction style */
.trans {
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* Hover effect for transaction boxes */
.trans:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

table {
  width: 100%;
  border-collapse: collapse;
}

td {
  padding: 10px; /* Add padding inside cells */
}

.tr-cat{
  width: 20%;
}

/* .tr-desc{
  
} */

.tr-amount{
  width: 20%;
}

/* .tr-acc{
  
} */

.tr-btn{
  width: 40px;
}

.tr-btn button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
}

.tr-btn button img {
  width: 30px;
  height: 30px;
}

.tr-btn button:hover {
  opacity: 0.8; 
}

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