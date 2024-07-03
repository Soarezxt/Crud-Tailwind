<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Clientes Cadastrados</h2>
    
    <!-- Botão para Cadastrar Cliente -->
    <button @click="openModal(true)" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mb-4">
      Cadastrar Cliente
    </button>

    <!-- Tabela de usuários existente -->
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Idade</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="user in users" :key="user.id">
          <td class="px-6 py-4 whitespace-nowrap">{{ user.id }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ user.nome }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ user.idade }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ user.cpf }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <button @click="openModal(false, user)" class="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded-md mr-2">
              Editar
            </button>
            <button @click="deleteUser(user.id)" class="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md">
              Deletar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal UserForm.vue -->
    <UserForm v-if="showModal" :user="selectedUser" :is-new="isNewUser" @save="saveUser" @close="closeModal" />

  </div>
</template>

<script>
import axios from 'axios';
import UserForm from './UserForm.vue';

export default {
  components: {
    UserForm,
  },
  data() {
    return {
      users: [],
      selectedUser: null,
      showModal: false,
      isNewUser: true,
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios.get('http://localhost:3000/pessoas')
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.error('Erro ao carregar usuários:', error);
        });
    },
    openModal(isNew, user = null) {
      this.isNewUser = isNew;
      if (isNew) {
        this.selectedUser = { nome: '', idade: '', cpf: '', email: '' };
      } else {
        this.selectedUser = { ...user };
      }
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedUser = null;
    },
    saveUser(user) {
      if (this.isNewUser) {
        // Criar novo usuário
        axios.post('http://localhost:3000/pessoas', user)
          .then(response => {
            console.log('Usuário criado com sucesso:', response.data);
            this.fetchUsers();
          })
          .catch(error => {
            console.error('Erro ao criar usuário:', error);
          });
      } else {
        // Atualizar usuário existente
        axios.put(`http://localhost:3000/pessoas/${user.id}`, user)
          .then(response => {
            console.log('Usuário atualizado com sucesso:', response.data);
            this.fetchUsers();
          })
          .catch(error => {
            console.error('Erro ao atualizar usuário:', error);
          });
      }
      this.closeModal();
    },
    deleteUser(userId) {
      axios.delete(`http://localhost:3000/pessoas/${userId}`)
        .then(response => {
          console.log('Usuário deletado com sucesso:', response.data);
          this.fetchUsers();
        })
        .catch(error => {
          console.error('Erro ao deletar usuário:', error);
        });
    },
  },
};
</script>

<style scoped>
.text-xl {
    font-size: 2.10rem /* 20px */;
    line-height: 1.75rem /* 28px */;
    align-items: left;
    justify-content: left;
}
.font-semibold {
    font-weight: 600;
}
.bg-green-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(34 197 94 / var(--tw-bg-opacity)) /* #22c55e */;
}
.hover\:bg-green-600:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(22 163 74 / var(--tw-bg-opacity)) /* #16a34a */;
}
.text-white {
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity)) /* #ffffff */;
}
.py-2 {
    padding-top: 0.5rem /* 8px */;
    padding-bottom: 0.5rem /* 8px */;
}
.px-4 {
    padding-left: 1rem /* 16px */;
    padding-right: 1rem /* 16px */;
}
.rounded-md {
    border-radius: 0.375rem /* 6px */;
}
.mb-4 {
    margin-bottom: 1rem /* 16px */;
}
.min-w-full {
    min-width: 100%;
}
.divide-y > :not([hidden]) ~ :not([hidden]) {
    --tw-divide-y-reverse: 0;
    border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
    border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
}
.divide-gray-200 > :not([hidden]) ~ :not([hidden]) {
    --tw-divide-opacity: 1;
    border-color: rgb(229 231 235 / var(--tw-divide-opacity)) /* #e5e7eb */;
}
.bg-gray-50 {
    --tw-bg-opacity: 1;
    background-color: rgb(249 250 251 / var(--tw-bg-opacity)) /* #f9fafb */;
}
.px-6 {
    padding-left: 1.5rem /* 24px */;
    padding-right: 1.5rem /* 24px */;
}
.py-3 {
    padding-top: 0.75rem /* 12px */;
    padding-bottom: 0.75rem /* 12px */;
}
.text-left {
    text-align: left;
}
.text-xs {
    font-size: 0.75rem /* 12px */;
    line-height: 1rem /* 16px */;
}
.font-medium {
    font-weight: 500;
}
.text-gray-500 {
    --tw-text-opacity: 1;
    color: rgb(107 114 128 / var(--tw-text-opacity)) /* #6b7280 */;
}
.uppercase {
    text-transform: uppercase;
}
.tracking-wider {
    letter-spacing: 0.05em;
}
.bg-white {
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity)) /* #ffffff */;
}
.divide-y > :not([hidden]) ~ :not([hidden]) {
    --tw-divide-y-reverse: 0;
    border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
    border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
}
.divide-gray-200 > :not([hidden]) ~ :not([hidden]) {
    --tw-divide-opacity: 1;
    border-color: rgb(229 231 235 / var(--tw-divide-opacity)) /* #e5e7eb */;
}
.py-4 {
    padding-top: 1rem /* 16px */;
    padding-bottom: 1rem /* 16px */;
}
.whitespace-nowrap {
    white-space: nowrap;
} 
.bg-yellow-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(234 179 8 / var(--tw-bg-opacity)) /* #eab308 */;
}
.hover\:bg-yellow-600:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(202 138 4 / var(--tw-bg-opacity)) /* #ca8a04 */;
}
.text-white {
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity)) /* #ffffff */;
}
.py-1 {
    padding-top: 0.25rem /* 4px */;
    padding-bottom: 0.25rem /* 4px */;
}
.px-2 {
    padding-left: 0.5rem /* 8px */;
    padding-right: 0.5rem /* 8px */;
}
.rounded-md {
    border-radius: 0.375rem /* 6px */;
}
.mr-2 {
    margin-right: 0.5rem /* 8px */;
}
.hover\:bg-red-600:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(220 38 38 / var(--tw-bg-opacity)) /* #dc2626 */;
}
.bg-red-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(239 68 68 / var(--tw-bg-opacity)) /* #ef4444 */;
}
</style>
