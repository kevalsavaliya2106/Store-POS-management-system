import CustomerForm from './CustomerForm';
import styles from './CustomerPage.module.css';

const CustomerPage = () => {
  return (
    <div>
      <h1 className={styles.title}>Customer Management</h1>
      <CustomerForm />
    </div>
  );
};

export default CustomerPage;
