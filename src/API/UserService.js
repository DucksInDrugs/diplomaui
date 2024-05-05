import { useNavigate } from 'react-router-dom';
import { BehaviorSubject } from 'rxjs';
import Cookies from 'js-cookie';

import { history } from '../helpers/history';

const userSubject = new BehaviorSubject(null);

export const userService = {
    login,
    logout,
    refreshToken,
    register,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    authHeader,
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value }
};

async function getAll() {
    const response = await fetch(
        'http://localhost:33998/api/Users',
        {
            method: 'GET',
            headers: authHeader('http://localhost:33998/api/Users')
        }
    ).then(handleResponse)
    return response;
}

async function getById(id) {
    const response = await fetch(
        `http://localhost:33998/api/Users/${id}`,
        {
            method: 'GET',
            headers: authHeader(`http://localhost:33998/api/Users/${id}`)
        }
    ).then(handleResponse)
    return response;
}

async function create(body) {
    const response = await fetch(
        `http://localhost:33998/api/Users`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...authHeader(`http://localhost:33998/api/Users`) },
            credentials: 'include',
            body: JSON.stringify(body)
        }
    ).then(handleResponse)
    return response;
}

async function update(id, body) {
    return await fetch(
        `http://localhost:5071/api/Users/${id}`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...authHeader(`http://localhost:33998/api/Users/${id}`) },
            body: JSON.stringify(body)
        }
    ).then(handleResponse).then(user => {
        // update stored user if the logged in user updated their own record
        if (user.id === userSubject.value.id) {
            // publish updated user to subscribers
            user = { ...userSubject.value, ...user };
            userSubject.next(user);
        }
        return user;
    }); 
}

async function _delete(id) {
    return await fetch(
        `http://localhost:5071/api/Users/${id}`,
        {
            method: 'DELETE',
            headers: authHeader(`http://localhost:5071/api/Users/${id}`)
        }
    ).then(handleResponse).then(x => {
        // auto logout if the logged in user deleted their own record
        if (id === userSubject.value.id) {
            logout();
        }
        return x;
    });
}

async function register(body) {
    const response = await fetch(
        `http://localhost:33998/api/Users/register`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...authHeader(`http://localhost:33998/api/Users/register`) },
            credentials: 'include',
            body: JSON.stringify(body),
            mode: 'cors'
        }
    ).then(handleResponse)
    return response;
}

async function login(email, password) {
    return await fetch(
        'http://localhost:33998/api/Users/authenticate',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...authHeader('http://localhost:33998/api/Users/authenticate') },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        }
    ).then(handleResponse).then(user => {
        // publish user to subscribers and start timer to refresh token
        userSubject.next(user);
        startRefreshTokenTimer();
        return user;
    });
}

async function logout() {
    const token = Cookies.get("refreshToken");
    console.log(token)
    await fetch(
        'http://localhost:33998/api/Users/revoke-token',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...authHeader('http://localhost:33998/api/Users/revoke-token') },
            credentials: 'include',
            body: JSON.stringify({Token : null}),
            mode: 'cors'
        }
    ).then(handleResponse)
    stopRefreshTokenTimer();
    userSubject.next(null);
}

async function refreshToken() {
    const response = await fetch(
        'http://localhost:33998/api/Users/refresh-token',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...authHeader('http://localhost:33998/api/Users/refresh-token') },
            credentials: 'include',
            body: JSON.stringify({})
        }
    ).then(handleResponse)
    return response.then(user => {
        // publish user to subscribers and start timer to refresh token
        userSubject.next(user);
        startRefreshTokenTimer();
        return user;
    });
}

// helper functions

let refreshTokenTimeout;

function startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
    clearTimeout(refreshTokenTimeout);
}

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = userService.userValue;
    const isLoggedIn = user && user.jwtToken;
    const isApiUrl = url.startsWith('http://localhost:33998');
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.jwtToken}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if ([401, 403].includes(response.status) && userService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

/*export default class UserService{

function     userValue(){
        return getUserSubject();
    }


function     getAll() {
        const response = await fetch(
            'http://localhost:5071/api/Users',
            {
                method: 'GET',
                headers: authHeader('http://localhost:5071/api/Users')
            }
        ).then(handleResponse)
        return response;
    }


function     getById(id) {
        const response = await fetch(
            `http://localhost:5071/api/Users/${id}`,
            {
                method: 'GET',
                headers: authHeader(`http://localhost:5071/api/Users/${id}`)
            }
        ).then(handleResponse)
        return response;
    }


function     create(body) {
        const response = await fetch(
            `http://localhost:5071/api/Users`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeader(`http://localhost:5071/api/Users`) },
                credentials: 'include',
                body: JSON.stringify(body)
            }
        ).then(handleResponse)
        return response;
    }


function     update(id, body) {
        const response = await fetch(
            `http://localhost:5071/api/Users/${id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...authHeader(`http://localhost:5071/api/Users/${id}`) },
                body: JSON.stringify(body)
            }
        ).then(handleResponse)
        return response.then(user => {
            // update stored user if the logged in user updated their own record
            if (user.id === userSubject.value.id) {
                // publish updated user to subscribers
                user = { ...userSubject.value, ...user };
                userSubject.next(user);
            }
            return user;
        }); 
    }


function     delete(id) {
        const response = await fetch(
            `http://localhost:5071/api/Users/${id}`,
            {
                method: 'DELETE',
                headers: authHeader(`http://localhost:5071/api/Users/${id}`)
            }
        ).then(handleResponse)
        return response.then(x => {
            // auto logout if the logged in user deleted their own record
            if (id === userSubject.value.id) {
                UserService.logout();
            }
            return x;
        });
    }


function     register(body) {
        const response = fetch(
            `http://localhost:5071/api/Users/register`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeader(`http://localhost:5071/api/Users/register`) },
                credentials: 'include',
                body: JSON.stringify(body),
                mode: 'cors'
            }
        ).then(handleResponse)
        return response;
    }


function     login(email, password) {
        const response = await fetch(
            'http://localhost:5071/api/Users/authenticate',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeader('http://localhost:5071/api/Users/authenticate') },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            }
        ).then(handleResponse)
        return response.then(user => {
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
        });
    }


function     logout() {
        await fetch(
            'http://localhost:5071/api/Users/revoke-token',
            {
                method: 'POST',
            headers: { 'Content-Type': 'application/json', ...authHeader('http://localhost:5071/api/Users/revoke-token') },
            credentials: 'include',
            body: JSON.stringify({})
            }
        ).then(handleResponse)
        stopRefreshTokenTimer();
        userSubject.next(null);
        history.push('/account/login');
    }


function     refreshToken() {
        const response = await fetch(
            'http://localhost:5071/api/Users/refresh-token',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeader('http://localhost:5071/api/Users/refresh-token') },
                credentials: 'include',
                body: JSON.stringify({})
            }
        ).then(handleResponse)
        return response.then(user => {
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
        });
    }
}*/