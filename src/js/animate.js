
function Animate() {
    const horizontalSections = gsap.utils.toArray('section.horizontal')
    horizontalSections.forEach(function (sec, i) {

        var thisPinWrap = sec.querySelector('.pin-wrap');
        var thisAnimWrap = thisPinWrap.querySelector('.animation-wrap');


        // menu at our works 
        var horizontalSectionsWrapNav = document.querySelector('.horizontal-wrap .nav-works');

        ScrollTrigger.matchMedia({

            /*desktop*/
            "(min-width: 768px)": function () {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: horizontalSectionsWrapNav,
                        // markers: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                        start: "top top",
                        end: "bottom +=100%",
                    },
                })


                var getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth);
                gsap.fromTo(thisAnimWrap, {
                    x: () => thisAnimWrap.classList.contains('to-right') ? 0 : getToValue(),
                    opacity: 0
                }, {
                    x: () => thisAnimWrap.classList.contains('to-right') ? getToValue() : 0,
                    ease: "none",
                    opacity: 1,
                    duration: 2,
                    scrollTrigger: {
                        trigger: sec,
                        start: "top top",
                        end: () => "+=" + (thisAnimWrap.scrollWidth - window.innerWidth),
                        toggleClass: { targets: '.horizontal-wrap', className: "active" },
                        pin: thisPinWrap,
                        invalidateOnRefresh: true,
                        scrub: true,
                        pinSpacing: false,
                        // anticipatePin: 1,
                        //markers: true,
                    }
                })


            },

            /*mobile*/
            "(max-width: 768px)": function () {
                // gsap.timeline({
                //     scrollTrigger: {
                //         trigger: horizontalSectionsWrapNav,
                //         // markers: true,
                //         invalidateOnRefresh: true,
                //         start: "top 60%",
                //         end: "bottom +=100%",
                //     },
                // }).fromTo(horizontalSectionsWrapNav, {
                //     opacity: 0,
                //     yPercent: -10,
                // }, {
                //     opacity: 1,
                //     yPercent: 0,
                //     ease: 'ease',
                //     duration: 1
                // }).fromTo(horizontalSections, {
                //     opacity: 0,
                // }, {
                //     opacity: 1,
                //     ease: 'ease',
                //     duration: 2
                // })



                var getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth);
                gsap.fromTo(thisAnimWrap, {
                    x: () => thisAnimWrap.classList.contains('to-right') ? 0 : getToValue(),
                }, {
                    x: () => thisAnimWrap.classList.contains('to-right') ? getToValue() : 0,
                    ease: "none",
                    duration: 2,
                    scrollTrigger: {
                        trigger: sec,
                        start: "top top",
                        end: () => "+=" + (thisAnimWrap.scrollWidth - window.innerWidth),
                        toggleClass: { targets: '.horizontal-wrap', className: "active" },
                        pin: thisPinWrap,
                        invalidateOnRefresh: true,
                        scrub: true,
                        pinSpacing: true,
                        //markers: true,
                    }
                })
            },

        });

    });


    // otis desktop
    var thisAnimWrapOtis = document.querySelector('.home-about_images');
    const elements = document.querySelectorAll('.home-about_image-item');


    const promiseLayout = new Promise((resolve, reject) => {
        let allItems = 0
        Array.from(elements).forEach((element, index) => {
            allItems += element.clientWidth;
        });

        let widthWindow = window.innerWidth

        resolve({ allItems, widthWindow })
    })

    promiseLayout.then((response) => {
        // console.log({ response });

        let transform3d = response.allItems;
        let heightSVH = response.allItems + (10 * 100);
        // console.log({ heightSVH });

        if (response.widthWindow > 4999) {
            jQuery('.home-about_zag-track').css({
                "height": heightSVH - 500,
                // "background-color": "yellow"
            });
        } else if (response.widthWindow > 3000) {
            jQuery('.home-about_zag-track').css({
                "height": heightSVH - 500,
                // "background-color": "green"
            });
        } else if (response.widthWindow > 2499) {
            jQuery('.home-about_zag-track').css({
                "height": heightSVH - 500,
                // "background-color": "pink"
            });
        } else if (response.widthWindow > 1900) {
            jQuery('.home-about_zag-track').css({
                "height": heightSVH - 500,
                // "background-color": "purple"
            });
        } else {
            jQuery('.home-about_zag-track').css({
                "height": heightSVH,
                // "background-color": "blue"
            });
        }



        gsap.registerPlugin(ScrollTrigger);
        let r = document.querySelector(".home-about_images");
        if (!r) return;
        let e = gsap.matchMedia();

        const scrollTriggerObject = {
            trigger: ".home-about_images-wrapper",
            start: "top+=800 center",
            end: () => "+=" + transform3d,
            scrub: 1,
            // onEnter: () => {
            //     gsap.to(r, {
            //         opacity: 1,
            //         duration: 0.5
            //     })
            // },
            // onLeaveBack: () => {
            //     gsap.to(r, {
            //         opacity: 0,
            //         duration: 0.5
            //     })
            // },
        }

        document.querySelector(".home-about_images-wrapper").style.width = "100%", r.style.width = "fit-content",
            e.add("(min-width: 991px)", () => {
                gsap.timeline({
                    scrollTrigger: scrollTriggerObject
                }).fromTo(r, {
                    xPercent: 0
                }, {
                    xPercent: -65,
                    ease: "none"
                })
            })

        // , e.add("(min-width: 1900px)", () => {
        //     gsap.timeline({
        //         scrollTrigger: scrollTriggerObject
        //     }).fromTo(r, {
        //         xPercent: 0
        //     }, {
        //         xPercent: -67,
        //         ease: "none"
        //     })
        // }), e.add("(min-width: 2500px)", () => {
        //     gsap.timeline({
        //         scrollTrigger: scrollTriggerObject
        //     }).fromTo(r, {
        //         xPercent: 0
        //     }, {
        //         xPercent: -71,
        //         ease: "none"
        //     })
        // }), e.add("(min-width: 3000px)", () => {
        //     gsap.timeline({
        //         scrollTrigger: scrollTriggerObject
        //     }).fromTo(r, {
        //         xPercent: 0
        //     }, {
        //         xPercent: -65,
        //         ease: "none"
        //     })
        // }), e.add("(min-width: 4999px)", () => {
        //     gsap.timeline({
        //         scrollTrigger: scrollTriggerObject
        //     }).fromTo(r, {
        //         xPercent: 0
        //     }, {
        //         xPercent: -74,
        //         ease: "none"
        //     })
        // })


    })

}
Animate()


