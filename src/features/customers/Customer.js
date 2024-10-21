import { useSelector } from 'react-redux';

const Customer = () => {
  const name = useSelector((store) => store.customer.fullName);

  return <h2>👋 Welcome{name ? `, ${name}` : ''}!</h2>;
};

export default Customer;
