import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  }

  submit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/user/create', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    });
    const { success } = await res.json();
    alert(`Result: ${success}`);

    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });
  }

  changeValue = async (param, value) => {
    await this.setState({
      [param]: value
    });
    console.log(this.state);
  }

  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.submit}>
            <label>
              First Name:
              <input value={this.state.firstName} type='text' name='firstName' onChange={(event) => this.changeValue('firstName', event.target.value)} />
            </label>
            <label>
              Last Name:
              <input value={this.state.lastName} type='text' name='lastName' onChange={(event) => this.changeValue('lastName', event.target.value)} />
            </label>
            <label>
              Email Address:
              <input value={this.state.email} type='text' name='email' onChange={(event) => this.changeValue('email', event.target.value)} />
            </label>
            <label>
              Password:
              <input value={this.state.password} type='password' name='password' onChange={(event) => this.changeValue('password', event.target.value)} />
            </label>
            <input type='submit' value='Submit' />
          </form>
        </header>
      </div>
    );
  }
}

export default App;
