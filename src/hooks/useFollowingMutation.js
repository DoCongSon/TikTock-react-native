import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { keys } from './queryKeys';
import { changeFollowingState, getIsUserFollowing } from '../services/user';
import { getAuth } from 'firebase/auth';

const useFollowingMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(changeFollowingState, {
    ...options,
    onMutate: (variables) => {
      queryClient.setQueryData(
        keys.following(getAuth().currentUser.uid, variables.otherUserId),
        !variables.isFollowing
      );
    },
  });

  // return useQuery(
  //   keys.following(userId, otherUserId),
  //   () => getIsUserFollowing(userId, otherUserId),
  //   options
  // );
};

export { useFollowingMutation };
