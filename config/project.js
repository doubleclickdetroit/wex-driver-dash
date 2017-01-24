exports.config = {

  "ALL": {
    "AUTH": {
      "CLIENT_ID":     "driverDashManagement",
      "CLIENT_SECRET": "H=hcAFk@txfNaQ2Lp46sPDK&&sY^ggrK7w5n*xV!",
      "SCOPE":         [ 'accounts', 'user:account_management', 'drivers' ]
    },
    "ENDPOINTS": {
      "AUTH": "/uaa/oauth/token"
    }
  },

  "TEST": {
    "API": {
      "AUTH": "http://localhost:4200"
    }
  },

  "DIT": {
    "API": {
      "AM":            "http://pwm-wex-178.wrightexpress.com:20080",
      "AUTH":          "http://pwm-wex-178.wrightexpress.com:26080",
      "CONFIGURATION": "http://pwm-wex-178.wrightexpress.com:29080"
    }
  },

  "PROD": {
    "API": {
      "AM":            "https://account.wexmobile.com/maintenance",
      "AUTH":          "https://account.wexmobile.com/authAPI",
      "CONFIGURATION": "https://account.wexmobile.com/configurationAPI"
    }
  }

};
