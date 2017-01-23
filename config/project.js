exports.config = {

  "ALL": {
    "AUTH": {
      "LOGIN_STATE": "user.auth.login"
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
