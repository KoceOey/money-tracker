<template>
  <div id="transaction">
    <AddButton @refresh-page="fetchTransactions"/>
    <TransactionHeader :income="income" :expenses="expenses" :total="total"/>
    <TransactionForm :form-type="2" :tr_id="tr_id" v-if="this.updating" @update-variable="closed"/>
    <div class="dates" v-for="(transactions, date) in transactions_by_dates" :key="date">
      <h2 class="date">{{ date }}</h2>
      <div class="trans" v-for="transaction in transactions" :key="transaction.transaction_id">
        <table>
          <tr>
            <td rowspan="2" class="tr-cat">{{ transaction.category.category }}</td>
            <td class="tr-desc">{{ transaction.description }}</td>
            <td rowspan="2" class="tr-amount" v-if="transaction.trtype_id == 1" style="color: blue;">{{ transaction.amount }}</td>
            <td rowspan="2" class="tr-amount" v-if="transaction.trtype_id == 2" style="color: red;">{{ transaction.amount }}</td>
            <td rowspan="2" class="tr-amount" v-if="transaction.trtype_id == 3" style="color: black;">{{ transaction.amount }}</td>
            <td rowspan="2" class="tr-btn">
              <button @click="editTransaction(transaction.transaction_id)">
                <img src="../assets/edit.png" alt="Edit">
              </button>
            </td>
            <td rowspan="2" class="tr-btn">
              <button @click="deleteTransaction(transaction.transaction_id)">
                <img src="../assets/bin.png" alt="Delete">
              </button>
            </td>
          </tr>
          <tr>
            <td class="tr-acc" v-if="transaction.trtype_id == 1">{{ transaction.toAccount.account_name }}</td>
            <td class="tr-acc" v-if="transaction.trtype_id == 2">{{ transaction.fromAccount.account_name }}</td>
            <td class="tr-acc" v-if="transaction.trtype_id == 3">{{ transaction.fromAccount.account_name }} -> {{ transaction.toAccount.account_name }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  import TransactionHeader from './TransactionHeader.vue';
  import AddButton from './AddButton.vue';
  import TransactionForm from './TransactionForm.vue';
  export default {
  data() {
    return {
      currentPage: "Transaction",
      transactions: [],
      transactions_by_dates: {},
      income: Number(0), 
      expenses: Number(0), 
      total: Number(0), 
      tr_id: 0,
      updating: false,
      deleting: false
    };
  },
  methods: {
    async fetchTransactions() {
      try {
        const response = await fetch("http://localhost:5000/transactions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        
        const data = await response.json();
        this.transactions = data;
        console.log("Fetched Transactions");
        this.groupTransactionsByDate();
        this.updateData();
      } catch (error) {
        console.error("Failed to fetch transactions:", error.message);
      }
    },
    groupTransactionsByDate() {
      this.transactions_by_dates = this.transactions.reduce((acc, transaction) => {
        const date = transaction.tr_date.split("T")[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(transaction);
        return acc;
      }, {});
    },
    editTransaction(tr_id){
      this.tr_id = tr_id;
      this.updating = true;
    },
    closed(updating){
      this.updating = updating;
      this.fetchTransactions();
    },
    async deleteTransaction(tr_id){
      try {
        const response = await fetch(`http://localhost:5000/transactions/` + tr_id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        
        await response.json();
        console.log("Transaction Deleted");
        this.fetchTransactions();
      } catch (error) {
        console.error("Failed to delete transaction:", error.message);
      }
    },
    updateData(){
      this.income = Number(0);
      this.expenses = Number(0);
      this.transactions.forEach((transaction) => {
        if(transaction.trtype_id == 1){
          this.income += Number(transaction.amount);
        }else if(transaction.trtype_id == 2){
          this.expenses += Number(transaction.amount);
        }
      });
      this.total = this.income - this.expenses;
    }
  },
  mounted() {
    // Fetch transactions when the component is mounted
    this.fetchTransactions();
  },
  components: {
    TransactionHeader,
    AddButton,
    TransactionForm,
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
  font-size: 22px;
}

.tr-desc{
  font-size: 18px;
}

.tr-amount{
  font-size: 22px;
  width: 20%;
}

.tr-acc{
  font-style: bold;
  opacity: 40%;
}

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
</style>