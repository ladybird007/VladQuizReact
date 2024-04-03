import axios from "axios";

export default axios.create({
    baseURL: 'https://quiz-61d92-default-rtdb.firebaseio.com/'
})