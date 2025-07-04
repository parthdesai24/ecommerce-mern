import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Airplay,
  BabyIcon,
  Car,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Footprints,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { addToCart, fetchCartItems } from "@/store/cart-slice";
import { useToast } from "@/hooks/use-toast";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: Footprints },
  {
    id: "all",
    label: "Viewall",
    icon: ShoppingBasket, // or Lucide's GridIcon / PackageCheck
    isViewAll: true,
  },
];

const brandsWithIcon = [
  {
    id: "nike",
    label: "Nike",
    icon: "https://tse1.mm.bing.net/th?id=OIP.6CJVUbj04JarM6vndFqiiwAAAA&pid=Api&P=0&h=180",
  },
  {
    id: "adidas",
    label: "Adidas",
    icon: "https://tse4.mm.bing.net/th?id=OIP.QBpfyRy3Ozr0GyeI1CvTqwHaFA&pid=Api&P=0&h=180",
  },
  {
    id: "puma",
    label: "Puma",
    icon: "https://cdn.freebiesupply.com/logos/large/2x/puma-3-logo-png-transparent.png",
  },
  {
    id: "levi",
    label: "Levi's",
    icon: "https://turbologo.com/articles/wp-content/uploads/2020/01/levis-primary-logo.png",
  },
  {
    id: "zara",
    label: "Zara",
    icon: "https://up.yimg.com/ib/th?id=OIP.KKpYXf8bnHb8MiSCvkOLVQHaEK&pid=Api&rs=1&c=1&qlt=95&w=203&h=114",
  },
  {
    id: "h&m",
    label: "H&M",
    icon: "https://logos-world.net/wp-content/uploads/2020/04/HM-Logo.png",
  },
];

function ShoppingHome() {
  const slides = [bannerOne, bannerTwo, bannerThree];
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleCollection = () => {
    navigate("/shop/listing");
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 350);
  };
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 350);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  // console.log(productList);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            onClick={handleCollection}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } cursor-pointer absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() => {
                  if (categoryItem.isViewAll) {
                    sessionStorage.removeItem("filters"); 
                     handleCollection(); 
                  } else {
                    handleNavigateToListingPage(categoryItem, "category");
                  }
                }}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img
                    src={brandItem.icon}
                    alt={brandItem.label}
                    className="w-18 h-12 mb-4 text-primary object-cover"
                  />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>

          {productList && productList.length > 0 && (
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={20}
              navigation={{
                nextEl: ".custom-swiper-button-next",
                prevEl: ".custom-swiper-button-prev",
              }}
              pagination={{
                clickable: true,
                el: ".custom-swiper-pagination",
              }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="relative"
            >
              {productList.map((productItem) => (
                <SwiperSlide key={productItem.id}>
                  <ShoppingProductTile
                    product={productItem}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddtoCart={handleAddtoCart}
                  />
                </SwiperSlide>
              ))}

              {/* Custom Arrows */}
              <div className="custom-swiper-button-prev absolute top-1/2 left-2 -translate-y-1/2 z-10 cursor-pointer bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
                <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
              </div>
              <div className="custom-swiper-button-next absolute top-1/2 right-2 -translate-y-1/2 z-10 cursor-pointer bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
                <ChevronRightIcon className="w-4 h-4 text-gray-600" />
              </div>

              {/* Pagination Dots */}
              <div className="custom-swiper-pagination mt-6 flex justify-center gap-2"></div>
            </Swiper>
          )}
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
