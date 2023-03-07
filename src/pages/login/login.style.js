export default /* css */ `
.wrapper {
    margin-top: 80px;
    margin-bottom: 80px;
    display: grid;
    grid-template-rows: auto 1fr auto; /* define as linhas da grid */
    row-gap: 30px; /* define o espaçamento entre as linhas */
  }

  .form-signin {
    max-width: 380px;
    padding: 15px 35px 45px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    grid-row: 2; /* define em qual linha da grid esse item deve estar */
  }

  .form-signin .form-signin-heading,
  .form-signin .checkbox {
    margin-bottom: 0; /* remove o espaçamento definido anteriormente */
  }

  .form-signin .checkbox {
    font-weight: normal;
    grid-row: 3; /* define em qual linha da grid esse item deve estar */
  }

  .form-signin .form-control {
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    grid-row: 1; /* define em qual linha da grid esse item deve estar */
  }

  .form-signin .form-control:focus {
    z-index: 2;
  }

  .form-signin input[type=text] {
    margin-bottom: 0; /* remove o espaçamento definido anteriormente */
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .form-signin input[type=password] {
    margin-bottom: 0; /* remove o espaçamento definido anteriormente */
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;
