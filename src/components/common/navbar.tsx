"use client";
import icon from "@/app/[locale]/icon.png";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
    Gift,
    Headset,
    Heart,
    IdCard,
    Mail,
    Phone,
    ShoppingBag,
    UserCheck,
    UserRoundKey,
    UserRoundPlus,
    Van,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "../navbarComponents/languageSwitcher";
import SearchBar from "../navbarComponents/searchBar";
import ThemeToggle from "../navbarComponents/themeToggle";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import CartSync from "../cart/cartSync";
import WishListSync from "../wishList/wishListSync";
import { useContext } from "react";
import { cartContext } from "@/providers/cart-provider";
import { Spinner } from "../ui/spinner";
import { wishListContext } from "@/providers/wishList-provider";

export default function Navbar() {
    const t = useTranslations("Navbar");
    const path = usePathname()
    const { numOfCartItems, isLoading } = useContext(cartContext)
    const { numOfWishListItems, isLoadingWish } = useContext(wishListContext)
    const { data: session, status } = useSession()
    function logOutUser() {
        signOut({ callbackUrl: ("/login") })
    }
    return (
        <>
            <CartSync />
            <WishListSync />
            <div className="top-nav bg-muted border-b border-border container mx-auto hidden lg:flex justify-between items-center chart-4 py-1.5 px-4">
                <div className="right flex items-center justify-between space-x-5">
                    <div className="shipping flex items-center space-x-1">
                        <Van className="text-primary" />
                        <p className="text-muted-foreground text-sm">{t("shipping")}</p>
                    </div>
                    <div className="new flex items-center space-x-1">
                        <Gift className="text-primary" />
                        <p className="text-muted-foreground text-sm">{t("newArrivals")}</p>
                    </div>
                </div>
                <div className="left flex items-center justify-between space-x-4">
                    <div className="phone-num flex items-center space-x-1">
                        <p className="text-muted-foreground font-medium flex items-center gap-1.5 pe-1.5 text-sm"><IdCard className="text-purple-600" />{status}</p>
                        <Phone className="text-primary w-5" />
                        <a
                            className="text-muted-foreground text-sm hover:text-[#6D28D9] transition-colors duration-200"
                            href={`tel:+1 (800) 123-4567`}
                        >
                            +1 (800) 123-4567
                        </a>
                    </div>
                    <div className="phone-num flex items-center space-x-1">
                        <Mail className="text-primary w-5" />
                        <a
                            className="text-muted-foreground text-sm hover:text-[#6D28D9] transition-colors duration-200"
                            href={`mailto:support@cartivo.com`}
                        >
                            support@cartivo.com
                        </a>
                    </div>
                    <div className="join-us flex items-center gap-4">
                        <Link
                            className="flex items-center space-x-1.5 text-muted-foreground text-sm hover:text-[#6D28D9] transition-colors duration-200"
                            href={"/login"}
                        >
                            <UserRoundKey className="w-5 text-primary me-1" /> {t("login")}
                        </Link>
                        <Link
                            className="flex items-center space-x-1.5 text-muted-foreground text-sm hover:text-[#6D28D9] transition-colors duration-200"
                            href={"/register"}
                        >
                            <UserRoundPlus className="w-5 text-primary me-1" />
                            {t("register")}
                        </Link>
                    </div>
                </div>
            </div>
            <header className="sticky top-0 z-50">
                <nav className="px-4 hidden lg:block bg-background border-b border-border py-2 backdrop-blur supports-[backdrop-filter]:bg-background/70">
                    <div className="bottom-nav container mx-auto hidden lg:flex justify-between items-center">
                        <div className="nav-logo">
                            <Link className="flex space-x-1.5 items-center" href={"/"}>
                                <Image src={icon} width={40} height={40} alt="Cartivo logo" />
                                <h1 className="font-bold text-2xl">Cartivo</h1>
                            </Link>
                        </div>
                        <div className="search">
                            <SearchBar />
                        </div>
                        <div className="nav-link"></div>
                        <div className="nav-link">
                            <NavigationMenu>
                                <NavigationMenuList className="list-none space-x-2.5">
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild className="font-medium">
                                            <Link
                                                className={path == "/" ? "active hover:bg-primary hover:text-white transition-colors duration-200" : "hover:bg-primary hover:text-white transition-colors duration-200"}
                                                href="/"
                                            >
                                                {t("home")}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild className="font-medium">
                                            <Link
                                                className={path == "/products" ? "active hover:bg-primary hover:text-white transition-colors duration-200" : "hover:bg-primary hover:text-white transition-colors duration-200"}
                                                href="/products"
                                            >
                                                {t("products")}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild className="font-medium">
                                            <Link
                                                className={path == "/categories" ? "active hover:bg-primary hover:text-white transition-colors duration-200" : "hover:bg-primary hover:text-white transition-colors duration-200"}
                                                href="/categories"
                                            >
                                                {t("categories")}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild className="font-medium">
                                            <Link
                                                className={path == "/brands" ? "active hover:bg-primary hover:text-white transition-colors duration-200" : "hover:bg-primary hover:text-white transition-colors duration-200"}
                                                href="/brands"
                                            >
                                                {t("brands")}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                                <NavigationMenuViewport />
                            </NavigationMenu>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="support">
                                <Link
                                    className="flex items-center space-x-1 hover:text-primary transition-colors duration-200"
                                    href={"/contact"}
                                >
                                    <Headset className="h-7 w-7" />
                                    <div className="text ">
                                        <span className="text-muted-foreground text-xs">
                                            {t("help")}
                                        </span>
                                        <p className="font-bold text-sm">27/7</p>
                                    </div>
                                </Link>
                            </div>
                            <Link href="/wishlist">
                                <div className="relative inline-block">
                                    <Heart className="h-7 w-7 hover:text-red-600 transition-colors duration-200" />
                                    {session ? <span className="absolute top-3.5 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-secondary">
                                        {isLoadingWish ? <Spinner /> : numOfWishListItems}
                                    </span> : ""}
                                </div>
                            </Link>

                            <Link href="/cart">
                                <div className="relative inline-block">
                                    <ShoppingBag className="h-7 w-7 hover:text-primary transition-colors duration-200" />
                                    <span className="absolute top-4 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-secondary">
                                        {isLoading ? <Spinner /> : numOfCartItems}
                                    </span>
                                </div>
                            </Link>
                            <ThemeToggle />
                            <LanguageSwitcher />
                            {session ?
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline"><UserCheck className="text-purple-600 size-5" /></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuGroup>
                                            <DropdownMenuLabel>{`Hala ${session.user?.name}`}</DropdownMenuLabel>
                                            <DropdownMenuItem asChild><Link href="/profile">Profile</Link></DropdownMenuItem>
                                            <DropdownMenuItem asChild><Link href="/allorders">Your Orders</Link></DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={logOutUser} variant="destructive">Log Out</DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                : <Button asChild className="bg-linear-to-r from-[#7C3AED] to-[#A855F7]">
                                    <Link
                                        className="flex items-center space-x-1 text-accent text-md"
                                        href={"/login"}
                                    >
                                        <UserRoundKey className="w-5 text-accent me-0.5 " /> {t("login")}
                                    </Link>
                                </Button>}
                        </div>
                    </div>
                </nav>
            </header>
            <div className="mobile py-1.5 px-4 flex justify-between items-center lg:hidden">
                <div className="nav-logo flex space-x-1.5 items-center">
                    <Image src={icon} width={30} height={30} alt="Cartivo logo" />
                    <h1 className="font-bold text-2xl">Cartivo</h1>
                </div>
                <div className="flex items-center gap-3">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button>
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="px-2" side="right">
                            <SheetHeader className="flex-row items-end">
                                <Image src={icon} width={30} height={30} alt="Cartivo logo" />
                                <SheetTitle className="text-xl">Cartivo</SheetTitle>
                            </SheetHeader>
                            <div className="mt-2 flex flex-col gap-5">
                                <div className="links flex flex-col gap-1">
                                    <Link className="hover:bg-purple-300 hover:text-accent transition-colors duration-200 border border-white/20 p-2 rounded-md" href="/">{t("home")}</Link>
                                    <Link className="hover:bg-purple-300 hover:text-accent transition-colors duration-200 border border-white/20 p-2 rounded-md" href="/products">{t("products")}</Link>
                                    <Link className="hover:bg-purple-300 hover:text-accent transition-colors duration-200 border border-white/20 p-2 rounded-md" href="/categories">{t("categories")}</Link>
                                    <Link className="hover:bg-purple-300 hover:text-accent transition-colors duration-200 border border-white/20 p-2 rounded-md" href="/brands">{t("brands")}</Link>
                                </div>
                                <SearchBar />
                                <div className="helpers flex items-center space-x-4 lg:space-x-6 ">
                                    <Link
                                        className="flex items-center px-0.5 md:px-1 space-x-1 hover:text-primary transition-colors duration-200"
                                        href="/contact"
                                    >
                                        <Headset />
                                        <div className="text ">
                                            <span className="text-muted-foreground text-xs">
                                                {t("help")}
                                            </span>
                                            <p className="font-bold text-sm">27/7</p>
                                        </div>
                                    </Link>
                                    <Link href="/wishlist" className="px-0.5 md:px-1">
                                        <div className="relative inline-block">
                                            <Heart className="h-7 w-7 hover:text-red-600 transition-colors duration-200" />
                                            {session ? <span className="absolute top-3.5 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-secondary">
                                                {isLoadingWish ? <Spinner /> : numOfWishListItems}
                                            </span> : ""}
                                        </div>
                                    </Link>
                                    <Link href="/cart" className="px-0.5 md:px-1">
                                        <div className="relative inline-block">
                                            <ShoppingBag className="h-7 w-7 hover:text-primary transition-colors duration-200" />
                                            <span className="absolute top-4 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-sm font-bold text-secondary">
                                                {numOfCartItems}
                                            </span>
                                        </div>
                                    </Link>
                                    <ThemeToggle />
                                    <LanguageSwitcher />
                                </div>
                                {session ?
                                    <div className="links flex flex-col">
                                        <h2 className="px-2 font-bold">{`Hala ${session.user?.name} 👋`}</h2>
                                        <Link className="hover:bg-purple-300 hover:text-accent transition-colors duration-200 border border-white/20 p-2 rounded-md" href="/profile">Profile</Link>
                                        <Link className="hover:bg-purple-300 hover:text-accent transition-colors duration-200 border border-white/20 p-2 rounded-md" href="/allorders">All Your Orders</Link>
                                        <Button onClick={logOutUser} variant={"destructive"} className="w-full mt-2 text-white cursor-pointer hover:bg-red-700">
                                            LogOut
                                        </Button>
                                    </div>
                                    : <Button asChild className="w-full bg-linear-to-r from-[#7C3AED] to-[#A855F7]">
                                        <Link
                                            className="flex items-center space-x-1 text-accent text-md"
                                            href={"/login"}
                                        >
                                            <UserRoundKey className="w-5 text-accent me-0.5 " /> {t("login")}
                                        </Link>
                                    </Button>}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </>
    );
}
