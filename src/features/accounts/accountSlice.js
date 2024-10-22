import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
    },

    withdraw(state, action) {
      state.balance -= action.payload;
    },

    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: {
            amount,
            purpose,
          },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.balance += action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },

    payLoan(state) {
      if (state.loan <= 0) return;

      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = '';
    },

    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
export const deposit = (amount, currency) => {
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

export default accountSlice.reducer;
