import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import { compose } from 'recompose';

class AdminPage extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.doGetAnswersV2('gtang.gt');

    this.props.firebase.users().on('value', snapshot => {
      const userObj = snapshot.val();

      const userList = Object.keys(userObj).map(key => ({
        ...userObj[key],
        uid: key,
      }));

      this.setState({
        users: userList,
        loading: false
      });

    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>
        {loading && <div>Loading ...</div>}
        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);

const condition = authUser => !!authUser;

const Admin = compose(
  withAuthorization(condition),
  withFirebase
) (AdminPage);



export default Admin;
