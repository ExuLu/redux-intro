const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

const accountReducer = (state = initialStateAccount, action) => {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload };
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
    default:
      return state;
  }
};

const deposit = (amount) => ({ type: 'account/deposit', payload: amount });
const withdraw = (amount) => ({ type: 'account/withdraw', payload: amount });
const requestLoan = (amount, purpose) => ({
  type: 'account/requestLoan',
  payload: { amount, purpose },
});
const payLoan = () => ({ type: 'account/payLoan' });

export { accountReducer, deposit, withdraw, requestLoan, payLoan };
