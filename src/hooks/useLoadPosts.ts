import {useEffect, useState} from 'react';
import {Post} from '../types';

const useLoadPosts = (url: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMedia = async () => {
      await fetch(url)
        .then(async res => {
          if (!res.ok) {
            return setError('Could not load feed data');
          }
          const jsonRes = await res.json();
          setPosts(jsonRes);
        })
        .catch(e => {
          setError(e);
        });
      setIsLoading(false);
    };
    setIsLoading(true);
    loadMedia();
  }, [url]);

  return {posts, isLoading, error};
};

export default useLoadPosts;
