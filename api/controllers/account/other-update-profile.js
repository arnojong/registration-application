module.exports = {


  friendlyName: 'Update profile',


  description: 'Update the profile for someone else.',


  inputs: {

    fullName: {
      type: 'string'
    },

    id: {
      type: 'number'
    },

    emailAddress: {
      type: 'string'
    },

    initials: {
      type: 'string'
    },

    peopleSoftNumber: {
      type: 'string'
    },

    rankRegistrationNumber: {
      type: 'string'
    },

    rank: {
      type: 'string'
    },

    address: {
      type: 'string'
    },

    postalCode: {
      type: 'string',
    },

    hometown: {
      type: 'string',
    },

    phoneNumber1: {
      type: 'string'
    },

    phoneNumber2: {
      type: 'string'
    },

    emergencyContactName: {
      type: 'string'
    },

    emergencyContactNumber: {
      type: 'string'
    },

    birthDate: {
      type: 'string'
    },

    driversLicenseA: {
      type: 'boolean'
    },

    driversLicenseAM: {
      type: 'boolean'
    },

    driversLicenseB: {
      type: 'boolean'
    },

    driversLicenseC: {
      type: 'boolean'
    },

    driversLicenseD: {
      type: 'boolean'
    },

    driversLicenseE: {
      type: 'boolean'
    },

    eModuleBPBB: {
      type: 'boolean',
    },

    eModuleCBRN: {
      type: 'boolean',
    },

    eModuleHPG: {
      type: 'boolean',
    },

    eModuleZHKH: {
      type: 'boolean',
    },

    eModulePWColt: {
      type: 'boolean',
    },

    eModuleSAAAW: {
      type: 'boolean',
    },

    eModuleMR: {
      type: 'boolean',
    },

    eModuleNI: {
      type: 'boolean',
    },

    eModulePP: {
      type: 'boolean',
    },

    eModuleADR: {
      type: 'boolean',
    },

    amarokFamiliarization: {
      type: 'boolean'
    },

    ARPDate: {
      type: 'string'
    },

    swearingInDate: {
      type: 'string'
    },

    staminaTestDate: {
      type: 'string'
    },

    other: {
      type: 'string'
    }

  },


  exits: {

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },

  },


  fn: async function (inputs) {

    var newEmailAddress = inputs.emailAddress;
    if (newEmailAddress !== undefined) {
      newEmailAddress = newEmailAddress.toLowerCase();
    }

    // Determine if this request wants to change the current user's email address,
    // revert her pending email address change, modify her pending email address
    // change, or if the email address won't be affected at all.
    var desiredEmailEffect;// ('change-immediately', 'begin-change', 'cancel-pending-change', 'modify-pending-change', or '')
    if (
      newEmailAddress === undefined ||
      (this.req.me.emailStatus !== 'change-requested' && newEmailAddress === this.req.me.emailAddress) ||
      (this.req.me.emailStatus === 'change-requested' && newEmailAddress === this.req.me.emailChangeCandidate)
    ) {
      desiredEmailEffect = '';
    } else if (this.req.me.emailStatus === 'change-requested' && newEmailAddress === this.req.me.emailAddress) {
      desiredEmailEffect = 'cancel-pending-change';
    } else if (this.req.me.emailStatus === 'change-requested' && newEmailAddress !== this.req.me.emailAddress) {
      desiredEmailEffect = 'modify-pending-change';
    } else if (!sails.config.custom.verifyEmailAddresses || this.req.me.emailStatus === 'unconfirmed') {
      desiredEmailEffect = 'change-immediately';
    } else {
      desiredEmailEffect = 'begin-change';
    }


    // // If the email address is changing, make sure it is not already being used.
    // if (_.contains(['begin-change', 'change-immediately', 'modify-pending-change'], desiredEmailEffect)) {
    //   let conflictingUser = await User.findOne({
    //     or: [
    //       { emailAddress: newEmailAddress },
    //       { emailChangeCandidate: newEmailAddress }
    //     ]
    //   });
    //   if (conflictingUser) {
    //     throw 'emailAlreadyInUse';
    //   }
    // }

    let driversLicenses = ''

    if (inputs.driversLicenseA) {
      driversLicenses += 'A, '
    }

    if (inputs.driversLicenseAM) {
      driversLicenses += 'AM, '
    }

    if (inputs.driversLicenseB) {
      driversLicenses += 'B, '
    }

    if (inputs.driversLicenseC) {
      driversLicenses += 'C, '
    }

    if (inputs.driversLicenseD) {
      driversLicenses += 'D, '
    }

    if (inputs.driversLicenseE) {
      driversLicenses += 'E, '
    }

    driversLicenses = driversLicenses.substring(0, driversLicenses.length - 2);

    if(!driversLicenses) {
      driversLicenses = 'Geen'
    }

    let eModules = '';

    if (inputs.eModuleBPBB) {
      eModules += 'BP_BB, '
    }

    if (inputs.eModuleCBRN) {
      eModules += 'CBRN, '
    }

    if (inputs.eModuleZHKH) {
      eModules += 'HPG, '
    }

    if (inputs.eModuleBPBB) {
      eModules += 'ZHKH, '
    }

    if (inputs.eModulePWColt) {
      eModules += 'PW Colt, '
    }

    if (inputs.eModuleSAAAW) {
      eModules += 'SA_AAW, '
    }

    if (inputs.eModuleMR) {
      eModules += 'MR, '
    }

    if (inputs.eModuleNI) {
      eModules += 'NI, '
    }

    if (inputs.eModulePP) {
      eModules += 'PP, '
    }

    if (inputs.eModuleADR) {
      eModules += 'ADR, '
    }

    eModules = eModules.substring(0, eModules.length - 2);

    // Start building the values to set in the db.
    // (We always set the fullName if provided.)
    var valuesToSet = {
      fullName: inputs.fullName,
      initials: inputs.initials,
      peopleSoftNumber: inputs.peopleSoftNumber,
      rankRegistrationNumber: inputs.rankRegistrationNumber,
      rank: inputs.rank,
      address: inputs.address,
      postalCode: inputs.postalCode,
      hometown: inputs.hometown,
      birthDate: inputs.birthDate,
      phoneNumber1: inputs.phoneNumber1,
      phoneNumber2: inputs.phoneNumber2,
      emergencyContactName: inputs.emergencyContactName,
      emergencyContactNumber: inputs.emergencyContactNumber,
      driversLicenses: driversLicenses,
      driversLicenseA: inputs.driversLicenseA,
      driversLicenseAM: inputs.driversLicenseAM,
      driversLicenseB: inputs.driversLicenseB,
      driversLicenseC: inputs.driversLicenseC,
      driversLicenseD: inputs.driversLicenseD,
      driversLicenseE: inputs.driversLicenseE,
      eModules: eModules,
      eModuleBPBB: inputs.eModuleBPBB,
      eModuleCBRN: inputs.eModuleCBRN,
      eModuleHPG: inputs.eModuleHPG,
      eModuleZHKH: inputs.eModuleZHKH,
      eModulePWColt: inputs.eModulePWColt,
      eModuleSAAAW: inputs.eModuleSAAAW,
      eModuleMR: inputs.eModuleMR,
      eModuleNI: inputs.eModuleNI,
      eModulePP: inputs.eModulePP,
      eModuleADR: inputs.eModuleADR,
      amarokFamiliarization: inputs.amarokFamiliarization,
      ARPDate: inputs.ARPDate,
      swearingInDate: inputs.swearingInDate,
      staminaTestDate: inputs.staminaTestDate,
      other: inputs.other
    };

    switch (desiredEmailEffect) {

      // Change now
      case 'change-immediately':
        _.extend(valuesToSet, {
          emailAddress: newEmailAddress,
          emailChangeCandidate: '',
          emailProofToken: '',
          emailProofTokenExpiresAt: 0,
          emailStatus: this.req.me.emailStatus === 'unconfirmed' ? 'unconfirmed' : 'confirmed'
        });
        break;

      // Begin new email change, or modify a pending email change
      case 'begin-change':
      case 'modify-pending-change':
        _.extend(valuesToSet, {
          emailChangeCandidate: newEmailAddress,
          emailProofToken: await sails.helpers.strings.random('url-friendly'),
          emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL,
          emailStatus: 'change-requested'
        });
        break;

      // Cancel pending email change
      case 'cancel-pending-change':
        _.extend(valuesToSet, {
          emailChangeCandidate: '',
          emailProofToken: '',
          emailProofTokenExpiresAt: 0,
          emailStatus: 'confirmed'
        });
        break;

      // Otherwise, do nothing re: email
    }

    // Save to the db
    await User.updateOne({id: inputs.id })
    .set(valuesToSet);

    // If this is an immediate change, and billing features are enabled,
    // then also update the billing email for this user's linked customer entry
    // in the Stripe API to make sure they receive email receipts.
    // > Note: If there was not already a Stripe customer entry for this user,
    // > then one will be set up implicitly, so we'll need to persist it to our
    // > database.  (This could happen if Stripe credentials were not configured
    // > at the time this user was originally created.)
    if(desiredEmailEffect === 'change-immediately' && sails.config.custom.enableBillingFeatures) {
      let didNotAlreadyHaveCustomerId = (! this.req.me.stripeCustomerId);
      let stripeCustomerId = await sails.helpers.stripe.saveBillingInfo.with({
        stripeCustomerId: this.req.me.stripeCustomerId,
        emailAddress: newEmailAddress
      }).timeout(5000).retry();
      if (didNotAlreadyHaveCustomerId){
        await User.updateOne({ id: this.req.me.id })
        .set({
          stripeCustomerId
        });
      }
    }

    // If an email address change was requested, and re-confirmation is required,
    // send the "confirm account" email.
    if (desiredEmailEffect === 'begin-change' || desiredEmailEffect === 'modify-pending-change') {
      await sails.helpers.sendTemplateEmail.with({
        to: newEmailAddress,
        subject: 'Your account has been updated',
        template: 'email-verify-new-email',
        templateData: {
          fullName: inputs.fullName||this.req.me.fullName,
          token: valuesToSet.emailProofToken
        }
      });
    }

  }


};
