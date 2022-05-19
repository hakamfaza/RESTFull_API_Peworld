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
  
      * {
        justify-content: center;
        font-family: 'Lato', sans-serif;
      }
  
      .container {
        background-color: #F0F5F9;
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
        padding: 3px 10px;
        border: none;
        font-size: 22px;
        border-radius: 2px;
        cursor: pointer;
        margin-top: 50px;
        text-decoration: none;
      }
      .footer {
        margin-top: 50px;
        background-color: rgba(94, 80, 161, 1);
        width: 100%;
        height: 22px;
      }
    </style>
  </head>
  <body>
      <table align="center" cellpadding="0" cellspacing="0" width="600" class='container' >
        <tr>
         <td align='center'>
         <h1 class='title' >PEWORLD</h1>
         </td>
        </tr>
        <tr>
         <td align='center'>
          <h1 class='title' >Verification Your Email</h1>
         </td>
        </tr>
        <tr>
          <td align='center'>
            <p class='text'>The following is the button for you to reset
              the password.</p>
          </td>
         </tr>
         <tr>
          <td align='center'>
            <a class='verification' href='${link}'>Verify Account</a>
          </td>
         </tr>
         <tr>
          <td align='center'>
            <div class='footer'></div>
          </td>
         </tr>
       </table>
    </body>
  </html>
  `;
  return htmlContent;
};

module.exports = activationAccount;
