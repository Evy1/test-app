import axios from 'axios';

export default axios.create(
    {
        baseURL: 'https://auth-dev-82cae-default-rtdb.firebaseio.com/'
    }
)