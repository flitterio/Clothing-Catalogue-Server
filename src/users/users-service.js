const bcrypt = require('bcryptjs/dist/bcrypt')
const xss = require('xss')

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const UsersService = {
  
    hasUserWithUserName(db, username) {
     return db('cc_users')
            .where({ username })
            .first()
            .then(user => !!user)
           },

    getUserInfo(db, id){
      return db('cc_users')
          .where({ id })
          .first()
    },

    deleteUser(knex, id) {
      return knex('cc_users')
        .where({ id })
        .delete()
    },
    updateUser(knex, id, newUserFields) {
      return knex('cc_users')
        .where({ id })
        .update(newUserFields)
    },

    insertUser(db, newUser) {
             return db
               .insert(newUser)
               .into('cc_users')
               .returning('*')
               .then(([user]) => user)
           },
    validatePassword(password) {
      if (password.length < 8) {
        return 'Password must be longer than 8 characters'
      }
      if (password.length > 72) {
        return 'Password must be less than 72 characters'
      }
      if (password.startsWith(' ') || password.endsWith(' ')) {
             return 'Password must not start or end with empty spaces'
           }
       if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
             return 'Password must contain 1 upper case, lower case, number and special character'
         }
         return null
    },
    hashPassword(password) {
        return bcrypt.hash(password, 12)
    },
    serializeUser(user) {
         return {
           id: user.id,
           fname: xss(user.fname),
           lname: xss(user.lname),
           username: xss(user.username),
           email: xss(user.email),
           date_created: new Date(user.date_created),
        }
       },

  }
  
  module.exports = UsersService