const EmailTemplate = (url) => {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Email Template</title>
    <style>
      /* Add your custom styles here */
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background-color: #b89563;
        padding: 10px;
        text-align: center;
      }
      .header img {
        max-width: 200px;
      }
      .content {
        padding: 20px;
      }
      .footer {
        background-color: #b89563;
        padding: 20px;
        text-align: center;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th,
      td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        "
      >
        <img style="max-width: 200px" src="./logo/logo.png" alt="Logo" />
        <a
          href="#"
          style="color: #b89563; text-decoration: none; font-weight: bold"
          >My Account</a
        >
      </div>
      <div class="header">
        <h1 style="color: #fff">Sample Email Header</h1>
      </div>
      <div class="content">
        <!-- <p>Email content goes here</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
          sint error, ipsa ullam nesciunt voluptatem. Quasi aut animi adipisci
          accusantium quis ipsa asperiores beatae ullam. Quibusdam, debitis
          voluptates. Fugit, ratione.
        </p> -->
        <div class="content">
          <div
            style="display: flex; flex-direction: column; align-items: center"
          >
            <h1>Welcome!</h1>
            <a
              style="
                padding: 20px 50px;
                background-color: black;
                color: #fff;
                text-decoration: none;
              "
              href="${url}"
              >Activate Account</a
            >
          </div>
        </div>
      </div>
      <div class="footer">
        <p style="color: #fff">&copy; 2023 Signamax. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>

    `;
};

module.exports = EmailTemplate;
