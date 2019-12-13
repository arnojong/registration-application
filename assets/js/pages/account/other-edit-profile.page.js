parasails.registerPage('other-edit-profile', {
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

    // Set the form data.
    this.formData.id = this.user.id;
    this.formData.fullName = this.user.fullName;
    this.formData.emailAddress = this.user.emailChangeCandidate ? this.user.emailChangeCandidate : this.user.emailAddress;
    this.formData.initials = this.user.initials;
    this.formData.peopleSoftNumber = this.user.peopleSoftNumber;
    this.formData.rankRegistrationNumber = this.user.rankRegistrationNumber;
    this.formData.rank = this.user.rank;
    this.formData.address = this.user.address;
    this.formData.postalCode = this.user.postalCode;
    this.formData.hometown = this.user.hometown;
    this.formData.birthDate = this.user.birthDate;
    this.formData.phoneNumber1 = this.user.phoneNumber1
    this.formData.phoneNumber2 = this.user.phoneNumber2
    this.formData.emergencyContactName = this.user.emergencyContactName;
    this.formData.emergencyContactNumber = this.user.emergencyContactNumber;
    this.formData.driversLicenseA = this.user.driversLicenseA;
    this.formData.driversLicenseAM = this.user.driversLicenseAM;
    this.formData.driversLicenseB = this.user.driversLicenseB;
    this.formData.driversLicenseC = this.user.driversLicenseC;
    this.formData.driversLicenseD = this.user.driversLicenseD;
    this.formData.driversLicenseE = this.user.driversLicenseE;
    this.formData.eModuleBPBB = this.user.eModuleBPBB;
    this.formData.eModuleCBRN = this.user.eModuleCBRN;
    this.formData.eModuleHPG = this.user.eModuleHPG;
    this.formData.eModuleZHKH = this.user.eModuleZHKH;
    this.formData.eModulePWColt = this.user.eModulePWColt;
    this.formData.eModuleSAAAW = this.user.eModuleSAAAW;
    this.formData.eModuleMR = this.user.eModuleMR;
    this.formData.eModuleNI = this.user.eModuleNI;
    this.formData.eModulePP = this.user.eModulePP;
    this.formData.eModuleADR = this.user.eModuleADR;
    this.formData.amarokFamiliarization = this.user.amarokFamiliarization;
    this.formData.ARPDate = this.user.ARPDate;
    this.formData.swearingInDate = this.user.swearingInDate;
    this.formData.staminaTestDate = this.user.staminaTestDate;
    this.formData.other = this.user.other;

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
      window.location = '/user/' + this.user.id;
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
