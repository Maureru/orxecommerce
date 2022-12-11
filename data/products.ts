import { IconType } from "react-icons/lib"
import { AiFillHome } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import { MdReviews } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";



export type OrxProducts = {
    name: string,
    slug: string,
    category: string[],
    colors: string[],
    description: string,
    price: number,
    originalPrice: number,
    image: string,
    moreImage: string[],
    numReviews: number,
    countInStock: number,
    rating: number,
    sizes: string[],
    numSold: number
}



export const Products: OrxProducts[] = [
    {
        name: 'S-Shirt Lego',
        slug: 'S-shirt-lego',
        category: ['shirt' , 'men', 'style'],
        colors: ["#fffff", "#00000", "#ff7b7b", "#a70000"],
        description: 'Lego Shirt made from 100% cotton',
        image: 'https://res.cloudinary.com/de6tc8i8q/image/upload/v1665800935/cld-sample.jpg',
        moreImage: ['https://res.cloudinary.com/de6tc8i8q/image/upload/v1665805791/3_lzp2uu.jpg', 'https://res.cloudinary.com/de6tc8i8q/image/upload/v1665800935/cld-sample.jpg'],
        price: 50,
        originalPrice: 100,
        countInStock: 2,
        rating: 4,
        sizes: ['sm', 'md', 'lg'],
        numReviews: 3,
        numSold: 0
    },
    {
        name: 'T-Shirt Lego',
        slug: 't-shirt-lego',
        category: ['shirt' , 'men', 'style'],
        colors: ["#fffff", "#00000", "#ff7b7b", "#a70000"],
        description: 'Lego Shirt made from 100% cotton',
        image: 'https://res.cloudinary.com/de6tc8i8q/image/upload/v1665800935/cld-sample.jpg',
        moreImage: ['https://res.cloudinary.com/de6tc8i8q/image/upload/v1665805791/3_lzp2uu.jpg', 'https://res.cloudinary.com/de6tc8i8q/image/upload/v1665800935/cld-sample.jpg'],
        price: 50,
        originalPrice: 100,
        countInStock: 2,
        rating: 4,
        sizes: ['sm', 'md', 'lg'],
        numReviews: 3,
        numSold: 0
    },
    {
        name: 'T-Shirtsss',
        slug: 't-shirtss',
        category: ['shirt' , 'men', 'style'],
        colors: ["#fffff", "#00000", "#ff7b7b", "#a70000"],
        description: 'Shirt made from 100% cotton',
        image: 'https://res.cloudinary.com/de6tc8i8q/image/upload/v1665800935/cld-sample.jpg',
        moreImage: ['https://res.cloudinary.com/de6tc8i8q/image/upload/v1665805791/3_lzp2uu.jpg', 'https://res.cloudinary.com/de6tc8i8q/image/upload/v1665800935/cld-sample.jpg'],
        price: 50,
        originalPrice: 100,
        countInStock: 2,
        rating: 4,
        sizes: ['sm', 'md', 'lg'],
        numReviews: 3,
        numSold: 2
    },
    {
        name: 'Shoes G',
        slug: 'shoes-g',
        category: ['shirt' , 'men', 'style'],
        colors: ["#fffff", "#00000", "#ff7b7b", "#a70000"],
        description: 'shoes sssss',
        image: 'https://res.cloudinary.com/de6tc8i8q/image/upload/v1665800937/cld-sample-5.jpg',
        moreImage: ['https://res.cloudinary.com/de6tc8i8q/image/upload/v1665805791/3_lzp2uu.jpg', 'https://res.cloudinary.com/de6tc8i8q/image/upload/v1665800935/cld-sample.jpg', 'https://res.cloudinary.com/de6tc8i8q/image/upload/v1665800937/cld-sample-5.jpg'],
        price: 50,
        originalPrice: 100,
        countInStock: 2,
        rating: 4,
        sizes: ['sm', 'md', 'lg'],
        numReviews: 3,
        numSold: 0
    },
    {
        name: 'T-Shirt Lebron',
        slug: 't-shirt-lebron',
        category: ['shirt' , 'men', 'style'],
        colors: ["#fffff", "#00000", "#ff7b7b", "#a70000"],
        description: 'Lego Shirt made from 100% cotton',
        image: 'https://res.cloudinary.com/de6tc8i8q/image/upload/v1665800936/cld-sample-3.jpg',
        moreImage: ['https://res.cloudinary.com/de6tc8i8q/image/upload/v1665805791/3_lzp2uu.jpg', 'https://res.cloudinary.com/de6tc8i8q/image/upload/v1665800935/cld-sample.jpg'],
        price: 50,
        originalPrice: 100,
        countInStock: 2,
        rating: 4,
        sizes: ['sm', 'md', 'lg'],
        numReviews: 3,
        numSold: 9
    },
    {
        name: 'T-Shirt Lego',
        slug: 't-shirt-lego',
        category: ['shirt' , 'men', 'style'],
        colors: ["#fffff", "#00000", "#ff7b7b", "#a70000"],
        description: 'Lego Shirt made from 100% cotton',
        image: 'https://res.cloudinary.com/de6tc8i8q/image/upload/v1665800935/cld-sample.jpg',
        moreImage: ['https://res.cloudinary.com/de6tc8i8q/image/upload/v1665805791/3_lzp2uu.jpg', 'https://res.cloudinary.com/de6tc8i8q/image/upload/v1665800935/cld-sample.jpg'],
        price: 50,
        originalPrice: 100,
        countInStock: 2,
        rating: 4,
        sizes: ['sm', 'md', 'lg'],
        numReviews: 3,
        numSold: 0
    },
    {
        name: 'T-Shirt Women',
        slug: 't-shirt-lego',
        category: ['shirt' , 'men', 'style'],
        colors: ["#fffff", "#00000", "#ff7b7b", "#a70000"],
        description: 'Lego Shirt made from 100% cotton',
        image: 'https://res.cloudinary.com/de6tc8i8q/image/upload/v1665805771/1_smkgku.png',
        moreImage: ['https://res.cloudinary.com/de6tc8i8q/image/upload/v1665805791/3_lzp2uu.jpg', 'https://res.cloudinary.com/de6tc8i8q/image/upload/v1665800935/cld-sample.jpg'],
        price: 50,
        originalPrice: 100,
        countInStock: 2,
        rating: 4,
        sizes: ['sm', 'md', 'lg'],
        numReviews: 3,
        numSold: 0
    },
]

