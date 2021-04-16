import React from 'react';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import ChallengeCard from '../../components/ChallengeCard';
import EnsureLoggedIn from '../../components/EnsureLoggedIn';
import * as api from '../../api/Challenge';
import Loading from '../../components/Loading';
import Toast from '../../helpers/Toast';
import { Container } from 'react-bootstrap';
export default class SearchUserPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    render()
    {
        return(
            <EnsureLoggedIn>
                <div>Hello</div>
            </EnsureLoggedIn>
        );
    }
}