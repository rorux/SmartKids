import Materialize from 'materialize-css';

export default {
  install: (app) => {
    app.config.globalProperties.$message = (html) => {
      Materialize.toast({html: html, displayLength: 3000})
    },
    app.config.globalProperties.$error = (html) => {
      Materialize.toast({html: `[ERROR]: ${html}`, displayLength: 3000})
    }
  }
}
