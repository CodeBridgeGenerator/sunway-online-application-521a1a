import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Button } from "primereact/button";
import { StyleClass } from "primereact/styleclass";
import { Ripple } from "primereact/ripple";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { gsap } from "gsap";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const Home = (props) => {
    const rootBtnRef6 = useRef(null);
    const btnRef9 = useRef(null);
    const btnRef10 = useRef(null);
    const btnRef11 = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showSearchBar, setShowSearchBar] = useState(false);
    // GSAP animation for the top bar
    useEffect(() => {
        gsap.from(".top-bar span", {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            delay: 0.5
        });
    }, []);

    // GSAP animation for the slider content - Use a ref to target the current slide
    useEffect(() => {
        const currentSlide = document.querySelector(".current-slide .slider-content");
        if (currentSlide) {
            const tl = gsap.timeline();
            tl.from(currentSlide.querySelector("h2"), { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" })
                .from(currentSlide.querySelector("p"), { y: 50, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.2 })
                .from(currentSlide.querySelector(".p-button"), { scale: 0.8, opacity: 0, duration: 0.6, ease: "back.out(1.7)", delay: 0.4 });
        }
    }, [activeIndex]);

    // Toggle search bar visibility
    const handleSearchClick = () => {
        setShowSearchBar((prevState) => !prevState);
    };

    const sliderItems = [
        {
            id: 1,
            image: "https://sunwayuniversity.edu.my/sites/default/files/styles/card_image_width_900px/public/cardimage/2023-07/1690140.jpg.webp?itok=autHwbdv",
            title: "Welcome to Sunway!",
            description: "Explore our vibrant campus and diverse academic programs. Discover a world of opportunities waiting for you."
        },
        {
            id: 2,
            image: "https://sunwayuniversity.edu.my/sites/default/files/contentbanner/2023-12/sunway-campus-drone01.jpg",
            title: "Unlock Your Potential",
            description: "At Sunway, we nurture your talents and empower you to achieve your dreams."
        },
        {
            id: 3,
            image: "https://sunwayuniversity.edu.my/sites/default/files/styles/card_image_width_900px/public/cardimage/2023-07/332629133_1128646601165838_1760923812913439846_n.jpg.webp?itok=y9jpK6_3",
            title: "Shape Your Future",
            description: "Join our dynamic community of students and embark on a transformative journey of academic excellence and personal growth."
        },
    ];


    // Automatically change content every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % sliderItems.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [sliderItems.length]);

    // Handle pagination dot click
    const handleDotClick = (index) => {
        setActiveIndex(index);
    };


    return (
        <>
            <div className="top-bar bg-orange-600 text-gray-100 p-3 flex justify-content-center align-items-center">
                <span className="font-medium">
                    Welcome to Sunway University! Explore our vibrant campus and diverse academic programs.
                </span>
                <a href="#" className="font-bold text-white ml-4 hover:underline">Learn More</a>
            </div>

            <div className="bg-blue-900 py-3 px-6 shadow-2 flex align-items-center justify-content-between relative z-10">
                <img src="/assets/logo/sunway-logo-full.webp" height="50" />

                <StyleClass nodeRef={rootBtnRef6} selector="@next" enterClassName="hidden" leaveToClassName="hidden" hideOnOutsideClick>
                    <a ref={rootBtnRef6} className="p-ripple cursor-pointer block lg:hidden text-gray-400">
                        <i className="pi pi-bars text-4xl"></i>
                        <Ripple />
                    </a>
                </StyleClass>
                <div className="align-items-center flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full bg-blue-900 left-0 top-100 px-6 lg:px-0 shadow-2 lg:shadow-none">
                    <section></section>
                    <ul className="list-none p-0 m-0 flex lg:align-items-center text-gray-400 select-none flex-column lg:flex-row">
                        <li>
                            <StyleClass nodeRef={btnRef10} selector="@next" enterClassName="hidden" enterActiveClassName="scalein" leaveToClassName="hidden" leaveActiveClassName="fadeout" hideOnOutsideClick>
                                <a style={{ color: 'white', textDecoration: 'none' }} ref={btnRef10} className="p-ripple flex px-0 lg:px-5 py-3 align-items-center hover:text-orange-500 font-medium transition-colors transition-duration-150 cursor-pointer" >
                                    <span>SCHOOLS</span>
                                    <i className="pi pi-chevron-down ml-auto lg:ml-3"></i>
                                    <Ripple />
                                </a>
                            </StyleClass>
                            <div className="lg:absolute bg-gray-800 hidden origin-top left-0 top-100 w-full">
                                <div className="flex flex-wrap p-6">
                                    <div className="w-full lg:w-6 mb-4 lg:mb-0">
                                        <span className="block font-medium text-xl mb-4 text-white">Courses</span>
                                        <ul className="list-none p-0 m-0">
                                            <li className="mb-2">
                                                <a href="#" className="text-white hover:text-orange-500 transition-colors">Computer Science</a>
                                            </li>
                                            <li className="mb-2">
                                                <a href="#" className="text-white hover:text-orange-500 transition-colors">Engineering</a>
                                            </li>
                                            <li className="mb-2">
                                                <a href="#" className="text-white hover:text-orange-500 transition-colors">Business Administration</a>
                                            </li>
                                            {/* Add more course links as needed */}
                                        </ul>
                                    </div>
                                    <div className="w-full lg:w-6">
                                        <span className="block font-medium text-xl mb-4 text-white">Featured Schools</span>
                                        <div className="flex">
                                            <div className="w-1/3 mr-2">
                                                <img src="https://cdn2.sunwaypals.com.my/pr-1984d816-cb13-4ba7-a027-bde00b26cded.jpg" alt="School 1" className="w-full h-40 " />
                                                <a href="#" className="text-white hover:text-orange-500 transition-colors block text-center mt-2">School of Engineering</a>
                                            </div>
                                            <div className="w-1/3 mr-2">
                                                <img src="https://cdn2.sunwaypals.com.my/pr-1984d816-cb13-4ba7-a027-bde00b26cded.jpg" alt="School 2" className="w-full h-40 " />
                                                <a href="#" className="text-white hover:text-orange-500 transition-colors block text-center mt-2">School of Business</a>
                                            </div>
                                            <div className="w-1/3">
                                                <img src="https://cdn2.sunwaypals.com.my/pr-1984d816-cb13-4ba7-a027-bde00b26cded.jpg" alt="School 3" className="w-full h-40 " />
                                                <a href="#" className="text-white hover:text-orange-500 transition-colors block text-center mt-2">School of Design</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <StyleClass nodeRef={btnRef9} selector="@next" enterClassName="hidden" enterActiveClassName="scalein" leaveToClassName="hidden" leaveActiveClassName="fadeout" hideOnOutsideClick>
                                <a style={{ color: 'white', textDecoration: 'none' }} ref={btnRef9} className="p-ripple flex px-0 lg:px-5 py-3 align-items-center hover:text-orange-500 font-medium transition-colors transition-duration-150 cursor-pointer" >
                                    <span>COURSES</span>
                                    <i className="pi pi-chevron-down ml-auto lg:ml-3"></i>
                                    <Ripple />
                                </a>
                            </StyleClass>
                        </li>
                        <li>
                            <StyleClass nodeRef={btnRef11} selector="@next" enterClassName="hidden" enterActiveClassName="scalein" leaveToClassName="hidden" leaveActiveClassName="fadeout" hideOnOutsideClick>
                                <a style={{ color: 'white', textDecoration: 'none' }} ref={btnRef11} className="p-ripple flex px-0 lg:px-5 py-3 align-items-center hover:text-orange-500 font-medium transition-colors transition-duration-150 cursor-pointer" >
                                    <span>ADMISSIONS</span>
                                    <i className="pi pi-chevron-down ml-auto lg:ml-3"></i>
                                    <Ripple />
                                </a>
                            </StyleClass>
                            <div className="lg:absolute bg-gray-800 hidden origin-top left-0 top-100 w-full">
                                <div className="flex flex-wrap p-6">
                                    <div className="w-full lg:w-6 mb-4 lg:mb-0">
                                        <span className="block font-medium text-xl mb-4 text-white">Courses</span>
                                        <ul className="list-none p-0 m-0">
                                            <li className="mb-2">
                                                <a href="#" className="text-white hover:text-orange-500 transition-colors">Computer Science</a>
                                            </li>
                                            <li className="mb-2">
                                                <a href="#" className="text-white hover:text-orange-500 transition-colors">Engineering</a>
                                            </li>
                                            <li className="mb-2">
                                                <a href="#" className="text-white hover:text-orange-500 transition-colors">Business Administration</a>
                                            </li>
                                            {/* Add more course links as needed */}
                                        </ul>
                                    </div>
                                    <div className="w-full lg:w-6">
                                        <span className="block font-medium text-xl mb-4 text-white">Featured Schools</span>
                                        <div className="flex">
                                            <div className="w-1/3 mr-2">
                                                <img src="https://cdn2.sunwaypals.com.my/pr-1984d816-cb13-4ba7-a027-bde00b26cded.jpg" alt="School 1" className="w-full h-40 " />
                                                <a href="#" className="text-white hover:text-orange-500 transition-colors block text-center mt-2">School of Engineering</a>
                                            </div>
                                            <div className="w-1/3 mr-2">
                                                <img src="https://cdn2.sunwaypals.com.my/pr-1984d816-cb13-4ba7-a027-bde00b26cded.jpg" alt="School 2" className="w-full h-40 " />
                                                <a href="#" className="text-white hover:text-orange-500 transition-colors block text-center mt-2">School of Business</a>
                                            </div>
                                            <div className="w-1/3">
                                                <img src="https://cdn2.sunwaypals.com.my/pr-1984d816-cb13-4ba7-a027-bde00b26cded.jpg" alt="School 3" className="w-full h-40 " />
                                                <a href="#" className="text-white hover:text-orange-500 transition-colors block text-center mt-2">School of Design</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <a style={{ color: 'white', textDecoration: 'none' }} className="p-ripple flex px-0 lg:px-5 py-3 hover:text-orange-500 font-medium transition-colors transition-duration-150 cursor-pointer">
                                <span>CAMPUS LIFE</span>
                                <Ripple />
                            </a>
                        </li>
                        <li>
                            <a style={{ color: 'white', textDecoration: 'none' }} className="p-ripple flex px-0 lg:px-5 py-3 hover:text-orange-500 font-medium transition-colors transition-duration-150 cursor-pointer">
                                <span>CAMPUS LIFE</span>
                                <Ripple />
                            </a>
                        </li>
                        <li>
                            <a style={{ color: 'white', textDecoration: 'none' }} className="p-ripple flex px-0 lg:px-5 py-3 hover:text-orange-500 font-medium transition-colors transition-duration-150 cursor-pointer">
                                <span>RESEARCH</span>
                                <Ripple />
                            </a>
                        </li>
                        <li>
                            <a style={{ color: 'white', textDecoration: 'none' }} className="p-ripple flex px-0 lg:px-5 py-3 hover:text-orange-500 font-medium transition-colors transition-duration-150 cursor-pointer">
                                <span>SUSTAINABLITY</span>
                                <Ripple />
                            </a>
                        </li>
                        <li>
                            <a style={{ color: 'white', textDecoration: 'none' }} className="p-ripple flex px-0 lg:px-5 py-3 hover:text-orange-500 font-medium transition-colors transition-duration-150 cursor-pointer">
                                <span>ABOUT</span>
                                <Ripple />
                            </a>
                        </li>
                        {/* Search Component */}
                        {/* Search Icon */}
                        <li onClick={handleSearchClick} className="cursor-pointer">
                            <i className="pi pi-search text-3xl text-white"></i>
                            <Ripple />
                        </li>
                    </ul>

                    {/* Conditional Rendering of Search Bar */}
                    {showSearchBar && (
                        <div className="absolute top-12 left-0 bg-white p-4 rounded shadow-lg">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="p-inputtext p-component w-full"
                            />
                            <Button label="Search" className="mt-2" />
                        </div>
                    )}


                </div>
            </div>

            {/* Slider */}
            {/* Static Slider with Changing Content */}
            <div className="w-full relative overflow-hidden" style={{ height: '450px' }}> {/* Increased height */}
                {sliderItems.map((item, index) => (
                    <div
                        key={item.id}
                        className={`w-full h-full absolute top-0 left-0 transition-opacity duration-1000 ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div> {/* Adjusted overlay opacity */}
                        <div className="slider-content absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{item.title}</h2>
                            <p className="text-lg md:text-xl">{item.description}</p>
                            <Button label="Learn More" className="p-button-raised p-button-rounded mt-5" />
                        </div>
                    </div>
                ))}

                {/* Pagination Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    {sliderItems.map((item, index) => (
                        <span
                            key={item.id}
                            onClick={() => handleDotClick(index)}
                            className={`w-3 h-3 inline-block rounded-full mx-1 cursor-pointer ${index === activeIndex ? 'bg-white' : 'bg-gray-400'}`}
                        />
                    ))}
                </div>

            </div>


            {/*Landing*/}

            <div className="relative p-6 overflow-hidden h-screen"> {/* Set height to full screen */}
                <div
                    className="landing-bg w-full h-full absolute top-0 left-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/assets/images/landing-bg.jpg')" }} // Replace with your image
                ></div>
                <div className="text-center my-6 relative z-10"> {/* Added z-10 for stacking */}
                    <h2 className="text-5xl md:text-6xl text-white font-bold mb-2">
                        Embark on a Journey of <span className="text-orange-500">Discovery</span>
                    </h2> {/* Added color to highlight */}
                    <h2 className="text-5xl md:text-6xl text-white font-bold mb-4">At Sunway University</h2>
                    <p className="mt-0 mb-4 line-height-3 text-center mx-auto text-white" style={{ maxWidth: '500px' }}>
                        Where your potential meets opportunity. Explore our diverse programs and vibrant campus life.
                    </p>
                    <Button label="Explore Now" type="button" className="p-button-raised" />
                </div>
            </div>

            <div className="surface-section px-4 pb-8 md:px-6 lg:px-8">
                <div className="p-6 shadow-2 flex flex-column md:flex-row align-items-center justify-content-between" style={{ borderRadius: '1rem', background: 'linear-gradient(0deg, rgba(0, 123, 255, 0.5), rgba(0, 123, 255, 0.5)), linear-gradient(92.54deg, #1C80CF 47.88%, #FFFFFF 100.01%)' }}>
                    <div className="pr-6">
                        <div className="text-blue-100 font-medium text-xl mb-3">TAKE THE NEXT STEP</div>
                        <div className="text-white font-medium text-5xl">Enpower your customer experience</div>
                    </div>
                    <div className="mt-4 mr-auto md:mt-0 md:mr-0">
                        <Button label="Get Started" className="font-bold px-5 py-3 p-button-warning p-button-rounded p-button-raised white-space-nowrap" />
                    </div>
                </div>
            </div>
            <div className="surface-ground px-4 py-8 md:px-6 lg:px-8">
                <div>
                    <div className="text-900 font-bold text-4xl line-height-3 mb-3 text-center">Continue Breaking Records</div>
                    <p className="text-600 line-height-3 text-lg m-0 mb-6 text-center">Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                    <div className="grid surface-card shadow-2" style={{ borderRadius: '10px' }}>
                        <div className="col-12 md:col-3 px-5 py-5">
                            <i className="pi pi-users text-4xl text-blue-600 mb-3"></i>
                            <div className="text-900 font-bold text-4xl mb-3 line-height-3">83M</div>
                            <p className="text-700 m-0">Nostrum laborum accusamus quia iste facere possimus.</p>
                        </div>
                        <div className="col-12 md:col-3 px-5 py-5">
                            <i className="pi pi-chart-line text-4xl text-orange-500 mb-3"></i>
                            <div className="text-900 font-bold text-4xl mb-3 line-height-3">$256K</div>
                            <p className="text-700 m-0">Nostrum laborum accusamus quia iste facere possimus.</p>
                        </div>
                        <div className="col-12 md:col-3 px-5 py-5">
                            <i className="pi pi-globe text-4xl text-cyan-600 mb-3"></i>
                            <div className="text-900 font-bold text-4xl mb-3 line-height-3">1,453</div>
                            <p className="text-700 m-0">Nostrum laborum accusamus quia iste facere possimus.</p>
                        </div>
                        <div className="col-12 md:col-3 px-5 py-5">
                            <i className="pi pi-map text-4xl text-purple-500 mb-3"></i>
                            <div className="text-900 font-bold text-4xl mb-3 line-height-3">45 km</div>
                            <p className="text-700 m-0">Nostrum laborum accusamus quia iste facere possimus.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="surface-section px-4 py-8 md:px-6 lg:px-8">
                <div>
                    <div className="text-900 mb-3 font-bold text-4xl text-center">Trusted By</div>
                    <div className="text-600 mb-6 line-height-3 text-xl text-center">We provide many of the Planet Earth’s most powerful companies with extraordinary infrastructural capabilities.</div>

                    <div className="grid">
                        <div className="col-12 md:col-6 lg:col-3">
                            <div className="flex align-items-center justify-content-center p-3">
                                <img src="assets/images/blocks/logos/alfred-500.svg" alt="alfred-500" />
                            </div>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <div className="flex align-items-center justify-content-center p-3">
                                <img src="assets/images/blocks/logos/hyper-500.svg" alt="hyper-500" />
                            </div>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <div className="flex align-items-center justify-content-center p-3">
                                <img src="assets/images/blocks/logos/bastion-500.svg" alt="bastion-500" />
                            </div>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <div className="flex align-items-center justify-content-center p-3">
                                <img src="assets/images/blocks/logos/peak-500.svg" alt="peak-500" />
                            </div>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <div className="flex align-items-center justify-content-center p-3">
                                <img src="assets/images/blocks/logos/charot-500.svg" alt="charot-500" />
                            </div>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <div className="flex align-items-center justify-content-center p-3">
                                <img src="assets/images/blocks/logos/shodan-500.svg" alt="shadon-500" />
                            </div>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <div className="flex align-items-center justify-content-center p-3">
                                <img src="assets/images/blocks/logos/hodly-500.svg" alt="hodly-500" />
                            </div>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <div className="flex align-items-center justify-content-center p-3">
                                <img src="assets/images/blocks/logos/franki-500.svg" alt="franki-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="bg-gray-900 px-4 py-8 md:px-6 lg:px-8">
                <div className="bg-gray-900">
                    <div className="grid">
                        <div className="col-12 md:col-3 flex flex-wrap justify-content-start md:mb-0 mb-3">
                            <img src="assets/images/blocks/footer/footer-2.png" alt="footer sections" width={50} height={50} className="mr-3" />
                            <div className="text-gray-300 font-bold text-5xl">Bastion</div>
                        </div>
                        <div className="col-12 md:col-3">
                            <div className="text-white text-lg mb-4 flex flex-wrap" style={{ maxWidth: ' 290px' }}>Jacob Obrechtstraat 5, 1071 KC Amsterdam The Netherlands</div>
                            <div className="text-white mb-3"><i className="pi pi-phone border-round p-1 mr-2"></i>(31) 20 779 8986</div>
                            <div className="text-white mb-3"><i className="pi pi-inbox border-round p-1 mr-2"></i>hello@bastion.co</div>
                        </div>
                        <div className="col-12 md:col-3 text-gray-200">
                            <div className="text-white font-bold line-height-3 mb-3">Company</div>
                            <a className="text-white line-height-3 block cursor-pointer mb-2">About Us</a>
                            <a className="text-white line-height-3 block cursor-pointer mb-2">News</a>
                            <a className="text-white line-height-3 block cursor-pointer mb-2">Investor Relations</a>
                            <a className="text-white line-height-3 block cursor-pointer mb-2">Careers</a>
                            <a className="text-white line-height-3 block cursor-pointer">Media Kit</a>
                        </div>
                        <div className="col-12 md:col-3 text-gray-200">
                            <div className="text-white font-bold line-height-3 mb-3">Resourses</div>
                            <a className="text-white line-height-3 block cursor-pointer mb-2">Get Started</a>
                            <a className="text-white line-height-3 block cursor-pointer mb-2">Learn</a>
                            <a className="text-white line-height-3 block cursor-pointer">Case Studies</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(Home);
