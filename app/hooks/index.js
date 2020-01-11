/*
 *
 * Custom Hooks
 *
 */

import { useRef, useEffect, useReducer, useState } from 'react';
import { dataFetchReducer, initialState } from './reducer';
import { fetch, fetchSuccess, fetchFailure } from './actions';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

const useDeviceDetect = () => {
  const { userAgent } = navigator;
  const isAndroid = () => Boolean(userAgent.match(/Android/i));
  const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
  const isOpera = () => Boolean(userAgent.match(/Opera Mini/i));
  const isWindows = () => Boolean(userAgent.match(/IEMobile/i));

  const isMobile = () =>
    Boolean(isAndroid() || isIos() || isOpera() || isWindows());
  const isDesktop = () => !isMobile();

  useEffect(() => {}, []);

  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
  };
};

const useFetch = config => {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);

  useEffect(() => {
    let didCancel = false;

    if (
      !config ||
      !config.api ||
      (config.required &&
        config.required.some(r => r === undefined || r === null))
    ) {
      return () => {};
    }

    (async () => {
      dispatch(fetch());

      try {
        const result = await config.api(
          {
            filter: config.filter,
            form: config.form,
            ...config.params,
            ...config.payload,
          },
          config.extra,
        );

        if (!didCancel) {
          dispatch(fetchSuccess(result));
        }
      } catch (e) {
        if (!didCancel) {
          dispatch(fetchFailure(e));
        }
      }
    })();
    return () => {
      didCancel = true;
    };
  }, [config]);

  return [state.data, state.loading, state.error];
};

const usePost = () => {
  const [isSending, setIsSending] = useState(false);
  const isMounted = useRef(true);

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    [],
  );

  const call = async config => {
    if (isSending) return [null, 'is sending'];
    setIsSending(true);

    try {
      const result = await config.api({
        filter: config.filter,
        form: config.form,
        ...config.params,
        ...config.payload,
      });

      if (isMounted.current) {
        setIsSending(false);
      }

      return [result];
    } catch (e) {
      if (isMounted.current) {
        setIsSending(false);
      }
      return [null, e];
    }
  };

  return [call, isSending];
};

const useForceUpdate = () => {
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setUpdate(false);
  }, [update]);

  const forceUpdate = () => {
    setUpdate(true);
  };

  return forceUpdate;
};

export {
  useWindowDimensions,
  useDeviceDetect,
  useFetch,
  usePost,
  useForceUpdate,
};
