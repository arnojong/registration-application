/**
 * FileController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  upload: async function  (req, res) {
    req.file('document').upload( async function (err, files) {
      let fileObject = files;
      let file = fileObject[0].fd;
      let name = req.body.name
      console.log(name);

      if (err)
        return res.serverError(err);

      if(name == 'amarokFamiliarizationFile') {
        await User.updateOne({id: req.me.id})
        .set({
          amarokFamiliarizationFile: file,
          amarokFamiliarizationStatus: 'Ontvangen'
        })
      }

      if(name == 'personalAppealListFile') {
        await User.updateOne({id: req.me.id})
        .set({
          personalAppealListFile: file,
          personalAppealListStatus: 'Ontvangen'
        })
      }

      if(name == 'VRAFile') {
        await User.updateOne({id: req.me.id})
        .set({
          VRAFile: file,
          VRAStatus: 'Ontvangen'
        })
      }

      if(name == 'BPBBFile') {
        await User.updateOne({id: req.me.id})
        .set({
          BPBBFile: file,
          BPBBStatus: 'Ontvangen'
        })
      }

      if(name == 'CBRNFile') {
        await User.updateOne({id: req.me.id})
        .set({
          CBRNFile: file,
          CBRNStatus: 'Ontvangen'
        })
      }

      if(name == 'HPGFile') {
        await User.updateOne({id: req.me.id})
        .set({
          HPGFile: file,
          HPGStatus: 'Ontvangen'
        })
      }

      if(name == 'ZHKHFile') {
        await User.updateOne({id: req.me.id})
        .set({
          ZHKHFile: file,
          ZHKHStatus: 'Ontvangen'
        })
      }

      if(name == 'PWColtFile') {
        await User.updateOne({id: req.me.id})
        .set({
          PWColtFile: file,
          PWColtStatus: 'Ontvangen'
        })
      }

      if(name == 'SAAAWFile') {
        await User.updateOne({id: req.me.id})
        .set({
          SAAAWFile: file,
          SAAAWStatus: 'Ontvangen'
        })
      }

      if(name == 'MRFile') {
        await User.updateOne({id: req.me.id})
        .set({
          MRFile: file,
          MRStatus: 'Ontvangen'
        })
      }

      if(name == 'NIFile') {
        await User.updateOne({id: req.me.id})
        .set({
          NIFile: file,
          NIStatus: 'Ontvangen'
        })
      }

      if(name == 'PPFile') {
        await User.updateOne({id: req.me.id})
        .set({
          PPFile: file,
          PPStatus: 'Ontvangen'
        })
      }

      if(name == 'ADRFile') {
        await User.updateOne({id: req.me.id})
        .set({
          ADRFile: file,
          ADRStatus: 'Ontvangen'
        })
      }

      return res.redirect('/documents')
    });
  },

  updateStatus: async function (req, res) {
    const name = req.body.name;
    const status = req.body.status;
    const userid = req.params.id;

    if(name == 'amarokFamiliarization') {
      await User.updateOne({id: userid})
      .set({
        amarokFamiliarizationStatus: status
      })
    }

    if(name == 'personalAppealList') {
      await User.updateOne({id: userid})
      .set({
        personalAppealListStatus: status
      })
    }

    if(name == 'VRA') {
      await User.updateOne({id: userid})
      .set({
        VRAStatus: status
      })
    }

    if(name == 'BPBB') {
      await User.updateOne({id: userid})
      .set({
        BPBBStatus: status
      })
    }

    if(name == 'CBRN') {
      await User.updateOne({id: userid})
      .set({
        CBRNStatus: status
      })
    }

    if(name == 'HPG') {
      await User.updateOne({id: userid})
      .set({
        HPGStatus: status
      })
    }

    if(name == 'ZHKH') {
      await User.updateOne({id: userid})
      .set({
        ZHKHStatus: status
      })
    }

    if(name == 'PWColt') {
      await User.updateOne({id: userid})
      .set({
        PWColtStatus: status
      })
    }

    if(name == 'SAAAW') {
      await User.updateOne({id: userid})
      .set({
        SAAAWStatus: status
      })
    }

    if(name == 'MR') {
      await User.updateOne({id: userid})
      .set({
        MRStatus: status
      })
    }

    if(name == 'NI') {
      await User.updateOne({id: userid})
      .set({
        NIStatus: status
      })
    }

    if(name == 'PP') {
      await User.updateOne({id: userid})
      .set({
        PPStatus: status
      })
    }

    if(name == 'ADR') {
      await User.updateOne({id: userid})
      .set({
        ADRStatus: status
      })
    }

    return res.redirect('/user/' + userid);

  }

};
