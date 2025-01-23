<template>
  <body>
    <div id="app">
      <!-- Sidebar -->
      <div class="sidebar">
        <h2>Money Tracker</h2>
        <button @click="navigate('Transaction')">Transaction</button>
        <button @click="navigate('Accounts')">Accounts</button>
      </div>

      <!-- Main Content -->
      <div class="main-content">
        <h1>{{ title }} Page</h1>
        <HomeSection v-if="currentPage === 'Home'" />
        <TransactionSection v-if="currentPage === 'Transaction'" />
        <AccountsSection v-if="currentPage === 'Accounts'" />
        <SettingsSection v-if="currentPage === 'Settings'" />
      </div>
    </div>
  </body>
</template>

<script>
// Import components for each page
import TransactionSection from './components/TransactionSection.vue';
import AccountsSection from './components/AccountsSection.vue';

export default {
  data() {
    return {
      currentPage: 'Transaction', // Default page
      title: 'Transaction'
    };
  },
  methods: {
    navigate(page) {
      this.currentPage = page;
      this.title = page;
    },
  },
  components: {
    TransactionSection,
    AccountsSection,
  },
};
</script>

<style>
body {
    margin: 0;
    height: 100%;
}

h2{
  font-size: 32px;
}

#app {
  width: 100vw;
  margin: 0;
  padding: 0px;
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
}

/* Sidebar styling */
.sidebar {
  width: 20%;
  background-color: #967B6B;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.sidebar h2 {
  margin-bottom: 20px;
}

.sidebar button {
  background-color: #967B6B;
  color: white;
  border: none;
  border-bottom: 3px solid #CDB599;
  padding: 10px;
  cursor: pointer;
  font-size: 24px;
  text-align: left;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.sidebar button:hover {
  background-color: #CDB599;
  color:black;
}

/* Main content styling */
.main-content {
  flex-grow: 1;
  padding: 20px;
  background-color: #F9E6C0;
}

.main-content h1 {
  margin-bottom: 20px;
}
</style>