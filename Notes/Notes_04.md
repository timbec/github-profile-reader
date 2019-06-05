#Section 04: 

- Brad doesn't recommend using a constructor to pass `state`, unless you need that constructor for something else. 
- `state` is just a JS object: 

`constructor() {
    super(); 
    this.state = {
        id: 'id', 
        log: 'something'
    }
}
`

instead of repeatign `this.state` over and over inside the `return()`, Brad recommends using destructuring, which is basically pulling out the contents of an object: 
`const { login, avatar_url, html} = this.state`

## Video 12: 

- Brad initializes state like so: 
`state = {
        users: []
    }
`

Then iterate through list like so: 
{this.state.users.map(user => (
                    <div key={user.id}>{user.login}</div>
                ))}

Brad passes in the entire `user` object from the `Users` to `UserITem` as a prop: 
`<UserItem key={user.id} user={user}></UserItem>`

## Video 13: 

- Brad prefers to use functional components for almost everything. The conversion is relatively simple: 

`const UserItem = (props) => {
        const { login, avatar_url, html_url } = props.user

        return (
            {login}, etc
        )
}`
Note that `props` is being passed in as a parameter, and we no longer use `this.state` but `props`

in some cases, Brad will desctructure `props` in the paramer of the function: 

`const UserItem = ({ user: { login, avatar_url, html_url } }) => {}`

Next Brad recommends moving the API call to the top level component, so `state` is set at the top level and accessed by the components below. 
If we had Redux or the Context API, we'd use those for a centralized location to collect data, but using the top level component is the next best thing. 

## Video 14

### Usering Lifecycle Methods: 

`componentDidMount` is generally used for fetching API data, the `App` component: 

`componentDidMount {};`

Original version: 
`
  componentDidMount() {
    axios.get('https://api.github.com/users').then(res => console.log(res.data));
  }
`
tightened up version. Is this still a promise? 
`async componentDidMount() {
    const res = await axios.get(); 
}
`

### Video 15

- images can be imported directly: 
`import spinner from './images/spinner.gif';`

for an arrow function component: `actf`

## Video 16

- we get the github API key here: 
https://github.com/settings/applications/new

load both keys in a .env.local (at root level) and add the following: 
`REACT_APP_GITHUB_CLIENT_ID=''`
`REACT_APP_GITHUB_CLIENT_SECRET='`

Then the call becomes: 
`    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret={process.env.REACT_APP_GITHUB_SECRET_ID}`);`

we use curly braces when the imported object is not the default export: 
`import { Link } from 'react-router-dom';`





