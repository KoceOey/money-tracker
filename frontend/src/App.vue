<template>
  <body>
    <div id="app">
      <!-- Sidebar -->
      <div class="sidebar">
        <h2>Money Tracker</h2>
        <button @click="navigate('Home')">Home</button>
        <button @click="navigate('Transaction')">Transaction</button>
        <button @click="navigate('Accounts')">Accounts</button>
        <button @click="navigate('Settings')">Settings</button>
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
import SettingsSection from './components/SettingsSection.vue';
import HomeSection from './components/HomeSection.vue';

export default {
  data() {
    return {
      currentPage: 'Home', // Default page
      title: 'Home'
    };
  },
  methods: {
    navigate(page) {
      this.currentPage = page;
      this.title = page;
    },
  },
  components: {
    HomeSection,
    TransactionSection,
    SettingsSection,
    AccountsSection,
  },
};
</script>

<style>
body {
    margin: 0;
    height: 100%;
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
  background-color: #34495e;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  text-align: left;
  border-radius: 4px;
}

.sidebar button:hover {
  background-color: #1abc9c;
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