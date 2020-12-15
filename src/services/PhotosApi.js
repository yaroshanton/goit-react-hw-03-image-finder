import axios from 'axios'

const fetchWithQuery = (query, page = 1) => {
    return axios
        .get(`https://pixabay.com/api/?q=${query}&page=${page}&key=18828859-930db298be4f18593f67074f1&image_type=photo&orientation=horizontal&per_page=12`)
        .then(res => res.data.hits);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { fetchWithQuery };
