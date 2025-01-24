<template>
  <div id="accounts">
    <AccountsHeader :total="total"/>
    <div class="list" v-for="account in accounts" :key="account.account_id">
      <table>
        <tr>
          <td class="name">{{ account.account_name }}</td>
          <td class="desc">{{ account.description }}</td>
          <td class="amount">{{ account.balance }}</td>
          <!-- <td class="btn">
            <button>
              <img src="../assets/edit.png" alt="Edit">
            </button>
          </td>
          <td class="btn">
            <button>
              <img src="../assets/bin.png" alt="Delete">
            </button>
          </td> -->
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  import AccountsHeader from './AccountsHeader.vue';
  export default {
  data() {
    return {
      accounts: [],
      total: '',
    };
  },
  methods: {
    async fetchAccounts() {
      try {
        const response = await fetch("http://localhost:5000/accounts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        
        const data = await response.json();
        this.accounts = data;
        this.accounts.shift();
        console.log("Fetched Accounts");
        this.updateData();
      } catch (error) {
        console.error("Failed to fetch accounts:", error.message);
      }
    },
    updateData(){
      this.total = Number(0);
      this.accounts.forEach((account) => {
        this.total += Number(account.balance);
      });
    }
  },
  mounted() {
    // Fetch accounts when the component is mounted
    this.fetchAccounts();
  },
  components: {
    AccountsHeader,
  },
};
</script>
<style scoped>
/* Container for the transaction section */
#accounts {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Container for date sections */
.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #CDB599;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

table {
  width: 100%;
  border-collapse: collapse; /* Remove gaps between cells */
}

td {
  padding: 10px; /* Add padding inside cells */
}

.name{
  width: 20%;
  font-size: 22px;
}

.desc{
  text-align: left;
  font-size: 18px;
}

.amount{
  width: 20%;
  font-size: 22px;
  text-align: right;
}

.btn{
  width: 40px;
}

.btn button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
}

.btn button img {
  width: 30px;
  height: 30px;
}

.btn button:hover {
  opacity: 0.8; 
}
</style>