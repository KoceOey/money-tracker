<template>
  <div id="accounts">
    <AddButton :currentPage="currentPage"/>
    <AccountsHeader/>
    <div class="list">
      <table>
        <tr>
          <td class="name">Account Name</td>
          <td class="desc">Description</td>
          <td class="amount">1000000</td>
          <td class="btn">
            <button>
              <img src="../assets/edit.png" alt="Edit">
            </button>
          </td>
          <td class="btn">
            <button>
              <img src="../assets/bin.png" alt="Delete">
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  import AccountsHeader from './AccountsHeader.vue';
  import AddButton from './AddButton.vue';
  export default {
  data() {
    return {
      currentPage: "Accounts"
    };
  },
  methods: {

  },
  components: {
    AccountsHeader,
    AddButton
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