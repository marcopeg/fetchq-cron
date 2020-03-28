```js
const [errors, setErrors] = React.useState(null);
const [dismissable, setDismissable] = React.useState(true);
const generateErrors = () => setErrors([{ message: 'foobar' }]);
const generateErrorsTimeout = () => {
  setErrors([{ message: 'foobar' }]);
  setTimeout(() => setErrors(null), 1000);
};
const clearErrors = () => setErrors(null);
<>
  <ErrorsDialog errors={errors} dismissable={dismissable} title="Modal title">
    it was not possible to foobar
  </ErrorsDialog>
  <button onClick={generateErrors}>Generate errors</button>
  <button onClick={generateErrorsTimeout}>Generate errors with timeout</button>
  <button onClick={clearErrors}>Clear errors</button>
  <button onClick={() => setDismissable(!dismissable)}>
    {dismissable ? 'dismissable' : 'not dismissable'}
  </button>
</>;
```
