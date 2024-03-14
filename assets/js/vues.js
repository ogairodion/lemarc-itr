if (window.VueSelect) {
  Vue.component('v-select', VueSelect.VueSelect)
}
Vue.component('vue-ctk-date-time-picker', window['vue-ctk-date-time-picker']);
function debounce(fn, wait) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    const context = this;
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  }
}

Vue.component('userOrders', {
  template: '#user-orders-template',
  delimiters: ['[(', ')]'],
  data: () => ({
    list: [],
    status: {
      red: 5,
      green: 4
    },
    statusMap: [
      'Новый заказ',
      "Заказ подтверждён",
      "Заказ отправлен",
      "Заказ выполнен",
      "Заказ отменён"
    ],
    width: null,
    showPopup: false,
    cancelOrderStage: 1,
    cancelReason: '',
    cancelReasonText: '',
    orderToCancel: 0
  }),
  async created() {
    // fetch orders
    this.list = [
      {
        id: 1,
        num: '1231',
        createdon: '2024-01-01 00:00:00',
        cost: 40000,
        status: 1,
        tracking: '#',
        paymentLink: '#',
        products: [
          {
            img: '/assets/img/photo/oil-can.png',
            name: 'Моторное масло Lemarc QUALARD NEO 0W-30',
            article: '1231232',
            volume: 4,
            count: 1,
            price: 1000,
            url: '/poduct.html'
          },
          {
            img: '/assets/img/photo/oil-can.png',
            name: 'Моторное масло Lemarc QUALARD NEO 0W-30',
            article: '1231232',
            volume: 4,
            count: 1,
            price: 1000,
            url: '/poduct.html'
          },
          {
            img: '/assets/img/photo/oil-can.png',
            name: 'Моторное масло Lemarc QUALARD NEO 0W-30',
            article: '1231232',
            volume: 4,
            count: 1,
            price: 1000,
            url: '/poduct.html'
          },
          {
            img: '/assets/img/photo/oil-can.png',
            name: 'Моторное масло Lemarc QUALARD NEO 0W-30',
            article: '1231232',
            volume: 4,
            count: 1,
            price: 1000,
            url: '/poduct.html'
          },
          {
            img: '/assets/img/photo/oil-can.png',
            name: 'Моторное масло Lemarc QUALARD NEO 0W-30',
            article: '1231232',
            volume: 4,
            count: 1,
            price: 1000,
            url: '/poduct.html'
          },
          {
            img: '/assets/img/photo/oil-can.png',
            name: 'Моторное масло Lemarc QUALARD NEO 0W-30',
            article: '1231232',
            volume: 4,
            count: 2,
            price: 1000,
            url: '/poduct.html'
          },
        ]
      },
      {
        id: 2,
        num: '1231',
        createdon: '2024-01-01 00:00:00',
        cost: 40000,
        status: 2,
        tracking: '#',
        products: [
          {
            img: '/assets/img/photo/oil-can.png',
            name: 'Моторное масло Lemarc QUALARD NEO 0W-30',
            article: '1231232',
            volume: 4,
            count: 1,
            price: 1000,
            url: '/poduct.html'
          },
          {
            img: '/assets/img/photo/oil-can.png',
            name: 'Моторное масло Lemarc QUALARD NEO 0W-30',
            article: '1231232',
            volume: 4,
            count: 2,
            price: 1000,
            url: '/poduct.html'
          },
        ]
      },
      {
        id: 3,
        num: '1231',
        createdon: '2024-01-01 00:00:00',
        cost: 40000,
        status: 4,
        tracking: '#',
        products: [
          {
            img: '/assets/img/photo/oil-can.png',
            name: 'Моторное масло Lemarc QUALARD NEO 0W-30',
            article: '1231232',
            volume: 4,
            count: 2,
            price: 1000,
            url: '/poduct.html'
          },
        ]
      },
      {
        id: 4,
        num: '1231',
        createdon: '2024-01-01 00:00:00',
        cost: 40000,
        status: 5,
        tracking: '#',
        products: [
          {
            img: '/assets/img/photo/oil-can.png',
            name: 'Моторное масло Lemarc QUALARD NEO 0W-30',
            article: '1231232',
            volume: 4,
            count: 1,
            price: 1000,
            url: '/poduct.html'
          },
          {
            img: '/assets/img/photo/oil-can.png',
            name: 'Моторное масло Lemarc QUALARD NEO 0W-30',
            article: '1231232',
            volume: 4,
            count: 2,
            price: 1000,
            url: '/poduct.html'
          },
        ]
      },
    ]
    for (const item of this.list) {
      Vue.set(item, 'opened', false)
    }
    window.addEventListener("resize", this.screenWidth);
  },
  mounted() {
    this.screenWidth()
  },
  destroyed() {
    window.removeEventListener("resize", this.screenWidth);
  },
  computed: {
    maxCount() {
      const realSize = this.width ? Math.floor((this.width - 100) / 100) : 5
      return realSize < 5 ? realSize : 5
    },
  },
  methods: {
    cancelOrder(i) {
      this.orderToCancel = i
      this.cancelOrderStage = 1
      this.cancelReason = ''
      this.cancelReasonText = ''
      this.showPopup = true
    },
    async performCancelOrder() {
      // send this.list[this.orderToCancel].id and cancelReason
      // get status and change it
      this.cancelOrderStage = 2
    },
    productCount(i) {
      return this.list[i].products.reduce((acc, cur) => acc + cur.count, 0)
    },
    screenWidth() {
      this.width = this.$refs.container?.[0].offsetWidth
    },
    toDotString(date) {
      let dtf;
      if (date instanceof Date) {
        dtf = date;
      } else {
        dtf = new Date(date.split(' ').join('T'));
      }
      return ('0' + dtf.getDate()).slice(-2) + '.' + ('0' + (dtf.getMonth() + 1)).slice(-2) + '.' + dtf.getFullYear();
    }
  },
})

