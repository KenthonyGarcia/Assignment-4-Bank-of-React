/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Debits = (props) => {
  // Create the list of Debit items
  let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    }) 
  }
  const handleSubmit = (event) =>
  {
    event.preventDefault();
    let date = new Date().toISOString(); //generate the date for the object
    let debit = {
      amount: event.target.amount.value,
      date: date,
      description: event.target.description.value,
    }//credit json object to be added to list
    props.addDebit(debit); //add the new object to the credit list
  }
  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>
      <AccountBalance accountBalance={props.accountBalance}/>
      <br/>
      {debitsView()}

      <form onSubmit={handleSubmit}>
        <input type="text" name="description" />
        <input type="number" name="amount" />
        <button type="submit">Add Debit</button>
      </form>
      <br/>
      
      <Link to="/">Return to Home</Link>
    </div>
  )
}

export default Debits;