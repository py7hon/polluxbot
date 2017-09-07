exports.run= function userSetup(user,args) {

    if (!args.userDB.get(user.id)) {
      console.log('Setting Up Member:' + user.username)

      args.userDB.set(user.id, args.defaults.udefal)

      var uu = args.userDB.get(user.id)
      uu.name = user.username
      uu.ID = user.id
      args.userDB.set(user.id, uu)

    } else {
      args.gear.normaliseUSER(user, args.userDB, args.DB)
    }
  } //DB
