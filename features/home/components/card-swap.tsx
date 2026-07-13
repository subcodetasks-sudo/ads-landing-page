"use client";

import React, {
  Children,
  cloneElement,
  createRef,
  forwardRef,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { gsap } from "gsap";

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  direction?: "ltr" | "rtl";
  children: ReactNode;
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export interface CardSwapHandle {
  next: () => void;
  previous: () => void;
  swapTo: (index: number) => void;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black transform-3d will-change-transform backface-hidden ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
    />
  ),
);
Card.displayName = "Card";

type CardRef = React.RefObject<HTMLDivElement | null>;

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (
  index: number,
  distX: number,
  distY: number,
  total: number,
  direction: "ltr" | "rtl",
): Slot => ({
  x: (direction === "rtl" ? -1 : 1) * index * distX,
  y: -index * distY,
  z: -index * Math.abs(distX) * 1.5,
  zIndex: total - index,
});

const placeNow = (element: HTMLElement, slot: Slot, skew: number) => {
  gsap.set(element, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });
};

const CardSwap = forwardRef<CardSwapHandle, CardSwapProps>(function CardSwap(
  {
    width = 500,
    height = 400,
    cardDistance = 30,
    verticalDistance = 32,
    delay = 5000,
    pauseOnHover = false,
    onCardClick,
    skewAmount = 6,
    easing = "elastic",
    direction = "ltr",
    children,
  },
  ref,
) {
  const config = useMemo(
    () =>
      easing === "elastic"
        ? {
            ease: "elastic.out(0.6,0.9)",
            durDrop: 2,
            durMove: 2,
            durReturn: 2,
            promoteOverlap: 0.9,
            returnDelay: 0.05,
          }
        : {
            ease: "power1.inOut",
            durDrop: 0.8,
            durMove: 0.8,
            durReturn: 0.8,
            promoteOverlap: 0.45,
            returnDelay: 0.2,
          },
    [easing],
  );

  const childArray = useMemo(
    () => Children.toArray(children) as ReactElement<CardProps>[],
    [children],
  );
  const refs = useMemo<CardRef[]>(
    () => childArray.map(() => createRef<HTMLDivElement>()),
    [childArray],
  );

  const order = useRef<number[]>(
    Array.from({ length: childArray.length }, (_, index) => index),
  );
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const swapToCardRef = useRef<((targetIndex: number) => void) | null>(null);
  const nextRef = useRef<(() => void) | null>(null);
  const previousRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const total = refs.length;

    refs.forEach((ref, index) => {
      if (ref.current) {
        placeNow(
          ref.current,
          makeSlot(index, cardDistance, verticalDistance, total, direction),
          skewAmount,
        );
      }
    });

    const resetInterval = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(runAutoSwap, delay);
    };

    const animateStack = (nextOrder: number[]) => {
      timelineRef.current?.kill();
      const timeline = gsap.timeline();
      timelineRef.current = timeline;

      nextOrder.forEach((cardIndex, slotIndex) => {
        const element = refs[cardIndex]?.current;
        const slot = makeSlot(slotIndex, cardDistance, verticalDistance, refs.length, direction);

        if (!element) {
          return;
        }

        timeline.set(element, { zIndex: slot.zIndex }, 0);
        timeline.to(
          element,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          slotIndex * 0.08,
        );
      });

      order.current = nextOrder;
    };

    const runAutoSwap = () => {
      if (order.current.length < 2) {
        return;
      }

      const [front, ...rest] = order.current;
      const frontElement = refs[front]?.current;

      if (!frontElement) {
        return;
      }

      timelineRef.current?.kill();
      const timeline = gsap.timeline();
      timelineRef.current = timeline;

      timeline.to(frontElement, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });

      timeline.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);

      rest.forEach((idx, index) => {
        const element = refs[idx]?.current;
        const slot = makeSlot(index, cardDistance, verticalDistance, refs.length, direction);

        if (!element) {
          return;
        }

        timeline.set(element, { zIndex: slot.zIndex }, "promote");
        timeline.to(
          element,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${index * 0.15}`,
        );
      });

      const backSlot = makeSlot(
        refs.length - 1,
        cardDistance,
        verticalDistance,
        refs.length,
        direction,
      );

      timeline.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      timeline.call(
        () => {
          gsap.set(frontElement, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return",
      );
      timeline.to(
        frontElement,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return",
      );
      timeline.call(() => {
        order.current = [...rest, front];
      });
    };

    const swapToCard = (targetIndex: number) => {
      const currentOrder = order.current;
      const currentPosition = currentOrder.indexOf(targetIndex);

      if (currentPosition <= 0) {
        resetInterval();
        return;
      }

      const nextOrder = [
        targetIndex,
        ...currentOrder.slice(0, currentPosition),
        ...currentOrder.slice(currentPosition + 1),
      ];

      animateStack(nextOrder);
      resetInterval();
    };

    const goToNext = () => {
      if (order.current.length < 2) {
        return;
      }

      animateStack([...order.current.slice(1), order.current[0]]);
      resetInterval();
    };

    const goToPrevious = () => {
      if (order.current.length < 2) {
        return;
      }

      const lastCard = order.current[order.current.length - 1];
      animateStack([lastCard, ...order.current.slice(0, -1)]);
      resetInterval();
    };

    swapToCardRef.current = swapToCard;
    nextRef.current = goToNext;
    previousRef.current = goToPrevious;

    runAutoSwap();
    intervalRef.current = window.setInterval(runAutoSwap, delay);

    const container = containerRef.current;
    if (!pauseOnHover || !container) {
      return () => {
        swapToCardRef.current = null;
        nextRef.current = null;
        previousRef.current = null;
        timelineRef.current?.kill();
        clearInterval(intervalRef.current);
      };
    }

    const pause = () => {
      timelineRef.current?.pause();
      clearInterval(intervalRef.current);
    };

    const resume = () => {
      timelineRef.current?.play();
      intervalRef.current = window.setInterval(runAutoSwap, delay);
    };

    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", resume);

    return () => {
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", resume);
      swapToCardRef.current = null;
      nextRef.current = null;
      previousRef.current = null;
      timelineRef.current?.kill();
      clearInterval(intervalRef.current);
    };
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, config, direction, refs]);

  useImperativeHandle(
    ref,
    () => ({
      next: () => nextRef.current?.(),
      previous: () => previousRef.current?.(),
      swapTo: (index: number) => swapToCardRef.current?.(index),
    }),
    [],
  );

  const rendered = childArray.map((child, index) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: index,
          ref: refs[index],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (event) => {
            child.props.onClick?.(event as React.MouseEvent<HTMLDivElement>);
            onCardClick?.(index);
          },
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child,
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 perspective-[900px] overflow-visible"
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
});

export default CardSwap;
