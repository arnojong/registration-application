module.exports = {

  viewUsers: async function(req, res) {
    const users = await User.find();
    return res.view('pages/users', {users});
  },

  userDetail: async function (req, res) {
    try {
      const user = await User.findOne({id: req.params.id});
      return res.view('pages/user', {user});
    } catch (err) {
      return res.view('500', {data: err});
    }
  },

  toggleAdmin: async function (req, res) {
    try {
      const user = await User.findOne({id: req.params.id});
      const isSuperAdmin = user.isSuperAdmin;
      await User.updateOne({id: req.params.id})
      .set({
        isSuperAdmin: !isSuperAdmin
      })
      const users = await User.find();
      return res.view('pages/users', {users});
    } catch (err) {
      return res.view('500', {data: err});
    }
  },

  editProfile: async function (req, res) {
    try {
      const user = await User.findOne({id: req.params.id});
      return res.view('pages/account/other-edit-profile', {user});
    } catch (err) {
      return res.view('500', {data: err});
    }
  }
};
