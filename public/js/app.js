
$('document').ready(function() {
  var AUTH0_DOMAIN = "meldejesus.auth0.com";
  var AUTH0_CLIENT_ID = "yUrxNF8j6H6l4kB4ahlKDeMamO6fx00l";
  var AUTH0_CALLBACK_URL = "http://localhost:3000/add";
  var webAuth = new auth0.WebAuth({
      domain: AUTH0_DOMAIN,
      clientID: AUTH0_CLIENT_ID,
      redirectUri: AUTH0_CALLBACK_URL,
      audience: 'https://' + AUTH0_DOMAIN + '/userinfo',
      responseType: 'token id_token',
      scope: 'openid'
    });
  
    var loginBtn = $('#btn-login');
  
    loginBtn.click(function(e) {
      e.preventDefault();
      webAuth.authorize();
    });
  
  });

  //  YO --- 

  
// window.addEventListener('load', function() {

//   var webAuth = new auth0.WebAuth({
//     domain: 'app70749112.auth0.com',
//     clientID: 'zCiVXnoOy0yq58TOYCdTpB4UWDY5d8UQ',
//     redirectUri: 'https://roadie2017.herokuapp.com/add',
//     audience: 'https://app70749112.auth0.com/userinfo',
//     responseType: 'token id_token',
//     scope: 'openid'
//   });


//   var loginBtn = document.getElementById('btn-login');

//   loginBtn.addEventListener('click', function(e) {
//     e.preventDefault();
//     webAuth.authorize();
//   });

// });

// window.addEventListener('load', function() {

//   // ...
//   var loginStatus = document.querySelector('.container h4');
//   var loginView = document.getElementById('login-view');
//   var homeView = document.getElementById('home-view');

//   // buttons and event listeners
//   var homeViewBtn = document.getElementById('btn-home-view');
//   var loginBtn = document.getElementById('btn-login');
//   var logoutBtn = document.getElementById('btn-logout');

//   homeViewBtn.addEventListener('click', function() {
//     homeView.style.display = 'inline-block';
//     loginView.style.display = 'none';
//   });

//   logoutBtn.addEventListener('click', logout);

//   function setSession(authResult) {
//     // Set the time that the access token will expire at
//     var expiresAt = JSON.stringify(
//       authResult.expiresIn * 1000 + new Date().getTime()
//     );
//     localStorage.setItem('access_token', authResult.accessToken);
//     localStorage.setItem('id_token', authResult.idToken);
//     localStorage.setItem('expires_at', expiresAt);
//   }

//   function logout() {
//     // Remove tokens and expiry time from localStorage
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('id_token');
//     localStorage.removeItem('expires_at');
//     displayButtons();
//   }

//   function isAuthenticated() {
//     // Check whether the current time is past the
//     // access token's expiry time
//     var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
//     return new Date().getTime() < expiresAt;
//   }


//   function handleAuthentication() {
//     webAuth.parseHash(function(err, authResult) {
//       if (authResult && authResult.accessToken && authResult.idToken) {
//         window.location.hash = '';
//         setSession(authResult);
//         loginBtn.style.display = 'none';
//         homeView.style.display = 'inline-block';
//       } else if (err) {
//         homeView.style.display = 'inline-block';
//         console.log(err);
//         alert(
//           'Error: ' + err.error + '. Check the console for further details.'
//         );
//       }
//       displayButtons();
//     });
//   }

//   function displayButtons() {
//     if (isAuthenticated()) {
//       loginBtn.style.display = 'none';
//       logoutBtn.style.display = 'inline-block';
//       loginStatus.innerHTML = 'You are logged in!';
//     } else {
//       loginBtn.style.display = 'inline-block';
//       logoutBtn.style.display = 'none';
//       loginStatus.innerHTML =
//         'You are not logged in! Please log in to continue.';
//     }
//   }

//    handleAuthentication();

   
// });