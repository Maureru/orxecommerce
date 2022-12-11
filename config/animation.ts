const Duration = {
    veryFast: 0.1,
    fast: 0.3,
    normal: 0.8,
    slow: 1.1,
    verySlow: 1.5
}

const easing = [0.6, -0.05, 0.01, 0.99]

export const shoppingGirl = {
    initial: {
        opacity: 0,

    }, 
    animate: {
        opacity: 1,
        y: [600, -20, 0],
        scale: [1, 1.3, 1],
        transition: {
            ease: easing,
            duration: 0.7,
            delay: 1
        }
    }
}

export const stagger = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

export const toRight = {
    initial: {
        opacity: 0,

    }, 
    animate: {
        opacity: 1,
        x: [-500, 0],
        transition: {
            ease: easing,
            duration: 0.7,
            delay: 0.2
        }
    }
}
export const toLeft = {
    initial: {
        opacity: 0,

    }, 
    animate: {
        opacity: 1,
        x: [500, 0],
        transition: {
            ease: easing,
            duration: 0.7,
            delay: 0.2
        }
    }
}

export const cartAnimation = {
    hide: {
        x: -500,
        opacity: 0,
        transition: {
            ease: easing,
            duration: 0.8
        }
    },
    show: {
        x: 0,
        opacity: 1,
        transition: {
            ease: easing,
            duration: 0.8
        }
    }
}
export const menuMobileAnimation = {
    hide: {
        x: 250,
        opacity: 0,
        transition: {
            ease: easing,
            duration: 0.8
        }
    },
    show: {
        x: 0,
        opacity: 1,
        transition: {
            ease: easing,
            duration: 0.8
        }
    }
}