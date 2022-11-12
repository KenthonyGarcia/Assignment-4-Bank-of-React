/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0.00,
      credits: [],
      debits: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    }
  }
  async componentDidMount() 
  {
    let credit_total = 0
    //retrieving credits from api
    try 
    {
      let result = await axios.get('https://moj-api.herokuapp.com/credits');
      this.setState({credits: result.data});//setting creditList to the data from result
      for (let credit of this.state.credits) { 
        credit_total += credit.amount;//getting the total credits that will be subtracted by total debits for accountbalance
      }
      
    }
    catch (error) 
    {
      if (error.result) 
      {
        console.log(error.result.data);
        console.log(error.result.status);
      }
    }
    this.setState({accountBalance:Math.round(credit_total * 100) / 100});//dividing number by 100 to get the hundredths place
  }
  
  addCredit = (credit) => 
  {
    let temp = {}; //create a temporary object that will contain the added credits description, amount, and date.
    temp.id = credit.id;
    temp.description = credit.description;
    temp.amount = Math.round(credit.amount * 100)/100;
    temp.date = credit.date;
    let curCredits = this.state.credits; //setting new list to old list
    curCredits.push(temp);
    this.setState({credit: curCredits});
    //updating account balance
    this.setState({accountBalance: Math.round((Number(this.state.accountBalance) + Number(credit.amount)) * 100) / 100}); //set account balance to the new balance
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }
  
  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.credits} accountBalance={this.state.accountBalance} addCredit = {this.addCredit}/>)
    const DebitsComponent = () => (<Debits debits={this.state.debits} />) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/Assignment-4-Bank-of-React">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;