Vue.component('userProfile', {
  template: '#user-profile-template',
  delimiters: ['[(', ')]'],
  data: () => ({
    fullname: '',
    dob: null,
    city: '',
    contacts: {
      email: {
        verified: false,
        value: ''
      },
      phone: ''
    },
    showPopup: false,
    newProfileData: {
      name: {
        first: '',
        last: '',
        middle: '',
      },
      dob: null,
      saved: false
    },
    newPass: {
      password: {
        value: '',
        isValid: 0,
        error: ''
      },
      newpassword: {
        value: '',
        isValid: 0,
        error: ''
      },
      newpasswordConfirm: {
        value: '',
        isValid: 0,
        error: ''
      },
      saved: false
    },
    confirmEmail: {
      stage: 1,
      code: '',
      error: '',
      timer: 60,
      buttonActive: false,
      buttonText: ''
    },
    changeEmail: {
      stage: 0,
      code: '',
      error: '',
      timer: 5,
      buttonActive: false,
      buttonText: '',
      newEmail: '',
      newEmailValid: 0
    },
    changePhone: {
      stage: 0,
      code: '',
      error: '',
      timer: 5,
      buttonActive: false,
      buttonText: '',
      newPhone: '',
      newPhoneValid: 0
    },
    timer: null,
    editMode: '' // profile, changeEmail, confirmEmail, phone, password
  }),
  created() {
    this.fullname = window.userData.fullname
    this.dob = window.userData.dob
    this.city = window.userData.city
    this.contacts.email = window.userData.email
    this.contacts.email.verified = window.userData.emailVerified
    this.contacts.phone = window.userData.phone
  },
  computed: {
    name() {
      const split = this.fullname.split(' ')
      return { first: split[1], last: split[0], middle: split[2] }
    },
    profileDataValid() {
      return this.newProfileData.name.last.length > 1 && this.newProfileData.name.first.length > 1 && this.newProfileData.name.middle.length > 1 && (this.newProfileData.dob === null || this.newProfileData.dob.length === 10)
    },
    newPasswordValid() {
      return this.newPass.password.isValid === 1 && this.newPass.newpassword.isValid === 1 && this.newPass.newpasswordConfirm.isValid === 1
    }
  },
  methods: {
    // change phone
    formatPhone(s, plus = true) {
      const startsWith = plus ? '+7' : '8';

      let phone = s.replace(/[^0-9]/g, '');
      if (phone.startsWith('7') && plus) {
        phone = phone.substr(1);
      }
      if (phone.startsWith('8')) {
        phone = phone.substr(1);
      }

      return phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/g, `${startsWith} ($1) $2 $3 $4`);
    },
    validateNewPhone() {
      if (this.changePhone.newPhone.length == 0) {
        this.changePhone.newPhoneValid = 0;
        return
      }
      if (this.changePhone.newPhone.replace(/\D/g, "").length < 11) {
        this.changePhone.newPhoneValid = -1
      } else {
        this.changePhone.newPhoneValid = 1
      }
    },
    tryNewPhone() {
      // send new email to the back
      // if error 
      // this.changePhone.error = error
      // else 
      this.changePhone.stage = 1
      this.setChangePhoneTimer()
    },
    setChangePhoneButtonStatus() {
      this.changePhone.error = ''
      if (this.changePhone.code.length === 4) {
        this.changePhone.buttonActive = true
        this.changePhone.buttonText = "Подтвердить"
      } else {
        if (this.changePhone.timer === 0) {
          this.changePhone.buttonText = 'Отправить повторно'
        }
      }
    },
    setChangePhoneTimer() {
      this.changePhone.buttonText = 'Отправить ещё раз через 60 сек.'
      this.changePhone.timer = 5
      this.timer = setInterval(() => {
        if (this.changePhone.timer > 0) {
          this.changePhone.timer--
          if (this.changePhone.code.length !== 4) {
            this.changePhone.buttonActive = false
            this.changePhone.buttonText = `Отправить ещё раз через ${this.changePhone.timer} сек.`
          }
        } else {
          if (this.changePhone.code.length !== 4) {
            this.changePhone.buttonText = 'Отправить повторно'
            this.changePhone.buttonActive = true
          }
          clearInterval(this.timer)
        }
      }, 1000);
    },
    handleChangePhoneBtn() {
      if (this.changePhone.buttonText === 'Отправить повторно') {
        // renew code
        this.setChangePhoneTimer()
        return
      }
      if (this.changePhone.code.length === 4) {
        // send code
        // if error 
        //this.changePhone.error = 'Введён не правильный код'
        // else 
        this.changePhone.stage = 2
        this.contacts.phone = this.changePhone.newPhone
      }
    },

    // change email
    validateNewEmail() {
      if (this.changeEmail.newEmail == 0) {
        this.changeEmail.newEmailValid = 0;
        return
      }
      if (!this.changeEmail.newEmail.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        this.changeEmail.newEmailValid = -1
      } else {
        this.changeEmail.newEmailValid = 1
      }
    },
    tryNewEmail() {
      // send new email to the back
      // if error 
      // this.changeEmail.error = error
      // else 
      this.changeEmail.stage = 1
      this.setChangeEmailTimer()
    },
    setChangeEmailButtonStatus() {
      this.changeEmail.error = ''
      if (this.changeEmail.code.length === 4) {
        this.changeEmail.buttonActive = true
        this.changeEmail.buttonText = "Подтвердить"
      } else {
        if (this.changeEmail.timer === 0) {
          this.changeEmail.buttonText = 'Отправить повторно'
        }
      }
    },
    setChangeEmailTimer() {
      this.changeEmail.buttonText = 'Отправить ещё раз через 60 сек.'
      this.changeEmail.timer = 5
      this.timer = setInterval(() => {
        if (this.changeEmail.timer > 0) {
          this.changeEmail.timer--
          if (this.changeEmail.code.length !== 4) {
            this.changeEmail.buttonActive = false
            this.changeEmail.buttonText = `Отправить ещё раз через ${this.changeEmail.timer} сек.`
          }
        } else {
          if (this.changeEmail.code.length !== 4) {
            this.changeEmail.buttonText = 'Отправить повторно'
            this.changeEmail.buttonActive = true
          }
          clearInterval(this.timer)
        }
      }, 1000);
    },
    handleChangeEmailBtn() {
      if (this.changeEmail.buttonText === 'Отправить повторно') {
        // renew code
        this.setChangeEmailTimer()
        return
      }
      if (this.changeEmail.code.length === 4) {
        // send code
        // if error 
        //this.changeEmail.error = 'Введён не правильный код'
        // else 
        this.changeEmail.stage = 2
        this.contacts.email.verified = true
        this.contacts.email.value = this.changeEmail.newEmail
      }

    },
    // confirm email
    setConfirmEmailButtonStatus() {
      this.confirmEmail.error = ''
      if (this.confirmEmail.code.length === 4) {
        this.confirmEmail.buttonActive = true
        this.confirmEmail.buttonText = "Подтвердить"
      } else {
        if (this.confirmEmail.timer === 0) {
          this.confirmEmail.buttonText = 'Отправить повторно'
        }
      }
    },
    setConfirmEmailTimer() {
      this.confirmEmail.buttonText = 'Отправить ещё раз через 60 сек.'
      this.confirmEmail.timer = 60
      this.timer = setInterval(() => {
        if (this.confirmEmail.timer > 0) {
          this.confirmEmail.timer--
          if (this.confirmEmail.code.length !== 4) {
            this.confirmEmail.buttonActive = false
            this.confirmEmail.buttonText = `Отправить ещё раз через ${this.confirmEmail.timer} сек.`
          }
        } else {
          if (this.confirmEmail.code.length !== 4) {
            this.confirmEmail.buttonText = 'Отправить повторно'
            this.confirmEmail.buttonActive = true
          }
          clearInterval(this.timer)
        }
      }, 1000);
    },
    handleConfirmEmailBtn() {
      if (this.confirmEmail.buttonText === 'Отправить повторно') {
        // renew code
        this.setConfirmEmailTimer()
        return
      }
      if (this.confirmEmail.code.length === 4) {
        // send code
        // if error 
        //this.confirmEmail.error = 'Введён не правильный код'
        // else 
        this.confirmEmail.stage = 2
        this.contacts.email.verified = true
      }

    },
    // update password
    validatePassword() {
      if (this.newPass.password.value.length == 0) {
        this.newPass.password.isValid = 0
        this.newPass.password.error = ''
      } else {
        if (this.newPass.password.value.length < 6) {
          this.newPass.password.isValid = -1
        } else {
          this.newPass.password.isValid = 1
          this.newPass.password.error = ''
        }
      }
    },
    validateNewPassword() {
      if (this.newPass.newpassword.value.length == 0) {
        this.newPass.newpassword.isValid = 0
        this.newPass.newpassword.error = ''
      } else {
        if (this.newPass.newpassword.value.length < 6) {
          this.newPass.newpassword.isValid = -1
          this.newPass.newpassword.error = `Длина пароля должна быть больше 6 символов`
        } else {
          this.newPass.newpassword.isValid = 1
          this.newPass.newpassword.error = ''
        }
      }
    },
    validatePasswordConfirm() {
      if (this.newPass.newpasswordConfirm.value.length == 0) {
        this.newPass.newpasswordConfirm.isValid = 0;
        this.newPass.newpasswordConfirm.error = ''
      } else {
        if (this.newPass.newpasswordConfirm.value !== this.newPass.newpassword.value) {
          this.newPass.newpasswordConfirm.isValid = -1
          this.newPass.newpasswordConfirm.error = `Пароли не совпадают!`
        } else {
          this.newPass.newpasswordConfirm.isValid = 1
          this.newPass.newpasswordConfirm.error = ''
        }
      }
    },
    updatePassword() {
      //send passwords to back
      //show error if previous password failed
      this.newPass.saved = true
    },
    // edit profile
    newDobValid() {
      return this.newProfileData.dob?.length === 10 ? 1 : this.newProfileData.dob?.length === 0 ? 0 : -1
    },
    editProfile() {
      this.newProfileData = {
        name: { ...this.name },
        dob: this.dob.length > 0 ? null : '' + this.dob,
        saved: false
      }
      this.editMode = 'profile'
      this.showPopup = true
    },
    async handleEmailButton() {
      this.editMode = this.contacts.email.verified ? 'changeEmail' : 'confirmEmail'
      if (this.editMode === 'confirmEmail') {
        // await sendCode...
        this.confirmEmail.code = ''
        this.confirmEmail.stage = 1
        this.confirmEmail.error = ''
        this.setConfirmEmailTimer()
      } else {
        this.changeEmail.code = ''
        this.changeEmail.stage = 0
        this.changeEmail.error = ''
        this.changeEmail.newEmail = ''
        this.changeEmail.newEmailValid = 0
      }
      this.showPopup = true
    },
    initChangePhone() {
      this.changePhone = {
        stage: 0,
        code: '',
        error: '',
        timer: 5,
        buttonActive: false,
        buttonText: '',
        newPhone: '',
        newPhoneValid: 0
      }
      this.editMode = 'phone'
      this.showPopup = true
    },
    changePassword() {
      this.newPass = {
        password: {
          value: '',
          isValid: 0,
        },
        newpassword: {
          value: '',
          isValid: 0,
          error: ''
        },
        newpasswordConfirm: {
          value: '',
          isValid: 0,
          error: ''
        },
        saved: false
      }
      this.editMode = 'password'
      this.showPopup = true
    },

    updateProfile() {
      // send data to backend
      // show error if any
      // update frontend data
      this.fullname = `${this.newProfileData.name.last} ${this.newProfileData.name.first} ${this.newProfileData.name.middle}`
      this.dob = this.newProfileData.dob
      this.newProfileData.saved = true
    },
    toDotString(date) {
      let dtf;
      if (date instanceof Date) {
        dtf = date;
      } else {
        dtf = new Date(date.split(' ').join('T'));
      }
      return ('0' + dtf.getDate()).slice(-2) + '.' + ('0' + (dtf.getMonth() + 1)).slice(-2) + '.' + dtf.getFullYear();
    }
  },
})
Vue.component('universalPopup', {
  template: '#universal-popup-template',
  delimiters: ['[(', ')]'],
  methods: {
    close() {
      this.$emit("close");
    },
  },
})
Vue.component('checkboxInput', {
  template: '#checkbox-input-template',
  delimiters: ['[(', ')]'],
  props: {
    isValid: {
      type: Number,
      default: 0
    },
    value: {
      type: Boolean,
      default: true
    },
    error: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    id: 0
  }),
  created() {
    this.id = 'p' + Math.random()
  }
})
Vue.component('textInput', {
  template: '#text-input-template',
  delimiters: ['[(', ')]'],
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    isValid: {
      type: Number,
      default: 0
    },
    value: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    id: 0
  }),
  created() {
    this.id = 'p' + Math.random()
  }
})
Vue.component('textareaInput', {
  template: '#textarea-input-template',
  delimiters: ['[(', ')]'],
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
})
Vue.component('selectInput', {
  template: '#select-input-template',
  delimiters: ['[(', ')]'],
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
          ? this.options[0]
          : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  },
})
Vue.component('passwordInput', {
  template: '#password-input-template',
  delimiters: ['[(', ')]'],
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    isValid: {
      type: Number,
      default: 0
    },
    value: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    showPass: false,
    id: 0
  }),
  created() {
    this.id = 'p' + Math.random()
  }
})
Vue.component('buttonRounded', {
  template: '#button-rounded-template',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
if (document.getElementById('auth-form')) {
  window.authapp = new Vue({
    el: '#auth-form',
    delimiters: ['[(', ')]'],
    data: () => ({
      ajaxUrl: '/assets/controllers/profile.php',
      opened: false,
      mode: 'default',
      timer: null,
      loading: false,
      credentials: {
        emailOrPhone: {
          value: '',
          isValid: 0,
          error: ''
        },
        password: {
          value: '',
          isValid: 0
        }
      },
      onetime: {
        code: {
          value: '',
          isValid: 0,
          sent: false,
          error: ''
        },
        phone: {
          value: '',
          isValid: 0,
        },
        button: {
          isActive: false,
          text: 'Получить код в SMS',
          timer: null
        }
      },
      forgot: {
        code: {
          value: '',
          isValid: 0,
          sent: false,
          error: '',
          correct: false
        },
        phone: {
          value: '',
          isValid: 0,
        },
        button: {
          isActive: false,
          text: 'Получить код в SMS',
          timer: null
        },
        password: {
          value: '',
          isValid: 0
        },
        passwordConfirm: {
          value: '',
          isValid: 0
        },
        token: ''
      },
      register: {
        done: false,
        code: {
          value: '',
          isValid: 0,
          sent: false,
          error: '',
          correct: false
        },
        phone: {
          value: '',
          isValid: 0,
        },
        email: {
          value: '',
          isValid: 0,
        },
        fio: {
          value: '',
          isValid: 0,
        },
        button: {
          isActive: false,
          text: 'Зарегистрироватся',
          timer: null
        },
        password: {
          value: '',
          isValid: 0
        },
        passwordConfirm: {
          value: '',
          isValid: 0
        },
        pd: false,
        spam: false
      },
    }),
    methods: {
      validateLogin() {
        if (this.credentials.emailOrPhone.value.length == 0) {
          this.credentials.emailOrPhone.isValid = 0;
          this.credentials.emailOrPhone.error = ''
          return
        }
        if (!this.credentials.emailOrPhone.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) && this.credentials.emailOrPhone.value.replace(/\D/g, "").length < 11) {
          this.credentials.emailOrPhone.isValid = -1
          this.credentials.emailOrPhone.error = 'Телефон или Email имеет неверный формат'
        } else {
          this.credentials.emailOrPhone.isValid = 1
          this.credentials.emailOrPhone.error = ''
        }
      },
      validateRegisterEmail() {
        if (this.register.email.value.length == 0) {
          this.register.email.isValid = 0;
          this.register.email.error = ''
          return
        }
        if (!this.register.email.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
          this.register.email.isValid = -1
          this.register.email.error = 'Email имеет неверный формат'
        } else {
          this.register.email.isValid = 1
          this.register.email.error = ''
        }
      },
      validateRegisterFio() {
        if (this.register.fio.value.length === 0) {
          this.register.fio.isValid = 0;
          this.register.fio.error = ''
          return
        }
        if (this.register.fio.value.split(' ').length < 3) {
          this.register.fio.isValid = -1
          this.register.fio.error = 'Введите фамилию имя и отчество'
        } else {
          this.register.fio.isValid = 1
          this.register.fio.error = ''
        }
      },
      validatePhone(section) {
        if (section.phone.value.length == 0) {
          section.phone.isValid = 0;
          return
        }
        if (section.phone.value.replace(/\D/g, "").length < 11) {
          section.phone.isValid = -1
        } else {
          section.phone.isValid = 1
          if (!section.button.timer) section.button.isActive = true;
        }
      },
      validateOnetimePhone() {
        return this.validatePhone(this.onetime)
      },
      validateForgotPhone() {
        return this.validatePhone(this.forgot)
      },
      validateRegisterPhone() {
        return this.validatePhone(this.register)
      },
      validatePassword(section) {
        if (section.password.value.length == 0) {
          section.password.isValid = 0;
          section.password.error = ''
        } else {
          if (section.password.value.length < 6) {
            section.password.isValid = -1
            section.password.error = `Длина пароля должна быть больше 6 символов`
          } else {
            section.password.isValid = 1
            section.password.error = ''
          }
        }
      },
      validatePasswordConfirm(section) {
        if (section.passwordConfirm.value.length == 0) {
          section.passwordConfirm.isValid = 0;
          section.passwordConfirm.error = ''
        } else {
          if (section.passwordConfirm.value !== section.password.value) {
            section.passwordConfirm.isValid = -1
            section.passwordConfirm.error = `Пароли не совпадают!`
          } else {
            section.passwordConfirm.isValid = 1
            section.passwordConfirm.error = ''
            section.button.isActive = true
          }
        }
      },
      validateForgotPasswordConfirm() {
        return this.validatePasswordConfirm(this.forgot)
      },
      validateRegisterPasswordConfirm() {
        return this.validatePasswordConfirm(this.register)
      },
      validateRegisterPassword() {
        return this.validatePassword(this.register)
      },
      validateLoginPassword() {
        return this.validatePassword(this.credentials)
      },
      validateNewPassword() {
        return this.validatePassword(this.forgot)
      },
      validateCode(section, buttonText, invalidButonText = '') {
        section.code.error = ''
        if (section.code.value.length == 0) {
          section.code.isValid = 0;
          return
        } else {
          if (section.code.value.length !== 4) {
            section.code.isValid = -1
            if (invalidButonText) {
              section.button.text = invalidButonText
            }
          } else {
            section.code.isValid = 1
            section.button.text = buttonText
            section.button.isActive = true
          }
        }
      },
      validateRegisterCode() {
        return this.validateCode(this.register, 'Подтвердить регистрацию')
      },
      validateOnetimeCode() {
        return this.validateCode(this.onetime, 'Войти', 'Отправить повторно')
      },
      validateForgotCode() {
        return this.validateCode(this.forgot, 'Сменить пароль')
      },
      async tryLogin() {
        this.loading = true
        this.credentials.emailOrPhone.error = ''
        response = await fetch(this.ajaxUrl, {
          method: "POST",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            action: 'defaultAuth',
            login: this.credentials.emailOrPhone.value,
            password: this.credentials.password.value
          }),
        })
        this.loading = false
        const result = await response.json();
        console.log(result);
        if (result.error) {
          this.credentials.emailOrPhone.error = result.error
        }
        if (result.success) {
          window.location.reload()
        }
      },
      async handleForgotButton() {
        if (!this.forgot.code.sent || this.forgot.button.text === 'Отправить повторно') {
          this.forgot.phone.error = ''
          this.loading = true
          response = await fetch(this.ajaxUrl, {
            method: "POST",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              action: 'sendPhoneCode',
              phone: this.forgot.phone.value,
            }),
          })
          this.loading = false
          const result = await response.json();
          if (result.error) {
            this.forgot.phone.error = result.error
            this.$forceUpdate()
          } else {
            this.forgot.code.sent = true
            this.forgot.button.isActive = false
            this.forgot.button.timer = 60 // set time from response
            this.timer = setInterval(() => {
              if (this.forgot.button.timer > 0) {
                this.forgot.button.timer--
                if (this.forgot.code.isValid !== 1) {
                  this.forgot.button.isActive = false
                  this.forgot.button.text = `Отправить ещё раз через ${this.forgot.button.timer} сек.`
                }
              } else {
                this.forgot.button.isActive = true
                if (this.forgot.code.value.length === 0) this.forgot.button.text = 'Отправить повторно'
                clearInterval(this.timer)
              }
            }, 1000);
          }
        }
        if (this.forgot.code.isValid && !this.forgot.code.correct) {
          this.forgot.button.isActive = false
          this.loading = true
          this.forgot.code.error = ''
          response = await fetch(this.ajaxUrl, {
            method: "POST",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              action: 'checkPhoneCode',
              phone: this.forgot.phone.value,
              code: this.forgot.code.value,
              mode: 'changepass'
            }),
          })
          const result = await response.json()
          this.loading = false
          if (result.error) {
            this.forgot.code.error = result.error
          }
          if (result.success) {
            this.forgot.code.correct = true
            this.forgot.token = result.token
          }
          this.forgot.button.isActive = true
          return
        }
        if (this.forgot.button.text === 'Сменить пароль' && this.forgot.passwordConfirm.isValid === 1) {
          this.loading = true
          response = await fetch(this.ajaxUrl, {
            method: "POST",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              action: 'changePassword',
              phone: this.forgot.phone.value,
              password: this.forgot.password.value,
              token: this.forgot.token,
            }),
          })
          const result = await response.json()
          this.loading = false
          if (result.success) {
            window.location.reload()
          }
        }
      },
      async handleRegisterButton() {
        let response, errorField
        if (!this.register.code.sent || this.register.button.text === 'Отправить повторно') {
          this.loading = true
          if (this.register.button.text === 'Отправить повторно') {
            errorField = 'code'
            response = await fetch(this.ajaxUrl, {
              method: "POST",
              cache: "no-cache",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                action: 'sendPhoneCode',
                phone: this.register.phone.value,
              }),
            })
          } else {
            errorField = 'email'
            response = await fetch(this.ajaxUrl, {
              method: "POST",
              cache: "no-cache",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                action: 'registerUserAndSendCode',
                fio: this.register.fio.value,
                phone: this.register.phone.value,
                email: this.register.email.value,
                password: this.register.password.value,
                spam: this.register.spam
              }),
            });
          }
          this.loading = false
          const result = await response.json();
          if (result.error) {
            this.register[errorField].error = result.error
            this.$forceUpdate()
          } else {
            this.register.code.sent = true
            this.register.button.isActive = false
            this.register.button.timer = 60 // set time from response
            this.timer = setInterval(() => {
              if (this.register.button.timer > 0) {
                this.register.button.timer--
                if (this.register.code.isValid !== 1) {
                  this.register.button.isActive = false
                  this.register.button.text = `Отправить ещё раз через ${this.register.button.timer} сек.`
                }
              } else {
                this.register.button.isActive = true
                if (this.register.code.isValid !== 1) this.register.button.text = 'Отправить повторно'
                clearInterval(this.timer)
              }
            }, 1000);
            return
          }
        }
        if (this.register.code.isValid && !this.register.code.correct) {
          // request
          this.register.button.isActive = false
          response = await fetch(this.ajaxUrl, {
            method: "POST",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              action: 'checkPhoneCode',
              phone: this.register.phone.value,
              code: this.register.code.value,
            }),
          })
          const result = await response.json();
          if (result.error) {
            this.register.code.error = result.error
          } else {
            this.register.button.isActive = true
            this.register.code.correct = true
            this.register.done = true
            this.register.button.text = 'Закрыть окно'
          }
          return
        }
        if (this.register.done) {
          location.reload()
        }
      },
      async handleOnetimeButton() {
        if (!this.onetime.code.sent || this.onetime.button.text === 'Отправить повторно') {
          this.onetime.phone.error = ''
          this.loading = true
          response = await fetch(this.ajaxUrl, {
            method: "POST",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              action: 'sendPhoneCode',
              phone: this.onetime.phone.value,
            }),
          })
          this.loading = false
          const result = await response.json();
          if (result.error) {
            this.onetime.phone.error = result.error
            this.$forceUpdate()
          } else {
            this.onetime.code.sent = true
            this.onetime.button.isActive = false
            this.onetime.button.timer = 60
            this.timer = setInterval(() => {
              if (this.onetime.button.timer > 0) {
                this.onetime.button.timer--
                if (this.onetime.code.isValid !== 1) {
                  this.onetime.button.isActive = false
                  this.onetime.button.text = `Отправить ещё раз через ${this.onetime.button.timer} сек.`
                }
              } else {
                this.onetime.button.isActive = true
                if (this.onetime.code.value.length === 0) this.onetime.button.text = 'Отправить повторно'
                clearInterval(this.timer)
              }
            }, 1000);
          }
        }
        if (this.onetime.code.isValid) {
          this.onetime.button.isActive = false
          this.loading = true
          this.onetime.code.error = ''
          response = await fetch(this.ajaxUrl, {
            method: "POST",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              action: 'checkPhoneCode',
              phone: this.onetime.phone.value,
              code: this.onetime.code.value,
              mode: 'login'
            }),
          })
          const result = await response.json()
          this.loading = false
          if (result.error) {
            this.onetime.code.error = result.error
          }
          if (result.success) {
            window.location.reload()
          }
          this.onetime.button.isActive = true
          return
        }
      },
      reset() {
        this.mode = 'default'
        this.credentials = {
          emailOrPhone: {
            value: '',
            isValid: 0
          },
          password: {
            value: '',
            isValid: 0
          }
        }
      },
      close() {
        this.opened = false
      },
      open() {
        this.opened = true
      },
      formatPhone(s, plus = true) {
        const startsWith = plus ? '+7' : '8';

        let phone = s.replace(/[^0-9]/g, '');
        if (phone.startsWith('7') && plus) {
          phone = phone.substr(1);
        }
        if (phone.startsWith('8')) {
          phone = phone.substr(1);
        }

        return phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/g, `${startsWith} ($1) $2 $3 $4`);
      }
    },
    watch: {
      register: {
        handler() {
          if (this.register.code.sent) return
          if (
            this.register.fio.isValid !== 1 ||
            this.register.phone.isValid !== 1 ||
            this.register.password.isValid !== 1 ||
            this.register.passwordConfirm.isValid !== 1 ||
            !this.register.pd ||
            this.register.email.isValid !== 1) {
            this.register.button.isActive = false
            return
          }
          this.register.button.isActive = true
        },
        deep: true
      },
    },
    computed: {
      validated() {
        let ret = true
        if (this.mode === 'default') {
          if (this.credentials.password.value.length < 6) {
            ret = false
          }
          if (!this.credentials.emailOrPhone.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) && this.credentials.emailOrPhone.value.replace(/\D/g, "").length < 11) {
            ret = false
          }
        }
        return ret
      }
    }
  });
}
if (document.getElementById('consultation-app')) {
  window.consultationApp = new Vue({
    el: '#consultation-app',
    delimiters: ['[(', ')]'],
    data: () => ({
      phone: {
        value: '',
        isValid: 0,
      },
      email: {
        value: '',
        isValid: 0,
      },
      fio: {
        value: '',
        isValid: 0,
      },
      topic: {
        value: '',
        options: [
          "Подбор масла",
          "Срок доставки",
          "Вопрос по качеству",
          "Lemarc Lexpert",
          "Другое",
        ]
      },
      question: '',
      pd: false,
      spam: false
    }),
    methods: {
      submit() {
        console.log(this.question)
      },
      validateEmail() {
        if (this.email.value.length == 0) {
          this.email.isValid = 0;
          return
        }
        if (!this.email.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
          this.email.isValid = -1
        } else {
          this.email.isValid = 1
        }
      },
      validateFio() {
        if (this.fio.value.length === 0) {
          this.fio.isValid = 0;
          return
        }
        if (this.fio.value.split(' ').length < 3) {
          this.fio.isValid = -1
        } else {
          this.fio.isValid = 1
        }
      },
      validatePhone() {
        if (this.phone.value.length == 0) {
          this.phone.isValid = 0;
          return
        }
        if (this.phone.value.replace(/\D/g, "").length < 11) {
          this.phone.isValid = -1
        } else {
          this.phone.isValid = 1
        }
      },
    },
    computed: {
      formValid() {
        let ret = true
        if (this.fio.isValid !== 1 ||
          this.phone.isValid !== 1 ||
          this.email.isValid !== 1 ||
          this.topic.value === '' ||
          this.question === '' ||
          !this.pd) ret = false
        return ret
      }
    }
  });
}
if (document.getElementById('oil-selection-app')) {
  window.oilSelectionApp = new Vue({
    el: '#oil-selection-app',
    delimiters: ['[(', ')]'],
    data: () => ({
      category: null,
      vendor: {
        value: '',
        options: [],
      },
      series: {
        value: '',
        options: [],
      },
      volume: {
        value: '',
        options: [],
      },
      model: {
        value: '',
        options: [],
      },
      token: '',
      selectkey: 1,
      isInit: false
    }),
    async created() {
      if (window.location.search) {
        const params = new URLSearchParams(window.location.search)
        if (params.has('model')) {
          this.category = params.get('category');
          await this.changeCategory()
          this.vendor.value = params.get('vendor')
          await this.changeVendor()
          this.series.value = params.get('series')
          await this.changeSeries()
          this.volume.value = params.get('volume')
          await this.changeVolume()
          this.model.value = params.get('model');
          const vendor = this.vendor.options.find(el => el.id == this.vendor.value)
          const series = this.series.options.find(el => el.id == this.series.value)
          const volume = this.volume.options.find(el => el.volume == this.volume.value)
          const model = this.model.options.find(el => el.model == this.model.value)
          this.isInit = true
          this.$refs.vendor.updateValue(vendor)
          this.$refs.series.updateValue(series)
          this.$refs.volume.updateValue(volume)
          this.$refs.model.updateValue(model)
          this.isInit = false
          this.handleButton()
        }
      }
    },
    methods: {
      async changeCategory() {
        if (!this.isInit) {
          this.vendor = {
            value: '',
            options: [],
          }
          this.series = {
            value: '',
            options: [],
          }
          this.volume = {
            value: '',
            options: [],
          }
          this.model = {
            value: '',
            options: [],
          }
          const res = await this.request(`https://api.lubribase.ru/ru/api/v1/category_groups/${this.category}/manufacturers`)
          if (res.results) {
            this.vendor.options = res.results
          }
        }
      },
      async changeVendor() {
        if (!this.isInit) {
          const res = await this.request(`https://api.lubribase.ru/ru/api/v1/category_groups/${this.category}/manufacturers/${this.vendor.value}/series/`)
          if (res.results) {
            this.series.options = res.results
            this.series.value = ''
            this.volume = {
              value: '',
              options: [],
            }
            this.model = {
              value: '',
              options: [],
            }
          }
        }
      },
      async changeSeries() {
        if (!this.isInit) {
          const res = await this.request(`https://api.lubribase.ru/ru/api/v1/category_groups/${this.category}/manufacturers/${this.vendor.value}/series/${this.series.value}/engine_sizes`)
          if (res.results) {
            this.volume.options = res.results
            this.volume.value = ''
            this.model = {
              value: '',
              options: [],
            }
          }
        }
      },
      async changeVolume() {
        if (!this.isInit) {
          const res = await this.request(`https://api.lubribase.ru/ru/api/v1/category_groups/${this.category}/manufacturers/${this.vendor.value}/series/${this.series.value}/equipment?engine_size_volume=${this.volume.value}`)
          if (res.results) {
            this.model.options = res.results
            this.model.value = ''
          }
        }
      },
      async request(url, params = { method: 'GET' }) {
        params.headers = { Authorization: `Bearer ${this.token}` }
        let res = await (await fetch(url, params)).json()
        if (res.errors?.length) {
          await this.renewToken()
          params.headers.Authorization = `Bearer ${this.token}`
          res = await (await fetch(url, params)).json()
        }
        return res
      },
      async renewToken() {
        const res = await (await fetch('https://api.lubribase.ru/api/v1/auth?user[email]=api-dev@lemarc.ru&user[password]=gXvJ^)9<dc&user[remote_ip]=123.0.0.1', { method: 'POST' })).json()
        this.token = res.token
      },
      async handleButton(page) {
        if (page == 'main') {
          const searchParams = new URLSearchParams({
            category: this.category,
            vendor: this.vendor.value,
            series: this.series.value,
            volume: this.volume.value,
            model: this.model.value,
          })
          window.location.href = '/oil-select.html?' + searchParams.toString()
        } else {
          const res = await this.request(`https://api.lubribase.ru/ru/api/v1/equipment/0?mid=${this.model.options.find(el => el.model == this.model.value).mid}`)
          const req = {
            engine: [],
            gearbox: []
          }
          for (const item of res.component_types) {
            if (item.component_type_name === 'Двигатель') {
              req.engine = item.components[0]?.products?.map(el => el.name)
            }
            if (item.component_type_name.toLowerCase().includes('коробка')) {
              req.gearbox = item.components[0]?.products?.map(el => el.name)
            }
          }
          console.log(req)
          // отправляем это на бек для поиска в каталоге 
        }
      }
    },
  });
}
if (document.getElementById('analog-app')) {
  window.oilSelectionApp = new Vue({
    el: '#analog-app',
    delimiters: ['[(', ')]'],
    components: {
      'perfect-scrollbar': Vue2PerfectScrollbar.PerfectScrollbar,
    },
    data: () => ({
      suggestions: [],
      resultItems: [],
      token: '',
      search: '',
      highlighted: null,
      skipDB: false,
      nofound: false
    }),
    created() {
      this.debouncedFetch = debounce(async () => {
        await this.getSuggestions()
      }, 700);
    },
    watch: {
      search() {
        if (!this.skipDB) {
          this.debouncedFetch();
        }
      }
    },
    methods: {
      async handleFavorite(id) {
        const item = this.resultItems.find((el) => el.id = id)
        item.favorite = !item.favorite
      },
      increaseHighlighted() {
        if (this.highlighted === null || this.highlighted === this.suggestions.length - 1) {
          this.highlighted = 0
        } else {
          this.highlighted++
        }
      },
      decreaseHighlighted() {
        if (this.highlighted === null || this.highlighted === 0) {
          this.highlighted = this.suggestions.length - 1
        } else {
          this.highlighted--
        }
      },
      async selectHighlighted() {
        this.nofound = false
        this.skipDB = true
        this.search = this.suggestions[this.highlighted].name
        const res = await this.request(`https://api.lubribase.ru/api/v1/crossings/0?mid=${this.suggestions[this.highlighted].mid}`)
        if (res) {
          this.skipDB = false
          this.suggestions = []
          this.resultItems = [...res.analogue_products, ...res.analogue_products_partly_matched]
          if (this.resultItems.length === 0) {
            this.nofound = true
          } else {
            const baseSpecs = new Set(res.industry_references)
            let itemData
            for (const item of this.resultItems) {
              itemData = await new Promise((res, rej) => { res({ link: '/product.html', id: Math.random(), favorite: true }) })
              Vue.set(item, 'link', itemData.link)
              Vue.set(item, 'id', itemData.id)
              Vue.set(item, 'favorite', itemData.favorite)
              Vue.set(item, 'green', [...[...baseSpecs].filter(el => (new Set(item.industry_references)).has(el))])
              Vue.set(item, 'red', [...[...baseSpecs].filter(el => !(new Set(item.industry_references)).has(el))])
              Vue.set(item, 'grey', [...item.industry_references.filter(el => !baseSpecs.has(el))])
            }
          }
        }
      },
      async getSuggestions() {
        const res = await this.request(`https://api.lubribase.ru/ru/api/v1/search_crossing`, { method: "GET" }, true)
        if (res.results) {
          this.suggestions = res.results
          let re
          for (const s of this.suggestions) {
            s.highlighted = s.name
            for (const word of this.search.split(' ').sort()) {
              re = new RegExp("(" + word + ")", "ig")
              s.highlighted = s.highlighted.replace(re, (s) => `<strong>${s}</strong>`)
            }

          }
        }
      },
      async request(url, params = { method: 'GET' }, isSearch = false) {
        params.headers = {
          Authorization: `Bearer ${this.token}`,
        }
        if (isSearch) {
          url += '?' + new URLSearchParams({
            'filter[logic]': 'and',
            'filter[filters][0][value]': this.search,
            'filter[filters][0][field]': 'name',
            'filter[filters][0][ignoreCase]': true
          })
        }
        let res = await (await fetch(url, params)).json()
        if (res.errors?.length) {
          await this.renewToken()
          params.headers.Authorization = `Bearer ${this.token}`
          res = await (await fetch(url, params)).json()
        }
        return res
      },
      async renewToken() {
        const res = await (await fetch('https://api.lubribase.ru/api/v1/auth?user[email]=api-crossing-dev@lemarc.ru&user[password]=9N0MsuDNWU&user[remote_ip]=123.0.0.1', { method: 'POST' })).json()
        this.token = res.token
      },
    },
  });
}
if (document.getElementById('blog-app')) {
  window.oilSelectionApp = new Vue({
    el: '#blog-app',
    delimiters: ['[(', ')]'],
    data: () => ({
      list: [],
      sort: {
        options: [
          'Все',
          "Новости компании",
          "Выставки",
        ]
      }
    }),
    created() {
      this.list = [
        {
          id: 0,
          img: '/assets/img/photo/blog-img.png',
          url: '/article.html',
          category: 'Компания',
          date: '2024-01-04',
          title: "Заголовок новости"
        },
        {
          id: 1,
          img: '/assets/img/photo/blog-img.png',
          url: '/article.html',
          category: 'Компания',
          date: '2024-01-01 00:00:00',
          title: "Заголовок новости"
        },
        {
          id: 2,
          img: '/assets/img/photo/blog-img.png',
          url: '/article.html',
          category: 'Компания',
          date: '2024-01-04',
          title: "Заголовок новости"
        },
        {
          id: 3,
          img: '/assets/img/photo/blog-img.png',
          url: '/article.html',
          category: 'Выставки',
          date: '2024-01-04',
          title: "Заголовок новости"
        },
        {
          id: 4,
          img: '/assets/img/photo/blog-img.png',
          url: '/article.html',
          category: 'Компания',
          date: '2024-01-04',
          title: "Заголовок новости"
        },
        {
          id: 5,
          img: '/assets/img/photo/blog-img.png',
          url: '/article.html',
          category: 'Компания',
          date: '2024-01-04',
          title: "Заголовок новости"
        },
        {
          id: 56,
          img: '/assets/img/photo/blog-img.png',
          url: '/article.html',
          category: 'Компания',
          date: '2024-01-04',
          title: "Заголовок новости"
        },
      ]
    },
    methods: {
      updateSort() {
        // запросить новый список с фильтрацией
      },
      toDotString(date) {
        let dtf;
        if (date instanceof Date) {
          dtf = date;
        } else {
          dtf = new Date(date.split(' ').join('T'));
        }
        return ('0' + dtf.getDate()).slice(-2) + '.' + ('0' + (dtf.getMonth() + 1)).slice(-2) + '.' + dtf.getFullYear();
      }
    },
  });
}

if (document.getElementById('lk-app')) {
  window.lkApp = new Vue({
    el: '#lk-app',
    delimiters: ['[(', ')]'],
    data: () => ({
      tab: 'orders',
      allowSMS: false,
      allowEmail: false,
    }),
    async created() {
      // const userData = await (await fetch(Vue.prototype.$lkajaxurl + '/get-user-subscriptions', { method: 'GET' })).json()
      // if (userData) {
      //   this.allowSMS = userData.allowSMS
      //   this.allowEmail = userData.allowEmail
      // }
    },
    methods: {
      async logout() {
        //await fetch(Vue.prototype.$lkajaxurl + '/logout', { method: "POST" })
        window.location.href = '/'
      }
    },
  });
}
