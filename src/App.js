import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currentUser: null
  //   }
  // }

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          // this.setState({
          //   currentUser: {
          //     id: snapshot.id,
          //     ...snapshot.data()
          //   }
          // },()=>{
          //   console.log(this.state)
          // })
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      }
      setCurrentUser(userAuth)
      // createUserProfileDocument(user)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        {/* <Header currentUser={this.state.currentUser} /> */}
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
