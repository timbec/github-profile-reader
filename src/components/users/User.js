import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';


export class User extends Component {
    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
    }

    static propTypes = {
        loading: PropTypes.bool,
        getUser: PropTypes.func.isRequired,
    }

    render() {
        console.log(this.props.user)
        const {
            id, 
            login,
            organizations_url,
            received_events,
            repos_url,
            score,
            starred_url,
            avatar_url, 
            events_url, 
            followers_url,
            following_url,
            gists_url, 
            html_url,
            subscriptions_url,
            type, 
            url, 
            bio, 
            blog, 
            company, 
            hireable, 
            location

        } = this.props.user;

        const { loading } = this.props;

        if (loading) return <Spinner />;

        return (
            <Fragment>
                <Link to='/' className='btn btn-light'>
                    Back To Search
      </Link>
                Hireable:{' '}
                {hireable ? (
                    <i className='fas fa-check text-success' />
                ) : (
                        <i className='fas fa-times-circle text-danger' />
                    )}
                <div className='card grid-2'>
                    <div className='all-center'>
                        <img
                            src={avatar_url}
                            className='round-img'
                            alt=''
                            style={{ width: '150px' }}
                        />
                        <h1>{login}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div>
                        {bio && (
                            <Fragment>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </Fragment>
                        )}
                        <a href={html_url} className='btn btn-dark my-1'>
                            Visit Github Profile
          </a>
                        <ul>
                            <li>
                                {login && (
                                    <Fragment>
                                        <strong>Username: </strong> {login}
                                    </Fragment>
                                )}
                            </li>

                            <li>
                                {company && (
                                    <Fragment>
                                        <strong>Company: </strong> {company}
                                    </Fragment>
                                )}
                            </li>

                            <li>
                                {blog && (
                                    <Fragment>
                                        <strong>Website: </strong> {blog}
                                    </Fragment>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>

            </Fragment>
        )
    }
}

export default User
