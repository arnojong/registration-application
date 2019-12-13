module.exports = {


  friendlyName: 'View documents',


  description: 'Display "Documents" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/documents'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
