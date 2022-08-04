import { useQuery } from '@tanstack/react-query';
import { USER_KEY } from './queryKeys';
import { getUserById } from '../services/user';

const useUser = (userId, options = {}) => {
  return useQuery([USER_KEY, userId], ({ queryKey }) => getUserById(userId, options));
};

export { useUser };
