import { useEffect, useRef } from 'react';

function useOutsideClick(handler: () => void, listenCapturing = true) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const isClickInsideModal = ref?.current?.contains(target);

      if (!target || !ref.current || isClickInsideModal) return;

      handler();
    }

    document.addEventListener('click', handleClick, listenCapturing);

    return () => document.removeEventListener('click', handleClick);
  }, [handler, listenCapturing]);

  return ref;
}

export default useOutsideClick;
