import type { ComponentProps } from 'preact';
import { useLayoutEffect, useState } from 'preact/hooks';

type ToastOffset = NonNullable<ComponentProps<'oj-c-message-toast'>['offset']>;
type ToastPosition = NonNullable<ComponentProps<'oj-c-message-toast'>['position']>;

const getEdgeOffset = (offset: number) => Math.max(0, Math.round(offset));

const getHorizontalOffset = (rect: DOMRect, position: ToastPosition) => {
  const isRtl = document.documentElement.dir.toLowerCase() === 'rtl';

  if (position.endsWith('left')) {
    return getEdgeOffset(rect.left);
  }
  if (position.endsWith('right')) {
    return getEdgeOffset(innerWidth - rect.right);
  }
  if (position.endsWith('start')) {
    return isRtl ? getEdgeOffset(innerWidth - rect.right) : getEdgeOffset(rect.left);
  }
  if (position.endsWith('end')) {
    return isRtl ? getEdgeOffset(rect.left) : getEdgeOffset(innerWidth - rect.right);
  }

  return Math.round(rect.left + rect.width / 2 - innerWidth / 2);
};

const getVerticalOffset = (rect: DOMRect, position: ToastPosition) => {
  if (position.startsWith('top')) {
    return getEdgeOffset(rect.top);
  }

  return getEdgeOffset(window.innerHeight - rect.bottom);
};

const getContainerOffset = (containerId: string, position: ToastPosition): ToastOffset => {
  const container = document.getElementById(containerId);

  if (!container) {
    return 0;
  }

  const rect = container.getBoundingClientRect();

  return {
    horizontal: getHorizontalOffset(rect, position),
    vertical: getVerticalOffset(rect, position)
  };
};

export const useToastContainerOffset = (
  containerId: string,
  position: ToastPosition = 'bottom'
): ToastOffset => {
  const [offset, setOffset] = useState<ToastOffset>(0);

  useLayoutEffect(() => {
    const updateOffset = () => {
      setOffset(getContainerOffset(containerId, position));
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);
    window.addEventListener('scroll', updateOffset, true);

    const container = document.getElementById(containerId);
    const resizeObserver =
      container && typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateOffset) : null;

    resizeObserver?.observe(container as Element);

    return () => {
      window.removeEventListener('resize', updateOffset);
      window.removeEventListener('scroll', updateOffset, true);
      resizeObserver?.disconnect();
    };
  }, [containerId, position]);

  return offset;
};
