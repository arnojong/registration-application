parasails.registerPage('edit-profile', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    // Main syncing/loading state for this page.
    syncing: false,

    // Form data
    formData: { /* … */ },

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: { /* … */ },

    // Server error state for the form
    cloudError: '',

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach raw data exposed by the server.
    _.extend(this, SAILS_LOCALS);

    console.log('originele page');

    // Set the form data.
    this.formData.fullName = this.me.fullName;
    this.formData.emailAddress = this.me.emailChangeCandidate ? this.me.emailChangeCandidate : this.me.emailAddress;
    this.formData.initials = this.me.initials;
    this.formData.peopleSoftNumber = this.me.peopleSoftNumber;
    this.formData.rankRegistrationNumber = this.me.rankRegistrationNumber;
    this.formData.rank = this.me.rank;
    this.formData.address = this.me.address;
    this.formData.postalCode = this.me.postalCode;
    this.formData.hometown = this.me.hometown;
    this.formData.birthDate = this.me.birthDate;
    this.formData.phoneNumber1 = this.me.phoneNumber1
    this.formData.phoneNumber2 = this.me.phoneNumber2
    this.formData.emergencyContactName = this.me.emergencyContactName;
    this.formData.emergencyContactNumber = this.me.emergencyContactNumber;
    this.formData.driversLicenseA = this.me.driversLicenseA;
    this.formData.driversLicenseAM = this.me.driversLicenseAM;
    this.formData.driversLicenseB = this.me.driversLicenseB;
    this.formData.driversLicenseC = this.me.driversLicenseC;
    this.formData.driversLicenseD = this.me.driversLicenseD;
    this.formData.driversLicenseE = this.me.driversLicenseE;
    this.formData.eModuleBPBB = this.me.eModuleBPBB;
    this.formData.eModuleCBRN = this.me.eModuleCBRN;
    this.formData.eModuleHPG = this.me.eModuleHPG;
    this.formData.eModuleZHKH = this.me.eModuleZHKH;
    this.formData.eModulePWColt = this.me.eModulePWColt;
    this.formData.eModuleSAAAW = this.me.eModuleSAAAW;
    this.formData.eModuleMR = this.me.eModuleMR;
    this.formData.eModuleNI = this.me.eModuleNI;
    this.formData.eModulePP = this.me.eModulePP;
    this.formData.eModuleADR = this.me.eModuleADR;
    this.formData.amarokFamiliarization = this.me.amarokFamiliarization;
    this.formData.ARPDate = this.me.ARPDate;
    this.formData.swearingInDate = this.me.swearingInDate;
    this.formData.staminaTestDate = this.me.staminaTestDate;
    this.formData.other = this.me.other;

  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    submittedForm: async function() {
      // Redirect to the account page on success.
      // > (Note that we re-enable the syncing state here.  This is on purpose--
      // > to make sure the spinner stays there until the page navigation finishes.)
      this.syncing = true;
      window.location = '/account';
    },

    handleParsingForm: function() {
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = this.formData;

      // Validate name:
      if(!argins.fullName) {
        this.formErrors.fullName = true;
      }

      // Validate email:
      if(!argins.emailAddress) {
        this.formErrors.emailAddress = true;
      }

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return argins;
    },

  }
});
