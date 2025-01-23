<template>
  <div class="modal" v-if="currentForm">
    <div class="modal-overlay" @click="closeForm"></div>
    <div class="modal-content">
      <button class="close-button" @click="closeForm">&times;</button>

      <!-- Buttons -->
      <div class="button-group" v-if="formType!==2">
        <button 
          v-for="btn in buttons" 
          :key="btn.value" 
          :class="{'active': currentForm === btn.value}" 
          @click="showForm(btn.value)"
        >
          {{ btn.label }}
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="date">Date:</label>
          <input type="date" id="date" v-model="formData.tr_date" required />
        </div>
        
        <div class="form-group">
          <label for="amount">Amount:</label>
          <input type="number" step="0.01" id="amount" v-model="formData.amount" required />
        </div>

        <div class="form-group" v-if="this.currentForm === 'expenses' || this.currentForm === 'income'" >
          <label for="category">Category:</label>
          <select id="category" v-model="formData.trcategory_id" required>
            <option value="">Select a category</option>
            <option v-for="cat in categories" :key="cat.trcategory_id" :value="cat.trcategory_id">{{ cat.category }}</option>
          </select>
        </div>

        <div class="form-group" v-if="this.currentForm === 'expenses' || this.currentForm === 'transfer'">
          <label for="accountsFrom">From Accounts:</label>
          <select id="accountsFrom" v-model="formData.from_account_id" required>
            <option value="">Select an account</option>
            <option v-for="acc in accounts" :key="acc.account_id" :value="acc.account_id">{{ acc.account_name }}</option>
          </select>
        </div>

        <div class="form-group" v-if="this.currentForm === 'income' || this.currentForm === 'transfer'">
          <label for="accountsTo">To Accounts:</label>
          <select id="accountsTo" v-model="formData.to_account_id" required>
            <option value="">Select an account</option>
            <option v-for="acc in accounts" :key="acc.account_id" :value="acc.account_id">{{ acc.account_name }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="description">Description:</label>
          <textarea id="description" v-model="formData.description" rows="3"></textarea>
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttons: [
        { label: "Income", value: "income"},
        { label: "Expenses", value: "expenses"},
        { label: "Transfer", value: "transfer"}
      ],
      currentForm: "",
      formData: {
        trtype_id: "",
        from_account_id: "",
        to_account_id: "",
        trcategory_id: "",
        tr_date: "",
        amount: "",
        description: "",
      },
      categories: [],
      accounts: [],
      endpoint: '',
      apiMethod: '',
    };
  },
  props: {
    formType: {
      type: Number,
    },
    tr_id: {
      type: Number,
    }
  },
  methods: {
    showForm(form) {
      this.currentForm = form;
      if(form == "income"){
        this.formData.trtype_id = 1;
      }else if(form == "expenses"){
        this.formData.trtype_id = 2;
      }else{
        this.formData.trtype_id = 3;
      }
      this.fetchCategories();
    },
    closeForm() {
      this.currentForm = null;
      this.$emit('update-variable',false);
      this.resetForm();
    },
    async submitForm() {
      try {
        if (this.formType == 1) {
          this.endpoint = "http://localhost:5000/transactions";
          this.apiMethod = "POST";
        } else {
          this.endpoint = "http://localhost:5000/transactions/" + this.tr_id;
          this.apiMethod = "PUT";
        }

        // Create FormData object
        const formData = new FormData();
        for (const key in this.formData) {
          if (this.formData[key] !== null && this.formData[key] !== "") {
            formData.append(key, this.formData[key]);
          }
        }

        const response = await fetch(this.endpoint, {
          method: this.apiMethod,
          body: formData, // Use FormData directly
        });

        if (!response.ok) {
          throw new Error("Failed to submit form");
        }

        await response.json();
        alert("Form submitted successfully!");
        this.closeForm();
      } catch (error) {
        alert("Error: " + error.message);
      }
    },
    resetForm() {
      this.formData = {
        trtype_id: "",
        from_account_id: "",
        to_account_id: "",
        trcategory_id: "",
        tr_date: "",
        amount: "",
        description: "",
      };
    },
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
      } catch (error) {
        console.error("Failed to fetch accounts:", error.message);
      }
    },
    async fetchCategories() {
      try {
        const response = await fetch(`http://localhost:5000/trcat/` + this.formData.trtype_id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        
        const data = await response.json();
        this.categories = data;
        console.log("Fetched Categories");
      } catch (error) {
        console.error("Failed to fetch categories:", error.message);
      }
    },
    async fetchTransaction(){
      try {
        const response = await fetch(`http://localhost:5000/transactions/` + this.tr_id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        
        const data = await response.json();
        this.formData.trtype_id = data.type.trtype_id;
        this.formData.from_account_id = data.fromAccount.account_id;
        this.formData.to_account_id = data.toAccount.account_id;
        this.formData.trcategory_id = data.category.trcategory_id;
        this.formData.tr_date = data.tr_date.split("T")[0];
        this.formData.amount = data.amount;
        this.formData.description = data.description;
        if(data.type.trtype_id == 1){
          this.showForm("income");
          document.getElementById("accountsTo").value = data.toAccount.account_id;
          document.getElementById("category").value = data.category.trcategory_id;
        } else if(data.type.trtype_id == 2){
          this.showForm("expenses");
          document.getElementById("accountsFrom").value = data.fromAccount.account_id;
          document.getElementById("category").value = data.category.trcategory_id;
        } else {
          this.showForm("transfer");
          document.getElementById("accountsTo").value = data.toAccount.account_id;
          document.getElementById("accountsFrom").value = data.fromAccount.account_id;
        }
        console.log("Fetched Categories");
      } catch (error) {
        console.error("Failed to fetch categories:", error.message);
      }
    }
  },
  mounted(){
    this.fetchAccounts();
    if(this.formType == 2){
      this.fetchTransaction();
    } else {
      this.showForm('expenses');
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.modal-content {
  position: relative;
  background: #E0C99E;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
  width: 90%;
  max-width: 500px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.button-group button {
  padding: 10px 20px;
  margin: 0 5px;
  border: 2px solid #967B6B;
  background-color: #F9E6C0;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.button-group button.active {
  background-color: #967B6B;
  color: white;
}

.button-group button:hover {
  background-color: #967B6B;
  color: white;
}

.form-group {
  margin-bottom: 15px;
  width: 450px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input, 
.form-group select, 
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 3px solid #967B6B;
  font-size: 16px;
  background-color: #E0C99E;
}

.form-group select {
  appearance: none;
  width: 470px;
}

.form-group select:focus {
  outline: none;
  border-color: #967B6B;
}

.form-group input:focus {
  outline: none;
  background-color: #E0C99E;
}

button[type="submit"] {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #967B6B;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #967B6B;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
