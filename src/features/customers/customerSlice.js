const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

const customerReducer = (state = initialStateCustomer, action) => {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case 'customer/updateName':
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
};

const createCustomer = (fullName, nationalID) => ({
  type: 'customer/createCustomer',
  payload: {
    fullName,
    nationalID,
    createdAt: new Date().toISOString(),
  },
});

const updateName = (fullName) => ({
  type: 'customer/updateName',
  payload: fullName,
});

export { customerReducer, createCustomer, updateName };
