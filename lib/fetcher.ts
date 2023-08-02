import axios from 'axios';

const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error: any) {
    throw new Error('Something Wrong!', error);
  }
};

export default fetcher;
