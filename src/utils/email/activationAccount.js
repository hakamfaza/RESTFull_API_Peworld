const activationAccount = (link) => {
  const htmlContent = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name='author' content='Muhamad Hakam Faza' >
  <title>Verification Email</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

    .container {
      background-color: #F0F5F9;
      width: 1028;
      height: 1091px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Lato', sans-serif;
    }
    .boxAction {
      position: relative;
      background-color: rgba(255, 255, 255, 1);
      width: 600px;
      height: 607px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 50px;
    }
    .title {
      color: rgba(37, 55, 87, 1);
    }
    .lock {
      margin-top: 50px;
    }
    .text {
      margin-top: 40px;
      max-width: 350px;
      text-align: center;
      color: rgba(70, 80, 92, 1);
      font-weight: 200;
    }
    .verification {
      color: rgba(255, 255, 255, 1);
      background-color: rgba(251, 176, 23, 1);
      padding: 7px 15px;
      border: none;
      font-size: 22px;
      border-radius: 2px;
      cursor: pointer;
      margin-top: 30px;
      text-decoration: none;
    }
    .footer {
      background-color: rgba(94, 80, 161, 1);
      width: 100%;
      height: 22px;
      position: absolute;
      bottom: 0;
    }
  </style>
</head>
<body>
  <div class='container'>
    <div class='boxAction'>
      <img src='../../../public/logo.svg' alt='logo' />
      <h1 class='title' >Verification Your Email</h1>
      <img src="../../../public/lock.svg" alt="lock" class='lock'>
      <p class='text'>The following is the button for you to reset
        the password.</p>
        <a class='verification' href=`${link}`>Verification</a>
        <footer class='footer' Halo</footer>
      </div>
    </div>
  </body>
</html>
  `
  return htmlContent
}

module.exports = activationAccount