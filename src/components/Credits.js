/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Credits = (props) => {
  // Create the list of Credits items
  let creditsView = () => {
    const { credits } = props;
    return credits.map((credit) => {  // Extract "id", "amount", "description" and "date" properties of each credits JSON array element
      let date = credit.date.slice(0,10);
      return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
    }) 
  }
  const handleSubmit = (event) =>
  {
    event.preventDefault();
    let date = new Date().toISOString(); //generate the date for the object
    let credit = {
      amount: event.target.amount.value,
      date: date,
      description: event.target.description.value,
    }//credit json object to be added to list
    props.addCredit(credit); //add the new object to the credit list
  }
  // Render the list of credit items and a form to input new credit item
  return (
    <div>
      <h1>Credits</h1>
      <AccountBalance accountBalance={props.accountBalance}/> 
      <br/>
      
      {creditsView()}
      <form onSubmit={event => {handleSubmit(event)} }>
        <input type="text" name="description" />
        <input type="number" name="amount" min="0" step=".01"/>
        <button type="submit">Add Credit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  )
}

export default Credits;