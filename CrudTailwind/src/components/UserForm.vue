<template>
  <transition name="modal">
    <div class="fixed inset-0 overflow-y-auto flex items-center justify-center z-50">
      <div class="modal-overlay fixed inset-0 bg-black opacity-50"></div>

      <div class="modal-container bg-white w-full md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div class="modal-content py-4 text-left px-6">
          <!-- Modal Header -->
          <div class="flex justify-between items-center pb-3">
            <p class="text-2xl font-bold">{{ formTitle }}</p>
            <button @click="closeModal" class="modal-close cursor-pointer z-50">
              <span class="text-3xl">&times;</span>
            </button>
          </div>

          <!-- Modal Body -->
          <form @submit.prevent="saveUser">
            <div class="mb-3">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Nome</label>
              <input
                type="text"
                id="name"
                v-model="internalUser.nome"
                required
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="mb-3">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="age">Idade</label>
              <input
                type="number"
                id="age"
                v-model="internalUser.idade"
                required
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="mb-3">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="cpf">CPF</label>
              <input
                type="text"
                id="cpf"
                v-model="internalUser.cpf"
                required
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="mb-3">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
              <input
                type="email"
                id="email"
                v-model="internalUser.email"
                required
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="flex items-center justify-between">
              <button
                type="submit"
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Salvar
              </button>
              <button
                type="button"
                @click="closeModal"
                class="text-red-500 hover:text-red-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({ nome: '', idade: '', cpf: '', email: '' })
    },
    isNew: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      internalUser: { ...this.user }
    };
  },
  computed: {
    formTitle() {
      return this.isNew ? 'Cadastro de Cliente' : 'Editar Cliente';
    }
  },
  methods: {
    saveUser() {
      this.$emit('save', this.internalUser);
      this.closeModal();
    },
    closeModal() {
      this.$emit('close');
      this.internalUser = { ...this.user };
    }
  }
};
</script>

<style scoped>
/* Estilos para o modal */
.modal-enter {
  opacity: 0;
}
.modal-enter-active {
  transition: opacity 0.2s ease-out;
  opacity: 1;
}
.modal-leave {
  opacity: 1;
}
.modal-leave-active {
  transition: opacity 0.2s ease-out;
  opacity: 0;
}

/* Estilos específicos para o modal */
.modal-overlay {
  z-index: 40;
}
.modal-container {
  z-index: 50;
}
.modal-content {
  z-index: 60;
}
.modal-close {
  z-index: 70;
}
.fixed {
    position: fixed;
}
.inset-0 {
    inset: 0px;
}
.overflow-y-auto {
    overflow-y: auto;
}
.flex {
    display: flex;
}
.items-center {
    align-items: center;
}
.justify-center {
    justify-content: center;
}
.z-50 {
    z-index: 50;
}
.opacity-50 {
    opacity: 0.5;
}
.bg-black {
    --tw-bg-opacity: 1;
    background-color: rgb(0 0 0 / var(--tw-bg-opacity)) /* #000000 */;
}
.bg-white {
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity)) /* #ffffff */;
}
.w-full {
    width: 100%;
}
@media (min-width: 768px) {
    .md\:max-w-md {
        max-width: 28rem /* 448px */;
    }
}
.mx-auto {
    margin-left: auto;
    margin-right: auto;
}
.rounded {
    border-radius: 0.25rem /* 4px */;
}
.shadow-lg {
    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.py-4 {
    padding-top: 1rem /* 16px */;
    padding-bottom: 1rem /* 16px */;
}
  .text-left {
    text-align: left;
}
.px-6 {
    padding-left: 1.5rem /* 24px */;
    padding-right: 1.5rem /* 24px */;
}
.justify-between {
    justify-content: space-between;
}
.pb-3 {
    padding-bottom: 0.75rem /* 12px */;
}
  .text-2xl {
    font-size: 1.5rem /* 24px */;
    line-height: 2rem /* 32px */;
}
.font-bold {
    font-weight: 700;
}
.cursor-pointer {
    cursor: pointer;
}
.text-3xl {
    font-size: 1.875rem /* 30px */;
    line-height: 2.25rem /* 36px */;
}
.mb-3 {
    margin-bottom: 0.85rem /* 12px */;
}
.block {
    display: block;
}
.text-gray-700 {
    --tw-text-opacity: 1;
    color: rgb(55 65 81 / var(--tw-text-opacity)) /* #374151 */;
}
.text-sm {
    font-size: 0.875rem /* 14px */;
    line-height: 1.25rem /* 20px */;
}
.mb-2 {
    margin-bottom: 0.5rem /* 8px */;
}
.shadow {
    --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.appearance-none {
    appearance: none;
}
.border {
    border-width: 1px;
}
.py-2 {
    padding-top: 0.5rem /* 8px */;
    padding-bottom: 0.5rem /* 8px */;
}
.leading-tight {
    line-height: 1.25;
}
.focus\:outline-none:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
}
.focus\:shadow-outline:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
}
.bg-green-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(34 197 94 / var(--tw-bg-opacity)) /* #22c55e */;
}
.hover\:bg-green-600:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(22 163 74 / var(--tw-bg-opacity)) /* #16a34a */;
}
.text-red-500 {
    --tw-text-opacity: 1;
    color: rgb(239 68 68 / var(--tw-text-opacity)) /* #ef4444 */;
}
.hover\:text-red-700:hover {
    --tw-text-opacity: 1;
    color: rgb(185 28 28 / var(--tw-text-opacity)) /* #b91c1c */;
}
.text-white {
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity)) /* #ffffff */;
}
.px-4 {
    padding-left: 1rem /* 16px */;
    padding-right: 1rem /* 16px */;
}
</style>