export const AdminMenu: {
    name: string,
    link: string,
    icon: IconType
}[] = [
    {
        name: 'Home',
        link: '/admin/dashboard',
        icon: AiFillHome
    },
    {
        name: 'Products',
        link: '/admin/dashboard/products',
        icon: MdProductionQuantityLimits
    },
    {
        name: 'Orders',
        link: '/admin/dashboard/orders',
        icon: MdShoppingCart
    },
    {
        name: 'Customer',
        link: '/admin/dashboard/customers',
        icon: BsFillPeopleFill
    },
    {
        name: 'Reviews',
        link: '/admin/dashboard/reviews',
        icon: MdReviews
    },
    {
        name: 'Roles',
        link: '/admin/dashboard/roles',
        icon: IoIosPeople
    },
]


export const recentOrder = [
    {
    name: 'Maco Waitosutton',
    email: 'maco.senseii@gmail.com',
    cost: 899,
    status: 'delivered',
    time: 4,
    },
    {
    name: 'Reddo Stoneheart',
    email: 'redostoneheart@gmail.com',
    cost: 2999,
    status: 'canceled',
    time: 5,
    },
    {
    name: 'Angelie Smith',
    email: 'smith22@gmail.com',
    cost: 150,
    status: 'shipped',
    time: 6,
    },
    {
    name: 'Claire Lee',
    email: 'lee_claire@gmail.com',
    cost: 10000,
    status: 'delivered',
    time: 8,
    },
    {
    name: 'Jean Grey',
    email: 'grey_jean@gmail.com',
    cost: 4999,
    status: 'shipped',
    time: 15,
    },
]