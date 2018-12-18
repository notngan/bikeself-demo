import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { database, firebaseAuth } from '../firebaseConfig';
//import router from '../router'


import auth from './modules/auth'
import message from './modules/message'
import product from './modules/product'
import booking from './modules/booking'
import admin from './modules/admin'
import tour from './modules/tour'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    message,
    product,
    booking,
    admin,
    tour
  },
  actions: {
    // AUTH
    signUserUp ({commit}, payload) {   
      // create user
      firebaseAuth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(data => {
        // save to database
        database.ref('users' ).child(data.user.uid).set({
          name: payload.name, 
          email: payload.email,
          isAdmin: false
        }).then(() => {
          commit('DISPLAY_LOADING', false)
          //console.log('user saved')
        }).catch( error => {
          console.log(error)
        })
        commit('CLEAR_MESSAGE')
        data.user.updateProfile({
          displayName: payload.name
        }).then(() => {
         //console.log(data.user)
        }).catch(error => {
          console.log(error)
        })
      })
      .catch(error => {
        commit('ADD_MESSAGE', error)
        console.log(error)
      })
    },
    signUserIn ({commit}, payload) {
      firebaseAuth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        commit('DISPLAY_LOADING', false)
      })
      .catch(error => {
        commit('ADD_MESSAGE', error)
      })
    },
    logAdminIn({commit, getters}, payload) {
      firebaseAuth().signInWithEmailAndPassword(payload.email, payload.password).then((value) => {
        const user = getters.userByEmail(value.user.email)
        if (user.isAdmin == true) {
          commit('SET_ADMIN', true)
          //console.log(user.isAdmin)
        } else {
          firebaseAuth().signOut().then(() => {
            commit('ADD_MESSAGE', {
              message: 'Please log in with admin account',
              class: 'error'
            })
          })
          return
        }
      }).catch( error => {
        console.log(error)
      })
    },
    signUserOut ({commit}) {
      firebaseAuth().signOut().then(() => {
        commit('DISPLAY_LOADING', false)
        commit('SET_ADMIN', false)
      })
    },
    loadUserList ({commit}) {
      database.ref('users').once('value').then((data) => {
        const users = []
        const obj = data.val()

        for (let key in obj) {
          users.push({
            id: key, 
            name: obj[key].name,
            email: obj[key].email,
            isAdmin: obj[key].isAdmin
          })
        }

        commit('LOAD_USER_LIST', users)
      //  console.log(users)
      }).catch((error) => {
        console.log(error)
      })

    },
    displaySignIn ({commit}, payload) {
      commit('DISPLAY_SIGN_IN', payload)
    },
    displaySignUp ({commit}, payload) {
      commit('DISPLAY_SIGN_UP', payload)
    },
    displayConfirm ({commit}, payload) {
      commit('DISPLAY_CONFIRM', payload)
    },
    
    // PRODUCT
    loadProductList ({commit}) {
      database.ref('bikes').once('value').then((data) => {
        const bikes = []
        const obj = data.val()
        for (let key in obj) {
          bikes.push({
            id: key,
            quantity: obj[key].quantity,
            show: obj[key].show,
            title: obj[key].title,
            price: obj[key].price,
            imageUrl: obj[key].imageUrl,
            description: obj[key].description
            //quantity: 12
          })
        }
        commit('UPDATE_PRODUCT_LIST', bikes)
        commit('DISPLAY_BIKE_LOADING', false)
       // console.log(bikes)
      }).catch((error) => {
        console.log(error)
      })
    },

    //ADMIN
    createBike ({commit}, payload) {
      database.ref('bikes').child(payload.index).set(payload.bike)
      .then(() => {
        commit('SET_CREATED_BIKE', {
          ...payload.bike,
          id: payload.index
        })
        //console.log(payload.bike)
      }).catch((error) => {
        console.log(error)
      })
    },

    editBike({commit}, payload) {
      database.ref('bikes').child(payload.id).update(payload.bike).then(() => {
        commit('SET_UPDATED_BIKE', {
          ...payload.bike, 
          id: payload.id
        })
        //console.log(payload.bike)
      }).catch(error => {
        console.log(error)
      })
    },

    deleteBike ({commit}, payload) {
      const object = {}
      object.show = false
      database.ref('bikes').child(payload.id).update(object).then(() => {
        commit('SET_HIDED_BIKE', payload)
        //console.log(payload)
      }).catch(error => {
        console.log(error)
      })
    },

    unhideBike ({commit}, payload) {
      const object = {}
      object.show = true
      database.ref('bikes').child(payload.id).update(object).then(() => {
        commit('SET_UNHIDED_BIKE', payload)
        //console.log(payload)
      }).catch(error => {
        console.log(error)
      })
    },

    // TOURS
    createArticle ({commit}, payload) {
      database.ref('tours').push(payload).then((data) => {
        const key = data.key
        commit('SET_CREATED_ARTICLE', {
          id: key,
          ...payload 
        })
        console.log(payload)
      }).catch((error) => {
        console.log(error)
      })
    },

    loadArticleList ({commit}) {
      database.ref('tours').once('value').then((data) => {
        const tours = []
        const object = data.val()
        for (let key in object) {
          tours.push({
            id: key,
            content: object[key].content,
            title: object[key].title,
            author: object[key].author,
            date: object[key].date,
          })
        }
        commit('LOAD_ARTICLE_LIST', tours)
        commit('DISPLAY_TOUR_LOADING', false)
        //console.log(tours)
      }).catch((error) => {
        console.log(error)
      })
    },

    //BOOKINGS
    loadCountryList ({commit}) {
      axios.get('https://restcountries.eu/rest/v1/all')
      .then(response => {
        commit('LOAD_COUNTRY_LIST', response.data)
        //console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      })
    },
    saveToBookings ({commit}, payload) {
      database.ref('bookings/' + payload.uid).push(payload.booking).then((data) => {
        const key = data.key
        commit('SAVE_TO_BOOKINGS', {
          ...payload.booking, 
          id: key
        })
        //console.log(payload.booking)
      }).catch((error) => {
        console.log(error)
      })
    },
    loadBookingList ({commit}, uid) {
      database.ref('bookings/' + uid).once('value').then((data) => {
        const bookings = []
        const obj = data.val()
        for (let key in obj) {
          bookings.push({
            id: key,
            bikeId: obj[key].bikeId,
            quantity: obj[key].quantity,
            dayNumber: obj[key].dayNumber,
            start: obj[key].start,
            end: obj[key].end
          })
        }
        commit('LOAD_BOOKING_LIST', bookings)
        //console.log(bookings)
      }).catch((error) => {
        console.log(error)
      })
    },
    removeBooking({commit}, payload) {
      database.ref('bookings/' + payload.uid).child(payload.id).remove().then(() => {
        commit('REMOVE_BOOKING', payload)
        //console.log(payload.id)
      }).catch(error => {
        console.log(error)
      })
    },
    updateBooking ({commit}, payload) {
      database.ref(`bookings/${payload.uid}`).child(payload.booking.id).update(payload.booking).then(() => {
        commit('UPDATE_BOOKING', payload.booking)
        //console.log(payload.booking)
      }).catch(error => {
        console.log(error)
      })
    },

    // TRANSACTION
    saveToTransactions ({commit}, payload) {
      const transaction = {
        booking: payload.booking,
        info: payload.info,
        payment: payload.payment
      }
      database.ref('transactions/' + payload.uid).push(transaction).then((data) => {
        const key = data.key
        commit('SAVE_TRANSACTION', {
          ...transaction, 
          id: key,
        })
      }).catch(error => {
        console.log(error)
      })
    },
    loadTransactionList ({commit}, uid) {
      database.ref(`transactions/${uid}`).once('value').then((data) => {
        const transactions = []
        const obj = data.val()
        for (let key in obj) {
          transactions.push({
            id: key,
            booking: obj[key].booking,
            info: obj[key].info,
            payment: obj[key].payment,
          })
        }
        commit('LOAD_TRANSACTION_LIST', transactions)
        //console.log(transactions)
      }).catch((error) => {
        console.log(error)
      })
    },
  }
})
 