const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

const accountReducer = (state = initialStateAccount, action) => {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload };
    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        balance: state.balance + action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case 'account/payLoan':
      if (state.loan <= 0) return state;
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };
    case 'account/convertingCurrency':
      return { ...state, isLoading: true };

    default:
      return state;
  }
};

const deposit = (amount, currency) => {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };

  return async (dispatch, getState) => {
    dispatch({ type: 'account/convertingCurrency' });

    const res = await fetch(
      `https://api.frankfurter.app/latest?base=${currency}&symbols=USD`
    );
    const data = await res.json();
    const convertedAmount = amount * data.rates['USD'];

    dispatch({ type: 'account/deposit', payload: convertedAmount });
  };
};
const withdraw = (amount) => ({ type: 'account/withdraw', payload: amount });
const requestLoan = (amount, purpose) => ({
  type: 'account/requestLoan',
  payload: { amount, purpose },
});
const payLoan = () => ({ type: 'account/payLoan' });

export default accountReducer;
export { deposit, withdraw, requestLoan, payLoan };
