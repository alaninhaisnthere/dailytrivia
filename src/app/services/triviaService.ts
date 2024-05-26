import axios from 'axios';

const API_BASE_URL = 'https://opentdb.com/api.php';

export const fetchTriviaQuestions = async (amount: number) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        amount,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching trivia questions:', error);
    throw error;
  }
};
